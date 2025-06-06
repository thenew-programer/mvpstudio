/*
  # Fix user creation triggers and functions

  1. Functions
    - Create or replace function to handle new user creation
    - Ensure proper error handling and logging
  
  2. Triggers
    - Update triggers to handle user creation properly
    - Add better error handling
*/

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_profile_created ON profiles;

-- Create or replace the user initialization function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_email text;
BEGIN
  -- Get user email from auth.users
  SELECT email INTO user_email FROM auth.users WHERE id = NEW.id;
  
  -- Log the user creation
  INSERT INTO system_logs (event_type, description, user_id, metadata)
  VALUES (
    'USER_CREATED',
    'New user profile created: ' || COALESCE(user_email, 'unknown'),
    NEW.id,
    jsonb_build_object('full_name', NEW.full_name, 'role', NEW.role)
  );
  
  -- Create user progress record
  INSERT INTO user_progress (id, onboarding_complete, proposal_status, call_booked)
  VALUES (NEW.id, false, 'pending', false)
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the transaction
    INSERT INTO system_logs (event_type, description, user_id, metadata)
    VALUES (
      'USER_CREATION_ERROR',
      'Error creating user records: ' || SQLERRM,
      NEW.id,
      jsonb_build_object('error', SQLERRM)
    );
    
    -- Still return NEW to allow the profile creation to succeed
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user handling
CREATE TRIGGER on_new_user_created
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create a function to manually initialize user records if needed
CREATE OR REPLACE FUNCTION initialize_user_records(user_id uuid)
RETURNS boolean AS $$
DECLARE
  profile_exists boolean;
  progress_exists boolean;
BEGIN
  -- Check if profile exists
  SELECT EXISTS(SELECT 1 FROM profiles WHERE id = user_id) INTO profile_exists;
  
  -- Check if progress exists
  SELECT EXISTS(SELECT 1 FROM user_progress WHERE id = user_id) INTO progress_exists;
  
  -- Create profile if it doesn't exist
  IF NOT profile_exists THEN
    INSERT INTO profiles (id, full_name, role)
    SELECT user_id, 
           COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', 'User'),
           'user'
    FROM auth.users 
    WHERE id = user_id
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  -- Create progress if it doesn't exist
  IF NOT progress_exists THEN
    INSERT INTO user_progress (id, onboarding_complete, proposal_status, call_booked)
    VALUES (user_id, false, 'pending', false)
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN true;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error
    INSERT INTO system_logs (event_type, description, user_id, metadata)
    VALUES (
      'MANUAL_INIT_ERROR',
      'Error manually initializing user: ' || SQLERRM,
      user_id,
      jsonb_build_object('error', SQLERRM)
    );
    
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION initialize_user_records(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION handle_new_user() TO authenticated;
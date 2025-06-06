-- Create a secure function to check admin status
CREATE OR REPLACE FUNCTION check_is_admin(user_id uuid)
RETURNS boolean AS $$
DECLARE
  is_admin boolean;
BEGIN
  -- Check if the user exists and has admin role
  SELECT EXISTS (
    SELECT 1 
    FROM profiles 
    WHERE id = user_id 
    AND role = 'admin'
    -- Add additional security checks here
    AND created_at < now() - INTERVAL '5 minutes' -- Prevent newly created accounts from gaining immediate admin access
  ) INTO is_admin;
  
  RETURN is_admin;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
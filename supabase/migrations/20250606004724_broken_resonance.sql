/*
  # Add role column to auth.users and create admin views

  1. Changes
    - Add role column to auth.users
    - Create admin_users view for role checking
    - Create admin_project_ideas view for managing projects
  
  2. Security
    - Enable RLS on views
    - Add policies for admin access
*/

-- Add role column to auth.users
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- Create view for admin users
CREATE OR REPLACE VIEW admin_users AS
SELECT *
FROM auth.users
WHERE role = 'admin';

-- Enable RLS on admin_users view
ALTER VIEW admin_users ENABLE ROW LEVEL SECURITY;

-- Allow admins to access the admin_users view
CREATE POLICY "Admins can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create view for admin project management
CREATE OR REPLACE VIEW admin_project_ideas AS
SELECT 
  pi.*,
  u.email as user_email,
  u.role as user_role
FROM project_ideas pi
JOIN auth.users u ON pi.user_id = u.id;

-- Enable RLS on admin views
ALTER VIEW admin_project_ideas ENABLE ROW LEVEL SECURITY;

-- Allow admins to access the admin view
CREATE POLICY "Admins can view all projects"
  ON admin_project_ideas
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );
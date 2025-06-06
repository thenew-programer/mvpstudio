/*
  # Create admin dashboard tables

  1. New Tables
    - `project_stats`
      - Project-related statistics for admin monitoring
    - `system_logs`
      - System-wide activity logging
    - `admin_notifications`
      - Admin-specific notifications
*/

-- Project statistics table
CREATE TABLE IF NOT EXISTS project_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_projects integer DEFAULT 0,
  active_projects integer DEFAULT 0,
  completed_projects integer DEFAULT 0,
  pending_review integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- System logs table
CREATE TABLE IF NOT EXISTS system_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  description text NOT NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Admin notifications table
CREATE TABLE IF NOT EXISTS admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  priority text DEFAULT 'normal',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  admin_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE project_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

-- Admin-only policies
CREATE POLICY "Admins can read project stats"
  ON project_stats
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can read system logs"
  ON system_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

CREATE POLICY "Admins can manage notifications"
  ON admin_notifications
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  ));

-- Function to log system events
CREATE OR REPLACE FUNCTION log_system_event(
  event_type text,
  description text,
  metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid AS $$
DECLARE
  log_id uuid;
BEGIN
  INSERT INTO system_logs (event_type, description, metadata, user_id)
  VALUES (event_type, description, metadata, auth.uid())
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
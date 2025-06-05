/*
  # Create project ideas table

  1. New Tables
    - `project_ideas`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `project_name` (text)
      - `problem_statement` (text)
      - `target_users` (text)
      - `key_features` (text[])
      - `voice_recording_url` (text, nullable)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `project_ideas` table
    - Add policies for authenticated users to manage their own ideas
*/

CREATE TABLE IF NOT EXISTS project_ideas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  project_name text NOT NULL,
  problem_statement text NOT NULL,
  target_users text NOT NULL,
  key_features text[] NOT NULL,
  voice_recording_url text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE project_ideas ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own ideas
CREATE POLICY "Users can read own ideas"
  ON project_ideas
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own ideas
CREATE POLICY "Users can insert own ideas"
  ON project_ideas
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own ideas
CREATE POLICY "Users can update own ideas"
  ON project_ideas
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
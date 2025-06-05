/*
  # Create proposals table

  1. New Tables
    - `proposals`
      - `id` (uuid, primary key)
      - `idea_id` (uuid, references project_ideas)
      - `summary` (text)
      - `tech_stack` (jsonb)
      - `features` (jsonb)
      - `timeline` (jsonb)
      - `cost_estimate` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `proposals` table
    - Add policies for authenticated users to read their own proposals
*/

CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id uuid REFERENCES project_ideas NOT NULL,
  summary text NOT NULL,
  tech_stack jsonb NOT NULL,
  features jsonb NOT NULL,
  timeline jsonb NOT NULL,
  cost_estimate integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own proposals"
  ON proposals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_ideas
      WHERE project_ideas.id = proposals.idea_id
      AND project_ideas.user_id = auth.uid()
    )
  );
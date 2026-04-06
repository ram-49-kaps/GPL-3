-- GPL-3 Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS registrations (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  playing_2025 VARCHAR(3) NOT NULL CHECK (playing_2025 IN ('Yes', 'No')),
  photo_path VARCHAR(500),
  player_type VARCHAR(20) NOT NULL CHECK (player_type IN ('Batsman', 'Bowler', 'All Rounder')),
  payment_method VARCHAR(10) NOT NULL CHECK (payment_method IN ('Cash', 'Online')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional, recommended)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow inserts from service key
CREATE POLICY "Allow service inserts" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow reads from service key
CREATE POLICY "Allow service reads" ON registrations
  FOR SELECT
  USING (true);

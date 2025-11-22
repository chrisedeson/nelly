-- Add missing fields to recent_work table
ALTER TABLE recent_work 
ADD COLUMN IF NOT EXISTS work_url TEXT,
ADD COLUMN IF NOT EXISTS category TEXT;

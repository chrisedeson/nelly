-- Add missing fields to testimonials table
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS client_position TEXT,
ADD COLUMN IF NOT EXISTS client_company TEXT,
ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 5;

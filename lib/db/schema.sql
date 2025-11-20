-- Portfolio Database Schema for Vercel Postgres

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hero section content
CREATE TABLE IF NOT EXISTS hero_content (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  intro_text TEXT NOT NULL,
  profile_photo_url TEXT,
  button_text VARCHAR(100) DEFAULT 'Let''s get started',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Worked with companies/logos
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social media links
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  icon_type VARCHAR(50),
  display_order INT DEFAULT 0
);

-- Case studies/projects
CREATE TABLE IF NOT EXISTS case_studies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(100),
  tag_color VARCHAR(50),
  image_url TEXT,
  button_text VARCHAR(100) DEFAULT 'View case study',
  button_color VARCHAR(50),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  client_name VARCHAR(255) NOT NULL,
  client_photo_url TEXT,
  testimonial_text TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recent work
CREATE TABLE IF NOT EXISTS recent_work (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  button_text VARCHAR(100) DEFAULT 'Know more',
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Section content (for Case Studies, Testimonials, Recent Work sections)
CREATE TABLE IF NOT EXISTS section_content (
  id SERIAL PRIMARY KEY,
  section_name VARCHAR(100) UNIQUE NOT NULL,
  heading VARCHAR(255) NOT NULL,
  subheading TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  mobile VARCHAR(50),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN DEFAULT FALSE
);

-- Get in touch section content
CREATE TABLE IF NOT EXISTS contact_section (
  id SERIAL PRIMARY KEY,
  heading VARCHAR(255) NOT NULL,
  subheading TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data
INSERT INTO hero_content (name, intro_text, button_text) 
VALUES (
  'Your Name Here',
  'Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Let''s get started'
) ON CONFLICT DO NOTHING;

INSERT INTO section_content (section_name, heading, subheading) VALUES
  ('case_studies', 'Case Studies', 'Solving user & business problems since last 15+ years.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('testimonials', 'Testimonials', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
  ('recent_work', 'Recent Work', 'Solving user & business problems since last 15+ years.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
ON CONFLICT (section_name) DO NOTHING;

INSERT INTO contact_section (heading, subheading) VALUES
  ('Get In Touch', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_case_studies_order ON case_studies(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_recent_work_order ON recent_work(display_order);
CREATE INDEX IF NOT EXISTS idx_companies_order ON companies(display_order);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links(display_order);

-- Portfolio CMS Database Schema

-- Admin user table
CREATE TABLE IF NOT EXISTS admin_user (
  id SERIAL PRIMARY KEY,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio config (Hero section)
CREATE TABLE IF NOT EXISTS portfolio_config (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  intro_text TEXT NOT NULL,
  profile_image_url TEXT,
  cta_text TEXT NOT NULL DEFAULT 'Let''s get started',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- About section
CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL, -- Rich text HTML
  skills JSONB, -- Array of skills
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects / Case Studies
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL, -- Rich text HTML
  tags TEXT NOT NULL, -- e.g., 'Fintech', 'EdTech', 'Pharma'
  image_url TEXT,
  project_link TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recent Work
CREATE TABLE IF NOT EXISTS recent_work (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Information
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  email TEXT,
  phone TEXT,
  location TEXT,
  receiver_email TEXT NOT NULL, -- Email where contact form submissions are sent
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Links
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL, -- e.g., 'Twitter', 'LinkedIn', 'Behance'
  url TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Logos (Worked With section)
CREATE TABLE IF NOT EXISTS company_logos (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  logo_url TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEO Settings
CREATE TABLE IF NOT EXISTS seo_settings (
  id SERIAL PRIMARY KEY,
  page_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  og_image_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resume
CREATE TABLE IF NOT EXISTS resume (
  id SERIAL PRIMARY KEY,
  file_url TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Form Submissions (for logging)
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(order_index);
CREATE INDEX IF NOT EXISTS idx_recent_work_order ON recent_work(order_index);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links(order_index);
CREATE INDEX IF NOT EXISTS idx_company_logos_order ON company_logos(order_index);

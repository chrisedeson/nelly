-- Seed data for Portfolio CMS

-- Insert default admin user (password: 'admin123' - CHANGE THIS!)
-- Password hash generated with bcrypt for 'admin123'
INSERT INTO admin_user (password_hash) VALUES
  ('$2a$10$rG4mF5FJFzOy3qZVYhC0oe7wL/kXXhKZzY8qN3WdZvH8pZ5dWmH4e');

-- Insert portfolio config (Hero section)
INSERT INTO portfolio_config (name, intro_text, profile_image_url, cta_text) VALUES
  (
    'Your Name Here',
    'Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '/images/profile.png',
    'Let''s get started'
  );

-- Insert about section
INSERT INTO about (content, skills) VALUES
  (
    '<h2>About Me</h2><p>Add your about section content here. You can include multiple paragraphs, headings, and formatting.</p>',
    '["Project Management", "Agile", "Scrum", "Product Development", "Team Leadership"]'::jsonb
  );

-- Insert projects
INSERT INTO projects (title, description, tags, image_url, project_link, order_index) VALUES
  (
    'Work name here',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.</p>',
    'Fintech',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    '#',
    1
  ),
  (
    'Work name here',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.</p>',
    'EdTech',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    '#',
    2
  ),
  (
    'Work name here',
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.</p>',
    'Pharma',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    '#',
    3
  );

-- Insert testimonials
INSERT INTO testimonials (quote, client_name, client_position, client_company, client_image_url, rating, order_index) VALUES
  (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Christaiana Morgon Alisha',
    'Product Manager',
    'TechCorp Inc',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    5,
    1
  ),
  (
    'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'John Smith',
    'CEO',
    'StartupXYZ',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    5,
    2
  ),
  (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Jane Doe',
    'Director of Operations',
    'Global Solutions',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    5,
    3
  ),
  (
    'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Mike Johnson',
    'Project Lead',
    'Innovation Labs',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    5,
    4
  );

-- Insert recent work
INSERT INTO recent_work (title, description, image_url, work_url, category, order_index) VALUES
  (
    'Work name here',
    'Labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    '#',
    'Project Management',
    1
  ),
  (
    'Work name here',
    'Rempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt u',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    '#',
    'Design',
    2
  );

-- Insert contact info
INSERT INTO contact_info (email, phone, location, receiver_email) VALUES
  (
    'your.email@example.com',
    '+1 (555) 123-4567',
    'San Francisco, CA',
    'edesonchristopher@gmail.com'
  );

-- Insert social links
INSERT INTO social_links (platform, url, order_index) VALUES
  ('Twitter', 'https://twitter.com/yourusername', 1),
  ('Behance', 'https://behance.net/yourusername', 2),
  ('LinkedIn', 'https://linkedin.com/in/yourusername', 3);

-- Insert company logos
INSERT INTO company_logos (company_name, logo_url, order_index) VALUES
  ('Company 1', NULL, 1),
  ('Company 2', NULL, 2),
  ('Company 3', NULL, 3),
  ('Company 4', NULL, 4),
  ('Company 5', NULL, 5);

-- Insert SEO settings
INSERT INTO seo_settings (page_title, meta_description, og_image_url) VALUES
  (
    'Your Name - Project Manager Portfolio',
    'Experienced project manager specializing in delivering innovative solutions. View my portfolio of successful projects and case studies.',
    NULL
  );

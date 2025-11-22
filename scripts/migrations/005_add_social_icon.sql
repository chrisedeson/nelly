-- Add icon column to social_links table
ALTER TABLE social_links ADD COLUMN IF NOT EXISTS icon TEXT;

-- Update existing rows to have icons based on their platform
UPDATE social_links 
SET icon = CASE 
  WHEN LOWER(platform) LIKE '%linkedin%' THEN 'Linkedin'
  WHEN LOWER(platform) LIKE '%twitter%' OR LOWER(platform) LIKE '%x.com%' THEN 'Twitter'
  WHEN LOWER(platform) LIKE '%github%' THEN 'Github'
  WHEN LOWER(platform) LIKE '%facebook%' THEN 'Facebook'
  WHEN LOWER(platform) LIKE '%instagram%' THEN 'Instagram'
  WHEN LOWER(platform) LIKE '%youtube%' THEN 'Youtube'
  WHEN LOWER(platform) LIKE '%dribbble%' THEN 'Dribbble'
  WHEN LOWER(platform) LIKE '%behance%' THEN 'Dribbble'
  ELSE 'Link'
END
WHERE icon IS NULL;

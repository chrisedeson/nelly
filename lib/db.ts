import { sql } from '@vercel/postgres';

// Retry wrapper for database queries (handles Neon database wake-up delays)
async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 7,
  baseDelay = 2000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      const isTimeout = error?.code === 'ETIMEDOUT' ||
                       error?.code === 23 || // TimeoutError code
                       error?.cause?.code === 'ETIMEDOUT' ||
                       error?.message?.includes('fetch failed') ||
                       error?.message?.includes('timeout') ||
                       error?.sourceError?.message?.includes('fetch failed');
      const isLastAttempt = attempt === maxRetries;

      if (!isTimeout || isLastAttempt) {
        throw error;
      }

      // Log retry attempt for debugging
      console.log(`Database connection timeout, retrying (attempt ${attempt}/${maxRetries})...`);

      // Exponential backoff: 0s (immediate), 2s, 4s, 8s, 16s, 32s
      const delay = attempt === 1 ? 0 : baseDelay * Math.pow(2, attempt - 2);
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw new Error('Max retries reached');
}

// Portfolio Config
export async function getPortfolioConfig() {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM portfolio_config LIMIT 1`;
    const config = rows[0];
    
    if (!config) return null;
    
    // Map database field names to frontend field names
    return {
      hero_name: config.name,
      hero_tagline: config.intro_text,
      hero_description: config.hero_description,
      hero_image_url: config.profile_image_url,
      hero_cta_text: config.cta_text,
      hero_cta_link: config.hero_cta_link,
    };
  });
}

export async function updatePortfolioConfig(data: {
  name: string;
  intro_text: string;
  profile_image_url?: string;
  cta_text?: string;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE portfolio_config
      SET name = ${data.name},
          intro_text = ${data.intro_text},
          profile_image_url = ${data.profile_image_url || null},
          cta_text = ${data.cta_text || ''},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
    `;
    return rows[0];
  });
}

// About Section
export async function getAbout() {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM about LIMIT 1`;
    return rows[0] || null;
  });
}

export async function updateAbout(data: { content: string; skills: string[] }) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE about
      SET content = ${data.content},
          skills = ${JSON.stringify(data.skills)}::jsonb,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
    `;
    return rows[0];
  });
}

// Projects
export async function getProjects() {
  return withRetry(async () => {
    const { rows } = await sql`
      SELECT * FROM projects
      ORDER BY order_index ASC
    `;
    return rows;
  });
}

export async function getProject(id: number) {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM projects WHERE id = ${id}`;
    return rows[0] || null;
  });
}

export async function createProject(data: {
  title: string;
  description: string;
  tags: string;
  image_url?: string;
  project_link?: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      INSERT INTO projects (title, description, tags, image_url, project_link, order_index)
      VALUES (${data.title}, ${data.description}, ${data.tags || ''}, ${data.image_url || null}, ${data.project_link || null}, ${data.order_index})
      RETURNING *
    `;
    return rows[0];
  });
}

export async function updateProject(id: number, data: {
  title: string;
  description: string;
  tags: string;
  image_url?: string;
  project_link?: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE projects
      SET title = ${data.title},
          description = ${data.description},
          tags = ${data.tags || ''},
          image_url = ${data.image_url || null},
          project_link = ${data.project_link || null},
          order_index = ${data.order_index},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  });
}

export async function deleteProject(id: number) {
  return withRetry(async () => {
    await sql`DELETE FROM projects WHERE id = ${id}`;
  });
}

// Testimonials
export async function getTestimonials() {
  return withRetry(async () => {
    const { rows } = await sql`
      SELECT * FROM testimonials
      ORDER BY order_index ASC
    `;
    // Map database fields to frontend expected fields
    return rows.map(row => ({
      id: row.id,
      client_name: row.client_name || '',
      client_position: row.client_position || '',
      client_company: row.client_company || '',
      testimonial_text: row.quote || '',
      client_image_url: row.client_image_url || '',
      rating: row.rating || 5,
      order_index: row.order_index || 0,
    }));
  });
}

export async function getTestimonial(id: number) {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM testimonials WHERE id = ${id}`;
    return rows[0] || null;
  });
}

export async function createTestimonial(data: {
  quote: string;
  client_name: string;
  client_position?: string;
  client_company?: string;
  client_image_url?: string;
  rating?: number;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      INSERT INTO testimonials (quote, client_name, client_position, client_company, client_image_url, rating, order_index)
      VALUES (
        ${data.quote}, 
        ${data.client_name}, 
        ${data.client_position || null}, 
        ${data.client_company || null}, 
        ${data.client_image_url || null}, 
        ${data.rating || 5}, 
        ${data.order_index}
      )
      RETURNING *
    `;
    return rows[0];
  });
}

export async function updateTestimonial(id: number, data: {
  quote: string;
  client_name: string;
  client_position?: string;
  client_company?: string;
  client_image_url?: string;
  rating?: number;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE testimonials
      SET quote = ${data.quote},
          client_name = ${data.client_name},
          client_position = ${data.client_position || null},
          client_company = ${data.client_company || null},
          client_image_url = ${data.client_image_url || null},
          rating = ${data.rating || 5},
          order_index = ${data.order_index},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  });
}

export async function deleteTestimonial(id: number) {
  return withRetry(async () => {
    await sql`DELETE FROM testimonials WHERE id = ${id}`;
  });
}

// Recent Work
export async function getRecentWork() {
  return withRetry(async () => {
    const { rows } = await sql`
      SELECT * FROM recent_work
      ORDER BY order_index ASC
    `;
    return rows;
  });
}

export async function getRecentWorkItem(id: number) {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM recent_work WHERE id = ${id}`;
    return rows[0] || null;
  });
}

export async function createRecentWork(data: {
  title: string;
  description: string;
  image_url?: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      INSERT INTO recent_work (title, description, image_url, order_index)
      VALUES (${data.title}, ${data.description}, ${data.image_url || null}, ${data.order_index})
      RETURNING *
    `;
    return rows[0];
  });
}

export async function updateRecentWork(id: number, data: {
  title: string;
  description: string;
  image_url?: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE recent_work
      SET title = ${data.title},
          description = ${data.description},
          image_url = ${data.image_url || null},
          order_index = ${data.order_index},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  });
}

export async function deleteRecentWork(id: number) {
  return withRetry(async () => {
    await sql`DELETE FROM recent_work WHERE id = ${id}`;
  });
}

// Contact Info
export async function getContactInfo() {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM contact_info LIMIT 1`;
    return rows[0] || null;
  });
}

export async function updateContactInfo(data: {
  email?: string;
  phone?: string;
  location?: string;
  receiver_email: string;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE contact_info
      SET email = ${data.email || null},
          phone = ${data.phone || null},
          location = ${data.location || null},
          receiver_email = ${data.receiver_email},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
    `;
    return rows[0];
  });
}

// Social Links
export async function getSocialLinks() {
  return withRetry(async () => {
    const { rows } = await sql`
      SELECT * FROM social_links
      ORDER BY order_index ASC
    `;
    return rows;
  });
}

export async function getSocialLink(id: number) {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM social_links WHERE id = ${id}`;
    return rows[0] || null;
  });
}

export async function createSocialLink(data: {
  platform: string;
  url: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      INSERT INTO social_links (platform, url, order_index)
      VALUES (${data.platform}, ${data.url}, ${data.order_index})
      RETURNING *
    `;
    return rows[0];
  });
}

export async function updateSocialLink(id: number, data: {
  platform: string;
  url: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE social_links
      SET platform = ${data.platform},
          url = ${data.url},
          order_index = ${data.order_index},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  });
}

export async function deleteSocialLink(id: number) {
  return withRetry(async () => {
    await sql`DELETE FROM social_links WHERE id = ${id}`;
  });
}

// Company Logos
export async function getCompanyLogos() {
  return withRetry(async () => {
    const { rows } = await sql`
      SELECT * FROM company_logos
      ORDER BY order_index ASC
    `;
    return rows;
  });
}

export async function getCompanyLogo(id: number) {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM company_logos WHERE id = ${id}`;
    return rows[0] || null;
  });
}

export async function createCompanyLogo(data: {
  company_name: string;
  logo_url?: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      INSERT INTO company_logos (company_name, logo_url, order_index)
      VALUES (${data.company_name}, ${data.logo_url || null}, ${data.order_index})
      RETURNING *
    `;
    return rows[0];
  });
}

export async function updateCompanyLogo(id: number, data: {
  company_name: string;
  logo_url?: string;
  order_index: number;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE company_logos
      SET company_name = ${data.company_name},
          logo_url = ${data.logo_url || null},
          order_index = ${data.order_index},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  });
}

export async function deleteCompanyLogo(id: number) {
  return withRetry(async () => {
    await sql`DELETE FROM company_logos WHERE id = ${id}`;
  });
}

// SEO Settings
export async function getSEOSettings() {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM seo_settings LIMIT 1`;
    return rows[0] || null;
  });
}

export async function updateSEOSettings(data: {
  page_title: string;
  meta_description: string;
  og_image_url?: string;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE seo_settings
      SET page_title = ${data.page_title},
          meta_description = ${data.meta_description},
          og_image_url = ${data.og_image_url || null},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
    `;
    return rows[0];
  });
}

// Resume
export async function getResume() {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM resume LIMIT 1`;
    return rows[0] || null;
  });
}

export async function updateResume(file_url: string) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE resume
      SET file_url = ${file_url},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
    `;
    if (rows.length === 0) {
      const { rows: newRows } = await sql`
        INSERT INTO resume (file_url)
        VALUES (${file_url})
        RETURNING *
      `;
      return newRows[0];
    }
    return rows[0];
  });
}

export async function deleteResume() {
  return withRetry(async () => {
    await sql`DELETE FROM resume WHERE id = 1`;
  });
}

// Admin User
export async function getAdminUser() {
  return withRetry(async () => {
    const { rows } = await sql`SELECT * FROM admin_user LIMIT 1`;
    return rows[0] || null;
  });
}

export async function verifyAdminPassword(password: string) {
  const bcrypt = require('bcryptjs');
  const user = await getAdminUser();
  if (!user) return false;
  return await bcrypt.compare(password, user.password_hash);
}

export async function updateAdminPassword(password_hash: string) {
  return withRetry(async () => {
    const { rows } = await sql`
      UPDATE admin_user
      SET password_hash = ${password_hash},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *
    `;
    return rows[0];
  });
}

// Contact Form Submissions
export async function createContactSubmission(data: {
  name?: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return withRetry(async () => {
    const { rows } = await sql`
      INSERT INTO contact_submissions (name, email, phone, message)
      VALUES (${data.name || null}, ${data.email}, ${data.phone || null}, ${data.message})
      RETURNING *
    `;
    return rows[0];
  });
}

export async function getContactSubmissions() {
  return withRetry(async () => {
    const { rows } = await sql`
      SELECT * FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT 100
    `;
    return rows;
  });
}

require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function resetDatabase() {
  try {
    console.log('Dropping all tables...');
    
    await sql`DROP TABLE IF EXISTS contact_messages CASCADE`;
    await sql`DROP TABLE IF EXISTS recent_work CASCADE`;
    await sql`DROP TABLE IF EXISTS testimonials CASCADE`;
    await sql`DROP TABLE IF EXISTS case_studies CASCADE`;
    await sql`DROP TABLE IF EXISTS section_content CASCADE`;
    await sql`DROP TABLE IF EXISTS contact_section CASCADE`;
    await sql`DROP TABLE IF EXISTS social_links CASCADE`;
    await sql`DROP TABLE IF EXISTS companies CASCADE`;
    await sql`DROP TABLE IF EXISTS hero_content CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    
    console.log('✅ All tables dropped successfully!');
    console.log('\nNow run: node scripts/init-db.js');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();

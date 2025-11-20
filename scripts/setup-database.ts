import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...');

    // Drop existing tables first
    const dropPath = path.join(__dirname, 'drop-tables.sql');
    const dropScript = fs.readFileSync(dropPath, 'utf-8');

    console.log('🗑️  Dropping existing tables...');
    await sql.query(dropScript);
    console.log('✅ Tables dropped');

    // Read and execute schema migration
    const schemaPath = path.join(__dirname, 'migrations', '001_initial_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');

    console.log('📋 Creating tables...');
    await sql.query(schema);
    console.log('✅ Tables created successfully');

    // Read and execute seed data
    const seedPath = path.join(__dirname, 'migrations', '002_seed_data.sql');
    const seedData = fs.readFileSync(seedPath, 'utf-8');

    console.log('🌱 Seeding data...');
    await sql.query(seedData);
    console.log('✅ Data seeded successfully');

    console.log('\n🎉 Database setup complete!');
    console.log('\n📝 Default admin credentials:');
    console.log('   Password: admin123');
    console.log('   ⚠️  IMPORTANT: Change this password immediately after first login!\n');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();

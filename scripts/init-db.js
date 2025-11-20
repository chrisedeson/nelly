require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  try {
    console.log('Reading schema file...');
    const schemaPath = path.join(__dirname, '..', 'lib', 'db', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Executing schema...');
    await sql.query(schema);
    
    console.log('✅ Database initialized successfully!');
    console.log('\nNow you can add initial data by running:');
    console.log('node scripts/seed.js');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();

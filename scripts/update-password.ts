import { sql } from '@vercel/postgres';

// Environment variables should be loaded from .env.local automatically

async function updatePassword() {
  try {
    console.log('🔐 Updating admin password...');

    // Correct bcrypt hash for 'admin123'
    const correctHash = '$2b$10$1rkdAmXGxIbWeblFTahjo.CxHVGX1Dv5jyjmBJnO.WDDRfvKh5Ify';

    await sql`
      UPDATE admin_user
      SET password_hash = ${correctHash},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `;

    console.log('✅ Password updated successfully!');
    console.log('   You can now log in with password: admin123');
    console.log('   ⚠️  Remember to change this after logging in!\n');

  } catch (error) {
    console.error('❌ Error updating password:', error);
    process.exit(1);
  }
}

updatePassword();

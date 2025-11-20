require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

async function seedDatabase() {
  try {
    console.log('Seeding database with initial data...\n');

    // 1. Create admin user
    console.log('Creating admin user...');
    const passwordHash = await bcrypt.hash('admin123', 10);
    await sql`
      INSERT INTO users (email, password, name)
      VALUES ('admin@example.com', ${passwordHash}, 'Admin User')
      ON CONFLICT (email) DO NOTHING
    `;
    console.log('✅ Admin user created (email: admin@example.com, password: admin123)');

    // 2. Add hero content
    console.log('\nAdding hero content...');
    await sql`
      INSERT INTO hero_content (name, intro_text, profile_photo_url)
      VALUES (
        'Your Name',
        'Welcome to my portfolio. I''m a project manager who brings ideas to life.',
        'https://via.placeholder.com/300'
      )
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Hero content added');

    // 3. Add section content
    console.log('\nAdding section headings...');
    await sql`
      INSERT INTO section_content (section_name, heading, subheading)
      VALUES 
        ('case_studies', 'Case Studies', 'Selected projects that showcase my work'),
        ('testimonials', 'What People Say', 'Feedback from clients and colleagues'),
        ('recent_work', 'Recent Work', 'Latest projects and achievements')
      ON CONFLICT (section_name) DO NOTHING
    `;
    console.log('✅ Section headings added');

    // 4. Add contact section
    console.log('\nAdding contact section...');
    await sql`
      INSERT INTO contact_section (heading, subheading)
      VALUES (
        'Let''s work together',
        'I''m always open to discussing product design work or partnership opportunities.'
      )
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Contact section added');

    // 5. Add sample company
    console.log('\nAdding sample company...');
    await sql`
      INSERT INTO companies (name, logo_url, display_order)
      VALUES ('Company Name', 'https://via.placeholder.com/120x40', 1)
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Sample company added');

    // 6. Add sample case study
    console.log('\nAdding sample case study...');
    await sql`
      INSERT INTO case_studies (
        title, description, image_url, tag, tag_color, button_text, button_color, display_order
      )
      VALUES (
        'Sample Project',
        'This is a sample case study. Edit this through the admin panel.',
        'https://via.placeholder.com/600x400',
        'Strategy',
        '#3f8e00',
        'View Project',
        '#3f8e00',
        1
      )
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Sample case study added');

    // 7. Add sample testimonial
    console.log('\nAdding sample testimonial...');
    await sql`
      INSERT INTO testimonials (
        client_name, testimonial_text, client_photo_url, display_order
      )
      VALUES (
        'John Doe',
        'Working with this project manager was an absolute pleasure. Highly recommended!',
        'https://via.placeholder.com/100',
        1
      )
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Sample testimonial added');

    // 8. Add sample recent work
    console.log('\nAdding sample recent work...');
    await sql`
      INSERT INTO recent_work (
        title, description, image_url, button_text, display_order
      )
      VALUES (
        'Recent Project',
        'A brief description of this recent project.',
        'https://via.placeholder.com/500x350',
        'Know more',
        1
      )
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Sample recent work added');

    // 9. Add social links
    console.log('\nAdding social links...');
    await sql`
      INSERT INTO social_links (platform, url, icon_type, display_order)
      VALUES 
        ('LinkedIn', 'https://linkedin.com', 'linkedin', 1),
        ('Twitter', 'https://twitter.com', 'twitter', 2),
        ('GitHub', 'https://github.com', 'github', 3)
      ON CONFLICT DO NOTHING
    `;
    console.log('✅ Social links added');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Remember to change the password after first login!');
    console.log('\n🚀 Start the dev server with: pnpm dev');
    console.log('   Then visit: http://localhost:3000/admin/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

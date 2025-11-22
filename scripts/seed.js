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
      INSERT INTO admin_user (password_hash)
      VALUES (${passwordHash})
    `;
    console.log('✅ Admin user created (password: admin123)');

    // 2. Add portfolio config (Hero section)
    console.log('\nAdding portfolio config...');
    await sql`
      INSERT INTO portfolio_config (name, intro_text, profile_image_url, cta_text)
      VALUES (
        'Your Name',
        'Welcome to my portfolio. I''m a project manager who brings ideas to life.',
        'https://www.figma.com/api/mcp/asset/f00bc549-ad68-4d9a-bb3f-062bd584f6cb',
        'Let''s get started'
      )
    `;
    console.log('✅ Portfolio config added');

    // 3. Add about section
    console.log('\nAdding about section...');
    await sql`
      INSERT INTO about (content, skills)
      VALUES (
        '<h2>About Me</h2><p>Add your about section content here. You can include multiple paragraphs, headings, and formatting.</p>',
        '["Project Management", "Agile", "Scrum", "Product Development", "Team Leadership"]'::jsonb
      )
    `;
    console.log('✅ About section added');

    // 4. Add contact info
    console.log('\nAdding contact info...');
    await sql`
      INSERT INTO contact_info (email, phone, location, receiver_email)
      VALUES (
        'your.email@example.com',
        '+1 (555) 123-4567',
        'San Francisco, CA',
        'edesonchristopher@gmail.com'
      )
    `;
    console.log('✅ Contact info added');

    // 5. Add sample company logos
    console.log('\nAdding sample company logos...');
    await sql`
      INSERT INTO company_logos (company_name, logo_url, order_index)
      VALUES 
        ('Clickup', 'https://logo.clearbit.com/clickup.com', 1),
        ('Trello', 'https://ggqolvq6uoabo67x.public.blob.vercel-storage.com/Trello-woVxXDNvbh00IM27X5iw3dSHl12ReT.png', 2),
        ('Stripe', 'https://ggqolvq6uoabo67x.public.blob.vercel-storage.com/stripy-XLvfA4JszzcpmeGNHryNG5oMvqMM1m.png', 3),
        ('Jira', 'https://ggqolvq6uoabo67x.public.blob.vercel-storage.com/Jira-sp8qr2dNtHL2RyJT38FScuwCcPjJzv.png', 4),
        ('Google Workspace', 'https://ggqolvq6uoabo67x.public.blob.vercel-storage.com/Google_Workspace-55RteHOujFKs79j9gguBIQmrTY8TtY.png', 5)
    `;
    console.log('✅ Sample company logos added');

    // 6. Add sample projects
    console.log('\nAdding sample projects...');
    await sql`
      INSERT INTO projects (title, description, tags, image_url, project_link, order_index)
      VALUES 
        (
          'Sample Project',
          '<p>This is a sample project. Edit this through the admin panel.</p>',
          'Strategy',
          'https://www.figma.com/api/mcp/asset/a0dcd056-c0ea-4259-af5e-b9c18527c4f5',
          '#',
          1
        )
    `;
    console.log('✅ Sample projects added');

    // 7. Add sample testimonial
    console.log('\nAdding sample testimonial...');
    await sql`
      INSERT INTO testimonials (quote, client_name, client_position, client_company, client_image_url, rating, order_index)
      VALUES (
        'Working with this project manager was an absolute pleasure. Highly recommended!',
        'John Doe',
        'CEO',
        'Tech Company',
        'https://www.figma.com/api/mcp/asset/924177db-2185-4aae-985b-990be63a1a21',
        5,
        1
      )
    `;
    console.log('✅ Sample testimonial added');

    // 8. Add sample recent work
    console.log('\nAdding sample recent work...');
    await sql`
      INSERT INTO recent_work (title, description, image_url, work_url, category, order_index)
      VALUES (
        'Recent Project',
        'This is a recent work sample. Customize through the admin panel.',
        'https://www.figma.com/api/mcp/asset/bbadab58-b572-4f2e-b94e-aaecd86f17df',
        'https://example.com',
        'Web Development',
        1
      )
    `;
    console.log('✅ Sample recent work added');

    // 9. Add SEO settings
    console.log('\nAdding SEO settings...');
    await sql`
      INSERT INTO seo_settings (page_title, meta_description, og_image_url)
      VALUES (
        'Portfolio - Project Manager',
        'Experienced project manager bringing ideas to life with strategic planning and execution.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FNxZZ4Diquc05MFPvwp_eR_DL6ckXeGFcg_VDgNpB5EX-6SNDmBx5-XOKe8uVULBIPI&usqp=CAU'
      )
    `;
    console.log('✅ SEO settings added');

    // 10. Add social links
    console.log('\nAdding social links...');
    await sql`
      INSERT INTO social_links (platform, url, icon, order_index)
      VALUES 
        ('LinkedIn', 'https://linkedin.com', 'Linkedin', 1),
        ('X', 'https://x.com', 'X', 2),
        ('GitHub', 'https://github.com', 'Github', 3)
    `;
    console.log('✅ Social links added');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log('   Password: admin123');
    console.log('\n⚠️  Remember to change the password after first login!');
    console.log('\n🚀 Start the dev server with: pnpm dev');
    console.log('   Then visit: http://localhost:3000/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

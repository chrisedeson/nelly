import { sql } from './db';
import type {
  HeroContent,
  Company,
  SocialLink,
  CaseStudy,
  Testimonial,
  RecentWork,
  SectionContent,
  ContactSection,
  PortfolioData
} from '@/types/portfolio';

export async function getPortfolioData(): Promise<PortfolioData> {
  const [
    heroResult,
    companiesResult,
    socialLinksResult,
    caseStudiesContentResult,
    caseStudiesResult,
    testimonialsContentResult,
    testimonialsResult,
    recentWorkContentResult,
    recentWorkResult,
    contactResult,
  ] = await Promise.all([
    sql<HeroContent>`SELECT * FROM hero_content LIMIT 1`,
    sql<Company>`SELECT * FROM companies ORDER BY display_order`,
    sql<SocialLink>`SELECT * FROM social_links ORDER BY display_order`,
    sql<SectionContent>`SELECT * FROM section_content WHERE section_name = 'case_studies'`,
    sql<CaseStudy>`SELECT * FROM case_studies ORDER BY display_order`,
    sql<SectionContent>`SELECT * FROM section_content WHERE section_name = 'testimonials'`,
    sql<Testimonial>`SELECT * FROM testimonials ORDER BY display_order`,
    sql<SectionContent>`SELECT * FROM section_content WHERE section_name = 'recent_work'`,
    sql<RecentWork>`SELECT * FROM recent_work ORDER BY display_order`,
    sql<ContactSection>`SELECT * FROM contact_section LIMIT 1`,
  ]);

  const hero = heroResult.rows[0];
  const companies = companiesResult.rows;
  const socialLinks = socialLinksResult.rows;
  const caseStudiesContent = caseStudiesContentResult.rows[0];
  const caseStudies = caseStudiesResult.rows;
  const testimonialsContent = testimonialsContentResult.rows[0];
  const testimonials = testimonialsResult.rows;
  const recentWorkContent = recentWorkContentResult.rows[0];
  const recentWork = recentWorkResult.rows;
  const contact = contactResult.rows[0];

  return {
    hero: hero || {
      id: 0,
      name: 'Your Name Here',
      intro_text: 'Welcome to my portfolio',
      profile_photo_url: null,
      button_text: "Let's get started",
      updated_at: new Date(),
    },
    companies: companies || [],
    socialLinks: socialLinks || [],
    caseStudies: {
      content: caseStudiesContent || {
        id: 0,
        section_name: 'case_studies',
        heading: 'Case Studies',
        subheading: null,
        updated_at: new Date(),
      },
      items: caseStudies || [],
    },
    testimonials: {
      content: testimonialsContent || {
        id: 0,
        section_name: 'testimonials',
        heading: 'Testimonials',
        subheading: null,
        updated_at: new Date(),
      },
      items: testimonials || [],
    },
    recentWork: {
      content: recentWorkContent || {
        id: 0,
        section_name: 'recent_work',
        heading: 'Recent Work',
        subheading: null,
        updated_at: new Date(),
      },
      items: recentWork || [],
    },
    contact: contact || {
      id: 0,
      heading: 'Get In Touch',
      subheading: null,
      updated_at: new Date(),
    },
  };
}

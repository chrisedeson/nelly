export interface HeroContent {
  id: number;
  name: string;
  intro_text: string;
  profile_photo_url: string | null;
  button_text: string;
  updated_at: Date;
}

export interface Company {
  id: number;
  name: string;
  logo_url: string | null;
  display_order: number;
  created_at: Date;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon_type: string | null;
  display_order: number;
}

export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  tag: string | null;
  tag_color: string | null;
  image_url: string | null;
  button_text: string;
  button_color: string | null;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Testimonial {
  id: number;
  client_name: string;
  client_photo_url: string | null;
  testimonial_text: string;
  display_order: number;
  created_at: Date;
}

export interface RecentWork {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  button_text: string;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface SectionContent {
  id: number;
  section_name: string;
  heading: string;
  subheading: string | null;
  updated_at: Date;
}

export interface ContactMessage {
  id: number;
  email: string;
  mobile: string | null;
  message: string;
  created_at: Date;
  is_read: boolean;
}

export interface ContactSection {
  id: number;
  heading: string;
  subheading: string | null;
  updated_at: Date;
}

export interface PortfolioData {
  hero: HeroContent;
  companies: Company[];
  socialLinks: SocialLink[];
  caseStudies: {
    content: SectionContent;
    items: CaseStudy[];
  };
  testimonials: {
    content: SectionContent;
    items: Testimonial[];
  };
  recentWork: {
    content: SectionContent;
    items: RecentWork[];
  };
  contact: ContactSection;
}

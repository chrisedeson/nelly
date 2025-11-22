import type { Metadata } from "next";
import {
  getPortfolioConfig,
  getProjects,
  getTestimonials,
  getRecentWork,
  getCompanyLogos,
  getSocialLinks,
  getResume,
  getSEOSettings
} from "@/lib/db";
import TopMenu from "@/components/portfolio/top-menu";
import Header from "@/components/portfolio/header";
import CaseStudies from "@/components/portfolio/case-studies";
import Testimonials from "@/components/portfolio/testimonials";
import RecentWork from "@/components/portfolio/recent-work";
import GetInTouch from "@/components/portfolio/get-in-touch";
import Footer from "@/components/portfolio/footer";

// Revalidate every 60 seconds to show fresh data
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOSettings();

  return {
    title: seo?.page_title || "Portfolio",
    description: seo?.meta_description || "Professional portfolio showcasing my work and experience",
    openGraph: {
      title: seo?.page_title || "Portfolio",
      description: seo?.meta_description || "Professional portfolio showcasing my work and experience",
      images: seo?.og_image_url ? [seo.og_image_url] : [],
    },
  };
}

export default async function PersonalPortfolioTemplate() {
  // Fetch all data in parallel
  const [portfolio, projects, testimonials, recentWork, logos, socialLinks, resume] =
    await Promise.all([
      getPortfolioConfig(),
      getProjects(),
      getTestimonials(),
      getRecentWork(),
      getCompanyLogos(),
      getSocialLinks(),
      getResume(),
    ]);

  return (
    <div className="bg-white min-h-screen w-full">
      <TopMenu socialLinks={socialLinks as any} />
      <Header portfolio={portfolio as any} logos={logos as any} resume={resume as any} />
      <CaseStudies projects={projects as any} />
      <Testimonials testimonials={testimonials as any} />
      <RecentWork recentWork={recentWork as any} />
      <GetInTouch />
      <Footer />
    </div>
  );
}

import {
  getPortfolioConfig,
  getProjects,
  getTestimonials,
  getRecentWork,
  getCompanyLogos,
  getSocialLinks
} from "@/lib/db";
import TopMenu from "@/components/portfolio/top-menu";
import Header from "@/components/portfolio/header";
import CaseStudies from "@/components/portfolio/case-studies";
import Testimonials from "@/components/portfolio/testimonials";
import RecentWork from "@/components/portfolio/recent-work";
import GetInTouch from "@/components/portfolio/get-in-touch";
import Footer from "@/components/portfolio/footer";

export default async function PersonalPortfolioTemplate() {
  // Fetch all data in parallel
  const [portfolio, projects, testimonials, recentWork, logos, socialLinks] =
    await Promise.all([
      getPortfolioConfig(),
      getProjects(),
      getTestimonials(),
      getRecentWork(),
      getCompanyLogos(),
      getSocialLinks(),
    ]);

  return (
    <div className="bg-white min-h-screen w-full">
      <TopMenu socialLinks={socialLinks as any} />
      <Header portfolio={portfolio as any} logos={logos as any} />
      <CaseStudies projects={projects as any} />
      <Testimonials testimonials={testimonials as any} />
      <RecentWork recentWork={recentWork as any} />
      <GetInTouch />
      <Footer />
    </div>
  );
}

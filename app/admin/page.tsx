import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { getPortfolioData } from "@/lib/data";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/admin/login");
  }

  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-[#080808]">
      <nav className="bg-[#1b1b1b] border-b border-[#484848] px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-[24px] font-extrabold text-white font-['Raleway']">
            Portfolio Admin
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono']">
              {session.user?.email}
            </span>
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="bg-[#3f8e00] border border-[#62ba1b] text-white px-[24px] py-[10px] rounded-[4px] font-['IBM_Plex_Mono'] font-bold text-[14px] hover:bg-[#4aa100] transition-colors"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/hero"
            className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6 hover:border-[#3f8e00] transition-colors"
          >
            <h2 className="text-[20px] font-bold text-white font-['Raleway'] mb-2">
              Hero Section
            </h2>
            <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono']">
              Edit name, intro text, and profile image
            </p>
          </Link>

          <Link
            href="/admin/case-studies"
            className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6 hover:border-[#3f8e00] transition-colors"
          >
            <h2 className="text-[20px] font-bold text-white font-['Raleway'] mb-2">
              Case Studies
            </h2>
            <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono']">
              Manage case studies ({data.caseStudies.items.length})
            </p>
          </Link>

          <Link
            href="/admin/testimonials"
            className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6 hover:border-[#3f8e00] transition-colors"
          >
            <h2 className="text-[20px] font-bold text-white font-['Raleway'] mb-2">
              Testimonials
            </h2>
            <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono']">
              Manage testimonials ({data.testimonials.items.length})
            </p>
          </Link>

          <Link
            href="/admin/recent-work"
            className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6 hover:border-[#3f8e00] transition-colors"
          >
            <h2 className="text-[20px] font-bold text-white font-['Raleway'] mb-2">
              Recent Work
            </h2>
            <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono']">
              Manage recent work items ({data.recentWork.items.length})
            </p>
          </Link>

          <Link
            href="/admin/companies"
            className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6 hover:border-[#3f8e00] transition-colors"
          >
            <h2 className="text-[20px] font-bold text-white font-['Raleway'] mb-2">
              Companies
            </h2>
            <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono']">
              Manage company logos ({data.companies.length})
            </p>
          </Link>

          <Link
            href="/admin/messages"
            className="bg-[#1b1b1b] border border-[#484848] rounded-lg p-6 hover:border-[#3f8e00] transition-colors"
          >
            <h2 className="text-[20px] font-bold text-white font-['Raleway'] mb-2">
              Messages
            </h2>
            <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono']">
              View contact messages
            </p>
          </Link>
        </div>

        <div className="mt-8 bg-[#1b1b1b] border border-[#484848] rounded-lg p-6">
          <h2 className="text-[20px] font-bold text-white font-['Raleway'] mb-4">
            Quick Links
          </h2>
          <div className="flex gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-[#3f8e00] font-['IBM_Plex_Mono'] text-[14px] hover:underline"
            >
              View Live Site →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

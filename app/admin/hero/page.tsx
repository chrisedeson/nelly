import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { sql } from "@vercel/postgres";
import HeroEditor from "@/components/admin/HeroEditor";

export default async function HeroAdminPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/admin/login");
  }

  const { rows } = await sql`SELECT name, intro_text, profile_photo_url FROM hero_content LIMIT 1`;
  const heroData = rows[0] as { name: string; intro_text: string; profile_photo_url: string };

  return (
    <div className="min-h-screen bg-[#080808]">
      <nav className="bg-[#1b1b1b] border-b border-[#484848] px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[24px] font-extrabold text-white font-['Raleway']">
            Edit Hero Section
          </h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-8">
        <HeroEditor initialData={heroData} />
      </div>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { getPortfolioConfig, updatePortfolioConfig } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const config = await getPortfolioConfig();
    
    // Map database field names to frontend field names
    const response = {
      hero_name: config?.name || "",
      hero_tagline: config?.intro_text || "",
      // hero_description: config?.hero_description || "",
      hero_image_url: config?.profile_image_url || "",
      hero_cta_text: config?.cta_text || "",
      hero_cta_link: config?.hero_cta_link || "",
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching portfolio config:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio config" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    // Map frontend field names to database field names
    const dbData = {
      name: data.hero_name || data.name,
      intro_text: data.hero_tagline || data.intro_text,
      profile_image_url: data.hero_image_url || data.profile_image_url,
      cta_text: data.hero_cta_text || data.cta_text,
    };
    
    const updated = await updatePortfolioConfig(dbData);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating portfolio config:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio config" },
      { status: 500 }
    );
  }
}

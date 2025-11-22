import { auth } from "@/lib/auth";
import { getSocialLinks, createSocialLink } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const socialLinks = await getSocialLinks();
    // Map database fields to frontend expected fields
    const mapped = socialLinks.map((link: any) => ({
      id: link.id,
      platform_name: link.platform || '',
      platform_url: link.url || '',
      icon_name: link.platform || '', // Use platform name as icon name
      order_index: link.order_index || 0,
    }));
    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching social links:", error);
    return NextResponse.json(
      { error: "Failed to fetch social links" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    // Map frontend fields to database fields
    const dbData = {
      platform: data.platform_name || data.platform || '',
      url: data.platform_url || data.url || '',
      order_index: data.order_index || 0,
    };
    const socialLink = await createSocialLink(dbData);
    return NextResponse.json(socialLink);
  } catch (error) {
    console.error("Error creating social link:", error);
    return NextResponse.json(
      { error: "Failed to create social link" },
      { status: 500 }
    );
  }
}

import { auth } from "@/lib/auth";
import { getCompanyLogos, createCompanyLogo } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const logos = await getCompanyLogos();
    return NextResponse.json(logos, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error("Error fetching company logos:", error);
    return NextResponse.json(
      { error: "Failed to fetch company logos" },
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
    const logo = await createCompanyLogo(data);
    return NextResponse.json(logo);
  } catch (error) {
    console.error("Error creating company logo:", error);
    return NextResponse.json(
      { error: "Failed to create company logo" },
      { status: 500 }
    );
  }
}

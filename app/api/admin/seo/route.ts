import { auth } from "@/lib/auth";
import { getSEOSettings, updateSEOSettings } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const seo = await getSEOSettings();
    return NextResponse.json(seo);
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch SEO settings" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();
    const seo = await updateSEOSettings(data);
    return NextResponse.json(seo);
  } catch (error) {
    console.error("Error updating SEO settings:", error);
    return NextResponse.json(
      { error: "Failed to update SEO settings" },
      { status: 500 }
    );
  }
}

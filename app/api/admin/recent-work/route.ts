import { auth } from "@/lib/auth";
import { getRecentWork, createRecentWork } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const recentWork = await getRecentWork();
    return NextResponse.json(recentWork);
  } catch (error) {
    console.error("Error fetching recent work:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent work" },
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
    const work = await createRecentWork(data);
    return NextResponse.json(work);
  } catch (error) {
    console.error("Error creating recent work:", error);
    return NextResponse.json(
      { error: "Failed to create recent work" },
      { status: 500 }
    );
  }
}

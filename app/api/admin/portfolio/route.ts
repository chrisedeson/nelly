import { auth } from "@/lib/auth";
import { getPortfolioConfig, updatePortfolioConfig } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const config = await getPortfolioConfig();
    return NextResponse.json(config);
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
    const updated = await updatePortfolioConfig(data);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating portfolio config:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio config" },
      { status: 500 }
    );
  }
}

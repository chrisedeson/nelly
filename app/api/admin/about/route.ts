import { auth } from "@/lib/auth";
import { getAbout, updateAbout } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const about = await getAbout();
    return NextResponse.json(about);
  } catch (error) {
    console.error("Error fetching about:", error);
    return NextResponse.json(
      { error: "Failed to fetch about" },
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
    const about = await updateAbout(data);
    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 }
    );
  }
}

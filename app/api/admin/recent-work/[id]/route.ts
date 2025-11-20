import { auth } from "@/lib/auth";
import {
  getRecentWorkItem,
  updateRecentWork,
  deleteRecentWork,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const work = await getRecentWorkItem(parseInt(id));

    if (!work) {
      return NextResponse.json({ error: "Work not found" }, { status: 404 });
    }

    return NextResponse.json(work);
  } catch (error) {
    console.error("Error fetching recent work:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent work" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await request.json();
    const work = await updateRecentWork(parseInt(id), data);
    return NextResponse.json(work);
  } catch (error) {
    console.error("Error updating recent work:", error);
    return NextResponse.json(
      { error: "Failed to update recent work" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteRecentWork(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting recent work:", error);
    return NextResponse.json(
      { error: "Failed to delete recent work" },
      { status: 500 }
    );
  }
}

import { auth } from "@/lib/auth";
import {
  getSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const socialLink = await getSocialLink(parseInt(id));

    if (!socialLink) {
      return NextResponse.json(
        { error: "Social link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(socialLink);
  } catch (error) {
    console.error("Error fetching social link:", error);
    return NextResponse.json(
      { error: "Failed to fetch social link" },
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
    const socialLink = await updateSocialLink(parseInt(id), data);
    return NextResponse.json(socialLink);
  } catch (error) {
    console.error("Error updating social link:", error);
    return NextResponse.json(
      { error: "Failed to update social link" },
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
    await deleteSocialLink(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting social link:", error);
    return NextResponse.json(
      { error: "Failed to delete social link" },
      { status: 500 }
    );
  }
}

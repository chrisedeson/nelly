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

    // Map database fields to frontend expected fields
    const mapped = {
      id: socialLink.id,
      platform_name: socialLink.platform || '',
      platform_url: socialLink.url || '',
      icon_name: socialLink.platform || '',
      order_index: socialLink.order_index || 0,
    };
    return NextResponse.json(mapped);
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
    // Map frontend fields to database fields
    const dbData = {
      platform: data.platform_name || data.platform || '',
      url: data.platform_url || data.url || '',
      order_index: data.order_index || 0,
    };
    const socialLink = await updateSocialLink(parseInt(id), dbData);
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

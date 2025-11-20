import { auth } from "@/lib/auth";
import {
  getCompanyLogo,
  updateCompanyLogo,
  deleteCompanyLogo,
} from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const logo = await getCompanyLogo(parseInt(id));

    if (!logo) {
      return NextResponse.json(
        { error: "Company logo not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(logo);
  } catch (error) {
    console.error("Error fetching company logo:", error);
    return NextResponse.json(
      { error: "Failed to fetch company logo" },
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
    const logo = await updateCompanyLogo(parseInt(id), data);
    return NextResponse.json(logo);
  } catch (error) {
    console.error("Error updating company logo:", error);
    return NextResponse.json(
      { error: "Failed to update company logo" },
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
    await deleteCompanyLogo(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting company logo:", error);
    return NextResponse.json(
      { error: "Failed to delete company logo" },
      { status: 500 }
    );
  }
}

import { auth } from "@/lib/auth";
import { getContactInfo, updateContactInfo } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contact = await getContactInfo();
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact info" },
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
    const contact = await updateContactInfo(data);
    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact info:", error);
    return NextResponse.json(
      { error: "Failed to update contact info" },
      { status: 500 }
    );
  }
}

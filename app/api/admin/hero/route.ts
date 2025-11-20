import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, intro_text, button_text } = body;

    await sql`
      UPDATE hero_content
      SET name = ${name},
          intro_text = ${intro_text},
          button_text = ${button_text},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = (SELECT id FROM hero_content LIMIT 1)
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero" }, { status: 500 });
  }
}

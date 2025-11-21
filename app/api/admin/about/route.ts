import { auth } from "@/lib/auth";
import { getAbout, updateAbout } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const about = await getAbout();
    
    // Map database field names to frontend field names
    const response = about ? {
      title: about.title || "",
      description: about.content || "", // Map content to description
      image_url: about.image_url || "",
      years_experience: about.years_experience || 0,
      projects_completed: about.projects_completed || 0,
      skills: Array.isArray(about.skills) ? about.skills.join(", ") : "", // Convert array to comma-separated string
    } : null;
    
    return NextResponse.json(response);
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
    
    // Map frontend field names to database field names
    const dbData = {
      content: data.description || "", // Map description to content
      skills: data.skills ? data.skills.split(",").map((s: string) => s.trim()) : [], // Convert comma-separated string to array
    };
    
    const about = await updateAbout(dbData);
    return NextResponse.json(about);
  } catch (error) {
    console.error("Error updating about:", error);
    return NextResponse.json(
      { error: "Failed to update about" },
      { status: 500 }
    );
  }
}

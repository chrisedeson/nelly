import { auth } from "@/lib/auth";
import { getTestimonials, createTestimonial } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    
    // Map database fields to frontend expected fields
    const mapped = testimonials.map((t: any) => ({
      id: t.id,
      client_name: t.client_name || '',
      client_position: '', // Not in DB
      client_company: '', // Not in DB
      testimonial_text: t.quote || '',
      client_image_url: t.client_image_url || '',
      rating: 5, // Not in DB, default to 5
      order_index: t.order_index || 0,
    }));
    
    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
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
    
    // Map frontend field names to database field names
    const dbData = {
      quote: data.testimonial_text || data.quote || '',
      client_name: data.client_name || '',
      client_image_url: data.client_image_url,
      order_index: data.order_index || 0,
    };
    
    const testimonial = await createTestimonial(dbData);
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

import { auth } from "@/lib/auth";
import { getTestimonials, createTestimonial } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const testimonials = await getTestimonials();
    // getTestimonials now returns properly mapped fields
    return NextResponse.json(testimonials);
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
    
    console.log('Received testimonial data:', data);
    
    // Map frontend field names to database field names
    const dbData = {
      quote: data.testimonial_text || data.quote || '',
      client_name: data.client_name || '',
      client_position: data.client_position,
      client_company: data.client_company,
      client_image_url: data.client_image_url,
      rating: data.rating,
      order_index: data.order_index || 0,
    };
    
    console.log('Mapped to database format:', dbData);
    
    const testimonial = await createTestimonial(dbData);
    console.log('Created testimonial:', testimonial);
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

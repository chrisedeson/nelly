import { auth } from "@/lib/auth";
import { getTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await getTestimonial(parseInt(id));

    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    // Map database fields to frontend expected fields
    const mapped = {
      id: testimonial.id,
      client_name: testimonial.client_name || '',
      client_position: '', // Not in DB
      client_company: '', // Not in DB
      testimonial_text: testimonial.quote || '',
      client_image_url: testimonial.client_image_url || '',
      rating: 5, // Not in DB, default to 5
      order_index: testimonial.order_index || 0,
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonial" },
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
    
    // Map frontend field names to database field names
    const dbData = {
      quote: data.testimonial_text || data.quote || '',
      client_name: data.client_name || '',
      client_image_url: data.client_image_url,
      order_index: data.order_index || 0,
    };
    
    const testimonial = await updateTestimonial(parseInt(id), dbData);
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
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
    await deleteTestimonial(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}

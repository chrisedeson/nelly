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
      client_position: testimonial.client_position || '',
      client_company: testimonial.client_company || '',
      testimonial_text: testimonial.quote || '',
      client_image_url: testimonial.client_image_url || '',
      rating: testimonial.rating || 5,
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
    
    console.log('Updating testimonial:', id, 'with data:', data);
    
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
    
    const testimonial = await updateTestimonial(parseInt(id), dbData);
    console.log('Updated testimonial:', testimonial);
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

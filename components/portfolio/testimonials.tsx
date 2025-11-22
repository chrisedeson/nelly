interface Testimonial {
  id: number;
  client_name: string;
  client_position: string;
  client_company: string;
  testimonial_text: string;
  client_image_url?: string;
  rating: number;
}

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div
      id="testimonials"
      className="bg-[#080808] w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-2xl md:text-3xl lg:text-[34px] mb-4">
            Testimonials
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            What clients say about working with me.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border border-[#484848] rounded-lg p-6 md:p-8 relative"
            >
              <p className="font-['Raleway:Regular',sans-serif] text-white text-5xl md:text-6xl lg:text-[80px] absolute top-2 left-4 opacity-50 leading-none">
                &quot;
              </p>
              <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm leading-relaxed mt-8 mb-6">
                {testimonial.testimonial_text}
              </p>
              <div className="flex items-center gap-4">
                {testimonial.client_image_url ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#484848]">
                    <img
                      src={testimonial.client_image_url}
                      alt={testimonial.client_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3f8e00] to-[#62ba1b]" />
                )}
                <div>
                  <p className="font-['Raleway:Bold',sans-serif] font-bold text-white text-base md:text-lg">
                    {testimonial.client_name}
                  </p>
                  {(testimonial.client_position || testimonial.client_company) && (
                    <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-xs">
                      {testimonial.client_position}
                      {testimonial.client_position && testimonial.client_company && ' at '}
                      {testimonial.client_company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

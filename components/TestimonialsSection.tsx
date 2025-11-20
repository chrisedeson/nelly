'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Testimonial, SectionContent } from '@/types/portfolio';

interface TestimonialsSectionProps {
  content: SectionContent;
  items: Testimonial[];
}

export default function TestimonialsSection({ content, items }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-[80px] bg-[#080808]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-[50px]"
      >
        <h2 className="text-[34px] font-extrabold text-white font-['Raleway'] mb-[10px]">
          {content.heading}
        </h2>
        <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] leading-[24px] tracking-[0.14px] max-w-[570px] mx-auto">
          {content.subheading}
        </p>
      </motion.div>

      <div className="px-[180px] grid grid-cols-2 gap-[30px]">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="border border-[#484848] rounded-[6px] p-[30px] relative bg-[#0a0a0a] hover:border-[#62ba1b] transition-all"
          >
            <span className="absolute top-[20px] left-[30px] text-[100px] text-white font-['Raleway'] leading-none opacity-20">
              "
            </span>
            <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] leading-[24px] tracking-[0.14px] mb-[60px] relative z-10">
              {item.testimonial_text}
            </p>
            <div className="flex items-center gap-[20px]">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-[#1b1b1b]">
                {item.client_photo_url ? (
                  <Image
                    src={item.client_photo_url}
                    alt={item.client_name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#9c9c9c]">
                    👤
                  </div>
                )}
              </div>
              <h4 className="text-[18px] font-bold text-white font-['Raleway']">
                {item.client_name}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { CaseStudy, SectionContent } from '@/types/portfolio';

interface CaseStudiesSectionProps {
  content: SectionContent;
  items: CaseStudy[];
}

export default function CaseStudiesSection({ content, items }: CaseStudiesSectionProps) {
  return (
    <section id="case-studies" className="py-[100px] px-[208px] bg-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-[50px]"
      >
        <h2 className="text-[34px] font-extrabold text-[#080808] font-['Raleway'] mb-[10px]">
          {content.heading}
        </h2>
        <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] leading-[24px] tracking-[0.14px] max-w-[570px] mx-auto whitespace-pre-wrap">
          {content.subheading}
        </p>
      </motion.div>

      <div className="flex flex-col gap-[80px]">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`flex items-center gap-[55px] ${
              index % 2 === 1 ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Text Content */}
            <div className="flex-1">
              {item.tag && (
                <span
                  className="inline-block px-[10px] py-0 rounded-[60px] text-[12px] font-bold font-['IBM_Plex_Mono'] tracking-[0.12px] mb-[10px]"
                  style={{
                    backgroundColor: item.tag_color ? `${item.tag_color}20` : '#fff6e9',
                    color: item.tag_color || '#ffa217',
                  }}
                >
                  {item.tag}
                </span>
              )}
              <h3 className="text-[24px] font-extrabold text-[#080808] font-['Raleway'] mb-[10px]">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] leading-[24px] tracking-[0.14px] mb-[30px] max-w-[421px]">
                {item.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-[24px] py-[10px] rounded-[4px] text-white font-['IBM_Plex_Mono'] font-bold text-[14px] flex items-center gap-[10px] shadow-[0px_8px_30px_0px_rgba(42,176,144,0.1)] transition-all"
                style={{
                  backgroundColor: item.button_color || '#ffa217',
                }}
              >
                {item.button_text}
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </div>

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="flex-1 relative h-[300px] rounded-[8px] overflow-hidden"
            >
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#f0f0f0] flex items-center justify-center">
                  <span className="text-[#9c9c9c] text-[40px]">🖼️</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

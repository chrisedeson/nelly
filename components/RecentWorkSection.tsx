'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { RecentWork, SectionContent } from '@/types/portfolio';

interface RecentWorkSectionProps {
  content: SectionContent;
  items: RecentWork[];
}

export default function RecentWorkSection({ content, items }: RecentWorkSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 2;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= items.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, items.length - itemsPerView) : prev - itemsPerView
    );
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section id="recent-work" className="py-[100px] px-[85px] bg-white">
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

      <div className="relative">
        {/* Navigation Arrows */}
        {items.length > itemsPerView && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Previous"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="14.5" stroke="#3f8e00" fill="white"/>
                <path d="M17 10L12 15L17 20" stroke="#3f8e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[30px] h-[30px] flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Next"
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="14.5" stroke="#3f8e00" fill="white"/>
                <path d="M13 10L18 15L13 20" stroke="#3f8e00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        <div className="flex gap-[30px] justify-center px-[95px]">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="flex-1 max-w-[445px]"
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[300px] rounded-[8px] overflow-hidden mb-[10px]"
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

              {/* Text Content */}
              <h3 className="text-[24px] font-extrabold text-[#080808] font-['Raleway'] mb-[10px]">
                {item.title}
              </h3>
              <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] leading-[24px] tracking-[0.14px] mb-[20px]">
                {item.description}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#3f8e00] border border-[#62ba1b] text-white px-[24px] py-[10px] rounded-[4px] font-['IBM_Plex_Mono'] font-bold text-[14px] flex items-center gap-[10px] hover:bg-[#4aa100] transition-colors"
              >
                {item.button_text}
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

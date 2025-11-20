'use client';

import { motion } from 'framer-motion';
import FallbackImage from './FallbackImage';
import { figmaAssets } from '@/lib/figma-assets';
import type { Testimonial, SectionContent } from '@/types/portfolio';

interface TestimonialsSectionProps {
  content: SectionContent;
  items: Testimonial[];
}

// Better placeholder image sources
const getPlaceholderImage = (width: number, height: number, seed?: string) => {
  const seedParam = seed ? `?random=${seed}` : `?random=${Math.random()}`;
  return `https://picsum.photos/${width}/${height}${seedParam}`;
};

export default function TestimonialsSection({ content, items }: TestimonialsSectionProps) {
  return (
    <div className="relative bg-white">
      {/* Testimonials Section */}
      <div className="absolute left-0 top-[2102px] w-[1280px] h-[804px] bg-[#080808]">
        
        {/* Section Header */}
        <div className="absolute left-1/2 top-[80px] transform -translate-x-1/2 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-raleway font-extrabold text-[34px] leading-normal text-white"
          >
            {content.heading || 'Testimonials'}
          </motion.h2>
        </div>

        {/* Section Subtext */}
        <div className="absolute left-1/2 top-[130px] w-[570px] transform -translate-x-1/2 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px] text-center"
          >
            {content.subheading || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          </motion.p>
        </div>

        {/* Quote marks for each testimonial */}
        <div className="absolute left-[190px] top-[206px] font-raleway font-normal text-[100px] text-white leading-normal tracking-[1px]">"</div>
        <div className="absolute left-[665px] top-[206px] font-raleway font-normal text-[100px] text-white leading-normal tracking-[1px]">"</div>
        <div className="absolute left-[190px] top-[480px] font-raleway font-normal text-[100px] text-white leading-normal tracking-[1px]">"</div>
        <div className="absolute left-[665px] top-[480px] font-raleway font-normal text-[100px] text-white leading-normal tracking-[1px]">"</div>

        {/* Testimonial 1 (Top Left) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute left-[180px] top-[238px] w-[445px] h-[212px]"
        >
          <div className="border border-[#484848] rounded-[6px] w-full h-full relative">
            <p className="absolute left-[30px] top-[30px] w-[409px] font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px]">
              {items[0]?.testimonial_text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
            
            {/* Client Info */}
            <div className="absolute left-[100px] top-[147px]">
              <span className="font-raleway font-bold text-[18px] leading-normal text-white text-center">
                {items[0]?.client_name || 'Client Name'}
              </span>
            </div>
            
            {/* Client Photo */}
            <div className="absolute left-[30px] top-[132px] w-[50px] h-[50px] rounded-full overflow-hidden">
              <FallbackImage
                src={items[0]?.client_photo_url || figmaAssets.client1}
                alt={items[0]?.client_name || 'Client Name'}
                width={50}
                height={50}
                className="w-full h-full rounded-full"
                objectFit="cover"
                fallbackGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
            </div>
          </div>
        </motion.div>

        {/* Testimonial 2 (Top Right) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute left-[655px] top-[238px] w-[445px] h-[212px]"
        >
          <div className="border border-[#484848] rounded-[6px] w-full h-full relative">
            <p className="absolute left-[30px] top-[30px] w-[360px] font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px]">
              {items[1]?.testimonial_text || 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
            
            {/* Client Info */}
            <div className="absolute left-[100px] top-[147px]">
              <span className="font-raleway font-bold text-[18px] leading-normal text-white text-center">
                {items[1]?.client_name || 'Client Name'}
              </span>
            </div>
            
            {/* Client Photo */}
            <div className="absolute left-[30px] top-[132px] w-[50px] h-[50px] rounded-full overflow-hidden">
              <FallbackImage
                src={items[1]?.client_photo_url || figmaAssets.client2}
                alt={items[1]?.client_name || 'Client Name'}
                width={50}
                height={50}
                className="w-full h-full rounded-full"
                objectFit="cover"
                fallbackGradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              />
            </div>
          </div>
        </motion.div>

        {/* Testimonial 3 (Bottom Left) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute left-[180px] top-[512px] w-[445px] h-[212px]"
        >
          <div className="border border-[#484848] rounded-[6px] w-full h-full relative">
            <p className="absolute left-[30px] top-[30px] w-[409px] font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px]">
              {items[2]?.testimonial_text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
            
            {/* Client Info */}
            <div className="absolute left-[100px] top-[147px]">
              <span className="font-raleway font-bold text-[18px] leading-normal text-white text-center">
                {items[2]?.client_name || 'Client Name'}
              </span>
            </div>
            
            {/* Client Photo */}
            <div className="absolute left-[30px] top-[132px] w-[50px] h-[50px] rounded-full overflow-hidden">
              <FallbackImage
                src={items[2]?.client_photo_url || figmaAssets.client3}
                alt={items[2]?.client_name || 'Client Name'}
                width={50}
                height={50}
                className="w-full h-full rounded-full"
                objectFit="cover"
                fallbackGradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              />
            </div>
          </div>
        </motion.div>

        {/* Testimonial 4 (Bottom Right) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="absolute left-[655px] top-[512px] w-[445px] h-[212px]"
        >
          <div className="border border-[#484848] rounded-[6px] w-full h-full relative">
            <p className="absolute left-[30px] top-[30px] w-[360px] font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px]">
              {items[3]?.testimonial_text || 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
            </p>
            
            {/* Client Info */}
            <div className="absolute left-[100px] top-[147px]">
              <span className="font-raleway font-bold text-[18px] leading-normal text-white text-center">
                {items[3]?.client_name || 'Client Name'}
              </span>
            </div>
            
            {/* Client Photo */}
            <div className="absolute left-[30px] top-[132px] w-[50px] h-[50px] rounded-full overflow-hidden">
              <FallbackImage
                src={items[3]?.client_photo_url || figmaAssets.client4}
                alt={items[3]?.client_name || 'Client Name'}
                width={50}
                height={50}
                className="w-full h-full rounded-full"
                objectFit="cover"
                fallbackGradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

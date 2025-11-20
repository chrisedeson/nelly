'use client';

import { motion } from 'framer-motion';
import FallbackImage from './FallbackImage';
import { figmaAssets } from '@/lib/figma-assets';
import type { CaseStudy, SectionContent } from '@/types/portfolio';

interface CaseStudiesSectionProps {
  content: SectionContent;
  items: CaseStudy[];
}

// Better placeholder image sources
const getPlaceholderImage = (width: number, height: number, seed?: string) => {
  const seedParam = seed ? `?random=${seed}` : `?random=${Math.random()}`;
  return `https://picsum.photos/${width}/${height}${seedParam}`;
};

const tagConfigs = [
  { tag: 'Fintech', bg: '#fff6e9', color: '#ffa217', buttonColor: '#ffa217' },
  { tag: 'EdTech', bg: '#d0e6ff', color: '#000aff', buttonColor: '#000aff' },
  { tag: 'Pharma', bg: '#e0fff8', color: '#2ab090', buttonColor: '#2ab090' },
];

export default function CaseStudiesSection({ content, items }: CaseStudiesSectionProps) {
  return (
    <div className="relative bg-white">
      {/* Case Studies Section */}
      <div className="absolute left-[208px] top-[780px] w-[897px] h-[1242px]">
        
        {/* Section Header */}
        <div className="absolute left-[calc(50%-16px)] top-0 text-center transform -translate-x-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-raleway font-extrabold text-[34px] leading-normal text-[#080808] text-center"
          >
            {content.heading || 'Case Studies'}
          </motion.h2>
        </div>

        {/* Section Subtext */}
        <div className="absolute left-[calc(50%-16.5px)] top-[50px] w-[570px] text-center transform -translate-x-1/2">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px] text-center"
          >
            {content.subheading || 'Solving user & business problems since last 15+ years.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
          </motion.p>
        </div>

        {/* Work 1 - Fintech (Right-aligned content) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute left-0 top-[182px] w-[892px] h-[300px]"
        >
          {/* Tag */}
          <div className="absolute left-0 top-[27px] bg-[#fff6e9] px-[10px] py-0 rounded-[60px]">
            <span className="font-ibm-plex-mono font-bold text-[12px] leading-[24px] text-[#ffa217] tracking-[0.12px]">
              Fintech
            </span>
          </div>
          
          {/* Work Title */}
          <h3 className="absolute left-0 top-[71px] font-raleway font-extrabold text-[24px] leading-normal text-[#080808]">
            Work name here
          </h3>
          
          {/* Description */}
          <p className="absolute left-0 top-[109px] w-[421px] font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
          
          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-[427px] bg-[#ffa217] px-[24px] py-[10px] rounded-[4px] flex items-center gap-[10px] shadow-[0px_8px_30px_0px_rgba(42,176,144,0.1)]"
          >
            <span className="font-ibm-plex-mono font-bold text-[14px] leading-normal text-white">
              View case study
            </span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          {/* Image */}
          <div className="absolute left-[447px] top-0 w-[445px] h-[300px] overflow-hidden rounded-lg">
            <FallbackImage
              src={items[0]?.image_url || figmaAssets.caseStudy1}
              alt="Fintech Project"
              width={445}
              height={300}
              className="w-full h-full"
              objectFit="cover"
              fallbackGradient="linear-gradient(135deg, #ffa217 0%, #ff8c00 100%)"
            />
          </div>
        </motion.div>

        {/* Work 2 - EdTech (Left-aligned content) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute left-0 top-[562px] w-[897px] h-[300px]"
        >
          {/* Image */}
          <div className="absolute left-0 top-0 w-[445px] h-[300px] overflow-hidden rounded-lg">
            <FallbackImage
              src={items[1]?.image_url || figmaAssets.caseStudy2}
              alt="EdTech Project"
              width={445}
              height={300}
              className="w-full h-full"
              objectFit="cover"
              fallbackGradient="linear-gradient(135deg, #000aff 0%, #4169e1 100%)"
            />
          </div>
          
          {/* Tag */}
          <div className="absolute left-[476px] top-[27px] bg-[#d0e6ff] px-[10px] py-0 rounded-[60px]">
            <span className="font-ibm-plex-mono font-bold text-[12px] leading-[24px] text-[#000aff] tracking-[0.12px]">
              EdTech
            </span>
          </div>
          
          {/* Work Title */}
          <h3 className="absolute left-[476px] top-[71px] font-raleway font-extrabold text-[24px] leading-normal text-[#080808]">
            Work name here
          </h3>
          
          {/* Description */}
          <p className="absolute left-[476px] top-[109px] w-[421px] font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
          
          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-[476px] top-[245px] bg-[#000aff] px-[24px] py-[10px] rounded-[4px] flex items-center gap-[10px] shadow-[0px_8px_30px_0px_rgba(0,10,255,0.1)]"
          >
            <span className="font-ibm-plex-mono font-bold text-[14px] leading-normal text-white">
              View case study
            </span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* Work 3 - Pharma (Right-aligned content) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute left-0 top-[942px] w-[892px] h-[300px]"
        >
          {/* Tag */}
          <div className="absolute left-0 top-[27px] bg-[#e0fff8] px-[10px] py-0 rounded-[60px]">
            <span className="font-ibm-plex-mono font-bold text-[12px] leading-[24px] text-[#2ab090] tracking-[0.12px]">
              Pharma
            </span>
          </div>
          
          {/* Work Title */}
          <h3 className="absolute left-0 top-[71px] font-raleway font-extrabold text-[24px] leading-normal text-[#080808]">
            Work name here
          </h3>
          
          {/* Description */}
          <p className="absolute left-0 top-[109px] w-[421px] font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
          
          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-[245px] bg-[#2ab090] px-[24px] py-[10px] rounded-[4px] flex items-center gap-[10px] shadow-[0px_8px_30px_0px_rgba(42,176,144,0.1)]"
          >
            <span className="font-ibm-plex-mono font-bold text-[14px] leading-normal text-white">
              View case study
            </span>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          {/* Image */}
          <div className="absolute left-[447px] top-0 w-[445px] h-[300px] overflow-hidden rounded-lg">
            <FallbackImage
              src={items[2]?.image_url || figmaAssets.caseStudy3}
              alt="Pharma Project"
              width={445}
              height={300}
              className="w-full h-full"
              objectFit="cover"
              fallbackGradient="linear-gradient(135deg, #2ab090 0%, #00d4aa 100%)"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

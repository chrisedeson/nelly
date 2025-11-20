'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { HeroContent, Company, SocialLink } from '@/types/portfolio';

interface HeroSectionProps {
  hero: HeroContent;
  companies: Company[];
  socialLinks: SocialLink[];
  onGetStarted: () => void;
}

export default function HeroSection({ hero, companies, socialLinks, onGetStarted }: HeroSectionProps) {
  return (
    <div className="min-h-screen bg-[#080808] relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-[85px] right-[85px] bg-[#1b1b1b] h-[70px] rounded-bl-[8px] rounded-br-[8px] flex items-center justify-between px-[95px] z-50">
        <div className="flex gap-[70px]">
          <a href="#home" className="text-[#9c9c9c] text-[14px] font-['IBM_Plex_Mono'] hover:text-white transition-colors">Home</a>
          <a href="#case-studies" className="text-[#9c9c9c] text-[14px] font-['IBM_Plex_Mono'] hover:text-white transition-colors">Case Studies</a>
          <a href="#testimonials" className="text-[#9c9c9c] text-[14px] font-['IBM_Plex_Mono'] hover:text-white transition-colors">Testimonials</a>
          <a href="#recent-work" className="text-[#9c9c9c] text-[14px] font-['IBM_Plex_Mono'] hover:text-white transition-colors">Recent work</a>
          <a href="#contact" className="text-[#9c9c9c] text-[14px] font-['IBM_Plex_Mono'] hover:text-white transition-colors">Get In Touch</a>
        </div>
        
        <div className="flex gap-[15px]">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9c9c9c] hover:text-white transition-colors text-xl"
              aria-label={link.platform}
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="pt-[201px] px-[180px] flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[538px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-col gap-[10px]">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[44px] font-extrabold text-white font-['Raleway'] leading-normal"
            >
              {hero.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] leading-[24px] tracking-[0.14px]"
            >
              {hero.intro_text}
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-[#3f8e00] border border-[#62ba1b] text-white px-[64px] py-[21px] rounded-[4px] font-['IBM_Plex_Mono'] font-bold text-[16px] flex items-center gap-[10px] w-fit hover:bg-[#4aa100] transition-colors"
          >
            {hero.button_text}
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-[350px] h-[350px] rounded-full overflow-hidden"
        >
          {hero.profile_photo_url ? (
            <Image
              src={hero.profile_photo_url}
              alt={hero.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-[#1b1b1b] flex items-center justify-center">
              <span className="text-[#9c9c9c] text-[60px]">👤</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Worked with section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-[88px] left-[180px]"
      >
        <p className="text-[14px] text-white font-['IBM_Plex_Mono'] mb-[10px]">Worked with</p>
        <div className="flex gap-[30px]">
          {companies.slice(0, 5).map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className="w-[160px] h-[60px] border border-[#1b1b1b] rounded-[6px] flex items-center justify-center bg-[#0a0a0a] hover:border-[#3f8e00] transition-colors"
            >
              {company.logo_url ? (
                <Image
                  src={company.logo_url}
                  alt={company.name}
                  width={100}
                  height={30}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span className="text-[#9c9c9c] text-[12px]">{company.name}</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function getSocialIcon(platform: string) {
  const lower = platform.toLowerCase();
  if (lower.includes('linkedin')) return '🔗';
  if (lower.includes('twitter') || lower.includes('x')) return '🐦';
  if (lower.includes('github')) return '💻';
  if (lower.includes('behance')) return '🎨';
  if (lower.includes('dribbble')) return '🏀';
  return '🌐';
}

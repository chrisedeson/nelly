'use client';

import { motion } from 'framer-motion';
import FallbackImage from './FallbackImage';
import { figmaAssets } from '@/lib/figma-assets';
import type { HeroContent, Company, SocialLink } from '@/types/portfolio';

interface HeroSectionProps {
  hero: HeroContent;
  companies: Company[];
  socialLinks: SocialLink[];
  onGetStarted: () => void;
}

export default function HeroSection({ hero, companies, socialLinks, onGetStarted }: HeroSectionProps) {
  return (
    <section className="min-h-screen bg-[#080808] relative">
      {/* Navigation Bar */}
      <nav className="relative z-20 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mx-4 lg:mx-[85px] h-[70px] bg-[#1b1b1b] rounded-bl-lg rounded-br-lg flex items-center justify-between px-4 lg:px-[95px]">
          {/* Navigation Links */}
          <div className="hidden lg:flex gap-4 lg:gap-[70px]">
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              href="#home" 
              className="font-ibm-plex-mono text-[14px] text-[#9c9c9c] tracking-[0.14px] cursor-pointer hover:text-white transition-colors"
            >
              Home
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              href="#case-studies" 
              className="font-ibm-plex-mono text-[14px] text-[#9c9c9c] tracking-[0.14px] cursor-pointer hover:text-white transition-colors"
            >
              Case Studies
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              href="#testimonials" 
              className="font-ibm-plex-mono text-[14px] text-[#9c9c9c] tracking-[0.14px] cursor-pointer hover:text-white transition-colors"
            >
              Testimonials
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              href="#recent-work" 
              className="font-ibm-plex-mono text-[14px] text-[#9c9c9c] tracking-[0.14px] cursor-pointer hover:text-white transition-colors"
            >
              Recent work
            </motion.a>
            <motion.a
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              href="#contact" 
              className="font-ibm-plex-mono text-[14px] text-[#9c9c9c] tracking-[0.14px] cursor-pointer hover:text-white transition-colors"
            >
              Get In Touch
            </motion.a>
          </div>
        
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <span className="font-ibm-plex-mono text-[14px] text-[#9c9c9c]">Menu</span>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.slice(0, 3).map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank" 
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                className="w-[17px] h-[17px] flex items-center justify-center transition-all"
              >
                <FallbackImage
                  src={`https://picsum.photos/17/17?random=social-${index}`}
                  alt={link.platform}
                  width={17}
                  height={17}
                  fallbackGradient={`linear-gradient(135deg, hsl(${index * 60 + 200}, 70%, 60%) 0%, hsl(${index * 60 + 240}, 70%, 70%) 100%)`}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* Left Side - Text Content */}
          <div className="flex flex-col gap-[30px] lg:pl-[95px] order-2 lg:order-1">
            {/* Heading and Subheading */}
            <div className="flex flex-col gap-[10px]">
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="font-raleway font-extrabold text-[32px] lg:text-[44px] leading-normal text-white"
              >
                {hero.name || 'Your Name Here'}
              </motion.h1>
              
              {/* Intro Text */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-ibm-plex-mono text-[14px] leading-[24px] text-[#9c9c9c] tracking-[0.14px] max-w-[492px]"
              >
                {hero.intro_text || 'Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
              </motion.p>
            </div>
            
            {/* Call to Action Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetStarted}
              className="bg-[#3f8e00] border border-[#62ba1b] px-[64px] py-[21px] rounded-[4px] flex items-center gap-[10px] w-fit hover:bg-[#4aa100] transition-colors"
            >
              <span className="font-ibm-plex-mono font-bold text-[16px] leading-normal text-white">
                {hero.button_text || "Let's get started"}
              </span>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          {/* Right Side - Profile Photo */}
          <div className="flex justify-center lg:justify-end lg:pr-[95px] order-1 lg:order-2">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] rounded-full overflow-hidden"
            >
              <FallbackImage
                src={hero.profile_photo_url || figmaAssets.profilePhoto}
                alt={hero.name || 'Profile Photo'}
                width={350}
                height={350}
                className="w-full h-full rounded-full object-cover"
                fallbackGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              />
            </motion.div>
          </div>
        </div>

        {/* Worked With Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-16 lg:pl-[95px]"
        >
          <p className="font-ibm-plex-mono text-[14px] text-white mb-6">Worked with</p>
          
          {/* Client Logos */}
          <div className="flex flex-wrap gap-[20px] lg:gap-[30px] items-center">
            {companies.slice(0, 5).map((company, index) => (
              <motion.div 
                key={company.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="border border-[#1b1b1b] rounded-[6px] h-[60px] w-[140px] lg:w-[160px] flex items-center justify-center hover:border-[#3f8e00] transition-colors"
              >
                <FallbackImage
                  src={company.logo_url || `https://picsum.photos/120/40?random=logo-${index}`}
                  alt={company.name}
                  width={120}
                  height={40}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                  fallbackGradient={`linear-gradient(135deg, hsl(${index * 72}, 60%, 70%) 0%, hsl(${index * 72 + 30}, 60%, 80%) 100%)`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CaseStudiesSection from '@/components/CaseStudiesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import RecentWorkSection from '@/components/RecentWorkSection';
import ContactSection from '@/components/ContactSection';
import type { PortfolioData } from '@/types/portfolio';

interface PortfolioPageProps {
  data: PortfolioData;
}

export default function PortfolioPage({ data }: PortfolioPageProps) {
  const [showFullPage, setShowFullPage] = useState(false);

  const handleGetStarted = () => {
    setShowFullPage(true);
    // Smooth scroll to case studies section after animation
    setTimeout(() => {
      document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!showFullPage ? (
          <motion.div
            key="hero-only"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="h-screen overflow-hidden"
          >
            <HeroSection
              hero={data.hero}
              companies={data.companies}
              socialLinks={data.socialLinks}
              onGetStarted={handleGetStarted}
            />
          </motion.div>
        ) : (
          <motion.div
            key="full-page"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroSection
              hero={data.hero}
              companies={data.companies}
              socialLinks={data.socialLinks}
              onGetStarted={handleGetStarted}
            />
            <CaseStudiesSection
              content={data.caseStudies.content}
              items={data.caseStudies.items}
            />
            <TestimonialsSection
              content={data.testimonials.content}
              items={data.testimonials.items}
            />
            <RecentWorkSection
              content={data.recentWork.content}
              items={data.recentWork.items}
            />
            <ContactSection content={data.contact} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

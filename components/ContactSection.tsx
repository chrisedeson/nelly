'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ContactSection } from '@/types/portfolio';

interface ContactSectionProps {
  content: ContactSection;
}

export default function ContactSection({ content }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ email: '', mobile: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-[80px] bg-[#080808]">
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

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        onSubmit={handleSubmit}
        className="max-w-[350px] mx-auto flex flex-col gap-[15px]"
      >
        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Please enter your email"
            className="bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] h-[40px] text-[12px] text-[#757575] font-['IBM_Plex_Mono'] focus:outline-none focus:border-[#3f8e00]"
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold">
            Mobile
          </label>
          <input
            type="tel"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            placeholder="Enter mobile"
            className="bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] h-[40px] text-[12px] text-[#757575] font-['IBM_Plex_Mono'] focus:outline-none focus:border-[#3f8e00]"
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <label className="text-[12px] text-white font-['IBM_Plex_Mono'] font-semibold">
            Message
          </label>
          <textarea
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Enter your message"
            rows={5}
            className="bg-[#f8f8f8] border border-[#d8d8d8] rounded-[4px] px-[12px] py-[12px] text-[12px] text-[#757575] font-['IBM_Plex_Mono'] resize-none focus:outline-none focus:border-[#3f8e00]"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#3f8e00] border border-[#62ba1b] text-white px-[24px] py-[16px] rounded-[4px] font-['IBM_Plex_Mono'] font-bold text-[14px] flex items-center justify-center gap-[10px] hover:bg-[#4aa100] transition-colors disabled:opacity-50 mt-[20px]"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
            <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        {submitStatus === 'success' && (
          <p className="text-[#62ba1b] text-[12px] text-center font-['IBM_Plex_Mono']">
            Message sent successfully!
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-500 text-[12px] text-center font-['IBM_Plex_Mono']">
            Failed to send message. Please try again.
          </p>
        )}
      </motion.form>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mt-[100px]"
      >
        <p className="text-[14px] text-[#9c9c9c] font-['IBM_Plex_Mono'] tracking-[0.14px]">
          Made with ❤️
        </p>
      </motion.div>
    </section>
  );
}

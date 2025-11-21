"use client";

import { useState } from "react";
import svgPaths from "@/lib/imports/svg-paths";

interface SocialLink {
  platform_name: string;
  platform_url: string;
  icon_name: string;
}

export default function TopMenu({ socialLinks }: { socialLinks: SocialLink[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "Case Studies", id: "case-studies" },
    { label: "Testimonials", id: "testimonials" },
    { label: "Recent work", id: "recent-work" },
    { label: "Get In Touch", id: "get-in-touch" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1b1b1b] w-full" role="navigation" aria-label="Portfolio navigation">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-5">
        <div className="flex items-center justify-between">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-12 lg:gap-16" role="menubar" aria-label="Portfolio sections">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm hover:text-white transition-colors cursor-pointer"
                role="menuitem"
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="hidden md:flex items-center gap-4 ml-auto" role="list" aria-label="Social media links">
            {socialLinks?.map((link, idx) => (
              <a
                key={`social-${link.platform_name}-${idx}`}
                href={link.platform_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-30 hover:opacity-60 transition-opacity"
                aria-label={`Visit ${link.platform_name} profile`}
                role="listitem"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 18 17"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={svgPaths.p1173a900} />
                </svg>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 cursor-pointer"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden mt-4 pb-4 space-y-3"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm hover:text-white transition-colors py-2 cursor-pointer"
                role="menuitem"
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

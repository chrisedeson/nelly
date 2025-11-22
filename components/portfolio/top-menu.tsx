"use client";

import { useState } from "react";
import { IconType } from "react-icons";
import * as SimpleIcons from "react-icons/si";
import * as BrandIcons from "react-icons/fa";
import { ExternalLink } from "lucide-react";

interface SocialLink {
  platform?: string;
  platform_name?: string;
  url?: string;
  platform_url?: string;
  icon?: string;
  icon_name?: string;
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
            {socialLinks?.map((link, idx) => {
              // Support both database field names and admin field names
              const iconName = link.icon_name || link.icon || '';
              const platformName = link.platform_name || link.platform || '';
              const platformUrl = link.platform_url || link.url || '';
              
              // Get the appropriate icon from react-icons
              const getIcon = (name: string, platform: string): IconType => {
                const lowerName = name.toLowerCase();
                const lowerPlatform = platform.toLowerCase();
                
                // Simple Icons (SI) mapping - official brand logos
                const siMap: Record<string, any> = {
                  linkedin: SimpleIcons.SiLinkedin,
                  x: SimpleIcons.SiX,
                  twitter: SimpleIcons.SiX, // Twitter is now X
                  github: SimpleIcons.SiGithub,
                  facebook: SimpleIcons.SiFacebook,
                  instagram: SimpleIcons.SiInstagram,
                  youtube: SimpleIcons.SiYoutube,
                  dribbble: SimpleIcons.SiDribbble,
                  behance: SimpleIcons.SiBehance,
                  pinterest: SimpleIcons.SiPinterest,
                  tiktok: SimpleIcons.SiTiktok,
                  snapchat: SimpleIcons.SiSnapchat,
                  reddit: SimpleIcons.SiReddit,
                  medium: SimpleIcons.SiMedium,
                  whatsapp: SimpleIcons.SiWhatsapp,
                  telegram: SimpleIcons.SiTelegram,
                  discord: SimpleIcons.SiDiscord,
                  slack: SimpleIcons.SiSlack,
                  teams: BrandIcons.FaMicrosoft,
                  zoom: SimpleIcons.SiZoom,
                  skype: BrandIcons.FaSkype,
                  messenger: SimpleIcons.SiMessenger,
                  asana: SimpleIcons.SiAsana,
                  trello: SimpleIcons.SiTrello,
                  jira: SimpleIcons.SiJira,
                  monday: BrandIcons.FaCalendar,
                  clickup: SimpleIcons.SiClickup,
                  notion: SimpleIcons.SiNotion,
                  airtable: SimpleIcons.SiAirtable,
                  basecamp: SimpleIcons.SiBasecamp,
                  gmail: SimpleIcons.SiGmail,
                  google: SimpleIcons.SiGoogle,
                  outlook: BrandIcons.FaMicrosoft,
                  dropbox: SimpleIcons.SiDropbox,
                  onedrive: BrandIcons.FaMicrosoft,
                  figma: SimpleIcons.SiFigma,
                  sketch: SimpleIcons.SiSketch,
                  adobe: SimpleIcons.SiAdobe,
                  photoshop: SimpleIcons.SiAdobephotoshop,
                };
                
                // Try icon name first, then platform name
                const icon = siMap[lowerName] || siMap[lowerPlatform];
                return icon || ExternalLink;
              };
              
              const IconComponent = getIcon(iconName, platformName);
              
              return (
                <a
                  key={`social-${platformName}-${idx}`}
                  href={platformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white opacity-30 hover:opacity-60 transition-opacity"
                  aria-label={`Visit ${platformName} profile`}
                  role="listitem"
                >
                  <IconComponent 
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                </a>
              );
            })}
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

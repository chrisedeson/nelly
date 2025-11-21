"use client";
import { useState } from "react";
import svgPaths from "@/lib/imports/svg-paths";

interface PortfolioConfig {
  hero_name: string;
  hero_tagline: string;
  hero_description?: string;
  hero_image_url?: string;
  hero_cta_text?: string;
  hero_cta_link?: string;
}

interface CompanyLogo {
  company_name: string;
  logo_url: string;
}

interface Resume {
  file_url: string;
  file_name: string;
}

function CompanyLogoImage({ logo }: { logo: CompanyLogo }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a consistent gradient based on company name
  const getGradientColors = (name: string) => {
    const gradients = [
      ['#667eea', '#764ba2'], // Purple
      ['#f093fb', '#f5576c'], // Pink
      ['#4facfe', '#00f2fe'], // Blue
      ['#43e97b', '#38f9d7'], // Green
      ['#fa709a', '#fee140'], // Orange
      ['#30cfd0', '#330867'], // Teal
      ['#a8edea', '#fed6e3'], // Pastel
      ['#ff9a9e', '#fecfef'], // Rose
      ['#ffecd2', '#fcb69f'], // Peach
      ['#ff6e7f', '#bfe9ff'], // Sunset
    ];

    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  const [color1, color2] = getGradientColors(logo.company_name);

  return (
    <div className="h-14 md:h-16 rounded-md border border-[#1b1b1b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated gradient fallback */}
      <div
        className="absolute inset-0 animate-gradient-shift opacity-20"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color2})`,
          backgroundSize: '200% 200%',
        }}
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xs opacity-50">
              {logo.company_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Actual image */}
      {!imageError && (
        <img
          src={logo.logo_url}
          alt={logo.company_name}
          className={`relative z-10 max-w-full max-h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-30 hover:opacity-60' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      )}

      {/* Show gradient with company initial when image fails */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-lg opacity-40">
            {logo.company_name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

export default function Header({
  portfolio,
  logos,
  resume,
}: {
  portfolio: PortfolioConfig;
  logos: CompanyLogo[];
  resume?: Resume | null;
}) {
  const handleGetStarted = () => {
    document
      .getElementById("get-in-touch")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      id="home"
      className="bg-[#080808] w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 max-w-[600px] text-center lg:text-left">
            <div className="mb-6 lg:mb-8">
              <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-3xl md:text-4xl lg:text-[44px] leading-tight mb-4 lg:mb-6">
                {portfolio.hero_name}
              </h1>
              <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base leading-relaxed mb-2">
                {portfolio.hero_tagline}
              </p>
              {portfolio.hero_description && (
                <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base leading-relaxed">
                  {portfolio.hero_description}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mx-auto lg:mx-0">
              <button
                onClick={handleGetStarted}
                className="bg-[#3f8e00] box-border flex gap-3 items-center justify-center px-12 md:px-16 py-4 md:py-5 rounded border border-[#62ba1b] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.5)] cursor-pointer hover:bg-[#4ca500] transition-colors"
              >
                <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-white text-sm md:text-base">
                  {portfolio.hero_cta_text || "Let's get started"}
                </span>
                <svg
                  className="h-2.5 w-1.5"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 6 10"
                >
                  <path d={svgPaths.p99dff00} fill="white" />
                </svg>
              </button>
              {resume?.file_url && (
                <a
                  href={resume.file_url}
                  download={resume.file_name || "resume.pdf"}
                  className="bg-transparent box-border flex gap-3 items-center justify-center px-8 md:px-12 py-4 md:py-5 rounded border-2 border-[#3f8e00] text-[#3f8e00] hover:bg-[#3f8e00] hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-sm md:text-base">
                    Download Resume
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* Profile Photo */}
          <div className="flex-shrink-0 w-full max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] aspect-square">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ clipPath: "circle(50% at 50% 50%)" }}
              >
                {portfolio.hero_image_url ? (
                  <img
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                    src={portfolio.hero_image_url}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#3f8e00] to-[#62ba1b]" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Worked With Section */}
        {logos.length > 0 && (
          <div className="mt-12 lg:mt-16">
            <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-white text-sm mb-6 text-center lg:text-left">
              Worked with
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {logos.map((logo) => (
                <CompanyLogoImage key={logo.company_name} logo={logo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

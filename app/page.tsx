"use client";

import { useState } from "react";
import svgPaths from "@/lib/imports/svg-paths";

// Placeholder image URLs - replace these with your actual images
// Profile photo (using actual image from references)
const profileImage = "/images/profile.png";
// Project images (imgImage2, imgImage1, imgImage3 in reference)
const projectImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
];
// Testimonial images (imgImage13, imgImage6, imgImage5, imgImage12 in reference)
const testimonialImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop"
];
// Recent work images (imgImage10, imgImage11 in reference)
const workImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
];

function Header() {
  const handleGetStarted = () => {
    document.getElementById("get-in-touch")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="home" className="bg-[#080808] w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 max-w-[600px] text-center lg:text-left">
            <div className="mb-6 lg:mb-8">
              <h1 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-3xl md:text-4xl lg:text-[44px] leading-tight mb-4 lg:mb-6">
                Your Name Here
              </h1>
              <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base leading-relaxed">
                Intro text: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <button
              onClick={handleGetStarted}
              className="bg-[#3f8e00] box-border flex gap-3 items-center px-12 md:px-16 py-4 md:py-5 rounded border border-[#62ba1b] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.5)] cursor-pointer hover:bg-[#4ca500] transition-colors mx-auto lg:mx-0"
            >
              <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-white text-sm md:text-base">
                Let&apos;s get started
              </span>
              <svg className="h-2.5 w-1.5" fill="none" preserveAspectRatio="none" viewBox="0 0 6 10">
                <path d={svgPaths.p99dff00} fill="white" />
              </svg>
            </button>
          </div>

          {/* Profile Photo */}
          <div className="flex-shrink-0 w-full max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] aspect-square">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <div className="absolute inset-0" style={{ clipPath: "circle(50% at 50% 50%)" }}>
                <img
                  alt="Profile"
                  className="w-full h-full object-cover object-center"
                  src={profileImage}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Worked With Section */}
        <div className="mt-12 lg:mt-16">
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-white text-sm mb-6 text-center lg:text-left">
            Worked with
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-14 md:h-16 rounded-md border border-[#1b1b1b] flex items-center justify-center opacity-30"
              >
                <div className="text-white text-xs">Logo {i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudies() {
  const projects = [
    {
      title: "Work name here",
      tag: "Fintech",
      tagBg: "#fff6e9",
      tagColor: "#ffa217",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.",
      image: projectImages[0],
      buttonBg: "#ffa217"
    },
    {
      title: "Work name here",
      tag: "EdTech",
      tagBg: "#d0e6ff",
      tagColor: "#000aff",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.",
      image: projectImages[1],
      buttonBg: "#000aff"
    },
    {
      title: "Work name here",
      tag: "Pharma",
      tagBg: "#e0fff8",
      tagColor: "#2ab090",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.",
      image: projectImages[2],
      buttonBg: "#2ab090"
    }
  ];

  return (
    <div id="case-studies" className="bg-white w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-2xl md:text-3xl lg:text-[34px] mb-4">
            Case Studies
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            Solving user & business problems since last 15+ years.<br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8 md:space-y-12 lg:space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 md:gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 aspect-[3/2] rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div
                  className="inline-block px-3 py-1 rounded-full"
                  style={{ backgroundColor: project.tagBg }}
                >
                  <span
                    className="font-['IBM_Plex_Mono:Bold',sans-serif] text-xs"
                    style={{ color: project.tagColor }}
                  >
                    {project.tag}
                  </span>
                </div>
                <h3 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-xl md:text-2xl">
                  {project.title}
                </h3>
                <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm leading-relaxed">
                  {project.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded text-white hover:brightness-110 transition-all"
                  style={{ backgroundColor: project.buttonBg }}
                >
                  <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-sm">
                    View case study
                  </span>
                  <svg className="h-2.5 w-1.5" fill="none" viewBox="0 0 6 10">
                    <path d={svgPaths.p99dff00} fill="white" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Client Name",
      image: testimonialImages[0]
    },
    {
      quote: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Client Name",
      image: testimonialImages[1]
    },
    {
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Client Name",
      image: testimonialImages[2]
    },
    {
      quote: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Client Name",
      image: testimonialImages[3]
    }
  ];

  return (
    <div id="testimonials" className="bg-[#080808] w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-2xl md:text-3xl lg:text-[34px] mb-4">
            Testimonials
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border border-[#484848] rounded-lg p-6 md:p-8 relative"
            >
              <p className="font-['Raleway:Regular',sans-serif] text-white text-5xl md:text-6xl lg:text-[80px] absolute top-2 left-4 opacity-50 leading-none">
                &quot;
              </p>
              <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm leading-relaxed mt-8 mb-6">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#484848]">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="font-['Raleway:Bold',sans-serif] font-bold text-white text-base md:text-lg">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentWork() {
  const works = [
    {
      title: "Work name here",
      description: "Labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.",
      image: workImages[0]
    },
    {
      title: "Work name here",
      description: "Rempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt u",
      image: workImages[1]
    }
  ];

  return (
    <div id="recent-work" className="bg-white w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-2xl md:text-3xl lg:text-[34px] mb-4">
            Recent Work
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            Solving user & business problems since last 15+ years.<br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Work Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8">
          {works.map((work, index) => (
            <div key={index} className="space-y-4">
              <div className="w-full aspect-[3/2] rounded-lg overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-[#080808] text-xl md:text-2xl">
                {work.title}
              </h3>
              <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm leading-relaxed">
                {work.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 rounded bg-[#3f8e00] text-white border border-[#62ba1b] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.3)] hover:bg-[#4ca500] transition-colors"
              >
                <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-sm">
                  Know more
                </span>
                <svg className="h-2.5 w-1.5" fill="none" viewBox="0 0 6 10">
                  <path d={svgPaths.p99dff00} fill="white" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4">
          <button className="w-8 h-8 rounded-full border border-[#9c9c9c] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 30 30">
              <path d={svgPaths.p4942d80} fill="#9C9C9C" />
            </svg>
          </button>
          <button className="w-8 h-8 rounded-full border border-[#9c9c9c] flex items-center justify-center hover:bg-[#f5f5f5] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 30 30">
              <path d={svgPaths.p4942d80} fill="#9C9C9C" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function GetInTouch() {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    setEmail("");
    setMobile("");
    setMessage("");
  };

  return (
    <div id="get-in-touch" className="bg-[#080808] w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-2xl md:text-3xl lg:text-[34px] mb-4">
            Get In Touch
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-['IBM_Plex_Mono:SemiBold',sans-serif] text-white text-xs mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email"
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded px-3 py-3 font-['IBM_Plex_Mono:Regular',sans-serif] text-[#757575] text-xs outline-none focus:border-[#3f8e00] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-['IBM_Plex_Mono:SemiBold',sans-serif] text-white text-xs mb-2">
              Mobile
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile"
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded px-3 py-3 font-['IBM_Plex_Mono:Regular',sans-serif] text-[#757575] text-xs outline-none focus:border-[#3f8e00] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-['IBM_Plex_Mono:SemiBold',sans-serif] text-white text-xs mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows={5}
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded px-3 py-3 font-['IBM_Plex_Mono:Regular',sans-serif] text-[#757575] text-xs outline-none resize-none focus:border-[#3f8e00] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto mx-auto flex items-center justify-center gap-3 px-6 py-4 rounded bg-[#3f8e00] text-white border border-[#62ba1b] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.3)] hover:bg-[#4ca500] transition-colors"
          >
            <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-sm">
              Submit
            </span>
            <svg className="h-2.5 w-1.5" fill="none" viewBox="0 0 6 10">
              <path d={svgPaths.p99dff00} fill="white" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

function TopMenu() {
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
    { label: "Get In Touch", id: "get-in-touch" }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#1b1b1b] w-full">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-5">
          <div className="flex items-center justify-between">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12 lg:gap-16">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="hidden md:flex items-center gap-4 ml-auto">
              <a href="#" className="text-white opacity-30 hover:opacity-60 transition-opacity">
                <svg className="w-4 h-4" viewBox="0 0 18 17" fill="currentColor">
                  <path d={svgPaths.p1173a900} />
                </svg>
              </a>
              <a href="#" className="text-white opacity-30 hover:opacity-60 transition-opacity">
                <svg className="w-16 h-4" viewBox="0 0 65 15" fill="currentColor">
                  <path d={svgPaths.p3ba53cf0} />
                </svg>
              </a>
              <a href="#" className="text-white opacity-30 hover:opacity-60 transition-opacity">
                <svg className="w-4 h-4" viewBox="0 0 18 17" fill="currentColor">
                  <path d={svgPaths.p16b5c240} />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm hover:text-white transition-colors py-2"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

function Footer() {
  return (
    <div className="bg-[#1b1b1b] w-full py-6 px-4">
      <div className="max-w-[1440px] mx-auto text-center">
        <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm">
          Made with ❤️
        </p>
      </div>
    </div>
  );
}

export default function PersonalPortfolioTemplate() {
  return (
    <div className="bg-white min-h-screen w-full">
      <TopMenu />
      <Header />
      <CaseStudies />
      <Testimonials />
      <RecentWork />
      <GetInTouch />
      <Footer />
    </div>
  );
}

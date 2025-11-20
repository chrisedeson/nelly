"use client";

import { useState } from "react";
import svgPaths from "@/lib/imports/svg-paths";

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      id="get-in-touch"
      className="bg-[#080808] w-full py-12 md:py-20 lg:py-24 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-[700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-['Raleway:ExtraBold',sans-serif] font-extrabold text-white text-2xl md:text-3xl lg:text-[34px] mb-4">
            Get In Touch
          </h2>
          <p className="font-['IBM_Plex_Mono:Regular',sans-serif] text-[#9c9c9c] text-sm md:text-base max-w-[570px] mx-auto leading-relaxed">
            Have a project in mind? Let's work together to make it a success.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-['IBM_Plex_Mono:SemiBold',sans-serif] text-white text-xs mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Please enter your name"
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded px-3 py-3 font-['IBM_Plex_Mono:Regular',sans-serif] text-[#757575] text-xs outline-none focus:border-[#3f8e00] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-['IBM_Plex_Mono:SemiBold',sans-serif] text-white text-xs mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Please enter your email"
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded px-3 py-3 font-['IBM_Plex_Mono:Regular',sans-serif] text-[#757575] text-xs outline-none focus:border-[#3f8e00] transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-['IBM_Plex_Mono:SemiBold',sans-serif] text-white text-xs mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Enter your message"
              rows={5}
              className="w-full bg-[#f8f8f8] border border-[#d8d8d8] rounded px-3 py-3 font-['IBM_Plex_Mono:Regular',sans-serif] text-[#757575] text-xs outline-none resize-none focus:border-[#3f8e00] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto mx-auto flex items-center justify-center gap-3 px-6 py-4 rounded bg-[#3f8e00] text-white border border-[#62ba1b] shadow-[0px_8px_30px_0px_rgba(63,142,0,0.3)] hover:bg-[#4ca500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-['IBM_Plex_Mono:Bold',sans-serif] text-sm">
              {submitting ? "Sending..." : "Submit"}
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

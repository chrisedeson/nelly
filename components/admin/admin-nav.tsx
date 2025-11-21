"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/about", label: "About", disabled: true, title: "Coming soon - not rendered on main site" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/recent-work", label: "Recent Work" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/social", label: "Social" },
  { href: "/admin/logos", label: "Logos" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/resume", label: "Resume" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex space-x-4" role="menubar" aria-label="Main menu">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm transition-colors px-3 py-1 rounded ${
              link.disabled 
                ? "line-through opacity-50 hover:text-primary" 
                : isActive
                ? "bg-gray-100 dark:bg-gray-700 text-primary font-medium"
                : "hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
            title={link.title}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}

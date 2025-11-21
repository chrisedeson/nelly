import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  Home,
  User,
  Briefcase,
  MessageSquare,
  Clock,
  Mail,
  Share2,
  Building2,
  Search,
  FileText,
  Settings,
} from "lucide-react";

const sections = [
  {
    title: "Hero Section",
    description: "Edit your name, tagline, and hero image",
    icon: Home,
    href: "/admin/hero",
  },
  {
    title: "About",
    description: "Update your bio, image, and skills (Coming soon - not rendered on site)",
    icon: User,
    href: "/admin/about",
    disabled: true,
  },
  {
    title: "Projects",
    description: "Manage your portfolio projects",
    icon: Briefcase,
    href: "/admin/projects",
  },
  {
    title: "Testimonials",
    description: "Add and edit client testimonials",
    icon: MessageSquare,
    href: "/admin/testimonials",
  },
  {
    title: "Recent Work",
    description: "Showcase your latest achievements",
    icon: Clock,
    href: "/admin/recent-work",
  },
  {
    title: "Contact Info",
    description: "Update your contact details",
    icon: Mail,
    href: "/admin/contact",
  },
  {
    title: "Social Links",
    description: "Manage your social media profiles",
    icon: Share2,
    href: "/admin/social",
  },
  {
    title: "Company Logos",
    description: "Add logos of companies you've worked with",
    icon: Building2,
    href: "/admin/logos",
  },
  {
    title: "SEO Settings",
    description: "Configure meta tags and SEO",
    icon: Search,
    href: "/admin/seo",
  },
  {
    title: "Resume",
    description: "Upload and manage your resume PDF",
    icon: FileText,
    href: "/admin/resume",
  },
  {
    title: "Settings",
    description: "Change your admin password",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your portfolio content from here
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className={`p-6 hover:shadow-lg transition-shadow cursor-pointer ${(section as any).disabled ? 'opacity-50' : ''}`}>
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${(section as any).disabled ? 'line-through' : ''}`}>{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

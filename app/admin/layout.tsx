import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-bold">
                Admin Panel
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link
                  href="/admin/hero"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Hero
                </Link>
                <Link
                  href="/admin/about"
                  className="text-sm hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/admin/projects"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/admin/testimonials"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
                <Link
                  href="/admin/recent-work"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Recent Work
                </Link>
                <Link
                  href="/admin/contact"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/admin/social"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Social
                </Link>
                <Link
                  href="/admin/logos"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Logos
                </Link>
                <Link
                  href="/admin/seo"
                  className="text-sm hover:text-primary transition-colors"
                >
                  SEO
                </Link>
                <Link
                  href="/admin/resume"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Resume
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" target="_blank">
                <Button variant="outline" size="sm">
                  View Site
                </Button>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <Button variant="destructive" size="sm" type="submit">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

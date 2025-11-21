import type { Metadata } from "next";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminNav from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "Admin Panel | Portfolio",
  description: "Portfolio content management system",
};

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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded">
        Skip to main content
      </a>
      <nav className="border-b bg-white dark:bg-gray-800" role="navigation" aria-label="Admin navigation">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-bold" aria-label="Admin Panel Home">
                Admin Panel
              </Link>
              <AdminNav />
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" target="_blank" rel="noopener noreferrer" aria-label="View public portfolio site in new tab">
                <Button variant="outline" size="sm">
                  View Site
                </Button>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
                aria-label="Logout form"
              >
                <Button variant="destructive" size="sm" type="submit" aria-label="Logout from admin panel">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main id="main-content" className="container mx-auto px-4 py-8" role="main" aria-label="Admin content">
        {children}
      </main>
    </div>
  );
}

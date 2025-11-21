import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Portfolio",
  description: "Admin login page for portfolio management",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

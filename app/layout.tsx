import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nelly - Project Manager",
  description: "Professional portfolio showcasing project management expertise and case studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

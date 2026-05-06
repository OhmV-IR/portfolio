import type { Metadata } from "next";
import "@tabler/core/dist/css/tabler.min.css";
import "./globals.css";
import SiteNavbar from "@/components/SiteNavbar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A modern portfolio for projects, skills, socials, and resume.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <SiteNavbar />
          <div className="page-wrapper">{children}</div>
        </div>
      </body>
    </html>
  );
}

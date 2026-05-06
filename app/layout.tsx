import type { Metadata } from "next";
import "@tabler/core/dist/css/tabler.min.css";
import "./globals.css";
import SiteNavbar from "@/components/SiteNavbar";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Adrien Bourdeaux | Portfolio",
  description: "Projects, open-source contributions, skills, socials, and resume for Adrien Bourdeaux.",
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
          <Analytics></Analytics>
          <SpeedInsights></SpeedInsights>
          <SiteNavbar />
          <div className="page-wrapper">{children}</div>
        </div>
      </body>
    </html>
  );
}

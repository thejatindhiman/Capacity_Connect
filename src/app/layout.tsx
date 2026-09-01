import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Capacity Connect | Digital Learning Platform",
    template: "%s | Capacity Connect",
  },
  description:
    "A Digital Capacity Building and Learning Management Portal for organizational training, competency development, and knowledge sharing.",
  keywords: ["LMS", "learning", "training", "courses", "assessments", "SIH 2026"],
  authors: [{ name: "Capacity Connect Team" }],
  openGraph: {
    type: "website",
    siteName: "Capacity Connect",
    title: "Capacity Connect | Digital Learning Platform",
    description: "Centralized web-based platform for organizational capacity building.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

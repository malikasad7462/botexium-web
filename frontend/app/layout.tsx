import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import BackToTop from "@/components/BackToTop";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BOTEXIUM Ecosystem",
    template: "%s | BOTEXIUM Ecosystem",
  },
  description: "A global digital ecosystem connecting Software, Artificial Intelligence, Business, Education, Marketplace and Blockchain into one powerful platform.",
  keywords: ["BOTEXIUM", "Ecosystem", "Blockchain", "AI", "Web3"],
  authors: [{ name: "BOTEXIUM Team" }],
  creator: "BOTEXIUM",
  openGraph: {
    title: "BOTEXIUM Ecosystem",
    description: "Building the future of global digital ecosystems.",
    siteName: "BOTEXIUM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BOTEXIUM Ecosystem",
    description: "Building the future of global digital ecosystems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#050816] text-white antialiased">
        <Providers>
          <AnnouncementBar />
          {children}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import GradientBackground from "@/components/GradientBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import StartupSequence from "@/components/StartupSequence";
import TimeTravelButton from "@/components/TimeTravelButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Pranit | Full-Stack AI Developer & Civil Engineer",
    template: "%s | Pranit"
  },
  description: "Full-Stack AI Developer & Civil Engineer. Explore my work in predictive models, dashboards, and AI integration.",
  keywords: ["Full-Stack AI Developer", "Civil Engineer", "Portfolio", "Python", "Next.js", "AI", "Pranit"],
  authors: [{ name: "Pranit" }],
  openGraph: {
    title: "Pranit | Full-Stack AI Developer & Civil Engineer",
    description: "Results-oriented Full-Stack AI Developer & Civil Engineer with expertise in AI agents, full-stack dev, and data solutions.",
    url: "https://pranitcs.vercel.app",
    siteName: "Pranit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pranit Portfolio"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranit | Full-Stack AI Developer & Civil Engineer",
    description: "Full-Stack AI Developer & Civil Engineer. Explore my work in predictive models and data solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>
            <StartupSequence />
            <TimeTravelButton />
            <CustomCursor />
            <GradientBackground />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <Analytics />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

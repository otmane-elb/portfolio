import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Analytics } from "@vercel/analytics/next";
import Tracking from "./components/Tracking"; // 👈 we’ll create this in Step 2

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Spotlight from "./components/Spotlight";

export const metadata = {
  title: 'Otmane El Baghazaoui | Portfolio',
  description: 'Personal portfolio website built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-accent/30 selection:text-white bg-neutral-950`}>
        <div className="relative min-h-screen overflow-x-hidden glow-mesh">
          <Analytics />
          <Tracking />
          <Spotlight />

          <Navbar />

          <main className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}

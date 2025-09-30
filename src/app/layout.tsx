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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Analytics />
        <Tracking /> {}
        {children}
      </body>
    </html>
  );
}

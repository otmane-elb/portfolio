import { Inter } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Analytics } from "@vercel/analytics/next";
import Tracking from "./components/Tracking";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Spotlight from "./components/Spotlight";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: 'Otmane El Baghazaoui | Flutter Developer',
  description: 'Senior Flutter Developer specializing in secure, government-grade mobile applications. 4+ years building high-performance apps for public administrations in Morocco.',
  keywords: 'Flutter Developer, Mobile Developer, Government Apps, Morocco, Dart, Security',
  openGraph: {
    title: 'Otmane El Baghazaoui | Flutter Developer',
    description: 'Senior Flutter Developer specializing in secure, government-grade mobile applications.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased`}
        style={{ background: 'var(--bg-primary, #0c0b18)', color: '#f8f7ff' }}
      >
        <div className="relative min-h-screen overflow-x-hidden">
          <Analytics />
          <Tracking />
          <Spotlight />
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

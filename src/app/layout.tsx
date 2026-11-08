import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Analytics } from '@vercel/analytics/next';
import Tracking from './components/Tracking';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Providers from './components/Providers';

const geist = Geist({ variable: '--font-geist', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' });
const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://otmaneportfolio.vercel.app'),
  title: 'Otmane El Baghazaoui | Flutter Developer · Morocco',
  description:
    'Flutter developer based in Morocco with 4+ years building secure mobile apps, including government apps like Passeport Maroc. Available for freelance, CDI and remote roles.',
  keywords: 'Flutter Developer Maroc, Développeur Flutter, Mobile Developer Morocco, Casablanca, Rabat, Government Apps, Dart, Mobile Security',
  openGraph: {
    title: 'Otmane El Baghazaoui | Flutter Developer · Morocco',
    description: 'Secure, production-grade Flutter apps, from Moroccan government platforms to startups.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_MA'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-bg text-fg">
        <Analytics />
        <Tracking />
        <Providers>
          <div className="relative min-h-screen overflow-x-clip">
            <Navbar />
            <main className="container-page relative">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

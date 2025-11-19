// app/layout.tsx

import './globals.css';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader'; // 💡 NEW: Import the TopLoader

// Brand Colors (Defined once for consistent styling)
const BRAND_COLORS = {
  DARK_BLUE: '#000B3C',
  UMEME_BLUE: '#1523DB',
  ULTRAMARINE_BLUE: '#3D56FF',
  CELESTIAL_BLUE: '#3C9AE9',
  GREEN: '#8ACE47',
  YELLOW: '#F8D200',
  WHITE: '#FFFFFF',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://umemesense.com'),
  title: {
    default: 'UmemeSense - Smart Energy Management & Monitoring',
    template: '%s | UmemeSense'
  },
  description: 'Enterprise-grade energy management platform. Monitor consumption, track renewable assets, and manage Renewable Energy Credits (RECs) with real-time precision.',
  keywords: [
    'energy management',
    'renewable energy',
    'solar monitoring',
    'energy consumption',
    'RECs',
    'renewable energy credits',
    'power monitoring',
    'smart grid',
    'IoT energy',
    'energy analytics',
    'sustainability',
    'carbon tracking'
  ],
  authors: [{ name: 'UmemeSense' }],
  creator: 'UmemeSense',
  publisher: 'UmemeSense',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://umemesense.com',
    siteName: 'UmemeSense',
    title: 'UmemeSense - Smart Energy Management & Monitoring',
    description: 'Enterprise-grade energy management platform. Monitor consumption, track renewable assets, and manage RECs with real-time precision.',
    images: [
      {
        url: '/logoumeme.svg',
        width: 1200,
        height: 630,
        alt: 'UmemeSense - Smart Energy Management',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UmemeSense - Smart Energy Management & Monitoring',
    description: 'Enterprise-grade energy management platform. Monitor consumption, track renewable assets, and manage RECs with real-time precision.',
    images: ['/twitter-image.png'],
    creator: '@umemesense',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://umemesense.com',
  },
  category: 'technology',
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  appleWebApp: {
    capable: true,
    title: 'UmemeSense',
    statusBarStyle: 'default',
  },
  other: {
    'msapplication-TileColor': BRAND_COLORS.UMEME_BLUE,
    'theme-color': BRAND_COLORS.WHITE,
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnects and Font Links remain here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" 
          rel="stylesheet" 
        />
        {/* ... other head content ... */}
      </head>
      
      <body 
        style={{ 
          backgroundColor: BRAND_COLORS.WHITE,
          fontFamily: 'DM Sans, sans-serif'
        }}
      >
        <SessionProviderWrapper>
          
          {/* 💡 GLOBAL LOADING BAR INTEGRATION */}
          <NextTopLoader
            color={BRAND_COLORS.ULTRAMARINE_BLUE} // Use Ultramarine Blue for brand consistency
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false} // Hide spinner since pages use local spinners/loaders
            easing="ease"
            speed={200}
            // Use Celestial Blue for a vibrant shadow effect
            shadow={`0 0 10px ${BRAND_COLORS.CELESTIAL_BLUE}, 0 0 5px ${BRAND_COLORS.CELESTIAL_BLUE}`}
          />
          
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
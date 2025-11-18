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

// ... (Existing Metadata export remains unchanged) ...

export const metadata: Metadata = {
  // ... (all existing metadata properties) ...
  // Ensure the theme color uses the brand white
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
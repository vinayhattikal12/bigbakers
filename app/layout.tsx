import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBottomBar } from '@/components/layout/MobileBottomBar';
import { CartDrawer } from '@/components/ecommerce/CartDrawer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { FlyToCartOverlay } from '@/components/ecommerce/FlyToCartOverlay';
import { DeliveryDispatchOverlay } from '@/components/ecommerce/DeliveryDispatchOverlay';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FAF6F0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: 'Big Bakers | Bite Into Happiness | Handcrafted Cakes & Desserts in Vijaynagar, Bengaluru',
    template: '%s | Big Bakers Bengaluru',
  },
  description:
    'Experience Bengaluru’s premier artisanal bakery in Vijaynagar. Handcrafted Belgian Truffle celebration cakes, New York cheesecakes, Italian tiramisu, artisan donuts, and roasted peri-peri makhana. Same-day fresh delivery across Bengaluru.',
  keywords: [
    'Big Bakers',
    'Bakery Bengaluru',
    'Bakery Vijaynagar',
    'Best Cakes in Bangalore',
    'Belgian Truffle Cake',
    'Eggless Cakes Bangalore',
    'Cheesecake Delivery Bengaluru',
    'Artisan Bakery Vijaynagar',
    'Bite into Happiness',
  ],
  authors: [{ name: 'Big Bakers Culinary Team' }],
  metadataBase: new URL('https://bigbakers.in'),
  openGraph: {
    title: 'Big Bakers — Bite Into Happiness',
    description:
      'Handcrafted celebration cakes, European artisan desserts, Belgian chocolate truffles, and oven-fresh snacks in Vijaynagar, Bengaluru.',
    url: 'https://bigbakers.in',
    siteName: 'Big Bakers',
    images: [
      {
        url: '/images/hero/bakery-hero.webp',
        width: 1200,
        height: 630,
        alt: 'Big Bakers Handcrafted Cake Experience',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Bakery',
              name: 'Big Bakers',
              description: 'Handcrafted cakes, artisan desserts and savory snacks in Vijaynagar, Bengaluru.',
              image: 'https://bigbakers.in/images/hero/bakery-hero.webp',
              telephone: '+918023304567',
              email: 'hello@bigbakers.in',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'No. 18, 17th Cross, MC Layout, Near Vijaynagar Club, Vijaynagar',
                addressLocality: 'Bengaluru',
                addressRegion: 'Karnataka',
                postalCode: '560040',
                addressCountry: 'IN',
              },
              priceRange: '₹₹',
              servesCuisine: ['Bakery', 'Desserts', 'Snacks'],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-cream-100 text-cocoa min-h-screen flex flex-col antialiased selection:bg-caramel selection:text-white">
        <CartProvider>
          <WishlistProvider>
            <SmoothScroll>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <MobileBottomBar />
              <CartDrawer />
              <FlyToCartOverlay />
              <DeliveryDispatchOverlay />
            </SmoothScroll>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

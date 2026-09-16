'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface SceneOverlayData {
  id: number;
  part: 1 | 2 | 3;
  startProgress: number;
  endProgress: number;
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  price?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  alignment: 'center' | 'left' | 'right';
  theme?: 'light' | 'dark' | 'gold';
}

export const scenes: SceneOverlayData[] = [
  // PART 1 (Scenes 01–06: Storefront & Live Kitchen Sanctuary)
  {
    id: 1,
    part: 1,
    startProgress: 0.00,
    endProgress: 0.055,
    badge: 'Vijaynagar Flagship Store',
    title: 'Bite into Happiness',
    subtitle: 'BENGALURU, INDIA',
    description: 'Welcome to Big Bakers. Handcrafted Belgian celebration cakes, European patisserie, and artisanal treats.',
    ctaText: 'Explore Menu',
    ctaHref: '#craving-section',
    secondaryCtaText: 'Our Cakes',
    secondaryCtaHref: '/cakes',
    alignment: 'left',
    theme: 'gold',
  },
  {
    id: 2,
    part: 1,
    startProgress: 0.06,
    endProgress: 0.11,
    badge: 'The Entrance',
    title: 'Step Into Warmth',
    description: 'Golden ambient glow, fresh vanilla aromas, and the unmistakable sound of ovens at work.',
    alignment: 'left',
  },
  {
    id: 3,
    part: 1,
    startProgress: 0.115,
    endProgress: 0.165,
    badge: 'The Sanctuary',
    title: 'Where Flavors Come Alive',
    description: 'Step right into our live kitchen. Hearth ovens glowing, stone flour rolling, pure dairy churning.',
    alignment: 'center',
  },
  {
    id: 4,
    part: 1,
    startProgress: 0.17,
    endProgress: 0.225,
    badge: 'Artisanal Mastery',
    title: 'The Craft in Motion',
    description: 'Every delicate layer piped by hand with 54% dark Belgian chocolate ganache.',
    alignment: 'right',
  },
  {
    id: 5,
    part: 1,
    startProgress: 0.23,
    endProgress: 0.28,
    badge: 'Pure Chemistry',
    title: 'Ingredients Become Magic',
    description: 'Pure cocoa butter, Madagascar bourbon vanilla, and farm-fresh butter uniting in harmony.',
    alignment: 'center',
  },
  {
    id: 6,
    part: 1,
    startProgress: 0.285,
    endProgress: 0.335,
    badge: 'Hallmark Creation',
    title: 'Belgian Truffle Cake',
    subtitle: 'Rich chocolate cake with decadent chocolate layers',
    price: '₹699',
    description: 'Our most celebrated cake. Multi-tiered moist cocoa sponge glazed in dark chocolate ganache.',
    ctaText: 'Explore Cake',
    ctaHref: '/product/belgian-truffle-cake',
    alignment: 'left',
    theme: 'gold',
  },

  // PART 2 (Scenes 07–12: Celebration & Master Patisserie)
  {
    id: 7,
    part: 2,
    startProgress: 0.34,
    endProgress: 0.395,
    badge: 'Red Velvet Royale',
    title: 'Velvety Crimson Elegance',
    price: '₹749',
    description: 'Slow-baked buttermilk cocoa sponge paired with authentic Philadelphia cream cheese frosting.',
    ctaText: 'Taste Velvet',
    ctaHref: '/product/red-velvet-royale',
    alignment: 'right',
  },
  {
    id: 8,
    part: 2,
    startProgress: 0.40,
    endProgress: 0.455,
    badge: 'Lotus Biscoff Dream',
    title: 'Caramelized Spiced Speculoos',
    price: '₹799',
    description: 'Layered Belgian Biscoff spread, speculoos crunch base, and golden caramelized drip.',
    ctaText: 'Discover Biscoff',
    ctaHref: '/product/lotus-biscoff-cake',
    alignment: 'center',
    theme: 'gold',
  },
  {
    id: 9,
    part: 2,
    startProgress: 0.46,
    endProgress: 0.515,
    badge: 'The Texture',
    title: 'Melt-in-Mouth Symphony',
    description: 'Watch the rich glossy glaze cascade across velvety cake layers.',
    alignment: 'left',
  },
  {
    id: 10,
    part: 2,
    startProgress: 0.52,
    endProgress: 0.575,
    badge: 'Royal Gateau',
    title: 'Black Forest Royale',
    price: '₹649',
    description: 'Tart sour cherries, whipped kirsch cream, and shavings of dark chocolate.',
    ctaText: 'View Cake',
    ctaHref: '/product/black-forest-royale',
    alignment: 'center',
  },
  {
    id: 11,
    part: 2,
    startProgress: 0.58,
    endProgress: 0.635,
    badge: 'Custom Celebration',
    title: 'Personalized for Your Joy',
    description: 'Hand-piped gold leaf calligraphy and celebration messages for birthdays & milestones.',
    alignment: 'right',
  },
  {
    id: 12,
    part: 2,
    startProgress: 0.64,
    endProgress: 0.695,
    badge: 'The Golden Slice',
    title: 'Every Forkful Is Pure Bliss',
    description: 'Dense, moist, unapologetically decadent. Baked fresh every morning in Vijaynagar.',
    ctaText: 'Order Fresh',
    ctaHref: '/menu',
    alignment: 'center',
    theme: 'gold',
  },

  // PART 3 (Scenes 13–18: European Desserts, Warm Treats & Storefront)
  {
    id: 13,
    part: 3,
    startProgress: 0.70,
    endProgress: 0.755,
    badge: 'European Classics',
    title: 'Artisan Cheesecakes & Tiramisu',
    description: 'Authentic Savoiardi ladyfingers soaked in espresso, paired with Italian mascarpone.',
    ctaText: 'Explore Desserts',
    ctaHref: '/desserts',
    alignment: 'left',
  },
  {
    id: 14,
    part: 3,
    startProgress: 0.76,
    endProgress: 0.815,
    badge: 'Mexican Tres Leches',
    title: 'Sponge Soaked in Three Milks',
    price: '₹280',
    description: 'Condensed, evaporated, and whole milk whipped into heavenly cloud-like perfection.',
    ctaText: 'Taste Tres Leches',
    ctaHref: '/product/tres-leches-pastry',
    alignment: 'center',
  },
  {
    id: 15,
    part: 3,
    startProgress: 0.82,
    endProgress: 0.875,
    badge: 'Oven-Warm Snacks',
    title: 'Roasted Makhana & Savory Treats',
    description: 'Crispy slow-roasted foxnuts infused with peri-peri herbs and sea salt.',
    ctaText: 'Explore Snacks',
    ctaHref: '/snacks',
    alignment: 'right',
  },
  {
    id: 16,
    part: 3,
    startProgress: 0.88,
    endProgress: 0.935,
    badge: 'Community Love',
    title: 'Your Moments. Our Happiness.',
    description: 'Over 50,000 celebration cakes delivered to families across Bengaluru.',
    alignment: 'center',
  },
  {
    id: 17,
    part: 3,
    startProgress: 0.94,
    endProgress: 0.975,
    badge: 'Full Spectrum',
    title: 'Cakes • Desserts • Treats • Snacks',
    description: 'Discover all 16+ signature creations made fresh with pure dairy ingredients.',
    ctaText: 'View Full Menu',
    ctaHref: '/menu',
    alignment: 'center',
  },
  {
    id: 18,
    part: 3,
    startProgress: 0.98,
    endProgress: 1.00,
    badge: 'Big Bakers Bengaluru',
    title: 'Happiness Tastes Better Together.',
    subtitle: 'BITE INTO HAPPINESS',
    description: 'Order your handcrafted cake online or visit our flagship store in Vijaynagar, Bengaluru.',
    ctaText: 'Explore Menu',
    ctaHref: '/menu',
    secondaryCtaText: 'Our Store',
    secondaryCtaHref: '/stores',
    alignment: 'center',
    theme: 'gold',
  },
];

interface CinematicOverlayProps {
  progress: number;
}

export const CinematicOverlay: React.FC<CinematicOverlayProps> = ({ progress }) => {
  const activeScene = scenes.find(
    (s) => progress >= s.startProgress && progress <= s.endProgress
  );

  if (!activeScene) return null;

  const sceneDuration = activeScene.endProgress - activeScene.startProgress;
  const progressIntoScene = progress - activeScene.startProgress;
  const normalized = progressIntoScene / sceneDuration;

  // Scene opacity calculation
  let opacity = 1;
  if (activeScene.id === 1) {
    if (normalized > 0.8) {
      opacity = (1 - normalized) / 0.2;
    } else {
      opacity = 1;
    }
  } else if (activeScene.id === 18) {
    if (normalized < 0.2) {
      opacity = normalized / 0.2;
    } else {
      opacity = 1;
    }
  } else {
    if (normalized < 0.15) {
      opacity = normalized / 0.15;
    } else if (normalized > 0.85) {
      opacity = (1 - normalized) / 0.15;
    }
  }

  // Positions the card elegantly in the lower-third zone so it never blocks building signage
  const alignmentContainer = {
    center: 'justify-center items-end text-center',
    left: 'justify-start items-end text-left',
    right: 'justify-end items-end text-left sm:text-right',
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none flex ${alignmentContainer[activeScene.alignment]} pb-24 sm:pb-28 px-4 sm:px-10 lg:px-14 z-20 transition-all duration-300 ease-out`}
      style={{ opacity: Math.max(0, Math.min(1, opacity)) }}
    >
      {/* Frosted Glass Floating Card */}
      <div className="w-full max-w-lg bg-black/65 backdrop-blur-xl border border-white/20 p-5 sm:p-7 rounded-3xl shadow-2xl pointer-events-auto transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-500">
        {/* Badge */}
        {activeScene.badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>{activeScene.badge}</span>
          </div>
        )}

        {/* Subtitle */}
        {activeScene.subtitle && (
          <p className="text-[11px] font-bold tracking-[0.2em] text-caramel uppercase mb-1 drop-shadow-xs">
            {activeScene.subtitle}
          </p>
        )}

        {/* Main Title */}
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-2 drop-shadow-md">
          {activeScene.title}
        </h2>

        {/* Price Tag if available */}
        {activeScene.price && (
          <div className="inline-flex items-baseline gap-1.5 mb-2 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
            <span className="text-[10px] text-cream-200/80 uppercase">From</span>
            <span className="font-sans font-bold text-base text-gold">{activeScene.price}</span>
          </div>
        )}

        {/* Description */}
        {activeScene.description && (
          <p className="text-xs sm:text-sm text-cream-100/90 leading-relaxed mb-4 font-normal">
            {activeScene.description}
          </p>
        )}

        {/* Action Buttons */}
        {(activeScene.ctaText || activeScene.secondaryCtaText) && (
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            {activeScene.ctaText && activeScene.ctaHref && (
              <Button
                variant={activeScene.theme === 'gold' ? 'primary' : 'secondary'}
                size="sm"
                className="shadow-lg"
              >
                <Link href={activeScene.ctaHref} className="flex items-center gap-1.5">
                  <span>{activeScene.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            )}

            {activeScene.secondaryCtaText && activeScene.secondaryCtaHref && (
              <Button
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/15 backdrop-blur-sm"
              >
                <Link href={activeScene.secondaryCtaHref}>
                  {activeScene.secondaryCtaText}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

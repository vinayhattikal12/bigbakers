'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ReducedMotionHero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-cocoa-deep text-cream-100 overflow-hidden pt-20">
      {/* Static Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/bakery-hero.webp"
          alt="Big Bakers Master Bakery"
          fill
          priority
          className="object-cover opacity-35 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-cocoa-deep/60 to-cocoa-deep/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/20 border border-caramel/40 text-gold text-xs font-semibold tracking-wide">
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Bengaluru, Karnataka • Handcrafted Daily</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-7xl font-black tracking-tight text-white leading-tight">
          Life is Sweeter <span className="text-caramel italic">Together.</span>
        </h1>

        <p className="font-sans text-xs sm:text-sm font-bold tracking-[0.3em] text-gold uppercase">
          BITE INTO HAPPINESS
        </p>

        <p className="text-base sm:text-xl text-cream-100/90 max-w-2xl mx-auto leading-relaxed">
          Bengaluru’s premier destination for artisanal Belgian Truffle celebration cakes, New York cheesecakes, Italian tiramisu, and slow-roasted snacks.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/menu">
            <Button variant="gold" size="lg">
              <span>Explore Full Menu</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/stores">
            <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/20">
              <MapPin className="w-4 h-4 mr-2 text-gold" />
              <span>Find a Store</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, MapPin, ChevronDown, Heart } from 'lucide-react';

export const MobileVideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays smoothly across all mobile devices (iOS Safari / Android)
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
      });
    }
  }, []);

  return (
    <section className="relative w-full h-[92vh] min-h-[580px] max-h-[920px] bg-cocoa-deep overflow-hidden select-none flex flex-col justify-end pt-24 pb-8">
      {/* 1. FULL-BLEED CRISP NATURAL VIDEO */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero-reel.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center filter brightness-[1.16] contrast-[1.06] saturate-[1.02]"
        />

        {/* Minimal Neutral Top & Bottom Contrast Gradients */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[52%] bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />
      </div>

      {/* 2. CINEMATIC EDITORIAL CONTENT */}
      <div className="relative z-10 px-5 max-w-7xl mx-auto w-full space-y-5">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-[11px] font-bold uppercase tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Handcrafted in Vijaynagar, Bengaluru</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Bite Into <br />
            <span className="text-caramel italic">Happiness.</span>
          </h1>

          <p className="text-xs sm:text-sm text-cream-100/95 font-sans font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Freshly baked Belgian chocolate truffle gateaux, New York baked cheesecakes, Italian gelato, and stone-baked savouries. Prepared fresh every morning with 100% pure ingredients.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-stretch gap-2.5 pt-1">
          <Link
            href="/menu"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-caramel to-amber-700 text-white font-bold text-xs sm:text-sm shadow-[0_8px_25px_rgba(217,119,6,0.4)] border border-amber-400/40 hover:brightness-110 active:scale-95 transition-all group"
          >
            <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="font-bold tracking-wide">Explore 190+ Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          <Link
            href="/stores"
            className="inline-flex items-center justify-center gap-2 px-4.5 py-3.5 rounded-2xl bg-black/60 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white font-semibold text-xs sm:text-sm active:scale-95 transition-all shadow-lg group shrink-0"
          >
            <MapPin className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            <span>Visit Store</span>
          </Link>
        </div>

        {/* Bottom Trust & Scroll Bar */}
        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-cream-200/80">
          <div className="flex items-center gap-3 font-medium text-[11px]">
            <span className="flex items-center gap-1.5 text-cream-100">
              <Heart className="w-3.5 h-3.5 text-caramel fill-current" />
              <span>50,000+ Celebrations</span>
            </span>
            <span className="text-white/30">•</span>
            <span>⚡ 45-60 Min Express</span>
          </div>

          <div className="flex items-center gap-1 text-gold font-medium animate-bounce text-[11px]">
            <span>Scroll for Cravings</span>
            <ChevronDown className="w-3.5 h-3.5 text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
};

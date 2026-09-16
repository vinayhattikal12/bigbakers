'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, MapPin, ChevronDown, Award, Heart } from 'lucide-react';

export const CinematicHero: React.FC = () => {
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
    <section className="relative w-full h-[94vh] min-h-[640px] max-h-[960px] lg:h-screen bg-cocoa-deep overflow-hidden select-none flex flex-col justify-end pt-24 sm:pt-28 pb-8 sm:pb-12">
      {/* 1. SEAMLESS BACKGROUND 9:16 / FULL-BLEED VIDEO */}
      <div className="absolute inset-0 z-0 bg-cocoa-deep overflow-hidden">
        <video
          ref={videoRef}
          src="/videos/hero-reel.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.42] sm:scale-[1.2] lg:scale-[1.08] object-center origin-center filter brightness-[0.88] contrast-[1.05] transition-transform duration-700"
        />

        {/* Ambient Contrast Gradients for Crystal Clear Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-cocoa-deep/55 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. CINEMATIC EDITORIAL CONTENT (SAFELY POSITIONED BELOW NAVBAR) */}
      <div className="relative z-10 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full space-y-5 sm:space-y-6">
        <div className="max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            <span>Handcrafted in Vijaynagar, Bengaluru</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Bite Into <br />
            <span className="text-caramel italic">Happiness.</span>
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-cream-100/95 font-sans font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Freshly baked Belgian chocolate truffle gateaux, New York baked cheesecakes, Italian gelato, and stone-baked savouries. Prepared fresh every morning with 100% pure ingredients.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href="/menu"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-xs sm:text-sm shadow-2xl shadow-caramel/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore Full Menu (190+ Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/stores"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-xs sm:text-sm active:scale-95 transition-all"
          >
            <MapPin className="w-4 h-4 text-gold" />
            <span>Visit Store</span>
          </Link>
        </div>

        {/* Bottom Trust & Scroll Bar */}
        <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-cream-200/80">
          <div className="flex items-center gap-4 sm:gap-6 font-medium text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-cream-100">
              <Heart className="w-3.5 h-3.5 text-caramel fill-current" />
              <span>50,000+ Celebrations</span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline">54% Belgian Callebaut Chocolate</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline">⚡ 45-60 Min Bengaluru Express</span>
          </div>

          <div className="flex items-center gap-1.5 text-gold font-medium animate-bounce text-[11px]">
            <span>Scroll for Cravings</span>
            <ChevronDown className="w-3.5 h-3.5 text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
};

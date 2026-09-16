'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  MapPin,
  ChevronDown,
  Flame,
  Award,
} from 'lucide-react';

interface StoryScene {
  id: number;
  tag: string;
  tagIcon: 'pin' | 'sparkle' | 'flame' | 'award';
  titleLead: string;
  titleAccent: string;
  description: string;
  image: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    tag: 'Flagship Store • Vijaynagar, Bengaluru',
    tagIcon: 'pin',
    titleLead: 'Step Into ',
    titleAccent: 'Warmth.',
    description:
      'Where authentic European patisserie craft meets Bengaluru’s most cherished celebration cakes.',
    image: '/images/mobile-hero/story-1-store.jpg',
    primaryCtaText: 'Explore Menu',
    primaryCtaLink: '/menu',
    secondaryCtaText: 'Our Story',
    secondaryCtaLink: '/story',
  },
  {
    id: 2,
    tag: 'Hallmark Creation • ₹699',
    tagIcon: 'sparkle',
    titleLead: 'Belgian Truffle ',
    titleAccent: 'Royale.',
    description:
      'Tempered 54% dark Callebaut mirror ganache on moist espresso chiffon dusted with 24K edible gold.',
    image: '/images/mobile-hero/story-2-truffle.jpg',
    primaryCtaText: 'Order Truffle Cake',
    primaryCtaLink: '/product/belgian-truffle-cake',
    secondaryCtaText: 'All Cakes',
    secondaryCtaLink: '/cakes',
  },
  {
    id: 3,
    tag: 'Pure Luxury • European Bake',
    tagIcon: 'award',
    titleLead: 'Cheesecakes & ',
    titleAccent: 'Tiramisu.',
    description:
      'New York dense baked Lotus Biscoff cheesecakes and authentic Italian mascarpone tiramisu.',
    image: '/images/mobile-hero/story-3-cheesecake.jpg',
    primaryCtaText: 'Taste Desserts',
    primaryCtaLink: '/desserts',
    secondaryCtaText: 'Find Stores',
    secondaryCtaLink: '/stores',
  },
  {
    id: 4,
    tag: 'Everyday Joy • Oven-Fresh',
    tagIcon: 'sparkle',
    titleLead: 'Brioche Donuts & ',
    titleAccent: 'Cookies.',
    description:
      'Glazed artisan donuts, molten chocolate chunk NYC cookies, and red velvet cupcakes.',
    image: '/images/mobile-hero/story-4-treats.jpg',
    primaryCtaText: 'Explore Treats',
    primaryCtaLink: '/treats',
    secondaryCtaText: 'Full Menu',
    secondaryCtaLink: '/menu',
  },
  {
    id: 5,
    tag: 'Crispy & Pure • Bengaluru Snack',
    tagIcon: 'flame',
    titleLead: 'Roasted Peri Peri ',
    titleAccent: 'Makhana.',
    description:
      'Slow-roasted spicy foxnuts, authentic savory mixtures, and stone-baked crusty sourdough.',
    image: '/images/mobile-hero/story-5-snacks.jpg',
    primaryCtaText: 'Shop Savory Snacks',
    primaryCtaLink: '/snacks',
    secondaryCtaText: 'All Products',
    secondaryCtaLink: '/menu',
  },
];

const SCENE_DURATION_MS = 5000;

export const MobileStoryHero: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextScene = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % STORY_SCENES.length);
    setProgress(0);
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    } catch {
      // Ignore vibration error
    }
  }, []);

  const prevScene = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + STORY_SCENES.length) % STORY_SCENES.length);
    setProgress(0);
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    } catch {
      // Ignore vibration error
    }
  }, []);

  const selectScene = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  // Story progress timer
  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const step = (interval / SCENE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextScene();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, nextScene]);

  // Touch gesture handling (Swipe Left / Right & Tap Left / Right)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;

    // Start hold pause
    holdTimerRef.current = setTimeout(() => {
      setIsPaused(true);
    }, 200);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    setIsPaused(false);

    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;

    // Check if swipe was mostly horizontal
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextScene();
      } else {
        prevScene();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const currentScene = STORY_SCENES[activeIdx];

  const renderTagIcon = (icon: StoryScene['tagIcon']) => {
    switch (icon) {
      case 'pin':
        return <MapPin className="w-3 h-3 text-gold" />;
      case 'flame':
        return <Flame className="w-3 h-3 text-caramel fill-current" />;
      case 'award':
        return <Award className="w-3 h-3 text-gold" />;
      default:
        return <Sparkles className="w-3 h-3 text-gold" />;
    }
  };

  return (
    <section
      className="relative w-full h-[88vh] min-h-[580px] max-h-[820px] bg-cocoa-deep overflow-hidden select-none flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background High-Definition Image Carousel with Ken-Burns Motion */}
      {STORY_SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === activeIdx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <Image
            src={scene.image}
            alt={scene.titleLead + scene.titleAccent}
            fill
            priority={idx <= 1}
            quality={95}
            sizes="100vw"
            className={`object-cover transform transition-transform duration-[5500ms] ease-out ${
              idx === activeIdx ? 'scale-105' : 'scale-100'
            }`}
          />
          {/* Ambient Contrast Gradients for Crystal Clear Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-cocoa-deep/45 to-black/60" />
          <div className="absolute inset-0 bg-black/15" />
        </div>
      ))}

      {/* ========================================================
          📱 TOP 5-SEGMENT STORY PROGRESS BARS (Instagram/Tesla Style)
          ======================================================== */}
      <div className="relative z-20 pt-4 px-4 space-y-3">
        <div className="grid grid-cols-5 gap-1.5 w-full">
          {STORY_SCENES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => selectScene(idx)}
              className="h-1 rounded-full bg-white/30 overflow-hidden transition-all text-left"
              aria-label={`Go to story ${idx + 1}`}
            >
              <div
                className="h-full bg-gradient-to-r from-gold via-caramel to-peach rounded-full transition-all duration-75"
                style={{
                  width:
                    idx < activeIdx
                      ? '100%'
                      : idx === activeIdx
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </button>
          ))}
        </div>

        {/* Top Story Header Badge & Indicator */}
        <div className="flex items-center justify-between text-xs text-cream-100">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-gold/40 text-gold text-[11px] font-bold uppercase tracking-wider shadow-md">
            {renderTagIcon(currentScene.tagIcon)}
            <span>{currentScene.tag}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-cream-200/90 font-mono bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-white/15">
            <span>0{activeIdx + 1}</span>
            <span className="text-white/40">/</span>
            <span>0{STORY_SCENES.length}</span>
          </div>
        </div>
      </div>

      {/* Left/Right Tap Area Navigators (For easy one-hand thumb tapping) */}
      <button
        onClick={prevScene}
        className="absolute left-0 top-20 bottom-36 w-1/4 z-10 opacity-0 cursor-pointer"
        aria-label="Previous scene"
      />
      <button
        onClick={nextScene}
        className="absolute right-0 top-20 bottom-36 w-1/4 z-10 opacity-0 cursor-pointer"
        aria-label="Next scene"
      />

      {/* ========================================================
          🌟 BOTTOM EDITORIAL STORY NARRATIVE CARD
          ======================================================== */}
      <div className="relative z-20 px-5 pb-6 space-y-4">
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-400" key={activeIdx}>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            {currentScene.titleLead}
            <span className="text-caramel italic">{currentScene.titleAccent}</span>
          </h2>

          <p className="text-xs sm:text-sm text-cream-100/95 font-medium leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)] max-w-sm">
            {currentScene.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <Link
            href={currentScene.primaryCtaLink}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-caramel to-caramel-dark hover:from-caramel-dark hover:to-cocoa text-white font-bold text-xs shadow-2xl active:scale-95 transition-all"
          >
            <span>{currentScene.primaryCtaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href={currentScene.secondaryCtaLink}
            className="px-4 py-3 rounded-full bg-black/65 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-xs active:scale-95 transition-all"
          >
            <span>{currentScene.secondaryCtaText}</span>
          </Link>
        </div>

        {/* Bottom Interactive Scene Pills & Scroll Cue */}
        <div className="flex items-center justify-between pt-1 border-t border-cream-300/15 text-[11px] text-cream-200/80">
          <div className="flex items-center gap-1.5">
            {STORY_SCENES.map((_, i) => (
              <button
                key={i}
                onClick={() => selectScene(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-5 bg-gold' : 'w-1.5 bg-white/35'
                }`}
                aria-label={`Jump to scene ${i + 1}`}
              />
            ))}
            <span className="pl-1 text-[10px] text-cream-200/60">Hold to pause</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-gold font-medium animate-bounce">
            <span>Scroll for menu</span>
            <ChevronDown className="w-3 h-3 text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Star, 
  Check, 
  Plus, 
  ArrowRight, 
  SlidersHorizontal, 
  Flame, 
  ShieldCheck, 
  Heart, 
  Zap,
  ShoppingBag,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Film
} from 'lucide-react';
import { products } from '@/data/products';
import { Product, ProductWeightOption } from '@/lib/ecommerce/types';
import { formatPrice } from '@/lib/utils/formatters';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { useCart } from '@/lib/context/CartContext';
import { triggerFlyToCartAnimation } from '@/components/ecommerce/FlyToCartOverlay';
import { SparkleModernIcon } from '@/components/ui/ModernIcons';

export interface CategoryShowcaseProps {
  categoryId: string;
  categoryName: string;
  categoryTagline: string;
  heroHeadline: React.ReactNode;
  heroDescription: string;
  heroImage: string;
  heroVideo?: string;
  flagshipSlug: string;
  theme: {
    bgGradient: string;
    ambientGlow: string;
    accentPillBg: string;
    accentTextColor: string;
    accentBorder: string;
    badgeText: string;
  };
  craftPillars: Array<{
    icon: any;
    text: string;
  }>;
  subcategories: string[];
}

export const CategoryShowcasePage: React.FC<CategoryShowcaseProps> = ({
  categoryId,
  categoryName,
  categoryTagline,
  heroHeadline,
  heroDescription,
  heroImage,
  heroVideo,
  flagshipSlug,
  theme,
  craftPillars,
  subcategories,
}) => {
  const { addItem } = useCart();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [quickFilter, setQuickFilter] = useState<'all' | 'bestsellers' | 'under300' | 'premium'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [spotlightAdded, setSpotlightAdded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force automatic instant playback on page load & category navigation
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const startPlay = () => {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    };
    startPlay();

    const handleVisibility = () => {
      if (!document.hidden && v) {
        startPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [heroVideo]);

  // All products in this category
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === categoryId);
  }, [categoryId]);

  // Flagship Product for Hero Spotlight Card
  const flagshipProduct = useMemo(() => {
    return (
      products.find((p) => p.slug === flagshipSlug) ||
      categoryProducts.find((p) => p.featured || p.bestseller) ||
      categoryProducts[0]
    );
  }, [flagshipSlug, categoryProducts]);

  // Subcategory item counts mapping
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: categoryProducts.length };
    subcategories.forEach((sub) => {
      if (sub !== 'All') {
        const sel = sub.toLowerCase().replace(/[^a-z0-9]/g, '');
        counts[sub] = categoryProducts.filter((p) => {
          const pSub = p.subcategory.toLowerCase().replace(/[^a-z0-9]/g, '');
          return pSub === sel || pSub.includes(sel) || sel.includes(pSub);
        }).length;
      }
    });
    return counts;
  }, [categoryProducts, subcategories]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];

    // 1. Subcategory filter
    if (selectedSubcategory !== 'All') {
      const sel = selectedSubcategory.toLowerCase().replace(/[^a-z0-9]/g, '');
      list = list.filter((p) => {
        const pSub = p.subcategory.toLowerCase().replace(/[^a-z0-9]/g, '');
        return pSub === sel || pSub.includes(sel) || sel.includes(pSub);
      });
    }

    // 2. Quick filters
    if (quickFilter === 'bestsellers') {
      list = list.filter((p) => p.bestseller);
    } else if (quickFilter === 'under300') {
      list = list.filter((p) => p.price <= 300);
    } else if (quickFilter === 'premium') {
      list = list.filter((p) => p.price > 500);
    }

    // 3. Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [categoryProducts, selectedSubcategory, quickFilter, sortBy]);

  const handleSpotlightQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!flagshipProduct) return;

    const defaultWeight =
      flagshipProduct.weights.find((w) => w.isDefault)?.weight ||
      flagshipProduct.weights[0]?.weight ||
      'Standard';

    const cardElement = document.getElementById('flagship-spotlight-image');
    if (cardElement) {
      triggerFlyToCartAnimation(cardElement, flagshipProduct.heroImage, {
        id: String(flagshipProduct.id) + '-' + String(Date.now()),
        name: flagshipProduct.name,
        price: flagshipProduct.price,
        weight: defaultWeight,
        imageUrl: flagshipProduct.heroImage,
        category: flagshipProduct.category,
      });
    }

    addItem(flagshipProduct, defaultWeight, 1, undefined, false);
    setSpotlightAdded(true);
    setTimeout(() => setSpotlightAdded(false), 2000);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-28 min-h-screen bg-cream-100">
      {/* 1. FULL-BLEED RADIANT CINEMATIC VIDEO HERO SECTION */}
      <section className="relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex items-center text-cream-100 overflow-hidden mb-8 sm:mb-12 border-b border-caramel/20">
        {/* Full-Bleed Radiant Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {heroVideo ? (
            <video
              key={heroVideo}
              ref={videoRef}
              src={heroVideo}
              poster={heroImage}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedData={(e) => {
                e.currentTarget.muted = true;
                e.currentTarget.play().catch(() => {});
              }}
              onCanPlay={(e) => {
                e.currentTarget.play().catch(() => {});
              }}
              className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.04] saturate-[1.02]"
            />
          ) : (
            <Image
              src={heroImage}
              alt={categoryName}
              fill
              priority
              className="object-cover"
            />
          )}

          {/* Natural Text Readability Scrim & Horizon Fades */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Ambient Color Glow - Subtle Natural Tone */}
        <div className={`absolute top-1/4 left-10 w-96 h-96 ${theme.ambientGlow} rounded-full blur-[140px] pointer-events-none opacity-20`} />

        {/* Hero Content Layer - Fully Transparent Directly on Video */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            {/* Category Pill & Count */}
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full ${theme.accentPillBg} ${theme.accentBorder} border ${theme.accentTextColor} text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md shadow-sm`}>
                <SparkleModernIcon className="w-3.5 h-3.5" />
                <span>{theme.badgeText}</span>
              </span>
              <span className="text-[11px] font-bold text-cream-100 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
                {categoryProducts.length} Items
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {heroHeadline}
            </h1>

            {/* Concise Sensory Description */}
            <p className="text-xs sm:text-sm md:text-base text-cream-100/95 font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-xl">
              {heroDescription}
            </p>

            {/* Sleek Compact Trust Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {craftPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-cream-100 text-[11px] font-medium shadow-sm transition-all group"
                  >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                    </div>
                    <span>{pillar.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Right Cinematic Controls & Live Reel Badge */}
        {heroVideo && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="text-[10px] sm:text-xs font-bold text-gold uppercase tracking-wider hidden sm:inline mr-1">
              Live Reel
            </span>
            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    videoRef.current.play();
                    setIsPlaying(true);
                  }
                }
              }}
              className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              type="button"
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
              className="p-1.5 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </section>

      {/* 2. STICKY SUBCATEGORY PILLS & TOOLBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Sticky Subcategory Tabs Bar */}
        <div className="sticky top-16 sm:top-20 z-30 bg-cream-100/95 backdrop-blur-md py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-cream-300">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
            {subcategories.map((sub) => {
              const isActive = selectedSubcategory === sub;
              const count = subcategoryCounts[sub] || 0;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap snap-start active:scale-95 shrink-0 ${
                    isActive
                      ? 'bg-cocoa text-cream-50 shadow-md scale-105 border border-caramel/40'
                      : 'bg-white hover:bg-cream-200/80 text-cocoa border border-cream-300 shadow-2xs'
                  }`}
                >
                  <span>{sub === 'All' ? `All ${categoryName}` : sub}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-gold font-bold' : 'bg-cream-200 text-cocoa/60 font-semibold'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. INTERACTIVE FILTER & SORT TOOLBAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-2xl border border-cream-300 shadow-2xs text-xs">
          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-cocoa/50 uppercase tracking-wider mr-1 hidden sm:inline">
              Filter:
            </span>
            <button
              onClick={() => setQuickFilter(quickFilter === 'bestsellers' ? 'all' : 'bestsellers')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                quickFilter === 'bestsellers'
                  ? 'bg-caramel text-white shadow-xs'
                  : 'bg-cream-100 hover:bg-cream-200 text-cocoa/80 border border-cream-300/80'
              }`}
            >
              ⭐ Bestsellers
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'under300' ? 'all' : 'under300')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                quickFilter === 'under300'
                  ? 'bg-caramel text-white shadow-xs'
                  : 'bg-cream-100 hover:bg-cream-200 text-cocoa/80 border border-cream-300/80'
              }`}
            >
              ⚡ Under ₹300
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'premium' ? 'all' : 'premium')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                quickFilter === 'premium'
                  ? 'bg-caramel text-white shadow-xs'
                  : 'bg-cream-100 hover:bg-cream-200 text-cocoa/80 border border-cream-300/80'
              }`}
            >
              👑 Chef's Reserve
            </button>
          </div>

          {/* Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-200">
            <span className="text-cocoa/60 text-[11px] font-medium">
              Showing <strong>{filteredProducts.length}</strong> items
            </span>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-cocoa/50 font-bold uppercase hidden md:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-cream-100 border border-cream-300 rounded-xl px-2.5 py-1.5 text-xs text-cocoa font-bold focus:outline-none focus:border-caramel"
              >
                <option value="featured">Featured Picks</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-cream-300 space-y-3">
            <p className="font-serif text-lg font-bold text-cocoa">No items match your active filter</p>
            <p className="text-xs text-cocoa/60">Try clearing your filters to view all handcrafted items.</p>
            <button
              onClick={() => {
                setSelectedSubcategory('All');
                setQuickFilter('all');
              }}
              className="px-4 py-2 bg-cocoa text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} priorityCount={6} />
        )}
      </div>
    </div>
  );
};

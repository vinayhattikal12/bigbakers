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
        counts[sub] = categoryProducts.filter((p) => p.subcategory === sub).length;
      }
    });
    return counts;
  }, [categoryProducts, subcategories]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];

    // 1. Subcategory filter
    if (selectedSubcategory !== 'All') {
      list = list.filter((p) => p.subcategory === selectedSubcategory);
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
      {/* 1. FULL-BLEED CINEMATIC VIDEO HERO SECTION */}
      <section className="relative min-h-[440px] sm:min-h-[500px] lg:min-h-[560px] flex items-center text-cream-100 overflow-hidden mb-8 sm:mb-12 border-b border-caramel/20">
        {/* Full-Bleed Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-cocoa-deep">
          {heroVideo ? (
            <video
              ref={videoRef}
              src={heroVideo}
              poster={heroImage}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              className="w-full h-full object-cover filter brightness-[0.72] contrast-[1.08] saturate-[1.12]"
            />
          ) : (
            <Image
              src={heroImage}
              alt={categoryName}
              fill
              priority
              className="object-cover filter brightness-[0.75]"
            />
          )}

          {/* Cinematic Dark Gradient Overlays for optimal typography readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* Ambient Glow Orb */}
        <div className={`absolute top-1/4 left-10 w-96 h-96 ${theme.ambientGlow} rounded-full blur-[140px] pointer-events-none`} />

        {/* Hero Content Layer */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-4 sm:space-y-6">
            {/* Category Pill & Count */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full ${theme.accentPillBg} ${theme.accentBorder} border ${theme.accentTextColor} text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{theme.badgeText}</span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-cream-100/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 shadow-md">
                {categoryProducts.length} Handcrafted Creations
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              {heroHeadline}
            </h1>

            {/* Sensory Description */}
            <p className="text-sm sm:text-base lg:text-lg text-cream-100/90 leading-relaxed max-w-2xl font-normal drop-shadow-md">
              {heroDescription}
            </p>

            {/* Craft Pillars / Assurance Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-cream-100 font-semibold max-w-2xl">
              {craftPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 shadow-lg hover:border-gold/40 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gold shrink-0" />
                    <span className="truncate text-xs">{pillar.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Right Cinematic Controls & Live Reel Badge */}
        {heroVideo && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
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

'use client';

import React, { useState, useMemo } from 'react';
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
  ShoppingBag
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
      {/* 1. ATMOSPHERIC SPLIT HERO SECTION */}
      <section className={`relative ${theme.bgGradient} text-cream-100 py-12 sm:py-20 overflow-hidden mb-8 sm:mb-12 border-b border-caramel/20`}>
        {/* Ambient Glow Orbs */}
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${theme.ambientGlow} rounded-full blur-[120px] pointer-events-none`} />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={heroImage}
            alt={categoryName}
            fill
            priority
            className="object-cover mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Category Story & Typography */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Category Pill */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full ${theme.accentPillBg} ${theme.accentBorder} border ${theme.accentTextColor} text-xs font-bold uppercase tracking-wider`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{theme.badgeText}</span>
                </span>
                <span className="text-[11px] font-bold text-cream-200/70 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  {categoryProducts.length} Handcrafted Creations
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                {heroHeadline}
              </h1>

              {/* Sensory Description */}
              <p className="text-sm sm:text-base text-cream-200/85 leading-relaxed max-w-xl font-normal">
                {heroDescription}
              </p>

              {/* Craft Pillars / Assurance Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-cream-200/90 font-medium">
                {craftPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xs"
                    >
                      <Icon className="w-4 h-4 text-gold shrink-0" />
                      <span className="truncate text-[11px] sm:text-xs">{pillar.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Hero Flagship Spotlight Card */}
            {flagshipProduct && (
              <div className="lg:col-span-5">
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-white/20 shadow-2xl hover:border-gold/40 transition-all duration-500 group">
                  {/* Floating Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-black tracking-widest text-gold bg-black/50 px-3 py-1 rounded-full border border-gold/30">
                      ★ Featured Spotlight
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-white bg-black/40 px-2.5 py-0.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span>{flagshipProduct.rating}</span>
                      <span className="text-white/60 text-[10px]">({flagshipProduct.reviewCount})</span>
                    </div>
                  </div>

                  {/* Spotlight Image with Zoom */}
                  <Link href={`/product/${flagshipProduct.slug}`} className="block relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-black/40">
                    <div id="flagship-spotlight-image" className="relative w-full h-full">
                      <Image
                        src={flagshipProduct.heroImage}
                        alt={flagshipProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </Link>

                  {/* Spotlight Info */}
                  <div className="mt-3.5 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/product/${flagshipProduct.slug}`}>
                          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-gold transition-colors line-clamp-1">
                            {flagshipProduct.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-cream-200/75 line-clamp-1">
                          {flagshipProduct.tagline}
                        </p>
                      </div>
                      <span className="font-sans text-lg font-black text-gold shrink-0">
                        {formatPrice(flagshipProduct.price)}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={handleSpotlightQuickAdd}
                        disabled={spotlightAdded}
                        className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                          spotlightAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gold hover:bg-gold-light text-cocoa-deep font-black'
                        }`}
                      >
                        {spotlightAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Bag!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Quick Add to Bag</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/product/${flagshipProduct.slug}`}
                        className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors border border-white/20"
                        title="View Details"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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

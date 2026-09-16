'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Flame, Heart, Zap, Pizza, Cookie, ArrowRight, ShieldCheck } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ecommerce/ProductCard';

export const CravingMoodSelector: React.FC = () => {
  const [activeMood, setActiveMood] = useState<string>('chocolate');

  const moods = [
    {
      id: 'chocolate',
      label: 'Rich Chocolate Hit',
      emoji: '🍫',
      icon: Flame,
      tagline: '54% Belgian ganache & warm molten cocoa',
      filter: (p: any) =>
        p.name.toLowerCase().includes('truffle') ||
        p.name.toLowerCase().includes('chocolate') ||
        p.name.toLowerCase().includes('brownie') ||
        p.name.toLowerCase().includes('opera'),
    },
    {
      id: 'creamy',
      label: 'Silky Cheesecakes & Cream',
      emoji: '🍰',
      icon: Heart,
      tagline: 'Lotus Biscoff, Tiramisu & Saffron Tres Leches',
      filter: (p: any) =>
        p.category === 'desserts' ||
        p.name.toLowerCase().includes('cheesecake') ||
        p.name.toLowerCase().includes('tiramisu') ||
        p.name.toLowerCase().includes('tres leches') ||
        p.name.toLowerCase().includes('kunafa'),
    },
    {
      id: 'cheesy',
      label: 'Hot & Cheesy Bakes',
      emoji: '🍕',
      icon: Pizza,
      tagline: 'Stone-baked 8" pizzas, Korean buns & Cajun puffs',
      filter: (p: any) =>
        p.category === 'pizzas' ||
        p.category === 'savouries' ||
        p.name.toLowerCase().includes('pizza') ||
        p.name.toLowerCase().includes('bun') ||
        p.name.toLowerCase().includes('puff'),
    },
    {
      id: 'crunchy',
      label: 'Crispy & Spicy Munch',
      emoji: '🌶️',
      icon: Zap,
      tagline: 'Peri Peri Makhana, Masala Chakli & Kodubele',
      filter: (p: any) =>
        p.category === 'snacks' ||
        p.name.toLowerCase().includes('makhana') ||
        p.name.toLowerCase().includes('chakli') ||
        p.name.toLowerCase().includes('chips'),
    },
    {
      id: 'gifting',
      label: 'Sweet Treats & Chocolates',
      emoji: '🎁',
      icon: Cookie,
      tagline: 'Rose Petal Cashew Chocolates, Donuts & Hampers',
      filter: (p: any) =>
        p.category === 'treats' ||
        p.name.toLowerCase().includes('coated') ||
        p.name.toLowerCase().includes('donut') ||
        p.name.toLowerCase().includes('cookie') ||
        p.name.toLowerCase().includes('hamper'),
    },
  ];

  const currentMoodObj = moods.find((m) => m.id === activeMood) || moods[0];
  const filteredProducts = products.filter(currentMoodObj.filter).slice(0, 8);

  return (
    <section className="py-16 sm:py-24 bg-cream-50 border-y border-cream-300 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-caramel/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/15 border border-caramel/30 text-caramel text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Craving Matcher</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight">
              Order By Your <span className="text-caramel italic">Current Craving</span>
            </h2>
            <p className="text-sm text-cocoa/70 max-w-xl">
              Select what your tastebuds desire right now and discover handpicked 100% pure veg & eggless artisan creations.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-caramel hover:text-caramel-dark transition-colors"
          >
            <span>View All 190+ Delights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 1-Tap Mood Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
          {moods.map((m) => {
            const isActive = activeMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMood(m.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs font-bold transition-all whitespace-nowrap snap-start active:scale-95 ${
                  isActive
                    ? 'bg-cocoa text-cream-50 shadow-lg scale-105 border border-caramel/40'
                    : 'bg-white hover:bg-cream-200/70 text-cocoa border border-cream-300 shadow-xs'
                }`}
              >
                <span className="text-base">{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Craving Subtitle Bar */}
        <div className="p-4 rounded-2xl bg-white/80 border border-cream-300/80 flex items-center justify-between text-xs text-cocoa/80">
          <div className="flex items-center gap-2">
            <span className="font-bold text-caramel uppercase tracking-wider text-[11px]">Selected:</span>
            <span className="font-medium">{currentMoodObj.tagline}</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 hidden sm:inline">
            100% Eggless & Fresh Batch
          </span>
        </div>

        {/* Filtered Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

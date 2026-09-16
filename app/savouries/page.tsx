'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Sparkles, Utensils, ShieldCheck, Flame, Coffee } from 'lucide-react';

export default function SavouriesPage() {
  const savouryProducts = products.filter((p) => p.category === 'savouries');
  const [selectedSub, setSelectedSub] = useState<string>('All Savouries');

  const subcategories = [
    'All Savouries',
    'Puffs & Rolls',
    'Buns & Calzones',
    'Breads & Rusks',
    'Hot Savouries',
  ];

  const filtered = selectedSub === 'All Savouries'
    ? savouryProducts
    : savouryProducts.filter((p) => p.subcategory === selectedSub);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-cream-100">
      {/* Category Hero */}
      <section className="relative bg-cocoa-deep text-cream-100 py-16 sm:py-24 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/savouries/korean-bun.webp"
            alt="Hot Savouries & Breads"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep via-cocoa-deep/90 to-cocoa-deep/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-gold text-xs font-semibold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5 text-gold" />
              <span>Breads & Hot Savouries</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Flaky Puffs, Korean Buns <br />
              <span className="text-caramel italic">& Artisan Breads</span>
            </h1>
            <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
              Baked fresh every morning: Golden buttery Cajun paneer puffs, signature creamy Korean garlic buns, toasted paninis, soft milk breads, and crispy rusks.
            </p>

            {/* Micro value badges */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-cream-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-gold" />
                <span>Freshly Baked Every Morning</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>100% Pure Vegetarian</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Subcategory Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pb-2 border-b border-cream-300">
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSub(sub)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedSub === sub
                  ? 'bg-cocoa text-cream-50 shadow-md scale-105'
                  : 'bg-white hover:bg-cream-200 text-cocoa border border-cream-300'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filtered} priorityCount={6} />
      </div>
    </div>
  );
}

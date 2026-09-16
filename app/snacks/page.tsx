'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Sparkles, Flame, ShieldCheck } from 'lucide-react';

export default function SnacksPage() {
  const snackProducts = products.filter((p) => p.category === 'snacks');
  const [selectedSub, setSelectedSub] = useState<string>('All Snacks');

  const subcategories = [
    'All Snacks',
    'Makhana (Foxnuts)',
    'Namkeens & Mixtures',
    'Artisan Breads',
  ];

  const filtered = selectedSub === 'All Snacks'
    ? snackProducts
    : snackProducts.filter((p) => p.subcategory === selectedSub);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-cream-100">
      {/* Category Hero */}
      <section className="relative bg-pistachio-dark text-cream-100 py-16 sm:py-24 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/snacks/peri-peri-makhana.webp"
            alt="Artisanal Makhana and Namkeen Snacks"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep via-cocoa-deep/80 to-pistachio-dark/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pistachio-light/20 border border-pistachio-light/40 text-pistachio-light text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Savory & Crunchy Indulgence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Not Just Snacks. <br />
              <span className="text-caramel italic">It’s Still Delicious.</span>
            </h1>
            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed">
              Slow-roasted Peri Peri Makhana (lotus seeds), traditional South Indian crunchy mixture namkeens, and naturally leavened garlic rosemary sourdough breads.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-cream-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-caramel" />
                <span>Zero trans-fat • Roasted to crunchy perfection</span>
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
        <ProductGrid products={filtered} priorityCount={4} />
      </div>
    </div>
  );
}

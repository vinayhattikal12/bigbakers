'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Sparkles, ShieldCheck, Clock, Award } from 'lucide-react';

export default function DessertsPage() {
  const dessertProducts = products.filter((p) => p.category === 'desserts');
  const [selectedSub, setSelectedSub] = useState<string>('All Desserts');

  const subcategories = [
    'All Desserts',
    'Cheesecakes',
    'Tiramisu & Mousse',
    'Tres Leches',
    'Fudgy Brownies',
  ];

  const filtered = selectedSub === 'All Desserts'
    ? dessertProducts
    : dessertProducts.filter((p) => p.subcategory === selectedSub);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-cream-100">
      {/* Category Hero */}
      <section className="relative bg-berry-crimson text-cream-100 py-16 sm:py-24 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/desserts/biscoff-cheesecake.webp"
            alt="Artisanal Desserts & Cheesecakes"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep via-cocoa-deep/90 to-cocoa-deep/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-berry-pink/20 border border-berry-pink/40 text-berry-pink text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>European Patisserie</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              One More <span className="text-caramel italic">Bite...</span>
            </h1>
            <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
              Baked New York cheesecakes with caramelized Biscoff swirls, espresso-drenched Savoiardi Italian Tiramisu, and Kashmiri saffron infused Tres Leches.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-cream-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>Made with Authentic European Mascarpone & Cream Cheese</span>
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

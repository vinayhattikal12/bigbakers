'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Sparkles, Heart, Smile } from 'lucide-react';

export default function TreatsPage() {
  const treatProducts = products.filter((p) => p.category === 'treats');
  const [selectedSub, setSelectedSub] = useState<string>('All Treats');

  const subcategories = [
    'All Treats',
    'Coated Chocolates',
    'Cookies',
    'Cupcakes',
    'Donuts',
    'Tea Cakes',
    'Candies & Mukhwas',
    'Gift Hampers',
  ];

  const filtered = selectedSub === 'All Treats'
    ? treatProducts
    : treatProducts.filter((p) => p.subcategory === selectedSub);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-cream-100">
      {/* Category Hero */}
      <section className="relative bg-peach text-cocoa py-16 sm:py-24 overflow-hidden mb-12 border-b border-peach-warm/40">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/treats/glazed-donut.webp"
            alt="Artisan Donuts and Cupcakes"
            fill
            priority
            className="object-cover opacity-15"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Everyday Sweet Joys</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-6xl font-black text-cocoa tracking-tight leading-tight">
              Little Treats. <br />
              <span className="text-caramel italic">Big Smiles.</span>
            </h1>
            <p className="text-sm sm:text-base text-cocoa/80 leading-relaxed">
              Brioche chocolate glazed donuts, red velvet swirl cupcakes, NYC-style triple chocolate chunk cookies, and nostalgic fruit sugar candy tins.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-cocoa font-medium">
              <span className="flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-caramel" />
                <span>Perfect for tea-time, parties & gifting</span>
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

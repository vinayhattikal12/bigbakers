'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Sparkles, IceCream, ShieldCheck, Heart } from 'lucide-react';

export default function GelatoPage() {
  const gelatoProducts = products.filter((p) => p.category === 'gelato');
  const [selectedSub, setSelectedSub] = useState<string>('All Gelato');

  const subcategories = [
    'All Gelato',
    'Artisan Gelato',
  ];

  const filtered = selectedSub === 'All Gelato'
    ? gelatoProducts
    : gelatoProducts.filter((p) => p.subcategory === selectedSub);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-cream-100">
      {/* Category Hero */}
      <section className="relative bg-cocoa-deep text-cream-100 py-16 sm:py-24 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gelato/gelato-assorted.webp"
            alt="Artisan Italian Gelato"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep via-cocoa-deep/90 to-cocoa-deep/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-gold text-xs font-semibold uppercase tracking-wider">
              <IceCream className="w-3.5 h-3.5 text-gold" />
              <span>Artisan Gelato</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Slow-Churned <br />
              <span className="text-caramel italic">Italian Gelato</span>
            </h1>
            <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
              Silky, dense, and intensely creamy 100% vegetarian gelato churned daily in Belgian Chocolate, Alphonso Mango, Pista, Lotus Biscoff, and Musk Melon.
            </p>

            {/* Micro value badges */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-cream-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>100% Pure Dairy & Eggless</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-gold" />
                <span>Zero Artificial Preservatives</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Product Grid */}
        <ProductGrid products={filtered} priorityCount={6} />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '@/lib/ecommerce/types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  priorityCount?: number;
  initialCount?: number;
  batchSize?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  priorityCount = 6,
  initialCount = 24,
  batchSize = 16,
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(() =>
    Math.min(initialCount, products.length)
  );
  const observerTargetRef = useRef<HTMLDivElement>(null);

  // Reset visible count whenever the filtered product list changes
  useEffect(() => {
    setVisibleCount(Math.min(initialCount, products.length));
  }, [products, initialCount]);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, products.length));
  }, [batchSize, products.length]);

  // Automatic smooth scroll loading
  useEffect(() => {
    if (visibleCount >= products.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '400px' }
    );

    const el = observerTargetRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [visibleCount, products.length, loadMore]);

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-cream-300 p-8">
        <p className="font-serif text-xl font-bold text-cocoa">No treats in this section yet</p>
        <p className="text-xs text-cocoa/60 mt-1">Check other categories for freshly baked goodness.</p>
      </div>
    );
  }

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {visibleProducts.map((product, idx) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={idx < priorityCount}
          />
        ))}
      </div>

      {/* Progressive Loading Sentinel & Manual Fallback Button */}
      {hasMore && (
        <div ref={observerTargetRef} className="pt-4 flex flex-col items-center justify-center gap-3">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-cream-200 text-cocoa font-bold text-xs sm:text-sm border border-cream-300 shadow-sm transition-all active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-caramel group-hover:rotate-12 transition-transform" />
            <span>Load More Delights</span>
            <span className="px-2 py-0.5 rounded-full bg-cream-200 text-[10px] text-cocoa/70 font-semibold">
              {products.length - visibleCount} remaining
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-caramel group-hover:translate-y-0.5 transition-transform" />
          </button>
          <p className="text-[11px] text-cocoa/50 font-medium">
            Showing {visibleCount} of {products.length} handcrafted items
          </p>
        </div>
      )}
    </div>
  );
};

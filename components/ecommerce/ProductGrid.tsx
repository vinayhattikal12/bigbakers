import React from 'react';
import { Product } from '@/lib/ecommerce/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  priorityCount?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, priorityCount = 4 }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-cream-300 p-8">
        <p className="font-serif text-xl font-bold text-cocoa">No treats in this section yet</p>
        <p className="text-xs text-cocoa/60 mt-1">Check other categories for freshly baked goodness.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < priorityCount} />
      ))}
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Plus, Check, Zap } from 'lucide-react';
import { Product } from '@/lib/ecommerce/types';
import { formatPrice } from '@/lib/utils/formatters';
import { useCart } from '@/lib/context/CartContext';
import { products } from '@/data/products';

interface CravingPairUpsellProps {
  currentCategory: string;
  currentProductId?: string;
}

export const CravingPairUpsell: React.FC<CravingPairUpsellProps> = ({
  currentCategory,
  currentProductId,
}) => {
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<string[]>([]);

  // Determine complementary pairing item based on the craving mindset:
  // Sweet (Cakes/Desserts) -> Savory Crunch (Peri Peri Makhana or Masala Chakli)
  // Pizza/Savouries -> Sweet Finish (Gelato or Rose Coated Chocolates)
  // Treats/Gelato -> Classic Truffle or Cold Beverage
  const getPairingProduct = (): Product | undefined => {
    if (currentCategory === 'cakes' || currentCategory === 'desserts') {
      return products.find((p) => p.slug.includes('peri-peri-makhana')) || products.find((p) => p.category === 'snacks');
    }
    if (currentCategory === 'pizzas' || currentCategory === 'savouries') {
      return products.find((p) => p.slug.includes('belgian-chocolate-gelato')) || products.find((p) => p.category === 'gelato') || products.find((p) => p.category === 'desserts');
    }
    return products.find((p) => p.slug.includes('rose-petal-cashew') || p.slug.includes('coated-chocolate')) || products.find((p) => p.category === 'treats');
  };

  const pairItem = getPairingProduct();

  if (!pairItem || pairItem.id === currentProductId) return null;

  const isAdded = addedIds.includes(pairItem.id);

  const handleAddPair = () => {
    const defaultWeight = pairItem.weights.find((w) => w.isDefault)?.weight || pairItem.weights[0]?.weight || 'Standard';
    addItem(pairItem, defaultWeight, 1, undefined, false);
    setAddedIds((prev) => [...prev, pairItem.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== pairItem.id));
    }, 2500);
  };

  return (
    <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-50 via-cream-100 to-amber-50 border border-amber-200/80 shadow-xs space-y-2.5 w-full min-w-0 overflow-hidden">
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <Zap className="w-3.5 h-3.5 text-caramel fill-caramel shrink-0" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cocoa truncate">
            The Perfect Craving Contrast
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-caramel/15 text-caramel shrink-0">
          Chef Recommended
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-cream-200 shadow-xs w-full min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-cream-200 shrink-0">
            <Image
              src={pairItem.heroImage || '/images/products/celebration-cakes/belgian-truffle-cake.webp'}
              alt={pairItem.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-xs font-bold text-cocoa truncate">
              {pairItem.name}
            </h5>
            <p className="text-[10px] sm:text-[11px] text-cocoa/60 truncate">
              {pairItem.tagline}
            </p>
            <span className="font-bold text-xs text-caramel">
              {formatPrice(pairItem.price)}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddPair}
          disabled={isAdded}
          className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 active:scale-95 ${
            isAdded
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-cocoa text-cream-50 hover:bg-caramel hover:text-white shadow-sm'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span className="text-[11px]">Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span className="text-[11px]">+ Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

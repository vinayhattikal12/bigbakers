'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Plus, Star, Check, Sparkles } from 'lucide-react';
import { Product } from '@/lib/ecommerce/types';
import { formatPrice } from '@/lib/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import { triggerFlyToCartAnimation } from '@/components/ecommerce/FlyToCartOverlay';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const isWishlisted = isInWishlist(product.id);

  const defaultWeight = product.weights.find((w) => w.isDefault)?.weight || product.weights[0]?.weight;
  const currentPrice = product.weights.find((w) => w.weight === defaultWeight)?.price || product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger 3D Pop-out, parabolic fly animation, and Live Dispatch mini-story
    if (imageContainerRef.current) {
      triggerFlyToCartAnimation(imageContainerRef.current, product.heroImage, {
        id: `${product.id}-${Date.now()}`,
        name: product.name,
        price: currentPrice,
        weight: defaultWeight,
        imageUrl: product.heroImage,
        category: product.category,
      });
    }

    addItem(product, defaultWeight, 1, undefined, false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-cream-300/80 hover:border-caramel/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image Container */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-square w-full overflow-hidden bg-cream-100"
      >
        <div ref={imageContainerRef} className="relative w-full h-full">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Minimal Badges Overlay: Clean on mobile, rich on desktop */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.bestseller ? (
            <span className="px-2 py-0.5 rounded-full bg-caramel text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-xs">
              Bestseller
            </span>
          ) : product.freshlyBaked ? (
            <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold tracking-wider shadow-xs">
              Fresh Batch
            </span>
          ) : null}
        </div>

        {/* Pure Veg Green Dot Indicator (Standard Indian FSSAI aesthetic) */}
        <div className="absolute bottom-2 left-2 z-10">
          <div className="w-4 h-4 rounded-sm border border-emerald-600 bg-white/90 flex items-center justify-center shadow-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-600" />
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-all z-10 active:scale-90 ${
            isWishlisted
              ? 'bg-berry-rose text-white shadow-md'
              : 'bg-white/80 text-cocoa/70 hover:bg-white hover:text-berry-rose shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* Details Body */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] uppercase font-bold text-caramel tracking-wider truncate">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-0.5 text-[10px] sm:text-xs text-cocoa/90 font-bold bg-cream-100 px-1.5 py-0.5 rounded-md shrink-0">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-gold text-gold" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-caramel transition-colors">
            <h3 className="font-serif text-xs sm:text-sm md:text-base font-bold text-cocoa line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Desktop Only: Tagline & Sensory Pill for spacious desktop layouts */}
          <div className="hidden sm:block">
            <p className="text-xs text-cocoa/60 mt-1 line-clamp-1 leading-relaxed">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Price and Quick Add */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-cream-200/80 flex items-center justify-between gap-1">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-sans font-black text-sm sm:text-base text-cocoa">
                {formatPrice(currentPrice)}
              </span>
              {product.originalPrice && product.originalPrice > currentPrice && (
                <span className="text-[10px] sm:text-xs text-cocoa/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {defaultWeight && (
              <span className="text-[10px] text-cocoa/50 font-medium truncate block">
                {defaultWeight}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`w-8 h-8 sm:w-auto sm:h-auto p-1.5 sm:px-3 sm:py-1.5 rounded-full font-bold text-xs flex items-center justify-center gap-1 transition-all shrink-0 active:scale-90 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-cocoa text-cream-50 hover:bg-caramel hover:text-white shadow-xs'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

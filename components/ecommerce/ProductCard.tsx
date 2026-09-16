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
    <div className="group relative bg-white rounded-3xl border border-cream-300/80 hover:border-caramel/50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden">
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
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.bestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {product.dietary === 'eggless' && <Badge variant="veg">100% Eggless</Badge>}
          {product.freshlyBaked && <Badge variant="fresh">Freshly Baked</Badge>}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 active:scale-90 ${
            isWishlisted
              ? 'bg-berry-rose text-white shadow-md'
              : 'bg-white/80 text-cocoa/70 hover:bg-white hover:text-berry-rose shadow-sm'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase font-semibold text-caramel tracking-wider">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-xs text-cocoa/80 font-semibold bg-cream-100 px-2 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span>{product.rating}</span>
              <span className="text-cocoa/40 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-caramel transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-bold text-cocoa line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs text-cocoa/60 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Price and Quick Add */}
        <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-base sm:text-lg text-cocoa">
                {formatPrice(currentPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-cocoa/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {defaultWeight && (
              <span className="text-[11px] text-cocoa/50 font-medium block">
                {defaultWeight}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`p-2.5 sm:px-3.5 sm:py-2 rounded-full font-medium text-xs flex items-center gap-1.5 transition-all duration-300 active:scale-90 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-cocoa text-cream-50 hover:bg-caramel hover:text-white shadow-sm hover:shadow-md'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline font-semibold">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

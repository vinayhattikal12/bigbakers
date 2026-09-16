'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Heart, Share2, Check, Sparkles, ZoomIn } from 'lucide-react';
import { useWishlist } from '@/lib/context/WishlistContext';

interface ProductMediaGalleryProps {
  productId: string;
  productName: string;
  heroImage: string;
  gallery: string[];
  bestseller?: boolean;
  dietary?: string;
  freshlyBaked?: boolean;
}

export const ProductMediaGallery: React.FC<ProductMediaGalleryProps> = ({
  productId,
  productName,
  heroImage,
  gallery,
  bestseller,
  dietary,
  freshlyBaked,
}) => {
  const images = gallery.length > 0 ? gallery : [heroImage];
  const [activeImage, setActiveImage] = useState<string>(images[0]);
  const [activeAngleIndex, setActiveAngleIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(productId);

  const angleLabels = ['Whole Creation', 'Cross-Section Slice', 'Artisanal Texture'];

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleSelectImage = (img: string, idx: number) => {
    setActiveImage(img);
    setActiveAngleIndex(idx);
  };

  return (
    <div className="space-y-4">
      {/* Main Stage Image with 3D Pop Out & Hover Zoom */}
      <div
        id="product-hero-image-stage"
        className="group relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-cream-300 shadow-sm transition-all duration-500 hover:shadow-xl"
      >
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {bestseller && <Badge variant="bestseller">Bestseller</Badge>}
          {dietary === 'eggless' && <Badge variant="veg">100% Eggless</Badge>}
          {freshlyBaked && <Badge variant="fresh">Freshly Baked Today</Badge>}
        </div>

        {/* Angle view pill indicator */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-cocoa/80 backdrop-blur-md text-cream-50 text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{angleLabels[activeAngleIndex % angleLabels.length] || 'Artisanal Angle'}</span>
          </span>
        </div>

        {/* Wishlist & Share Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={handleShare}
            className="p-3 rounded-full bg-white/90 backdrop-blur-md text-cocoa/70 hover:text-cocoa hover:bg-white shadow-md transition-all active:scale-95"
            title="Share link"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => toggleWishlist(productId)}
            className={`p-3 rounded-full backdrop-blur-md transition-all shadow-md active:scale-95 ${
              isWishlisted
                ? 'bg-berry-rose text-white'
                : 'bg-white/90 text-cocoa/70 hover:bg-white hover:text-berry-rose'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Angle Selector Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((imgUrl, i) => {
            const isSelected = activeImage === imgUrl;
            return (
              <button
                key={i}
                onClick={() => handleSelectImage(imgUrl, i)}
                className={`relative flex items-center gap-2.5 p-2 rounded-2xl border-2 transition-all flex-shrink-0 bg-white ${
                  isSelected
                    ? 'border-caramel scale-[1.03] shadow-md ring-2 ring-caramel/20'
                    : 'border-cream-300 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={imgUrl}
                    alt={`${productName} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="text-left pr-2 hidden sm:block">
                  <span className="block text-[11px] font-bold text-cocoa">
                    {angleLabels[i] || `Angle 0${i + 1}`}
                  </span>
                  <span className="block text-[10px] text-cocoa/50">Inspect View</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/context/CartContext';
import { ProductCard } from '@/components/ecommerce/ProductCard';
import { ProductMediaGallery } from '@/components/ecommerce/ProductMediaGallery';
import { SensoryProfile } from '@/components/ecommerce/SensoryProfile';
import { LayerAnatomy } from '@/components/ecommerce/LayerAnatomy';
import { triggerFlyToCartAnimation } from '@/components/ecommerce/FlyToCartOverlay';
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  ArrowRight,
  Flame,
} from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const { addItem } = useCart();

  const [selectedWeight, setSelectedWeight] = useState(
    product.weights.find((w) => w.isDefault)?.weight || product.weights[0]?.weight || '500g'
  );
  const [quantity, setQuantity] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const selectedWeightOpt = product.weights.find((w) => w.weight === selectedWeight);
  const unitPrice = selectedWeightOpt ? selectedWeightOpt.price : product.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    // Locate the hero image stage element to trigger 3D pop out and Delivery Dispatch HUD
    const heroImageStage = document.getElementById('product-hero-image-stage');
    if (heroImageStage) {
      triggerFlyToCartAnimation(heroImageStage, product.heroImage, {
        name: product.name,
        weight: selectedWeight,
        price: totalPrice,
      });
    }

    addItem(
      product,
      selectedWeight,
      quantity,
      customMessage.trim() ? customMessage.trim() : undefined,
      false
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(
      product,
      selectedWeight,
      quantity,
      customMessage.trim() ? customMessage.trim() : undefined,
      true
    );
    router.push('/checkout');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-28 pb-32 min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-cocoa/60 font-medium">
          <Link href="/" className="hover:text-caramel">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="hover:text-caramel capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-cocoa font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Section (Image Gallery + Purchase Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Gallery Column with Multi-Angle View */}
          <div className="lg:col-span-7">
            <ProductMediaGallery
              productId={product.id}
              productName={product.name}
              heroImage={product.heroImage}
              gallery={product.gallery}
              bestseller={product.bestseller}
              dietary={product.dietary}
              freshlyBaked={product.freshlyBaked}
            />
          </div>

          {/* Product Purchase Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-caramel">
                  {product.subcategory}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-cocoa bg-white border border-cream-300 px-2.5 py-1 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>{product.rating}</span>
                  <span className="text-cocoa/40">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-black text-cocoa tracking-tight">
                {product.name}
              </h1>

              <p className="text-sm text-cocoa/70 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price block */}
            <div className="p-5 bg-white rounded-3xl border border-cream-300 shadow-xs space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-3xl font-black text-cocoa">
                  {formatPrice(unitPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-cocoa/40 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Taxes Included
                </span>
              </div>
              <p className="text-xs text-cocoa/60">
                Freshly baked upon order confirmation. Guaranteed same-day delivery across Bengaluru.
              </p>
            </div>

            {/* Weight / Portion Selector */}
            {product.weights.length > 0 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa">
                  Select Size / Portion:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w.weight}
                      onClick={() => setSelectedWeight(w.weight)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedWeight === w.weight
                          ? 'border-cocoa bg-cocoa text-cream-50 font-bold shadow-sm'
                          : 'border-cream-300 bg-white hover:bg-cream-100 text-cocoa'
                      }`}
                    >
                      <span className="block text-xs">{w.weight}</span>
                      <span className="block text-[11px] opacity-80">{formatPrice(w.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Cake Message (if cake category) */}
            {product.category === 'cakes' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-cocoa flex items-center justify-between">
                  <span>Custom Message on Cake (Optional):</span>
                  <span className="text-[11px] text-cocoa/50 font-normal">Max 25 chars</span>
                </label>
                <input
                  type="text"
                  maxLength={25}
                  placeholder="e.g. Happy Birthday Arjun! 🎉"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-cream-300 rounded-2xl text-xs text-cocoa focus:outline-none focus:border-caramel"
                />
              </div>
            )}

            {/* Quantity Selector + Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-cream-300 rounded-full bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-cream-200 rounded-full text-cocoa transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-cocoa min-w-[30px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-cream-200 rounded-full text-cocoa transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 justify-center shadow-lg active:scale-95 transition-transform"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span>Add to Bag • {formatPrice(totalPrice)}</span>
                    </>
                  )}
                </Button>
              </div>

              <Button
                variant="secondary"
                size="lg"
                onClick={handleBuyNow}
                className="w-full justify-center"
              >
                <span>Buy Now with Express Delivery</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Assurance badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-cream-200 text-xs text-cocoa/75">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-caramel flex-shrink-0" />
                <span>Chilled Bengaluru Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-caramel flex-shrink-0" />
                <span>100% Real Dairy Cream</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sensory Flavor & Texture Blueprint */}
        <SensoryProfile
          category={product.category}
          subcategory={product.subcategory}
          rating={product.rating}
          dietary={product.dietary}
        />

        {/* Layer Anatomy Exploded View */}
        <LayerAnatomy productSlug={product.slug} category={product.category} />

        {/* Product Story, Ingredients & Storage Tabs */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-cocoa mb-3">About This Creation</h2>
              <p className="text-sm text-cocoa/80 leading-relaxed">
                {product.longDescription || product.description}
              </p>
            </div>

            {/* Ingredients */}
            <div className="space-y-2 pt-4 border-t border-cream-200">
              <h3 className="font-serif text-lg font-bold text-cocoa">Artisanal Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-3.5 py-1 rounded-full bg-cream-100 text-cocoa text-xs font-medium border border-cream-300"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Allergens & Shelf Life */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-cream-200 text-xs text-cocoa/80">
              <div className="space-y-1">
                <h4 className="font-bold text-cocoa uppercase tracking-wider">Allergen Information</h4>
                <p>{product.allergens.join(', ') || 'No common allergens declared.'}</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-cocoa uppercase tracking-wider">Shelf Life & Storage</h4>
                <p>{product.shelfLife || '3 days refrigerated below 5°C'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
              Verified Customer Reviews
            </h2>
            <div className="flex items-center gap-1.5 text-sm font-bold text-cocoa bg-white px-4 py-1.5 rounded-full border border-cream-300">
              <Star className="w-4 h-4 fill-gold text-gold" />
              <span>{product.rating} out of 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-white rounded-3xl border border-cream-300 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-cocoa">{rev.author}</h4>
                      <p className="text-[11px] text-cocoa/40">{rev.date}</p>
                    </div>
                    <div className="flex items-center text-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-cocoa/75 leading-relaxed">&quot;{rev.comment}&quot;</p>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-6 bg-white rounded-3xl border border-cream-300 text-center text-xs text-cocoa/60">
                ⭐ Rated 4.9/5 based on {product.reviewCount} customer reviews in Bengaluru.
              </div>
            )}
          </div>
        </div>

        {/* Related Creations */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-cream-300">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
                You Might Also Crave
              </h2>
              <Link
                href={`/${product.category}`}
                className="text-xs font-semibold text-caramel hover:underline"
              >
                View Category
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-cream-300 shadow-2xl z-40 lg:hidden flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-cocoa/50 font-bold uppercase block">Total</span>
          <span className="font-sans text-base font-black text-cocoa">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-1 justify-end max-w-xs">
          <Button variant="outline" size="sm" onClick={handleAddToCart} className="flex-1 px-2">
            {isAdded ? 'Added' : 'Add to Bag'}
          </Button>
          <Button variant="primary" size="sm" onClick={handleBuyNow} className="flex-1 px-2">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

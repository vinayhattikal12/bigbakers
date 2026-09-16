'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShoppingBag, Check, Flame } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { products } from '@/data/products';

export const MasterReserveShowcase: React.FC = () => {
  const { addItem } = useCart();
  const [selectedReserveIndex, setSelectedReserveIndex] = useState(0);
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  // Curated master reserve items
  const reserveItems = [
    {
      productId: 'p-cake-truffle-1',
      title: '54% Belgian Dark Truffle Gateau',
      subtitle: 'Our crown jewel signature creation',
      description: 'Layered with moist cocoa sponge, layered with silky 54% Belgian dark chocolate ganache, and crowned with hand-rolled dark truffle pearls.',
      image: '/images/cakes/belgian-truffle.webp',
      price: 649,
      weight: '500g',
      slug: 'belgian-chocolate-truffle-cake',
      badge: 'Masterpiece Reserve',
      flavorProfile: [
        { label: 'Cocoa Intensity', value: '54% Callebaut Dark' },
        { label: 'Texture', value: 'Glossy & Velvet Dense' },
        { label: 'Pairing', value: 'Cold Brew or Espresso' },
      ],
      tastingNotes: 'Deep roasted cocoa with a balanced sweet-bitter finish and melt-in-mouth richness.',
    },
    {
      productId: 'p-dessert-biscoff-1',
      title: 'Lotus Biscoff Baked Cheesecake',
      subtitle: 'New York style slow-baked perfection',
      description: 'Slow-baked with 100% Philadelphia cream cheese on a crunchy caramelized Speculoos crust, blanketed in warm spiced Biscoff glaze.',
      image: '/images/desserts/biscoff-cheesecake.webp',
      price: 899,
      weight: '500g',
      slug: 'lotus-biscoff-baked-cheesecake',
      badge: 'Pâtisserie Icon',
      flavorProfile: [
        { label: 'Cream Base', value: 'Slow-Baked Cream Cheese' },
        { label: 'Crust', value: 'Caramelized Speculoos' },
        { label: 'Profile', value: 'Warm Spice & Dairy Silk' },
      ],
      tastingNotes: 'Buttery caramelized biscuit crunch folding into a silky, luscious cream cheese heart.',
    },
    {
      productId: 'p-cake-kunafa-1',
      title: 'Pistachio Kunafa Royale',
      subtitle: 'Middle Eastern pastry meets artisan gateau',
      description: 'Golden roasted crispy Kataifi phyllo pastry soaked in light saffron-scented syrup, layered with Turkish pistachio mousse and soft sponge.',
      image: '/images/cakes/pista-kunafa.webp',
      price: 799,
      weight: '500g',
      slug: 'pistachio-kunafa-cake',
      badge: 'Trending Sensation',
      flavorProfile: [
        { label: 'Crunch Layer', value: 'Slow-Roasted Kadayif' },
        { label: 'Nut Paste', value: 'Pure Iranian Pistachio' },
        { label: 'Finish', value: 'Rose Water & Pistachio Flakes' },
      ],
      tastingNotes: 'Crisp, crackling butter crunch contrasting with pillowy light pistachio cream.',
    },
    {
      productId: 'p-pizza-farmhouse-1',
      title: 'Stone-Baked Farmhouse Truffle Pizza',
      subtitle: 'Oven-fresh 8" artisan flatbread',
      description: 'Hand-stretched sourdough base baked on volcanic stone, smeared with slow-simmered San Marzano tomato marinara, fresh mozzarella, and sweet basil.',
      image: '/images/pizzas/farmhouse-pizza.webp',
      price: 349,
      weight: '8" Pizza',
      slug: 'farmhouse-special-pizza',
      badge: 'Oven Masterwork',
      flavorProfile: [
        { label: 'Dough', value: '48hr Cold Fermented' },
        { label: 'Cheese', value: '100% Whole Milk Mozzarella' },
        { label: 'Crust', value: 'Stone-Fired Leopard Spots' },
      ],
      tastingNotes: 'Crispy blistered airy crust with bubbling stringy mozzarella and aromatic garden herbs.',
    },
    {
      productId: 'p-gelato-assorted-1',
      title: 'Sicilian Pistachio Artisanal Gelato',
      subtitle: 'Slow-churned pure Italian indulgence',
      description: 'Crafted with premium roasted Sicilian pistachios and farm-fresh whole milk. Churned at low speed for dense, velvety texture without air pockets.',
      image: '/images/gelato/gelato-assorted.webp',
      price: 299,
      weight: '250ml Tub',
      slug: 'artisanal-gelato-tubs',
      badge: 'Italian Churn',
      flavorProfile: [
        { label: 'Milk Base', value: 'Farm Fresh Dairy' },
        { label: 'Overrun', value: 'Low Air • Maximum Density' },
        { label: 'Purity', value: 'Zero Artificial Stabilizers' },
      ],
      tastingNotes: 'Nutty, earthy richness with an ultra-smooth glide that melts slowly on the palate.',
    },
  ];

  const current = reserveItems[selectedReserveIndex];

  const handleQuickAdd = () => {
    // Find matching product in catalog
    const matchedProduct = products.find(
      (p) => p.slug === current.slug || p.id === current.productId
    ) || {
      id: current.productId,
      name: current.title,
      slug: current.slug,
      description: current.description,
      category: 'cakes',
      price: current.price,
      images: [current.image],
      weights: [{ weight: current.weight, price: current.price, isDefault: true }],
      isVeg: true,
      featured: true,
    };

    addItem(matchedProduct as any, current.weight, 1, undefined, true);
    setAddedItemKey(current.productId);
    setTimeout(() => setAddedItemKey(null), 2500);
  };

  return (
    <section className="py-20 sm:py-28 bg-cocoa-deep text-cream-100 relative overflow-hidden">
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-caramel/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Pâtisserie Reserve</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              The Master Baker&apos;s <br className="hidden sm:inline" />
              <span className="text-caramel italic">Signature Creations</span>
            </h2>
            <p className="text-sm sm:text-base text-cream-200/80 max-w-xl">
              An intimate culinary tasting showcase of our most acclaimed, painstakingly crafted creations. Pure 100% vegetarian & eggless perfection.
            </p>
          </div>

          {/* Quick Item Picker Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x self-start md:self-auto">
            {reserveItems.map((item, idx) => {
              const isSelected = selectedReserveIndex === idx;
              return (
                <button
                  key={item.productId}
                  onClick={() => setSelectedReserveIndex(idx)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap snap-start border ${
                    isSelected
                      ? 'bg-gold text-cocoa border-gold shadow-lg shadow-gold/20 scale-105'
                      : 'bg-cocoa/80 text-cream-200/80 hover:text-white border-cream-300/10 hover:border-caramel/40'
                  }`}
                >
                  <span>{item.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Showcase Card: Split Screen Cinematic Presentation */}
        <div className="rounded-3xl bg-cocoa/90 border border-caramel/30 backdrop-blur-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: High-Res Interactive Image Frame */}
          <div className="lg:col-span-6 relative aspect-square lg:aspect-auto min-h-[380px] sm:min-h-[460px] overflow-hidden bg-black/40">
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:to-cocoa/90" />

            {/* Badges Over Image */}
            <div className="absolute top-5 left-5 flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold tracking-wider uppercase">
                {current.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                100% Eggless
              </span>
            </div>

            {/* Price Pill Floating */}
            <div className="absolute bottom-5 left-5 p-3 sm:p-4 rounded-2xl bg-cocoa/90 backdrop-blur-md border border-caramel/40 shadow-xl">
              <span className="text-[11px] uppercase tracking-wider text-cream-200/70 block font-semibold">Starting From</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl sm:text-3xl font-black text-gold">₹{current.price}</span>
                <span className="text-xs text-cream-200/60 font-medium">({current.weight})</span>
              </div>
            </div>
          </div>

          {/* Right: Flavor Notes & Sensory Specs */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-light">
                  {current.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-cream-200/85 leading-relaxed font-sans">
                {current.description}
              </p>

              {/* Flavor Profile Specs Grid */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {current.flavorProfile.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1"
                  >
                    <p className="text-[10px] uppercase font-bold tracking-wider text-gold/90">
                      {spec.label}
                    </p>
                    <p className="text-xs font-semibold text-white truncate">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tasting Note Box */}
              <div className="p-4 rounded-2xl bg-caramel/10 border border-caramel/30 space-y-1 text-xs">
                <span className="font-bold text-caramel uppercase tracking-wider text-[10px] block">
                  Sommelier Tasting Note:
                </span>
                <p className="text-cream-100/90 italic font-serif text-xs sm:text-sm">
                  &ldquo;{current.tastingNotes}&rdquo;
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleQuickAdd}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-gold via-amber-400 to-gold text-cocoa font-bold text-sm shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {addedItemKey === current.productId ? (
                  <>
                    <Check className="w-4 h-4 text-cocoa" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Master Reserve (₹{current.price})</span>
                  </>
                )}
              </button>

              <Link
                href={`/product/${current.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

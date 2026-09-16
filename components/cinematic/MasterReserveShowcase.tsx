'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShoppingBag, Check, Star, Heart } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { products } from '@/data/products';

export const MasterReserveShowcase: React.FC = () => {
  const { addItem } = useCart();
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedWeightIdx, setSelectedWeightIdx] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const signatureItems = [
    {
      id: 'p-cake-truffle-1',
      title: '54% Belgian Chocolate Truffle Cake',
      category: 'Celebration Cakes',
      tagline: 'Bengaluru’s Most Loved Dark Chocolate Gateau',
      description:
        'Layers of moist chocolate sponge smothered in silky 54% Callebaut Belgian dark chocolate ganache, finished with hand-piped dark chocolate rosettes and chocolate pearls.',
      image: '/images/cakes/belgian-truffle.webp',
      badge: '#1 Bestseller',
      slug: 'belgian-chocolate-truffle-cake',
      rating: '4.9',
      reviewCount: '1,240+',
      bakingNotes: [
        'Fresh 5:00 AM batch daily',
        '100% Pure Callebaut Dark Ganache',
        'Zero compound chocolate or palm oil',
      ],
      weights: [
        { weight: '500g', price: 649, serves: 'Serves 4–6' },
        { weight: '1 Kg', price: 1199, serves: 'Serves 8–12' },
      ],
    },
    {
      id: 'p-dessert-biscoff-1',
      title: 'Lotus Biscoff Baked Cheesecake',
      category: 'Artisan Cheesecakes',
      tagline: 'Authentic New York Slow-Baked Style',
      description:
        'Slow-baked with 100% Philadelphia cream cheese over a crispy spiced Lotus Biscoff biscuit crust, generously smothered in warm caramelized Speculoos spread.',
      image: '/images/desserts/biscoff-cheesecake.webp',
      badge: 'Chef Signature',
      slug: 'lotus-biscoff-baked-cheesecake',
      rating: '4.9',
      reviewCount: '620+',
      bakingNotes: [
        'Slow-baked for 90 minutes',
        'Real Philadelphia Cream Cheese',
        'Rich caramelized Speculoos crust',
      ],
      weights: [
        { weight: '500g', price: 899, serves: 'Serves 4–6' },
        { weight: '1 Kg', price: 1699, serves: 'Serves 8–10' },
      ],
    },
    {
      id: 'p-cake-kunafa-1',
      title: 'Pistachio Kunafa Royale Cake',
      category: 'Fusion Gateaux',
      tagline: 'Middle Eastern Crunch Meets Velvety Sponge',
      description:
        'Golden roasted crispy Kataifi pastry layered with Iranian pistachio cream, soft sponge, and delicate saffron-rose notes. Unforgettable crackle in every bite.',
      image: '/images/cakes/pista-kunafa.webp',
      badge: 'Trending Star',
      slug: 'pistachio-kunafa-cake',
      rating: '4.8',
      reviewCount: '480+',
      bakingNotes: [
        'Slow-roasted golden Kataifi phyllo',
        'Pure Iranian Pistachio paste',
        'Crispy texture contrast',
      ],
      weights: [
        { weight: '500g', price: 799, serves: 'Serves 4–6' },
        { weight: '1 Kg', price: 1499, serves: 'Serves 8–12' },
      ],
    },
    {
      id: 'p-pizza-farmhouse-1',
      title: 'Stone-Baked Farmhouse Special Pizza',
      category: 'Hot Savouries',
      tagline: 'Oven-Hot 8" Hand-Stretched Crust',
      description:
        '48-hour cold fermented dough baked directly on stone slab, topped with slow-simmered San Marzano tomato marinara, farm-fresh whole milk mozzarella, and crunchy garden vegetables.',
      image: '/images/pizzas/farmhouse-pizza.webp',
      badge: 'Oven Fresh',
      slug: 'farmhouse-special-pizza',
      rating: '4.8',
      reviewCount: '390+',
      bakingNotes: [
        'Stone-fired crispy blistered crust',
        '100% Whole Milk Mozzarella',
        'Freshly baked to order',
      ],
      weights: [
        { weight: '8" Pizza', price: 349, serves: 'Serves 1–2' },
      ],
    },
    {
      id: 'p-gelato-assorted-1',
      title: 'Sicilian Pistachio Artisanal Gelato',
      category: 'Italian Gelato',
      tagline: 'Slow Churned Pure Cream Indulgence',
      description:
        'Made the traditional Italian way with roasted Sicilian Bronte pistachios and whole dairy milk. Churned slowly for an ultra-dense, velvety texture with zero artificial stabilizers.',
      image: '/images/gelato/gelato-assorted.webp',
      badge: 'Italian Churn',
      slug: 'artisanal-gelato-tubs',
      rating: '4.9',
      reviewCount: '290+',
      bakingNotes: [
        'Zero artificial emulsifiers',
        'Slow-churned for dense creaminess',
        'Roasted Sicilian Pistachios',
      ],
      weights: [
        { weight: '250ml Tub', price: 299, serves: 'Serves 1–2' },
        { weight: '500ml Tub', price: 549, serves: 'Serves 3–4' },
      ],
    },
  ];

  const current = signatureItems[activeIdx];
  const activeWeightObj = current.weights[selectedWeightIdx] || current.weights[0];

  const handleAddToCart = () => {
    const matchedProduct = products.find(
      (p) => p.slug === current.slug || p.id === current.id
    ) || {
      id: current.id,
      name: current.title,
      slug: current.slug,
      description: current.description,
      category: 'cakes',
      price: activeWeightObj.price,
      images: [current.image],
      weights: current.weights.map((w, i) => ({
        weight: w.weight,
        price: w.price,
        isDefault: i === 0,
      })),
      isVeg: true,
      featured: true,
    };

    addItem(matchedProduct as any, activeWeightObj.weight, 1, undefined, true);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <section className="py-16 sm:py-24 bg-cream-50 relative overflow-hidden border-b border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chef&apos;s Signature Showcase</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight">
              Our Signature <span className="text-caramel italic">Masterpieces</span>
            </h2>
            <p className="text-sm sm:text-base text-cocoa/70 max-w-xl font-sans">
              Handcrafted in small batches every morning. Discover the creations that made Big Bakers Bengaluru’s favorite gourmet bakery.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-caramel hover:text-caramel-dark group self-start md:self-auto"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Navigation Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
          {signatureItems.map((item, index) => {
            const isSelected = activeIdx === index;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIdx(index);
                  setSelectedWeightIdx(0);
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap snap-start ${
                  isSelected
                    ? 'bg-cocoa text-cream-50 shadow-md scale-102 border border-cocoa'
                    : 'bg-white hover:bg-cream-200/80 text-cocoa border border-cream-300'
                }`}
              >
                <span>{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-caramel text-white' : 'bg-cream-200 text-cocoa/70'
                  }`}
                >
                  ₹{item.weights[0].price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Masterpiece Card */}
        <div className="rounded-3xl bg-white border border-cream-300 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Product Image with High Polish Framing */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] lg:aspect-auto min-h-[340px] sm:min-h-[420px] bg-cocoa-deep overflow-hidden">
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Badges Over Image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-caramel text-white text-[11px] font-bold shadow-md">
                {current.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-emerald-800 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                100% Eggless
              </span>
            </div>

            {/* Rating pill */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md flex items-center gap-1.5 text-xs font-bold text-cocoa">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span>{current.rating}</span>
              <span className="text-cocoa/50 font-normal">({current.reviewCount})</span>
            </div>
          </div>

          {/* Right: Rich Authentic Details & Ordering Bar */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-caramel">
                  {current.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-cocoa leading-tight mt-1">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-cocoa/60 mt-1">
                  {current.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-cocoa/80 leading-relaxed font-sans">
                {current.description}
              </p>

              {/* Authentic Kitchen Highlights */}
              <div className="p-4 rounded-2xl bg-cream-100/80 border border-cream-300/80 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-cocoa/70">
                  Kitchen Highlights
                </p>
                <ul className="space-y-1.5 text-xs text-cocoa/90 font-medium">
                  {current.bakingNotes.map((note, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-caramel flex-shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weight Selector */}
              {current.weights.length > 1 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-cocoa block">Select Portion:</span>
                  <div className="grid grid-cols-2 gap-3">
                    {current.weights.map((w, idx) => {
                      const isSelected = selectedWeightIdx === idx;
                      return (
                        <button
                          key={w.weight}
                          onClick={() => setSelectedWeightIdx(idx)}
                          className={`p-3 rounded-2xl text-left border transition-all ${
                            isSelected
                              ? 'border-caramel bg-cream-100 ring-2 ring-caramel/20'
                              : 'border-cream-300 bg-white hover:border-cream-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-cocoa">{w.weight}</span>
                            <span className="font-serif font-black text-xs text-caramel">
                              ₹{w.price}
                            </span>
                          </div>
                          <span className="text-[10px] text-cocoa/50 block mt-0.5">{w.serves}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Action Button */}
            <div className="pt-4 border-t border-cream-200 flex flex-col sm:flex-row items-center gap-3">
              <div className="w-full sm:w-auto sm:pr-4">
                <span className="text-[10px] text-cocoa/50 uppercase font-semibold block">Total Price</span>
                <span className="font-serif text-2xl sm:text-3xl font-black text-cocoa">
                  ₹{activeWeightObj.price}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-caramel hover:bg-caramel-dark text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Order ({activeWeightObj.weight})</span>
                  </>
                )}
              </button>

              <Link
                href={`/product/${current.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-cream-100 hover:bg-cream-200 text-cocoa text-xs font-bold border border-cream-300 transition-all"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

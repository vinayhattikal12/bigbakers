'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CravingCollectionItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  video: string;
  badge: string;
  highlight: string;
  itemCount: string;
  accentColor: string;
  borderColor: string;
}

const CravingCard: React.FC<{
  item: CravingCollectionItem;
}> = ({ item }) => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    // Use IntersectionObserver to detect when this card appears while scrolling on mobile
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.defaultMuted = true;
          videoRef.current.play().catch(() => {});
        }
      },
      {
        threshold: 0.35, // Trigger when 35% of the card is visible in mobile viewport
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(cardEl);
    return () => observer.disconnect();
  }, []);

  const showVideo = isHovered || isInView;

  return (
    <Link
      ref={cardRef}
      href={item.href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-cream-300 ${item.borderColor} transition-all duration-500 flex flex-col justify-between p-6 bg-cocoa-deep`}
    >
      {/* Background Imagery & Ambient Video (Active on scroll for mobile, on hover for desktop) */}
      <div className="absolute inset-0 z-0 bg-cocoa-deep overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            showVideo ? 'scale-105 opacity-20' : 'opacity-85 group-hover:scale-110 group-hover:opacity-20'
          }`}
        />
        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            poster={item.image}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(() => {});
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none filter brightness-[1.12] contrast-[1.05] ${
              showVideo ? 'opacity-90' : 'opacity-0 group-hover:opacity-90'
            }`}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-t ${item.accentColor}`} />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Top Meta Tagging */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 flex items-center gap-1.5">
          {showVideo && <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
          <span>{item.badge}</span>
        </span>
        <span className="text-[10px] font-semibold text-white/90 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
          {item.itemCount}
        </span>
      </div>

      {/* Bottom Editorial Content */}
      <div className="relative z-10 space-y-2.5 transform group-hover:-translate-y-1 transition-transform duration-300">
        <div className="inline-block text-[11px] font-medium text-cream-200/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/10">
          ✨ {item.highlight}
        </div>
        
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-white group-hover:text-gold-light transition-colors leading-tight drop-shadow-md">
          {item.title}
        </h3>
        
        <p className="text-xs text-cream-100/90 font-medium line-clamp-2 leading-relaxed drop-shadow-xs">
          {item.subtitle}
        </p>

        <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs font-bold text-white group-hover:text-gold transition-colors">
          <span>Explore Collection</span>
          <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-gold group-hover:text-cocoa flex items-center justify-center transition-all">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CinematicCravingSection: React.FC = () => {
  const cravingCollections: CravingCollectionItem[] = [
    {
      id: 'cakes',
      title: 'Celebration Cakes',
      subtitle: 'Belgian Truffles, Red Velvet, Pastries & Bento Cakes',
      href: '/cakes',
      image: '/images/cakes/belgian-truffle.webp',
      video: '/videos/categories/cakes-hero.mp4',
      badge: 'Bengaluru #1 Bestseller',
      highlight: '54% Dark Belgian Ganache',
      itemCount: '50+ Creations',
      accentColor: 'from-amber-950/90 via-amber-950/40 to-transparent',
      borderColor: 'group-hover:border-amber-500/40',
    },
    {
      id: 'desserts',
      title: 'Artisan Cheesecakes & Desserts',
      subtitle: 'Lotus Biscoff, Italian Tiramisu & Saffron Tres Leches',
      href: '/desserts',
      image: '/images/desserts/biscoff-cheesecake.webp',
      video: '/videos/categories/desserts-hero.mp4',
      badge: 'Haute Pâtisserie',
      highlight: '100% Philadelphia Cream',
      itemCount: '15+ Creations',
      accentColor: 'from-rose-950/90 via-rose-950/40 to-transparent',
      borderColor: 'group-hover:border-rose-500/40',
    },
    {
      id: 'pizzas',
      title: 'Stone-Baked Pizzas & Bakes',
      subtitle: '8" Thin Crusts, Korean Garlic Cream Buns & Savouries',
      href: '/pizzas',
      image: '/images/pizzas/farmhouse-pizza.webp',
      video: '/videos/categories/pizzas-hero.mp4',
      badge: 'Oven-Hot Bakes',
      highlight: 'Fresh Mozzarella & Herbs',
      itemCount: '25+ Creations',
      accentColor: 'from-orange-950/90 via-orange-950/40 to-transparent',
      borderColor: 'group-hover:border-orange-500/40',
    },
    {
      id: 'gelato',
      title: 'Artisanal Italian Gelato',
      subtitle: 'Sicilian Pistachio, Dark Chocolate & Alphonso Mango',
      href: '/gelato',
      image: '/images/gelato/gelato-assorted.webp',
      video: '/videos/categories/gelato-hero.mp4',
      badge: 'Slow Churned',
      highlight: 'Zero Artificial Flavours',
      itemCount: '10+ Flavours',
      accentColor: 'from-sky-950/90 via-sky-950/40 to-transparent',
      borderColor: 'group-hover:border-sky-500/40',
    },
    {
      id: 'treats',
      title: 'Little Treats & Cookies',
      subtitle: 'Gourmet Donuts, NYC Chunky Cookies & Rose Petal Chocolates',
      href: '/treats',
      image: '/images/treats/glazed-donut.webp',
      video: '/videos/categories/treats-hero.mp4',
      badge: 'Everyday Joy',
      highlight: 'Hand-dipped & Glazed',
      itemCount: '40+ Creations',
      accentColor: 'from-fuchsia-950/90 via-fuchsia-950/40 to-transparent',
      borderColor: 'group-hover:border-fuchsia-500/40',
    },
    {
      id: 'snacks',
      title: 'Crispy Snacks & Munchies',
      subtitle: 'Peri Peri Foxnuts, Masala Chakli & Sourdough Breads',
      href: '/snacks',
      image: '/images/snacks/peri-peri-makhana.webp',
      video: '/videos/categories/snacks-hero.mp4',
      badge: 'Crunch Reserve',
      highlight: 'Zero Palm Oil • Pure Ghee',
      itemCount: '30+ Creations',
      accentColor: 'from-emerald-950/90 via-emerald-950/40 to-transparent',
      borderColor: 'group-hover:border-emerald-500/40',
    },
  ];

  return (
    <section id="cravings" className="py-16 sm:py-24 bg-cream-100 relative overflow-hidden border-b border-cream-300">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gourmet Pure Veg & Eggless Atelier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight leading-tight">
              What Are You <span className="text-caramel italic">Craving Today?</span>
            </h2>
            <p className="text-sm sm:text-base text-cocoa/75 font-sans leading-relaxed">
              Explore our curated culinary collections—freshly prepared every morning at 5:00 AM with 100% Belgian chocolate, dairy cream, and pure ingredients.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-cocoa hover:text-caramel group bg-white/80 hover:bg-white px-5 py-3 rounded-2xl border border-cream-300 shadow-xs transition-all self-start md:self-auto"
          >
            <span>Explore All 190+ Items</span>
            <ArrowRight className="w-4 h-4 text-caramel group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Cinematic 6-Card Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cravingCollections.map((item, index) => (
            <CravingCard key={item.id} item={item} />
          ))}
        </div>

        {/* Pure Eggless Trust Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-cream-300/90 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 ring-4 ring-emerald-100 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-cocoa">
              100% Pure Vegetarian & Eggless Kitchen Pledge
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-cocoa/70 font-medium">
            <span className="hidden sm:inline">🌱 Zero Animal Gelatine</span>
            <span className="hidden md:inline">🍫 Real Belgian Chocolate</span>
            <span>⚡ Express Dispatch Across Bengaluru</span>
          </div>
        </div>
      </div>
    </section>
  );
};


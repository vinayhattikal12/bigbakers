import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CinematicHero } from '@/components/cinematic/CinematicHero';
import { CravingMoodSelector } from '@/components/ecommerce/CravingMoodSelector';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Truck,
  ShieldCheck,
  Award,
  Star,
} from 'lucide-react';

export default function HomePage() {
  const featured = products.filter((p) => p.featured);

  const cravingCards = [
    {
      title: 'Celebration Cakes',
      tagline: 'Belgian Truffles, Red Velvet, Pastries',
      href: '/cakes',
      image: '/images/cakes/belgian-truffle.webp',
      badge: 'Bestselling',
      accent: 'from-amber-900/80 via-amber-950/40 to-transparent',
    },
    {
      title: 'Artisan Desserts',
      tagline: 'Baked Cheesecakes, Tiramisu, Tres Leches',
      href: '/desserts',
      image: '/images/desserts/biscoff-cheesecake.webp',
      badge: 'Pure Luxury',
      accent: 'from-rose-950/80 via-rose-950/40 to-transparent',
    },
    {
      title: 'Little Treats',
      tagline: 'Gourmet Donuts, Cupcakes & NYC Cookies',
      href: '/treats',
      image: '/images/treats/glazed-donut.webp',
      badge: 'Everyday Joy',
      accent: 'from-orange-950/80 via-orange-950/40 to-transparent',
    },
    {
      title: 'Savory Snacks',
      tagline: 'Peri Peri Makhana, Mixtures & Sourdough',
      href: '/snacks',
      image: '/images/snacks/peri-peri-makhana.webp',
      badge: 'Crispy & Pure',
      accent: 'from-emerald-950/80 via-emerald-950/40 to-transparent',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. CINEMATIC HERO (SCENE 1 -> SCENE 2 -> SCENE 3 CANVAS SCRUBBING) */}
      <CinematicHero />

      {/* 2. INSTANT CRAVING MOOD SELECTOR (1-TAP INTENT MATCHER) */}
      <CravingMoodSelector />

      {/* 3. WHAT ARE YOU CRAVING? EDITORIAL COLLECTIONS */}
      <section id="craving-section" className="py-20 sm:py-28 bg-cream-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Handcrafted Fresh Daily in Bengaluru</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight">
                What Are You <span className="text-caramel italic">Craving?</span>
              </h2>
              <p className="text-sm sm:text-base text-cocoa/70 max-w-xl">
                From velvety Belgian chocolate truffles to slow-roasted spicy foxnuts, explore our handcrafted gourmet collections.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm font-bold text-caramel hover:text-caramel-dark group"
            >
              <span>Explore Full Menu (16+ Items)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Large Editorial Craving Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cravingCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative h-96 sm:h-[420px] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-cream-300 transition-all duration-500 flex flex-col justify-end p-6"
              >
                {/* Background Image with Zoom */}
                <div className="absolute inset-0 z-0 bg-cocoa">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${card.accent}`} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-2 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-gold bg-black/40 backdrop-blur-md px-3 py-0.5 rounded-full border border-gold/30">
                    {card.badge}
                  </span>
                  <h3 className="font-serif text-2xl font-black text-white group-hover:text-gold-light transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-cream-100/80 font-medium line-clamp-2">
                    {card.tagline}
                  </p>

                  <div className="pt-3 flex items-center gap-2 text-xs font-bold text-white group-hover:text-gold transition-colors">
                    <span>Shop Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS — "EVERYONE'S TALKING ABOUT THESE" */}
      <section className="py-20 bg-cream-50 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-caramel">
                Bengaluru Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight">
                Everyone&apos;s Talking About These
              </h2>
              <p className="text-xs sm:text-sm text-cocoa/60">
                Freshly baked every morning in Vijaynagar, delivered chilled right to your door.
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-xs font-bold text-cocoa hover:text-caramel"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Product Grid */}
          <ProductGrid products={featured} priorityCount={4} />
        </div>
      </section>

      {/* 4. EDITORIAL STORY BANNER — "THE PEOPLE BEHIND THE GOODNESS" */}
      <section className="py-24 bg-cocoa-deep text-cream-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-caramel/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-caramel/30">
                <Image
                  src="/images/hero/hero-craft.webp"
                  alt="Big Bakers Artisanal Kitchen"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-5 rounded-2xl bg-cocoa/90 backdrop-blur-md border border-caramel/40 shadow-xl max-w-xs space-y-1">
                <div className="flex items-center gap-1 text-gold font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>100% Real Dairy & Cocoa</span>
                </div>
                <p className="text-xs text-cream-200/70">
                  Zero compound chocolate, zero palm oil, zero compromise.
                </p>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold tracking-wider uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>Our Baking Heritage</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Crafted with Passion. <br />
                <span className="text-caramel italic">Baked for Memories.</span>
              </h2>

              <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
                At Big Bakers, we believe that cake is never just dessert—it is the centerpiece of your most cherished celebrations. Every truffle gateau, cheesecake slice, and brioche donut is created from scratch in our Vijaynagar kitchen using authentic European techniques and ethically sourced ingredients.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-cocoa/60 border border-cream-300/10 space-y-1">
                  <p className="font-serif text-2xl font-black text-gold">50,000+</p>
                  <p className="text-xs text-cream-200/70">Celebrations Sweetened</p>
                </div>
                <div className="p-4 rounded-2xl bg-cocoa/60 border border-cream-300/10 space-y-1">
                  <p className="font-serif text-2xl font-black text-gold">4.9 ★</p>
                  <p className="text-xs text-cream-200/70">Over 3,000 Verified Reviews</p>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/story">
                  <Button variant="gold" size="lg">
                    <span>Read Our Full Story</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED REVIEWS / COMMUNITY LOVE */}
      <section className="py-20 bg-cream-50 border-t border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-caramel bg-peach px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Sweet Moments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight">
              Loved by Bengaluru
            </h2>
            <p className="text-xs sm:text-sm text-cocoa/60">
              Real stories from our patrons across Bengaluru celebrating with Big Bakers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Pooja Venkatesh',
                location: 'Vijaynagar, Bengaluru',
                cake: 'Belgian Truffle Cake',
                rating: 5,
                comment:
                  'We ordered the Belgian Truffle for my mother’s 60th birthday. It was rich, glossy, and had the most heavenly dark chocolate depth. Everyone at the party was asking where we bought it from!',
              },
              {
                name: 'Rahul Mukherjee',
                location: 'Bengaluru',
                cake: 'Lotus Biscoff Baked Cheesecake',
                rating: 5,
                comment:
                  'The Lotus Biscoff Cheesecake is truly in a league of its own. Not too sweet, with an authentic New York dense bake and glorious caramelized speculoos topping. Arrived in 45 mins!',
              },
              {
                name: 'Deepa & Siddharth',
                location: 'Bengaluru',
                cake: 'Red Velvet Royale + Peri Peri Makhana',
                rating: 5,
                comment:
                  'Big Bakers is our go-to for weekend treats and office milestones. The packaging with custom greeting cards makes gifting effortless. Big congratulations to the pastry team!',
              },
            ].map((rev, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-3xl border border-cream-300 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-cocoa/80 italic leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-cocoa">{rev.name}</h4>
                    <p className="text-[11px] text-cocoa/50">{rev.location}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-caramel bg-cream-100 px-2.5 py-1 rounded-full">
                    {rev.cake}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

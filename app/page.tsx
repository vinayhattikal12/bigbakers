import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CinematicHero } from '@/components/cinematic/CinematicHero';
import { CinematicCravingSection } from '@/components/cinematic/CinematicCravingSection';
import { MasterReserveShowcase } from '@/components/cinematic/MasterReserveShowcase';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Award,
  Star,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. CINEMATIC HERO (CANVAS 3D / FLAVOUR SCRUBBING) */}
      <CinematicHero />

      {/* 2. WHAT ARE YOU CRAVING TODAY? (CINEMATIC 6-CATEGORY EDITORIAL SHOWCASE) */}
      <CinematicCravingSection />

      {/* 3. CHEF'S SIGNATURE MASTERPIECES SHOWCASE */}
      <MasterReserveShowcase />

      {/* 4. EDITORIAL STORY BANNER — "OUR BAKING HERITAGE" */}
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

              <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed font-sans">
                At Big Bakers, we believe that cake is never just dessert—it is the centerpiece of your most cherished celebrations. Every truffle gateau, cheesecake slice, and brioche donut is created from scratch in our Vijaynagar kitchen using authentic European techniques and ethically sourced ingredients.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-cocoa/60 border border-cream-300/10 space-y-1">
                  <p className="font-sans text-2xl sm:text-3xl font-black text-gold tracking-tight tabular-nums">50,000+</p>
                  <p className="text-xs text-cream-200/70">Celebrations Sweetened</p>
                </div>
                <div className="p-4 rounded-2xl bg-cocoa/60 border border-cream-300/10 space-y-1">
                  <p className="font-sans text-2xl sm:text-3xl font-black text-gold tracking-tight tabular-nums">4.9 ★</p>
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

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {
  Sparkles,
  Heart,
  Award,
  ShieldCheck,
  Flame,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Our Story & Master Bakers',
  description:
    'Discover the people, craftsmanship, and philosophy behind Big Bakers Bengaluru. Authentic European patisserie crafted with pure ingredients.',
};

export default function StoryPage() {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-cream-100">
      {/* Editorial Hero */}
      <section className="relative bg-cocoa-deep text-cream-100 py-20 sm:py-28 overflow-hidden mb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/story/story-hero.webp"
            alt="Big Bakers Artisanal Kitchen"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-cocoa-deep/80 to-cocoa-deep/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>The Big Bakers Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight">
            The People Behind <br />
            <span className="text-caramel italic">The Goodness.</span>
          </h1>

          <p className="text-base sm:text-xl text-cream-200/90 max-w-2xl mx-auto leading-relaxed">
            Founded with a simple conviction: life&apos;s brightest moments deserve pure, uncompromising taste.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Section 1: Our Beginning */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Our Beginning
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-cocoa tracking-tight">
              Born From a Passion for Authentic Baking
            </h2>
            <p className="text-sm text-cocoa/80 leading-relaxed">
              Big Bakers started in Bengaluru as an artisanal kitchen obsessed with one question: why should celebration cakes rely on artificial flavorings and compound chocolate when real dairy and pure cocoa create magic?
            </p>
            <p className="text-sm text-cocoa/80 leading-relaxed">
              What began as small bespoke batches for neighbors in Vijaynagar quickly grew through word-of-mouth. Today, we bake daily for thousands of celebratory tables across Bengaluru while preserving the exact small-batch craftsmanship of day one.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-cream-300">
              <Image
                src="/images/bakery/craft-hero.webp"
                alt="Bakers dusting cocoa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Four Core Pillars */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Our Commitments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-cocoa">
              The Big Bakers Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Award className="w-6 h-6 text-gold" />,
                title: '54% Belgian Chocolate',
                desc: 'We strictly use authentic single-origin cocoa butter and Belgian chocolate in all our truffle gateaux.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                title: '100% Pure Dairy Cream',
                desc: 'Zero palm oil, zero margarine, zero synthetic cake stabilizers. Only pure churned butter and dairy cream.',
              },
              {
                icon: <Flame className="w-6 h-6 text-caramel" />,
                title: 'Freshly Baked Everyday',
                desc: 'We bake multiple times throughout the day so your cake is hours fresh when it arrives at your doorstep.',
              },
              {
                icon: <Heart className="w-6 h-6 text-berry-rose" />,
                title: 'Handcrafted With Love',
                desc: 'Every rose, swirl, and ribbon is hand-piped and hand-tied by our trained pastry artisans.',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-6 bg-white rounded-3xl border border-cream-300 shadow-xs space-y-3"
              >
                <div className="p-3 bg-cream-100 rounded-2xl w-fit">{pillar.icon}</div>
                <h3 className="font-serif text-lg font-bold text-cocoa">{pillar.title}</h3>
                <p className="text-xs text-cocoa/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Call to Action */}
        <section className="bg-cocoa text-cream-50 rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-white">
            Ready to Taste the Difference?
          </h2>
          <p className="text-sm text-cream-200/80 max-w-xl mx-auto">
            Order your celebration cake online for express delivery or visit our flagship store in Vijaynagar, Bengaluru.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/menu">
              <Button variant="gold" size="lg">
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/stores">
              <Button variant="outline" size="lg" className="border-cream-300/40 text-white hover:bg-white/20">
                <span>Visit Vijaynagar Store</span>
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

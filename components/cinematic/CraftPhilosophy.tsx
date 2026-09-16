'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Flame, Clock, Truck, Award, Heart } from 'lucide-react';

export const CraftPhilosophy: React.FC = () => {
  const pillars = [
    {
      step: '01',
      title: '100% Pure Veg & Eggless Pledge',
      subtitle: 'Artisanal texture without gelatin or eggs',
      description: 'Every single gateau, pastry, mousse, and pizza in our bakehouse is crafted strictly 100% vegetarian. We achieve cloud-like sponges and mirror-gloss ganaches through scientific baking techniques.',
      icon: ShieldCheck,
      tag: 'Strict Vegetarian',
      accent: 'border-emerald-500/30 text-emerald-600 bg-emerald-50',
    },
    {
      step: '02',
      title: 'Real Single-Origin Belgian Cocoa',
      subtitle: 'Zero compound chocolate, zero palm oil',
      description: 'We exclusively temper 54% Callebaut Belgian dark chocolate and pure dairy cream. No hydrogenated vegetable fats or synthetic flavorings—just pure, unapologetic richness.',
      icon: Award,
      tag: 'Pure Callebaut',
      accent: 'border-amber-500/30 text-amber-700 bg-amber-50',
    },
    {
      step: '03',
      title: 'Dawn-Bake Oven Protocol',
      subtitle: 'First ovens fire at 5:00 AM daily in Vijaynagar',
      description: 'Nothing sits on shelves for days. Our sourdough proofs for 48 hours and our cakes are iced and piped the exact morning of your order for unmatched freshness and moisture.',
      icon: Clock,
      tag: 'Daily Fresh Batch',
      accent: 'border-rose-500/30 text-rose-700 bg-rose-50',
    },
    {
      step: '04',
      title: 'Express Care Across Bengaluru',
      subtitle: 'Delivered in pristine condition in 45-60 mins',
      description: 'Custom reinforced shock-resistant cake boxes and insulated temperature packs ensure your celebration centerpiece arrives looking as immaculate as when it left our chef’s bench.',
      icon: Truck,
      tag: 'Pristine Guarantee',
      accent: 'border-sky-500/30 text-sky-700 bg-sky-50',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-cream-50 relative overflow-hidden border-b border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/15 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Big Bakers Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight leading-tight">
            The Philosophy of <span className="text-caramel italic">Uncompromised Quality</span>
          </h2>
          <p className="text-sm sm:text-base text-cocoa/75 leading-relaxed">
            Why over 50,000 celebration tables across Bengaluru trust Big Bakers for their most precious milestones.
          </p>
        </div>

        {/* 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.step}
                className="group relative p-7 rounded-3xl bg-white border border-cream-300 shadow-xs hover:shadow-xl hover:border-caramel/40 transition-all duration-500 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Bar with Step & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-black text-caramel/40 group-hover:text-caramel transition-colors">
                      {pillar.step}
                    </span>
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${pillar.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-caramel block">
                      {pillar.tag}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-cocoa group-hover:text-caramel transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-cocoa/70 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cream-200 text-[11px] font-semibold text-cocoa/50 group-hover:text-cocoa transition-colors flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-caramel fill-current" />
                  <span>{pillar.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

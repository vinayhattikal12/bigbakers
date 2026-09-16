'use client';

import React from 'react';
import { Sparkles, Flame, Heart, Zap } from 'lucide-react';

interface SensoryMetric {
  label: string;
  value: number; // 0 to 100
  descriptor: string;
  icon: any;
  color: string;
}

interface SensoryProfileProps {
  category: string;
  subcategory?: string;
  rating?: number;
  dietary?: string;
}

export const SensoryProfile: React.FC<SensoryProfileProps> = ({
  category,
  subcategory,
  rating = 4.9,
  dietary = 'eggless',
}) => {
  // Generate authentic culinary sensory metrics tailored to category
  const getMetrics = (): SensoryMetric[] => {
    if (category === 'cakes') {
      return [
        { label: 'Cocoa & Ganache Richness', value: 92, descriptor: 'Decadent 54% Dark Ganache', icon: Flame, color: 'bg-amber-800' },
        { label: 'Sponge Moisture Factor', value: 96, descriptor: 'Slow-baked & Syrup Infused', icon: Sparkles, color: 'bg-caramel' },
        { label: 'Sweetness Balance', value: 68, descriptor: 'Refined Artisanal Harmony', icon: Heart, color: 'bg-rose-700' },
        { label: 'Melt-in-Mouth Texture', value: 95, descriptor: 'Silky Velvet Cream', icon: Zap, color: 'bg-amber-600' },
      ];
    }
    if (category === 'desserts') {
      return [
        { label: 'Silky Creaminess', value: 94, descriptor: 'Philadelphia & Mascarpone', icon: Sparkles, color: 'bg-caramel' },
        { label: 'Crust Crisp Quotient', value: 88, descriptor: 'Caramelized Biscoff / Graham', icon: Zap, color: 'bg-amber-700' },
        { label: 'Flavor Intensity', value: 90, descriptor: 'Espresso & Vanilla Bean', icon: Flame, color: 'bg-amber-900' },
        { label: 'Sweetness Balance', value: 65, descriptor: 'Balanced European Style', icon: Heart, color: 'bg-rose-700' },
      ];
    }
    if (category === 'snacks') {
      return [
        { label: 'Crunch Quotient', value: 98, descriptor: 'Slow-Roasted Crispiness', icon: Zap, color: 'bg-amber-700' },
        { label: 'Spice & Aroma Kick', value: 85, descriptor: "Birds Eye Chilli and Herbs", icon: Flame, color: 'bg-rose-600' },
        { label: 'Healthy Crunch Score', value: 95, descriptor: '100% Non-Fried Superfood', icon: Sparkles, color: 'bg-emerald-700' },
        { label: 'Freshness Index', value: 100, descriptor: 'Daily Nitrogen Sealed', icon: Heart, color: 'bg-caramel' },
      ];
    }
    return [
      { label: 'Butter Crispness', value: 92, descriptor: 'Golden French Butter', icon: Zap, color: 'bg-amber-600' },
      { label: 'Flavor Richness', value: 89, descriptor: 'Artisanal Batch Baked', icon: Flame, color: 'bg-caramel' },
      { label: 'Aromatic Finish', value: 94, descriptor: 'Bourbon Vanilla Bean', icon: Sparkles, color: 'bg-amber-800' },
      { label: 'Sweetness Harmony', value: 70, descriptor: 'Cane Sugar Crust', icon: Heart, color: 'bg-rose-700' },
    ];
  };

  const metrics = getMetrics();

  return (
    <div className="bg-cream-50/80 rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Sensory Flavor Blueprint
            </span>
            <span className="text-[11px] bg-gold/15 text-cocoa font-bold px-2 py-0.5 rounded-full border border-gold/30">
              Chef Calibrated
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-black text-cocoa mt-0.5">
            Taste & Texture Profile
          </h3>
        </div>
        <div className="text-xs text-cocoa/60 bg-white px-3 py-1.5 rounded-2xl border border-cream-300 shadow-xs self-start sm:self-auto">
          ⭐ Verified <strong>{rating}/5.0</strong> Culinary Rating
        </div>
      </div>

      {/* Metric Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="p-4 bg-white rounded-2xl border border-cream-200 shadow-xs hover:border-caramel/40 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cream-100 text-caramel">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-cocoa">{metric.label}</span>
                </div>
                <span className="font-mono text-xs font-black text-caramel">{metric.value}%</span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-cream-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`${metric.color} h-full rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>

              <p className="text-[11px] text-cocoa/60 font-medium italic">
                {metric.descriptor}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

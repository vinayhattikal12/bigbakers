'use client';

import React, { useState } from 'react';
import { Layers, Sparkles, ChevronRight, Eye } from 'lucide-react';

interface LayerInfo {
  layer: number;
  name: string;
  highlight: string;
  description: string;
  color: string;
}

interface LayerAnatomyProps {
  productSlug: string;
  category: string;
}

export const LayerAnatomy: React.FC<LayerAnatomyProps> = ({ productSlug, category }) => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  // Return layers based on product
  const getLayers = (): LayerInfo[] => {
    if (productSlug.includes('belgian-truffle')) {
      return [
        {
          layer: 1,
          name: 'Mirror Glaze & 24K Gold Flakes',
          highlight: 'High-Gloss Chocolate Finish',
          description: 'A glass-smooth tempered dark chocolate mirror glaze that yields effortlessly to the touch.',
          color: 'from-amber-900 to-yellow-900',
        },
        {
          layer: 2,
          name: '54% Belgian Dark Ganache',
          highlight: 'Silky Double-Churned Ganache',
          description: 'Ethically sourced Callebaut Belgian dark chocolate folded into fresh farm cream at 42°C.',
          color: 'from-stone-900 to-amber-950',
        },
        {
          layer: 3,
          name: 'Slow-Baked Cocoa Sponge',
          highlight: 'Moist Chiffon Crumb',
          description: 'Baked at low temperature with natural Madagascar vanilla syrup infusion for melt-in-mouth texture.',
          color: 'from-amber-950 to-stone-800',
        },
        {
          layer: 4,
          name: 'Hazelnut Feuilletine Crunch',
          highlight: 'Crispy Praline Base',
          description: 'Delicate caramelized French crepe flakes coated in roasted hazelnut praline.',
          color: 'from-amber-800 to-amber-700',
        },
      ];
    }
    if (productSlug.includes('red-velvet')) {
      return [
        {
          layer: 1,
          name: 'Velvety Red Cocoa Crumb Garnish',
          highlight: 'Signature Ruby Dusting',
          description: 'Air-light crimson sponge pearls providing visual contrast and delicate texture.',
          color: 'from-rose-800 to-red-950',
        },
        {
          layer: 2,
          name: 'Philadelphia Cream Cheese Frosting',
          highlight: 'Silky Tangy Cream',
          description: 'Pure Philadelphia cream cheese whipped with cultured butter and organic cane sugar.',
          color: 'from-amber-100 to-cream-200',
        },
        {
          layer: 3,
          name: 'Buttermilk Crimson Chiffon',
          highlight: 'Ultra-Tender Sponge',
          description: 'Cultured buttermilk and Dutch cocoa powder creating an exquisite crimson crumb.',
          color: 'from-red-900 to-rose-950',
        },
        {
          layer: 4,
          name: 'White Chocolate Biscuit Base',
          highlight: 'Subtle Cookie Crunch',
          description: 'Buttery shortbread base lightly bound with Belgian white chocolate.',
          color: 'from-amber-200 to-yellow-100',
        },
      ];
    }
    // Default 4-layer patisserie
    return [
      {
        layer: 1,
        name: 'Artisanal Top Finish & Garnish',
        highlight: 'Hand-Crafted Crown',
        description: 'Toasted pistachios, edible gold leaf, and tempered chocolate swirls.',
        color: 'from-amber-700 to-yellow-800',
      },
      {
        layer: 2,
        name: 'Velvety Mousse / Cream Filling',
        highlight: 'Rich Mousse Core',
        description: 'Light-as-air whipped mousse infused with real bourbon vanilla.',
        color: 'from-amber-900 to-stone-900',
      },
      {
        layer: 3,
        name: 'Slow-Baked Sponge Crumb',
        highlight: 'Moist Infused Sponge',
        description: 'Brushed with fruit essence and espresso reduction for deep aromatics.',
        color: 'from-stone-800 to-amber-950',
      },
      {
        layer: 4,
        name: 'Crispy Butter Praline Crust',
        highlight: 'Artisanal Base',
        description: 'Provides the essential satisfying crisp foundation in every single forkful.',
        color: 'from-amber-800 to-yellow-700',
      },
    ];
  };

  const layers = getLayers();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-caramel" />
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Interactive Layer Anatomy
            </span>
          </div>
          <h3 className="font-serif text-2xl font-black text-cocoa mt-1">
            Anatomy of the Creation
          </h3>
        </div>
        <span className="text-xs text-cocoa/60 bg-cream-100 px-3 py-1 rounded-full self-start sm:self-auto font-medium">
          Click layers to inspect culinary craft
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Layer Stack Interactive Visualizer */}
        <div className="lg:col-span-6 flex flex-col gap-2.5">
          {layers.map((layer, index) => {
            const isSelected = activeLayer === index;
            return (
              <button
                key={layer.name}
                onClick={() => setActiveLayer(index)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                  isSelected
                    ? 'border-caramel bg-cream-50 shadow-md scale-[1.02]'
                    : 'border-cream-300 bg-white hover:bg-cream-50/60 hover:border-cream-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-serif font-black text-xs transition-colors ${
                      isSelected ? 'bg-cocoa text-cream-50' : 'bg-cream-200 text-cocoa/70'
                    }`}
                  >
                    0{layer.layer}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-cocoa group-hover:text-caramel transition-colors">
                      {layer.name}
                    </h4>
                    <p className="text-[11px] text-cocoa/50 font-medium">{layer.highlight}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-caramel">
                  <Eye className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Highlighted Layer Deep Dive Card */}
        <div className="lg:col-span-6 p-6 sm:p-8 bg-gradient-to-br from-cream-100 via-cream-50 to-peach/30 rounded-3xl border border-cream-300 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/10 text-caramel text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Layer 0{layers[activeLayer].layer} Focus</span>
          </div>

          <h4 className="font-serif text-2xl font-black text-cocoa">
            {layers[activeLayer].name}
          </h4>

          <p className="text-xs font-semibold text-caramel uppercase tracking-wider">
            {layers[activeLayer].highlight}
          </p>

          <p className="text-sm text-cocoa/80 leading-relaxed">
            {layers[activeLayer].description}
          </p>

          <div className="pt-3 border-t border-cream-300/80 flex items-center justify-between text-xs text-cocoa/60 font-medium">
            <span>✨ Artisanal Hand-folded</span>
            <span>📍 Baked in Vijaynagar, Bengaluru</span>
          </div>
        </div>
      </div>
    </div>
  );
};

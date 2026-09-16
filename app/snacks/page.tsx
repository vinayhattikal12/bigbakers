'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { Flame, Sparkles, ShieldCheck } from 'lucide-react';

export default function SnacksPage() {
  return (
    <CategoryShowcasePage
      categoryId="snacks"
      categoryName="Snacks"
      categoryTagline="Slow-roasted Peri Peri Makhana, traditional Bengaluru masala chakli, Kodubele, and spiced peanuts."
      heroHeadline={
        <>
          Crunchy, Guilt-Free <br />
          <span className="text-lime-300 italic font-serif">& Irresistibly Spiced</span>
        </>
      }
      heroDescription="Healthy superfood foxnuts slow-roasted without frying in bold peri peri spices, alongside authentic Karnataka heritage mixtures, Kodubele, crispy nippat, and masala peanuts."
      heroImage="/images/snacks/peri-peri-makhana.webp"
      flagshipSlug="peri-peri-makhana-60gms"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#1C2618] via-[#0F170C] to-[#080E06]',
        ambientGlow: 'bg-lime-600/25',
        accentPillBg: 'bg-lime-500/25',
        accentTextColor: 'text-lime-200',
        accentBorder: 'border-lime-400/40',
        badgeText: 'Makhana & Traditional Snacks',
      }}
      craftPillars={[
        { icon: Flame, text: '100% Non-Fried Superfood' },
        { icon: Sparkles, text: 'Artisanal Spice Blends' },
        { icon: ShieldCheck, text: 'Zero Trans Fat / Guilt-Free' },
      ]}
      subcategories={['All', 'Makhana', 'Spiced Peanuts', 'Traditional Namkeens']}
    />
  );
}

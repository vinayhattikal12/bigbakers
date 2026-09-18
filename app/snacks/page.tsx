'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { 
  SnacksModernIcon, 
  SparkleModernIcon, 
  PureVegModernBadge 
} from '@/components/ui/ModernIcons';

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
      heroDescription="Slow-roasted non-fried Peri Peri Makhana, authentic Bengaluru masala chakli, and spiced peanuts."
      heroImage="/images/snacks/peri-peri-makhana.webp"
      heroVideo="/videos/categories/snacks-hero.mp4"
      flagshipSlug="peri-peri-makhana-60gms"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#1C2618] via-[#0F170C] to-[#080E06]',
        ambientGlow: 'bg-lime-600/25',
        accentPillBg: 'bg-lime-500/25',
        accentTextColor: 'text-lime-200',
        accentBorder: 'border-lime-400/40',
        badgeText: 'Roasted Snacks & Munchies',
      }}
      craftPillars={[
        { icon: SnacksModernIcon, text: 'Non-Fried Superfood Makhana' },
        { icon: SparkleModernIcon, text: 'Artisanal Bengaluru Spices' },
        { icon: PureVegModernBadge, text: 'Zero Trans Fat • 100% Pure Veg' },
      ]}
      subcategories={['All', 'Makhana', 'Traditional Namkeens', 'Spiced Peanuts', 'Chips & Crisps']}
    />
  );
}

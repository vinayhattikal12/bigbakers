'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { 
  DessertModernIcon, 
  SparkleModernIcon, 
  PureVegModernBadge 
} from '@/components/ui/ModernIcons';

export default function DessertsPage() {
  return (
    <CategoryShowcasePage
      categoryId="desserts"
      categoryName="Desserts"
      categoryTagline="European baked cheesecakes, Italian tiramisu, Rasmalai tres leches, and warm molten brownies."
      heroHeadline={
        <>
          One More Bite <br />
          <span className="text-rose-300 italic font-serif">Of Pure Indulgence</span>
        </>
      }
      heroDescription="New York style baked Lotus Biscoff cheesecakes, Italian tiramisu, and Kashmiri saffron tres leches."
      heroImage="/images/desserts/biscoff-cheesecake.webp"
      heroVideo="/videos/categories/desserts-hero.mp4"
      flagshipSlug="biscoff-cheesecake"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#2A0A10] via-[#1C060B] to-[#140407]',
        ambientGlow: 'bg-rose-600/25',
        accentPillBg: 'bg-rose-500/25',
        accentTextColor: 'text-rose-200',
        accentBorder: 'border-rose-400/40',
        badgeText: 'Artisan Desserts',
      }}
      craftPillars={[
        { icon: DessertModernIcon, text: 'Mascarpone & Cream Cheese' },
        { icon: SparkleModernIcon, text: 'Pure Biscoff & Saffron' },
        { icon: PureVegModernBadge, text: '100% Eggless & Pure Veg' },
      ]}
      subcategories={['All', 'Cheesecakes', 'Tiramisu', 'Tres Leches', 'Brownies', 'Berliners', 'Muffins']}
    />
  );
}

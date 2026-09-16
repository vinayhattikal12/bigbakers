'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { ShieldCheck, Sparkles, Heart, Award } from 'lucide-react';

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
      heroDescription="Baked New York style cheesecakes swirled with caramelized Lotus Biscoff, espresso-infused Savoiardi Italian Tiramisu, and Kashmiri saffron Rasmalai Tres Leches. Pure European luxury."
      heroImage="/images/desserts/biscoff-cheesecake.webp"
      flagshipSlug="biscoff-cheesecake"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#2A0A10] via-[#1C060B] to-[#140407]',
        ambientGlow: 'bg-rose-600/25',
        accentPillBg: 'bg-rose-500/25',
        accentTextColor: 'text-rose-200',
        accentBorder: 'border-rose-400/40',
        badgeText: 'European Patisserie & Desserts',
      }}
      craftPillars={[
        { icon: ShieldCheck, text: 'Authentic Mascarpone Cheese' },
        { icon: Sparkles, text: 'Pure Lotus Biscoff & Saffron' },
        { icon: Heart, text: 'Zero Gelatin • 100% Pure Veg' },
      ]}
      subcategories={['All', 'Cheesecakes', 'Tiramisu', 'Tres Leches', 'Brownies', 'Berliners', 'Muffins']}
    />
  );
}

'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { Croissant, Flame, ShieldCheck } from 'lucide-react';

export default function SavouriesPage() {
  return (
    <CategoryShowcasePage
      categoryId="savouries"
      categoryName="Savouries"
      categoryTagline="Golden buttery Cajun paneer puffs, signature Korean garlic buns, paninis, and artisan breads."
      heroHeadline={
        <>
          Flaky Puffs, Korean Buns <br />
          <span className="text-orange-400 italic font-serif">& Artisan Breads</span>
        </>
      }
      heroDescription="Baked fresh every morning in our Vijaynagar ovens: Golden flaky Cajun paneer puffs, savory cream cheese Korean buns, toasted paninis, soft milk loaves, and crispy rusks."
      heroImage="/images/savouries/korean-bun.webp"
      flagshipSlug="korean-bun"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#2A1808] via-[#180D04] to-[#100802]',
        ambientGlow: 'bg-orange-600/25',
        accentPillBg: 'bg-orange-500/25',
        accentTextColor: 'text-orange-300',
        accentBorder: 'border-orange-400/40',
        badgeText: 'Hot Savouries & Breads',
      }}
      craftPillars={[
        { icon: Flame, text: 'Fresh Morning Oven Batch' },
        { icon: Croissant, text: 'Flaky French Butter Layers' },
        { icon: ShieldCheck, text: '100% Pure Vegetarian' },
      ]}
      subcategories={['All', 'Puffs & Rolls', 'Buns & Calzones', 'Breads & Rusks', 'Hot Savouries']}
    />
  );
}

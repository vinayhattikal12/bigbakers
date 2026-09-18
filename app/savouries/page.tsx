'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { 
  SavouriesModernIcon, 
  SparkleModernIcon, 
  PureVegModernBadge 
} from '@/components/ui/ModernIcons';

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
      heroDescription="Golden flaky Cajun paneer puffs, cream cheese Korean buns, calzones, and fresh milk bread."
      heroImage="/images/savouries/korean-bun.webp"
      heroVideo="/videos/categories/savouries-hero.mp4"
      flagshipSlug="korean-bun"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#2A1808] via-[#180D04] to-[#100802]',
        ambientGlow: 'bg-orange-600/25',
        accentPillBg: 'bg-orange-500/25',
        accentTextColor: 'text-orange-300',
        accentBorder: 'border-orange-400/40',
        badgeText: 'Savouries & Breads',
      }}
      craftPillars={[
        { icon: SavouriesModernIcon, text: 'Baked Fresh Every Morning' },
        { icon: SparkleModernIcon, text: 'Flaky French Butter Layers' },
        { icon: PureVegModernBadge, text: '100% Pure Vegetarian' },
      ]}
      subcategories={['All', 'Puffs & Rolls', 'Buns & Calzones', 'Hot Savouries', 'Breads & Rusks', 'Beverages']}
    />
  );
}

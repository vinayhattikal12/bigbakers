'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { IceCream, ShieldCheck, Heart } from 'lucide-react';

export default function GelatoPage() {
  return (
    <CategoryShowcasePage
      categoryId="gelato"
      categoryName="Gelato"
      categoryTagline="Slow-churned Italian pure milk gelato in Belgian Chocolate, Alphonso Mango, and Lotus Biscoff."
      heroHeadline={
        <>
          Slow-Churned <br />
          <span className="text-emerald-300 italic font-serif">Italian Gelato</span>
        </>
      }
      heroDescription="Dense, intensely creamy 100% vegetarian Italian gelato crafted with pure whole milk and real pistachio."
      heroImage="/images/gelato/gelato-assorted.webp"
      heroVideo="/videos/categories/gelato-hero.mp4"
      flagshipSlug="belgian-chocolate-gelato"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#16281E] via-[#0B1812] to-[#06100B]',
        ambientGlow: 'bg-emerald-600/25',
        accentPillBg: 'bg-emerald-500/25',
        accentTextColor: 'text-emerald-200',
        accentBorder: 'border-emerald-400/40',
        badgeText: 'Italian Gelato',
      }}
      craftPillars={[
        { icon: IceCream, text: 'Slow-Churned Daily' },
        { icon: ShieldCheck, text: '100% Pure Milk & Dairy' },
        { icon: Heart, text: 'Zero Gelatin & Preservatives' },
      ]}
      subcategories={['All', 'Artisan Gelato']}
    />
  );
}

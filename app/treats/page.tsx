'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { Cookie, Sparkles, Smile } from 'lucide-react';

export default function TreatsPage() {
  return (
    <CategoryShowcasePage
      categoryId="treats"
      categoryName="Treats"
      categoryTagline="Rose Petal Cashew coated chocolates, artisan cookies, glazed donuts, and luxury gift hampers."
      heroHeadline={
        <>
          Little Treats. <br />
          <span className="text-pink-300 italic font-serif">Big Smiles.</span>
        </>
      }
      heroDescription="Rose petal chocolate-coated whole cashews, NYC chunky cookies, and glazed brioche donuts."
      heroImage="/images/treats/coated-chocolates.webp"
      heroVideo="/videos/categories/treats-hero.mp4"
      flagshipSlug="rose-petal-cashew-coated-chocolate"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#2E1B10] via-[#1C0E06] to-[#140A04]',
        ambientGlow: 'bg-amber-600/25',
        accentPillBg: 'bg-pink-500/25',
        accentTextColor: 'text-pink-200',
        accentBorder: 'border-pink-400/40',
        badgeText: 'Treats & Chocolates',
      }}
      craftPillars={[
        { icon: Cookie, text: 'Artisanal Hand-Dipped' },
        { icon: Sparkles, text: 'Pure Cocoa Butter' },
        { icon: Smile, text: 'Gifting & Celebrations' },
      ]}
      subcategories={['All', 'Coated Chocolates', 'Cookies', 'Cupcakes', 'Donuts', 'Tea Cakes', 'Candies & Mukhwas', 'Gift Hampers', 'Gift Boxes & Packaging']}
    />
  );
}

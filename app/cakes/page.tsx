'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { ShieldCheck, Sparkles, Clock, Flame, Award } from 'lucide-react';

export default function CakesPage() {
  return (
    <CategoryShowcasePage
      categoryId="cakes"
      categoryName="Cakes"
      categoryTagline="Handcrafted signature gateaux, Belgian chocolate truffles, trending Kunafa cakes, and Bento boxes."
      heroHeadline={
        <>
          Cakes For Every Chapter <br />
          <span className="text-caramel italic font-serif">Of Your Story</span>
        </>
      }
      heroDescription="From our legendary 54% dark Belgian Truffle Cake to trending Pista Kunafa and Red Velvet Royale. Baked 100% pure vegetarian & eggless with pure dairy cream and zero compound chocolate."
      heroImage="/images/cakes/belgian-truffle.webp"
      flagshipSlug="belgian-truffle-cake"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#1A0C06] via-[#2D160C] to-[#120804]',
        ambientGlow: 'bg-amber-600/25',
        accentPillBg: 'bg-caramel/25',
        accentTextColor: 'text-gold',
        accentBorder: 'border-gold/40',
        badgeText: 'Celebration & Pastry Cakes',
      }}
      craftPillars={[
        { icon: ShieldCheck, text: '100% Pure Dairy & Eggless' },
        { icon: Sparkles, text: '54% Callebaut Ganache' },
        { icon: Clock, text: 'Same-Day Bengaluru Delivery' },
      ]}
      subcategories={['All', 'Celebration Cakes', 'Pastry Slices', 'Bento Box Cakes']}
    />
  );
}

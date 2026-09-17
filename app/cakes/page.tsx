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
      heroDescription="Signature 54% Belgian dark truffles, trending Kunafa, bento boxes, and delicate pastry slices."
      heroImage="/images/cakes/belgian-truffle.webp"
      heroVideo="/videos/categories/cakes-hero.mp4"
      flagshipSlug="belgian-truffle-cake"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#1A0C06] via-[#2D160C] to-[#120804]',
        ambientGlow: 'bg-amber-600/25',
        accentPillBg: 'bg-caramel/25',
        accentTextColor: 'text-gold',
        accentBorder: 'border-gold/40',
        badgeText: 'Celebration Cakes',
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

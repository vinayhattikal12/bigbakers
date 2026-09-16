'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { Pizza, Flame, UtensilsCrossed } from 'lucide-react';

export default function PizzasPage() {
  return (
    <CategoryShowcasePage
      categoryId="pizzas"
      categoryName="Pizzas & Pastas"
      categoryTagline="Stone-baked 8-inch artisan pizzas loaded with mozzarella, and al dente chef's pastas."
      heroHeadline={
        <>
          Stone-Baked Pizzas <br />
          <span className="text-amber-400 italic font-serif">& Artisan Pastas</span>
        </>
      }
      heroDescription="Hand-stretched 8-inch crusts baked at high heat with signature Italian herb sauce and bubbling double cheese, alongside rich Arrabbiata, Alfredo, and Pesto fusilli & penne pastas."
      heroImage="/images/pizzas/farmhouse-pizza.webp"
      flagshipSlug="farmhouse-pizza"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#2B0F08] via-[#1A0804] to-[#110502]',
        ambientGlow: 'bg-amber-600/25',
        accentPillBg: 'bg-amber-500/25',
        accentTextColor: 'text-amber-300',
        accentBorder: 'border-amber-400/40',
        badgeText: 'Stone-Baked Pizzas & Pastas',
      }}
      craftPillars={[
        { icon: Flame, text: 'Stone-Baked Hot & Fresh' },
        { icon: Pizza, text: '100% Gourmet Mozzarella' },
        { icon: UtensilsCrossed, text: '100% Pure Vegetarian Kitchen' },
      ]}
      subcategories={['All', 'Stone-Baked Pizzas', 'Artisan Pastas']}
    />
  );
}

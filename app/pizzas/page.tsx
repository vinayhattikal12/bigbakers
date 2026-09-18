'use client';

import React from 'react';
import { CategoryShowcasePage } from '@/components/ecommerce/CategoryShowcasePage';
import { 
  PizzaModernIcon, 
  PureVegModernBadge, 
  ExpressDeliveryModernIcon 
} from '@/components/ui/ModernIcons';

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
      heroDescription="Gourmet 8-inch thin crusts loaded with double mozzarella, and al dente Italian pastas."
      heroImage="/images/pizzas/farmhouse-pizza.webp"
      heroVideo="/videos/categories/pizzas-hero.mp4"
      flagshipSlug="farmhouse-pizza"
      theme={{
        bgGradient: 'bg-gradient-to-br from-[#2B0F08] via-[#1A0804] to-[#110502]',
        ambientGlow: 'bg-amber-600/25',
        accentPillBg: 'bg-amber-500/25',
        accentTextColor: 'text-amber-300',
        accentBorder: 'border-amber-400/40',
        badgeText: 'Pizzas & Pastas',
      }}
      craftPillars={[
        { icon: PizzaModernIcon, text: 'Stone-Baked Fresh 8" Pizzas' },
        { icon: PureVegModernBadge, text: '100% Mozzarella & Pure Veg' },
        { icon: ExpressDeliveryModernIcon, text: 'Hot 45-Min Express Delivery' },
      ]}
      subcategories={['All', 'Stone-Baked Pizzas', 'Artisan Pastas']}
    />
  );
}

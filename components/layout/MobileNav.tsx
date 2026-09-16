'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowRight, Sparkles, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  const links = [
    { label: 'Full Menu (190+ Items)', href: '/menu', subtitle: 'Explore the complete authentic catalog' },
    { label: 'Celebration & Pastry Cakes', href: '/cakes', subtitle: 'Belgian Truffles, Pista Kunafa, Bento' },
    { label: 'Artisan Desserts', href: '/desserts', subtitle: 'Biscoff Cheesecakes, Tiramisu, Brownies' },
    { label: 'Pizzas & Pastas', href: '/pizzas', subtitle: 'Stone-baked 8" Pizzas & Chef Pastas' },
    { label: 'Hot Savouries & Breads', href: '/savouries', subtitle: 'Korean Buns, Puffs, Calzones, Milk Bread' },
    { label: 'Artisan Gelato', href: '/gelato', subtitle: 'Slow-churned Italian pure veg gelato' },
    { label: 'Treats & Chocolates', href: '/treats', subtitle: 'Rose Cashew Coated Chocolates, Cookies' },
    { label: 'Makhana & Snacks', href: '/snacks', subtitle: 'Peri Peri Makhana, Kodubele, Chakli' },
    { label: 'Our Story & Heritage', href: '/story', subtitle: 'Handmade with passion in Vijaynagar' },
    { label: 'Our Store', href: '/stores', subtitle: 'Visit our flagship in Vijaynagar, Bengaluru' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Slideout Panel */}
      <div className="relative w-full max-w-sm bg-cream-50 h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-cream-300 bg-white">
            <div className="flex flex-col">
              <span className="font-serif text-xl font-black text-cocoa">BIG BAKERS</span>
              <span className="text-[9px] tracking-[0.2em] font-semibold text-caramel uppercase">
                Bite into Happiness
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-cocoa/70 hover:text-cocoa hover:bg-cream-200 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-6 space-y-2 overflow-y-auto max-h-[calc(100vh-220px)]">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-caramel text-white shadow-sm'
                      : 'hover:bg-cream-200/80 text-cocoa'
                  }`}
                >
                  <div>
                    <p className={`font-serif text-base font-bold ${isActive ? 'text-white' : 'text-cocoa'}`}>
                      {link.label}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-white/80' : 'text-cocoa/60'}`}>
                      {link.subtitle}
                    </p>
                  </div>
                  <ArrowRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cocoa/40'}`} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-cream-300 bg-white space-y-4">
          <Link href="/menu" onClick={onClose} className="block w-full">
            <Button variant="primary" size="lg" className="w-full justify-center">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Order Fresh in Bengaluru</span>
            </Button>
          </Link>

          <div className="flex items-center justify-between text-xs text-cocoa/70 pt-2 border-t border-cream-200">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-caramel" />
              <span>Vijaynagar, Bengaluru</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-caramel" />
              <span>+91 80 2330 4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

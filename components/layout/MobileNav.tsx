'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MenuModernIcon,
  CakeModernIcon,
  DessertModernIcon,
  PizzaModernIcon,
  SavouriesModernIcon,
  GelatoModernIcon,
  TreatsModernIcon,
  SnacksModernIcon,
  HistoryModernIcon,
  StorePinModernIcon,
  CloseModernIcon,
  ArrowRightModernIcon,
  SparkleModernIcon,
  PhoneModernIcon
} from '@/components/ui/ModernIcons';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const links = [
    { label: 'Full Menu (190+ Items)', href: '/menu', subtitle: 'Explore the complete authentic catalog', icon: MenuModernIcon },
    { label: 'Celebration Cakes', href: '/cakes', subtitle: 'Belgian Truffles, Pista Kunafa, Bento', icon: CakeModernIcon },
    { label: 'Artisan Desserts', href: '/desserts', subtitle: 'Biscoff Cheesecakes, Tiramisu, Brownies', icon: DessertModernIcon },
    { label: 'Pizzas & Pastas', href: '/pizzas', subtitle: 'Stone-baked 8" Pizzas & Chef Pastas', icon: PizzaModernIcon },
    { label: 'Hot Savouries & Breads', href: '/savouries', subtitle: 'Korean Buns, Puffs, Calzones, Milk Bread', icon: SavouriesModernIcon },
    { label: 'Artisan Gelato', href: '/gelato', subtitle: 'Slow-churned Italian pure veg gelato', icon: GelatoModernIcon },
    { label: 'Treats & Chocolates', href: '/treats', subtitle: 'Rose Cashew Coated Chocolates, Cookies', icon: TreatsModernIcon },
    { label: 'Makhana & Snacks', href: '/snacks', subtitle: 'Peri Peri Makhana, Kodubele, Chakli', icon: SnacksModernIcon },
    { label: 'Our Story & Heritage', href: '/story', subtitle: 'Handmade with passion in Vijaynagar', icon: HistoryModernIcon },
    { label: 'Our Flagship Store', href: '/stores', subtitle: 'Visit our kitchen in Vijaynagar, Bengaluru', icon: StorePinModernIcon },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Slideout Panel */}
      <div className="relative w-full max-w-sm bg-cream-50 h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-cream-300 bg-white">
            <BrandLogo variant="dark" size="sm" />
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-cocoa/70 hover:text-cocoa hover:bg-cream-200 transition-all active:scale-90"
              aria-label="Close menu"
            >
              <CloseModernIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-210px)]">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const IconComp = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all group ${
                    isActive
                      ? 'bg-caramel text-white shadow-md'
                      : 'hover:bg-cream-200/80 text-cocoa'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? 'bg-white/20' : 'bg-cream-200/90 shadow-xs'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className={`font-serif text-sm font-bold truncate ${isActive ? 'text-white' : 'text-cocoa'}`}>
                        {link.label}
                      </p>
                      <p className={`text-[11px] truncate ${isActive ? 'text-white/80' : 'text-cocoa/60'}`}>
                        {link.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRightModernIcon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-cocoa/40'}`} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-cream-300 bg-white space-y-3">
          <Link href="/menu" onClick={onClose} className="block w-full">
            <Button variant="primary" size="md" className="w-full justify-center shadow-md">
              <SparkleModernIcon className="w-4 h-4 mr-2" />
              <span>Explore Full Menu</span>
            </Button>
          </Link>

          <div className="flex items-center justify-between text-xs text-cocoa/70 pt-2 border-t border-cream-200">
            <Link href="/stores" onClick={onClose} className="flex items-center gap-1.5 hover:text-caramel transition-colors">
              <StorePinModernIcon className="w-4 h-4" />
              <span className="font-medium text-[11px]">Vijaynagar, Bengaluru</span>
            </Link>
            <a href="tel:+918023304567" className="flex items-center gap-1.5 hover:text-caramel transition-colors">
              <PhoneModernIcon className="w-3.5 h-3.5" />
              <span className="font-medium text-[11px]">+91 80 2330 4567</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { SearchModal } from '@/components/ecommerce/SearchModal';
import { MobileNav } from './MobileNav';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils/cn';
import { BrandLogo } from '@/components/ui/BrandLogo';

import { 
  CakeModernIcon,
  DessertModernIcon,
  PizzaModernIcon,
  SavouriesModernIcon,
  GelatoModernIcon,
  TreatsModernIcon,
  SnacksModernIcon,
  SparkleModernIcon,
  BagModernIcon,
  SearchModernIcon,
  MenuModernIcon,
  ArrowRightModernIcon,
  ShieldModernBadge
} from '@/components/ui/ModernIcons';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const heroEl = document.getElementById('home-hero-section');
      if (heroEl) {
        // Full hero section completes when the bottom of hero reaches near top of viewport
        const rect = heroEl.getBoundingClientRect();
        const isPastHero = rect.bottom <= 80;
        setIsScrolledPastHero(isPastHero);
      } else {
        setIsScrolledPastHero(scrollY > 80);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsMenuDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsMenuDropdownOpen(false);
    }, 150);
  };

  const navLinks = [
    { label: 'Cakes', href: '/cakes' },
    { label: 'Desserts', href: '/desserts' },
    { label: 'Pizzas & Savouries', href: '/pizzas' },
    { label: 'Gelato & Treats', href: '/treats' },
    { label: 'Snacks', href: '/snacks' },
    { label: 'Our Story', href: '/story' },
    { label: 'Store', href: '/stores' },
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    cakes: <CakeModernIcon className="w-5 h-5" />,
    desserts: <DessertModernIcon className="w-5 h-5" />,
    pizzas: <PizzaModernIcon className="w-5 h-5" />,
    savouries: <SavouriesModernIcon className="w-5 h-5" />,
    gelato: <GelatoModernIcon className="w-5 h-5" />,
    treats: <TreatsModernIcon className="w-5 h-5" />,
    snacks: <SnacksModernIcon className="w-5 h-5" />,
  };

  const isDarkHeroHeader = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out',
          isHomePage && !isScrolledPastHero
            ? '-translate-y-full opacity-0 pointer-events-none'
            : 'translate-y-0 opacity-100 pointer-events-auto',
          isScrolled
            ? 'py-2.5 bg-cream-50/95 backdrop-blur-md shadow-md border-b border-cream-300/70'
            : isDarkHeroHeader
            ? 'py-3 bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'py-3.5 bg-cream-100/95 backdrop-blur-md border-b border-cream-200/80 shadow-xs'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ========================================================
              📱 MOBILE & TABLET NAVBAR (< 1024px) — RESPONSIVE 3-PART HEADER
              ======================================================== */}
          <div className="flex items-center justify-between gap-2 lg:hidden">
            {/* Left: Quick Actions Capsule (Menu + Search) */}
            <div className="flex items-center justify-start shrink-0">
              <div className={cn(
                'flex items-center rounded-2xl p-0.5 border transition-all',
                isDarkHeroHeader
                  ? 'bg-white/10 border-white/20 text-white backdrop-blur-md'
                  : 'bg-cream-200/80 border-cream-300 text-cocoa shadow-2xs'
              )}>
                <button
                  onClick={() => setIsMobileNavOpen(true)}
                  className="p-2 rounded-xl hover:bg-white/20 active:scale-95 transition-all text-caramel-dark"
                  aria-label="Open menu"
                >
                  <MenuModernIcon className="w-5 h-5" />
                </button>
                <div className={cn('w-[1px] h-4', isDarkHeroHeader ? 'bg-white/20' : 'bg-cream-300')} />
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-xl hover:bg-white/20 active:scale-95 transition-all text-caramel-dark"
                  aria-label="Search menu"
                >
                  <SearchModernIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center: Centered Brand Logo */}
            <div className="flex items-center justify-center">
              <BrandLogo
                variant="auto"
                isDarkHeader={isDarkHeroHeader}
                size="md"
              />
            </div>

            {/* Right: Cart Shopping Bag Button */}
            <div className="flex items-center justify-end">
              <button
                id="mobile-header-cart-icon"
                data-cart-target="true"
                onClick={openCart}
                className={cn(
                  'relative p-2.5 rounded-2xl transition-all duration-200 shadow-sm active:scale-90 border',
                  isDarkHeroHeader
                    ? 'bg-gradient-to-r from-caramel via-[#D96B1A] to-caramel-dark text-white border-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                    : 'bg-gradient-to-r from-caramel via-[#D96B1A] to-caramel-dark text-white border-caramel-dark/30 shadow-[0_2px_8px_rgba(200,90,23,0.25)] hover:brightness-105'
                )}
                aria-label="View shopping bag"
              >
                <BagModernIcon className="w-5 h-5 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#B91C1C] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ========================================================
              💻 DESKTOP NAVBAR (>= 1024px)
              ======================================================== */}
          <div className="hidden lg:flex items-center justify-between gap-6">
            {/* Brand Logo */}
            <BrandLogo
              variant="auto"
              isDarkHeader={isDarkHeroHeader}
              size="lg"
            />

            {/* Desktop Nav Links */}
            <nav className="flex items-center gap-1 xl:gap-2">
              {/* Menu with Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/menu"
                  className={cn(
                    'flex items-center gap-1 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all whitespace-nowrap',
                    pathname === '/menu'
                      ? isDarkHeroHeader
                        ? 'bg-white/20 text-gold font-bold'
                        : 'bg-caramel/15 text-caramel font-bold'
                      : isDarkHeroHeader
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-cocoa/85 hover:text-cocoa hover:bg-cream-200/60'
                  )}
                >
                  <span>Full Menu</span>
                  <ChevronDown className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200 opacity-70',
                    isMenuDropdownOpen && 'rotate-180 text-caramel'
                  )} />
                </Link>

                {/* Mega Menu Dropdown */}
                {isMenuDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-3 w-[580px] bg-white rounded-2xl shadow-[0_25px_60px_rgba(40,20,10,0.22)] border border-cream-300 p-5 text-cocoa animate-in fade-in-0 zoom-in-95 duration-200 z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-cream-200">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm tracking-wide text-cocoa">
                          Explore Big Bakers
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-caramel/15 text-caramel text-[10px] font-bold tracking-wide uppercase">
                          190+ Pure Veg Items
                        </span>
                      </div>
                      <Link
                        href="/menu"
                        onClick={() => setIsMenuDropdownOpen(false)}
                        className="text-xs font-bold text-caramel hover:text-caramel-dark flex items-center gap-1 transition-colors group"
                      >
                        <span>Browse All</span>
                        <ArrowRightModernIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/${cat.slug}`}
                          onClick={() => setIsMenuDropdownOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-cream-100/90 border border-transparent hover:border-cream-300 transition-all group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-cream-200/80 group-hover:bg-caramel/20 flex items-center justify-center transition-colors shrink-0">
                            {categoryIcons[cat.id] || <SparkleModernIcon className="w-4 h-4 text-caramel" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-cocoa group-hover:text-caramel transition-colors truncate">
                              {cat.title}
                            </p>
                            <p className="text-[11px] text-cocoa/60 truncate leading-tight">
                              {cat.tagline}
                            </p>
                          </div>
                        </Link>
                      ))}

                      <Link
                        href="/menu"
                        onClick={() => setIsMenuDropdownOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r from-caramel/10 via-cream-100 to-caramel/15 border border-caramel/30 hover:border-caramel hover:bg-caramel/20 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-caramel text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <SparkleModernIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-caramel-dark truncate">
                            Full 190+ Menu Catalog
                          </p>
                          <p className="text-[11px] text-cocoa/70 truncate leading-tight font-medium">
                            All cakes, treats, bakes & combos →
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="mt-4 pt-3 border-t border-cream-200 flex items-center justify-between text-[11px] text-cocoa/70 font-medium bg-cream-50 -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl">
                      <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                        <ShieldModernBadge className="w-3.5 h-3.5" />
                        <span>100% Pure Vegetarian & Eggless</span>
                      </span>
                      <span className="text-cocoa/60">Vijaynagar, Bengaluru</span>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-[13px] font-medium transition-all whitespace-nowrap',
                      isActive
                        ? isDarkHeroHeader
                          ? 'bg-white/20 text-gold font-bold'
                          : 'bg-caramel/15 text-caramel font-bold'
                        : isDarkHeroHeader
                        ? 'text-white/90 hover:text-white hover:bg-white/10'
                        : 'text-cocoa/85 hover:text-cocoa hover:bg-cream-200/60'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap group',
                  isDarkHeroHeader
                    ? 'bg-white/15 hover:bg-white/25 text-white border-white/25 backdrop-blur-md'
                    : 'bg-cream-200/80 hover:bg-cream-300/90 text-cocoa border-cream-300 shadow-2xs'
                )}
              >
                <SearchModernIcon className={cn('w-4 h-4 transition-transform group-hover:scale-110', isDarkHeroHeader ? 'text-gold' : 'text-caramel')} />
                <span className="font-semibold text-cocoa/80">Search cravings...</span>
                <kbd
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded font-mono font-bold',
                    isDarkHeroHeader ? 'bg-white/20 text-white' : 'bg-white text-caramel-dark border border-cream-300/80 shadow-2xs'
                  )}
                >
                  ⌘K
                </kbd>
              </button>

              <button
                id="header-cart-icon"
                data-cart-target="true"
                onClick={openCart}
                className={cn(
                  'relative p-2.5 rounded-full transition-all duration-200 shadow-sm group active:scale-95 shrink-0 border',
                  isDarkHeroHeader
                    ? 'bg-gradient-to-r from-caramel via-[#D96B1A] to-caramel-dark text-white border-gold/40 shadow-[0_0_14px_rgba(212,175,55,0.3)] hover:brightness-110 hover:scale-105'
                    : 'bg-gradient-to-r from-caramel via-[#D96B1A] to-caramel-dark text-white border-caramel-dark/30 shadow-[0_2px_10px_rgba(200,90,23,0.3)] hover:brightness-105 hover:scale-105'
                )}
                aria-label="View shopping bag"
              >
                <BagModernIcon className="w-5 h-5 text-white transition-transform duration-200 group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#B91C1C] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-in zoom-in-50 duration-200">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
};

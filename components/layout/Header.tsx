'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Search, 
  Menu as MenuIcon, 
  Sparkles, 
  ChevronDown, 
  Cake, 
  IceCream, 
  Cookie, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Pizza,
  Croissant
} from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { SearchModal } from '@/components/ecommerce/SearchModal';
import { MobileNav } from './MobileNav';
import { categories } from '@/data/categories';
import { cn } from '@/lib/utils/cn';
import { BrandLogo } from '@/components/ui/BrandLogo';

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
      setIsScrolledPastHero(scrollY > 80);
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
    cakes: <Cake className="w-4 h-4 text-caramel" />,
    desserts: <Sparkles className="w-4 h-4 text-berry-rose" />,
    pizzas: <Pizza className="w-4 h-4 text-amber-500" />,
    savouries: <Croissant className="w-4 h-4 text-orange-400" />,
    gelato: <IceCream className="w-4 h-4 text-pink-400" />,
    treats: <Cookie className="w-4 h-4 text-caramel" />,
    snacks: <Flame className="w-4 h-4 text-emerald-400" />,
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
              📱 MOBILE & TABLET NAVBAR (< 1024px) — STRUCTURED 3-COLUMN
              ======================================================== */}
          <div className="grid grid-cols-3 items-center lg:hidden">
            {/* Left: Quick Actions Capsule (Menu + Search) */}
            <div className="flex items-center justify-start gap-1">
              <div className={cn(
                'flex items-center rounded-2xl p-0.5 border transition-all',
                isDarkHeroHeader
                  ? 'bg-white/10 border-white/20 text-white backdrop-blur-md'
                  : 'bg-cream-200/70 border-cream-300 text-cocoa'
              )}>
                <button
                  onClick={() => setIsMobileNavOpen(true)}
                  className="p-2 rounded-xl hover:bg-white/20 active:scale-95 transition-all"
                  aria-label="Open menu"
                >
                  <MenuIcon className="w-5 h-5" />
                </button>
                <div className={cn('w-[1px] h-4', isDarkHeroHeader ? 'bg-white/20' : 'bg-cream-300')} />
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-xl hover:bg-white/20 active:scale-95 transition-all"
                  aria-label="Search menu"
                >
                  <Search className="w-4 h-4" />
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
                  'relative p-2.5 rounded-2xl transition-all shadow-sm active:scale-90 border',
                  isDarkHeroHeader
                    ? 'bg-white/15 hover:bg-white/25 text-white border-white/20 backdrop-blur-md'
                    : 'bg-cocoa text-cream-50 border-cocoa hover:bg-caramel'
                )}
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-berry-rose text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
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
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
                            {categoryIcons[cat.id] || <Sparkles className="w-4 h-4 text-caramel" />}
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
                          <Sparkles className="w-4 h-4" />
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
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
                  'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap',
                  isDarkHeroHeader
                    ? 'bg-white/15 hover:bg-white/25 text-white border-white/25 backdrop-blur-md'
                    : 'bg-cream-200/70 hover:bg-cream-300/80 text-cocoa border-cream-300/80'
                )}
              >
                <Search className={cn('w-3.5 h-3.5', isDarkHeroHeader ? 'text-white/80' : 'text-cocoa/60')} />
                <span>Search cravings...</span>
                <kbd
                  className={cn(
                    'text-[10px] px-1.5 py-0.5 rounded font-mono',
                    isDarkHeroHeader ? 'bg-white/20 text-white' : 'bg-white text-cocoa/50 shadow-xs'
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
                  'relative p-2.5 rounded-full transition-all shadow-sm group active:scale-95 shrink-0',
                  isDarkHeroHeader
                    ? 'bg-white/20 text-white hover:bg-caramel backdrop-blur-md border border-white/25'
                    : 'bg-cocoa text-cream-50 hover:bg-caramel hover:text-white'
                )}
                aria-label="View shopping bag"
              >
                <ShoppingBag className="w-4.5 h-4.5 transition-transform group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-berry-rose text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
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

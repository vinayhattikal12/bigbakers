'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { SearchModal } from '@/components/ecommerce/SearchModal';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils/cn';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Cakes', href: '/cakes' },
    { label: 'Desserts', href: '/desserts' },
    { label: 'Treats', href: '/treats' },
    { label: 'Snacks', href: '/snacks' },
    { label: 'Our Story', href: '/story' },
    { label: 'Stores', href: '/stores' },
  ];

  // If on homepage and not scrolled: sleek transparent dark mode with white text
  // When scrolled or on other pages: warm cream frosted glass
  const isDarkHeroHeader = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out',
          isScrolled
            ? 'py-3 bg-cream-50/90 backdrop-blur-md shadow-sm border-b border-cream-300/60'
            : isDarkHeroHeader
            ? 'py-4 bg-gradient-to-b from-black/85 via-black/40 to-transparent'
            : 'py-5 bg-gradient-to-b from-cream-100/90 via-cream-100/50 to-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className={cn(
                'p-2 rounded-full transition-colors',
                isDarkHeroHeader ? 'text-white hover:bg-white/20' : 'text-cocoa hover:bg-cream-200/60'
              )}
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                'p-2 rounded-full transition-colors',
                isDarkHeroHeader ? 'text-white hover:bg-white/20' : 'text-cocoa hover:bg-cream-200/60'
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-center group">
            <span
              className={cn(
                'font-serif text-2xl sm:text-3xl font-black tracking-tight transition-colors drop-shadow-sm',
                isDarkHeroHeader ? 'text-white group-hover:text-caramel' : 'text-cocoa group-hover:text-caramel'
              )}
            >
              BIG BAKERS
            </span>
            <span
              className={cn(
                'text-[9px] sm:text-[10px] tracking-[0.25em] font-semibold uppercase -mt-0.5 group-hover:tracking-[0.3em] transition-all',
                isDarkHeroHeader ? 'text-gold' : 'text-caramel'
              )}
            >
              Bite into Happiness
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors relative py-1 hover:text-caramel drop-shadow-xs',
                    isDarkHeroHeader
                      ? isActive
                        ? 'text-gold font-bold'
                        : 'text-white/90 hover:text-gold'
                      : isActive
                      ? 'text-caramel font-semibold'
                      : 'text-cocoa/85'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={cn(
                        'absolute bottom-0 left-0 right-0 h-0.5 rounded-full animate-in fade-in duration-300',
                        isDarkHeroHeader ? 'bg-gold' : 'bg-caramel'
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Search, Order Fresh, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                'hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all',
                isDarkHeroHeader
                  ? 'bg-white/15 hover:bg-white/25 text-white border-white/25 backdrop-blur-md'
                  : 'bg-cream-200/70 hover:bg-cream-300/80 text-cocoa border-cream-300/80'
              )}
            >
              <Search className={cn('w-3.5 h-3.5', isDarkHeroHeader ? 'text-white/70' : 'text-cocoa/60')} />
              <span>Search cravings...</span>
              <kbd
                className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded shadow-xs',
                  isDarkHeroHeader ? 'bg-white/20 text-white' : 'bg-white text-cocoa/50'
                )}
              >
                ⌘K
              </kbd>
            </button>

            <Link
              href="/menu"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-caramel text-white text-xs font-semibold hover:bg-caramel-dark shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Fresh</span>
            </Link>

            {/* Shopping Bag with ID for 3D Fly-to-Cart Destination Anchor */}
            <button
              id="header-cart-icon"
              data-cart-target="true"
              onClick={openCart}
              className={cn(
                'relative p-2.5 rounded-full transition-all shadow-md group active:scale-95',
                isDarkHeroHeader
                  ? 'bg-white/20 text-white hover:bg-caramel backdrop-blur-md border border-white/25'
                  : 'bg-cocoa text-cream-50 hover:bg-caramel hover:text-white'
              )}
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-berry-rose text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-all scale-100">
                  {totalItems}
                </span>
              )}
            </button>
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

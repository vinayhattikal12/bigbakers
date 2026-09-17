'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, UtensilsCrossed, Cake, Croissant, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { cn } from '@/lib/utils/cn';

export const MobileBottomBar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const [isScrolledPastHero, setIsScrolledPastHero] = React.useState(false);

  const isHomePage = pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > 180);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Menu',
      href: '/menu',
      icon: UtensilsCrossed,
      isActive: pathname === '/menu',
    },
    {
      label: 'Cakes',
      href: '/cakes',
      icon: Cake,
      isActive: pathname === '/cakes',
    },
    {
      label: 'Savouries',
      href: '/savouries',
      icon: Croissant,
      isActive: pathname === '/savouries' || pathname === '/pizzas',
    },
  ];

  const isCartActive = pathname === '/cart' || pathname === '/checkout';

  return (
    <nav
      className={cn(
        'lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-cream-300/80 shadow-[0_-8px_25px_rgba(40,20,10,0.08)] py-1.5 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.4rem)] transition-all duration-300 ease-out',
        isHomePage && !isScrolledPastHero
          ? 'translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 pointer-events-auto'
      )}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 min-w-[56px]',
                item.isActive
                  ? 'text-caramel font-bold'
                  : 'text-cocoa/60 hover:text-cocoa font-medium'
              )}
            >
              <div
                className={cn(
                  'p-1.5 rounded-xl transition-all',
                  item.isActive ? 'bg-caramel/15 text-caramel scale-105' : 'text-cocoa/70'
                )}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Shopping Bag Tab Button */}
        <button
          onClick={openCart}
          className={cn(
            'flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 active:scale-95 min-w-[56px]',
            isCartActive
              ? 'text-caramel font-bold'
              : 'text-cocoa/60 hover:text-cocoa font-medium'
          )}
          aria-label="Open Shopping Bag"
        >
          <div className="relative p-1.5 rounded-xl text-cocoa/70">
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-berry-rose text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Bag</span>
        </button>
      </div>
    </nav>
  );
};

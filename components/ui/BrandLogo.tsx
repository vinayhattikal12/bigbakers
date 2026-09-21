import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'badge' | 'auto';
  isDarkHeader?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'auto',
  isDarkHeader = false,
  className = '',
  size = 'md',
  priority = true,
  showTagline = true,
}) => {
  const isDark = variant === 'light' || (variant === 'auto' && isDarkHeader);

  // Sizing definitions for circular badge & typography
  const sizeConfig = {
    sm: {
      badgePx: 32,
      badgeClass: 'w-7 h-7 sm:w-8 sm:h-8',
      titleClass: 'text-[15px] sm:text-base tracking-tight',
      taglineClass: 'text-[7px] sm:text-[7.5px] tracking-[0.22em] mt-0.5',
      gapClass: 'gap-2',
    },
    md: {
      badgePx: 44,
      badgeClass: 'w-9 h-9 sm:w-10 sm:h-10',
      titleClass: 'text-lg sm:text-xl tracking-tight',
      taglineClass: 'text-[8px] sm:text-[8.5px] tracking-[0.24em] mt-0.5',
      gapClass: 'gap-2.5',
    },
    lg: {
      badgePx: 56,
      badgeClass: 'w-11 h-11 sm:w-12 sm:h-12',
      titleClass: 'text-xl sm:text-2xl tracking-tight',
      taglineClass: 'text-[9px] sm:text-[9.5px] tracking-[0.24em] mt-0.5',
      gapClass: 'gap-3',
    },
    xl: {
      badgePx: 72,
      badgeClass: 'w-14 h-14 sm:w-16 sm:h-16',
      titleClass: 'text-2xl sm:text-3xl tracking-tight',
      taglineClass: 'text-[10.5px] sm:text-[11.5px] tracking-[0.26em] mt-1',
      gapClass: 'gap-3.5',
    },
  };

  const config = sizeConfig[size] || sizeConfig.md;

  if (variant === 'badge') {
    return (
      <Link
        href="/"
        className={cn('inline-flex items-center group active:scale-95 transition-transform duration-200', className)}
        aria-label="Big Bakers Home"
      >
        <div
          className={cn(
            'relative shrink-0 rounded-full overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105',
            config.badgeClass,
            isDark
              ? 'ring-2 ring-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
              : 'ring-1.5 ring-caramel/40 shadow-sm'
          )}
        >
          <Image
            src="/images/brand/logo-badge.png"
            alt="Big Bakers"
            width={config.badgePx}
            height={config.badgePx}
            priority={priority}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center group active:scale-95 transition-all duration-200 select-none',
        config.gapClass,
        className
      )}
      aria-label="Big Bakers - Bite Into Happiness"
    >
      {/* 1. Circular Emblem Badge */}
      <div
        className={cn(
          'relative shrink-0 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:rotate-2',
          config.badgeClass,
          isDark
            ? 'ring-2 ring-gold/60 shadow-[0_0_14px_rgba(212,175,55,0.35)]'
            : 'ring-1.5 ring-caramel/40 shadow-sm'
        )}
      >
        <Image
          src="/images/brand/logo-badge.png"
          alt="Big Bakers Emblem"
          width={config.badgePx}
          height={config.badgePx}
          priority={priority}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Brand Title & Tagline */}
      <div className="flex flex-col justify-center leading-none text-left">
        <span
          className={cn(
            'font-serif font-black transition-colors duration-200',
            config.titleClass,
            isDark
              ? 'text-white group-hover:text-gold'
              : 'text-[#2D1B16] group-hover:text-caramel'
          )}
        >
          Big Bakers
        </span>
        {showTagline && (
          <span
            className={cn(
              'font-sans font-bold uppercase transition-colors duration-200',
              config.taglineClass,
              isDark
                ? 'text-gold group-hover:text-gold-light'
                : 'text-caramel group-hover:text-caramel-dark'
            )}
          >
            Bite into Happiness
          </span>
        )}
      </div>
    </Link>
  );
};

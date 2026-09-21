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
      taglineClass: 'text-[7px] sm:text-[7.5px] tracking-[0.2em] mt-0.5',
      gapClass: 'gap-2',
    },
    md: {
      badgePx: 40,
      badgeClass: 'w-9 h-9 sm:w-10 sm:h-10',
      titleClass: 'text-lg sm:text-[19px] tracking-tight',
      taglineClass: 'text-[7.5px] sm:text-[8px] tracking-[0.22em] mt-0.5',
      gapClass: 'gap-2.5',
    },
    lg: {
      badgePx: 46,
      badgeClass: 'w-10 h-10 sm:w-11 sm:h-11',
      titleClass: 'text-xl sm:text-[22px] tracking-tight',
      taglineClass: 'text-[8.5px] sm:text-[9px] tracking-[0.22em] mt-0.5',
      gapClass: 'gap-3',
    },
    xl: {
      badgePx: 60,
      badgeClass: 'w-13 h-13 sm:w-14 sm:h-14',
      titleClass: 'text-2xl sm:text-3xl tracking-tight',
      taglineClass: 'text-[10px] sm:text-[11px] tracking-[0.24em] mt-1',
      gapClass: 'gap-3.5',
    },
  };

  const config = sizeConfig[size] || sizeConfig.md;

  if (variant === 'badge') {
    return (
      <Link
        href="/"
        className={cn('inline-flex items-center shrink-0 group active:scale-95 transition-transform duration-200', className)}
        aria-label="Big Bakers Home"
      >
        <div
          className={cn(
            'relative shrink-0 rounded-full overflow-hidden shadow-sm transition-transform duration-300 group-hover:scale-105',
            config.badgeClass,
            isDark
              ? 'ring-1.5 ring-gold/50 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
              : 'ring-1 ring-caramel/40 shadow-xs'
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
        'inline-flex items-center shrink-0 group active:scale-95 transition-all duration-200 select-none whitespace-nowrap',
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
            ? 'ring-1.5 ring-gold/60 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
            : 'ring-1 ring-caramel/40 shadow-xs'
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

      {/* 2. Brand Title & Tagline (Single Horizontal Line Lockup) */}
      <div className="flex flex-col justify-center leading-none text-left shrink-0 whitespace-nowrap">
        <span
          className={cn(
            'font-serif font-black transition-colors duration-200 whitespace-nowrap inline-block',
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
              'font-sans font-bold uppercase transition-colors duration-200 whitespace-nowrap inline-block',
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

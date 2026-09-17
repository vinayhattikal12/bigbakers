import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'badge' | 'auto';
  isDarkHeader?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'auto',
  isDarkHeader = false,
  className = '',
  size = 'md',
  priority = true,
}) => {
  let src = '/images/brand/logo-badge.png';
  if (variant === 'light' || (variant === 'auto' && isDarkHeader)) {
    src = '/images/brand/logo-transparent-light.png';
  } else if (variant === 'dark' || (variant === 'auto' && !isDarkHeader)) {
    src = '/images/brand/logo-transparent-dark.png';
  } else if (variant === 'badge') {
    src = '/images/brand/logo-badge.png';
  }

  const heights = {
    sm: '32px',
    md: '40px',
    lg: '52px',
  };

  return (
    <Link href="/" className={`inline-flex items-center group transition-transform duration-200 active:scale-95 ${className}`}>
      <div className="relative flex items-center justify-center">
        <Image
          src={src}
          alt="Big Bakers - Bite Into Happiness"
          width={180}
          height={70}
          priority={priority}
          className="object-contain transition-opacity duration-300 group-hover:opacity-90"
          style={{ width: 'auto', height: heights[size] }}
        />
      </div>
    </Link>
  );
};

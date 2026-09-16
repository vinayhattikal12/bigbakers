import React from 'react';
import { formatPrice } from '@/lib/utils/formatters';

interface PriceProps {
  amount: number;
  originalAmount?: number;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  color?: string;
  showOriginal?: boolean;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  originalAmount,
  size = 'base',
  className = '',
  color = 'text-cocoa',
  showOriginal = true,
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl',
  };

  return (
    <span className={`inline-flex items-baseline gap-1.5 font-sans font-black tracking-tight tabular-nums ${color} ${className}`}>
      <span className={sizeClasses[size]}>{formatPrice(amount)}</span>
      {showOriginal && originalAmount && originalAmount > amount && (
        <span className="text-xs sm:text-sm font-normal text-cocoa/40 line-through tabular-nums">
          {formatPrice(originalAmount)}
        </span>
      )}
    </span>
  );
};

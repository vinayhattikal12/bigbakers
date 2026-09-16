import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'veg' | 'non-veg' | 'bestseller' | 'fresh' | 'discount' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className }) => {
  const variants = {
    veg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    'non-veg': 'bg-amber-50 text-amber-900 border-amber-300',
    bestseller: 'bg-gold/20 text-cocoa-deep border-gold/40 font-semibold',
    fresh: 'bg-peach text-cocoa border-caramel/30',
    discount: 'bg-berry-pink text-berry-crimson border-berry-rose/30 font-semibold',
    neutral: 'bg-cream-200 text-cocoa/80 border-cream-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide',
        variants[variant],
        className
      )}
    >
      {variant === 'veg' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />}
      {children}
    </span>
  );
};

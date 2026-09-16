import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary: 'bg-cocoa text-cream-50 hover:bg-caramel hover:text-white shadow-md hover:shadow-lg',
      secondary: 'bg-caramel text-white hover:bg-caramel-dark shadow-sm hover:shadow-md',
      outline: 'border border-cocoa/30 text-cocoa hover:border-cocoa hover:bg-cocoa/5',
      ghost: 'text-cocoa hover:bg-cream-200/70',
      gold: 'bg-gold text-cocoa-deep font-semibold hover:bg-gold-light shadow-md hover:shadow-gold/30',
      dark: 'bg-cocoa-deep text-cream-100 hover:bg-black',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2 gap-1.5',
      md: 'text-sm px-6 py-3 gap-2',
      lg: 'text-base px-8 py-4 gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

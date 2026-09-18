import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
  animate?: boolean;
}

// 🎂 1. MODERN ANIMATED CAKE ICON
export const CakeModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:scale-110 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="cakeGrad1" x1="2" y1="12" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="50%" stopColor="#C85A17" />
        <stop offset="100%" stopColor="#8A3805" />
      </linearGradient>
      <linearGradient id="frostingGrad" x1="4" y1="8" x2="20" y2="14" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF7ED" />
        <stop offset="50%" stopColor="#FED7AA" />
        <stop offset="100%" stopColor="#FDBA74" />
      </linearGradient>
      <radialGradient id="flameGlow" cx="12" cy="4" r="3" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#EA580C" />
      </radialGradient>
      <filter id="cakeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#D97706" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Bottom Tier */}
    <path
      d="M3 15C3 13.9 3.9 13 5 13H19C20.1 13 21 13.9 21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15Z"
      fill="url(#cakeGrad1)"
      filter="url(#cakeGlow)"
    />

    {/* Cream Dripping Layer */}
    <path
      d="M3 15C4.5 16.5 6 14.5 7.5 16C9 17.5 10.5 15.5 12 16.5C13.5 15.5 15 17.5 16.5 16C18 14.5 19.5 16.5 21 15V13H3V15Z"
      fill="url(#frostingGrad)"
    />

    {/* Top Tier */}
    <path
      d="M6 10C6 9.4 6.4 9 7 9H17C17.6 9 18 9.4 18 10V13H6V10Z"
      fill="url(#cakeGrad1)"
    />

    {/* Top Frosting Pearls */}
    <circle cx="8" cy="9" r="1.2" fill="#FEF3C7" />
    <circle cx="12" cy="9" r="1.2" fill="#FEF3C7" />
    <circle cx="16" cy="9" r="1.2" fill="#FEF3C7" />

    {/* Candle */}
    <rect x="11.2" y="5.5" width="1.6" height="3.5" rx="0.8" fill="#FFF" stroke="#F59E0B" strokeWidth="0.4" />

    {/* Animated Candle Flame */}
    <path
      d="M12 2C12.8 3.2 13.2 4.2 12.8 5C12.4 5.8 11.6 5.8 11.2 5C10.8 4.2 11.2 3.2 12 2Z"
      fill="url(#flameGlow)"
      className={animate ? 'animate-pulse' : ''}
    />

    {/* Sparkles */}
    <path d="M20 7L20.5 8.5L22 9L20.5 9.5L20 11L19.5 9.5L18 9L19.5 8.5L20 7Z" fill="#FBBF24" opacity="0.9" />
    <path d="M4 8L4.3 9L5.3 9.3L4.3 9.6L4 10.6L3.7 9.6L2.7 9.3L3.7 9L4 8Z" fill="#F59E0B" opacity="0.8" />
  </svg>
);

// 🥐 2. MODERN ANIMATED CROISSANT / SAVOURY ICON
export const SavouriesModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:rotate-6 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="croissantGrad" x1="3" y1="8" x2="21" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="40%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="croissantGlow" x1="6" y1="10" x2="18" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FBBF24" />
      </linearGradient>
    </defs>

    {/* Flaky Curved Pastry Outer Body */}
    <path
      d="M3.5 15.5C3 13 4 10 6.5 8.5C9 7 12 7.5 14.5 8C17 8.5 20 10.5 20.5 13.5C21 16.5 18.5 19 15.5 19.5C12.5 20 8.5 19.5 5.5 18C3.8 17.1 3.6 16.2 3.5 15.5Z"
      fill="url(#croissantGrad)"
    />

    {/* Layer Ridges */}
    <path
      d="M7.5 9.5C9 12 9.5 15 9 18M11.5 8.5C13.5 11.5 14 15.5 13.5 19M15.5 9C17.5 11.5 18 15 17 18"
      stroke="url(#croissantGlow)"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* Warm Steam Aroma Lines */}
    <path
      d="M10 4.5C9.5 3.5 10.5 2.5 10 1.5M14 5C13.5 4 14.5 3 14 2"
      stroke="#FBBF24"
      strokeWidth="1"
      strokeLinecap="round"
      className={animate ? 'animate-bounce' : ''}
      opacity="0.8"
    />
  </svg>
);

// 🍕 3. MODERN ANIMATED PIZZA ICON
export const PizzaModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:rotate-12 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="crustGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="60%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#9A3412" />
      </linearGradient>
      <linearGradient id="cheeseGrad" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#EAB308" />
      </linearGradient>
    </defs>

    {/* Pizza Slice Body */}
    <path
      d="M12 21L3.5 6.5C5.8 4 18.2 4 20.5 6.5L12 21Z"
      fill="url(#crustGrad)"
    />

    {/* Golden Melted Cheese Area */}
    <path
      d="M12 18.5L5.5 7.5C7.2 5.8 16.8 5.8 18.5 7.5L12 18.5Z"
      fill="url(#cheeseGrad)"
    />

    {/* Toppings: Cherry Tomatoes & Basil */}
    <circle cx="10" cy="10" r="1.6" fill="#DC2626" />
    <circle cx="14" cy="13" r="1.4" fill="#DC2626" />
    <circle cx="12" cy="8" r="1.2" fill="#DC2626" />

    {/* Fresh Basil Leaves */}
    <path d="M14 9C14.8 8.2 15.8 8.8 15.5 9.8C15.2 10.8 14.2 10.2 14 9Z" fill="#16A34A" />
    <path d="M9 13C9.8 12.2 10.8 12.8 10.5 13.8C10.2 14.8 9.2 14.2 9 13Z" fill="#16A34A" />

    {/* Crust Puffs */}
    <path
      d="M3.5 6.5C4.5 5 7 4.5 12 4.5C17 4.5 19.5 5 20.5 6.5"
      stroke="#D97706"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 🍨 4. MODERN ANIMATED GELATO / ICE CREAM ICON
export const GelatoModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:-translate-y-0.5 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="coneGrad" x1="8" y1="12" x2="16" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="pistachioScoop" x1="6" y1="4" x2="18" y2="12" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="60%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <linearGradient id="berryScoop" x1="8" y1="2" x2="16" y2="8" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
    </defs>

    {/* Waffle Cone */}
    <path d="M7 12L12 22L17 12H7Z" fill="url(#coneGrad)" />
    <path d="M9 13.5L15 19.5M15 13.5L9 19.5M10.5 12L13.5 17" stroke="#78350F" strokeWidth="0.6" opacity="0.6" />

    {/* Bottom Pistachio Scoop */}
    <path
      d="M6 12C6 8.7 8.7 6 12 6C15.3 6 18 8.7 18 12C18 13 17 13.5 15.5 13.5C14 13.5 13.5 12.5 12 12.5C10.5 12.5 10 13.5 8.5 13.5C7 13.5 6 13 6 12Z"
      fill="url(#pistachioScoop)"
    />

    {/* Top Berry Swirl Scoop */}
    <circle cx="12" cy="6.5" r="4.5" fill="url(#berryScoop)" />
    <path d="M12 2.5C13 4 14 5 13.5 6.5C13 8 11 8 11.5 9.5" stroke="#FDF2F8" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />

    {/* Golden Star Sparkle */}
    <path d="M19 4L19.4 5.2L20.6 5.6L19.4 6L19 7.2L18.6 6L17.4 5.6L18.6 5.2L19 4Z" fill="#FBBF24" />
  </svg>
);

// ✨ 5. MODERN ANIMATED DESSERT / PATISSERIE ICON
export const DessertModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:scale-110 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="dessertGlaze" x1="4" y1="10" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F43F5E" />
        <stop offset="50%" stopColor="#E11D48" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="pastryBase" x1="4" y1="16" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* Golden Tart / Sable Crust */}
    <path d="M4 17C4 16 5 15 6.5 15H17.5C19 15 20 16 20 17V19C20 20.5 18.5 21.5 17 21.5H7C5.5 21.5 4 20.5 4 19V17Z" fill="url(#pastryBase)" />

    {/* Velvet Glaze Dome */}
    <path d="M6 15C6 10.5 8.7 7 12 7C15.3 7 18 10.5 18 15H6Z" fill="url(#dessertGlaze)" />

    {/* High-Gloss Mirror Highlight */}
    <path d="M8.5 10C9.5 8.5 11 8 12 8" stroke="#FFE4E6" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

    {/* 24K Gold Leaf Swirl / Berry Top */}
    <circle cx="12" cy="5.5" r="2" fill="#E11D48" stroke="#FDA4AF" strokeWidth="0.5" />
    <path d="M13.5 4.5L14.2 3.5L14.5 4.8L15.5 4.2L14.8 5.2L16 5.5L14.8 6L15.2 7.2L14 6.5L13.5 7.5L13.2 6.2L12 6.5L13 5.5L12.2 4.5L13.5 4.5Z" fill="#FBBF24" />
  </svg>
);

// 🍫 6. MODERN ANIMATED TREATS / CHOCOLATE ICON
export const TreatsModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:rotate-6 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="chocoDark" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#78350F" />
        <stop offset="50%" stopColor="#451A03" />
        <stop offset="100%" stopColor="#1C0A00" />
      </linearGradient>
      <linearGradient id="caramelDrizzle" x1="4" y1="8" x2="20" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    {/* Diamond-Faceted Belgian Bonbon Body */}
    <rect x="5" y="5" width="14" height="14" rx="3.5" transform="rotate(45 12 12)" fill="url(#chocoDark)" />

    {/* Caramel Swirl Drizzle */}
    <path
      d="M7 11C8.5 9.5 11 13 13 10C15 7 17 11 18 10"
      stroke="url(#caramelDrizzle)"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Golden Crunch Dusting */}
    <circle cx="10" cy="8" r="0.8" fill="#FDE047" />
    <circle cx="14" cy="14" r="0.8" fill="#FDE047" />
    <circle cx="16" cy="9" r="0.6" fill="#FDE047" />
    <circle cx="8" cy="15" r="0.6" fill="#FDE047" />
  </svg>
);

// 🍿 7. MODERN ANIMATED SNACKS / MAKHANA ICON
export const SnacksModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:scale-110 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="snackBowl" x1="3" y1="12" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="60%" stopColor="#059669" />
        <stop offset="100%" stopColor="#064E3B" />
      </linearGradient>
      <radialGradient id="makhanaPuff" cx="12" cy="9" r="5" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="70%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </radialGradient>
    </defs>

    {/* Ceramic Snack Bowl */}
    <path
      d="M3 12C3 16.5 7 20 12 20C17 20 21 16.5 21 12H3Z"
      fill="url(#snackBowl)"
    />

    {/* Roasted Makhana / Lotus Seeds */}
    <ellipse cx="12" cy="9.5" rx="3.5" ry="3" fill="url(#makhanaPuff)" />
    <ellipse cx="7.5" cy="11" rx="2.8" ry="2.2" fill="url(#makhanaPuff)" />
    <ellipse cx="16.5" cy="11" rx="2.8" ry="2.2" fill="url(#makhanaPuff)" />
    <ellipse cx="10" cy="7" rx="2" ry="1.8" fill="url(#makhanaPuff)" />
    <ellipse cx="14" cy="7" rx="2" ry="1.8" fill="url(#makhanaPuff)" />

    {/* Peri Peri Seasoning Specks */}
    <circle cx="11.5" cy="9" r="0.4" fill="#EF4444" />
    <circle cx="13" cy="10" r="0.4" fill="#EF4444" />
    <circle cx="7.5" cy="11" r="0.4" fill="#EF4444" />
    <circle cx="16" cy="10.5" r="0.4" fill="#EF4444" />

    {/* Roasted Crunch Spark */}
    <path d="M12 2L12.4 3.5L13.8 3.8L12.4 4.2L12 5.5L11.6 4.2L10.2 3.8L11.6 3.5L12 2Z" fill="#F59E0B" />
  </svg>
);

// 🌿 8. MODERN 100% PURE VEG BADGE ICON
export const PureVegModernBadge: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:scale-105 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="vegBorder" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#22C55E" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
      <radialGradient id="vegDotGlow" cx="12" cy="12" r="5" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="60%" stopColor="#16A34A" />
        <stop offset="100%" stopColor="#14532D" />
      </radialGradient>
      <filter id="vegShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#16A34A" floodOpacity="0.3" />
      </filter>
    </defs>

    {/* FSSAI Standard Square Box */}
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="4"
      fill="#F0FDF4"
      stroke="url(#vegBorder)"
      strokeWidth="2"
      filter="url(#vegShadow)"
    />

    {/* Glowing Green Pure Veg Dot */}
    <circle
      cx="12"
      cy="12"
      r="4.5"
      fill="url(#vegDotGlow)"
      className={animate ? 'animate-pulse' : ''}
    />
  </svg>
);

// ⚡ 9. MODERN EXPRESS DELIVERY ICON
export const ExpressDeliveryModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:translate-x-1 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="expressGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill="url(#expressGrad)"
      stroke="#FEF3C7"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
  </svg>
);

// 📍 10. MODERN 3D STORE PIN ICON
export const StorePinModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:-translate-y-1 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="pinGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#B45309" floodOpacity="0.4" />
      </filter>
    </defs>

    <path
      d="M12 2C7.58 2 4 5.58 4 10C4 15.25 12 22 12 22C12 22 20 15.25 20 10C20 5.58 16.42 2 12 2Z"
      fill="url(#pinGrad)"
      filter="url(#pinShadow)"
    />
    <circle cx="12" cy="9.5" r="3.5" fill="#FFFFFF" />
    <circle cx="12" cy="9.5" r="2" fill="#D97706" />
  </svg>
);

// 🛍️ 11. MODERN SHOPPING BAG ICON
export const BagModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'hover:scale-110 transition-transform duration-300' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="bagGrad" x1="4" y1="7" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="50%" stopColor="#C85A17" />
        <stop offset="100%" stopColor="#8A3805" />
      </linearGradient>
    </defs>

    <path
      d="M4 7C4 5.9 4.9 5 6 5H18C19.1 5 20 5.9 20 7L21 19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19L4 7Z"
      fill="url(#bagGrad)"
    />
    <path
      d="M9 7V5C9 3.34 10.34 2 12 2C13.66 2 15 3.34 15 5V7"
      stroke="#FDE68A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M12 11L12.4 12.2L13.6 12.6L12.4 13L12 14.2L11.6 13L10.4 12.6L11.6 12.2L12 11Z" fill="#FEF3C7" />
  </svg>
);

// ✨ 12. MODERN SPARKLING STAR ICON
export const SparkleModernIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${animate ? 'animate-pulse' : ''}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="starGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>

    <path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      fill="url(#starGrad)"
    />
  </svg>
);

// 🛡️ 13. MODERN QUALITY SHIELD BADGE
export const ShieldModernBadge: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="shieldGrad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
    </defs>

    <path
      d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z"
      fill="url(#shieldGrad)"
    />
    <path
      d="M9 11.5L11 13.5L15 9.5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 🏠 14. MODERN HOME ICON
export const HomeModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="homeGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path d="M3 10.5L12 3L21 10.5V20C21 20.6 20.6 21 20 21H15V14H9V21H4C3.4 21 3 20.6 3 20V10.5Z" fill="url(#homeGrad)" />
    <path d="M9 14H15V21H9V14Z" fill="#78350F" />
  </svg>
);

// 📜 15. MODERN MENU / CATALOG ICON
export const MenuModernIcon: React.FC<IconProps> = ({ className = 'w-5 h-5', size, animate = true, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}`}
    width={size}
    height={size}
    {...props}
  >
    <defs>
      <linearGradient id="menuGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#menuGrad)" />
    <path d="M7 8H17M7 12H17M7 16H13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

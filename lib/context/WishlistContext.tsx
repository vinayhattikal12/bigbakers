'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const WISHLIST_KEY = 'big_bakers_wishlist_v1';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      if (stored) setWishlist(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, [wishlist, isHydrated]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/lib/ecommerce/types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, selectedWeight?: string, quantity?: number, customMessage?: string, openDrawer?: boolean) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'big_bakers_cart_v1';
const FREE_DELIVERY_THRESHOLD = 499;
const STANDARD_DELIVERY_FEE = 60;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart', e);
      }
    }
  }, [items, isHydrated]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = (
    product: Product,
    selectedWeight?: string,
    quantity = 1,
    customMessage?: string,
    openDrawer = false
  ) => {
    const weightToUse =
      selectedWeight ||
      product.weights.find((w) => w.isDefault)?.weight ||
      product.weights[0]?.weight ||
      '500g';
    const weightOpt = product.weights.find((w) => w.weight === weightToUse);
    const unitPrice = weightOpt ? weightOpt.price : product.price;
    const itemId = `${product.id}-${weightToUse}${
      customMessage ? '-' + encodeURIComponent(customMessage) : ''
    }`;

    setItems((prev) => {
      const index = prev.findIndex((item) => item.id === itemId);
      if (index > -1) {
        const next = [...prev];
        next[index].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedWeight: weightToUse,
          price: unitPrice,
          quantity,
          customMessage,
        },
      ];
    });

    if (openDrawer) {
      setIsOpen(true);
    }
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'FIRSTBITE') {
      setCouponCode(clean);
      setDiscountPercent(15);
      return true;
    }
    if (clean === 'SWEET50') {
      setCouponCode(clean);
      setDiscountPercent(10);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountPercent(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * discountPercent) / 100);
  const deliveryFee =
    subtotal > 0 && subtotal >= FREE_DELIVERY_THRESHOLD
      ? 0
      : subtotal > 0
      ? STANDARD_DELIVERY_FEE
      : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        discount,
        total,
        couponCode,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

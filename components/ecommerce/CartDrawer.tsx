'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BagModernIcon, 
  CloseModernIcon, 
  PlusModernIcon, 
  MinusModernIcon, 
  TrashModernIcon, 
  ArrowRightModernIcon, 
  ShieldModernBadge 
} from '@/components/ui/ModernIcons';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';
import { CravingPairUpsell } from '@/components/ecommerce/CravingPairUpsell';

export const CartDrawer: React.FC = () => {
  const pathname = usePathname();
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  // Close drawer automatically on page change
  React.useEffect(() => {
    if (isOpen) {
      closeCart();
    }
  }, [pathname]);

  // Handle Android/iOS browser back button & escape key to dismiss drawer
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    const handlePopState = () => {
      closeCart();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, closeCart]);

  const [couponInput, setCouponInput] = React.useState('');
  const [couponError, setCouponError] = React.useState('');
  const [couponSuccess, setCouponSuccess] = React.useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponSuccess('Coupon applied successfully! (15% off)');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon. Try FIRSTBITE or SWEET50');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-cream-50 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-cream-300 bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <BagModernIcon className="w-5 h-5 shrink-0 text-caramel" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-cocoa truncate">Your Cravings</h2>
            <span className="text-xs bg-caramel/10 text-caramel font-semibold px-2 py-0.5 rounded-full shrink-0">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-cocoa/70 hover:text-cocoa hover:bg-cream-200 transition-all active:scale-90 shrink-0"
            aria-label="Close cart"
          >
            <CloseModernIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Free delivery progress bar */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-peach/40 border-b border-peach-warm/30 text-xs text-cocoa">
          {subtotal >= 499 ? (
            <p className="font-medium text-emerald-800 flex items-center gap-1.5">
              <span>🎉</span> You unlocked <strong>FREE fresh delivery</strong> in Bengaluru!
            </p>
          ) : (
            <div>
              <p className="mb-1 text-cocoa/90">
                Add <strong>{formatPrice(499 - subtotal)}</strong> more for <strong>FREE delivery</strong>
              </p>
              <div className="w-full bg-white rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-caramel h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3.5 sm:py-6 space-y-3 sm:space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center">
                <BagModernIcon className="w-10 h-10 text-caramel" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold text-cocoa">Your bag is empty</p>
                <p className="text-xs text-cocoa/60 max-w-xs">
                  Discover our freshly baked cakes, artisanal desserts, and savory treats.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  closeCart();
                }}
              >
                <Link href="/menu">Explore Menu</Link>
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 bg-white rounded-2xl border border-cream-300 shadow-xs transition-all w-full min-w-0"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-cream-200 shrink-0">
                  <Image
                    src={item.product.heroImage || '/images/products/celebration-cakes/belgian-truffle-cake.webp'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start gap-1 min-w-0">
                    <div className="min-w-0 flex-1 pr-1">
                      <h3 className="font-serif text-xs sm:text-sm font-bold text-cocoa truncate" title={item.product.name}>
                        {item.product.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-cocoa/60 truncate">{item.selectedWeight}</p>
                      {item.customMessage && (
                        <p className="text-[10px] sm:text-[11px] text-caramel italic truncate">
                          &quot;{item.customMessage}&quot;
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-cocoa/40 hover:text-berry-crimson p-1 transition-colors shrink-0"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <TrashModernIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-cream-200 min-w-0">
                    <div className="flex items-center border border-cream-300 rounded-lg bg-cream-50 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 sm:p-1.5 hover:bg-cream-200 text-cocoa rounded-l-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <MinusModernIcon className="w-3 h-3" />
                      </button>
                      <span className="px-2 sm:px-2.5 text-xs font-semibold text-cocoa min-w-[18px] sm:min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 sm:p-1.5 hover:bg-cream-200 text-cocoa rounded-r-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <PlusModernIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-cocoa shrink-0 text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* 1-Tap Craving Pair Upsell in Cart */}
          {items.length > 0 && (
            <div className="pt-1">
              <CravingPairUpsell currentCategory={items[0]?.product.category || 'cakes'} />
            </div>
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-cream-300 bg-white space-y-3 sm:space-y-4">
            {/* Coupon Code Section */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                  <span className="font-semibold text-emerald-800">
                    Code <strong>{couponCode}</strong> applied (-{formatPrice(discount)})
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-900 underline font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. FIRSTBITE)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs bg-cream-50 border border-cream-300 rounded-xl focus:outline-none focus:border-caramel uppercase tracking-wider"
                  />
                  <Button type="submit" variant="outline" size="sm">
                    Apply
                  </Button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-berry-crimson mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-700 mt-1">{couponSuccess}</p>}
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-cocoa/80 border-t border-cream-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-cocoa">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Bengaluru Fresh Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-cocoa pt-2 border-t border-cream-200">
                <span>Total Amount</span>
                <span className="text-cocoa font-sans font-bold">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="space-y-2">
              <Link href="/checkout" onClick={closeCart} className="block w-full">
                <Button variant="primary" size="lg" className="w-full justify-between">
                  <span>Proceed to Checkout</span>
                  <div className="flex items-center gap-1.5">
                    <span>{formatPrice(total)}</span>
                    <ArrowRightModernIcon className="w-4 h-4" />
                  </div>
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-cocoa/70 font-medium">
                <ShieldModernBadge className="w-3.5 h-3.5" />
                <span>100% Safe & Contactless Bengaluru Delivery</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

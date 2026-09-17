'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  ArrowLeft,
} from 'lucide-react';

import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
    deliveryFee,
    discount,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/menu');
    }
  };

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponMsg(null);
    if (!couponInput.trim()) return;

    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponMsg({ type: 'success', text: 'Coupon applied! 15% discount activated.' });
      setCouponInput('');
    } else {
      setCouponMsg({ type: 'error', text: 'Invalid code. Try FIRSTBITE or SWEET50.' });
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-5 bg-white p-10 rounded-3xl border border-cream-300 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-cream-200 flex items-center justify-center text-cocoa/40">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">Your Shopping Bag is Empty</h1>
            <p className="text-xs text-cocoa/60">
              Looks like you haven&apos;t added any sweet cravings to your bag yet.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleGoBack}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-cream-300 bg-white font-bold text-xs text-cocoa hover:bg-cream-200 active:scale-95 transition-all shadow-xs"
            >
              ← Go Back
            </button>
            <Link href="/menu" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full justify-center">
                <Sparkles className="w-4 h-4 mr-2" />
                <span>Explore Menu</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header with Back Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-300 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="p-2 sm:p-2.5 rounded-2xl bg-white border border-cream-300 text-cocoa hover:bg-cream-200 active:scale-90 transition-all shadow-xs"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-cocoa" />
            </button>
            <div>
              <h1 className="font-serif text-2xl sm:text-4xl font-black text-cocoa tracking-tight">
                Your Shopping Bag
              </h1>
              <p className="text-xs sm:text-sm text-cocoa/60 mt-0.5">
                Review your items and proceed to secure delivery in Bengaluru.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-cream-300 text-xs font-bold text-cocoa hover:bg-cream-200 active:scale-95 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-caramel" />
              <span>Back</span>
            </button>
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cocoa text-cream-50 hover:bg-caramel text-xs font-bold active:scale-95 transition-all shadow-xs"
            >
              <span>Add More Items</span>
            </Link>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 p-5 bg-white rounded-3xl border border-cream-300 shadow-xs justify-between"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-cream-200 flex-shrink-0">
                    <Image
                      src={item.product.heroImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-caramel tracking-wider">
                      {item.product.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-cocoa">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-cocoa/60 font-medium">Size: {item.selectedWeight}</p>
                    {item.customMessage && (
                      <p className="text-xs text-caramel italic">
                        Message: &quot;{item.customMessage}&quot;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between sm:items-end items-center pt-3 sm:pt-0 border-t sm:border-t-0 border-cream-200">
                  <span className="font-sans font-black text-base text-cocoa">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-cream-300 rounded-full bg-cream-50 p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-cream-200 rounded-full text-cocoa"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-cocoa">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-cream-200 rounded-full text-cocoa"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-cocoa/40 hover:text-berry-crimson transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-cocoa/50 hover:text-berry-crimson transition-colors"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-cocoa border-b border-cream-200 pb-4">
              Order Summary
            </h2>

            {/* Coupon Code Box */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-cocoa flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-caramel" />
                <span>Promo Code</span>
              </label>

              {couponCode ? (
                <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800">
                  <span className="font-bold">Code {couponCode} applied (-{formatPrice(discount)})</span>
                  <button onClick={removeCoupon} className="text-emerald-700 underline font-semibold">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. FIRSTBITE"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 bg-cream-50 border border-cream-300 rounded-2xl text-xs uppercase tracking-wider focus:outline-none focus:border-caramel"
                  />
                  <Button type="submit" variant="outline" size="sm">
                    Apply
                  </Button>
                </form>
              )}
              {couponMsg && (
                <p className={`text-[11px] ${couponMsg.type === 'success' ? 'text-emerald-700' : 'text-berry-crimson'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-cocoa/80 border-t border-cream-200 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal ({totalItems})</span>
                <span className="font-semibold text-cocoa">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Special Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Bengaluru Chilled Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-lg font-serif font-bold text-cocoa border-t border-cream-200 pt-3">
                <span>Total Amount</span>
                <span className="text-cocoa font-sans font-black">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <div className="space-y-3">
              <Link href="/checkout" className="block w-full">
                <Button variant="primary" size="lg" className="w-full justify-between">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-cocoa/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Encrypted & Safe Bengaluru Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

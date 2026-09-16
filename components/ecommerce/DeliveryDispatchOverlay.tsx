'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils/formatters';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  X,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export interface DispatchEventDetail {
  id: string;
  name: string;
  price: number;
  weight?: string;
  imageUrl: string;
  category?: string;
}

export const DELIVERY_DISPATCH_EVENT = 'big_bakers_delivery_dispatch';

export function triggerDeliveryDispatch(item: DispatchEventDetail) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(DELIVERY_DISPATCH_EVENT, { detail: item })
  );
}

// Gentle Web Audio API Sound Synthesizer
function playSoundEffect(type: 'pack' | 'scooter' | 'success') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'pack') {
      // Soft luxury bakery chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'scooter') {
      // Soft playful electric scooter acceleration
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(320, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'success') {
      // Celebratory bell
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15); // D6
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    }
  } catch {
    // Graceful silence on restricted browsers
  }
}

export const DeliveryDispatchOverlay: React.FC = () => {
  const { openCart } = useCart();
  const [activeItem, setActiveItem] = useState<DispatchEventDetail | null>(null);
  const [stage, setStage] = useState<'pack' | 'scooter' | 'ready'>('pack');
  const [isPaused, setIsPaused] = useState(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleDispatch = (e: Event) => {
      const customEvent = e as CustomEvent<DispatchEventDetail>;
      if (!customEvent.detail) return;

      const item = customEvent.detail;
      setActiveItem(item);
      setStage('pack');
      playSoundEffect('pack');

      // Stage 1 (0 -> 1.0s): Packing in Box
      // Stage 2 (1.0s -> 2.2s): Express Delivery Boy zooms across
      setTimeout(() => {
        setStage('scooter');
        playSoundEffect('scooter');
      }, 1000);

      // Stage 3 (2.2s+): Live Route & Order Ready
      setTimeout(() => {
        setStage('ready');
        playSoundEffect('success');
      }, 2200);

      // Auto close after 6.5s unless hovered
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = setTimeout(() => {
        setActiveItem((curr) => (curr?.id === item.id ? null : curr));
      }, 7000);
    };

    window.addEventListener(DELIVERY_DISPATCH_EVENT, handleDispatch);
    return () => {
      window.removeEventListener(DELIVERY_DISPATCH_EVENT, handleDispatch);
      if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
    };
  }, []);

  const handleClose = () => {
    setActiveItem(null);
    if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
  };

  const handleOpenCart = () => {
    handleClose();
    openCart();
  };

  if (!activeItem) return null;

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9998] max-w-md w-[calc(100vw-2rem)] sm:w-[420px] pointer-events-auto transition-all duration-500 animate-in fade-in slide-in-from-bottom-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-3xl overflow-hidden bg-cocoa-deep/95 backdrop-blur-2xl border-2 border-gold/40 shadow-[0_12px_45px_rgba(45,27,22,0.65)] ring-1 ring-gold/20 text-cream-100 p-5 space-y-4">
        {/* Ambient Warm Golden Glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-caramel/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-gold/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header & Close Button */}
        <div className="relative z-10 flex items-center justify-between border-b border-cream-300/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bengaluru Fresh Express</span>
            </span>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close notification"
            className="p-1 rounded-full text-cream-200/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================
            🎬 INTERACTIVE CINEMATIC STAGES
            ======================================================== */}

        {/* STAGE 1: 🎁 Fresh Kitchen Box & Ribbon Packing */}
        {stage === 'pack' && (
          <div className="relative py-2 flex flex-col items-center text-center space-y-3 animate-in zoom-in-95 duration-300">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Animated Box Folding Graphic */}
              <div className="absolute inset-0 bg-gradient-to-tr from-caramel via-gold to-caramel rounded-2xl animate-pulse shadow-lg transform rotate-3" />
              <div className="relative z-10 w-16 h-16 rounded-xl bg-cocoa-deep border border-gold/50 flex flex-col items-center justify-center p-2 text-center shadow-inner">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.name}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover"
                />
              </div>
              {/* Ribbon SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none animate-spin"
                style={{ animationDuration: '6s' }}
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                />
              </svg>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-gold-light flex items-center justify-center gap-1.5">
                <span>Handcrafted &amp; Boxed</span>
              </h4>
              <p className="text-xs text-cream-200/80">
                Freshly sealed with gold ribbon in Vijaynagar kitchen...
              </p>
            </div>
          </div>
        )}

        {/* STAGE 2: 🛵 Express Delivery Rider Dispatched */}
        {stage === 'scooter' && (
          <div className="relative py-2 space-y-3 animate-in fade-in slide-in-from-left duration-400">
            {/* Scooter Animation Stage */}
            <div className="relative h-20 w-full rounded-2xl bg-cocoa/90 border border-gold/30 overflow-hidden flex items-center justify-between px-3">
              {/* Moving Road Dashes */}
              <div className="absolute bottom-2 left-0 right-0 h-1 flex justify-around opacity-40">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className="w-4 h-0.5 bg-gold inline-block animate-pulse"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>

              {/* Delivery Boy Animated SVG Vector */}
              <div className="relative z-10 flex items-center gap-3 animate-in slide-in-from-left-full duration-700">
                <svg
                  className="w-16 h-16 text-caramel drop-shadow-[0_0_12px_rgba(212,175,55,0.6)] transform -scale-x-100"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Headlight beam */}
                  <polygon
                    points="4,34 0,26 0,42"
                    fill="rgba(254, 243, 199, 0.45)"
                  />
                  {/* Rear Delivery Box (Big Bakers thermal box) */}
                  <rect
                    x="42"
                    y="20"
                    width="16"
                    height="16"
                    rx="3"
                    fill="#C68B59"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <text
                    x="50"
                    y="31"
                    fontSize="7"
                    fill="#1B110E"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    BB
                  </text>

                  {/* Rider Body & Apron */}
                  <circle cx="32" cy="16" r="6" fill="#F7C4A5" />
                  {/* Helmet */}
                  <path
                    d="M26 16 A6 6 0 0 1 38 16 Z"
                    fill="#9E6437"
                    stroke="#D4AF37"
                    strokeWidth="1"
                  />
                  <path
                    d="M28 22 L34 26 L30 36 L24 32 Z"
                    fill="#2D1B16"
                    stroke="#C68B59"
                    strokeWidth="1"
                  />

                  {/* Scooter Chassis */}
                  <path
                    d="M14 42 L24 42 L32 38 L42 42 L48 42"
                    stroke="#FAF6F0"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 42 L20 28 L24 28"
                    stroke="#FAF6F0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Front Wheel */}
                  <circle
                    cx="14"
                    cy="44"
                    r="6"
                    fill="#2D1B16"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <circle cx="14" cy="44" r="2" fill="#FAF6F0" />

                  {/* Rear Wheel */}
                  <circle
                    cx="48"
                    cy="44"
                    r="6"
                    fill="#2D1B16"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  <circle cx="48" cy="44" r="2" fill="#FAF6F0" />
                </svg>

                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-gold uppercase">
                    <Flame className="w-3 h-3 text-caramel fill-current" />
                    <span>Rider Assigned</span>
                  </div>
                  <p className="text-xs font-serif font-bold text-white">
                    Vijaynagar Express Hub ➔ Bengaluru
                  </p>
                  <p className="text-[10px] text-cream-200/70">
                    Insulated cold-chain container active
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: ✅ Product Summary & Route Reserved */}
        {stage === 'ready' && (
          <div className="space-y-3.5 animate-in fade-in duration-300">
            {/* Product Snapshot Card */}
            <div className="flex items-center gap-3.5 bg-black/40 p-2.5 rounded-2xl border border-cream-300/15">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-100 shrink-0 border border-gold/40">
                <Image
                  src={activeItem.imageUrl}
                  alt={activeItem.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-serif font-bold text-sm text-white truncate">
                    {activeItem.name}
                  </h4>
                  <span className="text-xs font-bold text-gold shrink-0">
                    {formatPrice(activeItem.price)}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-0.5 text-[11px] text-cream-200/70">
                  {activeItem.weight && (
                    <span className="bg-caramel/20 px-1.5 py-0.5 rounded text-gold text-[10px] font-semibold border border-caramel/30">
                      {activeItem.weight}
                    </span>
                  )}
                  <span>Added to bag</span>
                </div>
              </div>
            </div>

            {/* Live Delivery Promise Badge */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-cream-200/80">
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-cocoa/50 border border-white/10">
                <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>ETA: 45-60 Mins</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-cocoa/50 border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Chilled Care</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-cream-100 transition-all text-center"
              >
                Keep Shopping
              </button>

              <button
                onClick={handleOpenCart}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-caramel to-caramel-dark hover:from-caramel-dark hover:to-cocoa text-xs font-bold text-white shadow-xl flex items-center justify-center gap-1.5 hover:scale-102 active:scale-95 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>View Cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Auto-Dismiss Progress Bar */}
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-gold via-caramel to-peach transition-all duration-[6500ms] ease-linear ${
              isPaused ? 'opacity-50' : 'opacity-100'
            }`}
            style={{ width: isPaused ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  );
};

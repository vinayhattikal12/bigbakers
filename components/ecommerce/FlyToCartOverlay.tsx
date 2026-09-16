'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils/formatters';
import {
  PackageCheck,
  Sparkles,
  ArrowRight,
  X,
  ShoppingBag,
  CheckCircle2,
  Clock,
  MapPin,
  Flame,
} from 'lucide-react';

export interface ProductInfoPayload {
  name: string;
  weight?: string;
  price?: number;
}

export interface FlyingFlight {
  id: string;
  imageUrl: string;
  productInfo?: ProductInfoPayload;
  startRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  targetRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
}

export const FLY_TO_CART_EVENT = 'big_bakers_fly_to_cart';

export function triggerFlyToCartAnimation(
  source: HTMLElement | DOMRect | null,
  imageUrl: string,
  productInfo?: ProductInfoPayload
) {
  if (typeof window === 'undefined' || !source) return;

  let rect: DOMRect;
  if ('getBoundingClientRect' in source) {
    rect = source.getBoundingClientRect();
  } else {
    rect = source;
  }

  const targetEl =
    document.getElementById('header-cart-icon') ||
    document.querySelector('[data-cart-target]') ||
    document.querySelector('header button[aria-label="View shopping bag"]');

  let targetRect = {
    top: 20,
    left: window.innerWidth - 60,
    width: 44,
    height: 44,
  };

  if (targetEl) {
    const tRect = targetEl.getBoundingClientRect();
    targetRect = {
      top: tRect.top,
      left: tRect.left,
      width: tRect.width,
      height: tRect.height,
    };
  }

  const detail: FlyingFlight = {
    id: `fly-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    imageUrl,
    productInfo,
    startRect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    },
    targetRect,
  };

  window.dispatchEvent(new CustomEvent(FLY_TO_CART_EVENT, { detail }));
}

function playSweetBakeChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Audio context safely ignored
  }
}

export const FlyToCartOverlay: React.FC = () => {
  const { openCart, subtotal, totalItems } = useCart();
  const [flights, setFlights] = useState<FlyingFlight[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Delivery Dispatch HUD State
  const [activeDispatch, setActiveDispatch] = useState<{
    id: string;
    productName: string;
    imageUrl: string;
    weight?: string;
    price?: number;
    phase: 1 | 2 | 3; // 1: Packing Box, 2: Courier Scooter, 3: Success CTA
  } | null>(null);

  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleFlyEvent = (e: Event) => {
      const customEvent = e as CustomEvent<FlyingFlight>;
      if (!customEvent.detail) return;

      const flight = customEvent.detail;
      setFlights((prev) => [...prev, flight]);

      // 1. Trigger Delivery Dispatch HUD
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);

      const dispatchItem = {
        id: flight.id,
        productName: flight.productInfo?.name || 'Artisanal Delight',
        imageUrl: flight.imageUrl,
        weight: flight.productInfo?.weight || 'Fresh Bake',
        price: flight.productInfo?.price || 699,
        phase: 1 as const,
      };

      setActiveDispatch(dispatchItem);

      // Phase 1 -> Phase 2 (Courier Scooter ride at 1.1s)
      setTimeout(() => {
        setActiveDispatch((prev) => (prev?.id === flight.id ? { ...prev, phase: 2 } : prev));
      }, 1100);

      // Phase 2 -> Phase 3 (Bagged & CTA Ready at 2.4s)
      setTimeout(() => {
        setActiveDispatch((prev) => (prev?.id === flight.id ? { ...prev, phase: 3 } : prev));
      }, 2400);

      // Auto dismiss after 6.5s
      dismissTimerRef.current = setTimeout(() => {
        setActiveDispatch(null);
      }, 6500);

      // 2. Generate pop-out golden sparkles around starting cake
      const sparkCount = 14;
      const startCenterX = flight.startRect.left + flight.startRect.width / 2;
      const startCenterY = flight.startRect.top + flight.startRect.height / 2;
      const newSparks: Particle[] = [];

      const colors = ['#D4AF37', '#E6A15D', '#B87333', '#FFF8DC', '#FDE68A'];

      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5);
        const speed = 2.5 + Math.random() * 3.5;
        newSparks.push({
          id: Math.random(),
          x: startCenterX,
          y: startCenterY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 4 + Math.random() * 5,
          alpha: 1,
        });
      }

      setParticles((prev) => [...prev, ...newSparks]);

      // 3. Schedule Landing Impact on Header Cart Icon (at 720ms)
      setTimeout(() => {
        playSweetBakeChime();

        const cartEl =
          document.getElementById('header-cart-icon') ||
          document.querySelector('header button[aria-label="View shopping bag"]');

        if (cartEl) {
          cartEl.classList.remove('cart-impact-pulse');
          void cartEl.offsetWidth;
          cartEl.classList.add('cart-impact-pulse');
          setTimeout(() => {
            cartEl.classList.remove('cart-impact-pulse');
          }, 800);
        }

        const landingSparks: Particle[] = [];
        const targetCenterX = flight.targetRect.left + flight.targetRect.width / 2;
        const targetCenterY = flight.targetRect.top + flight.targetRect.height / 2;

        for (let j = 0; j < 16; j++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 4;
          landingSparks.push({
            id: Math.random(),
            x: targetCenterX,
            y: targetCenterY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 3 + Math.random() * 4,
            alpha: 1,
          });
        }
        setParticles((prev) => [...prev, ...landingSparks]);
      }, 720);

      // Clean up flight item after animation finishes (920ms)
      setTimeout(() => {
        setFlights((prev) => prev.filter((f) => f.id !== flight.id));
      }, 920);
    };

    window.addEventListener(FLY_TO_CART_EVENT, handleFlyEvent);
    return () => {
      window.removeEventListener(FLY_TO_CART_EVENT, handleFlyEvent);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, []);

  // Particle Physics Animation Loop
  useEffect(() => {
    if (particles.length === 0) return;

    let frameId: number;
    const update = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            alpha: p.alpha - 0.035,
            size: Math.max(0, p.size - 0.1),
          }))
          .filter((p) => p.alpha > 0.05 && p.size > 0.5)
      );

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [particles.length]);

  return (
    <>
      {/* 1. Hardware-Accelerated 3D Particle & Arc Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.alpha,
              boxShadow: `0 0 10px ${p.color}`,
            }}
          />
        ))}

        {flights.map((flight) => {
          const startX = flight.startRect.left;
          const startY = flight.startRect.top;
          const startW = flight.startRect.width;
          const startH = flight.startRect.height;

          const targetX = flight.targetRect.left + flight.targetRect.width / 2 - 24;
          const targetY = flight.targetRect.top + flight.targetRect.height / 2 - 24;

          const dx = targetX - startX;
          const dy = targetY - startY;

          return (
            <div
              key={flight.id}
              className="absolute top-0 left-0 animate-fly-to-cart will-change-transform"
              style={
                {
                  '--start-x': `${startX}px`,
                  '--start-y': `${startY}px`,
                  '--start-w': `${startW}px`,
                  '--start-h': `${startH}px`,
                  '--target-x': `${targetX}px`,
                  '--target-y': `${targetY}px`,
                  '--dx': `${dx}px`,
                  '--dy': `${dy}px`,
                } as React.CSSProperties
              }
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-caramel/60 ring-4 ring-gold/40 bg-white">
                <Image
                  src={flight.imageUrl}
                  alt="Adding to cart"
                  fill
                  className="object-cover"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-caramel/30 via-gold/20 to-transparent mix-blend-overlay" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. 🌟 MODERN CINEMATIC DELIVERY DISPATCH & PACKING HUD */}
      {activeDispatch && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[9998] animate-in slide-in-from-bottom-6 fade-in duration-300">
          <div className="relative bg-cocoa-deep/95 border border-gold/40 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl text-cream-100 overflow-hidden p-4 sm:p-5">
            {/* Ambient Top Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-caramel via-gold to-peach" />

            {/* Header: Status Ticker & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold">
                  {activeDispatch.phase === 1 && '1. Fresh Packing in Kitchen'}
                  {activeDispatch.phase === 2 && '2. Express Courier Dispatched'}
                  {activeDispatch.phase === 3 && '3. Added to Cart • Ready'}
                </span>
              </div>
              <button
                onClick={() => setActiveDispatch(null)}
                className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Middle: Interactive Animation Cinema Stage */}
            <div className="py-3.5 my-1">
              {/* STAGE 1: Artisanal Box Packaging & Chef Seal */}
              {activeDispatch.phase === 1 && (
                <div className="flex items-center gap-4 animate-box-pack">
                  <div className="relative w-16 h-16 rounded-2xl bg-cocoa border-2 border-caramel/50 overflow-hidden flex items-center justify-center shadow-lg shrink-0">
                    <Image
                      src={activeDispatch.imageUrl}
                      alt={activeDispatch.productName}
                      fill
                      className="object-cover scale-105"
                      sizes="64px"
                    />
                    <div className="absolute inset-0 bg-gold/10 border-2 border-dashed border-gold/40 rounded-2xl pointer-events-none" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-caramel/20 border border-caramel/40 text-[10px] font-bold text-gold animate-stamp-pop">
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span>Artisanal Ribbon Tied & Chilled</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-white line-clamp-1">
                      {activeDispatch.productName}
                    </h4>
                    <p className="text-[11px] text-cream-200/70">
                      Slow-baked & packed fresh in Vijaynagar kitchen.
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 2: Animated Delivery Rider on Scooter */}
              {activeDispatch.phase === 2 && (
                <div className="relative overflow-hidden py-1">
                  <div className="flex items-center justify-between">
                    {/* Scooter & Courier SVG Animation */}
                    <div className="relative flex items-center gap-3 animate-scooter-ride">
                      <div className="w-14 h-12 relative flex items-center justify-center shrink-0">
                        {/* Custom Modern Baker Scooter SVG */}
                        <svg
                          viewBox="0 0 64 48"
                          className="w-full h-full text-gold drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Scooter Body */}
                          <path
                            d="M12 36H44L38 22H24L18 36H12Z"
                            fill="#C68B59"
                            stroke="#D4AF37"
                            strokeWidth="1.5"
                          />
                          {/* Front Handle & Shield */}
                          <path
                            d="M42 22L46 12H52"
                            stroke="#FFFDF9"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          {/* Headlight beam */}
                          <path
                            d="M48 14L60 10L62 20L48 16Z"
                            fill="url(#headlightGlow)"
                            opacity="0.8"
                          />
                          {/* Delivery Cake Box in Carrier */}
                          <rect
                            x="18"
                            y="14"
                            width="14"
                            height="12"
                            rx="2"
                            fill="#2D1B16"
                            stroke="#D4AF37"
                            strokeWidth="1.5"
                          />
                          <path d="M25 14V26M18 20H32" stroke="#E6A15D" strokeWidth="1" />
                          {/* Rider Silhouette with Chef Cap */}
                          <circle cx="34" cy="10" r="5" fill="#FAF6F0" />
                          <path d="M30 6C30 3 38 3 38 6H30Z" fill="#D4AF37" />
                          <path
                            d="M32 15C32 15 38 18 42 22"
                            stroke="#FAF6F0"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          {/* Back Wheel */}
                          <g className="animate-wheel-spin origin-[18px_36px]">
                            <circle cx="18" cy="36" r="6" stroke="#FAF6F0" strokeWidth="2.5" fill="#1B110E" />
                            <circle cx="18" cy="36" r="2" fill="#D4AF37" />
                          </g>
                          {/* Front Wheel */}
                          <g className="animate-wheel-spin origin-[46px_36px]">
                            <circle cx="46" cy="36" r="6" stroke="#FAF6F0" strokeWidth="2.5" fill="#1B110E" />
                            <circle cx="46" cy="36" r="2" fill="#D4AF37" />
                          </g>
                          <defs>
                            <linearGradient id="headlightGlow" x1="48" y1="14" x2="62" y2="15" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#FDE68A" stopOpacity="0.8" />
                              <stop offset="1" stopColor="#FDE68A" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <span>Bengaluru Express Delivery</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-caramel text-white font-bold">
                            45m
                          </span>
                        </div>
                        <p className="text-[11px] text-cream-200/80">
                          Assigned to Big Bakers fleet from MC Layout hub.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Road Dashes Animation */}
                  <div className="relative w-full h-1 mt-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute inset-0 w-[200%] flex gap-2 animate-road-dash">
                      {[...Array(16)].map((_, idx) => (
                        <span key={idx} className="w-4 h-full bg-gold/60 rounded-full shrink-0" />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 3: Item Secured & Ready in Bag */}
              {activeDispatch.phase === 3 && (
                <div className="flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
                  <div className="relative w-12 h-12 rounded-xl bg-white/10 border border-gold/30 overflow-hidden shrink-0">
                    <Image
                      src={activeDispatch.imageUrl}
                      alt={activeDispatch.productName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm text-white truncate">
                        {activeDispatch.productName}
                      </h4>
                      <span className="text-xs font-bold text-gold ml-2 shrink-0">
                        {formatPrice(activeDispatch.price || 699)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-cream-200/70">
                      <span>{activeDispatch.weight}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Added to Cart
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: Fast Action Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveDispatch(null);
                  openCart();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-caramel hover:bg-caramel-dark text-white font-bold text-xs shadow-lg transition-all active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>View Bag ({totalItems})</span>
              </button>
              <Link
                href="/checkout"
                onClick={() => setActiveDispatch(null)}
                className="flex items-center justify-center gap-1 py-2.5 px-4 rounded-xl bg-gold/20 hover:bg-gold/30 border border-gold/40 text-gold-light font-bold text-xs transition-all active:scale-95"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

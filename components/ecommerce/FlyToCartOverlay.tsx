'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { triggerDeliveryDispatch, DispatchEventDetail } from './DeliveryDispatchOverlay';

export interface FlyingFlight {
  id: string;
  imageUrl: string;
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
  productInfo?: DispatchEventDetail
) {
  if (typeof window === 'undefined' || !source) return;

  // On mobile & tablet viewports (< 1024px), skip the flying animation completely as requested
  if (window.innerWidth < 1024) {
    return;
  }

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
    startRect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    },
    targetRect,
  };

  window.dispatchEvent(new CustomEvent(FLY_TO_CART_EVENT, { detail }));

  // Also trigger Live Delivery Boy & Bakery Dispatch overlay
  if (productInfo) {
    setTimeout(() => {
      triggerDeliveryDispatch(productInfo);
    }, 450);
  }
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
    // Ignore audio context issues safely
  }
}

export const FlyToCartOverlay: React.FC = () => {
  const [flights, setFlights] = useState<FlyingFlight[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleFlyEvent = (e: Event) => {
      const customEvent = e as CustomEvent<FlyingFlight>;
      if (!customEvent.detail) return;

      const flight = customEvent.detail;
      setFlights((prev) => [...prev, flight]);

      // Generate pop-out golden sparkles around starting cake
      const sparkCount = 16;
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

      // Schedule Landing Impact on Cart Icon (at 720ms)
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

        for (let j = 0; j < 18; j++) {
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
    return () => window.removeEventListener(FLY_TO_CART_EVENT, handleFlyEvent);
  }, []);

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

  if (flights.length === 0 && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full pointer-events-none shadow-xs"
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
  );
};

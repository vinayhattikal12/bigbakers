'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReducedMotionHero } from './ReducedMotionHero';
import { MobileVideoHero } from './MobileVideoHero';
import { ChevronDown, Sparkles, ArrowRight, Compass, MapPin } from 'lucide-react';

// Exact dynamic frame counts per scene
export const SCENE_FRAME_COUNTS: Record<number, number> = {
  1: 300,
  2: 191,
  3: 198,
};

// 💻 DESKTOP / TABLET GSAP CANVAS COMPONENT (>= 768px)
const DesktopCinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const percentIndicatorRef = useRef<HTMLSpanElement | null>(null);

  // 6 Dynamic Spatial Narrative Stage Refs
  const beat1Ref = useRef<HTMLDivElement | null>(null); // Top-Left (Storefront Entrance 0.0 - 0.16)
  const beat2Ref = useRef<HTMLDivElement | null>(null); // Left-Aligned (Live Kitchen Craft 0.17 - 0.33)
  const beat3Ref = useRef<HTMLDivElement | null>(null); // Right-Aligned (Belgian Truffle Cake 0.34 - 0.50)
  const beat4Ref = useRef<HTMLDivElement | null>(null); // Left-Aligned (The Golden Slice 0.51 - 0.66)
  const beat5Ref = useRef<HTMLDivElement | null>(null); // Right-Aligned (European Desserts 0.67 - 0.83)
  const beat6Ref = useRef<HTMLDivElement | null>(null); // Centered (Grand Finale 0.84 - 1.00)

  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const requestedRef = useRef<Set<string>>(new Set());
  const targetStateRef = useRef<{ scene: number; frame: number; progress: number }>({ scene: 1, frame: 1, progress: 0 });
  const lastDrawnRef = useRef<{ scene: number; frame: number }>({ scene: 0, frame: 0 });

  const getFrameSrc = useCallback((scene: number, frame: number) => {
    const maxF = SCENE_FRAME_COUNTS[scene] || 300;
    const clamped = Math.min(maxF, Math.max(1, frame));
    const padded = String(clamped).padStart(3, '0');
    return `/cinematic/scene${scene}/ezgif-frame-${padded}.webp`;
  }, []);

  // Frame loading helper with caching & decoding
  const loadFrame = useCallback(
    (scene: number, frame: number, priority = false): Promise<HTMLImageElement | null> => {
      const maxF = SCENE_FRAME_COUNTS[scene] || 300;
      const validFrame = Math.min(maxF, Math.max(1, frame));
      const key = `s${scene}-f${validFrame}`;

      const existing = imagesRef.current.get(key);
      if (existing && existing.complete && existing.naturalWidth > 0) {
        return Promise.resolve(existing);
      }
      if (requestedRef.current.has(key)) {
        return Promise.resolve(null);
      }

      requestedRef.current.add(key);

      return new Promise((resolve) => {
        const img = new Image();
        if (priority) {
          (img as any).fetchPriority = 'high';
        }
        img.src = getFrameSrc(scene, validFrame);
        img.onload = () => {
          imagesRef.current.set(key, img);
          if (img.decode) {
            img.decode().then(() => resolve(img)).catch(() => resolve(img));
          } else {
            resolve(img);
          }
        };
        img.onerror = () => {
          requestedRef.current.delete(key);
          resolve(null);
        };
      });
    },
    [getFrameSrc]
  );

  // High-performance Desktop Canvas rendering
  const drawFrame = useCallback((scene: number, frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const maxF = SCENE_FRAME_COUNTS[scene] || 300;
    const validFrame = Math.min(maxF, Math.max(1, frame));
    const key = `s${scene}-f${validFrame}`;
    let img = imagesRef.current.get(key);

    // Fallback: If exact frame is still downloading, find the nearest cached frame
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 30; offset++) {
        const prev = imagesRef.current.get(`s${scene}-f${Math.max(1, validFrame - offset)}`);
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current.get(`s${scene}-f${Math.min(maxF, validFrame + offset)}`);
        if (next && next.complete && next.naturalWidth > 0) {
          img = next;
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width === 0 || height === 0) return;

    const targetWidth = Math.floor(width * dpr);
    const targetHeight = Math.floor(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(width / imgWidth, height / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const x = (width - renderWidth) / 2;
    // For Scene 1 (Shopfront), anchor to top so the full Big Bakers building & signage are clearly visible
    const y = scene === 1 ? Math.max(height - renderHeight, 0) : (height - renderHeight) / 2;

    ctx.drawImage(img, x, y, renderWidth, renderHeight);
    ctx.restore();

    const isExact = img === imagesRef.current.get(key);
    lastDrawnRef.current = isExact ? { scene, frame: validFrame } : { scene: 0, frame: 0 };
  }, []);

  // Lightweight multi-tier background preloading
  useEffect(() => {
    let isCancelled = false;

    // 1. Critical first frames for instant visual display
    loadFrame(1, 1, true).then(() => {
      if (!isCancelled) drawFrame(1, 1);
    });
    loadFrame(2, 1, false);
    loadFrame(3, 1, false);

    // 2. Immediate warm-up: first 15 frames of Scene 1
    for (let f = 2; f <= 15; f++) {
      loadFrame(1, f);
    }

    // 3. Low-priority keyframe milestone preloader using requestIdleCallback
    const preloadMilestones = () => {
      if (isCancelled) return;
      const keyframes: { scene: number; frame: number }[] = [];
      for (let s = 1; s <= 3; s++) {
        const maxF = SCENE_FRAME_COUNTS[s] || 300;
        for (let f = 10; f <= maxF; f += 10) {
          keyframes.push({ scene: s, frame: f });
        }
      }

      let idx = 0;
      const loadNext = () => {
        if (isCancelled || idx >= keyframes.length) return;
        const item = keyframes[idx++];
        loadFrame(item.scene, item.frame);

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNext, { timeout: 250 });
        } else {
          setTimeout(loadNext, 60);
        }
      };

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(loadNext, { timeout: 400 });
      } else {
        setTimeout(loadNext, 200);
      }
    };

    const idleTimer = setTimeout(preloadMilestones, 300);

    return () => {
      isCancelled = true;
      clearTimeout(idleTimer);
    };
  }, [loadFrame, drawFrame]);

  // Smooth UI Parallax helper
  const computeParallax = (p: number, start: number, peakStart: number, peakEnd: number, end: number) => {
    if (p < start || p > end) {
      return { opacity: 0, translateY: 25, active: false };
    }
    if (p >= peakStart && p <= peakEnd) {
      return { opacity: 1, translateY: 0, active: true };
    }
    if (p < peakStart) {
      const norm = (p - start) / (peakStart - start);
      return { opacity: norm, translateY: 25 * (1 - norm), active: norm > 0.4 };
    }
    const norm = (end - p) / (end - peakEnd);
    return { opacity: norm, translateY: -25 * (1 - norm), active: norm > 0.4 };
  };

  const applyBeatStyles = (el: HTMLElement | null, res: { opacity: number; translateY: number; active: boolean }) => {
    if (!el) return;
    el.style.opacity = `${res.opacity}`;
    el.style.transform = `translate3d(0, ${res.translateY}px, 0)`;
    el.style.pointerEvents = res.active ? 'auto' : 'none';
  };

  // Main ScrollTrigger & Render Loop Setup
  useEffect(() => {
    // Only run on desktop/tablet viewports
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    let rafId: number;

    const renderTick = () => {
      const { scene, frame, progress } = targetStateRef.current;

      if (lastDrawnRef.current.scene !== scene || lastDrawnRef.current.frame !== frame) {
        drawFrame(scene, frame);
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress * 100}%`;
      }
      if (percentIndicatorRef.current) {
        percentIndicatorRef.current.innerText = `${Math.round(progress * 100)}%`;
      }

      // Update 6 Dynamic Spatial Narrative Beats
      applyBeatStyles(beat1Ref.current, computeParallax(progress, 0.0, 0.02, 0.12, 0.16));
      applyBeatStyles(beat2Ref.current, computeParallax(progress, 0.16, 0.2, 0.29, 0.33));
      applyBeatStyles(beat3Ref.current, computeParallax(progress, 0.33, 0.37, 0.46, 0.5));
      applyBeatStyles(beat4Ref.current, computeParallax(progress, 0.5, 0.54, 0.62, 0.66));
      applyBeatStyles(beat5Ref.current, computeParallax(progress, 0.66, 0.7, 0.79, 0.83));
      applyBeatStyles(beat6Ref.current, computeParallax(progress, 0.83, 0.87, 0.98, 1.0));

      rafId = requestAnimationFrame(renderTick);
    };

    rafId = requestAnimationFrame(renderTick);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.15,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));

          let sceneNum = 1;
          let frame = 1;

          if (p < 0.3333) {
            sceneNum = 1;
            const norm = p / 0.3333;
            const maxF = SCENE_FRAME_COUNTS[1];
            frame = Math.min(maxF, Math.max(1, Math.floor(norm * (maxF - 1)) + 1));
          } else if (p < 0.6666) {
            sceneNum = 2;
            const norm = (p - 0.3333) / 0.3333;
            const maxF = SCENE_FRAME_COUNTS[2];
            frame = Math.min(maxF, Math.max(1, Math.floor(norm * (maxF - 1)) + 1));
          } else {
            sceneNum = 3;
            const norm = (p - 0.6666) / 0.3334;
            const maxF = SCENE_FRAME_COUNTS[3];
            frame = Math.min(maxF, Math.max(1, Math.floor(norm * (maxF - 1)) + 1));
          }

          targetStateRef.current = { scene: sceneNum, frame, progress: p };

          const currentMaxF = SCENE_FRAME_COUNTS[sceneNum] || 300;
          const isGoingDown = self.direction >= 0;
          const forward = isGoingDown ? 24 : 8;
          const backward = isGoingDown ? 6 : 18;

          for (let offset = -backward; offset <= forward; offset++) {
            const target = frame + offset;
            if (target >= 1 && target <= currentMaxF) {
              loadFrame(sceneNum, target);
            }
          }

          if (frame > currentMaxF - 35 && sceneNum < 3) {
            for (let f = 1; f <= 20; f++) {
              loadFrame(sceneNum + 1, f);
            }
          } else if (frame < 35 && sceneNum > 1) {
            const prevMax = SCENE_FRAME_COUNTS[sceneNum - 1] || 300;
            for (let f = prevMax; f >= prevMax - 20; f--) {
              loadFrame(sceneNum - 1, f);
            }
          }
        },
      });
    }, container);

    const handleResize = () => {
      drawFrame(targetStateRef.current.scene, targetStateRef.current.frame);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame, loadFrame]);

  const scrollToScene = (sceneNum: 1 | 2 | 3) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.offsetTop;
    const totalHeight = container.offsetHeight - window.innerHeight;
    const targetProgress = sceneNum === 1 ? 0 : sceneNum === 2 ? 0.38 : 0.72;
    const targetY = containerTop + totalHeight * targetProgress;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative h-[380vh] bg-cocoa-deep">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        {/* Natural True-to-Life Crisp Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block pointer-events-none select-none filter brightness-[1.18] contrast-[1.06] saturate-[1.03]"
        />

        {/* Minimal Crisp Horizon Vignettes */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />

        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-30 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-caramel via-gold to-peach transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>

        {/* 🌟 6 DYNAMIC SPATIAL NARRATIVE BEATS */}
        <div
          ref={beat1Ref}
          className="absolute inset-0 flex flex-col justify-center sm:justify-start pt-28 sm:pt-36 px-6 sm:px-14 lg:px-20 z-20 will-change-transform pointer-events-none"
          style={{ opacity: 1, transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="max-w-xl space-y-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider shadow-lg">
              <MapPin className="w-3.5 h-3.5" />
              <span>Vijaynagar Flagship Store • Bengaluru</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Step Into <span className="text-caramel italic">Warmth.</span>
            </h1>

            <p className="text-sm sm:text-base text-cream-100/90 max-w-lg font-normal leading-relaxed">
              Where authentic European patisserie craft meets Bengaluru&apos;s most cherished celebration cakes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/menu"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-caramel to-amber-700 text-white font-bold text-xs sm:text-sm shadow-[0_8px_25px_rgba(217,119,6,0.35)] border border-amber-400/40 hover:brightness-110 hover:scale-105 transition-all group pointer-events-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
                <span>Explore 190+ Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/stores"
                className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white font-semibold text-xs sm:text-sm hover:scale-105 transition-all shadow-lg pointer-events-auto group"
              >
                <MapPin className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span>Visit Store</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={beat2Ref}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-14 lg:px-20 z-20 will-change-transform pointer-events-none"
          style={{ opacity: 0, transform: 'translate3d(0, 25px, 0)' }}
        >
          <div className="max-w-xl space-y-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Kitchen Sanctuary</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              The Art of <span className="text-caramel italic">the Craft.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-100/90 max-w-lg font-normal leading-relaxed">
              Slow-churned pure dairy cream, stone-milled flour, and 54% dark Belgian chocolate folded by hand every morning.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/cakes"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 transition-all"
              >
                <span>Celebration Cakes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={beat3Ref}
          className="absolute inset-0 flex flex-col justify-center items-end text-left sm:text-right px-6 sm:px-14 lg:px-20 z-20 will-change-transform pointer-events-none"
          style={{ opacity: 0, transform: 'translate3d(0, 25px, 0)' }}
        >
          <div className="max-w-xl space-y-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] flex flex-col sm:items-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hallmark Creation • ₹699</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Belgian Truffle <span className="text-caramel italic">Royale.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-100/90 max-w-lg font-normal leading-relaxed">
              Enrobed in tempered 54% dark Callebaut ganache with an ultra-glossy mirror finish and edible 24K gold dust.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/product/belgian-truffle-cake"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 transition-all"
              >
                <span>Order Truffle Cake • ₹699</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={beat4Ref}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-14 lg:px-20 z-20 will-change-transform pointer-events-none"
          style={{ opacity: 0, transform: 'translate3d(0, 25px, 0)' }}
        >
          <div className="max-w-xl space-y-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Golden Slice</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Melt-in-Mouth <span className="text-caramel italic">Symphony.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-100/90 max-w-lg font-normal leading-relaxed">
              Multi-tiered moist cocoa chiffon brushed with vanilla syrup and paired with rich hazelnut feuilletine crunch.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/cakes"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 transition-all"
              >
                <span>Explore All Cakes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={beat5Ref}
          className="absolute inset-0 flex flex-col justify-center items-end text-left sm:text-right px-6 sm:px-14 lg:px-20 z-20 will-change-transform pointer-events-none"
          style={{ opacity: 0, transform: 'translate3d(0, 25px, 0)' }}
        >
          <div className="max-w-xl space-y-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] flex flex-col sm:items-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>European Patisserie</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
              Cheesecakes & <span className="text-caramel italic">Tiramisu.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-100/90 max-w-lg font-normal leading-relaxed">
              New York dense baked Lotus Biscoff cheesecakes, Italian mascarpone tiramisu, and Mexican Tres Leches.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/desserts"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 transition-all"
              >
                <span>Taste Desserts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={beat6Ref}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 sm:px-12 z-20 will-change-transform pointer-events-none"
          style={{ opacity: 0, transform: 'translate3d(0, 25px, 0)' }}
        >
          <div className="max-w-2xl space-y-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Big Bakers Bengaluru</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight">
              Life is Sweeter <span className="text-caramel italic">Together.</span>
            </h2>

            <p className="text-sm sm:text-lg text-cream-100/90 max-w-xl font-normal leading-relaxed">
              Handcrafted cakes, artisan desserts, and roasted snacks delivered fresh across Bengaluru.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <Link
                href="/menu"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-caramel to-amber-700 text-white font-bold text-sm shadow-[0_8px_25px_rgba(217,119,6,0.35)] border border-amber-400/40 hover:brightness-110 hover:scale-105 transition-all group pointer-events-auto"
              >
                <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/stores"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/60 hover:bg-white/20 backdrop-blur-xl border border-white/30 text-white font-semibold text-sm hover:scale-105 transition-all shadow-lg pointer-events-auto group"
              >
                <MapPin className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span>Vijaynagar Store</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-cream-100 font-semibold pointer-events-auto shadow-lg">
            <button
              onClick={() => scrollToScene(1)}
              className="px-3 py-1 rounded-full hover:bg-white/20 transition-all text-xs font-bold flex items-center gap-1.5 text-white"
            >
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span>01 Store</span>
            </button>
            <span className="text-white/30">•</span>
            <button
              onClick={() => scrollToScene(2)}
              className="px-3 py-1 rounded-full hover:bg-white/20 transition-all text-xs font-bold flex items-center gap-1.5 text-white/80 hover:text-white"
            >
              <span>02 Truffles</span>
            </button>
            <span className="text-white/30">•</span>
            <button
              onClick={() => scrollToScene(3)}
              className="px-3 py-1 rounded-full hover:bg-white/20 transition-all text-xs font-bold flex items-center gap-1.5 text-white/80 hover:text-white"
            >
              <span>03 Treats</span>
            </button>
            <span className="text-white/30">•</span>
            <span ref={percentIndicatorRef} className="px-2 font-mono text-gold text-xs">
              0%
            </span>
          </div>

          <div className="flex items-center gap-3 pointer-events-auto">
            <Link
              href="/menu"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cream-50/20 hover:bg-cream-50/30 backdrop-blur-md border border-white/25 text-cream-100 text-xs font-semibold transition-all hover:scale-105 shadow-md"
            >
              <Compass className="w-3.5 h-3.5 text-gold" />
              <span>Full Menu</span>
            </Link>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-cream-200/80 font-medium animate-bounce bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
              <span>Scroll to scrub</span>
              <ChevronDown className="w-4 h-4 text-gold" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 🌟 MAIN RESPONSIVE HYBRID CINEMATIC HERO
export const CinematicHero: React.FC = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop, { passive: true });

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', checkDesktop);
    };
  }, []);

  if (isReducedMotion) {
    return <ReducedMotionHero />;
  }

  return (
    <>
      {/* 📱 MOBILE VIEW (< 768px): Only mounted on mobile devices */}
      {(!mounted || !isDesktop) && (
        <div className="block md:hidden">
          <MobileVideoHero />
        </div>
      )}

      {/* 💻 DESKTOP & TABLET VIEW (>= 768px): Only mounted on desktop/tablet */}
      {mounted && isDesktop && (
        <div className="hidden md:block">
          <DesktopCinematicHero />
        </div>
      )}
    </>
  );
};

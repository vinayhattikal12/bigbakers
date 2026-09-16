'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReducedMotionHero } from './ReducedMotionHero';
import { ChevronDown, Sparkles, ArrowRight, Compass, Cake, UtensilsCrossed, Cookie, Flame, MapPin } from 'lucide-react';

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const sceneIndicatorRef = useRef<HTMLSpanElement | null>(null);
  const percentIndicatorRef = useRef<HTMLSpanElement | null>(null);

  // 6 Dynamic Spatial Narrative Stage Refs (Apple / Nike Spatial Editorial Flow)
  const beat1Ref = useRef<HTMLDivElement | null>(null); // Top-Left (Storefront Entrance 0.0 - 0.16)
  const beat2Ref = useRef<HTMLDivElement | null>(null); // Left-Aligned (Live Kitchen Craft 0.17 - 0.33)
  const beat3Ref = useRef<HTMLDivElement | null>(null); // Right-Aligned (Belgian Truffle Cake 0.34 - 0.50)
  const beat4Ref = useRef<HTMLDivElement | null>(null); // Left-Aligned (The Golden Slice 0.51 - 0.66)
  const beat5Ref = useRef<HTMLDivElement | null>(null); // Right-Aligned (European Desserts 0.67 - 0.83)
  const beat6Ref = useRef<HTMLDivElement | null>(null); // Centered (Grand Finale 0.84 - 1.00)

  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const activeFrameRef = useRef<{ scene: number; frame: number }>({ scene: 1, frame: 1 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const getFrameSrc = useCallback((scene: number, frame: number) => {
    const padded = String(Math.min(300, Math.max(1, frame))).padStart(3, '0');
    return `/cinematic/scene${scene}/ezgif-frame-${padded}.webp`;
  }, []);

  const drawFrame = useCallback((scene: number, frame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const key = `s${scene}-f${frame}`;
    let img = imagesRef.current.get(key);

    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 30; offset++) {
        const prev = imagesRef.current.get(`s${scene}-f${Math.max(1, frame - offset)}`);
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current.get(`s${scene}-f${Math.min(300, frame + offset)}`);
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

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(width / imgWidth, height / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const x = (width - renderWidth) / 2;
    const y = (height - renderHeight) / 2;

    ctx.drawImage(img, x, y, renderWidth, renderHeight);
    ctx.restore();
  }, []);

  const loadFrame = useCallback(
    (scene: number, frame: number) => {
      const key = `s${scene}-f${frame}`;
      if (imagesRef.current.has(key)) return;

      const img = new Image();
      img.src = getFrameSrc(scene, frame);
      img.onload = () => {
        imagesRef.current.set(key, img);
        if (activeFrameRef.current.scene === scene && activeFrameRef.current.frame === frame) {
          drawFrame(scene, frame);
        }
      };
    },
    [getFrameSrc, drawFrame]
  );

  useEffect(() => {
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1, 1);
    firstImg.onload = () => {
      imagesRef.current.set('s1-f1', firstImg);
      drawFrame(1, 1);
    };

    const s2First = new Image();
    s2First.src = getFrameSrc(2, 1);
    s2First.onload = () => imagesRef.current.set('s2-f1', s2First);

    const s3First = new Image();
    s3First.src = getFrameSrc(3, 1);
    s3First.onload = () => imagesRef.current.set('s3-f1', s3First);

    let cur = 2;
    const timer = setInterval(() => {
      if (cur <= 60) {
        loadFrame(1, cur);
        cur++;
      } else {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [getFrameSrc, drawFrame, loadFrame]);

  const scrollToScene = (sceneNum: 1 | 2 | 3) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.offsetTop;
    const totalHeight = container.offsetHeight - window.innerHeight;
    const targetProgress = sceneNum === 1 ? 0 : sceneNum === 2 ? 0.38 : 0.72;
    const targetY = containerTop + totalHeight * targetProgress;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // Helper to smoothly calculate opacity and translateY for a range
  const computeParallax = (p: number, start: number, peakStart: number, peakEnd: number, end: number) => {
    if (p < start || p > end) {
      return { opacity: 0, translateY: 25, active: false };
    }
    if (p >= peakStart && p <= peakEnd) {
      return { opacity: 1, translateY: 0, active: true };
    }
    if (p < peakStart) {
      const norm = (p - start) / (peakStart - start);
      return { opacity: norm, translateY: 25 * (1 - norm), active: norm > 0.3 };
    }
    const norm = (p - peakEnd) / (end - peakEnd);
    return { opacity: 1 - norm, translateY: -25 * norm, active: (1 - norm) > 0.3 };
  };

  useEffect(() => {
    if (isReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = Math.max(0, Math.min(1, self.progress));

          let sceneNum = 1;
          let frame = 1;

          if (p < 0.3333) {
            sceneNum = 1;
            const norm = p / 0.3333;
            frame = Math.min(300, Math.max(1, Math.floor(norm * 299) + 1));
          } else if (p < 0.6666) {
            sceneNum = 2;
            const norm = (p - 0.3333) / 0.3333;
            frame = Math.min(300, Math.max(1, Math.floor(norm * 299) + 1));
          } else {
            sceneNum = 3;
            const norm = (p - 0.6666) / 0.3334;
            frame = Math.min(300, Math.max(1, Math.floor(norm * 299) + 1));
          }

          activeFrameRef.current = { scene: sceneNum, frame };

          // 1. Direct Canvas Draw
          drawFrame(sceneNum, frame);

          // 2. Buffer Preload
          for (let offset = -5; offset <= 30; offset++) {
            const target = frame + offset;
            if (target >= 1 && target <= 300) {
              loadFrame(sceneNum, target);
            }
          }

          // 3. Update HUD Bar
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${p * 100}%`;
          }
          if (sceneIndicatorRef.current) {
            sceneIndicatorRef.current.innerText = `Scene ${sceneNum}`;
          }
          if (percentIndicatorRef.current) {
            percentIndicatorRef.current.innerText = `${Math.round(p * 100)}%`;
          }

          // 4. Dynamic Spatial Narrative Transitions (6 Adaptive Spatial Beats)
          const applyStyles = (el: HTMLElement | null, res: { opacity: number; translateY: number; active: boolean }) => {
            if (!el) return;
            el.style.opacity = `${res.opacity}`;
            el.style.transform = `translate3d(0, ${res.translateY}px, 0)`;
            el.style.pointerEvents = res.active ? 'auto' : 'none';
          };

          // Beat 1: Top-Left (Entrance 0.0 -> 0.16)
          applyStyles(beat1Ref.current, computeParallax(p, 0.0, 0.02, 0.12, 0.16));

          // Beat 2: Left-Aligned Middle (Live Kitchen Sanctuary 0.17 -> 0.33)
          applyStyles(beat2Ref.current, computeParallax(p, 0.16, 0.20, 0.29, 0.33));

          // Beat 3: Right-Aligned Middle (Belgian Truffle Turntable 0.34 -> 0.50)
          applyStyles(beat3Ref.current, computeParallax(p, 0.33, 0.37, 0.46, 0.50));

          // Beat 4: Left-Aligned Middle (The Golden Slice & Texture 0.51 -> 0.66)
          applyStyles(beat4Ref.current, computeParallax(p, 0.50, 0.54, 0.62, 0.66));

          // Beat 5: Right-Aligned Middle (European Desserts Showcase 0.67 -> 0.83)
          applyStyles(beat5Ref.current, computeParallax(p, 0.66, 0.70, 0.79, 0.83));

          // Beat 6: Center-Aligned Lower (Grand Finale 0.84 -> 1.00)
          applyStyles(beat6Ref.current, computeParallax(p, 0.83, 0.87, 0.98, 1.00));
        },
      });
    }, container);

    drawFrame(1, 1);

    const handleResize = () => {
      drawFrame(activeFrameRef.current.scene, activeFrameRef.current.frame);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [isReducedMotion, drawFrame, loadFrame]);

  if (isReducedMotion) {
    return <ReducedMotionHero />;
  }

  return (
    <section ref={containerRef} className="relative h-[520vh] bg-cocoa-deep">
      {/* Viewport locked sticky container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-cocoa-deep">
        {/* Direct Scrubbing Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Ambient Contrast Gradients */}
        <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-cocoa-deep/80 via-cocoa-deep/30 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-cocoa-deep/90 via-cocoa-deep/40 to-transparent pointer-events-none z-10" />

        {/* Top Progress Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-30 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-caramel via-gold to-peach transition-all duration-75"
            style={{ width: '0%' }}
          />
        </div>


        {/* ========================================================
            🌟 6 DYNAMIC SPATIAL NARRATIVE BEATS
            ======================================================== */}

        {/* 🌟 BEAT 1: Top-Left / Upper-Third (Storefront Entrance • 0.0 - 0.16) */}
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
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-xs sm:text-sm shadow-2xl hover:scale-105 transition-all"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/story"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-xs sm:text-sm transition-all"
              >
                <span>Our Story</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 🌟 BEAT 2: Left-Aligned Middle (Live Kitchen Sanctuary • 0.17 - 0.33) */}
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

        {/* 🌟 BEAT 3: Right-Aligned Middle (Belgian Truffle Spotlight • 0.34 - 0.50) */}
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

        {/* 🌟 BEAT 4: Left-Aligned Middle (The Golden Slice & Texture • 0.51 - 0.66) */}
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

        {/* 🌟 BEAT 5: Right-Aligned Middle (European Desserts Showcase • 0.67 - 0.83) */}
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

        {/* 🌟 BEAT 6: Center-Aligned Lower (Grand Finale • 0.84 - 1.00) */}
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
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-caramel hover:bg-caramel-dark text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/stores"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/50 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-gold" />
                <span>Vijaynagar Store</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Interactive Scene Jumper & Full Menu Shortcut */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
          {/* Scene Switcher */}
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

          {/* Quick Menu Shortcut */}
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

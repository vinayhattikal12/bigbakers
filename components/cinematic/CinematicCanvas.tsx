'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

interface CinematicCanvasProps {
  currentFrame: number;
  totalFrames: number;
  activeScene: 1 | 2 | 3;
  className?: string;
  onLoaded?: () => void;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  currentFrame,
  totalFrames = 300,
  activeScene,
  className,
  onLoaded,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const loadingQueueRef = useRef<Set<string>>(new Set());

  // Primary path uses optimized WebP frames with zero lag
  const getFramePath = useCallback((sceneIndex: number, frameIndex: number, ext: 'webp' | 'png' = 'webp') => {
    const padded = String(Math.min(300, Math.max(1, frameIndex))).padStart(3, '0');
    return `/cinematic/scene${sceneIndex}/ezgif-frame-${padded}.${ext}`;
  }, []);

  // Draw frame to canvas with aspect cover and DPI awareness
  const drawFrame = useCallback((sceneIndex: number, frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const key = `scene${sceneIndex}-${frameIndex}`;
    let img = imagesRef.current.get(key);

    // If exact frame is not yet decoded, find closest available cached frame in the same scene
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let offset = 1; offset <= 20; offset++) {
        const prev = imagesRef.current.get(`scene${sceneIndex}-${Math.max(1, frameIndex - offset)}`);
        if (prev && prev.complete && prev.naturalWidth > 0) {
          img = prev;
          break;
        }
        const next = imagesRef.current.get(`scene${sceneIndex}-${Math.min(300, frameIndex + offset)}`);
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

    // Aspect cover calculations
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(width / imgWidth, height / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const x = (width - renderWidth) / 2;
    const y = (height - renderHeight) / 2;

    ctx.drawImage(img, x, y, renderWidth, renderHeight);

    // Cinematic dark vignette gradient overlay for pristine text readability
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(45, 27, 22, 0.55)');
    gradient.addColorStop(0.25, 'rgba(45, 27, 22, 0.2)');
    gradient.addColorStop(0.75, 'rgba(45, 27, 22, 0.3)');
    gradient.addColorStop(1, 'rgba(45, 27, 22, 0.75)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();
  }, []);

  // Preload a specific frame (tries WebP first, falls back to PNG)
  const preloadFrame = useCallback(
    (sceneIndex: number, frameIndex: number): Promise<HTMLImageElement> => {
      const key = `scene${sceneIndex}-${frameIndex}`;
      const cached = imagesRef.current.get(key);
      if (cached && cached.complete && cached.naturalWidth > 0) {
        return Promise.resolve(cached);
      }

      if (loadingQueueRef.current.has(key)) {
        return new Promise((resolve) => {
          const check = setInterval(() => {
            const img = imagesRef.current.get(key);
            if (img && img.complete) {
              clearInterval(check);
              resolve(img);
            }
          }, 20);
        });
      }

      loadingQueueRef.current.add(key);

      return new Promise((resolve) => {
        const img = new (window as any).Image();
        img.src = getFramePath(sceneIndex, frameIndex, 'webp');
        img.onload = () => {
          imagesRef.current.set(key, img);
          loadingQueueRef.current.delete(key);
          if (sceneIndex === activeScene && frameIndex === currentFrame) {
            drawFrame(sceneIndex, frameIndex);
          }
          resolve(img);
        };
        img.onerror = () => {
          // Fallback to PNG if WebP is unavailable
          const fallbackPng = new (window as any).Image();
          fallbackPng.src = getFramePath(sceneIndex, frameIndex, 'png');
          fallbackPng.onload = () => {
            imagesRef.current.set(key, fallbackPng);
            loadingQueueRef.current.delete(key);
            if (sceneIndex === activeScene && frameIndex === currentFrame) {
              drawFrame(sceneIndex, frameIndex);
            }
            resolve(fallbackPng);
          };
          fallbackPng.onerror = () => {
            loadingQueueRef.current.delete(key);
            resolve(img);
          };
        };
      });
    },
    [getFramePath, activeScene, currentFrame, drawFrame]
  );

  // Initial load: Preload key frames
  useEffect(() => {
    preloadFrame(1, 1).then(() => {
      setIsFirstFrameLoaded(true);
      drawFrame(1, 1);
      onLoaded?.();
    });

    preloadFrame(2, 1);
    preloadFrame(3, 1);

    // Warm up first 30 frames of Scene 1
    for (let f = 2; f <= 30; f++) {
      preloadFrame(1, f);
    }
  }, [preloadFrame, drawFrame, onLoaded]);

  // Lookahead preloading around active scene and frame
  useEffect(() => {
    const windowSize = 25;
    for (let offset = -5; offset <= windowSize; offset++) {
      const target = currentFrame + offset;
      if (target >= 1 && target <= 300) {
        preloadFrame(activeScene, target);
      }
    }
  }, [currentFrame, activeScene, preloadFrame]);

  // Re-draw when frame changes
  useEffect(() => {
    drawFrame(activeScene, currentFrame);
  }, [currentFrame, activeScene, isFirstFrameLoaded, drawFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      drawFrame(activeScene, currentFrame);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [activeScene, currentFrame, drawFrame]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-cocoa-deep ${className || ''}`}>
      {/* Immediate High-Priority Big Bakers Store Poster Layer (Ensures 0ms black screen) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/cinematic/scene1/ezgif-frame-001.webp"
          alt="Big Bakers Store Vijaynagar Bengaluru"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Ambient Warm Gradient Overlay matching Canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa-deep/60 via-cocoa-deep/20 to-cocoa-deep/80" />
      </div>

      {/* Dynamic Scrubbing Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="relative z-10 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: isFirstFrameLoaded ? 1 : 0 }}
      />
    </div>
  );
};

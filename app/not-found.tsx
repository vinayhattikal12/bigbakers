import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 min-h-[85vh] bg-cream-100 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center space-y-6 bg-white p-10 sm:p-14 rounded-3xl border border-cream-300 shadow-sm">
        {/* Playful bakery illustration / badge */}
        <div className="w-24 h-24 mx-auto rounded-full bg-peach flex items-center justify-center text-4xl shadow-inner animate-bounce">
          🍪
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel">
            404 • Page Not Found
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-cocoa tracking-tight">
            Looks Like This Crumb Got Lost.
          </h1>
          <p className="text-xs sm:text-sm text-cocoa/70 max-w-sm mx-auto leading-relaxed">
            The page or treat you&apos;re looking for might have been eaten, baked fresh elsewhere, or moved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button variant="primary" size="md">
              <Home className="w-4 h-4 mr-2" />
              <span>Back to Big Bakers</span>
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" size="md">
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

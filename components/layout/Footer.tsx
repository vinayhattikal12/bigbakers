'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/ui/BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-cocoa-deep text-cream-100 border-t border-caramel/20 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-caramel/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-cream-200/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-sm text-cream-200/70 max-w-sm leading-relaxed">
              Bengaluru&apos;s premier destination for handcrafted celebration cakes, European artisan desserts, Belgian chocolate truffles, and oven-fresh snacks in Vijaynagar. Baked fresh daily with pure dairy cream and natural ingredients.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-caramel mb-2">
                Join the Sweet Society
              </p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-2xl border border-emerald-800/40">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to Big Bakers! Check your inbox for 15% off.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-2.5 bg-cocoa text-xs rounded-full border border-caramel/30 text-cream-100 placeholder:text-cream-200/40 focus:outline-none focus:border-caramel"
                  />
                  <Button variant="secondary" size="sm" type="submit">
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <p className="font-serif text-base font-bold text-white tracking-wide">Cravings</p>
            <ul className="space-y-2 text-xs text-cream-200/75">
              <li>
                <Link href="/cakes" className="hover:text-caramel transition-colors">
                  Celebration Cakes
                </Link>
              </li>
              <li>
                <Link href="/cakes" className="hover:text-caramel transition-colors">
                  Belgian Truffle Gateaux
                </Link>
              </li>
              <li>
                <Link href="/desserts" className="hover:text-caramel transition-colors">
                  Baked Cheesecakes
                </Link>
              </li>
              <li>
                <Link href="/desserts" className="hover:text-caramel transition-colors">
                  Italian Tiramisu
                </Link>
              </li>
              <li>
                <Link href="/treats" className="hover:text-caramel transition-colors">
                  Artisan Donuts & Cupcakes
                </Link>
              </li>
              <li>
                <Link href="/snacks" className="hover:text-caramel transition-colors">
                  Peri Peri Makhana & Breads
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Story */}
          <div className="space-y-3">
            <p className="font-serif text-base font-bold text-white tracking-wide">Big Bakers</p>
            <ul className="space-y-2 text-xs text-cream-200/75">
              <li>
                <Link href="/story" className="hover:text-caramel transition-colors">
                  Our Beginning & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-caramel transition-colors">
                  The Master Bakers
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-caramel transition-colors">
                  Vijaynagar Store
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-caramel transition-colors">
                  Full Menu & Gifting
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-caramel transition-colors">
                  Dietary & Allergen Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Vijaynagar Store Location */}
          <div className="space-y-3">
            <p className="font-serif text-base font-bold text-white tracking-wide">Visit Our Store</p>
            <div className="space-y-2.5 text-xs text-cream-200/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-caramel flex-shrink-0 mt-0.5" />
                <span>17th Cross, MC Layout, Vijaynagar, Bengaluru, 560040</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-caramel flex-shrink-0" />
                <span>8:00 AM – 10:30 PM Everyday</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-caramel flex-shrink-0" />
                <span>+91 80 2330 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-caramel flex-shrink-0" />
                <span>hello@bigbakers.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/50">
          <p>© {new Date().getFullYear()} Big Bakers Bengaluru. All rights reserved. Handcrafted with passion in Vijaynagar.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-cream-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-cream-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-cream-200 transition-colors cursor-pointer">FSSAI Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

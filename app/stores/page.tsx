'use client';

import React from 'react';
import Image from 'next/image';
import { stores } from '@/data/stores';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export default function StoresPage() {
  const store = stores[0]; // Vijaynagar store

  return (
    <div className="pt-24 pb-24 min-h-screen bg-cream-100">
      {/* Hero */}
      <section className="relative bg-cocoa-deep text-cream-100 py-16 sm:py-24 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/stores/indiranagar-store.webp"
            alt="Big Bakers Vijaynagar Store"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa-deep via-cocoa-deep/80 to-cocoa-deep/60" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-gold text-xs font-semibold uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-gold" />
            <span>Vijaynagar, Bengaluru</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-6xl font-black text-white tracking-tight">
            Our Flagship <span className="text-caramel italic">Bakery Store</span>
          </h1>
          <p className="text-sm sm:text-base text-cream-200/80 max-w-xl mx-auto leading-relaxed">
            Visit our live artisanal kitchen and experience counter in Vijaynagar, Bengaluru. Freshly baked cakes, handcrafted desserts, and warm savory bites.
          </p>
        </div>
      </section>

      {/* Single Vijaynagar Store Feature Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl border border-cream-300 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:h-full w-full bg-cream-200 min-h-[320px]">
            <Image
              src={store.image}
              alt={store.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>Open Today</span>
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-caramel">
                  Flagship Boutique & Kitchen
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
                  {store.name}
                </h2>
              </div>

              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-cocoa/80 leading-relaxed">
                <MapPin className="w-4 h-4 text-caramel flex-shrink-0 mt-1" />
                <span>{store.address}, {store.city}, {store.state} - {store.pincode}</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cocoa/80">
                <Clock className="w-4 h-4 text-caramel flex-shrink-0" />
                <span>{store.hours}</span>
              </div>

              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-cocoa/80">
                <Phone className="w-4 h-4 text-caramel flex-shrink-0" />
                <a href={`tel:${store.phone}`} className="hover:text-caramel font-semibold">
                  {store.phone}
                </a>
              </div>

              {/* Amenities */}
              <div className="space-y-2 pt-2 border-t border-cream-200">
                <span className="text-xs font-bold uppercase tracking-wider text-cocoa/60 block">
                  Store Amenities
                </span>
                <div className="flex flex-wrap gap-2">
                  {store.features.map((feat) => (
                    <span
                      key={feat}
                      className="text-xs font-semibold text-cocoa/80 bg-cream-100 px-3 py-1 rounded-full border border-cream-300"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-cream-200 flex flex-wrap gap-3">
              <a
                href={store.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[180px]"
              >
                <Button variant="primary" size="lg" className="w-full justify-center">
                  <Navigation className="w-4 h-4 mr-2" />
                  <span>Get Directions on Maps</span>
                </Button>
              </a>
              <a href={`tel:${store.phone}`}>
                <Button variant="outline" size="lg">
                  <Phone className="w-4 h-4 mr-2 text-caramel" />
                  <span>Call Store</span>
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Home Delivery Banner */}
        <div className="bg-peach/60 rounded-3xl p-6 sm:p-8 border border-peach-warm/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-cocoa">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-white rounded-2xl text-caramel shadow-xs">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Prefer Home Delivery?</h3>
              <p className="text-xs text-cocoa/70">
                Order online and get your cake delivered fresh from our Vijaynagar kitchen within 2 hours.
              </p>
            </div>
          </div>
          <a href="/menu">
            <Button variant="secondary" size="md">
              <span>Order Online</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

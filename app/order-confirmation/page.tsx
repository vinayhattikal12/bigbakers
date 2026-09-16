'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/formatters';
import { Order } from '@/lib/ecommerce/types';
import { ecommerceService } from '@/lib/ecommerce/mock-adapter';
import {
  CheckCircle2,
  Package,
  Truck,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderNumber = searchParams.get('orderNumber') || 'BB-' + Math.floor(100000 + Math.random() * 900000);

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      ecommerceService.getOrderById(orderId).then((res) => {
        if (res) setOrder(res);
      });
    }
  }, [orderId]);

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Confirmed Hero Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-sm text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel">
            Order Confirmed & Sent to Kitchen
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-cocoa tracking-tight">
            Bite Into Happiness!
          </h1>
          <p className="text-sm text-cocoa/70 max-w-md mx-auto">
            Thank you for ordering with Big Bakers. Our master pastry chefs are preparing your treats with pure ingredients and utmost care.
          </p>
        </div>

        {/* Order Details Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 p-4 bg-cream-50 rounded-2xl border border-cream-300 text-xs text-cocoa">
          <div>
            <span className="text-cocoa/50 block">Order Number</span>
            <strong className="font-mono text-sm text-cocoa">{orderNumber}</strong>
          </div>
          <div className="h-6 w-px bg-cream-300 hidden sm:block" />
          <div>
            <span className="text-cocoa/50 block">Estimated Delivery</span>
            <strong className="text-sm text-emerald-800">Within 2 Hours in Bengaluru</strong>
          </div>
          <div className="h-6 w-px bg-cream-300 hidden sm:block" />
          <div>
            <span className="text-cocoa/50 block">Kitchen Location</span>
            <strong className="text-sm text-cocoa">Vijaynagar Flagship</strong>
          </div>
        </div>

        {/* Live Progress Stepper */}
        <div className="pt-4 border-t border-cream-200">
          <p className="text-xs font-bold uppercase tracking-wider text-cocoa/60 text-left mb-4">
            Live Order Status
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Confirmed', done: true },
              { label: 'In the Oven', done: true, active: true },
              { label: 'Quality Pack', done: false },
              { label: 'Out for Delivery', done: false },
            ].map((step) => (
              <div key={step.label} className="text-center space-y-1.5">
                <div
                  className={`h-2 rounded-full ${
                    step.done
                      ? step.active
                        ? 'bg-caramel animate-pulse'
                        : 'bg-emerald-600'
                      : 'bg-cream-200'
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-xs font-semibold ${
                    step.done ? 'text-cocoa' : 'text-cocoa/40'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Details if present */}
        {order && (
          <div className="text-left bg-cream-50 p-6 rounded-2xl border border-cream-300 space-y-4">
            <h3 className="font-serif text-base font-bold text-cocoa">Delivery Details</h3>
            <div className="text-xs text-cocoa/80 space-y-1">
              <p>
                <strong>Recipient:</strong> {order.customer.fullName} ({order.customer.phone})
              </p>
              <p>
                <strong>Address:</strong> {order.delivery.addressLine1}
                {order.delivery.apartment ? `, ${order.delivery.apartment}` : ''}, {order.delivery.city} - {order.delivery.pincode}
              </p>
              <p>
                <strong>Total Paid:</strong> {formatPrice(order.total)} ({order.paymentMethod.toUpperCase()})
              </p>
            </div>
          </div>
        )}

        {/* Next Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/menu">
            <Button variant="primary" size="lg">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Explore More Treats</span>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">
              <span>Back to Homepage</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-cream-100 flex items-center justify-center">
      <Suspense
        fallback={
          <div className="p-8 text-center text-cocoa font-serif">
            Loading your order confirmation...
          </div>
        }
      >
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}

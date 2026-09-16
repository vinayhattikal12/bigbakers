'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import { ecommerceService } from '@/lib/ecommerce/mock-adapter';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, deliveryFee, total, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [addressLine1, setAddressLine1] = useState('');
  const [apartment, setApartment] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city] = useState('Bengaluru');
  const [state] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('Today (Within 2 Hours)');
  const [deliverySlot, setDeliverySlot] = useState('Immediate Fresh Delivery');
  const [instructions, setInstructions] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid Email is required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) errs.phone = 'Valid 10-digit Phone is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!addressLine1.trim()) errs.addressLine1 = 'Delivery Address is required';
    if (!pincode.trim() || pincode.length !== 6) errs.pincode = 'Valid 6-digit Bengaluru Pincode is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const order = await ecommerceService.createOrder({
        customer: { fullName, email, phone },
        delivery: {
          addressLine1,
          apartment,
          landmark,
          city,
          state,
          pincode,
          deliveryDate,
          deliverySlot,
          instructions,
        },
        items,
        paymentMethod,
        subtotal,
        discount,
        deliveryFee,
        total,
      });

      clearCart();
      router.push(`/order-confirmation?orderId=${order.id}&orderNumber=${order.orderNumber}`);
    } catch (e) {
      console.error('Failed to create order', e);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-4 bg-white p-8 rounded-3xl border border-cream-300">
          <p className="font-serif text-2xl font-bold text-cocoa">No items in bag</p>
          <p className="text-xs text-cocoa/60">Add some delicious treats before checking out.</p>
          <Link href="/menu">
            <Button variant="primary" size="md">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-cream-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Checkout Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-300 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Secure Bengaluru Checkout
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-cocoa tracking-tight mt-1">
              Complete Your Order
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-cocoa/60">
            <Lock className="w-3.5 h-3.5 text-caramel" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        {/* Stepper Header */}
        <div className="grid grid-cols-3 gap-3 bg-white p-3 rounded-2xl border border-cream-300 max-w-lg mx-auto">
          {[
            { num: 1, label: '01 Contact' },
            { num: 2, label: '02 Delivery' },
            { num: 3, label: '03 Payment' },
          ].map((s) => (
            <div
              key={s.num}
              className={`text-center py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                step === s.num
                  ? 'bg-cocoa text-cream-50 shadow-xs'
                  : step > s.num
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-cocoa/40 bg-cream-50'
              }`}
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* Form + Summary Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Form Step */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-cream-300 shadow-sm space-y-6">
            {/* STEP 1: CONTACT */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-1">
                  <h2 className="font-serif text-xl font-bold text-cocoa">01. Contact Information</h2>
                  <p className="text-xs text-cocoa/60">Where should we send your order confirmation and tracking?</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Arjun Raman"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel"
                    />
                    {errors.fullName && <p className="text-[11px] text-berry-crimson mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="arjun@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel"
                      />
                      {errors.email && <p className="text-[11px] text-berry-crimson mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                        Phone Number (for Delivery Agent) *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel"
                      />
                      {errors.phone && <p className="text-[11px] text-berry-crimson mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button variant="primary" size="lg" onClick={handleNextStep}>
                    <span>Continue to Delivery</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: DELIVERY */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-cocoa">02. Bengaluru Delivery Address</h2>
                    <p className="text-xs text-cocoa/60">Chilled courier dispatched from our Vijaynagar kitchen.</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs text-caramel font-semibold flex items-center gap-1 hover:underline">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                      Street Address / Building Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 42, 4th Cross, 100 Feet Road"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel"
                    />
                    {errors.addressLine1 && <p className="text-[11px] text-berry-crimson mt-1">{errors.addressLine1}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                        Apartment / Flat / Floor (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Flat 302, Block A"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Near Sony World Signal"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        readOnly
                        className="w-full px-4 py-3 bg-cream-200/60 border border-cream-300 rounded-2xl text-xs font-semibold text-cocoa/80"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        readOnly
                        className="w-full px-4 py-3 bg-cream-200/60 border border-cream-300 rounded-2xl text-xs font-semibold text-cocoa/80"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        placeholder="560038"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel"
                      />
                      {errors.pincode && <p className="text-[11px] text-berry-crimson mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  {/* Delivery Slot Selection */}
                  <div className="pt-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-2">
                      Preferred Delivery Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { title: 'Today (Express 2 Hours)', sub: 'Fastest delivery' },
                        { title: 'Today Evening (6:00 PM - 9:00 PM)', sub: 'Evening celebration' },
                        { title: 'Tomorrow Morning (9:00 AM - 12:00 PM)', sub: 'Fresh morning bake' },
                        { title: 'Tomorrow Evening (4:00 PM - 8:00 PM)', sub: 'Party delivery' },
                      ].map((slot) => (
                        <button
                          type="button"
                          key={slot.title}
                          onClick={() => setDeliverySlot(slot.title)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            deliverySlot === slot.title
                              ? 'border-cocoa bg-cream-50 font-bold'
                              : 'border-cream-300 bg-white hover:bg-cream-50'
                          }`}
                        >
                          <p className="text-xs text-cocoa font-bold">{slot.title}</p>
                          <p className="text-[10px] text-cocoa/50">{slot.sub}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-cocoa block mb-1.5">
                      Delivery Rider Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Please ring doorbell and do not tilt the cake box"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      className="w-full px-4 py-3 bg-cream-50 border border-cream-300 rounded-2xl text-xs text-cocoa focus:outline-none focus:border-caramel"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Button variant="ghost" size="md" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="primary" size="lg" onClick={handleNextStep}>
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-cocoa">03. Select Payment Method</h2>
                    <p className="text-xs text-cocoa/60">Choose your preferred secure payment option.</p>
                  </div>
                  <button onClick={() => setStep(2)} className="text-xs text-caramel font-semibold flex items-center gap-1 hover:underline">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'upi',
                      title: 'Instant UPI (Google Pay, PhonePe, Paytm, BHIM)',
                      icon: <QrCode className="w-5 h-5 text-emerald-600" />,
                      desc: 'Scan QR code or enter UPI ID for instantaneous confirmation',
                    },
                    {
                      id: 'card',
                      title: 'Credit / Debit Card (Visa, Mastercard, RuPay, Amex)',
                      icon: <CreditCard className="w-5 h-5 text-cocoa" />,
                      desc: 'Secure 3D-authenticated payment gateway',
                    },
                    {
                      id: 'netbanking',
                      title: 'Net Banking (HDFC, ICICI, SBI, Axis & 50+ banks)',
                      icon: <Building className="w-5 h-5 text-caramel" />,
                      desc: 'Direct bank authorization',
                    },
                    {
                      id: 'cod',
                      title: 'Cash on Delivery (Pay upon arrival in Bengaluru)',
                      icon: <Banknote className="w-5 h-5 text-amber-700" />,
                      desc: 'Pay cash or scan rider QR upon delivery',
                    },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === p.id
                          ? 'border-cocoa bg-cream-50/80 shadow-xs ring-1 ring-cocoa'
                          : 'border-cream-300 bg-white hover:bg-cream-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === p.id}
                        onChange={() => setPaymentMethod(p.id as any)}
                        className="mt-1 accent-cocoa"
                      />
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center gap-2">
                          {p.icon}
                          <span className="text-xs sm:text-sm font-bold text-cocoa">{p.title}</span>
                        </div>
                        <p className="text-[11px] text-cocoa/60">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 text-xs text-emerald-800">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span>
                    Your payment is protected with banking-grade security and instant order confirmation dispatch.
                  </span>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Button variant="ghost" size="md" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    onClick={handlePlaceOrder}
                    className="min-w-[220px]"
                  >
                    <span>Place Order • {formatPrice(total)}</span>
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Box */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-sm space-y-6">
            <h3 className="font-serif text-lg font-bold text-cocoa border-b border-cream-200 pb-3">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                    <Image src={item.product.heroImage} alt={item.product.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-cocoa truncate">{item.product.name}</p>
                    <p className="text-[11px] text-cocoa/50">
                      {item.selectedWeight} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-cocoa">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-cocoa/80 border-t border-cream-200 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Bengaluru Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-cocoa border-t border-cream-200 pt-3">
                <span>Total Due</span>
                <span className="text-cocoa font-sans font-black">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="p-4 bg-peach/40 rounded-2xl border border-peach-warm/30 text-xs text-cocoa space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Truck className="w-3.5 h-3.5 text-caramel" />
                <span>Express Bakery Dispatch</span>
              </div>
              <p className="text-[11px] text-cocoa/70">
                Freshly baked upon verification in our Vijaynagar kitchen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

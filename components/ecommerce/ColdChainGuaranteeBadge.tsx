'use client';

import React from 'react';
import { ShieldCheck, Truck, Sparkles, Clock, Snowflake } from 'lucide-react';

interface ColdChainGuaranteeBadgeProps {
  compact?: boolean;
}

export const ColdChainGuaranteeBadge: React.FC<ColdChainGuaranteeBadgeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-950 text-xs">
        <Snowflake className="w-4 h-4 text-sky-600 shrink-0 animate-spin-slow" />
        <span className="font-medium">
          <strong>100% Chilled Cold-Chain Box:</strong> Zero melting guaranteed during transit.
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-sky-50 via-cream-50 to-amber-50 border border-sky-200/80 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-sky-100 text-sky-700">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-sky-950">
              Worry-Free Cold Chain Guarantee
            </h5>
            <p className="text-[11px] text-sky-800/80">
              Direct from Vijaynagar Oven & Chiller to Your Doorstep
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
          100% Protected
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] text-cocoa/80 font-medium">
        <div className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-sky-100">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Thermal insulated box</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-sky-100">
          <Clock className="w-3.5 h-3.5 text-caramel shrink-0" />
          <span>Today's fresh 8 AM batch</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/80 p-2.5 rounded-xl border border-sky-100">
          <Truck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
          <span>Chilled courier delivery</span>
        </div>
      </div>
    </div>
  );
};

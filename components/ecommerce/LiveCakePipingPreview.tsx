'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Heart, Award } from 'lucide-react';

interface LiveCakePipingPreviewProps {
  cakeName: string;
  message: string;
  onMessageChange: (message: string) => void;
}

export const LiveCakePipingPreview: React.FC<LiveCakePipingPreviewProps> = ({
  cakeName,
  message,
  onMessageChange,
}) => {

  const presetMessages = [
    'Happy Birthday! 🎉',
    'Happy Anniversary ❤️',
    'Congratulations! 🌟',
    'Best Mom Ever 🌸',
    'With Love & Joy ✨',
  ];

  return (
    <div className="bg-gradient-to-br from-cocoa-deep via-cocoa to-cocoa-deep text-cream-50 p-5 rounded-3xl border border-caramel/40 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-caramel/30 text-gold border border-gold/40">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Live Golden Script Name Piping
            </h4>
            <p className="text-[10px] text-cream-200/70">
              Hand-piped by Master Pastry Chefs in Vijaynagar
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">
          Complimentary
        </span>
      </div>

      {/* Input Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-cream-200/80">
          <label className="font-semibold text-white">Custom Inscription on Cake:</label>
          <span className="text-[10px] text-cream-200/50">{message.length}/25 characters</span>
        </div>
        <input
          type="text"
          maxLength={25}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="e.g. Happy Birthday Rhea! 🎉"
          className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-caramel/40 text-white placeholder:text-cream-200/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
        />
      </div>

      {/* Preset Fast Selectors */}
      <div className="flex flex-wrap gap-1.5">
        {presetMessages.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onMessageChange(preset)}
            className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 border border-white/15 transition-all"
          >
            {preset}
          </button>
        ))}
      </div>

      {/* REAL-TIME LIVE PLAQUE RENDERING */}
      <div className="relative overflow-hidden rounded-2xl bg-black/60 border border-caramel/50 p-4 flex flex-col items-center justify-center min-h-[90px] shadow-inner text-center">
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-pulse pointer-events-none" />

        <span className="text-[9px] uppercase tracking-widest text-caramel/80 font-bold mb-1">
          Live Cake Plaque Preview
        </span>

        {message.trim() ? (
          <p className="font-serif text-xl sm:text-2xl font-bold italic tracking-wide transition-all duration-300 drop-shadow-md text-gold bg-gradient-to-r from-amber-200 via-gold to-amber-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(230,180,60,0.4)]">
            &ldquo;{message}&rdquo;
          </p>
        ) : (
          <p className="text-xs italic text-cream-200/40">
            Type your custom inscription above to preview live piping...
          </p>
        )}

        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
          <Check className="w-3 h-3" />
          <span>Will be precision-piped onto your {cakeName}</span>
        </div>
      </div>
    </div>
  );
};

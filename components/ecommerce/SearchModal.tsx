'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils/formatters';

import { usePathname } from 'next/navigation';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close modal when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname]);

  // Handle hardware/browser back and escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handlePopState = () => {
      onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.ingredients.some((i) => i.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSuggestions = [
    'Belgian Truffle',
    'Lotus Biscoff',
    'Red Velvet',
    'Tiramisu',
    'Peri Peri Makhana',
    'Sourdough Bread',
    'Eggless Cakes',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-2xl border border-cream-300 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center px-6 py-4 border-b border-cream-300 bg-white">
          <Search className="w-5 h-5 text-cocoa/40 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search cakes, cheesecakes, makhana, cookies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base text-cocoa placeholder:text-cocoa/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-cocoa/40 hover:text-cocoa p-1 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-cream-200 hover:bg-cream-300 text-cocoa px-3 py-1.5 rounded-full font-medium transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Content Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!query.trim() ? (
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cocoa/50 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-caramel" />
                <span>Trending Cravings</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSuggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-cream-300 text-xs font-medium text-cocoa hover:border-caramel hover:text-caramel hover:bg-cream-100 transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-cream-200">
                <p className="text-xs text-cocoa/50 font-semibold uppercase tracking-wider mb-3">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { name: 'Cakes', href: '/cakes', icon: '🎂' },
                    { name: 'Desserts', href: '/desserts', icon: '🍮' },
                    { name: 'Treats', href: '/treats', icon: '🍩' },
                    { name: 'Snacks', href: '/snacks', icon: '🍿' },
                  ].map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={onClose}
                      className="p-3 bg-white rounded-2xl border border-cream-300 hover:border-caramel hover:shadow-sm text-center transition-all group"
                    >
                      <span className="text-xl block mb-1">{cat.icon}</span>
                      <span className="text-xs font-semibold text-cocoa group-hover:text-caramel">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="font-serif text-lg font-bold text-cocoa">No treats found</p>
              <p className="text-xs text-cocoa/60">
                We couldn&apos;t find anything matching &quot;{query}&quot;. Try exploring our full menu.
              </p>
              <div className="pt-3">
                <Link
                  href="/menu"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-caramel hover:underline"
                >
                  <span>View All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-cocoa/50 font-semibold uppercase tracking-wider">
                {filtered.length} {filtered.length === 1 ? 'Result' : 'Results'} found
              </p>
              <div className="space-y-2">
                {filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-cream-300 hover:border-caramel hover:shadow-md transition-all group"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-cream-200 flex-shrink-0">
                      <Image
                        src={product.heroImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-sm font-bold text-cocoa group-hover:text-caramel truncate">
                          {product.name}
                        </h4>
                        <span className="text-[10px] uppercase font-semibold text-cocoa/40 bg-cream-200 px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-xs text-cocoa/60 truncate">{product.tagline}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="font-semibold text-sm text-cocoa block">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

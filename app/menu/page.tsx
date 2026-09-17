'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Search, Sparkles, X, SlidersHorizontal } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'desserts', label: 'Artisan Desserts' },
    { id: 'pizzas', label: 'Pizzas & Pastas' },
    { id: 'savouries', label: 'Hot Savouries' },
    { id: 'gelato', label: 'Artisan Gelato' },
    { id: 'treats', label: 'Treats & Chocolates' },
    { id: 'snacks', label: 'Makhana & Snacks' },
  ];

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: products.length,
    };
    categories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = products.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          (p.ingredients && p.ingredients.some((i) => i.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const isFiltered = selectedCategory !== 'all' || searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach border border-caramel/20 text-cocoa text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>100% Pure Vegetarian & Eggless • Vijaynagar, Bengaluru</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-cocoa tracking-tight">
            The Big Bakers <span className="text-caramel italic">Menu</span>
          </h1>
          <p className="text-xs sm:text-sm text-cocoa/70 max-w-xl mx-auto">
            Explore 190+ pure vegetarian Belgian cakes, European desserts, stone-baked pizzas, hot savouries, gelato, and snacks.
          </p>
        </div>

        {/* Unified Filter & Search Bar */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-cream-300 shadow-sm space-y-4">
          {/* Top Row: Search Box & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoa/40" />
              <input
                type="text"
                placeholder="Search cakes, pizzas, chocolates, snacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 sm:py-3 bg-cream-50 border border-cream-300 rounded-full text-xs sm:text-sm text-cocoa placeholder:text-cocoa/40 focus:outline-none focus:border-caramel focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-cocoa/40 hover:text-cocoa hover:bg-cream-200 transition-all"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end shrink-0">
              <span className="text-xs text-cocoa/60 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-caramel" />
                <span>Sort:</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2 sm:py-2.5 bg-cream-50 border border-cream-300 rounded-full text-xs font-bold text-cocoa focus:outline-none focus:border-caramel cursor-pointer hover:bg-cream-100 transition-colors"
              >
                <option value="featured">Featured & Bestsellers</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs / Pills */}
          <div className="pt-3 border-t border-cream-200">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 active:scale-95 ${
                      isSelected
                        ? 'bg-cocoa text-cream-50 shadow-sm scale-100 ring-2 ring-caramel/20'
                        : 'bg-cream-50 hover:bg-cream-200/80 text-cocoa border border-cream-300/80'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isSelected
                          ? 'bg-white/20 text-cream-100'
                          : 'bg-cream-200 text-cocoa/60'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter & Reset Action */}
        <div className="flex items-center justify-between text-xs text-cocoa/70 font-semibold px-2">
          <span>
            Showing <strong className="text-cocoa font-black">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'item' : 'items'}
            {selectedCategory !== 'all' && (
              <span className="text-caramel font-normal"> in {categories.find((c) => c.id === selectedCategory)?.label}</span>
            )}
          </span>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-caramel hover:text-caramel-dark font-bold hover:underline transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} priorityCount={8} initialCount={24} />
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { ProductGrid } from '@/components/ecommerce/ProductGrid';
import { Search, Sparkles, Filter, Flame, Heart, Zap } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Delights' },
    { id: 'cakes', label: 'Celebration Cakes' },
    { id: 'desserts', label: 'Artisan Desserts' },
    { id: 'pizzas', label: 'Pizzas & Pastas' },
    { id: 'savouries', label: 'Hot Savouries' },
    { id: 'gelato', label: 'Artisan Gelato' },
    { id: 'treats', label: 'Treats & Chocolates' },
    { id: 'snacks', label: 'Makhana & Snacks' },
  ];

  const moods = [
    { id: 'all', label: 'All Cravings', icon: Sparkles },
    { id: 'chocolate', label: 'Deep Belgian Chocolate', icon: Flame },
    { id: 'creamy', label: 'Silky Cheesecake & Tiramisu', icon: Heart },
    { id: 'crunchy', label: 'Crispy & Roasted Snacks', icon: Zap },
  ];

  const dietaryOptions = [
    { id: 'all', label: 'All Dietary' },
    { id: 'eggless', label: '100% Eggless' },
    { id: 'veg', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Dietary filter
    if (selectedDietary !== 'all') {
      result = result.filter((p) => p.dietary === selectedDietary);
    }

    // Mood / Craving filter
    if (selectedMood === 'chocolate') {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes('chocolate') ||
          p.name.toLowerCase().includes('truffle') ||
          p.name.toLowerCase().includes('cocoa') ||
          p.description.toLowerCase().includes('chocolate')
      );
    } else if (selectedMood === 'creamy') {
      result = result.filter(
        (p) =>
          p.category === 'desserts' ||
          p.name.toLowerCase().includes('cheesecake') ||
          p.name.toLowerCase().includes('tiramisu') ||
          p.name.toLowerCase().includes('leches')
      );
    } else if (selectedMood === 'crunchy') {
      result = result.filter(
        (p) => p.category === 'snacks' || p.category === 'treats'
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients.some((i) => i.toLowerCase().includes(q)) ||
          p.subcategory.toLowerCase().includes(q)
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
  }, [selectedCategory, selectedDietary, selectedMood, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-peach border border-caramel/20 text-cocoa text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>Artisanal Patisserie • Vijaynagar, Bengaluru</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-cocoa tracking-tight">
            The Big Bakers <span className="text-caramel italic">Menu</span>
          </h1>
          <p className="text-sm sm:text-base text-cocoa/70 max-w-xl mx-auto">
            Handcrafted Belgian chocolate cakes, European patisserie, artisan cookies, and roasted peri-peri makhana.
          </p>
        </div>

        {/* Craving Mood Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {moods.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMood === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMood(m.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                  isSelected
                    ? 'bg-caramel text-white shadow-md scale-105 ring-2 ring-caramel/30'
                    : 'bg-white text-cocoa/80 hover:bg-cream-200 border border-cream-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-white rounded-3xl p-6 border border-cream-300 shadow-sm space-y-5">
          {/* Search & Sort Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cocoa/40" />
              <input
                type="text"
                placeholder="Search by flavor, cocoa percentage, or ingredient..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-cream-50 border border-cream-300 rounded-full text-xs sm:text-sm text-cocoa focus:outline-none focus:border-caramel transition-colors"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="text-xs text-cocoa/60 font-semibold whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2.5 bg-cream-50 border border-cream-300 rounded-full text-xs font-semibold text-cocoa focus:outline-none focus:border-caramel cursor-pointer"
              >
                <option value="featured">Featured & Bestsellers</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-cream-200">
            <span className="text-xs font-semibold text-cocoa/50 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cocoa text-cream-50 shadow-sm'
                    : 'bg-cream-50 hover:bg-cream-200 text-cocoa border border-cream-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Dietary Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-cocoa/50 mr-2">Dietary:</span>
            {dietaryOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedDietary(opt.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedDietary === opt.id
                    ? 'bg-caramel text-white font-semibold'
                    : 'bg-cream-50 hover:bg-cream-200 text-cocoa/70 border border-cream-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-cocoa/60 font-semibold px-2">
          <span>
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'delight' : 'delights'}
          </span>
          {(selectedCategory !== 'all' || selectedDietary !== 'all' || selectedMood !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('all');
                setSelectedMood('all');
                setSearchQuery('');
              }}
              className="text-caramel hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} priorityCount={8} />
      </div>
    </div>
  );
}

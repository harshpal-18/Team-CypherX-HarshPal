import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ShoppingCart, ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import FoodCard from '../../components/FoodCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import useMenuStore from '../../store/menuStore';
import useCartStore from '../../store/cartStore';
import { CATEGORIES } from '../../data/mockData';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'prepTime',   label: 'Fastest' },
];

const MenuPage = () => {
  const [loading] = useState(false);
  const {
    searchQuery, selectedCategory, sortBy, filterVeg, filterNonVeg, filterPopular, filterSpecial,
    setSearchQuery, setCategory, setSortBy, toggleVeg, toggleNonVeg, togglePopular, toggleSpecial, resetFilters,
    getFilteredFoods,
  } = useMenuStore();
  const { getItemCount, openCart } = useCartStore();
  const foods = getFilteredFoods();
  const cartCount = getItemCount();

  const activeFilters = [filterVeg, filterNonVeg, filterPopular, filterSpecial].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      {/* Header */}
      <div className="pt-20 pb-6 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6">
            <div>
              <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Our Menu 🍽️</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{foods.length} items available</p>
            </div>
            {/* Cart FAB */}
            <button onClick={openCart}
              className="relative inline-flex items-center gap-2 btn-primary py-3 self-start sm:self-auto">
              <ShoppingCart className="w-5 h-5" />
              View Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-white text-primary-600 border-2 border-primary-500 text-xs rounded-full flex items-center justify-center font-black">{cartCount}</span>
              )}
            </button>
          </div>

          {/* Search */}
          <div className="mt-5 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for food, category..."
              className="input pl-12 pr-4 py-3.5 text-base"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mt-5 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-card'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300'
                }`}>{cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {/* Sort */}
          <div className="relative flex-shrink-0">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {/* Quick filters */}
          {[
            { label: '🥦 Veg',          active: filterVeg,      toggle: toggleVeg },
            { label: '🍗 Non-Veg',       active: filterNonVeg,   toggle: toggleNonVeg },
            { label: '🔥 Popular',       active: filterPopular,  toggle: togglePopular },
            { label: "⭐ Today's Special", active: filterSpecial, toggle: toggleSpecial },
          ].map(f => (
            <button key={f.label} onClick={f.toggle}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                f.active
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}>{f.label}</button>
          ))}
          {(activeFilters > 0 || searchQuery || selectedCategory !== 'All' || sortBy !== 'default') && (
            <button onClick={resetFilters} className="flex-shrink-0 flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium px-2">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Food Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <LoadingSkeleton type="card" count={8} />
        ) : foods.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-display font-bold text-xl text-gray-700 dark:text-gray-300">No items found</p>
            <p className="text-gray-400 mt-1">Try different filters or search terms</p>
            <button onClick={resetFilters} className="btn-primary mt-6">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods.map((food, i) => <FoodCard key={food.id} food={food} delay={i * 0.04} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
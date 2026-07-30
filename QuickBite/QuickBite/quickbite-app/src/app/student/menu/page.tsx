'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MENU_ITEMS, CATEGORIES, CATEGORY_EMOJIS, type Category } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Search, Clock, Star, Plus, Minus, Filter, Leaf, Drumstick } from 'lucide-react';
import { toast } from 'sonner';

type FilterType = 'all' | 'veg' | 'nonveg';

export default function MenuPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [filter, setFilter] = useState<FilterType>('all');
  const [cart, setCart] = useState<Record<string, number>>({});

  const filtered = MENU_ITEMS.filter(item => {
    const matchCat = category === 'All' || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'veg' ? item.isVeg : !item.isVeg);
    return matchCat && matchSearch && matchFilter;
  });

  const addItem = (id: string, name: string) => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    toast.success(`${name} added!`, { icon: '✅' });
  };
  const removeItem = (id: string) => {
    setCart(c => { const n = { ...c }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Today&apos;s Menu</h1>
          <p className="text-white/40 text-sm">{filtered.length} items available</p>
        </div>
        {totalItems > 0 && (
          <motion.a
            href="/student/cart"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="btn-gradient px-4 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2"
          >
            🛒 {totalItems} items · Go to Cart
          </motion.a>
        )}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search menu..."
            className="w-full glass rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder-white/30 outline-none"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'veg', 'nonveg'] as FilterType[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-1.5 transition-all ${
                filter === f ? 'btn-gradient text-white' : 'glass text-white/50 hover:text-white'
              }`}
            >
              {f === 'veg' ? <Leaf className="w-3.5 h-3.5 text-green-400" /> :
               f === 'nonveg' ? <Drumstick className="w-3.5 h-3.5 text-red-400" /> :
               <Filter className="w-3.5 h-3.5" />}
              {f === 'all' ? 'All' : f === 'veg' ? 'Veg' : 'Non-Veg'}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              category === cat ? 'btn-gradient text-white' : 'glass text-white/50 hover:text-white'
            }`}
          >
            {CATEGORY_EMOJIS[cat]} {cat}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`glass food-card rounded-2xl overflow-hidden ${!item.available ? 'opacity-60' : ''}`}
          >
            <div className="flex">
              {/* Emoji panel */}
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center text-4xl flex-shrink-0 relative">
                {item.emoji}
                {item.tag && (
                  <span className={`absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    item.tag === 'Popular' ? 'tag-popular' :
                    item.tag === 'New' ? 'tag-new' :
                    item.tag === 'Low Stock' ? 'tag-low' : 'tag-offer'
                  }`}>
                    {item.tag}
                  </span>
                )}
                <div className={`absolute bottom-2 right-2 w-4 h-4 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-4">
                <h3 className="font-bold text-white text-sm">{item.name}</h3>
                <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-white/50">{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <Clock className="w-3 h-3" /> {item.prepTime} min
                  </div>
                  <div className="text-xs text-white/30">{item.calories} kcal</div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-black text-purple-400">{formatCurrency(item.price)}</span>
                  {!item.available ? (
                    <span className="text-xs bg-red-500/10 text-red-400 px-2 py-1 rounded-lg">Sold Out</span>
                  ) : cart[item.id] ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeItem(item.id)} className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/70 hover:text-white">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-bold text-sm w-5 text-center">{cart[item.id]}</span>
                      <button onClick={() => addItem(item.id, item.name)} className="w-7 h-7 btn-gradient rounded-lg flex items-center justify-center text-white">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addItem(item.id, item.name)}
                      className="btn-gradient px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  )}
                </div>

                {/* Stock indicator */}
                {item.available && item.stock < 10 && (
                  <div className="mt-2 text-xs text-yellow-400">⚠️ Only {item.stock} left!</div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <div className="text-5xl mb-4">🔍</div>
          <p>No items found for &quot;{search}&quot;</p>
        </div>
      )}
    </div>
  );
}

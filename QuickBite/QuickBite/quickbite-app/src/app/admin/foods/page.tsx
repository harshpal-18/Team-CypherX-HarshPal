'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MENU_ITEMS } from '@/lib/data';
import { UtensilsCrossed, Search, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

export default function AdminFoodsPage() {
  const [items, setItems] = useState(MENU_ITEMS);
  const [search, setSearch] = useState('');

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
    toast.success(`${item?.name} ${item?.available ? 'hidden' : 'shown'} platform-wide`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <UtensilsCrossed className="w-6 h-6 text-green-400" /> Food Management
        </h1>
        <p className="text-white/40 text-sm">Platform-wide menu oversight across all vendors</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Items', value: items.length, color: '#8B5CF6' },
          { label: 'Active', value: items.filter(i => i.available).length, color: '#10B981' },
          { label: 'Disabled', value: items.filter(i => !i.available).length, color: '#EF4444' },
        ].map(s => (
          <div key={s.label} className="glass rounded-2xl p-4 text-center">
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-white/40">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search food items..." className="w-full glass rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none" />
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-6 p-4 border-b border-white/5 text-xs text-white/30 uppercase tracking-wider font-semibold">
          <div className="col-span-2">Item</div>
          <div>Category</div>
          <div>Price</div>
          <div>Orders</div>
          <div className="text-center">Visibility</div>
        </div>
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-6 p-4 border-b border-white/5 items-center hover:bg-white/2 transition-colors last:border-0"
          >
            <div className="col-span-2 flex items-center gap-3">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <div className="font-medium text-white text-sm">{item.name}</div>
                <div className="text-xs text-white/30">{item.isVeg ? '🟢 Veg' : '🔴 Non-veg'}</div>
              </div>
            </div>
            <div className="text-white/50 text-sm">{item.category}</div>
            <div className="font-bold text-purple-400 text-sm">{formatCurrency(item.price)}</div>
            <div className="text-white/70 text-sm">{item.orderCount}</div>
            <div className="flex justify-center">
              <button
                onClick={() => toggle(item.id)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${item.available ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}
              >
                {item.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

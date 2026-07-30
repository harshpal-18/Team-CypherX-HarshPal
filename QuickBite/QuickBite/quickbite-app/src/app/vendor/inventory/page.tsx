'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MENU_ITEMS } from '@/lib/data';
import { Package, AlertTriangle, TrendingDown, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export default function VendorInventoryPage() {
  const [inventory, setInventory] = useState(
    MENU_ITEMS.map(item => ({ ...item, reorderLevel: 10 }))
  );

  const adjust = (id: string, delta: number) => {
    setInventory(prev => prev.map(item =>
      item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
    ));
  };

  const restock = (id: string) => {
    const item = inventory.find(i => i.id === id);
    setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: 50 } : i));
    toast.success(`${item?.name} restocked to 50 units! 📦`);
  };

  const lowStock = inventory.filter(i => i.stock <= i.reorderLevel && i.stock > 0);
  const outOfStock = inventory.filter(i => i.stock === 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-400" /> Inventory Management
        </h1>
        <p className="text-white/40 text-sm">Monitor stock levels and reorder</p>
      </div>

      {/* Alert cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Items', value: inventory.length, icon: Package, color: '#8B5CF6' },
          { label: 'Low Stock', value: lowStock.length, icon: AlertTriangle, color: '#F59E0B' },
          { label: 'Out of Stock', value: outOfStock.length, icon: TrendingDown, color: '#EF4444' },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
              <span style={{ color: stat.color }}><stat.icon className="w-6 h-6" /></span>
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Low stock alerts */}
      {lowStock.length > 0 && (
        <div className="glass rounded-2xl p-5 border border-yellow-500/20">
          <h2 className="font-bold text-yellow-400 flex items-center gap-2 mb-3 text-sm">
            <AlertTriangle className="w-4 h-4" /> Low Stock Alerts
          </h2>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(item => (
              <div key={item.id} className="glass rounded-xl px-3 py-2 flex items-center gap-2 text-sm">
                <span>{item.emoji}</span>
                <span className="text-white/70">{item.name}</span>
                <span className="text-yellow-400 font-bold">{item.stock} left</span>
                <button onClick={() => restock(item.id)} className="text-xs bg-yellow-400/10 text-yellow-400 px-2 py-0.5 rounded-lg hover:bg-yellow-400/20 transition-colors">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 grid grid-cols-6 text-xs text-white/30 uppercase tracking-wider font-semibold">
          <div className="col-span-2">Item</div>
          <div className="text-center">Stock</div>
          <div className="text-center">Reorder At</div>
          <div className="text-center">Status</div>
          <div className="text-center">Actions</div>
        </div>
        {inventory.map((item, i) => {
          const pct = Math.round((item.stock / 60) * 100);
          const isLow = item.stock <= item.reorderLevel && item.stock > 0;
          const isOut = item.stock === 0;
          const barColor = isOut ? '#EF4444' : isLow ? '#F59E0B' : '#10B981';
          return (
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
                  <div className="text-xs text-white/30">{item.category}</div>
                </div>
              </div>
              <div className="text-center">
                <div className="font-black text-white mb-1">{item.stock}</div>
                <div className="w-20 mx-auto bg-white/5 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(pct, 100)}%`, background: barColor }} />
                </div>
              </div>
              <div className="text-center text-white/50 text-sm">{item.reorderLevel}</div>
              <div className="text-center">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  isOut ? 'bg-red-500/10 text-red-400' :
                  isLow ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-green-500/10 text-green-400'
                }`}>
                  {isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock'}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <button onClick={() => adjust(item.id, -5)} className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/50 hover:text-white text-xs">
                  <Minus className="w-3 h-3" />
                </button>
                <button onClick={() => adjust(item.id, 5)} className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/50 hover:text-white text-xs">
                  <Plus className="w-3 h-3" />
                </button>
                <button onClick={() => restock(item.id)} className="px-2 py-1 text-[10px] bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors ml-1">
                  Fill
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MENU_ITEMS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Plus, Edit3, Trash2, ToggleLeft, ToggleRight, Save, X } from 'lucide-react';
import { toast } from 'sonner';

type MenuItem = typeof MENU_ITEMS[0];

export default function VendorMenuPage() {
  const [items, setItems] = useState(MENU_ITEMS);
  const [editing, setEditing] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editPrepTime, setEditPrepTime] = useState('');
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', emoji: '🍽️', prepTime: '', stock: '', category: 'Snacks', isVeg: true });

  const toggleAvailability = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, available: !i.available } : i));
    const item = items.find(i => i.id === id);
    toast.success(`${item?.name} ${item?.available ? 'disabled' : 'enabled'}`);
  };

  const startEdit = (item: MenuItem) => {
    setEditing(item.id);
    setEditPrice(item.price.toString());
    setEditStock(item.stock.toString());
    setEditPrepTime(item.prepTime.toString());
  };

  const saveEdit = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? {
      ...i,
      price: Number(editPrice) || i.price,
      stock: Number(editStock) || i.stock,
      prepTime: Number(editPrepTime) || i.prepTime,
    } : i));
    setEditing(null);
    toast.success('Menu item updated!');
  };

  const deleteItem = (id: string) => {
    const item = items.find(i => i.id === id);
    setItems(prev => prev.filter(i => i.id !== id));
    toast.error(`${item?.name} removed from menu`);
  };

  const addItem = () => {
    if (!newItem.name || !newItem.price) { toast.error('Name and price required'); return; }
    const item: MenuItem = {
      id: `m${Date.now()}`, name: newItem.name, price: Number(newItem.price),
      category: newItem.category as any, image: '', emoji: newItem.emoji,
      available: true, prepTime: Number(newItem.prepTime) || 10, rating: 4.0,
      orderCount: 0, stock: Number(newItem.stock) || 20, isVeg: newItem.isVeg,
      description: 'Freshly prepared', calories: 0,
    };
    setItems(prev => [...prev, item]);
    setAdding(false);
    setNewItem({ name: '', price: '', emoji: '🍽️', prepTime: '', stock: '', category: 'Snacks', isVeg: true });
    toast.success(`${newItem.name} added to menu! 🎉`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Menu Manager</h1>
          <p className="text-white/40 text-sm">{items.filter(i => i.available).length} active · {items.filter(i => !i.available).length} disabled</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="btn-gradient px-5 py-2.5 rounded-xl text-white text-sm font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Add item form */}
      {adding && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-6 border border-purple-500/30"
        >
          <h2 className="font-bold text-white mb-4">Add New Menu Item</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Emoji', field: 'emoji', placeholder: '🍽️' },
              { label: 'Name', field: 'name', placeholder: 'Item name' },
              { label: 'Price (₹)', field: 'price', placeholder: '80' },
              { label: 'Prep Time (min)', field: 'prepTime', placeholder: '10' },
              { label: 'Stock', field: 'stock', placeholder: '20' },
            ].map(({ label, field, placeholder }) => (
              <div key={field}>
                <label className="text-xs text-white/40 mb-1 block">{label}</label>
                <input
                  value={(newItem as any)[field]}
                  onChange={e => setNewItem(n => ({ ...n, [field]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full glass rounded-xl px-3 py-2.5 text-white text-sm outline-none"
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-white/40 mb-1 block">Type</label>
              <div className="flex gap-2">
                <button onClick={() => setNewItem(n => ({ ...n, isVeg: true }))} className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${newItem.isVeg ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'glass text-white/40'}`}>🟢 Veg</button>
                <button onClick={() => setNewItem(n => ({ ...n, isVeg: false }))} className={`flex-1 py-2.5 rounded-xl text-xs font-bold ${!newItem.isVeg ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'glass text-white/40'}`}>🔴 Non-Veg</button>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addItem} className="btn-gradient px-6 py-2.5 rounded-xl text-white text-sm font-bold">Save Item</button>
            <button onClick={() => setAdding(false)} className="glass px-6 py-2.5 rounded-xl text-white/60 text-sm">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Menu list */}
      <div className="grid grid-cols-1 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`glass rounded-2xl p-4 flex items-center gap-4 transition-all ${!item.available ? 'opacity-60' : ''}`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">{item.name}</h3>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${item.isVeg ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {item.isVeg ? '🟢 Veg' : '🔴 Non-veg'}
                </span>
              </div>
              {editing === item.id ? (
                <div className="flex gap-2 mt-2">
                  {[
                    { label: '₹', val: editPrice, set: setEditPrice },
                    { label: 'min', val: editPrepTime, set: setEditPrepTime },
                    { label: 'stock', val: editStock, set: setEditStock },
                  ].map(({ label, val, set }) => (
                    <div key={label} className="flex items-center gap-1">
                      <input value={val} onChange={e => set(e.target.value)} className="w-16 glass rounded-lg px-2 py-1 text-white text-xs outline-none text-center" />
                      <span className="text-xs text-white/30">{label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 mt-1 text-xs text-white/40">
                  <span className="text-purple-400 font-bold text-sm">{formatCurrency(item.price)}</span>
                  <span>⏱ {item.prepTime} min</span>
                  <span>📦 {item.stock} in stock</span>
                  <span>⭐ {item.rating}</span>
                  <span>{item.orderCount} orders</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => toggleAvailability(item.id)} className="transition-colors">
                {item.available
                  ? <ToggleRight className="w-7 h-7 text-green-400" />
                  : <ToggleLeft className="w-7 h-7 text-white/30" />
                }
              </button>
              {editing === item.id ? (
                <>
                  <button onClick={() => saveEdit(item.id)} className="w-8 h-8 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 hover:bg-green-500/20">
                    <Save className="w-4 h-4" />
                  </button>
                  <button onClick={() => setEditing(null)} className="w-8 h-8 glass rounded-xl flex items-center justify-center text-white/40">
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(item)} className="w-8 h-8 glass rounded-xl flex items-center justify-center text-white/40 hover:text-blue-400 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="w-8 h-8 glass rounded-xl flex items-center justify-center text-white/40 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

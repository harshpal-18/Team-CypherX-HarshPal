import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, Search, Star, Leaf, Drumstick, X, Upload, Check, AlertCircle } from 'lucide-react';
import useMenuStore from '../../store/menuStore';
import useUiStore from '../../store/uiStore';
import { CATEGORIES } from '../../data/mockData';

const EMPTY_FORM = { name: '', category: 'Snacks', price: '', prepTime: '', rating: 4.5, isVeg: true, isPopular: false, isSpecial: false, isOutOfStock: false, description: '', image: '' };

const AdminMenu = () => {
  const { foods, addFood, updateFood, deleteFood } = useMenuStore();
  const { addToast } = useUiStore();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = foods.filter(f => {
    const ms = search === '' || f.name.toLowerCase().includes(search.toLowerCase());
    const mc = catFilter === 'All' || f.category === catFilter;
    return ms && mc;
  });

  const openAdd = () => { setForm(EMPTY_FORM); setEditingId(null); setModalOpen(true); };
  const openEdit = (food) => { setForm({ ...food }); setEditingId(food.id); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditingId(null); };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      updateFood(editingId, form);
      addToast(`${form.name} updated!`, 'success');
    } else {
      addFood(form);
      addToast(`${form.name} added to menu!`, 'success');
    }
    closeModal();
  };

  const handleDelete = (food) => {
    deleteFood(food.id);
    addToast(`${food.name} removed from menu`, 'warning');
  };

  const toggle = (id, field, label) => {
    updateFood(id, { [field]: !foods.find(f => f.id === id)?.[field] });
    addToast(`${label} updated`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Menu Management</h1>
          <p className="text-gray-500 text-sm">{foods.length} items</p>
        </div>
        <button onClick={openAdd} className="btn-primary self-start sm:self-auto">
          <Plus className="w-4 h-4" /> Add Food Item
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search food..." className="input pl-10 py-2.5 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', ...CATEGORIES.filter(c => c !== 'All')].map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${catFilter === c ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((food, i) => (
          <motion.div key={food.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="card overflow-hidden">
            <div className="relative h-36">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${food.isVeg ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {food.isVeg ? '🥦 Veg' : '🍗 Non-Veg'}
                </span>
                <span className="text-white font-bold text-base">₹{food.price}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">{food.name}</h3>
                <div className="flex items-center gap-1 text-xs text-yellow-500">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />{food.rating}
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3 line-clamp-1">{food.category} · {food.prepTime} min</p>

              {/* Toggles */}
              <div className="flex gap-2 mb-3 flex-wrap">
                {[
                  { key: 'isSpecial',   label: '⭐ Special',  val: food.isSpecial },
                  { key: 'isPopular',   label: '🔥 Popular',  val: food.isPopular },
                  { key: 'isOutOfStock',label: '❌ Out Stock', val: food.isOutOfStock },
                ].map(t => (
                  <button key={t.key} onClick={() => toggle(food.id, t.key, t.label)}
                    className={`text-[10px] font-semibold px-2 py-1 rounded-lg border transition-all ${t.val ? 'border-primary-400 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400' : 'border-gray-200 dark:border-gray-700 text-gray-400 hover:border-gray-300'}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => openEdit(food)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 transition-colors">
                  <Edit3 className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => handleDelete(food)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40" onClick={closeModal} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">
                    {editingId ? 'Edit Food Item' : 'Add New Food Item'}
                  </h2>
                  <button onClick={closeModal} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Food Name *</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input" placeholder="e.g. Paneer Burger" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                      <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input">
                        {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹) *</label>
                      <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} className="input" placeholder="85" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prep Time (min)</label>
                      <input type="number" value={form.prepTime} onChange={e => setForm(f => ({ ...f, prepTime: +e.target.value }))} className="input" placeholder="10" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                      <input type="number" step="0.1" min="1" max="5" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: +e.target.value }))} className="input" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                      <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="input" placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                      <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input resize-none" rows={2} placeholder="Short description..." />
                    </div>
                  </div>
                  {/* Checkboxes */}
                  <div className="flex flex-wrap gap-4">
                    {[
                      { key: 'isVeg',       label: '🥦 Vegetarian' },
                      { key: 'isPopular',   label: '🔥 Popular' },
                      { key: 'isSpecial',   label: "⭐ Today's Special" },
                      { key: 'isOutOfStock',label: '❌ Out of Stock' },
                    ].map(cb => (
                      <label key={cb.key} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form[cb.key]} onChange={e => setForm(f => ({ ...f, [cb.key]: e.target.checked }))}
                          className="rounded border-gray-300 text-primary-500 focus:ring-primary-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{cb.label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="btn-outline flex-1 py-3">Cancel</button>
                    <button type="submit" className="btn-primary flex-1 py-3 justify-center">
                      <Check className="w-4 h-4" /> {editingId ? 'Save Changes' : 'Add Item'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMenu;

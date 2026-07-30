import { create } from 'zustand';
import api from '../lib/api';
import { FOODS } from '../data/mockData'; // fallback if server is down

const useMenuStore = create((set, get) => ({
  foods:              FOODS,   // start with mock data immediately
  loading:            false,
  error:              null,
  searchQuery:        '',
  selectedCategory:   'All',
  sortBy:             'default',
  filterVeg:          false,
  filterNonVeg:       false,
  filterPopular:      false,
  filterSpecial:      false,
  filterMostOrdered:  false,

  // ── Fetch from real API ───────────────────────────────────────────────────
  fetchMenu: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/menu');
      // Normalise _id → id so existing components keep working
      const foods = data.items.map(f => ({ ...f, id: f._id }));
      set({ foods, loading: false });
    } catch {
      // Server down — silently keep mock data
      set({ loading: false });
    }
  },

  setSearchQuery:    (q)    => set({ searchQuery: q }),
  setCategory:       (cat)  => set({ selectedCategory: cat }),
  setSortBy:         (sort) => set({ sortBy: sort }),
  toggleVeg:         ()     => set(s => ({ filterVeg: !s.filterVeg, filterNonVeg: false })),
  toggleNonVeg:      ()     => set(s => ({ filterNonVeg: !s.filterNonVeg, filterVeg: false })),
  togglePopular:     ()     => set(s => ({ filterPopular: !s.filterPopular })),
  toggleSpecial:     ()     => set(s => ({ filterSpecial: !s.filterSpecial })),
  toggleMostOrdered: ()     => set(s => ({ filterMostOrdered: !s.filterMostOrdered })),
  resetFilters:      ()     => set({
    searchQuery: '', selectedCategory: 'All', sortBy: 'default',
    filterVeg: false, filterNonVeg: false, filterPopular: false,
    filterSpecial: false, filterMostOrdered: false,
  }),

  getFilteredFoods: () => {
    const { foods, searchQuery, selectedCategory, sortBy, filterVeg, filterNonVeg, filterPopular, filterSpecial } = get();
    let result = [...foods];
    if (searchQuery)                result = result.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.category.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory !== 'All') result = result.filter(f => f.category === selectedCategory);
    if (filterVeg)                  result = result.filter(f => f.isVeg);
    if (filterNonVeg)               result = result.filter(f => !f.isVeg);
    if (filterPopular)              result = result.filter(f => f.isPopular);
    if (filterSpecial)              result = result.filter(f => f.isSpecial);
    if (sortBy === 'price-asc')     result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc')    result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')        result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'prepTime')      result.sort((a, b) => a.prepTime - b.prepTime);
    return result;
  },

  // Admin CRUD — call API and update local state
  addFood: async (food) => {
    try {
      const { data } = await api.post('/menu', food);
      set(s => ({ foods: [...s.foods, { ...data.item, id: data.item._id }] }));
    } catch {
      set(s => ({ foods: [...s.foods, { ...food, id: `f${Date.now()}` }] }));
    }
  },

  updateFood: async (id, updates) => {
    try {
      const { data } = await api.put(`/menu/${id}`, updates);
      set(s => ({ foods: s.foods.map(f => f.id === id ? { ...data.item, id: data.item._id } : f) }));
    } catch {
      set(s => ({ foods: s.foods.map(f => f.id === id ? { ...f, ...updates } : f) }));
    }
  },

  deleteFood: async (id) => {
    try {
      await api.delete(`/menu/${id}`);
    } catch { /* ignore */ }
    set(s => ({ foods: s.foods.filter(f => f.id !== id) }));
  },
}));

export default useMenuStore;

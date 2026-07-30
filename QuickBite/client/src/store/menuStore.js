import { create } from 'zustand';
import { FOODS } from '../data/mockData';

const useMenuStore = create((set, get) => ({
  foods: FOODS,
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'default', // 'price-asc' | 'price-desc' | 'rating' | 'prepTime'
  filterVeg: false,
  filterNonVeg: false,
  filterPopular: false,
  filterSpecial: false,
  filterMostOrdered: false,

  setSearchQuery: (q) => set({ searchQuery: q }),
  setCategory: (cat) => set({ selectedCategory: cat }),
  setSortBy: (sort) => set({ sortBy: sort }),
  toggleVeg: () => set(s => ({ filterVeg: !s.filterVeg, filterNonVeg: false })),
  toggleNonVeg: () => set(s => ({ filterNonVeg: !s.filterNonVeg, filterVeg: false })),
  togglePopular: () => set(s => ({ filterPopular: !s.filterPopular })),
  toggleSpecial: () => set(s => ({ filterSpecial: !s.filterSpecial })),
  toggleMostOrdered: () => set(s => ({ filterMostOrdered: !s.filterMostOrdered })),
  resetFilters: () => set({ searchQuery: '', selectedCategory: 'All', sortBy: 'default', filterVeg: false, filterNonVeg: false, filterPopular: false, filterSpecial: false, filterMostOrdered: false }),

  getFilteredFoods: () => {
    const { foods, searchQuery, selectedCategory, sortBy, filterVeg, filterNonVeg, filterPopular, filterSpecial } = get();
    let result = [...foods].filter(f => !f.isOutOfStock || true); // show all, mark out-of-stock

    if (searchQuery) result = result.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.category.toLowerCase().includes(searchQuery.toLowerCase()));
    if (selectedCategory !== 'All') result = result.filter(f => f.category === selectedCategory);
    if (filterVeg) result = result.filter(f => f.isVeg);
    if (filterNonVeg) result = result.filter(f => !f.isVeg);
    if (filterPopular) result = result.filter(f => f.isPopular);
    if (filterSpecial) result = result.filter(f => f.isSpecial);

    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'prepTime')   result.sort((a, b) => a.prepTime - b.prepTime);

    return result;
  },

  // Admin: update food
  updateFood: (id, data) => set(s => ({ foods: s.foods.map(f => f.id === id ? { ...f, ...data } : f) })),
  addFood: (food) => set(s => ({ foods: [...s.foods, { ...food, id: `f${Date.now()}` }] })),
  deleteFood: (id) => set(s => ({ foods: s.foods.filter(f => f.id !== id) })),
}));

export default useMenuStore;

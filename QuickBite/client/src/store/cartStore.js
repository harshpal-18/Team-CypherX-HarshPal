import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      orderType: 'Dine In', // 'Dine In' | 'Take Away' | 'Parcel'
      promoApplied: false,
      promoDiscount: 0,
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),

      addItem: (food) => {
        const existing = get().items.find(i => i.id === food.id);
        if (existing) {
          set(s => ({ items: s.items.map(i => i.id === food.id ? { ...i, qty: i.qty + 1 } : i) }));
        } else {
          set(s => ({ items: [...s.items, { ...food, qty: 1 }] }));
        }
      },

      removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),

      updateQty: (id, qty) => {
        if (qty <= 0) { get().removeItem(id); return; }
        set(s => ({ items: s.items.map(i => i.id === id ? { ...i, qty } : i) }));
      },

      clearCart: () => set({ items: [], promoApplied: false, promoDiscount: 0 }),

      setOrderType: (type) => set({ orderType: type }),

      applyPromo: (code) => {
        if (code === 'COMBO10') {
          set({ promoApplied: true, promoDiscount: 10 });
          return true;
        }
        return false;
      },

      removePromo: () => set({ promoApplied: false, promoDiscount: 0 }),

      getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),

      getTotal: () => {
        const sub = get().getSubtotal();
        const disc = get().promoDiscount;
        const discount = Math.round(sub * disc / 100);
        const taxes = Math.round(sub * 0.05);
        return { subtotal: sub, discount, taxes, total: sub - discount + taxes };
      },

      getItemCount: () => get().items.reduce((sum, i) => sum + i.qty, 0),
    }),
    { name: 'quickbite-cart' }
  )
);

export default useCartStore;
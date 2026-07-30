import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUiStore = create(
  persist(
    (set, get) => ({
      darkMode: false,
      toasts: [],
      sidebarOpen: false,

      toggleDarkMode: () => {
        const next = !get().darkMode;
        set({ darkMode: next });
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      },

      initDarkMode: () => {
        const { darkMode } = get();
        if (darkMode) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      },

      addToast: (message, type = 'success', duration = 3000) => {
        const id = Date.now() + Math.random();
        set(state => ({ toasts: [...state.toasts, { id, message, type, duration }] }));
        setTimeout(() => {
          set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
        }, duration + 300);
      },

      removeToast: (id) => {
        set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
      },

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
    }),
    { name: 'quickbite-ui', partialize: (s) => ({ darkMode: s.darkMode }) }
  )
);

export default useUiStore;

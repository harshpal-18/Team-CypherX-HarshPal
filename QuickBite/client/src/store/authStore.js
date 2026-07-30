import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      role: null, // 'customer' | 'admin'
      isAuthenticated: false,

      login: (userData, role) => {
        set({ user: userData, role, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, role: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set(state => ({ user: { ...state.user, ...data } }));
      },
    }),
    { name: 'quickbite-auth' }
  )
);

export default useAuthStore;

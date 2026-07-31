import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user:            null,
      role:            null,
      token:           null,
      isAuthenticated: false,

      // ── Register ─────────────────────────────────────────────────────────
      register: async ({ name, email, phone, password, role }) => {
        try {
          const { data } = await api.post('/auth/register', { name, email, phone, password, role });
          set({ user: data.user, role: data.user.role, token: data.token, isAuthenticated: true });
          return { success: true };
        } catch (err) {
          return { success: false, message: err.response?.data?.message || 'Registration failed' };
        }
      },

      // ── Login ─────────────────────────────────────────────────────────────
      // identifier = email or phone number string
      loginWithAPI: async ({ identifier, password, role }) => {
        try {
          const { data } = await api.post('/auth/login', { identifier, password, role });
          set({ user: data.user, role: data.user.role, token: data.token, isAuthenticated: true });
          return { success: true };
        } catch (err) {
          return { success: false, message: err.response?.data?.message || 'Login failed' };
        }
      },

      // ── Legacy demo login (kept for fallback) ─────────────────────────────
      login: (userData, role) => {
        set({ user: userData, role, isAuthenticated: true });
      },

      // ── Logout ────────────────────────────────────────────────────────────
      logout: () => set({ user: null, role: null, token: null, isAuthenticated: false }),

      // ── Update profile ────────────────────────────────────────────────────
      updateProfile: async (data) => {
        try {
          const res = await api.put('/auth/profile', data);
          set(state => ({ user: { ...state.user, ...res.data.user } }));
          return { success: true };
        } catch (err) {
          // Fallback: update locally
          set(state => ({ user: { ...state.user, ...data } }));
          return { success: true };
        }
      },

      // ── Fetch fresh user data ─────────────────────────────────────────────
      fetchMe: async () => {
        try {
          const { data } = await api.get('/auth/me');
          set(state => ({ user: { ...state.user, ...data.user } }));
        } catch {
          // silently fail
        }
      },
    }),
    { name: 'quickbite-auth' }
  )
);

export default useAuthStore;

import axios from 'axios';

// VITE_API_URL should be your Render backend's root URL, e.g.:
// https://quickbite-server-yu7u.onrender.com
// (set this in Vercel → Settings → Environment Variables)
const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Attach auth token automatically to every request ──────────────────────
// Reads the token saved by authStore (zustand persist storage key: 'quickbite-auth')
api.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem('quickbite-auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      const token = parsed?.state?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // no-op if storage is empty or malformed
  }
  return config;
});

// ── Handle expired/invalid tokens globally ─────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired — clear local auth state
      localStorage.removeItem('quickbite-auth');
    }
    return Promise.reject(error);
  }
);

export default api;
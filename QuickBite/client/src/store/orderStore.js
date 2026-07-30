import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';
import { MOCK_ORDERS } from '../data/mockData';

const ORDER_STAGES = ['Received', 'Preparing', 'Cooking', 'Ready', 'Completed'];

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders:      MOCK_ORDERS,
      activeOrder: null,
      notifications: [
        { id: 'n1', message: 'Order QB-2024-001 is ready for pickup!', type: 'success', time: '2 min ago', read: false },
        { id: 'n2', message: 'Your payment of ₹180 was successful.',    type: 'payment', time: '5 min ago', read: false },
        { id: 'n3', message: 'Order QB-2023-099 has been delivered.',   type: 'info',    time: '1 hr ago',  read: true  },
      ],

      // ── Place order via API ───────────────────────────────────────────────
      placeOrder: async (cartItems, orderType, paymentMethod, user, totals) => {
        const items = cartItems.map(i => ({
          menuItem: i._id || i.id,
          name:     i.name,
          price:    i.price,
          qty:      i.qty,
          prepTime: i.prepTime || 10,
        }));

        try {
          const { data } = await api.post('/orders', {
            items,
            orderType,
            paymentMethod,
            subtotal:  totals?.subtotal || items.reduce((s, i) => s + i.price * i.qty, 0),
            discount:  totals?.discount || 0,
            taxes:     totals?.taxes    || 0,
            total:     totals?.total    || items.reduce((s, i) => s + i.price * i.qty, 0),
          });
          const order = data.order;
          set(s => ({ orders: [order, ...s.orders], activeOrder: order }));
          get().simulateOrderProgress(order.orderId || order._id);
          return order;
        } catch {
          // Fallback to offline mode
          return get()._placeOffline(cartItems, orderType, paymentMethod, user);
        }
      },

      // Offline fallback (no backend)
      _placeOffline: (cartItems, orderType, paymentMethod, user) => {
        const id    = `QB-${Date.now()}`;
        const token = `T-${String(Math.floor(Math.random() * 900) + 100)}`;
        const order = {
          id, orderId: id, token,
          customer: user?.name || 'Guest',
          items: cartItems.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          total: cartItems.reduce((s, i) => s + i.price * i.qty, 0),
          status: 'Received', orderType, paymentMethod, stageIndex: 0,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          estimatedMinutes: cartItems.reduce((m, i) => Math.max(m, i.prepTime || 10), 0) + 2,
        };
        set(s => ({ orders: [order, ...s.orders], activeOrder: order }));
        get().simulateOrderProgress(id);
        return order;
      },

      // ── Fetch orders from API ─────────────────────────────────────────────
      fetchMyOrders: async () => {
        try {
          const { data } = await api.get('/orders/mine');
          set({ orders: data.orders });
        } catch { /* keep local */ }
      },

      fetchAllOrders: async () => {
        try {
          const { data } = await api.get('/orders');
          set({ orders: data.orders });
        } catch { /* keep local */ }
      },

      // ── Status update (admin) ─────────────────────────────────────────────
      updateOrderStatus: async (orderId, status) => {
        const stageIndex = ORDER_STAGES.indexOf(status);
        try {
          await api.put(`/orders/${orderId}/status`, { status });
        } catch { /* ignore */ }
        set(s => ({
          orders: s.orders.map(o =>
            (o.orderId === orderId || o.id === orderId)
              ? { ...o, status, stageIndex: stageIndex >= 0 ? stageIndex : o.stageIndex }
              : o
          ),
        }));
      },

      // ── Cancel order ──────────────────────────────────────────────────────
      cancelOrder: async (orderId) => {
        const order = get().orders.find(o => o.orderId === orderId || o.id === orderId);
        if (!order || order.stageIndex >= 2) return false;
        try {
          await api.put(`/orders/${orderId}/cancel`);
        } catch { /* ignore */ }
        set(s => ({
          orders: s.orders.map(o =>
            (o.orderId === orderId || o.id === orderId) ? { ...o, status: 'Cancelled' } : o
          ),
          activeOrder: s.activeOrder?.orderId === orderId ? { ...s.activeOrder, status: 'Cancelled' } : s.activeOrder,
        }));
        return true;
      },

      // ── Simulate order progression (demo / offline mode) ─────────────────
      simulateOrderProgress: (orderId) => {
        let idx = 0;
        const advance = () => {
          idx++;
          if (idx >= ORDER_STAGES.length) return;
          setTimeout(() => {
            set(s => ({
              orders: s.orders.map(o =>
                (o.orderId === orderId || o.id === orderId)
                  ? { ...o, status: ORDER_STAGES[idx], stageIndex: idx }
                  : o
              ),
              activeOrder: (s.activeOrder?.orderId === orderId || s.activeOrder?.id === orderId)
                ? { ...s.activeOrder, status: ORDER_STAGES[idx], stageIndex: idx }
                : s.activeOrder,
            }));
            if (idx < ORDER_STAGES.length - 1) advance();
          }, 12000);
        };
        setTimeout(advance, 8000);
      },

      // ── Notifications ─────────────────────────────────────────────────────
      addNotification: (msg, type = 'info') => {
        const n = { id: Date.now(), message: msg, type, time: 'Just now', read: false };
        set(s => ({ notifications: [n, ...s.notifications] }));
      },
      markAllRead: () => set(s => ({ notifications: s.notifications.map(n => ({ ...n, read: true })) })),

      getCustomerOrders: (customerName) => get().orders.filter(o => o.customer === customerName),
    }),
    { name: 'quickbite-orders' }
  )
);

export default useOrderStore;

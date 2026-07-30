import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_ORDERS } from '../data/mockData';

const ORDER_STAGES = ['Received', 'Preparing', 'Cooking', 'Ready', 'Completed'];

const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: MOCK_ORDERS,
      activeOrder: null,
      notifications: [
        { id: 'n1', message: 'Order QB-2024-001 is ready for pickup!', type: 'success', time: '2 min ago', read: false },
        { id: 'n2', message: 'Your payment of ₹180 was successful.',    type: 'payment', time: '5 min ago', read: false },
        { id: 'n3', message: 'Order QB-2023-099 has been delivered.',   type: 'info',    time: '1 hr ago',  read: true  },
      ],

      placeOrder: (cartItems, orderType, paymentMethod, user) => {
        const id = `QB-${Date.now()}`;
        const token = `T-${String(Math.floor(Math.random() * 900) + 100)}`;
        const newOrder = {
          id,
          customer: user?.name || 'Guest',
          items: cartItems.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          total: cartItems.reduce((s, i) => s + i.price * i.qty, 0),
          status: 'Received',
          orderType,
          token,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          paymentMethod,
          stageIndex: 0,
          estimatedMinutes: cartItems.reduce((m, i) => Math.max(m, i.prepTime || 10), 0) + 2,
        };
        set(s => ({ orders: [newOrder, ...s.orders], activeOrder: newOrder }));
        // Simulate order progression
        get().simulateOrderProgress(id);
        return newOrder;
      },

      simulateOrderProgress: (orderId) => {
        const stages = ORDER_STAGES;
        let idx = 0;
        const advance = () => {
          idx++;
          if (idx >= stages.length) return;
          setTimeout(() => {
            set(s => ({
              orders: s.orders.map(o => o.id === orderId ? { ...o, status: stages[idx], stageIndex: idx } : o),
              activeOrder: s.activeOrder?.id === orderId ? { ...s.activeOrder, status: stages[idx], stageIndex: idx } : s.activeOrder,
            }));
            if (idx < stages.length - 1) advance();
          }, 12000); // advance every 12s for demo
        };
        setTimeout(advance, 8000);
      },

      cancelOrder: (orderId) => {
        const order = get().orders.find(o => o.id === orderId);
        if (!order || (order.stageIndex >= 2)) return false; // Can't cancel after Cooking
        set(s => ({
          orders: s.orders.map(o => o.id === orderId ? { ...o, status: 'Cancelled' } : o),
          activeOrder: s.activeOrder?.id === orderId ? { ...s.activeOrder, status: 'Cancelled' } : s.activeOrder,
        }));
        return true;
      },

      updateOrderStatus: (orderId, status) => {
        const stageIndex = ORDER_STAGES.indexOf(status);
        set(s => ({
          orders: s.orders.map(o => o.id === orderId ? { ...o, status, stageIndex } : o),
        }));
      },

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

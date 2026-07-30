import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import useOrderStore from '../../store/orderStore';
import useAuthStore from '../../store/authStore';

const STATUS_COLORS = {
  Received:   'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  Preparing:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400',
  Cooking:    'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
  Ready:      'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  Completed:  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  Cancelled:  'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
};

const OrdersPage = () => {
  const { orders } = useOrderStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const myOrders = user ? orders.filter(o => o.customer === user.name || true) : orders; // show all for demo

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">My Orders 📦</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">{myOrders.length} orders total</p>

          {myOrders.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
              <p className="font-bold text-xl text-gray-700 dark:text-gray-300">No orders yet</p>
              <button onClick={() => navigate('/customer/menu')} className="btn-primary mt-6">Order Now</button>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order, i) => (
                <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }} className="card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{order.id}</p>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || ''}`}>
                          {order.status}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                          {order.orderType}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{order.time}</span>
                        <span>Token: <strong className="text-gray-600 dark:text-gray-300">{order.token}</strong></span>
                        <span>via {order.paymentMethod}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg gradient-text">₹{order.total}</p>
                      {(order.status !== 'Completed' && order.status !== 'Cancelled') && (
                        <button onClick={() => navigate('/customer/order-tracking')}
                          className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 font-medium mt-2">
                          Track <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrdersPage;

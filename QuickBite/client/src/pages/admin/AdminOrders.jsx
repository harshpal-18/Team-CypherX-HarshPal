import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle, Clock, ChefHat, Package, X, Eye } from 'lucide-react';
import useOrderStore from '../../store/orderStore';
import useUiStore from '../../store/uiStore';

const STATUSES = ['All', 'Received', 'Preparing', 'Cooking', 'Ready', 'Completed', 'Cancelled'];

const STATUS_COLORS = {
  Received:   'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  Preparing:  'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-400',
  Cooking:    'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
  Ready:      'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400',
  Completed:  'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  Cancelled:  'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400',
};

const NEXT_STATUS = { Received: 'Preparing', Preparing: 'Cooking', Cooking: 'Ready', Ready: 'Completed' };
const NEXT_LABEL  = { Received: 'Mark Preparing', Preparing: 'Mark Cooking', Cooking: 'Mark Ready', Ready: 'Mark Completed' };
const NEXT_ICON   = { Received: <Clock className="w-4 h-4" />, Preparing: <ChefHat className="w-4 h-4" />, Cooking: <Package className="w-4 h-4" />, Ready: <CheckCircle className="w-4 h-4" /> };

const AdminOrders = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const { orders, updateOrderStatus } = useOrderStore();
  const { addToast } = useUiStore();

  const filtered = orders.filter(o => {
    const matchSearch = search === '' || o.id.includes(search) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const advance = (order) => {
    const next = NEXT_STATUS[order.status];
    if (next) { updateOrderStatus(order.id, next); addToast(`Order ${order.id} → ${next}`, 'success'); }
  };

  const reject = (order) => {
    if (order.stageIndex >= 2) { addToast("Can't cancel — cooking has started", 'error'); return; }
    updateOrderStatus(order.id, 'Cancelled');
    addToast(`Order ${order.id} rejected`, 'warning');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Order Management</h1>
          <p className="text-gray-500 text-sm">{filtered.length} orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search order ID or customer..."
            className="input pl-10 py-2.5 text-sm" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${statusFilter === s ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary-300'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Order ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Items</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Total</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((order, i) => (
                <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{order.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {order.customer[0]}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-[180px] truncate">
                    {order.items.map(i => `${i.name}×${i.qty}`).join(', ')}
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">₹{order.total}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">{order.orderType}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || ''}`}>{order.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {NEXT_STATUS[order.status] && (
                        <button onClick={() => advance(order)}
                          className="flex items-center gap-1 px-2.5 py-1.5 bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-xl text-xs font-semibold hover:bg-primary-100 transition-colors">
                          {NEXT_ICON[order.status]} {NEXT_LABEL[order.status]}
                        </button>
                      )}
                      {order.status !== 'Cancelled' && order.status !== 'Completed' && (order.stageIndex || 0) < 2 && (
                        <button onClick={() => reject(order)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

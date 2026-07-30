import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, ShieldOff, ShoppingBag, TrendingUp } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../../data/mockData';
import useUiStore from '../../store/uiStore';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [search, setSearch] = useState('');
  const { addToast } = useUiStore();

  const filtered = customers.filter(c =>
    search === '' || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search)
  );

  const toggleBlock = (id) => {
    setCustomers(cs => cs.map(c => c.id === id ? { ...c, isBlocked: !c.isBlocked } : c));
    const cust = customers.find(c => c.id === id);
    addToast(`${cust.name} ${cust.isBlocked ? 'unblocked' : 'blocked'}`, cust.isBlocked ? 'success' : 'warning');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Customer Management</h1>
        <p className="text-gray-500 text-sm">{customers.length} registered customers</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers..." className="input pl-10 py-2.5 text-sm" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Contact</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Orders</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Total Spent</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Joined</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filtered.map((c, i) => (
                <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors ${c.isBlocked ? 'opacity-60' : ''}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-2xl bg-primary-100" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{c.name}</p>
                        <p className="text-xs text-gray-400">ID: {c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-700 dark:text-gray-300">{c.email}</p>
                    <p className="text-xs text-gray-400">{c.phone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                      <ShoppingBag className="w-3.5 h-3.5 text-primary-400" /> {c.orders}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold gradient-text">₹{c.totalSpent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{c.joinDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.isBlocked ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'}`}>
                      {c.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleBlock(c.id)}
                      className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-colors ${
                        c.isBlocked
                          ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 hover:bg-green-100'
                          : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100'
                      }`}>
                      {c.isBlocked ? <><Shield className="w-3.5 h-3.5" /> Unblock</> : <><ShieldOff className="w-3.5 h-3.5" /> Block</>}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;

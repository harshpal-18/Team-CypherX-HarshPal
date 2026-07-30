import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Save, ShoppingBag, Star, CalendarDays } from 'lucide-react';
import Navbar from '../../components/Navbar';
import useAuthStore from '../../store/authStore';
import useOrderStore from '../../store/orderStore';
import useUiStore from '../../store/uiStore';

const ProfilePage = () => {
  const { user, updateProfile } = useAuthStore();
  const { orders } = useOrderStore();
  const { addToast } = useUiStore();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);

  const myOrders = orders.slice(0, 5);
  const totalSpent = orders.reduce((s, o) => s + (o.total || 0), 0);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateProfile(form);
    addToast('Profile updated!', 'success');
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-8">My Profile 👤</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1 space-y-4">
              <div className="card p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-3xl flex items-center justify-center text-white text-3xl font-black mx-auto mb-4 shadow-card-lg">
                  {user?.name?.[0] || 'U'}
                </div>
                <h2 className="font-display font-bold text-xl text-gray-900 dark:text-white">{user?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <div className="text-center p-3 bg-primary-50 dark:bg-primary-950/30 rounded-2xl">
                    <p className="font-bold text-lg gradient-text">{orders.length}</p>
                    <p className="text-xs text-gray-400">Orders</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-2xl">
                    <p className="font-bold text-lg text-green-600">₹{totalSpent}</p>
                    <p className="text-xs text-gray-400">Spent</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-2xl">
                    <p className="font-bold text-lg text-yellow-600">4.8</p>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                </div>
              </div>

              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/customer/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm text-gray-600 dark:text-gray-400">
                    <ShoppingBag className="w-4 h-4 text-primary-500" /> View All Orders
                  </Link>
                  <Link to="/customer/table-booking" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm text-gray-600 dark:text-gray-400">
                    <CalendarDays className="w-4 h-4 text-primary-500" /> Book a Table
                  </Link>
                  <Link to="/customer/menu" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-primary-500" /> Browse Menu
                  </Link>
                </div>
              </div>
            </div>

            {/* Edit Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-5">Personal Information</h3>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="input pl-11" placeholder="Your name" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="input pl-11" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="input pl-11" />
                    </div>
                  </div>
                  <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={saving}
                    className="btn-primary py-3 px-6">
                    {saving
                      ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving...</span>
                      : <><Save className="w-4 h-4" /> Save Changes</>}
                  </motion.button>
                </form>
              </div>

              {/* Recent Orders */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
                  <Link to="/customer/orders" className="text-sm text-primary-500 hover:text-primary-600 font-medium">View all →</Link>
                </div>
                <div className="space-y-3">
                  {myOrders.map(o => (
                    <div key={o.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{o.id}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{o.items.map(i => i.name).join(', ').slice(0, 40)}...</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm gradient-text">₹{o.total}</p>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          o.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          o.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, CreditCard, Info, X, CheckCheck } from 'lucide-react';
import Navbar from '../../components/Navbar';
import useOrderStore from '../../store/orderStore';

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  payment: <CreditCard className="w-5 h-5 text-blue-500" />,
  info:    <Info className="w-5 h-5 text-primary-500" />,
  error:   <X className="w-5 h-5 text-red-500" />,
};

const NotificationsPage = () => {
  const { notifications, markAllRead } = useOrderStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Notifications 🔔</h1>
            <p className="text-gray-400 text-sm mt-1">{notifications.filter(n => !n.read).length} unread</p>
          </div>
          <button onClick={markAllRead} className="flex items-center gap-2 text-sm text-primary-500 font-medium hover:text-primary-600">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
            <p className="font-bold text-xl text-gray-600 dark:text-gray-300">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`card p-4 flex items-start gap-4 transition-all ${!n.read ? 'border-l-4 border-l-primary-400' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${!n.read ? 'bg-primary-50 dark:bg-primary-950/40' : 'bg-gray-50 dark:bg-gray-900'}`}>
                  {ICONS[n.type] || ICONS.info}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{n.message}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                </div>
                {!n.read && <span className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0 mt-1.5" />}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

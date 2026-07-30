import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, ShoppingBag, CreditCard } from 'lucide-react';
import useUiStore from '../store/uiStore';

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error:   <AlertCircle  className="w-5 h-5 text-red-500" />,
  info:    <Info         className="w-5 h-5 text-blue-500" />,
  warning: <AlertCircle  className="w-5 h-5 text-yellow-500" />,
  cart:    <ShoppingBag  className="w-5 h-5 text-primary-500" />,
  payment: <CreditCard   className="w-5 h-5 text-green-500" />,
};

const colors = {
  success: 'border-l-green-500',
  error:   'border-l-red-500',
  info:    'border-l-blue-500',
  warning: 'border-l-yellow-500',
  cart:    'border-l-primary-500',
  payment: 'border-l-green-500',
};

const ToastContainer = () => {
  const { toasts, removeToast } = useUiStore();

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`pointer-events-auto flex items-start gap-3 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 border-l-4 ${colors[toast.type] || colors.info} p-4 max-w-sm w-full`}
          >
            <div className="mt-0.5">{icons[toast.type] || icons.info}</div>
            <p className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;

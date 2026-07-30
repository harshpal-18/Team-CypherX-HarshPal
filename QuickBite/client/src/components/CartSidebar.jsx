import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import useUiStore from '../store/uiStore';

const ORDER_TYPES = ['Dine In', 'Take Away', 'Parcel'];

const CartSidebar = ({ open, onClose }) => {
  const { items, orderType, setOrderType, updateQty, removeItem, getTotal, promoApplied, applyPromo, removePromo } = useCartStore();
  const { addToast } = useUiStore();
  const [promoInput, setPromoInput] = React.useState('');
  const { subtotal, discount, taxes, total } = getTotal();

  const handlePromo = () => {
    const ok = applyPromo(promoInput.trim().toUpperCase());
    if (ok) addToast('Promo code applied! 10% off 🎉', 'success');
    else addToast('Invalid promo code', 'error');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-950 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary-500" />
                <h2 className="font-display font-bold text-lg text-gray-900 dark:text-white">Your Cart</h2>
                {items.length > 0 && <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{items.length}</span>}
              </div>
              <button onClick={onClose} className="btn-ghost p-2"><X className="w-5 h-5" /></button>
            </div>

            {/* Order Type */}
            <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800">
              <p className="text-xs text-gray-500 mb-2 font-medium">Order Type</p>
              <div className="flex gap-2">
                {ORDER_TYPES.map(t => (
                  <button key={t} onClick={() => setOrderType(t)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border-2 transition-all duration-200 ${
                      orderType === t
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/50 text-primary-600 dark:text-primary-400'
                        : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-primary-300'
                    }`}>{t}</button>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
                  <div className="w-20 h-20 bg-primary-50 dark:bg-primary-950/30 rounded-3xl flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">Add delicious items from the menu!</p>
                  </div>
                  <button onClick={onClose} className="btn-primary text-sm py-2.5">Browse Menu</button>
                </div>
              ) : items.map(item => (
                <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-900"
                >
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'; }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-primary-500 font-bold text-sm">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-50 transition-colors">
                      {item.qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-400" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="w-5 text-center text-sm font-bold text-gray-800 dark:text-white">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white hover:shadow-card transition-all">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 px-6 py-4 space-y-3">
                {/* Promo */}
                <div className="flex gap-2">
                  {promoApplied ? (
                    <div className="flex-1 flex items-center justify-between px-3 py-2.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
                      <span className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400 font-medium"><Tag className="w-4 h-4" /> COMBO10 applied!</span>
                      <button onClick={removePromo} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                    </div>
                  ) : (
                    <>
                      <input value={promoInput} onChange={e => setPromoInput(e.target.value)} placeholder="Promo code (COMBO10)"
                        className="flex-1 input py-2.5 text-sm" onKeyDown={e => e.key === 'Enter' && handlePromo()} />
                      <button onClick={handlePromo} className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-950/50 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 transition-colors">Apply</button>
                    </>
                  )}
                </div>
                {/* Totals */}
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount (10%)</span><span>−₹{discount}</span></div>}
                  <div className="flex justify-between text-gray-500"><span>GST (5%)</span><span>₹{taxes}</span></div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base border-t border-gray-100 dark:border-gray-800 pt-2">
                    <span>Total</span><span className="gradient-text">₹{total}</span>
                  </div>
                </div>
                <Link to="/customer/payment" onClick={onClose}
                  className="btn-primary w-full justify-center text-base py-3.5">
                  Proceed to Pay <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

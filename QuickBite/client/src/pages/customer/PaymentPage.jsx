import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, Banknote, Building2, ArrowLeft, ArrowRight, CheckCircle, Lock, Shield } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '../../components/Navbar';
import useCartStore from '../../store/cartStore';
import useOrderStore from '../../store/orderStore';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';

const PAYMENT_METHODS = [
  { id: 'cash',    label: 'Cash',            icon: <Banknote className="w-6 h-6" />,     desc: 'Pay at the counter on pickup' },
  { id: 'upi',     label: 'UPI',             icon: <Smartphone className="w-6 h-6" />,   desc: 'GPay, PhonePe, Paytm & more' },
  { id: 'card',    label: 'Credit/Debit Card',icon: <CreditCard className="w-6 h-6" />,  desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbank', label: 'Net Banking',      icon: <Building2 className="w-6 h-6" />,   desc: 'All major Indian banks' },
];

const PaymentPage = () => {
  const [step, setStep] = useState(1); // 1=method, 2=details, 3=success
  const [method, setMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const { items, orderType, getTotal, clearCart } = useCartStore();
  const { placeOrder } = useOrderStore();
  const { user } = useAuthStore();
  const { addToast } = useUiStore();
  const navigate = useNavigate();
  const { subtotal, discount, taxes, total } = getTotal();

  const handlePay = async () => {
    setProcessing(true);
    try {
      await new Promise(r => setTimeout(r, 1800));
      // NOTE: placeOrder is async (it calls the backend API and falls back to
      // offline mode if that fails) — it must be awaited or `order` will be
      // a pending Promise instead of the actual order object, which was why
      // Order ID / Token / Est. Time / Total Paid showed up blank.
      const order = await placeOrder(items, orderType, method, user, {
        subtotal,
        discount,
        taxes,
        total,
      });
      setPlacedOrder(order);
      clearCart();
      addToast('Payment successful! Your order is placed 🎉', 'payment');
      setStep(3);
    } catch (err) {
      console.error('Payment failed:', err);
      addToast('Something went wrong placing your order. Please try again.', 'error');
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-4 pt-20">
          <div className="text-6xl">🛒</div>
          <p className="font-bold text-xl text-gray-700 dark:text-gray-300">Your cart is empty</p>
          <button onClick={() => navigate('/customer/menu')} className="btn-primary">Go to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        {/* Back to Home */}
        {step < 3 && (
          <button
            onClick={() => navigate('/customer/menu')}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        )}

        {/* Progress steps */}
        {step < 3 && (
          <div className="flex items-center gap-2 mb-8">
            {['Method', 'Confirm', 'Success'].map((s, i) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    i + 1 <= step ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}>{i + 1}</div>
                  <span className={`text-sm font-medium hidden sm:block ${i + 1 <= step ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{s}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-0.5 ${i + 1 < step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* ── Step 1: Method Selection ── */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-6">Choose Payment Method</h1>
              <div className="space-y-3 mb-6">
                {PAYMENT_METHODS.map(pm => (
                  <button key={pm.id} onClick={() => setMethod(pm.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      method === pm.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/40' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-primary-300'
                    }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method === pm.id ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                      {pm.icon}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900 dark:text-white">{pm.label}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{pm.desc}</p>
                    </div>
                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === pm.id ? 'border-primary-500' : 'border-gray-300'}`}>
                      {method === pm.id && <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Summary Card */}
              <div className="card p-5 mb-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Order Summary ({orderType})</h3>
                <div className="space-y-2 mb-4">
                  {items.map(i => (
                    <div key={i.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{i.name} × {i.qty}</span><span>₹{i.price * i.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−₹{discount}</span></div>}
                  <div className="flex justify-between text-gray-500"><span>GST (5%)</span><span>₹{taxes}</span></div>
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base border-t border-gray-100 dark:border-gray-800 pt-2">
                    <span>Total</span><span className="gradient-text">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <Shield className="w-4 h-4 text-green-500" /><Lock className="w-3.5 h-3.5 text-green-500" />
                Payments are secure & encrypted
              </div>

              <button onClick={() => setStep(2)} className="btn-primary w-full justify-center py-4 text-base">
                Continue to Confirm <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* ── Step 2: Confirm & Pay ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-6">Confirm & Pay</h1>

              {/* UPI details */}
              {method === 'upi' && (
                <div className="card p-5 mb-4">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">UPI Details</p>
                  <input className="input mb-3" placeholder="Enter UPI ID (e.g. yourname@upi)" />
                  <div className="grid grid-cols-3 gap-2">
                    {['GPay', 'PhonePe', 'Paytm'].map(a => (
                      <div key={a} className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:border-primary-400 transition-colors">{a}</div>
                    ))}
                  </div>
                </div>
              )}

              {method === 'card' && (
                <div className="card p-5 mb-4 space-y-3">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Card Details</p>
                  <input className="input" placeholder="Card Number (1234 5678 9012 3456)" />
                  <div className="grid grid-cols-2 gap-3">
                    <input className="input" placeholder="MM / YY" />
                    <input className="input" placeholder="CVV" />
                  </div>
                  <input className="input" placeholder="Cardholder Name" />
                </div>
              )}

              {method === 'netbank' && (
                <div className="card p-5 mb-4">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-sm">Select Bank</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(b => (
                      <div key={b} className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:border-primary-400 transition-colors text-center">{b}</div>
                    ))}
                  </div>
                </div>
              )}

              {method === 'cash' && (
                <div className="card p-5 mb-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">💵 Cash on Pickup</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1">Please keep exact change of <strong>₹{total}</strong> ready at the counter.</p>
                </div>
              )}

              <div className="card p-5 mb-6">
                <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                  <span>Amount to Pay</span><span className="gradient-text">₹{total}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">via {PAYMENT_METHODS.find(m => m.id === method)?.label}</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-outline px-5">
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <motion.button onClick={handlePay} disabled={processing} whileTap={{ scale: 0.97 }}
                  className="btn-primary flex-1 justify-center py-4 text-base">
                  {processing ? (
                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</span>
                  ) : `Pay ₹${total}`}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Success + QR ── */}
          {step === 3 && placedOrder && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-green-100 dark:bg-green-950/40 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>

              <h1 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-2">Order Placed! 🎉</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Your food is being prepared. Show QR code at counter.</p>

              <div className="card p-8 mb-6 inline-block">
                <QRCodeSVG
                  value={JSON.stringify({
                    orderId: placedOrder.orderId || placedOrder.id,
                    token: placedOrder.token,
                    total: placedOrder.total,
                  })}
                  size={180} level="H" includeMargin
                  fgColor="#ea580c"
                />
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">Your Token</p>
                  <p className="font-display font-black text-4xl gradient-text">{placedOrder.token}</p>
                  <p className="text-xs text-gray-400 mt-1">Order ID: {placedOrder.orderId || placedOrder.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="card p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">Est. Time</p>
                  <p className="font-bold text-gray-900 dark:text-white">{placedOrder.estimatedMinutes} min</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">Order Type</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{placedOrder.orderType}</p>
                </div>
                <div className="card p-4 text-center">
                  <p className="text-xs text-gray-400 mb-1">Total Paid</p>
                  <p className="font-bold gradient-text">₹{placedOrder.total}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => navigate('/customer/order-tracking')} className="btn-primary py-3.5 px-8">
                  Track Order Live
                </button>
                <button onClick={() => navigate('/customer/menu')} className="btn-outline py-3.5 px-8">
                  Order More
                </button>
              </div>

              <button
                onClick={() => navigate('/customer/menu')}
                className="mt-6 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PaymentPage;
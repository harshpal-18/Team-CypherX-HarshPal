import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ChefHat, Package, Utensils, X, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '../../components/Navbar';
import useOrderStore from '../../store/orderStore';

const STAGES = [
  { key: 'Received',   label: 'Order Received',  icon: <CheckCircle className="w-5 h-5" />,   desc: 'Your order has been received by the kitchen.' },
  { key: 'Preparing',  label: 'Preparing',        icon: <ChefHat className="w-5 h-5" />,       desc: 'The chef is preparing your ingredients.' },
  { key: 'Cooking',    label: 'Cooking',           icon: <Utensils className="w-5 h-5" />,      desc: 'Your food is being cooked right now!' },
  { key: 'Ready',      label: 'Ready for Pickup',  icon: <Package className="w-5 h-5" />,       desc: 'Your order is ready! Head to the counter.' },
  { key: 'Completed',  label: 'Completed',         icon: <CheckCircle className="w-5 h-5" />,   desc: 'Order delivered. Enjoy your meal! 😋' },
];

const OrderTrackingPage = () => {
  const { activeOrder, orders, cancelOrder } = useOrderStore();
  const navigate = useNavigate();
  const order = activeOrder || orders.find(o => o.status !== 'Cancelled' && o.status !== 'Completed') || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="text-6xl">🍽️</div>
          <p className="font-bold text-xl text-gray-700 dark:text-gray-300">No active orders</p>
          <button onClick={() => navigate('/customer/menu')} className="btn-primary">Order Now</button>
        </div>
      </div>
    );
  }

  const currentStageIdx = STAGES.findIndex(s => s.key === order.status);
  const progressPct = order.status === 'Cancelled' ? 0 : Math.round(((currentStageIdx + 1) / STAGES.length) * 100);
  const canCancel = currentStageIdx < 2 && order.status !== 'Cancelled';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Live Order Tracking</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Order ID: {order.id}</p>
            </div>
            {order.status !== 'Cancelled' && order.status !== 'Completed' && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-950/40 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-700 dark:text-green-400">Live</span>
              </div>
            )}
          </div>

          {/* Token + QR */}
          <div className="card p-6 mb-6 flex items-center gap-6">
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">Your Token</p>
              <p className="font-display font-black text-5xl gradient-text">{order.token}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{order.orderType} · {order.time}</p>
              {order.estimatedMinutes && order.status !== 'Completed' && order.status !== 'Cancelled' && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-primary-600 dark:text-primary-400 font-medium">
                  <Clock className="w-4 h-4" /> Est. {order.estimatedMinutes} min
                </div>
              )}
            </div>
            <div className="p-2 bg-white rounded-2xl shadow-sm">
              <QRCodeSVG value={JSON.stringify({ orderId: order.id, token: order.token })} size={80} fgColor="#ea580c" />
            </div>
          </div>

          {/* Progress Bar */}
          {order.status !== 'Cancelled' && (
            <div className="card p-6 mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Progress</span><span>{progressPct}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-6">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
              </div>

              {/* Stage Steps */}
              <div className="space-y-4">
                {STAGES.map((stage, i) => {
                  const done    = i < currentStageIdx;
                  const current = i === currentStageIdx;
                  const future  = i > currentStageIdx;
                  return (
                    <div key={stage.key} className="flex items-start gap-4">
                      <div className={`mt-0.5 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        done    ? 'bg-green-500 text-white' :
                        current ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-card animate-pulse-slow' :
                                  'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}>
                        {stage.icon}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className={`font-semibold text-sm ${current ? 'text-primary-600 dark:text-primary-400' : done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}`}>
                          {stage.label} {current && <span className="text-xs font-normal ml-1">← Current</span>}
                        </p>
                        {(done || current) && <p className="text-xs text-gray-400 mt-0.5">{stage.desc}</p>}
                      </div>
                      {done && <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cancelled */}
          {order.status === 'Cancelled' && (
            <div className="card p-6 mb-6 text-center bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <X className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="font-bold text-red-700 dark:text-red-400">Order Cancelled</p>
              <p className="text-sm text-red-500 mt-1">This order was cancelled. Refund will be processed in 2–5 business days.</p>
            </div>
          )}

          {/* Order Items */}
          <div className="card p-5 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>{item.name} × {item.qty}</span><span className="font-medium text-gray-800 dark:text-gray-200">₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
                <span>Total</span><span className="gradient-text">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {canCancel && (
              <button onClick={() => cancelOrder(order.id)} className="btn-outline border-red-300 text-red-500 hover:bg-red-50 flex-1 py-3">
                Cancel Order
              </button>
            )}
            {!canCancel && order.status !== 'Cancelled' && order.stageIndex >= 2 && (
              <div className="flex-1 px-4 py-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl text-sm text-orange-700 dark:text-orange-400 text-center">
                ⚠️ This order can no longer be cancelled.
              </div>
            )}
            <button onClick={() => navigate('/customer/orders')} className="btn-ghost flex-1 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl">
              View All Orders
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;

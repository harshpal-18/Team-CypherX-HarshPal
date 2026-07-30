'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, ChefHat, Package, Bell, MapPin, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'collected';

const STEPS: { key: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { key: 'pending', label: 'Order Received', icon: Package, desc: 'Canteen received your order' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, desc: 'Chef is cooking your food' },
  { key: 'ready', label: 'Ready!', icon: Bell, desc: 'Food is ready at the counter' },
  { key: 'collected', label: 'Collected', icon: CheckCircle2, desc: 'Enjoy your meal!' },
];

const STEP_COLORS: Record<OrderStatus, string> = {
  pending: '#F59E0B',
  preparing: '#3B82F6',
  ready: '#10B981',
  collected: '#8B5CF6',
};

export default function TrackPage() {
  const [status, setStatus] = useState<OrderStatus>('preparing');
  const [waitTime, setWaitTime] = useState(12);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('just now');

  const currentStepIdx = STEPS.findIndex(s => s.key === status);
  const color = STEP_COLORS[status];

  const refresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 800));
    setRefreshing(false);
    setLastUpdated('just now');
    toast.info('Order status refreshed');
  };

  const simulateNext = () => {
    const next: Record<OrderStatus, OrderStatus> = {
      pending: 'preparing',
      preparing: 'ready',
      ready: 'collected',
      collected: 'collected',
    };
    const n = next[status];
    setStatus(n);
    if (n === 'ready') {
      toast.success('🔔 Your order A-124 is Ready! Please collect from Counter 2.', {
        duration: 6000,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-purple-400" /> Track Order
          </h1>
          <p className="text-white/40 text-sm">Token A-124 · Order #ORD-124</p>
        </div>
        <button
          onClick={refresh}
          className="glass rounded-xl p-2.5 text-white/40 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Status Card */}
      <motion.div
        key={status}
        initial={{ scale: 0.97, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-3xl p-8 text-center"
        style={{ borderColor: `${color}40`, boxShadow: `0 0 40px ${color}15` }}
      >
        {status === 'ready' && (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            className="text-6xl mb-4"
          >
            🔔
          </motion.div>
        )}
        {status === 'preparing' && <div className="text-6xl mb-4">👨‍🍳</div>}
        {status === 'pending' && <div className="text-6xl mb-4">📋</div>}
        {status === 'collected' && <div className="text-6xl mb-4">✅</div>}

        <div className="text-xs text-white/40 uppercase tracking-widest mb-2">Current Status</div>
        <div className="text-3xl font-black mb-2" style={{ color }}>
          {STEPS.find(s => s.key === status)?.label}
        </div>
        <div className="text-white/50 text-sm">
          {STEPS.find(s => s.key === status)?.desc}
        </div>

        {status !== 'collected' && (
          <div className="mt-6 glass rounded-2xl p-4 inline-flex items-center gap-3">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div className="text-left">
              <div className="text-xs text-white/40">Estimated Wait</div>
              <div className="text-xl font-black text-yellow-400">{waitTime} minutes</div>
            </div>
          </div>
        )}

        {status === 'ready' && (
          <div className="mt-4 glass rounded-2xl p-4">
            <div className="text-sm font-semibold text-green-400">Please collect from Counter 2</div>
            <div className="text-xs text-white/40 mt-1">Show token A-124 or scan QR code</div>
          </div>
        )}
      </motion.div>

      {/* Status pipeline */}
      <div className="glass rounded-2xl p-6">
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const isDone = i < currentStepIdx;
            const isActive = i === currentStepIdx;
            const stepColor = isActive ? color : isDone ? '#10B981' : 'rgba(255,255,255,0.1)';
            return (
              <div key={step.key} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${stepColor}20`,
                      border: `2px solid ${stepColor}`,
                      boxShadow: isActive ? `0 0 15px ${stepColor}50` : 'none',
                    }}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <div style={{ color: stepColor }}><step.icon className="w-5 h-5" /></div>
                    )}
                  </motion.div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="w-0.5 h-8 mt-1 rounded-full transition-all duration-500"
                      style={{ background: isDone ? '#10B981' : 'rgba(255,255,255,0.08)' }}
                    />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <div className={`font-semibold text-sm ${isActive ? 'text-white' : isDone ? 'text-green-400' : 'text-white/30'}`}>
                    {step.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${isActive ? 'text-white/60' : isDone ? 'text-white/30' : 'text-white/20'}`}>
                    {step.desc}
                  </div>
                  {isActive && (
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                      <span className="text-xs text-blue-400">In progress...</span>
                    </div>
                  )}
                </div>
                {isDone && <div className="text-xs text-green-400 pt-2">Done ✓</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order details */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-bold text-white text-sm mb-3">Order Details</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">Items</div>
            <div className="text-white text-sm">Burger ×2, Coffee ×1</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">Pickup Slot</div>
            <div className="text-white font-semibold">12:45 PM</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">Counter</div>
            <div className="text-white font-semibold">Counter 2</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">Total Paid</div>
            <div className="text-purple-400 font-black">₹220</div>
          </div>
        </div>
      </div>

      {/* Demo controls */}
      <div className="glass rounded-2xl p-4 border border-dashed border-white/10">
        <div className="text-xs text-white/30 mb-3 text-center">🎮 Demo: Simulate order progression</div>
        <button
          onClick={simulateNext}
          disabled={status === 'collected'}
          className="w-full btn-gradient rounded-xl py-3 text-white text-sm font-bold disabled:opacity-40"
        >
          {status === 'collected' ? '✅ Order Complete!' : `Advance to next step →`}
        </button>
      </div>
    </div>
  );
}

'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MENU_ITEMS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Clock, CheckCircle2, ChefHat, Package, X, ArrowRight, Zap } from 'lucide-react';
import { toast } from 'sonner';

type Status = 'pending' | 'preparing' | 'ready' | 'collected';

interface KanbanOrder {
  id: string;
  token: string;
  student: string;
  items: string;
  total: number;
  slot: string;
  time: string;
  status: Status;
  prepTime: number;
}

const INIT_ORDERS: KanbanOrder[] = [
  { id: 'ORD-125', token: 'A-125', student: 'Rahul V.', items: 'Samosa ×2, Mango Shake ×1', total: 120, slot: '1:00 PM', time: '2m ago', status: 'pending', prepTime: 6 },
  { id: 'ORD-126', token: 'A-126', student: 'Priya S.', items: 'Veg Noodles ×1, Coffee ×1', total: 150, slot: '12:45 PM', time: '4m ago', status: 'pending', prepTime: 15 },
  { id: 'ORD-127', token: 'A-127', student: 'Amit K.', items: 'Burger ×3', total: 240, slot: '12:45 PM', time: '6m ago', status: 'pending', prepTime: 10 },
  { id: 'ORD-121', token: 'A-121', student: 'Harsh P.', items: 'Pizza ×1, Fries ×1', total: 175, slot: '12:45 PM', time: '9m ago', status: 'preparing', prepTime: 18 },
  { id: 'ORD-122', token: 'A-122', student: 'Sneha M.', items: 'Brownie ×2', total: 90, slot: '12:30 PM', time: '12m ago', status: 'preparing', prepTime: 4 },
  { id: 'ORD-118', token: 'A-118', student: 'Ankit R.', items: 'Burger ×2, Coffee ×1', total: 220, slot: '12:30 PM', time: '18m ago', status: 'ready', prepTime: 0 },
  { id: 'ORD-117', token: 'A-117', student: 'Riya T.', items: 'Noodles ×1', total: 90, slot: '12:30 PM', time: '22m ago', status: 'ready', prepTime: 0 },
  { id: 'ORD-115', token: 'A-115', student: 'Karan L.', items: 'Samosa ×4', total: 100, slot: '12:30 PM', time: '30m ago', status: 'collected', prepTime: 0 },
];

const COLUMNS: { key: Status; label: string; icon: React.ComponentType<{className?:string}>; color: string; bg: string }[] = [
  { key: 'pending', label: 'Pending', icon: Clock, color: '#F59E0B', bg: 'from-yellow-500/10 to-transparent' },
  { key: 'preparing', label: 'Preparing', icon: ChefHat, color: '#3B82F6', bg: 'from-blue-500/10 to-transparent' },
  { key: 'ready', label: 'Ready', icon: CheckCircle2, color: '#10B981', bg: 'from-green-500/10 to-transparent' },
  { key: 'collected', label: 'Collected', icon: Package, color: '#8B5CF6', bg: 'from-purple-500/10 to-transparent' },
];

const NEXT_STATUS: Partial<Record<Status, Status>> = {
  pending: 'preparing',
  preparing: 'ready',
  ready: 'collected',
};

const ACTION_LABELS: Partial<Record<Status, string>> = {
  pending: 'Start Cooking',
  preparing: 'Mark Ready',
  ready: 'Mark Collected',
};

export default function VendorOrdersPage() {
  const [orders, setOrders] = useState<KanbanOrder[]>(INIT_ORDERS);
  const [selected, setSelected] = useState<KanbanOrder | null>(null);

  const advance = (id: string) => {
    setOrders(o => o.map(ord => {
      if (ord.id !== id) return ord;
      const next = NEXT_STATUS[ord.status];
      if (!next) return ord;
      if (next === 'ready') toast.success(`🔔 Token ${ord.token} is Ready! Notifying student...`);
      return { ...ord, status: next };
    }));
    setSelected(null);
  };

  const cancel = (id: string) => {
    setOrders(o => o.filter(ord => ord.id !== id));
    setSelected(null);
    toast.error('Order cancelled');
  };

  const byStatus = (s: Status) => orders.filter(o => o.status === s);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Order Management</h1>
          <p className="text-white/40 text-sm">{orders.length} total orders today</p>
        </div>
        <div className="flex gap-3">
          {COLUMNS.map(col => (
            <div key={col.key} className="glass rounded-xl px-3 py-1.5 text-xs" style={{ color: col.color }}>
              {byStatus(col.key).length} {col.label}
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => (
          <div key={col.key} className={`glass rounded-2xl p-4 bg-gradient-to-b ${col.bg} min-h-[400px]`}>
            {/* Column header */}
            <div className="flex items-center gap-2 mb-4">
              <span style={{ color: col.color }}><col.icon className="w-4 h-4" /></span>
              <span className="font-bold text-sm text-white">{col.label}</span>
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${col.color}20`, color: col.color }}
              >
                {byStatus(col.key).length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              <AnimatePresence>
                {byStatus(col.key).map(order => (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelected(order)}
                    className="glass kanban-card rounded-xl p-4 cursor-pointer"
                    style={{ borderColor: `${col.color}20` }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="font-black text-sm" style={{ color: col.color }}>{order.token}</span>
                        <div className="text-xs text-white/40">{order.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/40">{order.time}</div>
                        <div className="font-bold text-white text-sm">{formatCurrency(order.total)}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/60 mb-2 leading-relaxed">{order.items}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/30">🕐 {order.slot}</span>
                      <span className="text-xs text-white/30">{order.student}</span>
                    </div>
                    {NEXT_STATUS[order.status] && (
                      <button
                        onClick={e => { e.stopPropagation(); advance(order.id); }}
                        className="mt-3 w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        style={{ background: `${col.color}20`, color: col.color }}
                      >
                        <Zap className="w-3 h-3" /> {ACTION_LABELS[order.status]}
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {byStatus(col.key).length === 0 && (
                <div className="text-center py-10 text-white/20 text-sm">No orders</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-md mx-auto glass-strong rounded-3xl p-6 z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-black text-white text-xl">{selected.token}</h2>
                  <div className="text-white/40 text-sm">{selected.id} · {selected.student}</div>
                </div>
                <button onClick={() => setSelected(null)} className="glass rounded-xl p-2 text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="glass rounded-xl p-4 mb-4">
                <div className="text-xs text-white/40 mb-2">Order Items</div>
                <div className="text-white">{selected.items}</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-xs text-white/40">Slot</div>
                  <div className="font-bold text-white text-sm">{selected.slot}</div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-xs text-white/40">Total</div>
                  <div className="font-bold text-white text-sm">{formatCurrency(selected.total)}</div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-xs text-white/40">Status</div>
                  <div className="font-bold text-white text-sm capitalize">{selected.status}</div>
                </div>
              </div>
              <div className="flex gap-3">
                {NEXT_STATUS[selected.status] && (
                  <button
                    onClick={() => advance(selected.id)}
                    className="flex-1 btn-gradient py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4" /> {ACTION_LABELS[selected.status]}
                  </button>
                )}
                {selected.status === 'pending' && (
                  <button
                    onClick={() => cancel(selected.id)}
                    className="px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

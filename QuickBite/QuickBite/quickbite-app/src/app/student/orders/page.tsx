'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MOCK_ORDERS } from '@/lib/data';
import { formatCurrency, getStatusColor, getStatusLabel } from '@/lib/utils';
import { History, Star, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const ALL_ORDERS = [
  ...MOCK_ORDERS,
  {
    id: 'ORD-115', tokenId: 'A-115', studentName: 'Harsh Pal', studentId: 'STU001',
    items: [{ item: { id: 'm9', name: 'Samosa', price: 25, emoji: '🥟' } as any, qty: 4 }],
    total: 100, status: 'collected' as const, slot: '12:30 PM',
    placedAt: '2026-07-29T07:00:00Z', estimatedTime: 5, counter: 1,
  },
  {
    id: 'ORD-108', tokenId: 'A-108', studentName: 'Harsh Pal', studentId: 'STU001',
    items: [
      { item: { id: 'm3', name: 'Margherita Pizza', price: 120, emoji: '🍕' } as any, qty: 1 },
      { item: { id: 'm5', name: 'Cold Coffee', price: 60, emoji: '☕' } as any, qty: 2 },
    ],
    total: 240, status: 'collected' as const, slot: '01:00 PM',
    placedAt: '2026-07-28T07:30:00Z', estimatedTime: 15, counter: 2,
  },
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} onClick={() => onChange(s)}>
          <Star className={`w-5 h-5 ${s <= value ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
        </button>
      ))}
    </div>
  );
}

export default function OrderHistoryPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const setRating = (orderId: string, val: number) => {
    setRatings(r => ({ ...r, [orderId]: val }));
    toast.success('Thanks for your feedback! ⭐');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <History className="w-6 h-6 text-purple-400" /> Order History
        </h1>
        <p className="text-white/40 text-sm">{ALL_ORDERS.length} orders placed</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: ALL_ORDERS.length, color: '#8B5CF6' },
          { label: 'Total Spent', value: `₹${ALL_ORDERS.reduce((s, o) => s + o.total, 0)}`, color: '#3B82F6' },
          { label: 'Completed', value: ALL_ORDERS.filter(o => o.status === 'collected').length, color: '#10B981' },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-2xl p-4 text-center">
            <div className="text-2xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-white/40">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Order list */}
      <div className="space-y-3">
        {ALL_ORDERS.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 btn-gradient rounded-xl flex items-center justify-center text-sm font-black text-white">
                  {order.tokenId.split('-')[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{order.tokenId} · #{order.id}</div>
                  <div className="text-xs text-white/40">
                    {order.items.map(i => i.item.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
                <span className="font-bold text-white text-sm">{formatCurrency(order.total)}</span>
                {expanded === order.id ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
              </div>
            </div>

            {/* Expanded details */}
            {expanded === order.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="border-t border-white/5 p-4"
              >
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <div className="text-xs text-white/40">Pickup Slot</div>
                    <div className="text-white font-medium">{order.slot}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40">Counter</div>
                    <div className="text-white font-medium">Counter {order.counter}</div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map(({ item, qty }) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-white/70">{item.emoji} {item.name} ×{qty}</span>
                      <span className="text-white">{formatCurrency(item.price * qty)}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 items-center justify-between">
                  {order.status === 'collected' && (
                    <div>
                      <div className="text-xs text-white/40 mb-1">Rate this order</div>
                      <StarRating
                        value={ratings[order.id] || 0}
                        onChange={v => setRating(order.id, v)}
                      />
                    </div>
                  )}
                  <button
                    onClick={() => toast.success('Items added to cart!')}
                    className="ml-auto glass px-4 py-2 rounded-xl text-sm text-purple-400 hover:text-purple-300 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reorder
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

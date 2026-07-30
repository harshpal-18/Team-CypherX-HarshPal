'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MENU_ITEMS, SLOTS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { ShoppingCart, Plus, Minus, Trash2, Clock, Tag, CheckCircle2, Users, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

// Simulated cart items
const INIT_CART = [
  { item: MENU_ITEMS[0], qty: 2 },
  { item: MENU_ITEMS[4], qty: 1 },
];

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState(INIT_CART);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [placing, setPlacing] = useState(false);

  const subtotal = cart.reduce((sum, { item, qty }) => sum + item.price * qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const updateQty = (id: string, delta: number) => {
    setCart(c => c.map(ci => ci.item.id === id ? { ...ci, qty: Math.max(1, ci.qty + delta) } : ci));
  };
  const removeItem = (id: string) => {
    setCart(c => c.filter(ci => ci.item.id !== id));
    toast.error('Item removed from cart');
  };
  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'QUICKBITE10') {
      setCouponApplied(true);
      toast.success('Coupon applied! 10% off 🎉');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const placeOrder = async () => {
    if (!selectedSlot) { toast.error('Please select a pickup slot!'); return; }
    setPlacing(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Order placed! Generating your token...', { icon: '🎫' });
    setTimeout(() => router.push('/student/token'), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6 text-purple-400" /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-24 text-white/30">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-lg">Your cart is empty</p>
          <a href="/student/menu" className="btn-gradient mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold">
            Browse Menu
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Items */}
            <div className="glass rounded-2xl p-5 space-y-4">
              <h2 className="font-bold text-white text-sm uppercase tracking-wider">Order Items ({cart.length})</h2>
              {cart.map(({ item, qty }, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-white truncate">{item.name}</div>
                    <div className="text-xs text-white/40 flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3" /> {item.prepTime} min prep
                    </div>
                    <div className="text-purple-400 font-bold text-sm mt-1">{formatCurrency(item.price * qty)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 glass rounded-lg flex items-center justify-center text-white/70 hover:text-white">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white font-bold w-5 text-center">{qty}</span>
                    <button onClick={() => updateQty(item.id, +1)} className="w-7 h-7 btn-gradient rounded-lg flex items-center justify-center text-white">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="w-7 h-7 bg-red-500/10 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/20 ml-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Slot Picker */}
            <div className="glass rounded-2xl p-5">
              <h2 className="font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Select Pickup Slot
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SLOTS.map(slot => {
                  const isFull = slot.booked >= slot.capacity;
                  const isSelected = selectedSlot === slot.id;
                  const pct = Math.round((slot.booked / slot.capacity) * 100);
                  return (
                    <button
                      key={slot.id}
                      disabled={isFull}
                      onClick={() => setSelectedSlot(slot.id)}
                      className={`rounded-xl p-3 text-center border transition-all ${
                        isFull ? 'slot-full border-white/5 bg-white/2' :
                        isSelected ? 'slot-selected neon-border' :
                        'glass slot-available hover:border-purple-500/30'
                      }`}
                    >
                      <div className={`font-bold text-sm mb-1 ${isFull ? 'text-white/30' : isSelected ? 'text-white' : 'text-white/70'}`}>
                        {slot.time}
                      </div>
                      {isFull ? (
                        <span className="text-[10px] text-red-400 font-medium">FULL</span>
                      ) : (
                        <>
                          <div className="w-full bg-white/5 rounded-full h-1 mb-1">
                            <div
                              className="h-1 rounded-full transition-all"
                              style={{
                                width: `${pct}%`,
                                background: pct > 80 ? '#EF4444' : pct > 60 ? '#F59E0B' : '#10B981'
                              }}
                            />
                          </div>
                          <div className="text-[10px] text-white/40">{slot.capacity - slot.booked} slots left</div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
              {!selectedSlot && (
                <div className="flex items-center gap-2 mt-3 text-yellow-400/70 text-xs">
                  <AlertCircle className="w-3.5 h-3.5" /> Please select a pickup slot to continue
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="glass rounded-2xl p-5">
              <h2 className="font-bold text-white text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-400" /> Promo Code
              </h2>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                  placeholder="Enter code (try QUICKBITE10)"
                  disabled={couponApplied}
                  className="flex-1 glass rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none"
                />
                <button
                  onClick={applyCoupon}
                  disabled={couponApplied || !coupon}
                  className="btn-gradient px-4 py-3 rounded-xl text-white text-sm font-bold disabled:opacity-50"
                >
                  {couponApplied ? '✓' : 'Apply'}
                </button>
              </div>
              {couponApplied && (
                <div className="flex items-center gap-2 mt-2 text-green-400 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" /> QUICKBITE10 — 10% discount applied!
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="glass-strong rounded-2xl p-5 sticky top-24">
              <h2 className="font-bold text-white mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal ({cart.reduce((s, c) => s + c.qty, 0)} items)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (10%)</span>
                    <span>-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>Platform fee</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="h-px bg-white/10" />
                <div className="flex justify-between text-white font-black text-lg">
                  <span>Total</span>
                  <span className="gradient-text">{formatCurrency(total)}</span>
                </div>
              </div>

              {selectedSlot && (
                <div className="mt-4 glass rounded-xl p-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-xs text-white/40">Pickup Slot</div>
                    <div className="text-sm font-bold text-white">
                      {SLOTS.find(s => s.id === selectedSlot)?.time}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-4 text-xs text-white/40">
                <Users className="w-3.5 h-3.5" />
                <span>Estimated wait: ~14 minutes</span>
              </div>

              <button
                onClick={placeOrder}
                disabled={placing || cart.length === 0}
                className="w-full btn-gradient mt-5 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {placing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>🎫 Place Order & Get Token</>
                )}
              </button>

              <p className="text-xs text-white/20 text-center mt-2">
                Demo payment — no real charge
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MENU_ITEMS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Clock, Star, ArrowRight, Zap, ShoppingBag, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const WAIT_STEPS = [
  { label:'Order Placed', done:true },
  { label:'Being Prepared', done:true },
  { label:'Ready to Collect', done:false },
  { label:'Collected', done:false },
];

function WaitBanner() {
  return (
    <motion.div
      initial={{ opacity:0, y:-20 }}
      animate={{ opacity:1, y:0 }}
      className="card-orange p-5 mb-6 relative overflow-hidden"
    >
      <div className="blob float" style={{ width:200, height:200, background:'rgba(255,255,255,0.08)', top:'-60px', right:'-40px' }} />
      <div className="flex items-center justify-between gap-4 relative z-10">
        <div>
          <div className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">🤖 AI Wait Estimate</div>
          <div className="text-white font-black text-3xl" style={{ fontFamily:'Syne' }}>~14 minutes</div>
          <div className="text-orange-100 text-sm mt-1">Your token <strong>A-124</strong> · 6 orders ahead</div>
        </div>
        <div className="text-right">
          <Link href="/student/track">
            <button className="btn-outline text-white border-white/40 text-sm px-4 py-2 hover:bg-white hover:text-[#1D1D1D]">
              Track Order →
            </button>
          </Link>
          <div className="text-orange-200 text-xs mt-2">Ready at ~12:58 PM</div>
        </div>
      </div>
      {/* Progress bar */}
      <div className="mt-4 relative z-10">
        <div className="flex justify-between text-xs text-orange-200 mb-1.5">
          {WAIT_STEPS.map(s => <span key={s.label} className={s.done ? 'text-white font-bold' : ''}>{s.done ? '✓' : '○'} {s.label}</span>)}
        </div>
        <div className="progress-track" style={{ background:'rgba(255,255,255,0.2)', borderColor:'transparent' }}>
          <div className="progress-fill" style={{ width:'45%', background:'rgba(255,255,255,0.9)' }} />
        </div>
      </div>
    </motion.div>
  );
}

const CATEGORIES = ['All','Burgers 🍔','Pizza 🍕','Drinks 🧋','Snacks 🍟','Rice 🍱','Noodles 🍜','Desserts 🍰'];

export default function StudentHome() {
  const [cat, setCat] = useState('All');
  const [cart, setCart] = useState<Record<string, number>>({});

  const featured = MENU_ITEMS.filter(i => i.available).slice(0,6);

  const addToCart = (id: string, name: string) => {
    setCart(c => ({ ...c, [id]: (c[id]||0)+1 }));
    toast.success(`${name} added to cart! 🛒`);
  };

  const totalItems = Object.values(cart).reduce((a,b)=>a+b,0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <motion.h1
            initial={{ opacity:0, x:-20 }}
            animate={{ opacity:1, x:0 }}
            className="text-hero"
            style={{ fontSize:'clamp(2rem,5vw,3.5rem)' }}
          >
            Hey Harsh! 👋
          </motion.h1>
          <p className="text-[#888] mt-1">What are you craving today?</p>
        </div>
        {totalItems > 0 && (
          <Link href="/student/cart">
            <motion.button
              initial={{ scale:0 }}
              animate={{ scale:1 }}
              transition={{ type:'spring', stiffness:400 }}
              className="btn-primary gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems} item{totalItems>1?'s':''} in cart
            </motion.button>
          </Link>
        )}
      </div>

      {/* AI Wait Banner */}
      <WaitBanner />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { emoji:'🍔', label:'Browse Menu',    href:'/student/menu',   color:'#FF6B00', bg:'#FFF5EB' },
          { emoji:'🎟', label:'My Token',       href:'/student/token',  color:'#0D5C3B', bg:'#F0FFF4' },
          { emoji:'📍', label:'Track Order',    href:'/student/track',  color:'#1a56db', bg:'#EFF6FF' },
          { emoji:'🤖', label:'AI Assistant',   href:'/student/chat',   color:'#7c3aed', bg:'#F5F0FF' },
        ].map((a,i) => (
          <motion.div
            key={a.label}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.08, type:'spring', stiffness:300 }}
          >
            <Link href={a.href}>
              <div className="card p-5 flex flex-col gap-3 cursor-pointer" style={{ background:a.bg }}>
                <div className="text-3xl">{a.emoji}</div>
                <div className="font-black text-sm flex items-center justify-between" style={{ fontFamily:'Syne', color:a.color }}>
                  {a.label} <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Today's Specials */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-black text-2xl" style={{ fontFamily:'Syne' }}>🔥 Today's Specials</h2>
            <p className="text-sm text-[#888]">Fresh & hot, ready in minutes</p>
          </div>
          <Link href="/student/menu">
            <button className="btn-outline text-sm px-4 py-2">See All <ArrowRight className="w-4 h-4" /></button>
          </Link>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-5">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold border-2 border-[#1D1D1D] transition-all"
              style={cat===c ? { background:'var(--dark)', color:'#fff', boxShadow:'2px 2px 0 var(--orange)' } : { background:'#fff', color:'#555' }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Food grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.07, type:'spring' }}
              className="food-card"
            >
              <div className="relative p-4 pb-2">
                <div className="w-full h-32 flex items-center justify-center rounded-2xl float" style={{ fontSize:64, background:'rgba(255,245,235,0.8)', border:'2px dashed rgba(29,29,29,0.08)' }}>
                  {item.emoji}
                </div>
                {item.stock < 10 && (
                  <span className="absolute top-6 left-6 badge badge-red">Low Stock</span>
                )}
                {item.orderCount > 150 && (
                  <span className="absolute top-6 right-6 badge badge-orange">🔥 Hot</span>
                )}
              </div>
              <div className="p-4 pt-2">
                <h3 className="font-black mb-1 text-base" style={{ fontFamily:'Syne' }}>{item.name}</h3>
                <div className="flex items-center gap-3 text-xs text-[#888] mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.prepTime} min</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-400" />{item.rating}</span>
                  <span className={item.isVeg ? 'text-green-600' : 'text-red-500'}>{item.isVeg ? '🟢 Veg' : '🔴 Non-veg'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black" style={{ fontFamily:'Syne', color:'var(--orange)' }}>₹{item.price}</span>
                  <button
                    onClick={() => addToCart(item.id, item.name)}
                    disabled={!item.available}
                    className="btn-primary text-xs px-3 py-1.5 disabled:opacity-40"
                  >
                    {(cart[item.id]||0) > 0 ? `+${cart[item.id]}` : 'Add'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Tip */}
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:0.4 }}
        className="card-green p-5 flex items-center gap-4"
      >
        <div className="text-4xl float-r">🤖</div>
        <div>
          <div className="text-yellow-300 font-black text-sm mb-1" style={{ fontFamily:'Syne' }}>⚡ QuickBite AI says</div>
          <p className="text-green-100 text-sm">Lunch rush peaks at 12:45 PM. Order now for the <strong className="text-white">1:00 PM slot</strong> — only 8 slots left!</p>
        </div>
        <Link href="/student/chat" className="ml-auto flex-shrink-0">
          <button className="btn-outline text-white border-white/30 text-xs px-3 py-2 hover:bg-white hover:text-[#1D1D1D]">Ask AI</button>
        </Link>
      </motion.div>
    </div>
  );
}

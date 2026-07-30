'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Home, UtensilsCrossed, ShoppingCart, Ticket,
  MapPin, History, MessageSquare, Menu, X, LogOut, Bell
} from 'lucide-react';
import { toast } from 'sonner';

const NAV = [
  { href:'/student',        label:'Home',      icon:Home,           emoji:'🏠' },
  { href:'/student/menu',   label:'Menu',       icon:UtensilsCrossed,emoji:'🍔' },
  { href:'/student/cart',   label:'Cart',       icon:ShoppingCart,   emoji:'🛒' },
  { href:'/student/token',  label:'My Token',   icon:Ticket,         emoji:'🎟' },
  { href:'/student/track',  label:'Track Order',icon:MapPin,         emoji:'📍' },
  { href:'/student/orders', label:'Orders',     icon:History,        emoji:'📋' },
  { href:'/student/chat',   label:'AI Chat',    icon:MessageSquare,  emoji:'🤖' },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background:'var(--cream)' }}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed h-full z-40 sidebar">
        <div className="p-6 border-b-[3px] border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <div>
              <div className="font-black text-white text-lg" style={{ fontFamily:'Syne,sans-serif' }}>QuickBite</div>
              <div className="text-white/40 text-xs">Student Portal</div>
            </div>
          </Link>
        </div>

        {/* Student info */}
        <div className="p-4 border-b-[3px] border-white/10">
          <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background:'rgba(255,107,0,0.15)', border:'2px solid rgba(255,107,0,0.3)' }}>
            <div className="w-10 h-10 rounded-full text-lg flex items-center justify-center" style={{ background:'var(--orange)', border:'2px solid #1D1D1D' }}>🧑‍🎓</div>
            <div>
              <div className="font-bold text-sm text-white">Harsh Pal</div>
              <div className="text-xs text-white/40">CS · 2025 batch</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, emoji }) => {
            const active = path === href;
            return (
              <Link key={href} href={href}>
                <div className={`sidebar-item ${active ? 'active' : ''}`}>
                  <span className="text-base">{emoji}</span>
                  <span className="text-sm">{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-[3px] border-white/10">
          <Link href="/login">
            <div className="sidebar-item hover:text-red-400">
              <LogOut className="w-4 h-4" /><span className="text-sm">Sign Out</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setOpen(false)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x:-280 }} animate={{ x:0 }} exit={{ x:-280 }}
            transition={{ type:'spring', damping:25 }}
            className="fixed left-0 top-0 h-full w-72 sidebar z-50 md:hidden flex flex-col border-r-[3px] border-[#FF6B00]"
          >
            <div className="p-5 flex items-center justify-between border-b-[3px] border-white/10">
              <span className="text-white font-black" style={{ fontFamily:'Syne' }}>🍽️ QuickBite</span>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {NAV.map(({ href, label, emoji }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}>
                  <div className={`sidebar-item ${path === href ? 'active' : ''}`}>
                    <span>{emoji}</span><span className="text-sm">{label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b-[3px] border-[#1D1D1D]" style={{ background:'var(--cream)', backdropFilter:'blur(10px)' }}>
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:block">
            <h2 className="font-black text-sm" style={{ fontFamily:'Syne' }}>
              {NAV.find(n => n.href === path)?.emoji} {NAV.find(n => n.href === path)?.label ?? 'Student Portal'}
            </h2>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {/* Token pill */}
            <div className="hidden sm:flex items-center gap-2 rounded-full px-4 py-1.5 border-2 border-[#1D1D1D] font-bold text-sm" style={{ background:'var(--yellow)', fontFamily:'Syne' }}>
              🎟 Token A-124
            </div>
            <button
              onClick={() => toast.info('Order A-124 is being prepared!')}
              className="relative w-9 h-9 rounded-full border-2 border-[#1D1D1D] flex items-center justify-center hover:bg-[#FFF5EB] transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background:'var(--orange)' }} />
            </button>
            <div className="w-9 h-9 rounded-full border-2 border-[#1D1D1D] flex items-center justify-center text-base" style={{ background:'var(--orange)' }}>🧑‍🎓</div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <motion.div key={path} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

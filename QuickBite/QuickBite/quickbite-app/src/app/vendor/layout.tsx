'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, Package, BarChart3, QrCode, Menu, X, LogOut, Bell, ChefHat } from 'lucide-react';
import { toast } from 'sonner';

const NAV = [
  { href:'/vendor',            label:'Dashboard',  emoji:'📊', icon:LayoutDashboard },
  { href:'/vendor/orders',     label:'Orders',     emoji:'📋', icon:ClipboardList },
  { href:'/vendor/menu',       label:'Menu',       emoji:'🍔', icon:UtensilsCrossed },
  { href:'/vendor/inventory',  label:'Inventory',  emoji:'📦', icon:Package },
  { href:'/vendor/analytics',  label:'Analytics',  emoji:'📈', icon:BarChart3 },
  { href:'/vendor/scan',       label:'QR Scanner', emoji:'📷', icon:QrCode },
];

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background:'var(--cream)' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed h-full z-40 border-r-[3px] border-[#1D1D1D]" style={{ background:'var(--green)' }}>
        <div className="p-6 border-b-[3px] border-white/15">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg border-2 border-white/30" style={{ background:'var(--orange)' }}>👨‍🍳</div>
            <div>
              <div className="font-black text-white text-base" style={{ fontFamily:'Syne' }}>QuickBite</div>
              <div className="text-green-300 text-xs">Vendor Portal</div>
            </div>
          </Link>
        </div>

        <div className="p-4 border-b-[3px] border-white/15">
          <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background:'rgba(255,255,255,0.1)', border:'2px solid rgba(255,255,255,0.2)' }}>
            <div className="w-10 h-10 rounded-full text-lg flex items-center justify-center border-2 border-white/30" style={{ background:'var(--orange)' }}>🍳</div>
            <div>
              <div className="font-bold text-sm text-white">Campus Canteen</div>
              <div className="flex items-center gap-1.5 text-xs">
                <div className="w-1.5 h-1.5 rounded-full bg-green-300 pulse-s" />
                <span className="text-green-300">Open · Kitchen Active</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, emoji }) => {
            const active = path === href;
            return (
              <Link key={href} href={href}>
                <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-semibold text-sm ${active ? 'bg-white text-[#1D1D1D] shadow-sm' : 'text-green-200 hover:bg-white/10 hover:text-white'}`}>
                  <span className="text-base">{emoji}</span> {label}
                  {active && <div className="ml-auto w-2 h-2 rounded-full" style={{ background:'var(--orange)' }} />}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-[3px] border-white/15">
          <Link href="/login">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-green-300 hover:text-red-300 hover:bg-white/5 transition-colors">
              <LogOut className="w-4 h-4" /><span className="text-sm font-medium">Sign Out</span>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {open && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x:-280 }} animate={{ x:0 }} exit={{ x:-280 }} transition={{ type:'spring', damping:25 }}
            className="fixed left-0 top-0 h-full w-72 z-50 md:hidden flex flex-col border-r-[3px] border-[#1D1D1D]"
            style={{ background:'var(--green)' }}>
            <div className="p-5 flex items-center justify-between border-b-[3px] border-white/15">
              <span className="text-white font-black" style={{ fontFamily:'Syne' }}>👨‍🍳 Vendor</span>
              <button onClick={() => setOpen(false)} className="text-white/60"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {NAV.map(({ href, label, emoji }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}>
                  <div className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${path===href ? 'bg-white text-[#1D1D1D]' : 'text-green-200 hover:bg-white/10'}`}>
                    <span>{emoji}</span> {label}
                  </div>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b-[3px] border-[#1D1D1D]" style={{ background:'var(--cream)' }}>
          <button className="md:hidden" onClick={() => setOpen(true)}><Menu className="w-6 h-6" /></button>
          <div className="hidden md:flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-full px-3 py-1 border-2 border-[#1D1D1D] font-bold" style={{ background:'#D6FFE8', color:'var(--green)', fontFamily:'Syne' }}>
              <div className="w-2 h-2 rounded-full bg-green-500 pulse-s" /> Kitchen Active
            </div>
            <span className="text-[#888]">Peak hours: 12:30 – 2:00 PM</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => toast.info('5 new orders!')} className="relative w-9 h-9 rounded-full border-2 border-[#1D1D1D] flex items-center justify-center hover:bg-[#FFF5EB]">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background:'var(--orange)' }} />
            </button>
            <div className="w-9 h-9 rounded-full border-2 border-[#1D1D1D] flex items-center justify-center text-base" style={{ background:'var(--orange)' }}>🍳</div>
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

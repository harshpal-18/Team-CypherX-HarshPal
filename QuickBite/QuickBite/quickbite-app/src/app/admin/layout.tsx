'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { LayoutDashboard, Users, UtensilsCrossed, BarChart3, MessageSquare, Menu, X, LogOut, Bell, ShieldCheck } from 'lucide-react';

const NAV = [
  { href:'/admin',              label:'Overview',      emoji:'🏠' },
  { href:'/admin/users',        label:'Users',         emoji:'👥' },
  { href:'/admin/foods',        label:'Food Mgmt',     emoji:'🍽️' },
  { href:'/admin/analytics',    label:'Analytics',     emoji:'📊' },
  { href:'/admin/complaints',   label:'Complaints',    emoji:'📝' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background:'var(--cream)' }}>
      <aside className="hidden md:flex flex-col w-64 fixed h-full z-40 border-r-[3px] border-[#1D1D1D]" style={{ background:'var(--dark)' }}>
        <div className="p-6 border-b-[3px] border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center border-2 border-white/20" style={{ background:'#2D2D2D' }}>
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-black text-white text-base" style={{ fontFamily:'Syne' }}>QuickBite</div>
              <div className="text-white/40 text-xs">Admin Panel</div>
            </div>
          </Link>
        </div>
        <div className="p-4 border-b-[3px] border-white/10">
          <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background:'rgba(255,255,255,0.06)', border:'2px solid rgba(255,255,255,0.1)' }}>
            <div className="w-10 h-10 rounded-full text-lg flex items-center justify-center border-2 border-white/20" style={{ background:'#3D3D3D' }}>🛡</div>
            <div>
              <div className="font-bold text-sm text-white">Super Admin</div>
              <div className="text-xs text-white/40">admin@quickbite.com</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, emoji }) => {
            const active = path === href;
            return (
              <Link key={href} href={href}>
                <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-semibold text-sm ${active ? 'text-[#1D1D1D] bg-white border-2 border-[#1D1D1D]' : 'text-white/50 hover:bg-white/8 hover:text-white'}`}
                  style={active ? { boxShadow:'2px 2px 0 var(--orange)' } : {}}>
                  <span className="text-base">{emoji}</span> {label}
                  {active && <div className="ml-auto w-2 h-2 rounded-full" style={{ background:'var(--orange)' }} />}
                </div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t-[3px] border-white/10">
          <Link href="/login">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
              <LogOut className="w-4 h-4" /><span className="text-sm font-medium">Sign Out</span>
            </div>
          </Link>
        </div>
      </aside>

      <AnimatePresence>
        {open && <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.aside initial={{ x:-280 }} animate={{ x:0 }} exit={{ x:-280 }} transition={{ type:'spring', damping:25 }}
            className="fixed left-0 top-0 h-full w-72 z-50 md:hidden flex flex-col border-r-[3px] border-[#1D1D1D]"
            style={{ background:'var(--dark)' }}>
            <div className="p-5 flex items-center justify-between border-b-[3px] border-white/10">
              <span className="text-white font-black" style={{ fontFamily:'Syne' }}>🛡 Admin</span>
              <button onClick={() => setOpen(false)} className="text-white/60"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {NAV.map(({ href, label, emoji }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}>
                  <div className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold ${path===href ? 'bg-white text-[#1D1D1D]' : 'text-white/50 hover:bg-white/8'}`}>
                    <span>{emoji}</span> {label}
                  </div>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 md:ml-64 flex flex-col">
        <header className="sticky top-0 z-30 px-6 py-3 flex items-center justify-between border-b-[3px] border-[#1D1D1D]" style={{ background:'var(--cream)' }}>
          <button className="md:hidden" onClick={() => setOpen(true)}><Menu className="w-6 h-6" /></button>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="font-bold text-[#555]">System Administration</span>
            <span className="badge badge-green ml-2">All Systems OK</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full border-2 border-[#1D1D1D] flex items-center justify-center hover:bg-[#FFF5EB]">
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background:'var(--red)' }} />
            </button>
            <div className="w-9 h-9 rounded-full border-2 border-[#1D1D1D] flex items-center justify-center text-base" style={{ background:'var(--dark)', color:'white', fontSize:14 }}>🛡</div>
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

'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ANALYTICS_DATA, MENU_ITEMS } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { ArrowRight, AlertTriangle, TrendingUp, Clock, Star, Users, Flame } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const CustomTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="card p-3 bg-white text-xs border-2 border-[#1D1D1D]">
      <div className="font-bold mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>
      ))}
    </div>
  );
};

const KPI_CARDS = [
  { label:'Pending',        value:18,      emoji:'⏳', color:'#FF6B00', bg:'#FFF5EB' },
  { label:'Preparing',      value:7,       emoji:'🍳', color:'#1a56db', bg:'#EFF6FF' },
  { label:'Ready',          value:4,       emoji:'✅', color:'#0D5C3B', bg:'#F0FFF4' },
  { label:"Today's Revenue",value:'₹18,750',emoji:'💰',color:'#7c3aed', bg:'#F5F0FF' },
];

export default function VendorDashboard() {
  const [pendingCount, setPendingCount] = useState(18);
  useEffect(() => {
    const t = setInterval(() => setPendingCount(p => p + (Math.random() > 0.6 ? 1 : 0)), 3000);
    return () => clearInterval(t);
  }, []);

  const lowStock = MENU_ITEMS.filter(i => i.stock < 10 && i.available);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-hero" style={{ fontSize:'clamp(2rem,5vw,3.5rem)' }}>
            Good afternoon,<br/><span style={{ color:'var(--orange)' }}>Chef! 👨‍🍳</span>
          </h1>
          <p className="text-[#888] mt-1">Wednesday, 30 July · Lunch rush is ON 🔥</p>
        </div>
        <div className="flex items-center gap-2 rounded-full px-4 py-2 border-2 border-[#1D1D1D] font-black" style={{ background:'var(--red)', color:'#fff', fontFamily:'Syne' }}>
          🔴 PEAK HOURS ACTIVE
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity:0, y:24 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.08, type:'spring', stiffness:300 }}
            className="card p-5"
            style={{ background:k.bg }}
          >
            <div className="text-3xl mb-3 float">{k.emoji}</div>
            <div className="text-3xl font-black mb-1" style={{ fontFamily:'Syne', color:k.color }}>
              {k.label==='Pending' ? pendingCount : k.value}
            </div>
            <div className="text-sm font-semibold text-[#666]">{k.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-5 bg-white">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black flex items-center gap-2" style={{ fontFamily:'Syne' }}>
              <TrendingUp className="w-5 h-5" style={{ color:'var(--orange)' }} /> Weekly Orders
            </h2>
            <span className="badge badge-orange">Last 7 days</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ANALYTICS_DATA.dailyOrders}>
              <defs>
                <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#FF6B00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize:11, fill:'#999' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:11, fill:'#999' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTip />} />
              <Area type="monotone" dataKey="orders" name="orders" stroke="#FF6B00" fill="url(#vg)" strokeWidth={3} dot={{ fill:'#FF6B00', r:4, stroke:'#fff', strokeWidth:2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 bg-white">
          <h2 className="font-black mb-4 flex items-center gap-2" style={{ fontFamily:'Syne' }}>
            <Flame className="w-5 h-5 text-red-500" /> Top Items
          </h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={ANALYTICS_DATA.popularItems} dataKey="orders" cx="50%" cy="50%" innerRadius={30} outerRadius={60} paddingAngle={4}>
                {ANALYTICS_DATA.popularItems.map((e,i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip content={<CustomTip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {ANALYTICS_DATA.popularItems.slice(0,3).map(item => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-[#1D1D1D]" style={{ background:item.color }} />
                  <span className="text-[#555] font-medium">{item.name}</span>
                </div>
                <span className="font-black">{item.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live orders + alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Live queue */}
        <div className="card p-5 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black flex items-center gap-2" style={{ fontFamily:'Syne' }}>
              <div className="w-2 h-2 rounded-full bg-red-500 pulse-s" /> Live Queue
            </h2>
            <Link href="/vendor/orders"><button className="text-xs badge badge-orange">Manage All <ArrowRight className="w-3 h-3 inline" /></button></Link>
          </div>
          {['A-125·Burger×2,Coffee×1·2m·pending','A-124·Pizza×1,Fries×1·5m·preparing','A-123·Noodles×2·9m·ready'].map(raw => {
            const [token, items, time, status] = raw.split('·');
            return (
              <div key={token} className="flex items-center gap-3 py-3 border-b-2 border-[#F5F5F5] last:border-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 border-[#1D1D1D]" style={{ background: status==='pending'?'#FFF5EB': status==='preparing'?'#EFF6FF':'#F0FFF4', color: status==='pending'?'var(--orange)': status==='preparing'?'#1a56db':'var(--green)' }}>
                  {token}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{items}</div>
                  <div className="text-xs text-[#888]">{time} ago</div>
                </div>
                <span className={`status-${status}`}>{status}</span>
              </div>
            );
          })}
        </div>

        {/* Stats + alerts */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji:'⏱', label:'Avg Wait', value:'14 min', color:'#FF6B00', bg:'#FFF5EB' },
              { emoji:'⭐', label:'Rating', value:'4.6', color:'#8B6000', bg:'#FFFBEB' },
              { emoji:'👥', label:'Served', value:'342', color:'#0D5C3B', bg:'#F0FFF4' },
              { emoji:'⚠️', label:'Low Stock', value:`${lowStock.length} items`, color:'#EF4444', bg:'#FFF0F0' },
            ].map(s => (
              <div key={s.label} className="card p-4" style={{ background:s.bg }}>
                <div className="text-2xl mb-1">{s.emoji}</div>
                <div className="font-black" style={{ fontFamily:'Syne', color:s.color }}>{s.value}</div>
                <div className="text-xs text-[#888]">{s.label}</div>
              </div>
            ))}
          </div>
          {lowStock.length > 0 && (
            <div className="card p-4 bg-white" style={{ borderColor:'#FFC83D', boxShadow:'3px 3px 0 #FFC83D' }}>
              <h3 className="font-black text-sm flex items-center gap-2 mb-3 text-yellow-700" style={{ fontFamily:'Syne' }}>
                <AlertTriangle className="w-4 h-4" /> Low Stock Alerts
              </h3>
              <div className="space-y-1.5">
                {lowStock.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#555]">{item.emoji} {item.name}</span>
                    <span className="badge badge-yellow text-[10px]">Only {item.stock} left</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

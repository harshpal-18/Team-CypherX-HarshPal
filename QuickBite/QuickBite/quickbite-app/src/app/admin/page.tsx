'use client';
import { motion } from 'framer-motion';
import { ANALYTICS_DATA, MENU_ITEMS } from '@/lib/data';
import {
  Users, UtensilsCrossed, IndianRupee, Clock,
  TrendingUp, ShieldCheck, Activity, AlertCircle, ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import Link from 'next/link';

const SYSTEM_STATS = [
  { label: 'Total Students', value: '2,450', icon: Users, color: '#8B5CF6', delta: '+24 today' },
  { label: 'Active Vendors', value: '3', icon: UtensilsCrossed, color: '#10B981', delta: 'All online' },
  { label: "Today's Revenue", value: '₹18,750', icon: IndianRupee, color: '#3B82F6', delta: '+18% vs avg' },
  { label: 'Total Orders Today', value: '210', icon: Activity, color: '#F59E0B', delta: 'Peak: 12:45 PM' },
  { label: 'Avg Wait Time', value: '14 min', icon: Clock, color: '#EF4444', delta: '-3 min improved' },
  { label: 'System Uptime', value: '99.9%', icon: ShieldCheck, color: '#10B981', delta: '45 days uptime' },
];

const RECENT_ALERTS = [
  { type: 'warning', msg: 'Pepperoni Pizza stock critically low (10 units)', time: '5 min ago' },
  { type: 'info', msg: 'Peak hour alert: 95+ orders expected at 12:45 PM', time: '12 min ago' },
  { type: 'success', msg: 'New student registered: Priya Sharma (CS-2025)', time: '18 min ago' },
  { type: 'error', msg: 'Payment gateway slow response — monitoring', time: '25 min ago' },
];

const ALERT_COLORS: Record<string, string> = {
  warning: '#F59E0B', info: '#3B82F6', success: '#10B981', error: '#EF4444'
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-xs border border-white/10">
      <div className="text-white/60 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">System Overview</h1>
          <p className="text-white/40 text-sm">Real-time campus canteen monitoring</p>
        </div>
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm font-medium">Live Dashboard</span>
        </div>
      </div>

      {/* System KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {SYSTEM_STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5"
            style={{ borderColor: `${stat.color}20` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <span style={{ color: stat.color }}><stat.icon className="w-5 h-5" /></span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20" />
            </div>
            <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-xs text-white/40 mb-1">{stat.label}</div>
            <div className="text-xs font-medium" style={{ color: stat.color }}>{stat.delta}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders + Revenue chart */}
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Weekly System Activity
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS_DATA.dailyOrders}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="orders" name="orders" stroke="#8B5CF6" fill="url(#g1)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" /> System Alerts
          </h2>
          <div className="space-y-3">
            {RECENT_ALERTS.map((alert, i) => (
              <div key={i} className="glass rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: ALERT_COLORS[alert.type] }} />
                  <div>
                    <div className="text-xs text-white/70 leading-relaxed">{alert.msg}</div>
                    <div className="text-[10px] text-white/30 mt-1">{alert.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Manage Users', href: '/admin/users', icon: '👥', color: '#8B5CF6' },
          { label: 'Food Management', href: '/admin/foods', icon: '🍽️', color: '#3B82F6' },
          { label: 'View Analytics', href: '/admin/analytics', icon: '📊', color: '#10B981' },
          { label: 'Complaints', href: '/admin/complaints', icon: '📝', color: '#F59E0B' },
        ].map(item => (
          <Link key={item.href} href={item.href}>
            <div className="glass rounded-2xl p-5 text-center hover:scale-105 transition-transform cursor-pointer" style={{ borderColor: `${item.color}20` }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <div className="text-sm font-semibold text-white/70">{item.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Top items table */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-bold text-white mb-4">Top Performing Menu Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Item', 'Category', 'Orders', 'Revenue', 'Rating', 'Stock'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs text-white/30 uppercase font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...MENU_ITEMS].sort((a, b) => b.orderCount - a.orderCount).slice(0, 6).map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/2 transition-colors"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span>{item.emoji}</span>
                      <span className="text-white font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-white/50">{item.category}</td>
                  <td className="py-3 px-3 font-bold text-purple-400">{item.orderCount}</td>
                  <td className="py-3 px-3 text-green-400">₹{(item.orderCount * item.price).toLocaleString()}</td>
                  <td className="py-3 px-3 text-yellow-400">⭐ {item.rating}</td>
                  <td className="py-3 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.stock < 10 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                      {item.stock} units
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

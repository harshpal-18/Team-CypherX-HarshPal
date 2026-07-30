'use client';
import { motion } from 'framer-motion';
import { ANALYTICS_DATA } from '@/lib/data';
import { BarChart3, TrendingUp, Clock, Star } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-xl p-3 text-xs border border-white/10 shadow-xl">
      <div className="text-white/60 mb-1.5 font-medium">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2" style={{ color: p.color }}>
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}:</span>
          <strong>{p.name === 'revenue' ? `₹${p.value.toLocaleString()}` : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

const SUMMARY_STATS = [
  { label: "Today's Orders", value: '210', change: '+24%', color: '#8B5CF6' },
  { label: "Today's Revenue", value: '₹18,750', change: '+18%', color: '#10B981' },
  { label: 'Avg Wait Time', value: '14 min', change: '-3 min', color: '#3B82F6' },
  { label: 'Avg Rating', value: '4.6 ★', change: '+0.2', color: '#F59E0B' },
];

export default function VendorAnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-400" /> Analytics Dashboard
        </h1>
        <p className="text-white/40 text-sm">Insights for smarter canteen management</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SUMMARY_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5"
          >
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-white/40 mb-2">{s.label}</div>
            <div className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full inline-block">
              {s.change} vs yesterday
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Orders */}
        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Daily Orders
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS_DATA.dailyOrders}>
              <defs>
                <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="orders" name="orders" stroke="#8B5CF6" fill="url(#ordGrad)" strokeWidth={2.5} dot={{ fill: '#8B5CF6', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-green-400" /> Daily Revenue (₹)
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ANALYTICS_DATA.dailyOrders} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="revenue" name="revenue" radius={[6, 6, 0, 0]}>
                {ANALYTICS_DATA.dailyOrders.map((_, i) => (
                  <Cell key={i} fill={i === 4 ? '#10B981' : '#10B98150'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wait time by hour */}
        <div className="lg:col-span-2 glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-400" /> Wait Time Throughout the Day
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ANALYTICS_DATA.waitTimeByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} unit=" min" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="wait" name="wait" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: '#F59E0B', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular items pie */}
        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" /> Top Items
          </h2>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={ANALYTICS_DATA.popularItems} dataKey="orders" cx="50%" cy="50%" innerRadius={30} outerRadius={60} paddingAngle={3}>
                {ANALYTICS_DATA.popularItems.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {ANALYTICS_DATA.popularItems.map(item => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-white/60">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.orders} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak hour forecast */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-bold text-white mb-4 flex items-center gap-2">
          🔮 AI Peak Hour Forecast — Today&apos;s Expected Load
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={ANALYTICS_DATA.peakHourForecast} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="load" name="load %" radius={[4, 4, 0, 0]}>
              {ANALYTICS_DATA.peakHourForecast.map((entry, i) => (
                <Cell key={i} fill={entry.load >= 90 ? '#EF4444' : entry.load >= 70 ? '#F59E0B' : '#10B981'} opacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 text-xs">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-red-500" /> Peak (&gt;90%)</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-yellow-500" /> High (70–90%)</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-500" /> Normal (&lt;70%)</div>
        </div>
      </div>
    </div>
  );
}

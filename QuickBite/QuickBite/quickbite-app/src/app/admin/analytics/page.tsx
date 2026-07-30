'use client';
import { motion } from 'framer-motion';
import { MENU_ITEMS, ANALYTICS_DATA } from '@/lib/data';
import { useState } from 'react';
import { BarChart3, TrendingUp, Clock, Users, Star } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

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

export default function AdminAnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-green-400" /> System Analytics
        </h1>
        <p className="text-white/40 text-sm">Platform-wide insights and trends</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders (Week)', value: '1,013', color: '#8B5CF6', icon: TrendingUp },
          { label: 'Total Revenue (Week)', value: '₹88,850', color: '#10B981', icon: Users },
          { label: 'Peak Wait Time', value: '22 min', color: '#EF4444', icon: Clock },
          { label: 'Overall Rating', value: '4.6 ★', color: '#F59E0B', icon: Star },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-4">
            <span style={{ color: stat.color }}><stat.icon className="w-5 h-5 mb-2" /></span>
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs text-white/40 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4">Daily Orders (7 Days)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS_DATA.dailyOrders}>
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="orders" name="orders" stroke="#8B5CF6" fill="url(#ag1)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="font-bold text-white mb-4">Wait Time Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ANALYTICS_DATA.waitTimeByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="wait" name="wait (min)" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: '#F59E0B', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <h2 className="font-bold text-white mb-4">Revenue by Day (₹)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ANALYTICS_DATA.dailyOrders} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" name="₹ revenue" radius={[6, 6, 0, 0]}>
              {ANALYTICS_DATA.dailyOrders.map((_, i) => (
                <Cell key={i} fill={i === 4 ? '#10B981' : 'rgba(16,185,129,0.3)'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

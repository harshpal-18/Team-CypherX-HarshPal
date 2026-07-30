import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, ShoppingBag, Clock, CheckCircle, X, Users, Star, DollarSign, BarChart2
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { ADMIN_STATS, DAILY_SALES, WEEKLY_SALES, POPULAR_FOODS_DATA, PEAK_HOURS_DATA } from '../../data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend, Filler);

const CHART_RANGE = ['Daily', 'Weekly', 'Monthly'];

const chartOptions = (label) => ({
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1f2937', titleColor: '#f3f4f6', bodyColor: '#d1d5db' } },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
    y: { grid: { color: '#f3f4f6' }, ticks: { color: '#9ca3af' } }
  }
});

const STAT_CARDS = [
  { label: "Today's Revenue",   value: `₹${ADMIN_STATS.todayRevenue.toLocaleString()}`, icon: <TrendingUp className="w-6 h-6" />,  color: 'from-primary-400 to-primary-600',  bg: 'bg-primary-50 dark:bg-primary-950/30',   change: '+12%' },
  { label: "Today's Orders",    value: ADMIN_STATS.todayOrders,     icon: <ShoppingBag className="w-6 h-6" />,  color: 'from-blue-400 to-blue-600',       bg: 'bg-blue-50 dark:bg-blue-950/30',         change: '+5%'  },
  { label: 'Pending Orders',    value: ADMIN_STATS.pendingOrders,   icon: <Clock className="w-6 h-6" />,        color: 'from-yellow-400 to-orange-500',   bg: 'bg-yellow-50 dark:bg-yellow-950/30',     change: null   },
  { label: 'Completed Orders',  value: ADMIN_STATS.completedOrders, icon: <CheckCircle className="w-6 h-6" />, color: 'from-green-400 to-green-600',     bg: 'bg-green-50 dark:bg-green-950/30',       change: '+8%'  },
  { label: 'Cancelled Orders',  value: ADMIN_STATS.cancelledOrders, icon: <X className="w-6 h-6" />,           color: 'from-red-400 to-red-600',         bg: 'bg-red-50 dark:bg-red-950/30',           change: '-2%'  },
  { label: 'Avg Wait Time',     value: `${ADMIN_STATS.avgWaitTime} min`, icon: <Clock className="w-6 h-6" />,  color: 'from-purple-400 to-purple-600',   bg: 'bg-purple-50 dark:bg-purple-950/30',     change: null   },
  { label: 'Total Customers',   value: ADMIN_STATS.totalCustomers,  icon: <Users className="w-6 h-6" />,       color: 'from-pink-400 to-pink-600',       bg: 'bg-pink-50 dark:bg-pink-950/30',         change: '+15%' },
  { label: 'Popular Item',      value: 'Chicken Biryani',           icon: <Star className="w-6 h-6" />,        color: 'from-amber-400 to-amber-600',     bg: 'bg-amber-50 dark:bg-amber-950/30',       change: null   },
];

const AdminDashboard = () => {
  const [range, setRange] = useState('Daily');
  const salesData = range === 'Daily' ? DAILY_SALES : range === 'Weekly' ? WEEKLY_SALES : DAILY_SALES;

  const revenueChartData = {
    labels: salesData.labels,
    datasets: [{
      label: 'Revenue (₹)',
      data: salesData.revenue,
      backgroundColor: 'rgba(249,115,22,0.15)',
      borderColor: '#f97316',
      borderWidth: 2.5,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#f97316',
      pointRadius: 4,
    }]
  };

  const ordersChartData = {
    labels: salesData.labels,
    datasets: [{
      label: 'Orders',
      data: salesData.orders,
      backgroundColor: 'rgba(225,29,72,0.8)',
      borderRadius: 8,
      borderSkipped: false,
    }]
  };

  const popularData = {
    labels: POPULAR_FOODS_DATA.labels,
    datasets: [{
      data: POPULAR_FOODS_DATA.values,
      backgroundColor: ['#f97316','#e11d48','#8b5cf6','#22c55e','#f59e0b','#3b82f6'],
      borderWidth: 0,
    }]
  };

  const peakData = {
    labels: PEAK_HOURS_DATA.labels,
    datasets: [{
      label: 'Orders',
      data: PEAK_HOURS_DATA.values,
      backgroundColor: 'rgba(249,115,22,0.8)',
      borderRadius: 4,
    }]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Wednesday, 30 July 2025 · Good evening! 👋</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center`}>
                {s.icon}
              </div>
              {s.change && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  s.change.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                }`}>{s.change}</span>
              )}
            </div>
            <p className="font-display font-bold text-2xl text-gray-900 dark:text-white truncate">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Range Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sales:</span>
        {CHART_RANGE.map(r => (
          <button key={r} onClick={() => setRange(r)}
            className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${range === r ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'}`}>
            {r}
          </button>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary-500" /> Revenue Trend
          </h3>
          <div className="h-52">
            <Line data={revenueChartData} options={chartOptions('Revenue')} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-accent-500" /> Orders Count
          </h3>
          <div className="h-52">
            <Bar data={ordersChartData} options={chartOptions('Orders')} />
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" /> Most Popular Foods
          </h3>
          <div className="flex items-center gap-4">
            <div className="h-48 w-48 flex-shrink-0">
              <Doughnut data={popularData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
            <div className="space-y-2 flex-1">
              {POPULAR_FOODS_DATA.labels.map((l, i) => (
                <div key={l} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: popularData.datasets[0].backgroundColor[i] }} />
                  <span className="flex-1 text-gray-600 dark:text-gray-400 truncate">{l}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{POPULAR_FOODS_DATA.values[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-500" /> Peak Ordering Hours
          </h3>
          <div className="h-48">
            <Bar data={peakData} options={chartOptions('Peak Hours')} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

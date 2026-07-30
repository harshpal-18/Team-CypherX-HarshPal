import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, ShoppingBag, UtensilsCrossed, CalendarDays,
  Users, Zap, LogOut, Sun, Moon, Menu, X, Bell
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUiStore from '../../store/uiStore';
import useOrderStore from '../../store/orderStore';

const NAV_ITEMS = [
  { to: '/admin',           label: 'Dashboard',   icon: <LayoutDashboard className="w-5 h-5" />, end: true },
  { to: '/admin/orders',    label: 'Orders',       icon: <ShoppingBag className="w-5 h-5" /> },
  { to: '/admin/menu',      label: 'Menu',         icon: <UtensilsCrossed className="w-5 h-5" /> },
  { to: '/admin/tables',    label: 'Tables',       icon: <CalendarDays className="w-5 h-5" /> },
  { to: '/admin/customers', label: 'Customers',    icon: <Users className="w-5 h-5" /> },
];

const AdminLayout = () => {
  const { user, logout } = useAuthStore();
  const { darkMode, toggleDarkMode, sidebarOpen, setSidebarOpen } = useUiStore();
  const { notifications } = useOrderStore();
  const navigate = useNavigate();
  const unread = notifications.filter(n => !n.read).length;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -280 }}
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col shadow-xl lg:shadow-none`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-6 py-5 border-b border-gray-100 dark:border-gray-800">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-card">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-base gradient-text">Quick Bite</span>
              <p className="text-[10px] text-gray-400 -mt-0.5">Admin Panel</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map(item => (
              <NavLink key={item.to} to={item.to} end={item.end}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                {item.icon}{item.label}
              </NavLink>
            ))}
          </nav>

          {/* User + Actions */}
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
            <button onClick={handleLogout} className="sidebar-link w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </motion.aside>
      </>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn-ghost p-2">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Cafe is Live</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggleDarkMode} className="btn-ghost p-2 rounded-xl">
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="relative">
              <button className="btn-ghost p-2 rounded-xl"><Bell className="w-5 h-5" /></button>
              {unread > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{unread}</span>}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Zap, Menu, X, User, LogOut, ChevronDown, ShoppingCart, Bell } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useOrderStore from '../store/orderStore';

const GOLD = 'linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)';

const GoldenBiteNavbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, role, isAuthenticated, logout } = useAuthStore();
  const { getItemCount, toggleCart } = useCartStore();
  const { notifications } = useOrderStore();
  const navigate  = useNavigate();
  const location  = useLocation();

  const cartCount    = getItemCount();
  const unreadNotifs = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setProfileOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-yellow-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_0_16px_rgba(234,179,8,0.4)] group-hover:shadow-[0_0_28px_rgba(234,179,8,0.7)] transition-all duration-300" style={{ background: GOLD }}>
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="font-display font-bold text-xl text-transparent bg-clip-text" style={{ backgroundImage: GOLD }}>
            Quick Bite
          </span>
        </Link>

        {/* Centre badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm">
          <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-300 text-sm font-semibold tracking-wide">Golden Bite</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Link to={role === 'customer' ? '/customer/notifications' : '/admin'}
                className="relative p-2 rounded-xl text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-200">
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                    {unreadNotifs}
                  </span>
                )}
              </Link>

              {/* Cart */}
              {role === 'customer' && (
                <button onClick={toggleCart} className="relative p-2 rounded-xl text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all duration-200">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.span key={cartCount} initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 text-black text-xs rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              )}

              {/* Profile dropdown */}
              <div className="relative">
                <button onClick={() => setProfileOpen(o => !o)}
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 hover:bg-yellow-500/20 transition-all">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-black text-xs font-bold" style={{ background: GOLD }}>
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-200 max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className={`w-4 h-4 text-yellow-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-52 bg-[#111] border border-yellow-500/20 rounded-2xl p-2 z-50 shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
                      <div className="px-3 py-2 border-b border-yellow-500/20 mb-1">
                        <p className="font-semibold text-sm text-white">{user?.name}</p>
                        <p className="text-xs text-yellow-500/70 capitalize">{role}</p>
                      </div>
                      <Link to={role === 'customer' ? '/customer/profile' : '/admin'}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-300 transition-all">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-yellow-400 border border-yellow-500/30 hover:border-yellow-400 hover:bg-yellow-500/10 transition-all duration-200">
                Login
              </Link>
              <Link to="/signup"
                className="px-4 py-2 rounded-xl text-sm font-bold text-black shadow-[0_0_16px_rgba(234,179,8,0.4)] hover:shadow-[0_0_28px_rgba(234,179,8,0.7)] transition-all duration-300"
                style={{ background: GOLD }}>
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded-xl text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-t border-yellow-500/20">
            <div className="px-4 py-4 flex flex-col gap-2">
              {/* Golden Bite badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 w-fit">
                <Crown className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-yellow-300 text-sm font-semibold">Golden Bite</span>
              </div>
              {!isAuthenticated && (
                <>
                  <Link to="/login"  className="px-4 py-2.5 rounded-xl text-sm font-medium text-yellow-400 border border-yellow-500/30 text-center mt-2">Login</Link>
                  <Link to="/signup" className="px-4 py-2.5 rounded-xl text-sm font-bold text-black text-center" style={{ background: GOLD }}>Sign Up</Link>
                </>
              )}
              {isAuthenticated && role === 'customer' && (
                <>
                  <Link to="/customer/menu"          className="text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">Menu</Link>
                  <button onClick={() => { toggleCart(); setMobileOpen(false); }} className="text-left text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </button>
                  <Link to="/customer/orders"        className="text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">My Orders</Link>
                  <Link to="/customer/table-booking" className="text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">Book Table</Link>
                  <button onClick={handleLogout} className="text-left text-red-400 py-2 text-sm font-medium">Logout</button>
                </>
              )}
              {isAuthenticated && role === 'admin' && (
                <>
                  <Link to="/admin"           className="text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">Dashboard</Link>
                  <Link to="/admin/orders"    className="text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">Orders</Link>
                  <Link to="/admin/menu"      className="text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">Menu</Link>
                  <Link to="/admin/customers" className="text-gray-300 hover:text-yellow-400 py-2 text-sm transition-colors">Customers</Link>
                  <button onClick={handleLogout} className="text-left text-red-400 py-2 text-sm font-medium">Logout</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default GoldenBiteNavbar;

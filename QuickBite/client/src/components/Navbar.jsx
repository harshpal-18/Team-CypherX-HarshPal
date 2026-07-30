import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Bell, User, LogOut, ChevronDown, Zap, Crown } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useUiStore from '../store/uiStore';
import useOrderStore from '../store/orderStore';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, role, isAuthenticated, logout } = useAuthStore();
  const { getItemCount, toggleCart } = useCartStore();
  const { darkMode, toggleDarkMode } = useUiStore();
  const { notifications } = useOrderStore();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = getItemCount();
  const unreadNotifs = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setProfileOpen(false); }, [location]);

  const handleLogout = () => { logout(); navigate('/'); };

  const isLanding = location.pathname === '/';

  const landingLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-card group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl gradient-text">Quick Bite</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {isLanding && landingLinks.map(l => (
            <a key={l.label} href={l.href} className="nav-link text-sm">{l.label}</a>
          ))}
          {isAuthenticated && role === 'customer' && (
            <>
              <Link to="/customer/menu"    className="nav-link text-sm">Menu</Link>
              <Link to="/customer/orders"  className="nav-link text-sm">My Orders</Link>
              <Link to="/customer/table-booking" className="nav-link text-sm">Book Table</Link>
            </>
          )}
          {isAuthenticated && role === 'admin' && (
            <>
              <Link to="/admin"          className="nav-link text-sm">Dashboard</Link>
              <Link to="/admin/orders"   className="nav-link text-sm">Orders</Link>
              <Link to="/admin/menu"     className="nav-link text-sm">Menu</Link>
              <Link to="/admin/customers" className="nav-link text-sm">Customers</Link>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Golden Bite — desktop only, right side */}
          <Link
            to="/golden-bite"
            id="navbar-golden-bite-btn"
            className="group relative hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm text-black overflow-hidden shadow-[0_0_16px_rgba(234,179,8,0.35)] hover:shadow-[0_0_28px_rgba(234,179,8,0.6)] transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)' }}
          >
            <Crown className="w-4 h-4 fill-black flex-shrink-0" />
            Golden Bite
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-white/25 skew-x-12 pointer-events-none" />
          </Link>


          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Link to={role === 'customer' ? '/customer/notifications' : '/admin'} className="relative btn-ghost p-2 rounded-xl">
                <Bell className="w-5 h-5" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{unreadNotifs}</span>
                )}
              </Link>

              {/* Cart (customers only) */}
              {role === 'customer' && (
                <button onClick={toggleCart} className="relative btn-ghost p-2 rounded-xl">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >{cartCount}</motion.span>
                  )}
                </button>
              )}

              {/* Profile Dropdown */}
              <div className="relative">
                <button onClick={() => setProfileOpen(o => !o)} className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-primary-50 dark:bg-primary-950/50 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-all">
                  <div className="w-7 h-7 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-52 card p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{role}</p>
                      </div>
                      <Link to={role === 'customer' ? '/customer/profile' : '/admin'} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-950/50">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login"  className="btn-ghost text-sm">Login</Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden btn-ghost p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {isLanding && landingLinks.map(l => (
                <a key={l.label} href={l.href} className="nav-link py-2 text-base">{l.label}</a>
              ))}
              {/* Golden Bite mobile */}
              <Link
                to="/golden-bite"
                id="mobile-golden-bite-btn"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-black"
                style={{ background: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 50%, #d97706 100%)' }}
              >
                <Crown className="w-4 h-4 fill-black" />
                Golden Bite
              </Link>
              {!isAuthenticated && (
                <>
                  <Link to="/login"  className="btn-outline w-full text-center mt-2">Login</Link>
                  <Link to="/signup" className="btn-primary w-full text-center">Sign Up</Link>
                </>
              )}
              {isAuthenticated && role === 'customer' && (
                <>
                  <Link to="/customer/menu"          className="nav-link py-2">Menu</Link>
                  <button onClick={() => { toggleCart(); setMobileOpen(false); }} className="nav-link py-2 text-left w-full">
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </button>
                  <Link to="/customer/orders"        className="nav-link py-2">My Orders</Link>
                  <Link to="/customer/table-booking" className="nav-link py-2">Book Table</Link>
                  <button onClick={handleLogout} className="text-left text-red-500 py-2 font-medium">Logout</button>
                </>
              )}
              {isAuthenticated && role === 'admin' && (
                <>
                  <Link to="/admin"           className="nav-link py-2">Dashboard</Link>
                  <Link to="/admin/orders"    className="nav-link py-2">Orders</Link>
                  <Link to="/admin/menu"      className="nav-link py-2">Menu</Link>
                  <Link to="/admin/customers" className="nav-link py-2">Customers</Link>
                  <button onClick={handleLogout} className="text-left text-red-500 py-2 font-medium">Logout</button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
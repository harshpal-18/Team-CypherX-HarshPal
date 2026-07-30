import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, User, Lock, ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useUiStore from '../store/uiStore';
import AnnouncementBar from '../components/AnnouncementBar';

const DEMO_ACCOUNTS = {
  customer: { email: 'student@college.edu', password: 'student123', name: 'Arjun Sharma', phone: '9876543210' },
  admin:    { email: 'admin@quickbite.cafe', password: 'admin123',   name: 'Admin',        phone: '9876540000' },
};

const LoginPage = () => {
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const { addToast } = useUiStore();
  const navigate = useNavigate();

  const fillDemo = () => {
    setEmail(DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // simulate API

    const demo = DEMO_ACCOUNTS[role];
    if (email === demo.email && password === demo.password) {
      login({ name: demo.name, email: demo.email, phone: demo.phone }, role);
      addToast(`Welcome back, ${demo.name}! 👋`, 'success');
      navigate(role === 'admin' ? '/admin' : '/customer/menu');
    } else {
      addToast('Invalid credentials. Try the demo account.', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-gradient dark:bg-gray-950 flex flex-col">
      <AnnouncementBar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back to home */}
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-500 mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-card">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">Quick Bite</span>
            </div>

            <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">Welcome back! 👋</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Sign in to continue to your account</p>

            {/* Role Toggle */}
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6">
              {(['customer', 'admin']).map(r => (
                <button key={r} onClick={() => { setRole(r); setEmail(''); setPassword(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize ${
                    role === r ? 'bg-white dark:bg-gray-900 shadow-sm text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {r === 'customer' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  {r === 'customer' ? 'Customer' : 'Admin'}
                </button>
              ))}
            </div>

            {/* Demo hint */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 rounded-2xl mb-6">
              <div>
                <p className="text-xs font-semibold text-primary-700 dark:text-primary-400">Demo {role} account</p>
                <p className="text-xs text-primary-600 dark:text-primary-500">{DEMO_ACCOUNTS[role].email}</p>
              </div>
              <button onClick={fillDemo} className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 hover:bg-primary-200 px-3 py-1.5 rounded-xl transition-colors">
                Autofill
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="input" placeholder="your@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    className="input pr-12" placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-500" />
                  <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-primary-500 hover:text-primary-600 font-medium">Forgot password?</a>
              </div>

              <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-base mt-2">
                {loading ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</span>
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              New to Quick Bite?{' '}
              <Link to="/signup" className="text-primary-500 font-semibold hover:text-primary-600">Create account →</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

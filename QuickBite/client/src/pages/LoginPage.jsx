import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Eye, EyeOff, User, Lock, ShieldCheck, ArrowRight, ChevronLeft, Mail, Phone } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useUiStore from '../store/uiStore';
import AnnouncementBar from '../components/AnnouncementBar';

const DEMO_ACCOUNTS = {
  customer: { email: 'student@college.edu', password: 'student123', name: 'Arjun Sharma', phone: '9876543210' },
  admin:    { email: 'admin@quickbite.cafe', password: 'admin123',   name: 'Admin',        phone: '9876540000' },
};

/* Detect if string looks like a phone number */
const isPhoneNumber = (val) => /^[6-9]\d{9}$/.test(val.replace(/\s/g, ''));

const LoginPage = () => {
  const [role, setRole]         = useState('customer');
  const [loginMode, setLoginMode] = useState('email'); // 'email' | 'phone'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [fieldError, setFieldError] = useState(''); // inline field error

  const { login }    = useAuthStore();
  const { addToast } = useUiStore();
  const navigate     = useNavigate();

  const switchMode = (mode) => {
    setLoginMode(mode);
    setIdentifier('');
    setFieldError('');
  };

  const fillDemo = () => {
    setIdentifier(loginMode === 'phone' ? DEMO_ACCOUNTS[role].phone : DEMO_ACCOUNTS[role].email);
    setPassword(DEMO_ACCOUNTS[role].password);
    setFieldError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const demo = DEMO_ACCOUNTS[role];
    const matchByEmail = loginMode === 'email' && identifier === demo.email;
    const matchByPhone = loginMode === 'phone' && identifier.replace(/\s/g, '') === demo.phone;

    if ((matchByEmail || matchByPhone) && password === demo.password) {
      login({ name: demo.name, email: demo.email, phone: demo.phone }, role);
      addToast(`Welcome back, ${demo.name}! 👋`, 'success');
      navigate(role === 'admin' ? '/admin' : '/customer/menu');
    } else {
      /* Specific field-level errors */
      if (loginMode === 'email' && identifier !== demo.email) {
        setFieldError('No account found with this email address.');
      } else if (loginMode === 'phone' && identifier.replace(/\s/g, '') !== demo.phone) {
        setFieldError('No account found with this phone number.');
      } else {
        setFieldError('Incorrect password. Please try again.');
      }
      addToast('Sign in failed. Please check your credentials.', 'error');
    }
    setLoading(false);
  };

  const inputLabel = loginMode === 'phone' ? 'Phone Number' : 'Email';
  const inputPlaceholder = loginMode === 'phone' ? '98765 43210' : 'your@email.com';
  const inputType = loginMode === 'phone' ? 'tel' : 'email';

  return (
    <div className="min-h-screen bg-hero-gradient dark:bg-gray-950 flex flex-col">
      <AnnouncementBar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back */}
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

            {/* Role toggle */}
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-5">
              {(['customer', 'admin']).map(r => (
                <button key={r} onClick={() => { setRole(r); setIdentifier(''); setPassword(''); setFieldError(''); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 capitalize ${
                    role === r ? 'bg-white dark:bg-gray-900 shadow-sm text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                  {r === 'customer' ? <User className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  {r === 'customer' ? 'Customer' : 'Admin'}
                </button>
              ))}
            </div>

            {/* Demo hint */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800 rounded-2xl mb-5">
              <div>
                <p className="text-xs font-semibold text-primary-700 dark:text-primary-400">Demo {role} account</p>
                <p className="text-xs text-primary-600 dark:text-primary-500">
                  {loginMode === 'phone' ? DEMO_ACCOUNTS[role].phone : DEMO_ACCOUNTS[role].email}
                </p>
              </div>
              <button onClick={fillDemo} className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/50 hover:bg-primary-200 px-3 py-1.5 rounded-xl transition-colors">
                Autofill
              </button>
            </div>

            {/* ── Login mode toggle ── */}
            <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-5">
              {[
                { key: 'email', label: 'Email',  icon: <Mail  className="w-3.5 h-3.5" /> },
                { key: 'phone', label: 'Phone',  icon: <Phone className="w-3.5 h-3.5" /> },
              ].map(({ key, label, icon }) => (
                <button key={key} type="button" onClick={() => switchMode(key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    loginMode === key
                      ? 'bg-white dark:bg-gray-900 shadow-sm text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
                  }`}>
                  {icon}{label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{inputLabel}</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {loginMode === 'phone' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.input
                      key={loginMode}
                      initial={{ opacity: 0, x: loginMode === 'phone' ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      type={inputType}
                      value={identifier}
                      onChange={e => { setIdentifier(e.target.value); setFieldError(''); }}
                      className={`input pl-9 ${fieldError && !fieldError.includes('password') ? 'border-red-400 dark:border-red-500 focus:ring-red-400' : ''}`}
                      placeholder={inputPlaceholder}
                      required
                      maxLength={loginMode === 'phone' ? 10 : undefined}
                      pattern={loginMode === 'phone' ? '[6-9][0-9]{9}' : undefined}
                      title={loginMode === 'phone' ? 'Enter a valid 10-digit Indian mobile number' : undefined}
                    />
                  </AnimatePresence>
                </div>
                {/* Field-level error */}
                <AnimatePresence>
                  {fieldError && !fieldError.includes('password') && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-[10px] font-bold text-red-500 flex-shrink-0">!</span>
                      {fieldError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => { setPassword(e.target.value); setFieldError(''); }}
                    className={`input pr-12 ${fieldError && fieldError.includes('password') ? 'border-red-400 dark:border-red-500 focus:ring-red-400' : ''}`}
                    placeholder="••••••••" required />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {fieldError && fieldError.includes('password') && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="mt-1.5 text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                      <span className="w-3.5 h-3.5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-[10px] font-bold text-red-500 flex-shrink-0">!</span>
                      {fieldError}
                    </motion.p>
                  )}
                </AnimatePresence>
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
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </span>
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

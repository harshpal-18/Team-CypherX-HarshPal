import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight, ChevronLeft, User, Mail, Phone, Lock } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useUiStore from '../store/uiStore';
import AnnouncementBar from '../components/AnnouncementBar';

const SignupPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree]     = useState(false);
  const [fieldError, setFieldError] = useState('');
  const { register, login } = useAuthStore();
  const { addToast } = useUiStore();
  const navigate = useNavigate();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError('');
    if (form.password !== form.confirm) { addToast('Passwords do not match', 'error'); return; }
    if (form.password.length < 6)       { addToast('Password must be at least 6 characters', 'error'); return; }
    if (!agree)                         { addToast('Please accept the terms', 'error'); return; }
    setLoading(true);

    // Try real API first
    const result = await register({
      name:     form.name,
      email:    form.email    || undefined,
      phone:    form.phone    || undefined,
      password: form.password,
      role:     'customer',
    });

    if (result.success) {
      addToast(`Welcome to Quick Bite, ${form.name}! 🎉`, 'success');
      navigate('/customer/menu');
    } else {
      // Show server error inline
      setFieldError(result.message || 'Registration failed');
      addToast(result.message || 'Registration failed', 'error');
      // Offline fallback — let them in anyway if server is unreachable
      if (!result.message || result.message === 'Registration failed') {
        login({ name: form.name, email: form.email, phone: form.phone }, 'customer');
        addToast(`Welcome to Quick Bite, ${form.name}! 🎉`, 'success');
        navigate('/customer/menu');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-hero-gradient dark:bg-gray-950 flex flex-col">
      <AnnouncementBar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-500 mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-card">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">Quick Bite</span>
            </div>

            <h1 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-2">Create your account 🚀</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-7">Join 2,000+ students ordering smarter every day</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                    className="input pl-11" placeholder="Arjun Sharma" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                    className="input pl-11" placeholder="your@college.edu" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                    className="input pl-11" placeholder="98765 43210" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => update('password', e.target.value)}
                    className="input pl-11 pr-12" placeholder="Minimum 6 characters" required />
                  <button type="button" onClick={() => setShowPass(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="password" value={form.confirm} onChange={e => update('confirm', e.target.value)}
                    className="input pl-11" placeholder="Re-enter password" required />
                </div>
              </div>

              {/* Server field error */}
              {fieldError && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1.5 -mt-1">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-[10px] font-bold flex-shrink-0">!</span>
                  {fieldError}
                </p>
              )}

              <label className="flex items-start gap-2.5 cursor-pointer mt-1">
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-primary-500 focus:ring-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the <a href="#" className="text-primary-500 font-medium hover:underline">Terms of Service</a> and <a href="#" className="text-primary-500 font-medium hover:underline">Privacy Policy</a>
                </span>
              </label>

              <motion.button type="submit" whileTap={{ scale: 0.97 }} disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-base">
                {loading ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</span>
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </motion.button>
            </form>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-500 font-semibold hover:text-primary-600">Sign in →</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

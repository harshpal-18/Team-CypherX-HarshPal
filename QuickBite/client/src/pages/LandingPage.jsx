import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap, ShoppingBag, Clock, QrCode, BarChart3, Smartphone,
  Star, ArrowRight, ChevronRight, Leaf, Shield, Bell, UtensilsCrossed
} from 'lucide-react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewCarousel from '../components/ReviewCarousel';
import FAQAccordion from '../components/FAQAccordion';

const features = [
  { icon: <QrCode className="w-7 h-7" />,        title: 'QR Code Pickup',       desc: 'Generate a QR code after payment. Show it at the counter for instant verification — no waiting in line.', color: 'from-purple-400 to-purple-600' },
  { icon: <Zap className="w-7 h-7" />,            title: 'Smart Token System',    desc: 'AI-powered token generation estimates your exact wait time based on kitchen load and order complexity.', color: 'from-primary-400 to-primary-600' },
  { icon: <Clock className="w-7 h-7" />,          title: 'Live Order Tracking',   desc: 'Track your order from Received → Preparing → Cooking → Ready in real-time with push notifications.', color: 'from-accent-400 to-accent-600' },
  { icon: <BarChart3 className="w-7 h-7" />,      title: 'Admin Analytics',       desc: 'Detailed daily, weekly, monthly sales charts, peak hour analysis, and inventory alerts for admins.', color: 'from-green-400 to-green-600' },
  { icon: <UtensilsCrossed className="w-7 h-7" />, title: 'Table Booking',        desc: 'Reserve a 45-minute dining slot up to a week in advance. Color-coded availability grid for quick selection.', color: 'from-yellow-400 to-orange-500' },
  { icon: <Smartphone className="w-7 h-7" />,     title: 'Mobile-First Design',   desc: 'Beautifully responsive on every device. Dark mode, smooth animations, and a native-app-like experience.', color: 'from-blue-400 to-blue-600' },
];

const promoCards = [
  { emoji: '🥗', title: 'Fresh Food',         desc: 'Prepared fresh daily with quality ingredients',     bg: 'from-green-50 to-emerald-50',   border: 'border-green-200', textColor: 'text-green-700' },
  { emoji: '⏱️', title: 'Zero Waiting',       desc: 'Smart token system eliminates queue chaos',         bg: 'from-primary-50 to-orange-50',  border: 'border-primary-200', textColor: 'text-primary-700' },
  { emoji: '🎫', title: 'Smart Token System', desc: 'Order online, get a token, pickup when ready',      bg: 'from-purple-50 to-violet-50',   border: 'border-purple-200', textColor: 'text-purple-700' },
  { emoji: '⚡', title: 'Fast Pickup',        desc: 'Average delivery under 10 minutes guaranteed',      bg: 'from-yellow-50 to-amber-50',    border: 'border-yellow-200', textColor: 'text-yellow-700' },
];

const stats = [
  { value: '2,000+', label: 'Happy Students' },
  { value: '50+',    label: 'Menu Items' },
  { value: '< 10m',  label: 'Avg Wait Time' },
  { value: '4.8★',   label: 'User Rating' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <AnnouncementBar />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient dark:bg-gray-950 pt-24 pb-16" id="home">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-accent-200/40 dark:bg-accent-900/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-950/60 rounded-full text-primary-700 dark:text-primary-400 text-sm font-semibold mb-6 border border-primary-200 dark:border-primary-800">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
              🎉 Now with Smart Token System!
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.08] mb-6 text-balance">
              Skip the Queue,{' '}
              <span className="gradient-text">Order Smart</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Quick Bite brings your campus canteen online — order food, book tables, track orders live, and pick up with a QR scan. No more queue chaos.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
              <Link to="/signup" className="btn-primary text-base px-8 py-4">
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="btn-outline text-base px-8 py-4">
                Sign In
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
              {stats.map(s => (
                <div key={s.label}>
                  <p className="font-display font-bold text-2xl gradient-text">{s.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Phone mockup */}
              <div className="relative mx-auto w-72 h-[500px] bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-200 dark:border-gray-700 overflow-hidden animate-float">
                {/* Status bar */}
                <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white">
                  <p className="text-xs font-medium opacity-80">Quick Bite</p>
                  <p className="font-bold text-lg">Good afternoon! 👋</p>
                  <p className="text-xs opacity-80">What are you craving today?</p>
                </div>
                {/* Food cards preview */}
                <div className="p-3 space-y-2">
                  {[
                    { name: 'Paneer Burger', price: 85, tag: "Today's Special", img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
                    { name: 'Chicken Biryani', price: 130, tag: 'Popular 🔥', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80' },
                    { name: 'Masala Dosa', price: 60, tag: 'Breakfast', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200&q=80' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                      <img src={item.img} alt={item.name} className="w-12 h-12 rounded-xl object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80'; }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                        <p className="text-xs text-primary-500 font-semibold">₹{item.price}</p>
                        <span className="text-[10px] text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded-full">{item.tag}</span>
                      </div>
                      <button className="w-7 h-7 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl text-white flex items-center justify-center text-lg font-bold">+</button>
                    </div>
                  ))}
                  {/* Token display */}
                  <div className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl text-white text-center">
                    <p className="text-xs font-medium opacity-80">Your Token</p>
                    <p className="font-display font-black text-3xl">T-042</p>
                    <p className="text-xs opacity-80">Est. 8 minutes</p>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -left-10 top-16 bg-white dark:bg-gray-900 rounded-2xl shadow-card-lg p-3 flex items-center gap-2">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center"><span className="text-xl">✅</span></div>
                <div><p className="font-bold text-xs text-gray-900 dark:text-white">Order Ready!</p><p className="text-[10px] text-gray-400">T-041 pickup now</p></div>
              </motion.div>
              <motion.div animate={{ y: [5, -5, 5] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute -right-8 bottom-24 bg-white dark:bg-gray-900 rounded-2xl shadow-card-lg p-3 flex items-center gap-2">
                <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center"><span className="text-xl">🍔</span></div>
                <div><p className="font-bold text-xs text-gray-900 dark:text-white">₹85 Saved</p><p className="text-[10px] text-gray-400">with combo deal</p></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROMO BANNERS ──────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-gray-950" id="about">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {promoCards.map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`card-hover p-6 bg-gradient-to-br ${card.bg} dark:bg-none dark:bg-gray-900 border ${card.border} dark:border-gray-800 text-center`}>
                <div className="text-4xl mb-3">{card.emoji}</div>
                <h3 className={`font-display font-bold text-base ${card.textColor} dark:text-white mb-1`}>{card.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 dark:bg-primary-950/60 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold mb-4">
              ⚡ Packed with powerful features
            </motion.div>
            <h2 className="section-title">Everything You Need for a <span className="gradient-text">Better Canteen</span></h2>
            <p className="section-subtitle">Modern technology meets college food culture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-hover p-6 group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Order delicious food in just 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 to-accent-200" />
            {[
              { step: '01', icon: '🔍', title: 'Browse Menu',  desc: 'Explore 50+ items with filters, search, and smart recommendations' },
              { step: '02', icon: '🛒', title: 'Add to Cart',  desc: 'Pick your items, choose Dine In, Takeaway or Parcel' },
              { step: '03', icon: '💳', title: 'Pay Easily',   desc: 'Pay via Cash, UPI, Card or Net Banking. Get a token + QR code' },
              { step: '04', icon: '⚡', title: 'Quick Pickup', desc: 'Track live, wait for your token, show QR at counter — done!' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center text-3xl mb-4 shadow-card-lg">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-xs font-black flex items-center justify-center">{s.step}</span>
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────── */}
      <section className="py-16 mx-4 mb-4 rounded-4xl bg-gradient-to-r from-primary-500 to-accent-500 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute w-20 h-20 bg-white rounded-full"
              style={{ left: `${i * 14}%`, top: i % 2 === 0 ? '-20px' : 'auto', bottom: i % 2 !== 0 ? '-20px' : 'auto', opacity: 0.4 }} />
          ))}
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">
            Ready to skip the queue forever?
          </h2>
          <p className="text-white/80 text-lg mb-8">Join 2,000+ students already using Quick Bite daily</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-gray-50 hover:scale-105 transition-all shadow-lg">
              Get Started Free →
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white/20 text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/30 hover:scale-105 transition-all">
              I Have an Account
            </Link>
          </div>
        </div>
      </section>

      <ReviewCarousel />
      <FAQAccordion />
      <Footer />
    </div>
  );
};

export default LandingPage;

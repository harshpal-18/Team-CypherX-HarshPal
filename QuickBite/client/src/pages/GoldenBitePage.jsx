import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Crown, Star, Zap, Check, ChevronDown, Tag, Gift, Sparkles, Shield, TrendingUp, ArrowRight, ArrowLeft, BadgeCheck, Flame, Gem } from "lucide-react";
import GoldenBiteNavbar from "../components/GoldenBiteNavbar";
import Footer from "../components/Footer";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const benefits = [
  { icon: <Tag className="w-5 h-5" />,        label: '15% OFF on every order',                  desc: 'Flat discount auto-applied at checkout, always.' },
  { icon: <Zap className="w-5 h-5" />,        label: 'Priority order processing',               desc: 'Your order jumps the queue — faster token, faster food.' },
  { icon: <Gift className="w-5 h-5" />,       label: 'Exclusive member-only offers',            desc: 'Flash deals and secret discounts only you can see.' },
  { icon: <Flame className="w-5 h-5" />,      label: 'Early access to special menu items',      desc: 'Taste new dishes before anyone else does.' },
  { icon: <BadgeCheck className="w-5 h-5" />, label: 'Premium member badge in profile',         desc: 'Golden crown badge proudly displayed on your account.' },
  { icon: <TrendingUp className="w-5 h-5" />, label: 'Unlimited savings throughout membership', desc: 'The more you order, the more you save — no cap.' },
];

const faqs = [
  { q: "How does Golden Bite work?", a: "Once you subscribe to Golden Bite, a premium badge is added to your profile. Every order you place will automatically receive a 15% discount at checkout, along with priority processing so you get your food faster." },
  { q: "When is the discount applied?", a: "The discount is applied automatically at checkout — you don't need any coupon code. Simply place your order as usual and the 15% savings are reflected in your total before payment." },
  { q: "Can I cancel my membership?", a: "Yes! Monthly members can cancel anytime before their next billing date with no questions asked. Yearly members can cancel to prevent auto-renewal, but the membership remains active until the end of the paid year." },
  { q: "Is the discount valid on every order?", a: "Absolutely. The 15% discount applies to every single order — dine-in, takeaway, or any menu item — with no minimum order value. It's unlimited savings throughout your membership." },
];

const GOLD = "linear-gradient(135deg, #fde68a 0%, #f59e0b 40%, #d97706 70%, #fbbf24 100%)";
const goldText = { backgroundImage: "linear-gradient(135deg, #fde68a, #f59e0b, #d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

const AnimatedCounter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const steps = 60; const inc = target / steps; let current = 0;
    const timer = setInterval(() => { current += inc; if (current >= target) { setCount(target); clearInterval(timer); } else setCount(Math.floor(current)); }, 1800 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const FaqItem = ({ q, a, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="border border-yellow-500/20 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
      <button className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none group" onClick={() => setOpen(o => !o)} id={`faq-btn-${index}`} aria-expanded={open}>
        <span className="text-white font-semibold text-base group-hover:text-yellow-400 transition-colors duration-200">{q}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-yellow-500/40 flex items-center justify-center transition-all duration-300 ${open ? 'bg-yellow-500/20 rotate-180' : ''}`}>
          <ChevronDown className="w-4 h-4 text-yellow-400" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }}>
            <p className="px-6 pb-5 text-gray-300 leading-relaxed text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const GoldenBitePage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [monthlySpend, setMonthlySpend] = useState(4000);
  const saving = Math.round(monthlySpend * 0.15);
  const yearlySaving = saving * 12;
  const roi = Math.max(0, Math.round((yearlySaving / 899) * 100 - 100));

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">
      <GoldenBiteNavbar />

      {/* ── BACK BUTTON ────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <motion.button
          id="golden-bite-back-btn"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:border-yellow-500/40 hover:bg-yellow-500/10 transition-all duration-300 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
          Back
        </motion.button>
      </div>

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-900/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/20 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#d97706 1px, transparent 1px), linear-gradient(90deg, #d97706 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>
        {[...Array(8)].map((_, i) => (
          <motion.div key={i} className="absolute text-yellow-400/40 text-xl select-none pointer-events-none"
            style={{ top: `${10 + i * 10}%`, left: `${5 + i * 12}%` }}
            animate={{ y: [0, -14, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}>✦</motion.div>
        ))}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(234,179,8,0.5)] animate-float" style={{ background: GOLD }}>
                <Crown className="w-12 h-12 text-black fill-black" />
              </div>
              <div className="absolute inset-0 rounded-3xl border-2 border-yellow-400/50 animate-ping" style={{ animationDuration: '2.5s' }} />
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />Exclusive Premium Membership<Sparkles className="w-4 h-4" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-6">
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #fde68a 0%, #f59e0b 30%, #fbbf24 55%, #d97706 80%, #fde68a 100%)', backgroundSize: '200% 200%', animation: 'shimmerText 4s linear infinite' }}>Golden Bite</span>
            <br /><span className="text-white text-4xl sm:text-5xl md:text-6xl">Membership</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Enjoy <span className="text-yellow-400 font-semibold">exclusive savings</span> and{' '}
            <span className="text-yellow-400 font-semibold">priority service</span> every time you order.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button id="hero-scroll-cta" onClick={() => document.getElementById('plans-section').scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-10 py-4 rounded-2xl font-bold text-lg text-black overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_60px_rgba(234,179,8,0.7)] transition-all duration-300" style={{ background: GOLD }}>
              <span className="relative z-10 flex items-center gap-2"><Crown className="w-5 h-5 fill-black" />Become a Golden Bite Member<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" /></span>
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-white/20 skew-x-12" />
            </button>
            <button onClick={() => document.getElementById('benefits-section').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-2xl font-semibold text-yellow-400 border border-yellow-500/40 hover:border-yellow-400 hover:bg-yellow-500/10 transition-all duration-300 backdrop-blur-sm">
              View Benefits
            </button>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-14 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
            {[{ icon: '⭐', text: '4.9 / 5 rating' }, { icon: '👑', text: '2,000+ members' }, { icon: '💰', text: 'Save up to ₹7,200/yr' }].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10"><span>{item.icon}</span><span>{item.text}</span></div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-6 h-6 text-yellow-500/60" />
        </motion.div>
      </section>

      {/* ══ BENEFITS ══════════════════════════════════════════ */}
      <section id="benefits-section" className="relative py-24 px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="relative max-w-6xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold mb-4"><Gem className="w-4 h-4" /> Member Benefits</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Everything You Get with <span style={goldText}>Golden Bite</span></h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Premium perks designed to elevate every dining experience on campus.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative p-6 rounded-3xl border border-yellow-500/15 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm overflow-hidden cursor-default">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-500/20 to-transparent rounded-bl-3xl" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-black shadow-[0_4px_20px_rgba(234,179,8,0.35)]" style={{ background: GOLD }}>{b.icon}</div>
                  <h3 className="font-semibold text-white mb-2 text-base leading-snug">{b.label}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center"><Check className="w-3.5 h-3.5 text-yellow-400" /></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══ PLANS ═════════════════════════════════════════════ */}
      <section id="plans-section" className="relative py-24 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold mb-4"><Tag className="w-4 h-4" /> Choose Your Plan</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Simple, <span style={goldText}>Transparent Pricing</span></h2>
            <p className="text-gray-400 text-lg">No hidden fees. Cancel anytime. Pure golden savings.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-center mb-10">
            <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl gap-1">
              {['monthly', 'yearly'].map(plan => (
                <button key={plan} id={`plan-toggle-${plan}`} onClick={() => setSelectedPlan(plan)}
                  className={`px-8 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 capitalize ${selectedPlan === plan ? 'text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                  style={selectedPlan === plan ? { background: GOLD } : {}}>
                  {plan}{plan === 'yearly' && <span className="ml-2 text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">Best Value</span>}
                </button>
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly */}
            <motion.div variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} onClick={() => setSelectedPlan('monthly')} id="plan-monthly-card"
              className={`relative p-8 rounded-3xl border cursor-pointer transition-all duration-300 ${selectedPlan === 'monthly' ? 'border-yellow-500/60 bg-gradient-to-br from-yellow-500/10 to-amber-900/10 shadow-[0_0_40px_rgba(234,179,8,0.2)]' : 'border-white/10 bg-white/[0.03] hover:border-yellow-500/30'}`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Monthly Plan</p>
                  <div className="flex items-end gap-1"><span className="text-5xl font-black text-white">₹499</span><span className="text-gray-400 mb-2">/month</span></div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === 'monthly' ? 'border-yellow-400 bg-yellow-400' : 'border-gray-600'}`}>
                  {selectedPlan === 'monthly' && <Check className="w-3.5 h-3.5 text-black" />}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {['Save 15% on every order', 'Priority order processing', 'Premium member badge', 'Cancel anytime'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-yellow-400" /></div>{f}
                  </li>
                ))}
              </ul>
              <button id="monthly-subscribe-btn" onClick={e => { e.stopPropagation(); setSelectedPlan('monthly'); }}
                className={`w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${selectedPlan === 'monthly' ? 'text-black shadow-[0_0_24px_rgba(234,179,8,0.4)]' : 'border border-white/20 text-white hover:border-yellow-500/40 hover:text-yellow-400'}`}
                style={selectedPlan === 'monthly' ? { background: GOLD } : {}}>
                {selectedPlan === 'monthly' ? '✓ Selected — Subscribe Monthly' : 'Select Monthly'}
              </button>
            </motion.div>
            {/* Yearly */}
            <motion.div variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.2 } }} onClick={() => setSelectedPlan('yearly')} id="plan-yearly-card"
              className={`relative p-8 rounded-3xl border cursor-pointer transition-all duration-300 overflow-hidden ${selectedPlan === 'yearly' ? 'border-yellow-500/80 bg-gradient-to-br from-yellow-500/15 to-amber-900/15 shadow-[0_0_60px_rgba(234,179,8,0.3)]' : 'border-yellow-500/30 bg-white/[0.03] hover:border-yellow-500/50'}`}>
              <div className="absolute top-0 right-0">
                <div className="text-black text-xs font-bold px-5 py-1.5 rounded-bl-2xl flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg, #fde68a, #f59e0b)' }}>
                  <Star className="w-3 h-3 fill-black" />Most Popular
                </div>
              </div>
              {selectedPlan === 'yearly' && <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: 'radial-gradient(circle at top center, rgba(234,179,8,0.12) 0%, transparent 70%)' }} />}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-yellow-400 text-sm font-medium mb-1">Yearly Plan</p>
                  <div className="flex items-end gap-1"><span className="text-5xl font-black text-white">₹899</span><span className="text-gray-400 mb-2">/year</span></div>
                  <p className="text-green-400 text-xs font-semibold mt-1">≈ ₹75/month — Save big vs monthly!</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPlan === 'yearly' ? 'border-yellow-400 bg-yellow-400' : 'border-yellow-500/50'}`}>
                  {selectedPlan === 'yearly' && <Check className="w-3.5 h-3.5 text-black" />}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <Sparkles className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-yellow-300 text-xs font-semibold">Best Value — Lock in savings for the whole year!</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Save 15% on every order', 'Priority order processing', 'Premium member badge', 'Exclusive member-only deals', 'Early access to new dishes', 'Best value — cancel anytime'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-200">
                    <div className="w-5 h-5 rounded-full bg-yellow-500/25 flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-yellow-400" /></div>{f}
                  </li>
                ))}
              </ul>
              <button id="yearly-subscribe-btn" onClick={e => e.stopPropagation()}
                className="group relative w-full py-3.5 rounded-2xl font-bold text-base text-black overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.5)] hover:shadow-[0_0_60px_rgba(234,179,8,0.8)] transition-all duration-300" style={{ background: GOLD }}>
                <span className="relative z-10 flex items-center justify-center gap-2"><Crown className="w-4 h-4 fill-black" />{selectedPlan === 'yearly' ? 'Subscribe Now — Best Value' : 'Select Yearly Plan'}</span>
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-white/25 skew-x-12" />
              </button>
            </motion.div>
          </div>
          <motion.p variants={fadeUp} className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-yellow-500/60" />Secure payment · No hidden fees · Cancel anytime
          </motion.p>
        </motion.div>
      </section>

      {/* ══ SAVINGS CALCULATOR ════════════════════════════════ */}
      <section className="relative py-24 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="max-w-3xl mx-auto text-center">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold mb-4"><TrendingUp className="w-4 h-4" /> Savings Calculator</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">See How Much <span style={goldText}>You Save</span></h2>
            <p className="text-gray-400 text-lg mb-10">Drag the slider to match your monthly food spend.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="p-8 md:p-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400 text-sm">Monthly food spend</span>
                <span className="text-2xl font-black text-white">₹{monthlySpend.toLocaleString()}</span>
              </div>
              <input id="savings-slider" type="range" min={500} max={10000} step={100} value={monthlySpend} onChange={e => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #f59e0b ${((monthlySpend - 500) / 9500) * 100}%, rgba(255,255,255,0.1) 0%)`, outline: 'none' }} />
              <div className="flex justify-between text-xs text-gray-500 mt-1.5"><span>₹500</span><span>₹10,000</span></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[{ label: 'Monthly Savings', value: `₹${saving.toLocaleString()}`, accent: 'text-yellow-400' }, { label: 'Yearly Savings', value: `₹${yearlySaving.toLocaleString()}`, accent: 'text-green-400' }, { label: 'ROI on Yearly Plan', value: `${roi}%`, accent: 'text-purple-400' }].map((stat, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <p className={`text-3xl font-black mb-1 ${stat.accent}`}>{stat.value}</p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-sm text-yellow-100 leading-relaxed text-left">
              💡 If you spend <strong className="text-yellow-300">₹{monthlySpend.toLocaleString()}/month</strong> on food, you'll save <strong className="text-yellow-300">₹{saving.toLocaleString()} every month</strong> — that's <strong className="text-yellow-300">₹{yearlySaving.toLocaleString()}/year</strong> with Golden Bite.
              {yearlySaving > 899 && <> The <strong className="text-green-300">₹899 yearly plan pays for itself</strong> in savings alone!</>}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ STATS STRIP ═══════════════════════════════════════ */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(120,53,15,0.4) 0%, rgba(0,0,0,0) 50%, rgba(120,53,15,0.4) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />
        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ val: 2000, suffix: '+', prefix: '', label: 'Happy Members' }, { val: 15, suffix: '%', prefix: '', label: 'Guaranteed Savings' }, { val: 7200, suffix: '+', prefix: '₹', label: 'Max Yearly Savings' }, { val: 4.9, suffix: '★', prefix: '', label: 'Member Rating' }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="text-4xl md:text-5xl font-black mb-1" style={goldText}><AnimatedCounter target={s.val} suffix={s.suffix} prefix={s.prefix} /></div>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══ BIG CTA ═══════════════════════════════════════════ */}
      <section className="relative py-28 px-4 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={stagger} className="relative max-w-2xl mx-auto">
          <motion.div className="flex justify-center mb-8" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
            <div className="w-20 h-20 rounded-full border border-dashed border-yellow-500/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.5)]" style={{ background: GOLD }}><Crown className="w-7 h-7 text-black fill-black" /></div>
            </div>
          </motion.div>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5">Ready to Go <span style={goldText}>Golden?</span></motion.h2>
          <motion.p variants={fadeUp} className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">Join thousands of smart students who save on every bite. Premium membership, premium experience.</motion.p>
          <motion.button variants={fadeUp} id="main-cta-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="group relative px-12 py-5 rounded-2xl font-black text-xl text-black overflow-hidden shadow-[0_0_60px_rgba(234,179,8,0.5)] hover:shadow-[0_0_100px_rgba(234,179,8,0.7)] transition-shadow duration-300" style={{ background: GOLD }}>
            <span className="relative z-10 flex items-center gap-3"><Crown className="w-6 h-6 fill-black" />Become a Golden Bite Member<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" /></span>
            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-white/20 skew-x-12" />
          </motion.button>
          <motion.p variants={fadeUp} className="text-gray-500 text-sm mt-5 flex items-center justify-center gap-2"><Shield className="w-4 h-4 text-yellow-500/50" />30-day money-back guarantee · Secure checkout</motion.p>
        </motion.div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════ */}
      <section className="relative py-24 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="max-w-3xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-semibold mb-4"><Shield className="w-4 h-4" /> FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-3">Got <span style={goldText}>Questions?</span></h2>
            <p className="text-gray-400 text-lg">Everything you need to know about Golden Bite membership.</p>
          </motion.div>
          <div className="space-y-3">{faqs.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} index={i} />)}</div>
        </motion.div>
      </section>

      <Footer />
      <style>{`
        @keyframes shimmerText {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px; border-radius: 50%;
          background: linear-gradient(135deg, #fde68a, #f59e0b);
          cursor: pointer;
          box-shadow: 0 0 12px rgba(234,179,8,0.6);
          border: 2px solid #78350f;
        }
        input[type='range']::-moz-range-thumb {
          width: 22px; height: 22px; border-radius: 50%;
          background: linear-gradient(135deg, #fde68a, #f59e0b);
          cursor: pointer;
          box-shadow: 0 0 12px rgba(234,179,8,0.6);
          border: 2px solid #78350f;
        }
      `}</style>
    </div>
  );
};

export default GoldenBitePage;


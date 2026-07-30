'use client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Zap, Clock, Star, ChevronRight, ArrowRight,
  Brain, TrendingUp, BarChart3, Package, Flame,
  MapPin, Users, ShoppingBag, CheckCircle2
} from 'lucide-react';

/* ─── FLOATING SHAPES ─────────────────── */
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Big blob orange */}
      <div className="blob float" style={{ width:520,height:520, background:'rgba(255,107,0,0.12)', top:'-120px', right:'-60px' }} />
      {/* Blob yellow */}
      <div className="blob float-2" style={{ width:320,height:320, background:'rgba(255,200,61,0.18)', bottom:'10%', left:'-60px' }} />
      {/* Blob green */}
      <div className="blob float-3" style={{ width:240,height:240, background:'rgba(13,92,59,0.08)', top:'55%', right:'20%' }} />
      {/* Decorative ring */}
      <div className="spin-slow" style={{ position:'absolute', top:80, left:'12%', width:100, height:100, border:'4px solid rgba(255,107,0,0.2)', borderRadius:'50%' }} />
      {/* Star shape */}
      <div className="float-r" style={{ position:'absolute', top:'35%', right:'8%', fontSize:48, opacity:0.3 }}>★</div>
      <div className="float-2" style={{ position:'absolute', bottom:'25%', right:'25%', fontSize:32, opacity:0.25 }}>◆</div>
      <div className="float" style={{ position:'absolute', top:'20%', left:'6%', fontSize:28, opacity:0.2 }}>●</div>
      {/* Dot grid */}
      <div className="dot-bg absolute inset-0 opacity-30" />
    </div>
  );
}

/* ─── FOOD EMOJI FLOAT ────────────────── */
const FOODS = [
  { emoji:'🍔', style:{ top:'18%', left:'5%' }, cls:'float', size:52 },
  { emoji:'🍕', style:{ top:'12%', right:'15%' }, cls:'float-2', size:48 },
  { emoji:'🍟', style:{ bottom:'30%', left:'8%' }, cls:'float-3', size:44 },
  { emoji:'🧋', style:{ top:'55%', right:'6%' }, cls:'float-r', size:50 },
  { emoji:'🍱', style:{ bottom:'18%', right:'18%' }, cls:'float-2', size:42 },
  { emoji:'🌮', style:{ top:'40%', left:'2%' }, cls:'float-3', size:40 },
];

/* ─── MARQUEE TICKER ──────────────────── */
const TICKER_ITEMS = ['⚡ Skip The Queue', '🎯 Real-Time Token', '🤖 AI Predictions', '🍔 Pre-Order Now', '📱 Mobile First', '🎟 Smart Queue'];
function Ticker() {
  const text = [...TICKER_ITEMS, ...TICKER_ITEMS].join('   ·   ');
  return (
    <div className="marquee-wrapper py-3 border-y-2 border-[#1D1D1D] bg-[#FF6B00]">
      <div className="marquee-inner text-white font-display font-700 text-sm tracking-widest uppercase">
        {text} &nbsp;&nbsp;&nbsp; {text}
      </div>
    </div>
  );
}

/* ─── FOOD CARD ───────────────────────── */
const SAMPLE_FOODS = [
  { id:1, name:'Classic Burger', price:120, prepTime:10, rating:4.8, emoji:'🍔', available:true, tag:'🔥 Bestseller', bg:'#FFF5EB' },
  { id:2, name:'Margherita Pizza', price:150, prepTime:18, rating:4.7, emoji:'🍕', available:true, tag:'⭐ Top Rated', bg:'#F0FFF4' },
  { id:3, name:'Cold Coffee', price:70, prepTime:3, rating:4.9, emoji:'☕', available:true, tag:'⚡ Super Fast', bg:'#EFF6FF' },
  { id:4, name:'Veg Noodles', price:90, prepTime:12, rating:4.5, emoji:'🍜', available:true, tag:'🌱 Veg', bg:'#FFF0F0' },
];

function FoodCard({ item, delay }: { item: typeof SAMPLE_FOODS[0], delay: number }) {
  const [count, setCount] = useState(0);
  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ delay, duration:0.4, ease:[0.34,1.56,0.64,1] }}
      className="food-card"
      style={{ background: item.bg }}
    >
      <div className="relative p-4 pb-0">
        <div
          className="w-full h-40 flex items-center justify-center rounded-2xl mb-3 float"
          style={{ fontSize:80, background:'rgba(255,255,255,0.7)', border:'2px dashed rgba(29,29,29,0.1)' }}
        >
          {item.emoji}
        </div>
        <span className="badge badge-orange absolute top-6 right-6">{item.tag}</span>
      </div>
      <div className="p-4 pt-2">
        <h3 className="font-display text-lg font-800 mb-1" style={{ fontFamily:'Syne,sans-serif', fontWeight:800 }}>{item.name}</h3>
        <div className="flex items-center gap-3 text-sm text-[#666] mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.prepTime} min</span>
          <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" />{item.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black" style={{ fontFamily:'Syne,sans-serif', color:'var(--orange)' }}>₹{item.price}</span>
          {count === 0 ? (
            <button onClick={() => setCount(1)} className="btn-primary text-sm px-4 py-2">
              Add +
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => setCount(c=>Math.max(0,c-1))} className="w-8 h-8 rounded-full border-2 border-[#1D1D1D] font-black flex items-center justify-center bg-white hover:bg-[#FF6B00] hover:text-white transition-colors">−</button>
              <span className="w-6 text-center font-black">{count}</span>
              <button onClick={() => setCount(c=>c+1)} className="w-8 h-8 rounded-full border-2 border-[#1D1D1D] font-black flex items-center justify-center bg-[#FF6B00] text-white hover:bg-orange-700 transition-colors">+</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── QUEUE VISUAL ────────────────────── */
function QueueSection() {
  const [progress, setProgress] = useState(72);
  useEffect(() => {
    const t = setInterval(() => setProgress(p => Math.min(100, p + 1)), 200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 relative" style={{ background:'var(--dark)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          className="text-center mb-16"
        >
          <span className="badge badge-yellow mb-4 inline-block">🎟 Live Queue System</span>
          <h2 className="text-hero text-white" style={{ fontSize:'clamp(3rem,8vw,6rem)' }}>
            Your Token,<br/>
            <span style={{ color:'var(--yellow)' }}>Your Time.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Current token */}
          <motion.div
            initial={{ opacity:0, x:-40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            className="token-card p-8 text-center token-glow"
          >
            <div className="badge badge-yellow mb-4" style={{ display:'inline-flex' }}>Current Serving</div>
            <div className="token-number">A-102</div>
            <div className="text-white/50 mt-2 font-medium">At Counter 1</div>
          </motion.div>

          {/* Progress info */}
          <motion.div
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:0.15 }}
            className="space-y-5"
          >
            <div className="card-orange p-6">
              <div className="text-white/70 text-sm font-medium mb-1">Estimated Wait</div>
              <div className="text-5xl font-black" style={{ fontFamily:'Syne,sans-serif', color:'var(--yellow)' }}>12 min</div>
            </div>
            <div className="card-yellow p-4">
              <div className="text-[#8B5500] text-xs font-bold uppercase tracking-wider mb-2">Queue Progress</div>
              <div className="progress-track mb-2">
                <div className="progress-fill" style={{ width:`${progress}%` }} />
              </div>
              <div className="text-xs font-semibold text-[#8B5500]">{8} orders ahead</div>
            </div>
            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-black text-sm">Ready to Collect</div>
                <div className="text-xs text-[#666]">A-099, A-100, A-101</div>
              </div>
            </div>
          </motion.div>

          {/* Your token */}
          <motion.div
            initial={{ opacity:0, x:40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ delay:0.2 }}
            className="token-card p-8 text-center"
            style={{ border:'3px solid var(--orange)', boxShadow:'6px 6px 0 var(--orange)' }}
          >
            <div className="badge badge-orange mb-4" style={{ display:'inline-flex' }}>Your Token</div>
            <div className="token-number" style={{ color:'var(--orange)' }}>A-110</div>
            <div className="text-white/50 mt-2 font-medium">
              <div className="w-full h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background:'var(--orange)' }}
                  initial={{ width:'0%' }}
                  animate={{ width:'72%' }}
                  transition={{ duration:1.5, ease:'easeOut' }}
                />
              </div>
              <div className="mt-2 text-xs">Token notification will be sent when ready</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── AI SECTION ──────────────────────── */
const AI_CARDS = [
  { icon:'🧠', title:'Wait Time Prediction', desc:'AI forecasts queue wait with 94% accuracy based on order history', color:'#FF6B00', bg:'#FFF5EB' },
  { icon:'🎯', title:'Smart Recommendations', desc:'Personalized menu suggestions based on your tastes and order history', color:'#0D5C3B', bg:'#F0FFF4' },
  { icon:'📈', title:'Peak Hour Forecast', desc:'Predicts rush hours and suggests optimal ordering times', color:'#1a56db', bg:'#EFF6FF' },
  { icon:'📦', title:'Inventory Prediction', desc:'Auto-alerts vendors before items run out during lunch rush', color:'#9c27b0', bg:'#FDF4FF' },
];

function AISection() {
  return (
    <section className="py-24 relative" style={{ background:'var(--cream)' }}>
      <div className="absolute inset-0 dot-bg opacity-40" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          className="mb-16"
        >
          <span className="badge badge-orange mb-4 inline-block">🤖 Powered by AI</span>
          <h2 className="text-hero" style={{ fontSize:'clamp(3rem,8vw,5.5rem)' }}>
            Not just smart.<br/>
            <span style={{ color:'var(--orange)' }}>Genius-level.</span>
          </h2>
          <p className="text-[#666] text-lg mt-4 max-w-xl" style={{ fontFamily:'Space Grotesk' }}>
            Our AI engine works in the background — predicting, optimizing, and making your canteen experience seamless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AI_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity:0, y:40, rotate:-2 }}
              whileInView={{ opacity:1, y:0, rotate:0 }}
              viewport={{ once:true }}
              transition={{ delay:i*0.1, duration:0.4, ease:[0.34,1.56,0.64,1] }}
              whileHover={{ y:-6, rotate:-1.5 }}
              className="card p-6"
              style={{ background: card.bg }}
            >
              <div className="text-5xl mb-4 float">{card.icon}</div>
              <h3 className="font-black text-base mb-2" style={{ fontFamily:'Syne,sans-serif' }}>{card.title}</h3>
              <p className="text-sm text-[#666] leading-relaxed">{card.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-bold" style={{ color: card.color }}>
                Learn more <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATS STRIP ─────────────────────── */
function StatsStrip() {
  const STATS = [
    { value:'500+', label:'Orders Daily', icon:'📦' },
    { value:'73%', label:'Queue Reduction', icon:'⚡' },
    { value:'14 min', label:'Avg Wait Time', icon:'⏱' },
    { value:'4.8★', label:'Student Rating', icon:'⭐' },
  ];
  return (
    <div style={{ background:'var(--orange)' }} className="border-y-[3px] border-[#1D1D1D]">
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((s,i) => (
          <motion.div
            key={s.label}
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:i*0.1 }}
            className="text-center"
          >
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="text-white font-black text-3xl" style={{ fontFamily:'Syne,sans-serif' }}>{s.value}</div>
            <div className="text-orange-100 text-sm font-medium">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── HERO ────────────────────────────── */
export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start','end start'] });
  const y = useTransform(scrollYProgress, [0,1], [0, 120]);

  return (
    <div className="min-h-screen" style={{ background:'var(--cream)' }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
        <div className="max-w-6xl mx-auto nav-pill px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ background:'var(--orange)' }}>🍽️</div>
            <span className="text-white font-black text-lg" style={{ fontFamily:'Syne,sans-serif' }}>QuickBite</span>
            <span className="badge badge-yellow ml-1 text-[9px]">BETA</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            {['Menu','Queue','AI','Dashboard'].map(item => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all font-medium">{item}</Link>
            ))}
          </div>
          <div className="flex gap-2">
            <Link href="/login">
              <button className="btn-outline text-white border-white/30 text-sm px-4 py-2 hover:bg-white hover:text-[#1D1D1D]">Log in</button>
            </Link>
            <Link href="/login">
              <button className="btn-primary text-sm px-4 py-2">Order Now →</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-10 overflow-hidden" style={{ background:'var(--cream)' }}>
        <FloatingShapes />
        {/* Floating food emojis */}
        {FOODS.map((f,i) => (
          <div key={i} className={f.cls} style={{ position:'absolute', fontSize:f.size, zIndex:1, userSelect:'none', ...f.style }}>
            {f.emoji}
          </div>
        ))}

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div>
              <motion.div
                initial={{ opacity:0, y:30 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5 }}
                className="inline-flex items-center gap-2 badge badge-green mb-6"
              >
                <div className="w-2 h-2 rounded-full bg-green-400 pulse-s" /> AI-Powered Canteen System
              </motion.div>

              <motion.h1
                initial={{ opacity:0, y:40 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.1, duration:0.6, ease:[0.34,1.56,0.64,1] }}
                className="text-hero mb-6"
                style={{ fontSize:'clamp(3.5rem,9vw,7.5rem)' }}
              >
                Skip The<br/>
                <span style={{ color:'var(--orange)', WebkitTextStroke:'2px #1D1D1D', WebkitTextFillColor:'var(--orange)' }}>Queue.</span><br/>
                Grab Your<br/>
                <span style={{ color:'var(--green)' }}>Food.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.25 }}
                className="text-lg text-[#555] mb-8 max-w-md leading-relaxed"
              >
                AI-powered pre-ordering for your campus canteen. No more lines, no more waiting. Just grab and go.
              </motion.p>

              <motion.div
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.35 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link href="/student/menu">
                  <button className="btn-primary text-base px-7 py-4">
                    🛒 Order Now
                  </button>
                </Link>
                <Link href="/student/token">
                  <button className="btn-outline text-base px-7 py-4">
                    🎟 Track Token
                  </button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                transition={{ delay:0.5 }}
                className="flex items-center gap-4"
              >
                <div className="flex -space-x-3">
                  {['🧑‍🎓','👩‍🎓','🧑‍💻','👩‍🍳'].map((e,i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-white border-2 border-[#1D1D1D] flex items-center justify-center text-base shadow">{e}</div>
                  ))}
                </div>
                <div>
                  <div className="font-black text-sm">2,450+ students</div>
                  <div className="text-xs text-[#888]">using QuickBite daily</div>
                </div>
              </motion.div>
            </div>

            {/* Right mascot */}
            <motion.div
              initial={{ opacity:0, scale:0.8, rotate:5 }}
              animate={{ opacity:1, scale:1, rotate:0 }}
              transition={{ delay:0.2, duration:0.6, ease:[0.34,1.56,0.64,1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div
                className="relative rounded-3xl overflow-hidden float"
                style={{ width:440, height:480, border:'3px solid #1D1D1D', boxShadow:'8px 8px 0 #1D1D1D', background:'white' }}
              >
                <Image src="/student-mascot.jpg" alt="Happy student with food" fill className="object-cover" />
                {/* Overlay cards */}
                <div className="absolute bottom-4 left-4 card p-3 flex items-center gap-2 bg-white bounce-in" style={{ boxShadow:'3px 3px 0 #1D1D1D' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background:'var(--yellow)' }}>⚡</div>
                  <div>
                    <div className="font-black text-xs">Order Ready!</div>
                    <div className="text-[10px] text-[#888]">Token A-105 · Counter 2</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 card p-3 bg-white bounce-in" style={{ animationDelay:'0.3s', boxShadow:'3px 3px 0 #1D1D1D' }}>
                  <div className="text-xs font-black">Wait Time</div>
                  <div className="text-2xl font-black" style={{ color:'var(--orange)', fontFamily:'Syne' }}>8 min</div>
                </div>
              </div>
              {/* Decorative ring */}
              <div className="spin-slow absolute" style={{ width:520, height:520, border:'3px dashed rgba(255,107,0,0.3)', borderRadius:'50%' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* STATS */}
      <StatsStrip />

      {/* MENU SECTION */}
      <section id="menu" className="py-24" style={{ background:'var(--light)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="flex items-end justify-between mb-12 flex-wrap gap-4"
          >
            <div>
              <span className="badge badge-orange mb-3 inline-block">🍔 Today's Menu</span>
              <h2 className="text-hero" style={{ fontSize:'clamp(2.5rem,7vw,5rem)' }}>
                What's<br/><span style={{ color:'var(--orange)' }}>Cooking? 🔥</span>
              </h2>
            </div>
            <Link href="/student/menu">
              <button className="btn-dark">See Full Menu <ArrowRight className="w-4 h-4" /></button>
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAMPLE_FOODS.map((f,i) => <FoodCard key={f.id} item={f} delay={i*0.1} />)}
          </div>
        </div>
      </section>

      {/* QUEUE */}
      <QueueSection />

      {/* AI */}
      <AISection />

      {/* HOW IT WORKS */}
      <section className="py-24 border-y-[3px] border-[#1D1D1D]" style={{ background:'var(--yellow)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            className="text-hero mb-16 text-center"
            style={{ fontSize:'clamp(2.5rem,7vw,5rem)' }}
          >
            How it works ⚡
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step:'01', emoji:'📱', title:'Browse Menu', desc:'Pick your favorites from the real-time menu with live stock info' },
              { step:'02', emoji:'🕐', title:'Pick a Slot', desc:'Choose your preferred pickup time to avoid the lunch rush' },
              { step:'03', emoji:'🎟', title:'Get Token', desc:'Receive a digital token and QR code instantly on your phone' },
              { step:'04', emoji:'🍔', title:'Grab & Go', desc:'Walk straight to the counter when your token is called. Zero wait!' },
            ].map((s,i) => (
              <motion.div
                key={s.step}
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ delay:i*0.12 }}
                className="card p-6 bg-white"
              >
                <div className="text-5xl font-black opacity-10 mb-2" style={{ fontFamily:'Syne' }}>{s.step}</div>
                <div className="text-4xl mb-4">{s.emoji}</div>
                <h3 className="font-black mb-2" style={{ fontFamily:'Syne' }}>{s.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{ background:'var(--green)' }}>
        <div className="blob float" style={{ width:400, height:400, background:'rgba(255,107,0,0.15)', top:'-80px', right:'-80px' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <div className="text-6xl mb-6 float">🚀</div>
            <h2 className="text-hero text-white mb-6" style={{ fontSize:'clamp(3rem,8vw,6rem)' }}>
              Ready to skip<br/>
              <span style={{ color:'var(--yellow)' }}>the queue?</span>
            </h2>
            <p className="text-green-200 text-lg mb-10">Join 2,450+ students who've already made the switch.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login">
                <button className="btn-primary text-lg px-10 py-5" style={{ background:'var(--orange)', fontSize:18 }}>
                  🛒 Start Ordering Free
                </button>
              </Link>
              <Link href="/vendor">
                <button className="btn-outline text-white border-white/40 text-lg px-10 py-5 hover:bg-white hover:text-[#1D1D1D]">
                  Vendor Portal →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-[3px] border-[#1D1D1D] py-8" style={{ background:'var(--dark)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-white font-black" style={{ fontFamily:'Syne' }}>QuickBite</span>
            <span className="badge badge-yellow ml-2 text-[9px]">v2.0</span>
          </div>
          <div className="text-white/40 text-sm">AI-Powered Smart Canteen · Built for Campus Life</div>
          <div className="flex gap-4 text-sm text-white/40">
            <Link href="/student" className="hover:text-white transition-colors">Student</Link>
            <Link href="/vendor" className="hover:text-white transition-colors">Vendor</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

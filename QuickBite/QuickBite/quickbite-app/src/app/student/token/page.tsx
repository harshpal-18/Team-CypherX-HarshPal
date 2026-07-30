'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, Bell, Share2, MapPin, QrCode } from 'lucide-react';
import { toast } from 'sonner';

const STATUS_STEPS = [
  { key:'placed',     label:'Order Placed',    emoji:'✅', done:true  },
  { key:'preparing',  label:'Being Prepared',  emoji:'🍳', done:true  },
  { key:'ready',      label:'Ready to Collect',emoji:'🔔', done:false },
  { key:'collected',  label:'Collected',       emoji:'🎉', done:false },
];

/* Mini QR */
function MiniQR({ token }: { token: string }) {
  const size = 80;
  const grid = 7;
  const cell = size / grid;
  const seed = token.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
  const cells = Array.from({ length: grid * grid }, (_, i) => {
    // corners always filled for finder pattern look
    const r = Math.floor(i / grid), c = i % grid;
    if ((r < 2 && c < 2) || (r < 2 && c > grid-3) || (r > grid-3 && c < 2)) return true;
    return (seed * (i + 7) * 13 + i * 17) % 5 < 2;
  });
  return (
    <svg width={size} height={size} style={{ display:'block' }}>
      {cells.map((on, i) => on && (
        <rect
          key={i}
          x={(i % grid) * cell + 1}
          y={Math.floor(i / grid) * cell + 1}
          width={cell - 2}
          height={cell - 2}
          rx={1}
          fill="#1D1D1D"
        />
      ))}
    </svg>
  );
}

export default function TokenPage() {
  const token = 'A-124';
  const [step, setStep] = useState(1); // 0=placed, 1=preparing, 2=ready, 3=collected
  const [countdown, setCountdown] = useState(840); // 14 minutes

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
  const ss = String(countdown % 60).padStart(2, '0');

  const advance = () => {
    if (step < 3) {
      setStep(s => s + 1);
      if (step === 1) toast.success('🔔 Your order is ready! Head to Counter 2');
      if (step === 2) toast.success('🎉 Order collected! Enjoy your meal!');
    }
  };

  const statuses = STATUS_STEPS.map((s, i) => ({ ...s, done: i <= step }));

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-hero" style={{ fontSize:'clamp(2rem,5vw,3rem)' }}>Your Token 🎟</h1>
        <p className="text-[#888] mt-1">Show this at Counter 2 to collect your order</p>
      </div>

      {/* Main token card */}
      <motion.div
        className="token-card p-8 relative overflow-hidden"
        animate={{ boxShadow: step >= 2 ? '6px 6px 0 #0D5C3B' : '6px 6px 0 var(--orange)' }}
        transition={{ duration:0.5 }}
      >
        {/* Background blobs */}
        <div className="blob float" style={{ width:260, height:260, background:'rgba(255,200,61,0.08)', top:'-60px', right:'-60px' }} />
        <div className="blob float-2" style={{ width:180, height:180, background:'rgba(255,107,0,0.08)', bottom:'-40px', left:'-40px' }} />

        <div className="relative z-10">
          {/* Status badge */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="font-black text-sm px-4 py-1.5 rounded-full border-2 border-[#1D1D1D]"
              style={{ fontFamily:'Syne', background: step>=2?'var(--green)':'var(--orange)', color:'#fff' }}
            >
              {step === 0 ? '📋 Order Placed' : step === 1 ? '🍳 Being Prepared' : step === 2 ? '🔔 Ready to Collect!' : '✅ Collected'}
            </span>
            <span className="text-white/50 text-xs">Counter 2</span>
          </div>

          {/* Token number */}
          <motion.div
            key={step}
            initial={{ scale:0.8, opacity:0 }}
            animate={{ scale:1, opacity:1 }}
            className="text-center my-6"
          >
            <div className="text-white/30 text-sm font-bold uppercase tracking-widest mb-2" style={{ fontFamily:'Syne' }}>Token Number</div>
            <div className="token-number">{token}</div>
          </motion.div>

          {/* Countdown + QR */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="rounded-2xl p-4 text-center" style={{ background:'rgba(255,255,255,0.08)', border:'2px solid rgba(255,255,255,0.15)' }}>
              <div className="text-white/50 text-xs mb-1">Wait Time</div>
              <div className="font-black text-white text-2xl" style={{ fontFamily:'Syne', fontVariantNumeric:'tabular-nums' }}>
                {step >= 2 ? '🎉 Ready!' : `${mm}:${ss}`}
              </div>
            </div>
            <div className="rounded-2xl p-4 flex flex-col items-center gap-2" style={{ background:'rgba(255,255,255,0.95)' }}>
              <MiniQR token={token} />
              <div className="text-xs text-[#888] font-medium">Scan at counter</div>
            </div>
          </div>

          {/* Queue position */}
          <div className="mt-4 rounded-2xl p-3 text-center" style={{ background:'rgba(255,255,255,0.06)', border:'2px solid rgba(255,255,255,0.1)' }}>
            <div className="text-white/60 text-xs mb-2">Queue Progress</div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background:'var(--yellow)' }}
                animate={{ width:`${Math.min(((14*60 - countdown) / (14*60)) * 100, 100)}%` }}
                transition={{ duration:1 }}
              />
            </div>
            <div className="text-white/50 text-xs mt-1.5">
              {step < 2 ? '6 orders ahead of you' : step === 2 ? '🔔 Your turn!' : '✅ Done!'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status steps */}
      <div className="card p-5 bg-white">
        <h2 className="font-black mb-4" style={{ fontFamily:'Syne' }}>Order Status</h2>
        <div className="space-y-0">
          {statuses.map((s, i) => (
            <div key={s.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ scale: s.done ? [1,1.3,1] : 1, background: s.done ? 'var(--green)' : '#E5E5E5' }}
                  transition={{ duration:0.4 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-base border-2 border-[#1D1D1D]"
                >
                  {s.done ? '✓' : s.emoji}
                </motion.div>
                {i < statuses.length - 1 && (
                  <div className="w-0.5 h-8 mt-1" style={{ background: s.done ? 'var(--green)' : '#E5E5E5' }} />
                )}
              </div>
              <div className="pb-6 pt-1.5">
                <div className={`font-bold text-sm ${s.done ? 'text-[#1D1D1D]' : 'text-[#BBB]'}`} style={{ fontFamily:'Syne' }}>{s.label}</div>
                {s.done && i === step && (
                  <div className="text-xs text-[#888] mt-0.5">Just now · {i === 1 ? 'Estimated 14 min' : ''}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3">
        <button onClick={advance} className="btn-primary justify-center text-sm py-3 flex-col gap-1">
          <Bell className="w-5 h-5" />
          {step < 2 ? 'Advance (Demo)' : step === 2 ? 'Mark Collected' : 'Done ✓'}
        </button>
        <button onClick={() => toast.info('Notification set!')} className="btn-outline justify-center text-sm py-3 flex-col gap-1">
          <Bell className="w-5 h-5" /> Notify Me
        </button>
        <button onClick={() => toast.success('Token shared!')} className="btn-outline justify-center text-sm py-3 flex-col gap-1">
          <Share2 className="w-5 h-5" /> Share
        </button>
      </div>

      {/* Map hint */}
      <div className="card-yellow p-4 flex items-center gap-3">
        <MapPin className="w-6 h-6 flex-shrink-0" />
        <div>
          <div className="font-black text-sm" style={{ fontFamily:'Syne' }}>Counter 2 — Main Block, Ground Floor</div>
          <div className="text-xs mt-0.5 opacity-70">Near the main entrance · Open 8AM–6PM</div>
        </div>
      </div>
    </div>
  );
}

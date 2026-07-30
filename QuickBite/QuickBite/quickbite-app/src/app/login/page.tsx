'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { GraduationCap, ChefHat, ShieldCheck } from 'lucide-react';

const ROLES = [
  {
    key: 'student', label: 'Student', emoji: '🎓', icon: GraduationCap,
    color: '#FF6B00', bg: '#FFF5EB',
    email: 'harsh@college.edu', password: 'student123',
    redirect: '/student',
    desc: 'Order food, track tokens, view menu',
  },
  {
    key: 'vendor', label: 'Vendor', emoji: '👨‍🍳', icon: ChefHat,
    color: '#0D5C3B', bg: '#F0FFF4',
    email: 'vendor@canteen.com', password: 'vendor123',
    redirect: '/vendor',
    desc: 'Manage orders, menu, and inventory',
  },
  {
    key: 'admin', label: 'Admin', emoji: '🛡', icon: ShieldCheck,
    color: '#1D1D1D', bg: '#F5F5F5',
    email: 'admin@quickbite.com', password: 'admin123',
    redirect: '/admin',
    desc: 'System control, users, and analytics',
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const role = ROLES[selected];

  const fillDemo = () => { setEmail(role.email); setPassword(role.password); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Fill in all fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    toast.success(`Welcome! Logged in as ${role.label} 🎉`);
    router.push(role.redirect);
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--cream)' }}>
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{ background: role.bg, borderRight: '3px solid #1D1D1D' }}
      >
        {/* Floating shapes */}
        <div className="blob float" style={{ width:320, height:320, background: `${role.color}18`, top:'-60px', right:'-60px' }} />
        <div className="blob float-2" style={{ width:200, height:200, background: `${role.color}10`, bottom:'5%', left:'-40px' }} />
        <div className="absolute inset-0 dot-bg opacity-30" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <span className="text-2xl">🍽️</span>
          <span className="font-black text-xl" style={{ fontFamily:'Syne,sans-serif' }}>QuickBite</span>
        </Link>

        <div className="relative z-10">
          <div className="text-8xl mb-6 float">{role.emoji}</div>
          <h2 className="text-hero mb-4" style={{ fontSize:'clamp(2.5rem,5vw,4rem)', lineHeight:1 }}>
            Welcome back,<br />
            <span style={{ color: role.color }}>{role.label}!</span>
          </h2>
          <p className="text-[#555] text-lg">{role.desc}</p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          {['500+ Orders/day','14 min avg wait','4.8★ rating'].map(stat => (
            <div key={stat} className="card p-4 text-center bg-white">
              <div className="font-black text-sm" style={{ fontFamily:'Syne' }}>{stat.split(' ').slice(0,2).join(' ')}</div>
              <div className="text-xs text-[#888]">{stat.split(' ').slice(2).join(' ')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity:0, y:30, scale:0.97 }}
          animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.4, ease:[0.34,1.56,0.64,1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="text-2xl">🍽️</span>
            <span className="font-black text-xl" style={{ fontFamily:'Syne' }}>QuickBite</span>
          </div>

          <h1 className="text-hero mb-2" style={{ fontSize:'clamp(2rem,5vw,3rem)' }}>Sign In 👋</h1>
          <p className="text-[#888] mb-8">Choose your role to continue</p>

          {/* Role switcher */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-1 rounded-2xl border-2 border-[#1D1D1D]" style={{ background:'#F7F0E8' }}>
            {ROLES.map((r, i) => (
              <button
                key={r.key}
                onClick={() => { setSelected(i); setEmail(''); setPassword(''); }}
                className="py-2.5 rounded-xl text-sm font-bold transition-all"
                style={selected === i ? {
                  background: r.color, color:'#fff',
                  boxShadow:'2px 2px 0 #1D1D1D',
                  border:'2px solid #1D1D1D',
                  fontFamily:'Syne',
                } : {
                  color:'#888',
                  fontFamily:'Syne',
                }}
              >
                {r.emoji} {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1.5 text-[#333]">Email</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={role.email}
                className="input-bold"
                type="email"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1.5 text-[#333]">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-bold"
                type="password"
              />
            </div>

            {/* Demo fill */}
            <button
              type="button"
              onClick={fillDemo}
              className="w-full py-2.5 rounded-xl text-sm font-bold border-dashed border-2 border-[#1D1D1D] transition-all hover:bg-[#FFF0E0]"
              style={{ fontFamily:'Syne', color: role.color }}
            >
              ⚡ Fill demo credentials for {role.label}
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center text-base py-4"
              style={{ background: role.color }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : `Sign in as ${role.label} →`}
            </button>
          </form>

          <p className="text-center text-sm text-[#888] mt-6">
            This is a demo system.{' '}
            <Link href="/" className="font-bold underline" style={{ color: role.color }}>Back to home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

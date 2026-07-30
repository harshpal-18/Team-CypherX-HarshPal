'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MOCK_ORDERS } from '@/lib/data';
import { MessageSquare, CheckCircle2, Clock, AlertCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

const COMPLAINTS = [
  { id: 'C001', student: 'Priya Sharma', issue: 'Food quality was poor — burger was cold and stale', category: 'Quality', severity: 'high', status: 'open', time: '30 min ago', orderId: 'ORD-118' },
  { id: 'C002', student: 'Rahul Verma', issue: 'Wait time was 40 minutes even though I pre-ordered', category: 'Wait Time', severity: 'medium', status: 'reviewing', time: '1 hr ago', orderId: 'ORD-115' },
  { id: 'C003', student: 'Sneha Mishra', issue: 'Wrong order delivered — received noodles instead of pizza', category: 'Wrong Order', severity: 'high', status: 'open', time: '2 hr ago', orderId: 'ORD-112' },
  { id: 'C004', student: 'Amit Kumar', issue: 'Payment debited twice for same order', category: 'Payment', severity: 'high', status: 'resolved', time: '1 day ago', orderId: 'ORD-108' },
  { id: 'C005', student: 'Karan Lal', issue: 'Notification not received even after order was ready', category: 'Notification', severity: 'low', status: 'resolved', time: '2 days ago', orderId: 'ORD-100' },
];

const SEV_COLORS: Record<string, string> = { high: '#EF4444', medium: '#F59E0B', low: '#10B981' };
const STATUS_COLORS: Record<string, string> = { open: '#EF4444', reviewing: '#F59E0B', resolved: '#10B981' };

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState(COMPLAINTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'reviewing' | 'resolved'>('all');

  const filtered = complaints.filter(c =>
    (filter === 'all' || c.status === filter) &&
    (c.student.toLowerCase().includes(search.toLowerCase()) || c.issue.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: string) => {
    setComplaints(c => c.map(comp => comp.id === id ? { ...comp, status } : comp));
    toast.success(`Complaint ${id} marked as ${status}`);
  };

  const counts = {
    open: complaints.filter(c => c.status === 'open').length,
    reviewing: complaints.filter(c => c.status === 'reviewing').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-400" /> Complaints & Feedback
        </h1>
        <p className="text-white/40 text-sm">{complaints.length} total complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Open', value: counts.open, icon: AlertCircle, color: '#EF4444' },
          { label: 'Reviewing', value: counts.reviewing, icon: Clock, color: '#F59E0B' },
          { label: 'Resolved', value: counts.resolved, icon: CheckCircle2, color: '#10B981' },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
              <span style={{ color: stat.color }}><stat.icon className="w-5 h-5" /></span>
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs text-white/40">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search complaints..." className="glass rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none w-56" />
        </div>
        {(['all', 'open', 'reviewing', 'resolved'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2.5 rounded-xl text-sm capitalize font-medium transition-all ${filter === s ? 'btn-gradient text-white' : 'glass text-white/50 hover:text-white'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Complaints */}
      <div className="space-y-3">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-5"
            style={{ borderColor: c.status === 'open' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center text-sm font-bold text-green-400 flex-shrink-0">
                  {c.student[0]}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{c.student}</div>
                  <div className="text-xs text-white/40">{c.orderId} · {c.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${SEV_COLORS[c.severity]}15`, color: SEV_COLORS[c.severity] }}>
                  {c.severity}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${STATUS_COLORS[c.status]}15`, color: STATUS_COLORS[c.status] }}>
                  {c.status}
                </span>
              </div>
            </div>

            <div className="glass rounded-xl p-3 mb-3">
              <div className="text-xs text-white/40 mb-1">{c.category}</div>
              <div className="text-sm text-white/80">{c.issue}</div>
            </div>

            <div className="flex gap-2">
              {c.status !== 'reviewing' && c.status !== 'resolved' && (
                <button onClick={() => updateStatus(c.id, 'reviewing')} className="px-3 py-1.5 text-xs font-medium bg-yellow-500/10 text-yellow-400 rounded-xl hover:bg-yellow-500/20 transition-colors">
                  Mark Reviewing
                </button>
              )}
              {c.status !== 'resolved' && (
                <button onClick={() => updateStatus(c.id, 'resolved')} className="px-3 py-1.5 text-xs font-medium bg-green-500/10 text-green-400 rounded-xl hover:bg-green-500/20 transition-colors">
                  ✓ Mark Resolved
                </button>
              )}
              {c.status === 'resolved' && (
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

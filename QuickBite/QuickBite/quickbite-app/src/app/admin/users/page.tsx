'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, Search, UserCheck, UserX, GraduationCap, ChefHat, ShieldCheck, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

type UserRole = 'student' | 'vendor' | 'admin';
type UserStatus = 'active' | 'suspended';

interface AppUser {
  id: string; name: string; email: string; role: UserRole;
  status: UserStatus; joined: string; orders?: number; dept?: string;
}

const MOCK_USERS: AppUser[] = [
  { id: 'STU001', name: 'Harsh Pal', email: 'harsh@college.edu', role: 'student', status: 'active', joined: 'Jan 2025', orders: 24, dept: 'CS' },
  { id: 'STU002', name: 'Priya Sharma', email: 'priya@college.edu', role: 'student', status: 'active', joined: 'Jan 2025', orders: 18, dept: 'IT' },
  { id: 'STU003', name: 'Rahul Verma', email: 'rahul@college.edu', role: 'student', status: 'active', joined: 'Feb 2025', orders: 31, dept: 'ECE' },
  { id: 'STU004', name: 'Sneha Mishra', email: 'sneha@college.edu', role: 'student', status: 'suspended', joined: 'Mar 2025', orders: 5, dept: 'MBA' },
  { id: 'STU005', name: 'Ankit Rawat', email: 'ankit@college.edu', role: 'student', status: 'active', joined: 'Jan 2025', orders: 42, dept: 'CS' },
  { id: 'VEN001', name: 'Campus Canteen', email: 'vendor@canteen.com', role: 'vendor', status: 'active', joined: 'Dec 2024' },
  { id: 'VEN002', name: 'Fast Food Corner', email: 'fastfood@canteen.com', role: 'vendor', status: 'active', joined: 'Jan 2025' },
  { id: 'ADM001', name: 'Super Admin', email: 'admin@quickbite.com', role: 'admin', status: 'active', joined: 'Dec 2024' },
];

const ROLE_CONFIG: Record<UserRole, { icon: React.ComponentType<{className?:string}>; color: string; label: string }> = {
  student: { icon: GraduationCap, color: '#8B5CF6', label: 'Student' },
  vendor: { icon: ChefHat, color: '#F59E0B', label: 'Vendor' },
  admin: { icon: ShieldCheck, color: '#10B981', label: 'Admin' },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');

  const filtered = users.filter(u =>
    (roleFilter === 'all' || u.role === roleFilter) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleStatus = (id: string) => {
    setUsers(u => u.map(usr => usr.id === id ? { ...usr, status: usr.status === 'active' ? 'suspended' : 'active' } : usr));
    const user = users.find(u => u.id === id);
    toast.success(`${user?.name} ${user?.status === 'active' ? 'suspended' : 'activated'}`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-green-400" /> User Management
        </h1>
        <p className="text-white/40 text-sm">{users.length} total users registered</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {(['student', 'vendor', 'admin'] as UserRole[]).map(role => {
          const cfg = ROLE_CONFIG[role];
          const count = users.filter(u => u.role === role).length;
          return (
            <div key={role} className="glass rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${cfg.color}15` }}>
                <div style={{ color: cfg.color }}><cfg.icon className="w-5 h-5" /></div>
              </div>
              <div>
                <div className="text-xl font-black text-white">{count}</div>
                <div className="text-xs text-white/40">{cfg.label}s</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="w-full glass rounded-xl py-2.5 pl-10 pr-4 text-white text-sm outline-none" />
        </div>
        {(['all', 'student', 'vendor', 'admin'] as const).map(r => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${roleFilter === r ? 'btn-gradient text-white' : 'glass text-white/50 hover:text-white'}`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* User table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-6 p-4 border-b border-white/5 text-xs text-white/30 uppercase tracking-wider font-semibold">
          <div className="col-span-2">User</div>
          <div>Role</div>
          <div>Dept / Info</div>
          <div>Status</div>
          <div className="text-center">Actions</div>
        </div>
        {filtered.map((user, i) => {
          const cfg = ROLE_CONFIG[user.role];
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-6 p-4 border-b border-white/5 items-center hover:bg-white/2 transition-colors last:border-0"
            >
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: `${cfg.color}30` }}>
                  {user.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{user.name}</div>
                  <div className="text-xs text-white/40 truncate">{user.email}</div>
                </div>
              </div>
              <div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${cfg.color}15`, color: cfg.color }}>
                  {cfg.label}
                </span>
              </div>
              <div className="text-xs text-white/50">
                {user.dept ? `${user.dept} · ${user.orders} orders` : `Since ${user.joined}`}
              </div>
              <div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.status === 'active' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {user.status}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => toggleStatus(user.id)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    user.status === 'active'
                      ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                      : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                  }`}
                  title={user.status === 'active' ? 'Suspend' : 'Activate'}
                >
                  {user.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

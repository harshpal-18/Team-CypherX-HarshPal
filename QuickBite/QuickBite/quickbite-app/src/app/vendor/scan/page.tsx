'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { QrCode, CheckCircle2, X, Camera } from 'lucide-react';
import { toast } from 'sonner';

const MOCK_TOKENS: Record<string, { token: string; items: string; student: string; slot: string; status: string }> = {
  'A-118': { token: 'A-118', items: 'Burger ×2, Coffee ×1', student: 'Ankit R.', slot: '12:30 PM', status: 'ready' },
  'A-117': { token: 'A-117', items: 'Noodles ×1', student: 'Riya T.', slot: '12:30 PM', status: 'ready' },
  'A-121': { token: 'A-121', items: 'Pizza ×1, Fries ×1', student: 'Harsh P.', slot: '12:45 PM', status: 'preparing' },
};

export default function QRScanPage() {
  const [manualToken, setManualToken] = useState('');
  const [scanned, setScanned] = useState<typeof MOCK_TOKENS[string] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [scanning, setScanning] = useState(false);

  const lookup = (token: string) => {
    const t = token.toUpperCase().trim();
    const found = MOCK_TOKENS[t];
    if (found) {
      setScanned(found);
      setNotFound(false);
    } else {
      setScanned(null);
      setNotFound(true);
    }
  };

  const simulateScan = async () => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 1500));
    setScanning(false);
    const tokens = Object.keys(MOCK_TOKENS);
    const random = tokens[Math.floor(Math.random() * tokens.length)];
    lookup(random);
    toast.info(`QR scanned: ${random}`);
  };

  const markCollected = () => {
    toast.success(`✅ Order ${scanned?.token} marked as collected!`);
    setScanned(null);
    setManualToken('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <QrCode className="w-6 h-6 text-green-400" /> QR Scanner
        </h1>
        <p className="text-white/40 text-sm">Scan student QR code to verify and complete pickup</p>
      </div>

      {/* Scanner area */}
      <div className="glass rounded-3xl p-8 text-center">
        <div
          className="w-64 h-64 mx-auto rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center cursor-pointer"
          style={{ background: 'rgba(16,185,129,0.05)', border: '2px dashed rgba(16,185,129,0.4)' }}
          onClick={simulateScan}
        >
          {scanning ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent animate-bounce" style={{ height: '30%', top: '35%' }} />
              <motion.div
                animate={{ y: [-80, 80, -80] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute w-full h-0.5 bg-green-400 opacity-80"
                style={{ boxShadow: '0 0 10px rgba(16,185,129,0.8)' }}
              />
              <div className="text-green-400 text-sm font-medium z-10">Scanning...</div>
            </>
          ) : (
            <div className="text-center">
              <Camera className="w-12 h-12 text-green-400/50 mx-auto mb-3" />
              <p className="text-white/40 text-sm">Click to simulate QR scan</p>
              <p className="text-white/20 text-xs mt-1">(demo mode)</p>
            </div>
          )}

          {/* Corner marks */}
          {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map(pos => (
            <div key={pos} className={`absolute w-6 h-6 ${pos}`} style={{
              borderTop: pos.includes('top') ? '3px solid #10B981' : 'none',
              borderBottom: pos.includes('bottom') ? '3px solid #10B981' : 'none',
              borderLeft: pos.includes('left') ? '3px solid #10B981' : 'none',
              borderRight: pos.includes('right') ? '3px solid #10B981' : 'none',
            }} />
          ))}
        </div>

        <div className="text-sm text-white/30 mb-4">— or enter token manually —</div>
        <div className="flex gap-3 max-w-xs mx-auto">
          <input
            value={manualToken}
            onChange={e => setManualToken(e.target.value.toUpperCase())}
            placeholder="e.g. A-118"
            className="flex-1 glass rounded-xl px-4 py-3 text-white text-sm outline-none text-center tracking-widest font-bold placeholder-white/20"
            onKeyDown={e => e.key === 'Enter' && lookup(manualToken)}
          />
          <button
            onClick={() => lookup(manualToken)}
            className="btn-gradient px-5 py-3 rounded-xl text-white text-sm font-bold"
          >
            Verify
          </button>
        </div>
        <div className="mt-3 text-xs text-white/30">Try: A-118, A-117, A-121</div>
      </div>

      {/* Result */}
      {scanned && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-6 border border-green-500/30"
          style={{ boxShadow: '0 0 30px rgba(16,185,129,0.15)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="font-black text-2xl text-white">{scanned.token}</div>
              <div className="text-sm text-green-400">
                {scanned.status === 'ready' ? '✅ Ready for pickup' : `⚠️ Status: ${scanned.status}`}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="glass rounded-xl p-3">
              <div className="text-xs text-white/40">Student</div>
              <div className="font-semibold text-white">{scanned.student}</div>
            </div>
            <div className="glass rounded-xl p-3">
              <div className="text-xs text-white/40">Slot</div>
              <div className="font-semibold text-white">{scanned.slot}</div>
            </div>
          </div>

          <div className="glass rounded-xl p-3 mb-4">
            <div className="text-xs text-white/40 mb-1">Order Items</div>
            <div className="font-medium text-white">{scanned.items}</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={markCollected}
              disabled={scanned.status !== 'ready'}
              className="flex-1 btn-gradient py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark as Collected
            </button>
            <button onClick={() => { setScanned(null); setManualToken(''); }} className="glass px-4 py-3 rounded-xl text-white/40 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {notFound && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-2xl p-6 border border-red-500/30 text-center">
          <div className="text-4xl mb-2">❌</div>
          <div className="font-bold text-red-400">Token Not Found</div>
          <div className="text-white/40 text-sm mt-1">"{manualToken}" is not a valid order token</div>
        </motion.div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExpiryBadgeProps {
  initialExpiryDays?: number;
}

export const SmartExpiryBadge: React.FC<ExpiryBadgeProps> = ({ initialExpiryDays = 292 }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(initialExpiryDays);
  const [showRenewModal, setShowRenewModal] = useState<boolean>(false);
  const [isRenewing, setIsRenewing] = useState<boolean>(false);

  const handleRenew = () => {
    setIsRenewing(true);
    setTimeout(() => {
      setDaysRemaining((prev) => prev + 365);
      setIsRenewing(false);
      setShowRenewModal(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.2 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }, 1200);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Hosting Status Indicator Pill */}
        <div
          onClick={() => setShowRenewModal(true)}
          className="cursor-pointer group flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 hover:border-amber-400 transition-all shadow-sm shadow-amber-500/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>

          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Active Cloud Twin:</span>
            <span className="font-mono text-amber-400 font-bold">{daysRemaining} Days</span>
          </span>

          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            Renew
          </span>
        </div>
      </div>

      {/* Renewal Modal */}
      {showRenewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel border border-cyan-500/40 p-6 rounded-2xl shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="badge-gold text-xs">VastuTwin Cloud Infrastructure</span>
                <h3 className="text-xl font-bold text-white">Extend Hosting & CAD Sync</h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              Your digital twin guarantees 24/7 unmetered site access, live contractor BIM syncing, and high-resolution CAD document storage.
            </p>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 mb-5 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Current Expiry:</span>
                <span className="text-white font-bold">{daysRemaining} days remaining</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Extension Package:</span>
                <span className="text-cyan-400 font-bold">+365 Days (1 Full Year)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Cloudflare Fast Edge:</span>
                <span className="text-emerald-400 font-bold">Sub-domain SSL Included</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRenewModal(false)}
                className="btn-secondary flex-1 text-xs py-2.5 justify-center"
              >
                Close
              </button>
              <button
                onClick={handleRenew}
                disabled={isRenewing}
                className="btn-gold flex-1 text-xs py-2.5 justify-center"
              >
                {isRenewing ? (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Extending...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-bold">
                    Extend 1 Year Active
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

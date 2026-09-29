import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, User, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { MOCK_CLIENTS, ClientUser } from '../data/agencyData';

interface ClientLoginModalProps {
  currentClient: ClientUser;
  onClientSwitch: (client: ClientUser) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ClientLoginModal: React.FC<ClientLoginModalProps> = ({
  currentClient,
  onClientSwitch,
  isOpen,
  onClose
}) => {
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const matched = MOCK_CLIENTS.find(
      (c) => c.passcode.toLowerCase() === passcode.trim().toLowerCase()
    );

    if (matched) {
      setSuccessMsg(`Welcome, ${matched.clientName}! Unlocking Portal...`);
      setTimeout(() => {
        onClientSwitch(matched);
        setSuccessMsg('');
        setPasscode('');
        onClose();
      }, 700);
    } else {
      setErrorMsg('Invalid Access Key. Please check your credentials or contact Dnyaneshwar Associates.');
    }
  };

  const handleQuickSwitch = (client: ClientUser) => {
    onClientSwitch(client);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-panel border border-amber-500/40 p-6 md:p-8 rounded-3xl shadow-2xl relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/30">
            <Lock className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="badge-gold text-xs">VIP Client Security Access</span>
            <h3 className="text-xl font-bold text-white">Client Portal Login</h3>
            <p className="text-xs text-slate-400">1-Year Dedicated Cloud Encryption</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/40 rounded-xl text-red-300 text-xs">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Enter Client Passcode / Project Key
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="e.g. patil2026 or kulkarni2026"
                className="w-full text-sm pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <button type="submit" className="btn-gold w-full py-3 justify-center text-sm font-bold">
            <ShieldCheck className="w-4 h-4" /> Verify & Access Portal
          </button>
        </form>

        {/* Demo Fast Access Buttons for User testing */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Quick Demo Client Profiles:
          </div>
          <div className="space-y-2">
            {MOCK_CLIENTS.map((c) => (
              <button
                key={c.id}
                onClick={() => handleQuickSwitch(c)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs ${
                  currentClient.id === c.id
                    ? 'border-amber-400 bg-amber-500/10 text-white'
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-white">{c.clientName}</div>
                  <div className="text-[10px] text-slate-400">{c.projectName}</div>
                </div>
                <span className="font-mono text-[10px] text-amber-400 bg-slate-800 px-2 py-0.5 rounded">
                  Key: {c.passcode}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-xs text-center w-full text-slate-400 hover:text-slate-200"
        >
          Cancel & Close
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Lock, ShieldCheck, KeyRound, AlertCircle, X } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Secure local verification key for Er. Dnyaneshwar
    if (adminPin.trim() === 'dnyan@2026' || adminPin.trim() === 'admin777') {
      onSuccess();
      setAdminPin('');
      onClose();
    } else {
      setErrorMsg('अवैध ॲडमिन पासवर्ड! कृपया योग्य क्रेडेंशियल प्रविष्ट करा.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-sm w-full glass-panel border border-orange-500/40 p-6 rounded-3xl shadow-2xl relative bg-slate-900/90">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-500/40 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">इंजिनिअर ॲडमिन क्रेडेंशियल</h3>
          <p className="text-xs text-slate-400">
            CRM, लीड्स व क्लायंट रेकॉर्ड्स व्यवस्थापित करण्यासाठी ॲडमिन पासवर्ड टाका.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Admin Access Key
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="पासवर्ड प्रविष्ट करा..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-orange-400 pl-9 font-mono"
              />
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <button type="submit" className="btn-gold text-xs py-2.5 w-full justify-center">
            <ShieldCheck className="w-4 h-4" /> ॲडमिन पॅनल उघडा (Authenticate)
          </button>
        </form>
      </div>
    </div>
  );
};

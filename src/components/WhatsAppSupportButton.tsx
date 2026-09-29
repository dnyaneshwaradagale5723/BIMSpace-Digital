import React from 'react';
import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/agencyData';

interface WhatsAppSupportButtonProps {
  clientName?: string;
  projectName?: string;
}

export const WhatsAppSupportButton: React.FC<WhatsAppSupportButtonProps> = ({
  clientName = "Patil Residence",
  projectName = "Baner Hills Project"
}) => {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Er./Ar. Dnyaneshwar Adagale,\n\nI am contacting you from my Dnyaneshwar Associates Digital Portal.\n\n*Client:* ${clientName}\n*Project:* ${projectName}\n*Site Query / Requirement:* `
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip badge */}
      <div className="hidden md:flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-full text-xs text-emerald-300 shadow-xl shadow-emerald-500/10 animate-bounce">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>Direct Engineer WhatsApp Desk</span>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={openWhatsApp}
        className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-green-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-emerald-200/40 group"
        title="Chat on WhatsApp with Lead Architect"
      >
        <MessageCircle className="w-7 h-7 stroke-[2.3] text-slate-950 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

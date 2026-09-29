import React, { useState } from 'react';
import {
  QrCode,
  Lock,
  Download,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Copy,
  Printer,
  Smartphone,
  Eye,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface SecretsModalProps {
  currentUrl: string;
  projectName: string;
}

export const GrowthSecretsModule: React.FC<SecretsModalProps> = ({
  currentUrl,
  projectName
}) => {
  const [activeTab, setActiveTab] = useState<'qr_banner' | 'privacy' | 'offline_pdf' | 'revision_policy' | 'watermark'>('qr_banner');
  const [copiedBanner, setCopiedBanner] = useState<boolean>(false);
  const [offlinePackDownloaded, setOfflinePackDownloaded] = useState<boolean>(false);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopiedBanner(true);
      setTimeout(() => setCopiedBanner(false), 2000);
    }
  };

  const handleDownloadOfflinePack = () => {
    setOfflinePackDownloaded(true);
    setTimeout(() => {
      setOfflinePackDownloaded(false);
      alert('Offline Project Cache & Complete Vector CAD/PDF Pack Downloaded (Ready for No-Network Sites).');
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="badge-cyan text-xs mb-2">5 Hidden Growth & Security Secrets</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Site QR Board, Privacy PIN, Offline Mode & Watermark Security
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Turn every construction plot into a client-acquisition magnet while protecting architectural copyrights and ensuring site access even with zero 4G network.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs font-mono text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Agency Success Framework</span>
          </div>
        </div>

        {/* 5 Secrets Tab Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pb-4 mb-6 border-b border-slate-800">
          {[
            { id: 'qr_banner', title: '1. Site QR Banner', icon: QrCode, badge: '5x Leads' },
            { id: 'privacy', title: '2. PIN Privacy Lock', icon: Lock, badge: 'Encrypted' },
            { id: 'offline_pdf', title: '3. Offline Site Pack', icon: Download, badge: 'No-Network' },
            { id: 'revision_policy', title: '4. Revision Terms', icon: AlertCircle, badge: '₹1,500 Rule' },
            { id: 'watermark', title: '5. Anti-Theft Mark', icon: FileCheck, badge: 'Copyright' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">{tab.title}</div>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Site QR Code Board (Plot Lead Magnet) */}
        {activeTab === 'qr_banner' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="badge-gold text-xs">Secret #1: On-Site 6x4 Flex Board Magnet</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                "Future 3D View of This Site — Scan to View"
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Don't just WhatsApp the link. Put a high-visibility 6x4 site banner outside the construction plot. Passersby scanning the QR code immediately explore the 3D model, building specifications, and tap <strong>WhatsApp</strong> to hire you for their plots!
              </p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Banner Size:</span>
                  <span className="text-white font-bold">6ft x 4ft Weatherproof Flex with Eyelets</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>QR Destination:</span>
                  <span className="text-cyan-400 truncate max-w-[280px]">{currentUrl}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Expected Conversion:</span>
                  <span className="text-emerald-400 font-bold">3 to 5 New Plot Inquiries Per Site</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => alert('Printing 6x4 Printable Vector Flex Banner PDF with Lead Capture QR Code...')}
                  className="btn-gold text-xs py-2.5 px-4"
                >
                  <Printer className="w-4 h-4" /> Download 6x4 Flex Print File
                </button>
                <button
                  onClick={handleCopyLink}
                  className="btn-secondary text-xs py-2.5 px-4"
                >
                  <Copy className="w-4 h-4 text-cyan-400" />
                  {copiedBanner ? 'Link Copied!' : 'Copy Portal URL for QR'}
                </button>
              </div>
            </div>

            {/* Mock 6x4 Site Board Preview */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border-2 border-dashed border-amber-500/60 shadow-xl text-center space-y-4">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-extrabold">
                [ SITE ON-PLOT BOARD MOCKUP 6ft x 4ft ]
              </div>
              <h4 className="text-lg font-extrabold text-white">
                Upcoming Luxury Residence
              </h4>
              <p className="text-xs text-slate-300">
                Architectural & Structural Engineering by ShreeGonda Civil Consultancy
              </p>

              {/* Dynamic QR Box */}
              <div className="w-44 h-44 mx-auto p-3 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center space-y-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(currentUrl)}`}
                  alt="Site QR Code"
                  className="w-36 h-36 object-contain"
                />
              </div>

              <div className="text-xs font-mono font-bold text-cyan-400 animate-pulse">
                📷 Scan with Phone Camera to View 3D Model & Floor Plans
              </div>
              <div className="text-[11px] text-slate-400">
                Direct Contact: +91 98765 43210 • shreegondacivil.in
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Privacy PIN & Budget Masking */}
        {activeTab === 'privacy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="badge-gold text-xs">Secret #2: High-Value Client Privacy Protection</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Client Passcode Lock (Mobile Last 4 Digits)
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When a client invests ₹50 Lakhs to ₹1.5 Crore in building their dream home, they do not want their personal floor layout or financial budget open to strangers on the internet.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Public Viewers see the 3D Exterior, Facade & Elevation (Attracting New Clients).</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Internal 2D Blueprints, BOQ Costs, and Municipal Sanction PDFs require 4-digit PIN.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Default PIN: Client's Last 4 Mobile Digits (e.g. <code>2026</code>) for effortless site entry.</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SECURITY ENCRYPTION LEVEL</span>
                <span className="text-emerald-400 font-bold">SHA-256 Client Isolation</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Patil Residence Vault</div>
                  <div className="text-[11px] text-slate-400">Internal Layouts & BOQ Locked</div>
                </div>
                <span className="badge-cyan text-xs font-mono">PIN: patil2026</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Kulkarni Eco-Twin Vault</div>
                  <div className="text-[11px] text-slate-400">Structural Schedules Locked</div>
                </div>
                <span className="badge-cyan text-xs font-mono">PIN: kulkarni2026</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Site Offline Mode & 1-Click PDF Bundle */}
        {activeTab === 'offline_pdf' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="badge-cyan text-xs">Secret #3: Zero-Network Site Resilience</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                1-Click Approved CAD/PDF Offline Bundle
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Construction basements and developing suburban plots often have dead 4G/5G mobile signals. Masons, carpenters, and electricians cannot wait for heavy files to load.
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Cached ServiceWorker saves floor plans for offline viewing on mobile.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Single-button download produces an all-in-one high-resolution offline PDF drawing set.</span>
                </div>
              </div>

              <button
                onClick={handleDownloadOfflinePack}
                disabled={offlinePackDownloaded}
                className="btn-primary text-xs py-3 px-5 mt-2"
              >
                <Download className="w-4 h-4" />
                {offlinePackDownloaded ? 'Downloading Complete Site Pack...' : 'Download 1-Click Offline Site Pack (ZIP)'}
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="text-slate-400 font-bold mb-2">OFFLINE SITE PACK CONTENTS:</div>
              <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 flex justify-between">
                <span>01_Centerline_Foundation_Plan.pdf</span>
                <span className="text-cyan-400">2.4 MB</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 flex justify-between">
                <span>02_Ground_First_Floor_Working.pdf</span>
                <span className="text-cyan-400">4.1 MB</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 flex justify-between">
                <span>03_Column_Beam_Reinforcement.pdf</span>
                <span className="text-cyan-400">3.8 MB</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 flex justify-between">
                <span>04_Electrical_Plumbing_Conduits.pdf</span>
                <span className="text-cyan-400">1.9 MB</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Revision Policy & Terms */}
        {activeTab === 'revision_policy' && (
          <div className="space-y-6">
            <div>
              <span className="badge-gold text-xs mb-1">Secret #4: Protect Your Time & Professional Boundaries</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Clear Revision Policy (२ मोफत रिव्हिजन्स, त्यानंतर अतिरिक्त शुल्क)
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl">
                Without a written policy, clients request 10 revisions over 8 months for free. By stating the policy upfront on the portal and quotation, your time is valued and operations stay disciplined.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="font-mono text-cyan-400 text-sm font-bold block mb-1">RULE 01</span>
                <h4 className="text-white font-bold text-sm mb-1">2 Major Revisions Free</h4>
                <p className="text-xs text-slate-400">
                  Concept planning and spatial adjustments are revised twice during initial 2D drafting at zero extra charge.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/40">
                <span className="font-mono text-amber-400 text-sm font-bold block mb-1">RULE 02</span>
                <h4 className="text-white font-bold text-sm mb-1">₹1,500 Extra Per Revision</h4>
                <p className="text-xs text-slate-400">
                  Any subsequent alteration requested after structural/working drawing finalization incurs ₹1,500 drafting fees.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                <span className="font-mono text-emerald-400 text-sm font-bold block mb-1">RULE 03</span>
                <h4 className="text-white font-bold text-sm mb-1">Structural Re-calculation</h4>
                <p className="text-xs text-slate-400">
                  If column positions are moved after casting plinth, structural redesign is charged per sq.ft as per council rules.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Watermarking & Anti-Theft Security */}
        {activeTab === 'watermark' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="badge-cyan text-xs">Secret #5: Intellectual Property Protection</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Watermarking & Drawing Theft Protection
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Contractors or competitors often screenshot unwatermarked drawings to build without hiring the engineer. All our 2D blueprints incorporate an immutable translucent copyright watermark across the diagonal grid.
              </p>
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
                <div>✓ Watermark Text: <strong>"Approved Design by ShreeGonda Civil Consultancy"</strong></div>
                <div>✓ License Stamp: <strong>COA/2023/CA-88491 • NBC IS 456 Code</strong></div>
                <div>✓ Prevents unauthorized site execution or duplicate tracing.</div>
              </div>
            </div>

            {/* Watermarked Blueprint Card Mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/50 p-6 bg-slate-950 blueprint-grid text-center shadow-xl">
              {/* Translucent diagonal watermark overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-3xl font-extrabold text-cyan-400/15 transform -rotate-25 tracking-widest font-mono uppercase">
                  Approved Design by ShreeGonda Civil Consultancy
                </span>
              </div>

              <div className="relative z-10 space-y-3 py-6">
                <FileCheck className="w-12 h-12 text-cyan-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Watermarked Vector CAD Drawing</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Protected with digital copyright signature and engineer approval seal before print release.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

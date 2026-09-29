import { useState } from 'react';
import {
  Building2,
  Share2,
  Download,
  Phone,
  Mail,
  MapPin,
  Lock,
  Compass,
  CheckCircle2,
  Calendar,
  Send,
  MessageCircle,
  Sparkles,
  ClipboardCheck,
  Eye,
  Globe,
  HardHat
} from 'lucide-react';
import { ThreeModelViewer } from './components/ThreeModelViewer';
import { FloorPlanViewer } from './components/FloorPlanViewer';
import { MaterialBoqAccordion } from './components/MaterialBoqAccordion';
import { ProgressTimeline } from './components/ProgressTimeline';
import { MediaWalkthroughGallery } from './components/MediaWalkthroughGallery';
import { DocumentHub } from './components/DocumentHub';
import { SmartExpiryBadge } from './components/SmartExpiryBadge';
import { ClientLoginModal } from './components/ClientLoginModal';
import { WhatsAppSupportButton } from './components/WhatsAppSupportButton';
import { SAMPLE_PROJECT } from './data/projectData';
import { AGENCY_INFO, MOCK_CLIENTS, STEPS_WORKFLOW, ClientUser } from './data/agencyData';

export default function App() {
  const [project] = useState(SAMPLE_PROJECT);
  const [activeClient, setActiveClient] = useState<ClientUser>(MOCK_CLIENTS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<'3d' | 'plans' | 'boq' | 'timeline' | 'gallery' | 'docs' | 'workflow'>('3d');
  const [contactMessageSent, setContactMessageSent] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    } else {
      alert(`Client Link: ${window.location.href}`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setContactMessageSent(true);
    setTimeout(() => setContactMessageSent(false), 4000);
  };

  const openWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Hello Ar. Dnyaneshwar Adagale,\n\nI am viewing my personal Digital Home Package portal for project: *${activeClient.projectName}*.\n\n*Client:* ${activeClient.clientName}\n*Query:* `
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Top VIP Announcement Ribbon */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-500/30 py-1.5 px-4 text-center text-xs">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-[11px] mx-auto md:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold uppercase tracking-wider">Exclusive Server Access:</span>
            <span className="text-slate-200">Valid for 1 Full Year ({activeClient.validDaysRemaining} Days Active)</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs">
            <span className="text-slate-400 font-mono">Current VIP Client:</span>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-amber-500/30"
            >
              <Lock className="w-3 h-3" />
              <span>{activeClient.clientName}</span>
              <span className="text-[10px] text-cyan-400 font-mono underline">(Switch)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Header & Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="container py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 border border-amber-300/40">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-white bg-clip-text text-transparent">
                  {AGENCY_INFO.name}
                </span>
                <span className="text-[10px] font-mono text-amber-400 border border-amber-500/40 px-1.5 py-0.5 rounded bg-amber-950/40 hidden sm:inline">
                  VIP Portal
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium italic">
                {AGENCY_INFO.tagline}
              </div>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2.5">
            {/* 1-Year Expiry Badge */}
            <SmartExpiryBadge initialExpiryDays={activeClient.validDaysRemaining} />

            {/* Client Login / Switch Modal Trigger */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border-amber-500/30 hover:border-amber-400"
              title="Secure Client Passcode Login"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Client</span> Login
            </button>

            {/* Share Portal Link Button */}
            <button
              onClick={handleShare}
              className="btn-secondary text-xs py-2 px-3 hidden lg:inline-flex"
              title="Share Digital Twin Portal Link"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{shareSuccess ? 'Copied!' : 'Share'}</span>
            </button>

            {/* Download Approved PDFs Quick Trigger */}
            <button
              onClick={() => {
                const el = document.getElementById('documents-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-xs py-2 px-3 md:px-4"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sanction</span> CAD
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-[67px] z-30 overflow-x-auto">
        <div className="container flex items-center gap-1.5 py-2">
          {[
            { id: '3d', label: '3D Walkthrough Model', hash: '#model-hero' },
            { id: 'plans', label: '2D Floor Plans', hash: '#floorplans-section' },
            { id: 'boq', label: 'Project Estimation & BOQ', hash: '#boq-section' },
            { id: 'timeline', label: 'Site Execution Milestones', hash: '#timeline-section' },
            { id: 'gallery', label: '4K Renders & Drone', hash: '#gallery-section' },
            { id: 'docs', label: 'Sanction Document Vault', hash: '#documents-section' },
            { id: 'workflow', label: '5-Step Work Process', hash: '#process-section' }
          ].map((item) => (
            <a
              key={item.id}
              href={item.hash}
              onClick={() => setActiveSection(item.id as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeSection === item.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 space-y-16 md:space-y-24 py-8 md:py-12">
        {/* 2. Hero Section: Split Layout (Project Summary + 3D Model Canvas) */}
        <section id="model-hero" className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Project Summary & Structural Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="badge-gold text-xs">Dnyaneshwar Associates VIP Portal</span>
                  <span className="badge-cyan text-xs">Vastu Compliant 4BHK</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  {activeClient.projectName}
                </h1>
                <p className="text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
                  Personalized 1-Year Digital Home Package for <strong className="text-amber-300">{activeClient.clientName}</strong>. 
                  Designed by {AGENCY_INFO.founder} with NBC structural compliance and high-end luxury interiors.
                </p>
              </div>

              {/* Quick Structural & Budget Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Total Built-Up Area</div>
                  <div className="text-xl md:text-2xl font-bold text-white font-mono mt-0.5">
                    {activeClient.totalArea}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">G + 1 + Terrace Solar Deck</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Turnkey Project Estimate</div>
                  <div className="text-xl md:text-2xl font-bold text-amber-400 font-mono mt-0.5">
                    {activeClient.budgetEst}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Material, Labor & Finishes</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Site Location</div>
                  <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{activeClient.location}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">Pune Municipal Corporation</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Portal Validity</div>
                  <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Until {activeClient.validUntil}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-mono">1-Year Dedicated Cloud</div>
                </div>
              </div>

              {/* Direct WhatsApp Site Interaction CTA */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-400 uppercase tracking-wider font-mono">Direct WhatsApp Support</div>
                    <div className="text-xs text-slate-300">साइटवर बदल किंवा शंका असल्यास थेट चॅट करा</div>
                  </div>
                </div>
                <button
                  onClick={openWhatsAppDirect}
                  className="btn-primary bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs py-2 px-3 font-bold"
                >
                  Chat Now
                </button>
              </div>
            </div>

            {/* Right Column: WebGL Interactive 3D Model */}
            <div className="lg:col-span-7">
              <ThreeModelViewer />
            </div>
          </div>
        </section>

        {/* 3. Interactive 2D Floor Plan Tab View */}
        <section id="floorplans-section" className="container">
          <FloorPlanViewer />
        </section>

        {/* 4. 3D Elevation & 4K Walkthrough Section */}
        <section id="gallery-section" className="container">
          <MediaWalkthroughGallery />
        </section>

        {/* 5. Material Specifications & BOQ Accordion */}
        <section id="boq-section" className="container">
          <MaterialBoqAccordion />
        </section>

        {/* 6. Live Site Progress Tracker */}
        <section id="timeline-section" className="container">
          <ProgressTimeline />
        </section>

        {/* 7. Municipal Sanction & Document Hub */}
        <section id="documents-section" className="container">
          <DocumentHub />
        </section>

        {/* 8. 5-Step Work Process (काम करण्याची प्रक्रिया) */}
        <section id="process-section" className="container">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/60 to-slate-950/80">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="badge-gold text-xs mb-2">Step-by-Step Delivery Blueprint</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                काम करण्याची पारदर्शक प्रक्रिया (Work Process)
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                क्लायंटच्या गरजेनुसार सुरुवातीपासून प्रत्यक्ष चावी हातात पडेपर्यंतची ५ पायऱ्यांची खात्रीशीर पद्धत.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {STEPS_WORKFLOW.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-amber-400 font-extrabold text-2xl group-hover:scale-110 transition-transform">
                        {step.step}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors" />
                    </div>
                    <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wide font-mono mb-1">
                      {step.marathi}
                    </div>
                    <h3 className="font-bold text-white text-sm mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Quality Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 9. Footer & Architect Contact Action Card */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-16 pt-12 pb-8">
        <div className="container space-y-12">
          {/* Architect Contact Card */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="badge-gold text-xs">Architect & Civil Consultant Contact</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  {AGENCY_INFO.name}
                </h3>
                <p className="text-sm text-slate-300">
                  Lead Consultant: <strong className="text-amber-300">{AGENCY_INFO.founder}</strong> • {AGENCY_INFO.qualifications}.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
                  <a
                    href={`tel:${AGENCY_INFO.phone}`}
                    className="flex items-center gap-1.5 text-slate-200 hover:text-amber-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" /> {AGENCY_INFO.phone}
                  </a>
                  <a
                    href={`mailto:${AGENCY_INFO.email}`}
                    className="flex items-center gap-1.5 text-slate-200 hover:text-amber-300 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" /> {AGENCY_INFO.email}
                  </a>
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" /> {AGENCY_INFO.officeAddress}
                  </span>
                </div>
              </div>

              {/* Quick Inquiry Form */}
              <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">Request On-Site Technical Clarification</h4>
                {contactMessageSent ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Query dispatched directly to Er. Dnyaneshwar's desk.
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name (Contractor / Vendor / Site In-charge)"
                      className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Query Subject (e.g. Beam Section / Tile Lot Verification)"
                      className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button type="submit" className="btn-gold text-xs py-2.5 w-full justify-center">
                      <Send className="w-3.5 h-3.5" /> Send Direct Site Note
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Copyright & Engine Attribution */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-500">
            <div>
              © 2026 <strong>{AGENCY_INFO.name}</strong>. All Architectural Rights Reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Personalized Digital Home Package • Valid for 1 Year Exclusive Access</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Client Login Modal */}
      <ClientLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentClient={activeClient}
        onClientSwitch={(client) => setActiveClient(client)}
      />

      {/* Floating Direct WhatsApp Support Desk */}
      <WhatsAppSupportButton
        clientName={activeClient.clientName}
        projectName={activeClient.projectName}
      />
    </div>
  );
}

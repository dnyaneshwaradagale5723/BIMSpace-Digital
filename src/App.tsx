import { useState } from 'react';
import {
  Building2,
  Share2,
  Download,
  Phone,
  Mail,
  MapPin,
  Lock,
  Calendar,
  Send,
  MessageCircle,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
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
import { ServicesAndPackagesView } from './components/ServicesAndPackagesView';
import { ComprehensiveLeadForm } from './components/ComprehensiveLeadForm';
import { AdminDashboardView } from './components/AdminDashboardView';
import { MOCK_CLIENTS, ClientUser } from './data/agencyData';

export default function App() {
  const [activeClient, setActiveClient] = useState<ClientUser>(MOCK_CLIENTS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* 1. Top Enterprise Notice Ribbon */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/30 py-1.5 px-4 text-xs">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] mx-auto sm:mx-0">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold uppercase tracking-wider">BuildVision Studio:</span>
            <span className="text-slate-200">From Plan to Reality • 2D / 3D Civil Engineering + Digital Cloud Websites</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`font-mono text-xs px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                isAdminView
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-amber-400 border border-amber-500/40 hover:bg-amber-500/10'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{isAdminView ? 'Switch to Client View' : 'Admin Portal & CRM'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header & Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="container py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-600 to-blue-700 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-300/40">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">
                  BuildVision Studio
                </span>
                <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/40 px-1.5 py-0.5 rounded bg-cyan-950/40 hidden sm:inline">
                  Enterprise Suite
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium italic">
                From Plan to Reality.
              </div>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2.5">
            {/* 1-Year Expiry Badge */}
            <SmartExpiryBadge initialExpiryDays={activeClient.validDaysRemaining} />

            {/* Client Login Trigger */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border-slate-700 hover:border-cyan-400"
              title="Secure Client Passcode Login"
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
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

            {/* Get Quote / Consultation Trigger */}
            <a
              href="#lead-form-section"
              className="btn-primary text-xs py-2 px-3 md:px-4"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Request</span> Quote
            </a>
          </div>
        </div>
      </header>

      {/* Sub-Navigation Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-[67px] z-30 overflow-x-auto">
        <div className="container flex items-center gap-1.5 py-2">
          {[
            { label: '3D WebGL Model', hash: '#model-hero' },
            { label: '33 Core Services', hash: '#services-section' },
            { label: '2D Floor Plans', hash: '#floorplans-section' },
            { label: 'Turnkey Packages', hash: '#packages-section' },
            { label: 'Project BOQ & Materials', hash: '#boq-section' },
            { label: 'Site Execution Milestones', hash: '#timeline-section' },
            { label: '20-Step Work Process', hash: '#process-timeline' },
            { label: 'CAD & Sanction Vault', hash: '#documents-section' },
            { label: 'Detailed Quote Form', hash: '#lead-form-section' }
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.hash}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-all"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content Body */}
      <main className="flex-1 space-y-16 md:space-y-24 py-8 md:py-12">
        {/* Toggleable Admin CRM Back-office View */}
        {isAdminView ? (
          <section className="container">
            <div className="p-4 mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
              <span className="text-xs text-amber-300 font-mono">
                🔒 You are viewing the BuildVision Studio Admin Management CRM. (Non-AI + AI workflows enabled).
              </span>
              <button
                onClick={() => setIsAdminView(false)}
                className="btn-gold text-xs py-1 px-3"
              >
                Back to Public & Client Portal
              </button>
            </div>
            <AdminDashboardView />
          </section>
        ) : null}

        {/* 1. Hero Section: Split Layout (Project Summary + 3D Model Canvas) */}
        <section id="model-hero" className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Project Summary & Structural Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="badge-cyan text-xs">BuildVision Studio Master Platform</span>
                  <span className="badge-gold text-xs">Vastu & NBC Compliant</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Design Your Dream Home in 2D, 3D & Digital.
                </h1>
                <p className="text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
                  Turnkey architectural planning, structural analysis, photorealistic 3D visualization, and personal project presentation websites for modern clients.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a href="#lead-form-section" className="btn-primary text-xs py-2.5 px-4">
                  Get Free Consultation
                </a>
                <a href="#services-section" className="btn-secondary text-xs py-2.5 px-4">
                  View 33 Services
                </a>
                <a href="#packages-section" className="btn-gold text-xs py-2.5 px-4">
                  Special House Package
                </a>
              </div>

              {/* Quick Structural & Budget Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Featured Active Twin</div>
                  <div className="text-base md:text-lg font-bold text-white font-sans mt-0.5 truncate">
                    {activeClient.projectName}
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono mt-1">{activeClient.totalArea}</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Turnkey Civil Budget</div>
                  <div className="text-xl md:text-2xl font-bold text-amber-400 font-mono mt-0.5">
                    {activeClient.budgetEst}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Material, Labor & Finishes</div>
                </div>
              </div>
            </div>

            {/* Right Column: WebGL Interactive 3D Model */}
            <div className="lg:col-span-7">
              <ThreeModelViewer />
            </div>
          </div>
        </section>

        {/* 2. 33 Core Services & Packages View */}
        <section id="services-section" className="container">
          <div id="packages-section" className="scroll-mt-24">
            <ServicesAndPackagesView />
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

        {/* 8. Detailed Comprehensive Lead Inquiry Form */}
        <section className="container">
          <ComprehensiveLeadForm />
        </section>
      </main>

      {/* 9. Footer & Architect Contact Card */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-16 pt-12 pb-8">
        <div className="container space-y-12">
          {/* Action Card */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="badge-cyan text-xs">BuildVision Studio Head Office</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  BuildVision Studio & Associates
                </h3>
                <p className="text-sm text-slate-300">
                  Lead Engineering Consultant: <strong className="text-cyan-300">Ar. Dnyaneshwar Adagale</strong> • Licensed Architect (COA/2023/CA-88491) & Civil Engineer.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
                  <a href="tel:+919876543210" className="flex items-center gap-1.5 text-slate-200 hover:text-cyan-300">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> +91 98765 43210
                  </a>
                  <a href="mailto:contact@buildvisionstudio.com" className="flex items-center gap-1.5 text-slate-200 hover:text-cyan-300">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> contact@buildvisionstudio.com
                  </a>
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Baner Road, Pune, Maharashtra 411045
                  </span>
                </div>
              </div>

              {/* Inquiry dispatch form */}
              <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">Request Immediate Site Assessment</h4>
                {contactMessageSent ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Query transmitted directly to lead engineer's desk.
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name (Client / Contractor)"
                      className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Project Location / Plot Size"
                      className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <button type="submit" className="btn-primary text-xs py-2.5 w-full justify-center">
                      <Send className="w-3.5 h-3.5" /> Transmit Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Copyright & Engine Attribution */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-500">
            <div>
              © 2026 <strong>BuildVision Studio</strong>. All Architectural & Engineering Rights Reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Turnkey 2D/3D Architecture + 1-Year Dedicated Client Website Hosting</span>
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

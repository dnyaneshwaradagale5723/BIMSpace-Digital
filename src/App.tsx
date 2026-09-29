import React, { useState } from 'react';
import {
  Building2,
  Share2,
  Download,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  Send,
  CheckCircle2,
  Calendar,
  Compass,
  FileCheck
} from 'lucide-react';
import { ThreeModelViewer } from './components/ThreeModelViewer';
import { FloorPlanViewer } from './components/FloorPlanViewer';
import { MaterialBoqAccordion } from './components/MaterialBoqAccordion';
import { ProgressTimeline } from './components/ProgressTimeline';
import { MediaWalkthroughGallery } from './components/MediaWalkthroughGallery';
import { DocumentHub } from './components/DocumentHub';
import { SmartExpiryBadge } from './components/SmartExpiryBadge';
import { SAMPLE_PROJECT } from './data/projectData';

export default function App() {
  const [project] = useState(SAMPLE_PROJECT);
  const [activeSection, setActiveSection] = useState<'3d' | 'plans' | 'boq' | 'timeline' | 'gallery' | 'docs'>('3d');
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
      {/* 1. Header & Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800">
        <div className="container py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo & Project Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20">
              <Building2 className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                  BIMSpace Digital
                </span>
                <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded bg-cyan-950/50 hidden sm:inline">
                  VastuTwin AI™
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {project.projectTitle}
              </div>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2.5">
            {/* 1-Year Expiry Badge */}
            <SmartExpiryBadge />

            {/* Share Client Link Button */}
            <button
              onClick={handleShare}
              className="btn-secondary text-xs py-2 px-3 hidden md:inline-flex"
              title="Share Digital Twin Portal Link"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{shareSuccess ? 'Link Copied!' : 'Share Twin'}</span>
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
              <span className="hidden sm:inline">Download Approved</span> CAD
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md sticky top-[61px] z-30 overflow-x-auto">
        <div className="container flex items-center gap-1 py-2">
          {[
            { id: '3d', label: '3D Digital Twin', hash: '#model-hero' },
            { id: 'plans', label: '2D CAD Floor Plans', hash: '#floorplans-section' },
            { id: 'boq', label: 'BOQ & Materials', hash: '#boq-section' },
            { id: 'timeline', label: 'Site Execution Timeline', hash: '#timeline-section' },
            { id: 'gallery', label: 'Walkthrough Gallery', hash: '#gallery-section' },
            { id: 'docs', label: 'Document Vault', hash: '#documents-section' }
          ].map((item) => (
            <a
              key={item.id}
              href={item.hash}
              onClick={() => setActiveSection(item.id as any)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeSection === item.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40'
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
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-cyan text-xs">Client Digital Twin Portal</span>
                  <span className="badge-gold text-xs">Vastu Verified N-E Facing</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  {project.projectTitle}
                </h1>
                <p className="text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
                  {project.tagline}. Designed & engineered with BIM accuracy, carbon-offset calculations, and premium luxury finishes.
                </p>
              </div>

              {/* Quick Structural & Budget Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Total Built-Up Area</div>
                  <div className="text-xl md:text-2xl font-bold text-white font-mono mt-0.5">
                    {project.totalAreaSqft.toLocaleString()} <span className="text-xs text-cyan-400 font-sans">sq.ft</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Ground + First + Terrace Deck</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Turnkey Civil Budget</div>
                  <div className="text-xl md:text-2xl font-bold text-amber-400 font-mono mt-0.5">
                    ₹1.48 <span className="text-xs text-slate-300 font-sans">Cr Est.</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Includes Civil, Finishes & Solar</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Project Location</div>
                  <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{project.location}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">PMC Zone: High-Value Basalt</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Handover Timeline</div>
                  <div className="text-xs font-semibold text-white mt-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{project.targetHandover}</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-mono">On Schedule • Phase 4 Active</div>
                </div>
              </div>

              {/* Client Name & Contractor Team Signoff */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-cyan-300">
                    RP
                  </div>
                  <div>
                    <div className="text-[11px] text-cyan-300 uppercase tracking-wider font-mono">Registered Client</div>
                    <div className="text-sm font-bold text-white">{project.clientName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-mono">Digital Signature</div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </div>
                </div>
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

        {/* Work Process / System Architecture Explainer */}
        <section className="container">
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="badge-cyan text-xs mb-2">Automated Digital Pipeline</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                How BIMSpace Digital Works
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                From native AutoCAD & Revit files to an interactive, unmetered client presentation link ready for site execution.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "CAD & 3D Extraction",
                  desc: "Raw AutoCAD .DWG drawings, SketchUp/Revit 3D geometry, and Excel BOQ sheets are extracted."
                },
                {
                  step: "02",
                  title: "AI Twin Upload",
                  desc: "Models are compressed to WebGL GLTF, blueprints optimized into high-definition vector SVGs."
                },
                {
                  step: "03",
                  title: "Instant Cloud Deployment",
                  desc: "A custom fast-edge subdomain (e.g. patil-villa.vastutwin.com) is provisioned with 1-Year Hosting."
                },
                {
                  step: "04",
                  title: "Site Contractor Access",
                  desc: "Client shares digital link with civil contractors, electricians, and interior designers without messy PDFs."
                }
              ].map((proc, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-mono text-cyan-400 font-extrabold text-2xl mb-2">{proc.step}</div>
                  <h3 className="font-bold text-white text-base mb-1">{proc.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{proc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer & Architect Contact Action Card */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-16 pt-12 pb-8">
        <div className="container space-y-12">
          {/* Architect Contact Card */}
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="badge-cyan text-xs">Architect & Civil Consultant Contact</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  {project.architect.firm}
                </h3>
                <p className="text-sm text-slate-300">
                  Lead Consultant: <strong className="text-white">{project.architect.name}</strong> • Licensed Council of Architecture ({project.architect.license}).
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" /> {project.architect.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> {project.architect.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {project.architect.office}
                  </span>
                </div>
              </div>

              {/* Quick Inquiry Form */}
              <div className="lg:col-span-5 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">Request On-Site BIM Clarification</h4>
                {contactMessageSent ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Site query dispatched directly to Architect's WhatsApp & Email channel.
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name (Contractor / Vendor)"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Query Subject (e.g. Slab Beam Level 1 Clarification)"
                      className="w-full text-xs px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <button type="submit" className="btn-primary text-xs py-2 w-full justify-center">
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
              © 2026 <strong>BIMSpace Digital</strong> / VastuTwin AI. All Architectural Rights Reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Hosted on VastuTwin AI Cloud Engine • Edge CDN Enabled</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

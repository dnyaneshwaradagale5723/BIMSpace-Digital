import { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  DollarSign,
  Download,
  Building2,
  Phone,
  Send,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  FileSpreadsheet,
  Globe,
  Bot
} from 'lucide-react';
import { BUILDVISION_SERVICES, ALL_20_PROCESS_STEPS, PACKAGES_DATA, MOCK_LEADS, ServiceItem } from '../data/buildVisionData';

export const ServicesAndPackagesView = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'civil' | 'digital' | 'ai'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = BUILDVISION_SERVICES.filter((svc) => {
    const matchesCat = activeCategory === 'all' || svc.category === activeCategory;
    const matchesQuery = svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         svc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full space-y-16">
      {/* 1. Services Section Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <span className="badge-cyan text-xs mb-2">33 Integrated Engineering & Digital Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Civil Engineering, Architecture & Digital Solutions
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-1 max-w-3xl">
              From initial Vastu-compliant 2D architectural drawings to high-end 3D ray-traced visuals, structural RCC design, and personal project presentation websites.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 33 services..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'all', label: `All Services (${BUILDVISION_SERVICES.length})` },
            { id: 'civil', label: 'Civil & Architectural (20)' },
            { id: 'digital', label: 'Digital & Media (8)' },
            { id: 'ai', label: 'AI-Assisted Services (5)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid (Numbered 1 to 33) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              onClick={() => setSelectedService(svc)}
              className="glass-panel p-4 md:p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 cursor-pointer flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400">
                    #{svc.id < 10 ? `0${svc.id}` : svc.id}
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    svc.category === 'civil' ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800' :
                    svc.category === 'digital' ? 'bg-purple-950/60 text-purple-300 border border-purple-800' :
                    'bg-amber-950/60 text-amber-300 border border-amber-800'
                  }`}>
                    {svc.categoryLabel}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {svc.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                  {svc.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-slate-300 truncate max-w-[170px]">📦 {svc.deliverable}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Special House Package Highlight Banner */}
      <div className="rounded-3xl p-6 md:p-10 border border-amber-500/40 bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/30 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="badge-gold text-xs">Flagship Turnkey Offering</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Complete Home Design + Digital Website Package
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
              A comprehensive turnkey solution merging classical civil engineering precision with an unmetered, personalized 1-Year client digital twin website for seamless site execution.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {[
                "Client Requirement & Site Analysis",
                "NBC-Compliant 2D House Plan",
                "Photorealistic 3D Exterior Elevation",
                "3D Interior Room Visualization",
                "Granular Quantity & BOQ Takeoff",
                "Personal Project Website (1-Year Active)",
                "Interactive 2D/3D WebGL Viewer",
                "Direct WhatsApp Engineer Support",
                "As-Built Final Handover Archive"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-amber-400/90 font-mono pt-2">
              * Note: Renewal charges apply after the included 1-year hosting and cloud synchronization validity period.
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-950/80 p-6 rounded-2xl border border-amber-500/30 text-center space-y-4">
            <div className="text-xs uppercase font-mono text-slate-400">Package Starting At</div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
              ₹78,000 <span className="text-xs text-slate-400 font-sans">/ Turnkey Project</span>
            </div>
            <p className="text-xs text-slate-400">
              Covers full architectural drawings, 3D renders, BOQ estimate & personal client portal hosting.
            </p>
            <a
              href="#lead-form-section"
              className="btn-gold w-full py-3 justify-center text-xs font-bold tracking-wide"
            >
              Order Complete Package
            </a>
          </div>
        </div>
      </div>

      {/* 3. Three Pricing Tiers (Basic, Professional, Premium) */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-cyan text-xs mb-2">Transparent Pricing Structure</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Design & Engineering Packages
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Choose the package best suited for your construction scale, budget, and visualization goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PACKAGES_DATA.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                pkg.highlight
                  ? 'border-cyan-400 bg-slate-900/90 shadow-xl shadow-cyan-500/10 scale-[1.02]'
                  : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold ${
                    pkg.highlight ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {pkg.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <p className="text-xs text-slate-400 mt-1 mb-4">{pkg.tagline}</p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <div className="text-3xl font-extrabold text-white font-mono">
                    {pkg.price}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{pkg.unit}</div>
                </div>

                <div className="space-y-2.5 mb-6">
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.highlight ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#lead-form-section"
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  pkg.highlight
                    ? 'btn-primary'
                    : 'btn-secondary hover:border-cyan-500'
                }`}
              >
                Select {pkg.name.split(' ')[0]} Plan
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Complete 20-Step Work Process Timeline */}
      <div id="process-timeline" className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-cyan text-xs mb-2">Rigorous 20-Step Quality Process</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            From Client Requirement to Project Handover
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Every step is documented, measured, and signed off to ensure zero structural surprises on site.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
          {ALL_20_PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-cyan-400 font-extrabold text-lg block mb-1 group-hover:scale-110 transition-transform">
                  {step.step}
                </span>
                <h4 className="font-bold text-white text-xs line-clamp-1">{step.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

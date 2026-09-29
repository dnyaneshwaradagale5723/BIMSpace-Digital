import React, { useState } from 'react';
import {
  Users,
  FileCheck,
  TrendingUp,
  FolderKanban,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Sparkles,
  Bot,
  Send,
  Building2,
  DollarSign,
  Globe
} from 'lucide-react';
import { MOCK_LEADS } from '../data/buildVisionData';

export const AdminDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'projects' | 'quotations' | 'ai_tools'>('leads');
  const [leadsList, setLeadsList] = useState(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);

  // AI Assistant states
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleGenerateAi = (type: string) => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      if (type === 'research') {
        setAiResponse(
          `### [AI Research Output: NBC 2016 & PMC Setback Analysis]\n- **Road Width:** 12.0m internal access road.\n- **Front Setback:** 3.0m required for ground-plus-two structures.\n- **Side & Rear Setback:** 2.0m minimum for cross-ventilation.\n- **Ground Coverage:** Max 50% permissible on 3,500 sq.ft plot.\n- **FSI / FAR Benchmark:** Base 1.1 + Premium TDR 0.4 = Total 1.5 FSI.`
        );
      } else if (type === 'quote') {
        setAiResponse(
          `### [AI Automated Quotation Outline: Villa Package]\n- **Civil 2D Architectural Plan:** 3,850 Sq.Ft @ ₹12/Sq.Ft = ₹46,200\n- **Photorealistic 3D Exterior & 4K Walkthrough:** Lumion Ray-Traced = ₹25,000\n- **Itemized BOQ & Structural Engineering:** IS 456 Analysis = ₹18,000\n- **1-Year Personal Client Portal Website:** Cloud Hosting + CAD Vault = Included in Premium\n- **Estimated Project Subtotal:** ₹89,200 + 18% GST.`
        );
      } else {
        setAiResponse(
          `### [AI Requirement Extraction Summary]\n- **Client Profile:** 4-Member Joint Family\n- **Vastu Priority:** Master Bedroom in South-West (Nairutya), Kitchen in South-East (Agni), Puja Room in North-East (Ishan).\n- **Special Amenities:** 6kW Solar Pergola on terrace deck, double-height living room, 1 EV fast-charging carport.`
        );
      }
    }, 900);
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Admin Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>TOTAL LEADS</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">48</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">+12% this month</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>ACTIVE PROJECTS</span>
            <FolderKanban className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">14</div>
          <div className="text-[11px] text-cyan-400 mt-1 font-mono">6 under 3D / BOQ stage</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>QUOTATIONS VALUE</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">₹34.6 L</div>
          <div className="text-[11px] text-amber-400 mt-1 font-mono">8 pending client signoff</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>CLIENT DIGITAL TWINS</span>
            <Globe className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">11 Live</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">100% 1-Year Cloud Uptime</div>
        </div>
      </div>

      {/* Admin Navigation Sub-tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'leads', label: 'Lead Inquiries' },
            { id: 'projects', label: 'Projects & Status (10 Steps)' },
            { id: 'quotations', label: 'Quotation Engine (PDF)' },
            { id: 'ai_tools', label: 'AI Engineering Assistants' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
          BuildVision Studio Master Back-Office
        </span>
      </div>

      {/* TAB 1: Lead Inquiries Management */}
      {activeTab === 'leads' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h3 className="font-bold text-white text-base">Inbound Client Leads & Site Parameters</h3>
            <span className="text-xs text-slate-400 font-mono">Auto-logged from Website Form</span>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono">
                <th className="py-2.5 px-3">Lead Code</th>
                <th className="py-2.5 px-3">Client Name</th>
                <th className="py-2.5 px-3">Phone / City</th>
                <th className="py-2.5 px-3">Typology & Plot</th>
                <th className="py-2.5 px-3">Target Budget</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {leadsList.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 text-cyan-300 font-bold">{lead.id}</td>
                  <td className="py-3 px-3 text-white font-sans font-semibold">{lead.clientName}</td>
                  <td className="py-3 px-3 text-slate-300">{lead.phone} • {lead.city}</td>
                  <td className="py-3 px-3 text-slate-400 font-sans">{lead.projectType} ({lead.plotSize})</td>
                  <td className="py-3 px-3 text-amber-400 font-bold">{lead.budget}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700 text-cyan-300">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    <button
                      onClick={() => alert(`Opening Full Dossier for ${lead.clientName}`)}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={() => alert(`Drafting Quotation for ${lead.clientName}`)}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      Draft Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: Projects & Stage Execution */}
      {activeTab === 'projects' && (
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Active Turnkey Client Projects</h3>
            <button
              onClick={() => alert('Add Project Modal Opened')}
              className="btn-primary text-xs py-1.5 px-3"
            >
              <Plus className="w-3.5 h-3.5" /> New Project
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Patil Residence - Executive Villa Twin",
                client: "Er. Rameshwar Patil",
                stage: "Stage 04: AAC Masonry & Slab Inspection",
                percent: 68,
                cloudStatus: "Active (292 Days Remaining)"
              },
              {
                title: "Kulkarni Eco-Twin Residence",
                client: "Mr. Sachin Kulkarni",
                stage: "Stage 02: 3D Elevation & Lumion Renders",
                percent: 35,
                cloudStatus: "Active (240 Days Remaining)"
              }
            ].map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">{proj.title}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Client: {proj.client} • Current: <span className="text-cyan-400">{proj.stage}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-1">
                    ☁️ Cloud Hosting: {proj.cloudStatus}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full" style={{ width: `${proj.percent}%` }} />
                  </div>
                  <span className="font-mono text-xs text-slate-300 font-bold">{proj.percent}%</span>
                  <button
                    onClick={() => alert('Accessing Project CAD Vault')}
                    className="btn-secondary text-xs py-1.5 px-3"
                  >
                    Manage CAD Vault
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Quotation Engine & PDF Export */}
      {activeTab === 'quotations' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-lg">Quotation Generation Engine</h3>
              <p className="text-xs text-slate-400">Generate professional, itemized PDF quotations with binding engineering terms.</p>
            </div>
            <button
              onClick={() => alert('Quotation PDF Exported: "BuildVision-Quote-Patil-Villa-2026.pdf" with tax calculations and payment milestones.')}
              className="btn-gold text-xs py-2 px-4"
            >
              <Download className="w-4 h-4" /> Export Professional PDF Quote
            </button>
          </div>

          <div className="bg-slate-950/90 p-5 rounded-xl border border-slate-800 space-y-4 text-xs font-mono">
            <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400">
              <span>QUOTATION REF: BV-QT-2026-104</span>
              <span>DATE: 29 SEP 2026</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block">CLIENT DETAILS:</span>
                <span className="text-white font-bold block">Er. Rameshwar & Sunita Patil</span>
                <span className="text-slate-400">Baner Hills, Pune (Plot 42)</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">ARCHITECTURAL CONSULTANT:</span>
                <span className="text-amber-400 font-bold block">BuildVision Studio</span>
                <span className="text-slate-400">Ar. Dnyaneshwar Adagale (COA/2023/CA-88491)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between py-1 text-slate-300">
                <span>1. Architectural 2D Plan & Working Drawings (3,850 Sq.Ft)</span>
                <span>₹46,200.00</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300">
                <span>2. 3D Elevation Modeling & 4K Video Walkthrough</span>
                <span>₹25,000.00</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300">
                <span>3. Structural Frame Design (IS 456) & Granular BOQ</span>
                <span>₹18,000.00</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300">
                <span>4. Personal VIP Client Project Website (1-Year Active Cloud)</span>
                <span>INCLUDED IN PACKAGE</span>
              </div>
              <div className="flex justify-between py-2 border-t border-slate-700 text-sm font-bold text-white mt-2">
                <span>Total Quotation Amount (+ 18% GST Applicable)</span>
                <span className="text-amber-400">₹89,200.00</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AI Engineering Assistants */}
      {activeTab === 'ai_tools' && (
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <span className="badge-cyan text-xs">BuildVision AI Copilot</span>
              <h3 className="text-xl font-bold text-white">AI Engineering & Documentation Assistant</h3>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Rapidly synthesize local municipal bye-laws, draft structural contractor checklists, and structure client requirements. 
            <em>(Note: All AI outputs serve as drafting assistance and do not substitute certified professional signoff.)</em>
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleGenerateAi('research')}
              disabled={isGeneratingAi}
              className="btn-secondary text-xs py-2 px-3 hover:border-cyan-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Auto-Research NBC Bye-Laws
            </button>
            <button
              onClick={() => handleGenerateAi('quote')}
              disabled={isGeneratingAi}
              className="btn-secondary text-xs py-2 px-3 hover:border-amber-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Draft Turnkey BOQ Outline
            </button>
            <button
              onClick={() => handleGenerateAi('req')}
              disabled={isGeneratingAi}
              className="btn-secondary text-xs py-2 px-3 hover:border-emerald-400"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Structure Client Brief
            </button>
          </div>

          {isGeneratingAi && (
            <div className="p-6 text-center text-xs font-mono text-cyan-300 bg-slate-950/60 rounded-xl border border-slate-800 animate-pulse">
              Synthesizing engineering standards and structural parameters...
            </div>
          )}

          {aiResponse && !isGeneratingAi && (
            <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
              {aiResponse}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

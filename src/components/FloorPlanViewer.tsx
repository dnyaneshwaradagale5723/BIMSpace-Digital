import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize, CheckCircle2, Download, Info } from 'lucide-react';
import { FLOOR_PLANS, FloorPlan } from '../data/projectData';

export const FloorPlanViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FloorPlan>(FLOOR_PLANS[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [showFurniture, setShowFurniture] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.5, Math.max(0.7, Number((prev + delta).toFixed(1)))));
  };

  const resetView = () => {
    setZoomLevel(1);
  };

  return (
    <div className="w-full">
      {/* Floor Plan Header & Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="badge-cyan text-xs mb-2">CAD Drawing Matrix</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Interactive 2D Architectural Layouts
          </h2>
          <p className="text-sm text-slate-400">
            Vector-accurate architectural floor plans, sanctioned spatial layouts, and Vastu directional orientations.
          </p>
        </div>

        {/* CAD Layer Toggles */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-xl">
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              showDimensions ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dimensions {showDimensions ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={() => setShowFurniture(!showFurniture)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
              showFurniture ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Spatial Layout {showFurniture ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-slate-800">
        {FLOOR_PLANS.map((plan) => {
          const isActive = activeTab.id === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => {
                setActiveTab(plan);
                resetView();
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-[1.02]'
                  : 'bg-slate-900/60 text-slate-300 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <span>{plan.floorName.split('(')[0]}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400'}`}>
                {plan.sqft} sq.ft
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Canvas Viewport Container */}
      <div className={`relative glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden bg-slate-950 ${isFullScreen ? 'fixed inset-4 z-50 shadow-2xl' : 'min-h-[500px]'}`}>
        {/* Top Viewport Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
            <span className="font-semibold text-white">{activeTab.floorName}</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 font-mono">Scale 1:100 Metric</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-1.5 rounded-xl">
            <button
              onClick={() => handleZoom(-0.2)}
              title="Zoom Out"
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-1.5 text-cyan-300">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => handleZoom(0.2)}
              title="Zoom In"
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={resetView}
              title="Reset View"
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? 'Exit Full Screen' : 'Full Screen View'}
              className="p-1.5 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Blueprint CAD SVG Rendering Canvas */}
        <div
          className="w-full h-full min-h-[500px] flex items-center justify-center p-8 blueprint-grid overflow-auto transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {activeTab.floorKey === 'ground' && (
            <svg viewBox="0 0 900 600" className="w-full max-w-[850px] drop-shadow-2xl">
              {/* Outer Boundary Wall */}
              <rect x="50" y="50" width="800" height="500" rx="6" fill="#0b1329" stroke="#06b6d4" strokeWidth="4" />
              
              {/* Grid guide */}
              <line x1="50" y1="280" x2="850" y2="280" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="480" y1="50" x2="480" y2="550" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />

              {/* Double Height Living Room (North-East) */}
              <rect x="70" y="70" width="390" height="270" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
              <text x="90" y="110" fill="#38bdf8" fontSize="18" fontWeight="bold" fontFamily="monospace">
                DOUBLE HEIGHT LIVING ROOM
              </text>
              <text x="90" y="135" fill="#94a3b8" fontSize="13" fontFamily="sans-serif">
                18'-6" x 22'-4" • Italian Marble Floor
              </text>

              {showFurniture && (
                <g opacity="0.85">
                  {/* Sofa Group */}
                  <rect x="120" y="180" width="160" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <rect x="150" y="255" width="100" height="45" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                  <text x="175" y="282" fill="#64748b" fontSize="10">COFFEE TABLE</text>
                  {/* Single accent chairs */}
                  <rect x="300" y="180" width="45" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <rect x="300" y="245" width="45" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                </g>
              )}

              {/* Guest Bedroom Suite */}
              <rect x="480" y="70" width="350" height="230" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
              <text x="500" y="110" fill="#38bdf8" fontSize="18" fontWeight="bold" fontFamily="monospace">
                GUEST BEDROOM SUITE
              </text>
              <text x="500" y="135" fill="#94a3b8" fontSize="13">
                14'-0" x 16'-0" • Attached Bath & Dresser
              </text>

              {showFurniture && (
                <g opacity="0.85">
                  {/* Bed */}
                  <rect x="540" y="150" width="120" height="130" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <rect x="550" y="155" width="45" height="25" rx="3" fill="#334155" />
                  <rect x="605" y="155" width="45" height="25" rx="3" fill="#334155" />
                  <text x="575" y="230" fill="#fbbf24" fontSize="12" fontWeight="bold">KING BED</text>
                  {/* Attached Bath */}
                  <rect x="680" y="80" width="130" height="120" fill="#091e42" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="700" y="145" fill="#38bdf8" fontSize="12">ENSUITE</text>
                </g>
              )}

              {/* Modular Kitchen & Dining (South-East Vastu Zone) */}
              <rect x="480" y="320" width="350" height="210" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
              <text x="500" y="355" fill="#f59e0b" fontSize="18" fontWeight="bold" fontFamily="monospace">
                VASTU KITCHEN & DINING
              </text>
              <text x="500" y="380" fill="#94a3b8" fontSize="13">
                Agni Corner • 16'-0" x 14'-8" Quartz Island
              </text>

              {showFurniture && (
                <g opacity="0.85">
                  {/* Dining Table with 6 chairs */}
                  <rect x="530" y="410" width="140" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="560" y="450" fill="#fbbf24" fontSize="12">DINING 6-SEATER</text>
                  {/* L-shaped counter */}
                  <path d="M 720 340 L 810 340 L 810 500 L 760 500 L 760 380 L 720 380 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="1" />
                </g>
              )}

              {/* Grand Foyer & Vastu Mandir */}
              <rect x="70" y="360" width="390" height="170" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
              <text x="90" y="395" fill="#38bdf8" fontSize="17" fontWeight="bold" fontFamily="monospace">
                ENTRANCE FOYER & MANDIR
              </text>
              <rect x="90" y="420" width="100" height="85" fill="#172554" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <text x="105" y="465" fill="#f59e0b" fontSize="12" fontWeight="bold">PUJA ROOM</text>

              {/* Portico Entrance & EV Bay */}
              <rect x="220" y="440" width="220" height="85" fill="#06192e" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="250" y="485" fill="#34d399" fontSize="12" fontWeight="bold">EV CHARGE CARPORT</text>

              {/* Dimension Annotations */}
              {showDimensions && (
                <g stroke="#06b6d4" strokeWidth="1.5" fill="#06b6d4" fontSize="11" fontFamily="monospace">
                  <line x1="50" y1="30" x2="850" y2="30" markerEnd="url(#arrow)" />
                  <text x="410" y="24">52'-0" TOTAL PLOT WIDTH</text>
                  <line x1="25" y1="50" x2="25" y2="550" />
                  <text x="10" y="310" transform="rotate(-90 10 310)">42'-6" TOTAL LENGTH</text>
                </g>
              )}
            </svg>
          )}

          {activeTab.floorKey === 'first' && (
            <svg viewBox="0 0 900 600" className="w-full max-w-[850px] drop-shadow-2xl">
              <rect x="50" y="50" width="800" height="500" rx="6" fill="#0b1329" stroke="#06b6d4" strokeWidth="4" />
              
              {/* Master Bedroom Suite */}
              <rect x="70" y="70" width="460" height="300" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="90" y="110" fill="#fbbf24" fontSize="18" fontWeight="bold" fontFamily="monospace">
                EXECUTIVE MASTER SUITE
              </text>
              <text x="90" y="135" fill="#94a3b8" fontSize="13">
                22'-0" x 18'-0" • Hardwood Walnut Flooring
              </text>

              {showFurniture && (
                <g opacity="0.9">
                  <rect x="140" y="170" width="140" height="150" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="165" y="250" fill="#fbbf24" fontSize="13" fontWeight="bold">CALIFORNIA KING</text>
                  {/* Walk-in closet */}
                  <rect x="360" y="90" width="150" height="110" fill="#172554" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="380" y="150" fill="#38bdf8" fontSize="12">WALK-IN CLOSET</text>
                  {/* Luxury Bath */}
                  <rect x="360" y="220" width="150" height="130" fill="#091e42" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="385" y="285" fill="#38bdf8" fontSize="12">JACUZZI BATH</text>
                </g>
              )}

              {/* Cantilever Viewing Balcony */}
              <rect x="70" y="380" width="460" height="140" fill="#071b2d" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
              <text x="180" y="455" fill="#22d3ee" fontSize="15" fontWeight="bold">
                12' CANTILEVER GLASS BALCONY DECK
              </text>

              {/* Children Suite / Multi-purpose Studio */}
              <rect x="550" y="70" width="280" height="230" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
              <text x="570" y="110" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="monospace">
                BEDROOM 2 (KIDS)
              </text>
              <text x="570" y="135" fill="#94a3b8" fontSize="12">14'-0" x 14'-0"</text>

              {/* Family Lounge & Media Bridge */}
              <rect x="550" y="320" width="280" height="200" fill="#0f172a" stroke="#0284c7" strokeWidth="2.5" />
              <text x="570" y="360" fill="#a855f7" fontSize="16" fontWeight="bold" fontFamily="monospace">
                FAMILY MEDIA LOUNGE
              </text>
              <text x="570" y="385" fill="#94a3b8" fontSize="12">Overlooking double-height living</text>

              {showDimensions && (
                <g stroke="#06b6d4" strokeWidth="1.5" fill="#06b6d4" fontSize="11" fontFamily="monospace">
                  <line x1="50" y1="30" x2="850" y2="30" />
                  <text x="420" y="24">FIRST FLOOR 1,450 SQ.FT</text>
                </g>
              )}
            </svg>
          )}

          {activeTab.floorKey === 'terrace' && (
            <svg viewBox="0 0 900 600" className="w-full max-w-[850px] drop-shadow-2xl">
              <rect x="50" y="50" width="800" height="500" rx="6" fill="#0b1329" stroke="#10b981" strokeWidth="4" />
              
              {/* Solar Array Pergola */}
              <rect x="100" y="90" width="400" height="260" fill="#06253a" stroke="#06b6d4" strokeWidth="2.5" />
              <text x="140" y="140" fill="#38bdf8" fontSize="18" fontWeight="bold" fontFamily="monospace">
                6kW BI-FACIAL SOLAR PERGOLA
              </text>
              <text x="140" y="165" fill="#94a3b8" fontSize="13">
                Covered outdoor seating deck with shaded solar canopy
              </text>
              {/* Solar cells */}
              <g stroke="#0284c7" strokeWidth="1">
                {[0, 1, 2, 3].map((row) => (
                  <line key={row} x1="120" y1={190 + row * 30} x2="480" y2={190 + row * 30} />
                ))}
              </g>

              {/* Rainwater Harvesting & Landscape Garden */}
              <rect x="530" y="90" width="300" height="390" fill="#062e1e" stroke="#10b981" strokeWidth="2.5" />
              <text x="550" y="140" fill="#34d399" fontSize="18" fontWeight="bold" fontFamily="monospace">
                HYDROPONIC SKY GARDEN
              </text>
              <text x="550" y="165" fill="#94a3b8" fontSize="13">
                Organic kitchen garden & 15k Litre RWH filtration
              </text>

              {/* Staircase Headroom & Lift Machine Room */}
              <rect x="100" y="370" width="220" height="110" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="120" y="430" fill="#fbbf24" fontSize="14" fontWeight="bold">LMR & STAIR HEAD</text>
            </svg>
          )}

          {activeTab.floorKey === 'electrical' && (
            <svg viewBox="0 0 900 600" className="w-full max-w-[850px] drop-shadow-2xl">
              <rect x="50" y="50" width="800" height="500" rx="6" fill="#020617" stroke="#eab308" strokeWidth="4" />
              
              {/* Smart Distribution Board Hub */}
              <rect x="100" y="100" width="180" height="120" fill="#1e293b" stroke="#eab308" strokeWidth="2" />
              <text x="120" y="140" fill="#facc15" fontSize="15" fontWeight="bold">MAIN 3-PHASE DB</text>
              <text x="120" y="165" fill="#94a3b8" fontSize="11">Surge Protector + IoT MCB</text>

              {/* High voltage paths */}
              <path d="M 280 160 L 500 160 L 500 350 L 750 350" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
              {/* Low voltage Cat6/KNX Automation */}
              <path d="M 280 180 L 420 180 L 420 450 L 700 450" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              {/* Concealed Plumbing Ring */}
              <path d="M 120 220 L 120 480 L 800 480 L 800 200" fill="none" stroke="#3b82f6" strokeWidth="3" />

              <g fill="#f8fafc" fontSize="12" fontFamily="monospace">
                <text x="520" y="150" fill="#f59e0b">● Heavy AC & Geyser Line (4.0 sq.mm)</text>
                <text x="440" y="440" fill="#06b6d4">● KNX Bus Automation Cable (Low-Voltage)</text>
                <text x="400" y="515" fill="#3b82f6">● Concealed CPVC Loop (Pressure Ring 3.5 bar)</text>
              </g>
            </svg>
          )}
        </div>

        {/* Bottom Feature Specs Highlights */}
        <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-2 md:grid-cols-4 gap-2 pointer-events-none">
          {activeTab.highlightSpecs.map((spec, i) => (
            <div key={i} className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-slate-800/80 px-3 py-2 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs text-slate-200 truncate">{spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer for Floor Plan */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>All dimensions conform to National Building Code (NBC) 2016 & PMC Bye-laws. Certified by Ar. Dnyaneshwar Adagale.</span>
        </div>
        <button
          onClick={() => alert(`Downloading high-resolution Vector PDF for ${activeTab.floorName}...`)}
          className="btn-primary text-xs py-2 px-4"
        >
          <Download className="w-3.5 h-3.5" />
          Download Vector CAD (PDF)
        </button>
      </div>
    </div>
  );
};

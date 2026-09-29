export interface ServiceItem {
  id: number;
  category: 'civil' | 'digital' | 'ai';
  categoryLabel: string;
  name: string;
  description: string;
  deliverable: string;
  iconName: string;
}

export const BUILDVISION_SERVICES: ServiceItem[] = [
  // 1-20 Civil & Architectural
  { id: 1, category: 'civil', categoryLabel: 'Civil & Architectural', name: '2D House Plan', description: 'Vastu & NBC compliant architectural layouts with room zoning.', deliverable: 'High-Res CAD & PDF', iconName: 'Compass' },
  { id: 2, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Working Drawings', description: 'Detailed center-line plans, wall schedules, and opening schedules.', deliverable: 'Metric CAD Plans', iconName: 'Layers' },
  { id: 3, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Floor Plans', description: 'Spatial planning with customized furniture clearance and flow.', deliverable: 'Dimensioned Blueprints', iconName: 'Home' },
  { id: 4, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Elevation Drawings', description: 'Front, rear, and lateral exterior facade architectural views.', deliverable: 'Architectural Sheets', iconName: 'Building2' },
  { id: 5, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Cross & Long Sections', description: 'Vertical structural heights, lintel levels, and slab thicknesses.', deliverable: 'Detailed Sections', iconName: 'Scissors' },
  { id: 6, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Structural Design (IS 456)', description: 'RCC frame analysis, footing sizes, column reinforcement schedules.', deliverable: 'Structural Audit Report', iconName: 'ShieldCheck' },
  { id: 7, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Site Planning & Drainage', description: 'Topographical ingress/egress, storm drainage, and parking zoning.', deliverable: 'Plot Masterplan', iconName: 'Map' },
  { id: 8, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Survey Support', description: 'Boundary verification, total station data, and contour maps.', deliverable: 'Topographical Survey', iconName: 'Crosshair' },
  { id: 9, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Quantity Takeoff', description: 'Granular takeoff for concrete, reinforcement steel, mortar, bricks.', deliverable: 'Takeoff Measurement Sheet', iconName: 'Calculator' },
  { id: 10, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Turnkey Estimation', description: 'Accurate budget forecasting with regional DSR benchmark rates.', deliverable: 'Project Estimate PDF', iconName: 'TrendingUp' },
  { id: 11, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Itemized BOQ', description: 'Classified Bill of Quantities ready for contractor tender bidding.', deliverable: 'Audited BOQ Workbook', iconName: 'FileSpreadsheet' },
  { id: 12, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Tender / Quotation Support', description: 'Contractor quotation analysis, negotiations, and rate comparisons.', deliverable: 'Comparative Matrix', iconName: 'FileCheck' },
  { id: 13, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Interior Planning', description: 'False ceiling, illumination grids, and modular kitchen layouts.', deliverable: 'Interior Layout Package', iconName: 'Sparkles' },
  { id: 14, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Exterior Facade Design', description: 'Modern louvers, stone cladding, glass balustrades, and ACP paneling.', deliverable: 'Facade Spec Sheets', iconName: 'Eye' },
  { id: 15, category: 'civil', categoryLabel: 'Civil & Architectural', name: '3D House Volumetric Model', description: 'Full 3D massing in Revit / SketchUp with exact plot boundary.', deliverable: 'BIM 3D Model (.GLTF/.DWG)', iconName: 'Box' },
  { id: 16, category: 'civil', categoryLabel: 'Civil & Architectural', name: '3D Interior Renders', description: 'Photorealistic V-Ray/Lumion lighting with high-end material textures.', deliverable: 'Ultra-HD 4K Renders', iconName: 'Image' },
  { id: 17, category: 'civil', categoryLabel: 'Civil & Architectural', name: '3D Exterior Perspectives', description: 'Daytime, dusk ambient, and landscape context architectural renders.', deliverable: 'Multiple High-Res Angles', iconName: 'Sun' },
  { id: 18, category: 'civil', categoryLabel: 'Civil & Architectural', name: '4K Walkthrough Animation', description: 'Smooth 60fps cinematic fly-through video with environmental audio.', deliverable: '4K Video File & Stream Link', iconName: 'Video' },
  { id: 19, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'Renovation Planning', description: 'Retrofit drawings, partition removals, and structural strengthening.', deliverable: 'Retrofitting Scheme', iconName: 'Wrench' },
  { id: 20, category: 'civil', categoryLabel: 'Civil & Architectural', name: 'As-Built Documentation', description: 'Post-construction verification drawings for municipal records.', deliverable: 'As-Built CAD Archive', iconName: 'FileText' },

  // 21-28 Digital Services
  { id: 21, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Custom Website Development', description: 'Fast, secure responsive web apps for client presentation and firms.', deliverable: 'Live Production Web App', iconName: 'Globe' },
  { id: 22, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Business Website Platform', description: 'Corporate digital presence for builders, civil contractors, and suppliers.', deliverable: 'Multi-Page SEO Portal', iconName: 'Briefcase' },
  { id: 23, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Architectural Portfolio', description: 'Interactive project galleries with 2D plan and 3D render integration.', deliverable: 'Portfolio Portal', iconName: 'FolderKanban' },
  { id: 24, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Graphic & Brand Identity', description: 'Vector logos, corporate brochures, site hoardings, and stationery.', deliverable: 'Brand Kit & Print Vectors', iconName: 'Palette' },
  { id: 25, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Drone & Construction Video', description: 'Milestone drone video editing, color grading, and progress summaries.', deliverable: 'Edited 4K Reels & Logs', iconName: 'Film' },
  { id: 26, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Motion Graphics', description: 'Animated architectural isometric diagrams and construction sequences.', deliverable: 'Motion Explainer Clips', iconName: 'PlayCircle' },
  { id: 27, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Social Media Content', description: 'Architectural carousel templates, technical tips, and project spotlights.', deliverable: '30-Day Social Content Pack', iconName: 'Share2' },
  { id: 28, category: 'digital', categoryLabel: 'Digital Solutions', name: 'Digital Marketing & Ads', description: 'Targeted Google & Meta lead campaigns for plot owners & luxury builds.', deliverable: 'Lead Pipeline System', iconName: 'Target' },

  // 29-33 AI-Assisted Services
  { id: 29, category: 'ai', categoryLabel: 'AI-Assisted Services', name: 'AI-Assisted Bye-law Research', description: 'Rapid automated synthesis of municipal DC regulations and NBC codes.', deliverable: 'Regulatory Compliance Note', iconName: 'Cpu' },
  { id: 30, category: 'ai', categoryLabel: 'AI-Assisted Services', name: 'AI-Assisted Documentation', description: 'Automated contract clause drafting and site safety audit formatting.', deliverable: 'Standardized Contract Docs', iconName: 'FileCode' },
  { id: 31, category: 'ai', categoryLabel: 'AI-Assisted Services', name: 'AI-Assisted Content Creation', description: 'Architecture design statements, project blurbs, and brochure copy.', deliverable: 'Content Master Doc', iconName: 'PenTool' },
  { id: 32, category: 'ai', categoryLabel: 'AI-Assisted Services', name: 'AI Client Portal Generator', description: 'Single-click generation of personal digital twins with unmetered access.', deliverable: 'Automated Subdomain Link', iconName: 'Zap' },
  { id: 33, category: 'ai', categoryLabel: 'AI-Assisted Services', name: 'AI Automation & CRM Bots', description: 'Automated WhatsApp site updates and quotation status tracking.', deliverable: 'Webhook Automation Flow', iconName: 'Bot' }
];

export const ALL_20_PROCESS_STEPS = [
  { step: "01", name: "Client Requirement", desc: "Lifestyle audit, room count, and budgetary preferences." },
  { step: "02", name: "Site Data", desc: "Orientation, road width, setback regulations, and solar path." },
  { step: "03", name: "Survey", desc: "Total station survey and geo-technical soil analysis." },
  { step: "04", name: "Concept", desc: "Zoning bubbles, circulation hierarchy, and massing sketches." },
  { step: "05", name: "Planning", desc: "Room dimensions, Vastu alignment, and cross-ventilation." },
  { step: "06", name: "2D Drawings", desc: "Architectural floor plans with metric dimensions." },
  { step: "07", name: "3D Model", desc: "Volumetric CAD modeling with roof pitch and cantilevers." },
  { step: "08", name: "Structural Coord", desc: "Column positioning, load transfer, and beam depths." },
  { step: "09", name: "MEP Coordination", desc: "Plumbing shafts, electrical runs, and HVAC routing." },
  { step: "10", name: "Working Drawings", desc: "Detailed execution prints for site carpenters & masons." },
  { step: "11", name: "Quantity Takeoff", desc: "Volume measurements for concrete, steel, and blocks." },
  { step: "12", name: "Estimation", desc: "Projected costs aligned with regional benchmark material rates." },
  { step: "13", name: "BOQ", desc: "Classified bill of quantities ready for competitive bids." },
  { step: "14", name: "Tender / Quotation", desc: "Final contractor scope signoff and binding terms." },
  { step: "15", name: "Execution Support", desc: "Periodic site verification, leveling checks, and steel audits." },
  { step: "16", name: "Measurement", desc: "Joint measurement sheets of executed physical quantities." },
  { step: "17", name: "Billing", desc: "Milestone-linked contractor certification and verification." },
  { step: "18", name: "Revision", desc: "Documenting architectural alterations during construction." },
  { step: "19", name: "As-Built Drawings", desc: "Final CAD archive recording actual on-site geometry." },
  { step: "20", name: "Handover Docs", desc: "Warranties, sanction copies, and personal 1-Yr Portal." }
];

export const PACKAGES_DATA = [
  {
    id: "pkg-basic",
    name: "Basic Essential Plan",
    price: "₹18,500",
    unit: "per project",
    tagline: "Ideal for individual residential plot planning",
    features: [
      "Client Requirement Analysis",
      "Vastu-Compliant 2D Floor Plans",
      "Front Architectural Elevation",
      "Basic Column Position Layout",
      "Material Specification Sheet",
      "Standard PDF Drawing Export"
    ],
    highlight: false,
    badge: "Fast Start"
  },
  {
    id: "pkg-pro",
    name: "Professional Home Suite",
    price: "₹45,000",
    unit: "per project",
    tagline: "Comprehensive design for builders & villa owners",
    features: [
      "Everything in Basic Package",
      "Full Working Drawings Package (G+1)",
      "Photorealistic 3D Exterior Elevation",
      "Structural Frame Design & Beam Schedules",
      "Detailed Itemized BOQ & Cost Estimate",
      "Electrical & Plumbing Conduits Scheme",
      "3 Rounds of Architectural Revisions"
    ],
    highlight: true,
    badge: "Most Popular"
  },
  {
    id: "pkg-premium",
    name: "Complete Home Design + Digital Website Package",
    price: "₹78,000",
    unit: "per project",
    tagline: "Turnkey Architecture + Personal 1-Year VIP Portal",
    features: [
      "Full Architecture (2D + 3D + Structural + MEP)",
      "4K Video Walkthrough & Ray-Traced Interior Views",
      "Granular Quantity Takeoff & Contractor Tender Matrix",
      "Personal VIP Project Presentation Website (1-Year Hosting)",
      "Interactive 2D/3D WebGL Viewer for Client & Contractors",
      "Immutable Document Vault (Sanctions & Certificates)",
      "Direct WhatsApp Engineer Support Desk",
      "As-Built Documentation at Final Handover"
    ],
    highlight: false,
    badge: "Complete VIP Solution"
  }
];

export const MOCK_LEADS = [
  {
    id: "BV-LEAD-2026-081",
    clientName: "Er. Rameshwar Patil",
    phone: "+91 98220 12345",
    city: "Pune",
    projectType: "Luxury Villa (4BHK)",
    plotSize: "50 x 70 ft (3,500 sq.ft)",
    budget: "₹1.50 Cr",
    status: "In Progress",
    websiteIncluded: true,
    date: "28 Sep 2026"
  },
  {
    id: "BV-LEAD-2026-082",
    clientName: "Mrs. Anjali Deshmukh",
    phone: "+91 98500 56789",
    city: "Pimpri-Chinchwad",
    projectType: "G+2 Residential Building",
    plotSize: "40 x 60 ft",
    budget: "₹95 Lakhs",
    status: "Quotation Sent",
    websiteIncluded: true,
    date: "29 Sep 2026"
  },
  {
    id: "BV-LEAD-2026-083",
    clientName: "Mr. Vikram Joshi",
    phone: "+91 94220 98765",
    city: "Kothrud, Pune",
    projectType: "Rowhouse Renovation",
    plotSize: "2,200 sq.ft Builtup",
    budget: "₹45 Lakhs",
    status: "New",
    websiteIncluded: false,
    date: "29 Sep 2026"
  }
];

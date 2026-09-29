export interface ProjectData {
  id: string;
  slug: string;
  clientName: string;
  projectTitle: string;
  tagline: string;
  location: string;
  totalAreaSqft: number;
  estimatedBudget: number;
  currency: string;
  startDate: string;
  targetHandover: string;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired' | 'archived';
  architect: {
    name: string;
    firm: string;
    license: string;
    phone: string;
    email: string;
    office: string;
  };
}

export interface FloorPlan {
  id: string;
  floorKey: 'ground' | 'first' | 'terrace' | 'electrical';
  floorName: string;
  sqft: number;
  roomsCount: number;
  highlightSpecs: string[];
  svgType: 'ground' | 'first' | 'terrace' | 'electrical';
}

export interface MediaItem {
  id: string;
  type: 'render_3d' | 'video_walkthrough' | 'site_photo';
  title: string;
  tag: string;
  url: string;
  description: string;
  date?: string;
}

export interface BoqCategory {
  category: string;
  iconName: string;
  subtotal: number;
  items: {
    id: string;
    itemName: string;
    specGrade: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
  }[];
}

export interface Milestone {
  id: string;
  phase: string;
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  completionDate?: string;
  progressPercent: number;
  remarks: string;
  inspectedBy: string;
}

export const SAMPLE_PROJECT: ProjectData = {
  id: "vt-2026-9042",
  slug: "patil-residence-digital-twin",
  clientName: "Er. Rameshwar & Sunita Patil",
  projectTitle: "Patil Residence - Executive Villa Twin",
  tagline: "Ultra-Modern 4BHK Climate-Resilient Sustainable Residence",
  location: "Plot 42, Baner Hills, Pune, Maharashtra",
  totalAreaSqft: 3850,
  estimatedBudget: 9202100,
  currency: "INR",
  startDate: "15 Jan 2026",
  targetHandover: "20 Dec 2026",
  createdAt: "2026-01-15T09:00:00Z",
  expiresAt: "2027-01-15T09:00:00Z",
  status: 'active',
  architect: {
    name: "Er. Dnyaneshwar Adagale",
    firm: "ShreeGonda Civil Consultancy",
    license: "B.Tech Civil Engineering • Structural Consultant",
    phone: "+91 98765 43210",
    email: "contact@shreegondacivil.in",
    office: "Station Road, Shrigonda, Ahmednagar, Maharashtra"
  }
};

export const FLOOR_PLANS: FloorPlan[] = [
  {
    id: "fp-1",
    floorKey: "ground",
    floorName: "Ground Floor Plan (Living & Guest Suite)",
    sqft: 1650,
    roomsCount: 4,
    highlightSpecs: ["Double Height Living Lounge", "Italian Marble Flooring", "Vastu Compliant North-East Puja", "EV Carport Parking"],
    svgType: "ground"
  },
  {
    id: "fp-2",
    floorKey: "first",
    floorName: "First Floor Plan (Master & Kids Suite)",
    sqft: 1450,
    roomsCount: 3,
    highlightSpecs: ["Master Suite with Walk-in Wardrobe", "Private Cantilever Balconies", "Acoustic Home Theater Corner", "Open Study Bridge"],
    svgType: "first"
  },
  {
    id: "fp-3",
    floorKey: "terrace",
    floorName: "Terrace Landscape & Solar Deck",
    sqft: 750,
    roomsCount: 2,
    highlightSpecs: ["6kW Grid-Tied Solar Pergola", "Hydroponic Kitchen Garden", "Rainwater Harvesting Infiltration Tank", "Weatherproof Deck Tiles"],
    svgType: "terrace"
  },
  {
    id: "fp-4",
    floorKey: "electrical",
    floorName: "Electrical, Plumbing & Automation Schematic",
    sqft: 3850,
    roomsCount: 8,
    highlightSpecs: ["KNX Smart Home Automation Conduit", "Concealed CPVC Finolex Lines", "3-Phase Dedicated Load Split", "Surge Protection Class II"],
    svgType: "electrical"
  }
];

export const BOQ_CATEGORIES: BoqCategory[] = [
  {
    category: "Civil & Structural Engineering",
    iconName: "Hammer",
    subtotal: 5495900,
    items: [
      { id: "boq-1", itemName: "Ready Mix Concrete (RMC) M25/M30", specGrade: "Ultratech Super Cement (Design Mix with flyash < 15%)", quantity: 320, unit: "Cu.M", rate: 5800, amount: 1856000 },
      { id: "boq-2", itemName: "High Yield Strength TMT Rebars (Fe 550D)", specGrade: "Tata Tiscon 550D (Corrosion resistant primary bars)", quantity: 24.5, unit: "Metric Ton", rate: 68500, amount: 1678250 },
      { id: "boq-3", itemName: "AAC Lightweight Blocks (Grade 1)", specGrade: "Siporex 600x200x150mm with block adhesive", quantity: 18500, unit: "Nos", rate: 72, amount: 1332000 },
      { id: "boq-4", itemName: "Anti-Termite Soil Treatment & Waterproofing", specGrade: "Dr. Fixit Fastflex + Premise 200 SC (10-Yr Guarantee)", quantity: 3850, unit: "Sq.Ft", rate: 85, amount: 327250 },
      { id: "boq-5", itemName: "Earthwork Excavation in Hard Rock / Murrum", specGrade: "Hydraulic Breaker & Trench Shoring up to 2.5m depth", quantity: 720, unit: "Cu.M", rate: 420, amount: 302400 }
    ]
  },
  {
    category: "Architectural Finishes & Surfaces",
    iconName: "Palette",
    subtotal: 2093200,
    items: [
      { id: "boq-6", itemName: "Full Body Vitrified Slab Flooring", specGrade: "Simpolo / Nexion 1600x800mm Satin Matte Finish", quantity: 3200, unit: "Sq.Ft", rate: 260, amount: 832000 },
      { id: "boq-7", itemName: "Exterior Climate Weather Coat Paint", specGrade: "Asian Paints Apex Ultima Protek (7-Yr System)", quantity: 5400, unit: "Sq.Ft", rate: 78, amount: 421200 },
      { id: "boq-8", itemName: "Double Glazed Low-E Thermal Windows", specGrade: "Fenesta UPVC System 3-Track Sliding with Mosquito Mesh", quantity: 480, unit: "Sq.Ft", rate: 950, amount: 456000 },
      { id: "boq-9", itemName: "Main Door & Internal Engineered Veneer Doors", specGrade: "Teakwood Frame + Flush Solid Core 40mm Marine Grade", quantity: 12, unit: "Nos", rate: 32000, amount: 384000 }
    ]
  },
  {
    category: "Plumbing, Electrical & Smart Home",
    iconName: "Zap",
    subtotal: 1613000,
    items: [
      { id: "boq-10", itemName: "Concealed Sanitary & Brass Fittings", specGrade: "Kohler Avid Series / Grohe Thermostatic Diverters", quantity: 5, unit: "Bath Sets", rate: 98000, amount: 490000 },
      { id: "boq-11", itemName: "FR-LSH Low Smoke Halogen Wires", specGrade: "Polycab Green Wire 1.5 sq.mm - 6.0 sq.mm multi-strand", quantity: 45, unit: "Coils", rate: 3400, amount: 153000 },
      { id: "boq-12", itemName: "Smart Lighting & Distribution MCB Boards", specGrade: "Schneider Electric AvatarOn Modular Switches + IoT Hub", quantity: 1, unit: "Package", rate: 580000, amount: 580000 },
      { id: "boq-13", itemName: "Rooftop Solar 6kW On-Grid Array", specGrade: "Tata Power Solar Bifacial Monocrystalline + SolarEdge Inverter", quantity: 1, unit: "Set", rate: 390000, amount: 390000 }
    ]
  }
];

export const PROGRESS_MILESTONES: Milestone[] = [
  {
    id: "m-1",
    phase: "Phase 1",
    title: "Excavation & PCC Bedding",
    status: "completed",
    completionDate: "12 Feb 2026",
    progressPercent: 100,
    remarks: "Depth verified at 2.4m, hard basalt strata reached, SBC test 260 kN/m² certified.",
    inspectedBy: "Er. Ramesh Adagale"
  },
  {
    id: "m-2",
    phase: "Phase 2",
    title: "Foundation & Plinth Beams",
    status: "completed",
    completionDate: "04 Mar 2026",
    progressPercent: 100,
    remarks: "Isolated trapezoidal footings poured with M25. Anti-termite barrier applied across plinth.",
    inspectedBy: "Structural Auditor V. S. Joshi"
  },
  {
    id: "m-3",
    phase: "Phase 3",
    title: "Ground & First Floor RCC Slabs",
    status: "completed",
    completionDate: "18 Apr 2026",
    progressPercent: 100,
    remarks: "Tata Tiscon 550D reinforcement bar inspection passed. Cube test 28-day strength: 31.8 MPa.",
    inspectedBy: "Ar. Dnyaneshwar Adagale"
  },
  {
    id: "m-4",
    phase: "Phase 4",
    title: "AAC Masonry & Plastering",
    status: "in_progress",
    completionDate: "Estimated 15 May 2026",
    progressPercent: 78,
    remarks: "External double coat sand-faced plaster 75% complete. Internal gyproc plaster under curing.",
    inspectedBy: "Site Supervisor Kiran M."
  },
  {
    id: "m-5",
    phase: "Phase 5",
    title: "Flooring, Electrical & Plumbing",
    status: "upcoming",
    completionDate: "Target 30 Jun 2026",
    progressPercent: 20,
    remarks: "Concealed conduits laid. Floor leveling bed in progress. Tile lots inspected at warehouse.",
    inspectedBy: "Quality Inspector"
  },
  {
    id: "m-6",
    phase: "Phase 6",
    title: "Finishes, Painting & Handover",
    status: "upcoming",
    completionDate: "Target 20 Dec 2026",
    progressPercent: 0,
    remarks: "Final snag list clearance, solar grid sync, deep cleaning, and executive twin handover.",
    inspectedBy: "BIMSpace Digital Quality Head"
  }
];

export const GALLERY_ITEMS: MediaItem[] = [
  {
    id: "g-1",
    type: "render_3d",
    title: "Daytime Contemporary Elevation",
    tag: "3D Architectural Render",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    description: "North-East perspective showcasing double-cantilevered louvers and glass balustrades.",
    date: "Design Version 3.4"
  },
  {
    id: "g-2",
    type: "render_3d",
    title: "Twilight Ambient Lighting Concept",
    tag: "3D Photorealistic V-Ray",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    description: "Warm 3000K LED wash on travertine stone wall cladding with illuminated water fountain.",
    date: "Design Version 3.4"
  },
  {
    id: "g-3",
    type: "render_3d",
    title: "Double-Height Grand Living Lounge",
    tag: "Interior BIM Render",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    description: "Panoramic full-height glazing connecting the private landscaped courtyard to indoor living.",
    date: "Design Version 3.4"
  },
  {
    id: "g-4",
    type: "site_photo",
    title: "Slab Concreting Live Inspection",
    tag: "Live Drone / Site Camera",
    url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=1400&q=80",
    description: "1st Floor slab casting using hydraulic boom placer with vibration monitoring.",
    date: "Captured 18 Apr 2026"
  }
];

export const DOCUMENTS_LIST = [
  {
    title: "Municipal Corporation Sanctioned Drawing",
    authority: "PMC Town Planning Dept",
    fileSize: "14.8 MB",
    fileType: "PDF (Signed)",
    status: "Approved",
    date: "10 Jan 2026",
    id: "doc-pmc-01"
  },
  {
    title: "Structural Stability Certification & Calculations",
    authority: "Apex Structural Engineers Pvt Ltd",
    fileSize: "8.4 MB",
    fileType: "PDF (Audit Certified)",
    status: "Certified",
    date: "12 Jan 2026",
    id: "doc-str-02"
  },
  {
    title: "Soil Investigation & SBC Geo-technical Report",
    authority: "GeoTech Pune Lab",
    fileSize: "5.1 MB",
    fileType: "PDF",
    status: "Verified",
    date: "04 Dec 2025",
    id: "doc-geo-03"
  },
  {
    title: "Complete Architectural CAD Package (.DWG & IFC)",
    authority: "BIMSpace Digital Master BIM",
    fileSize: "68.2 MB",
    fileType: "DWG / IFC Zip",
    status: "Master V3",
    date: "25 Jan 2026",
    id: "doc-bim-04"
  }
];

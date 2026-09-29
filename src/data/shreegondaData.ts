export type Language = 'mr' | 'en' | 'hi';

export interface ConsultancyConfig {
  brandName: {
    mr: string;
    en: string;
    hi: string;
  };
  tagline: {
    mr: string;
    en: string;
    hi: string;
  };
  domain: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  principalEngineer: string;
}

export const SHREEGONDA_CONFIG: ConsultancyConfig = {
  brandName: {
    mr: "श्रीगोंदा सिव्हिल कन्सल्टन्सी",
    en: "ShreeGonda Civil Consultancy",
    hi: "श्रीगोंदा सिविल कंसल्टेंसी"
  },
  tagline: {
    mr: "प्लॅन. डिझाईन. बांधकाम. — विश्वासाची परंपरा",
    en: "Plan. Design. Build.",
    hi: "प्लान. डिजाइन. निर्माण. — विश्वास की परंपरा"
  },
  domain: "shreegondacivil.in",
  location: "Shrigonda, Ahmednagar, Maharashtra 413701",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "contact@shreegondacivil.in",
  principalEngineer: "Er. Dnyaneshwar Adagale (B.Tech Civil - Consultant)"
};

export const SHREEGONDA_PROCESS_STEPS = [
  { step: "01", mr: "क्लायंटची गरज व चर्चा", en: "Client Requirement", desc: "Understanding room needs, family lifestyle, and budget." },
  { step: "02", mr: "जागेची पाहणी व सर्व्हे", en: "Site Visit + Survey", desc: "Contour levels, plot boundaries, road access & soil inspection." },
  { step: "03", mr: "वास्तू व संकल्पना प्लॅनिंग", en: "Concept + Vastu Planning", desc: "Harmonizing Ishan, Agni, Vayu, Nairutya directions." },
  { step: "04", mr: "2D फ्लोअर प्लॅन (AutoCAD)", en: "2D Floor Plan (AutoCAD)", desc: "Municipal bye-laws & NBC 2016 compliant layout." },
  { step: "05", mr: "3D मॉडेल (SketchUp/Revit)", en: "3D Model (SketchUp/Revit)", desc: "Volumetric 3D massing and facade perspectives." },
  { step: "06", mr: "स्ट्रक्चरल डिझाईन (STAAD)", en: "Structural Design (STAAD/ETABS)", desc: "Earthquake-resistant RCC column and beam reinforcement." },
  { step: "07", mr: "अंदाजे खर्च व BOQ (Excel)", en: "Estimation + BOQ (Excel)", desc: "Accurate material calculation based on current DSR rates." },
  { step: "08", mr: "वर्किंग ड्रॉइंग्ज + MEP", en: "Working Drawings + MEP", desc: "Centerline drawings, plumbing shafts, and electrical lines." },
  { step: "09", mr: "टेंडर व कोटेशन मंजुरी", en: "Tender / Quotation", desc: "Comparative contractor bidding and scope finalization." },
  { step: "10", mr: "प्रत्यक्ष काम व साईट सुपरव्हिजन", en: "Execution + Supervision", desc: "Stage-wise concrete cube slump and curing inspection." },
  { step: "11", mr: "मापे व बिलिंग पडताळणी", en: "Measurement + Billing", desc: "Joint verification of completed work before contractor payment." },
  { step: "12", mr: "अ‍ॅज-बिल्ट नकाशे व हँडओव्हर", en: "As-Built Drawings + Handover", desc: "Final drawing archives, personal website link, and key handover." }
];

export const CONSULTANCY_PACKAGES = [
  {
    name: "Basic",
    price: "₹10,000",
    features: [
      "5-Page Interactive Responsive Website",
      "Custom Domain Setup (.in / .com)",
      "1-Year Fast Cloud Hosting",
      "Direct WhatsApp Chat Integration",
      "Contact Inquiry Lead Form",
      "Mobile Responsive View"
    ],
    highlight: false
  },
  {
    name: "Standard",
    price: "₹15,000",
    features: [
      "Everything in Basic Package",
      "Professional Vector Logo Design Kit",
      "Print-Ready Corporate Digital Brochure",
      "Online Estimation & BOQ Calculator",
      "Multi-Language Support (मराठी + English)",
      "1-Year Server Maintenance & Updates"
    ],
    highlight: true
  },
  {
    name: "Premium VIP",
    price: "₹25,000",
    features: [
      "Everything in Standard Package",
      "Full 2D House Plan CAD Integration",
      "Photorealistic 3D Exterior Elevation",
      "1-Year Local Google / Social Media Marketing",
      "Client Login & Project Status Tracking",
      "CAD & Municipal Sanction Document Vault"
    ],
    highlight: false
  }
];

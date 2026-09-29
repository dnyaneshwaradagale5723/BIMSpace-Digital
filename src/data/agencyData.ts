export interface ClientUser {
  id: string;
  clientName: string;
  passcode: string;
  projectName: string;
  location: string;
  totalArea: string;
  budgetEst: string;
  validUntil: string;
  validDaysRemaining: number;
}

export const MOCK_CLIENTS: ClientUser[] = [
  {
    id: "client-01",
    clientName: "Er. Rameshwar & Sunita Patil",
    passcode: "patil2026",
    projectName: "Patil Luxury Villa (Baner Hills)",
    location: "Plot 42, Baner Hills, Pune, Maharashtra",
    totalArea: "3,850 Sq.Ft (G+1+Terrace)",
    budgetEst: "₹1.48 Crore",
    validUntil: "15 Jan 2027",
    validDaysRemaining: 292
  },
  {
    id: "client-02",
    clientName: "Mr. Sachin Kulkarni",
    passcode: "kulkarni2026",
    projectName: "Kulkarni Eco-Twin Residence",
    location: "Prabhat Road, Deccan, Pune",
    totalArea: "2,600 Sq.Ft (4BHK)",
    budgetEst: "₹95 Lakhs",
    validUntil: "24 Nov 2026",
    validDaysRemaining: 240
  }
];

export const AGENCY_INFO = {
  name: "Dnyaneshwar Associates",
  subName: "BIMSpace Digital & Architecture",
  tagline: "Your Dream Home, Digitally Crafted.",
  founder: "Er. / Ar. Dnyaneshwar Adagale",
  qualifications: "B.Tech (Civil) • COA Licensed Architect • BIM & Vastu Specialist",
  whatsappNumber: "+919876543210",
  whatsappTextDefault: "Hello Ar. Dnyaneshwar, I am accessing my Digital Home Package client portal and have a site query regarding:",
  phone: "+91 98765 43210",
  email: "contact@dnyaneshwarassociates.com",
  officeAddress: "Office 402, Elite Business Tower, Baner Road, Pune, Maharashtra 411045",
  activeYear: "2026",
  licenseNo: "COA/2023/CA-88491 | PMC/CIVIL/2024-912"
};

export const STEPS_WORKFLOW = [
  {
    step: "01",
    title: "Client Onboarding & Needs Assessment",
    marathi: "क्लायंटची गरज व जागेची मोजमापे",
    desc: "Site contour analysis, client lifestyle requirements, soil conditions, and municipal set-back verification.",
    icon: "ClipboardCheck"
  },
  {
    step: "02",
    title: "Scientific Vastu & 2D CAD Planning",
    marathi: "वास्तूशास्त्र व 2D नकाशे",
    desc: "Harmonizing cardinal energy zones (Ishan, Agni, Vayu, Nairutya) with NBC 2016 building bylaws.",
    icon: "Compass"
  },
  {
    step: "03",
    title: "Photorealistic 3D & WebGL Visualization",
    marathi: "3D मॉडेलिंग व 4K व्हिज्युअलायझेशन",
    desc: "Interactive WebGL 3D digital model, day/night ambient lighting, and material reflection simulation.",
    icon: "Eye"
  },
  {
    step: "04",
    title: "Personal VIP Portal Launch (1-Year Access)",
    marathi: "प्रायव्हेट वेब पोर्टल (१ वर्षाची व्हॅलिडिटी)",
    desc: "Deploying secure, encrypted web link for client, site supervisor, plumber, and electrical contractors.",
    icon: "Globe"
  },
  {
    step: "05",
    title: "Turnkey Site Execution & Handover",
    marathi: "प्रत्यक्ष साईट बांधकाम व प्रोजेक्ट हँडओव्हर",
    desc: "Stage-wise lab cube testing, RMC concrete pouring supervision, and complete turnkey key handover.",
    icon: "HardHat"
  }
];

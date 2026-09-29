import { useState, useEffect } from 'react';
import {
  Building2,
  Share2,
  Download,
  Phone,
  Mail,
  MapPin,
  Lock,
  Send,
  MessageCircle,
  Sparkles,
  LayoutDashboard,
  CheckCircle2,
  Compass,
  Layers,
  Calculator,
  Globe,
  ArrowUp
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
import { OnlineEstimationCalculator } from './components/OnlineEstimationCalculator';
import { GrowthSecretsModule } from './components/GrowthSecretsModule';
import { LegalFaqKnowledgeHub } from './components/LegalFaqKnowledgeHub';
import { MOCK_CLIENTS, ClientUser } from './data/agencyData';
import { SHREEGONDA_CONFIG, SHREEGONDA_PROCESS_STEPS, CONSULTANCY_PACKAGES, Language } from './data/shreegondaData';

export default function App() {
  const [activeClient, setActiveClient] = useState<ClientUser>(MOCK_CLIENTS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('mr');
  const [contactMessageSent, setContactMessageSent] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      setShowBackToTop(totalScroll > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्कार इंजिनिअर साहेब, मी ${SHREEGONDA_CONFIG.brandName[language]} च्या वेबसाइटवरून संपर्क करत आहे. मला घराच्या 2D/3D प्लॅनिंग व बांधकामाबाबत माहिती हवी आहे.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-slate-950 font-sans">
      {/* Scroll Progress Bar (0 - 100%) */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400 z-50 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(249,115,22,0.8)]"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* 1. Top Enterprise Notice & Multi-Language Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950/40 to-slate-950 border-b border-orange-500/30 py-1.5 px-4 text-xs">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-400 font-mono text-[11px] mx-auto sm:mx-0">
            <Compass className="w-3.5 h-3.5 text-orange-400 animate-spin" style={{ animationDuration: '20s' }} />
            <span className="font-bold uppercase tracking-wider">{SHREEGONDA_CONFIG.brandName[language]}:</span>
            <span className="text-slate-200">{SHREEGONDA_CONFIG.tagline[language]}</span>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-0.5 font-mono text-[11px]">
              {(['mr', 'en', 'hi'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    language === lang
                      ? 'bg-orange-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'mr' ? 'मराठी' : lang === 'en' ? 'ENG' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Admin Switcher */}
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`font-mono text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                isAdminView
                  ? 'bg-orange-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-orange-400 border border-orange-500/40 hover:bg-orange-500/10'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>{isAdminView ? 'Client View' : 'Admin CRM'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header & Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="container py-3.5 flex items-center justify-between gap-4">
          {/* Logo with House + Bridge + Compass theme */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 border border-orange-400/40">
              <Building2 className="w-6 h-6 stroke-[2.3]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg md:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-orange-400 bg-clip-text text-transparent">
                  {SHREEGONDA_CONFIG.brandName[language]}
                </span>
                <span className="text-[10px] font-mono text-orange-400 border border-orange-500/40 px-1.5 py-0.5 rounded bg-orange-950/40 hidden sm:inline">
                  {SHREEGONDA_CONFIG.domain}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {SHREEGONDA_CONFIG.tagline[language]}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <SmartExpiryBadge initialExpiryDays={activeClient.validDaysRemaining} />

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 border-slate-700 hover:border-orange-400"
              title="Client Portal Login"
            >
              <Lock className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Client</span> Login
            </button>

            <button
              onClick={openWhatsApp}
              className="btn-primary bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs py-2 px-3 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span> Chat
            </button>
          </div>
        </div>
      </header>

      {/* 3. Sub Navigation Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-[67px] z-30 overflow-x-auto">
        <div className="container flex items-center gap-1.5 py-2">
          {[
            { label: language === 'mr' ? '3D मॉडेल' : '3D Model', hash: '#model-hero' },
            { label: language === 'mr' ? 'खर्च कॅल्क्युलेटर' : 'Estimation (BOQ)', hash: '#calculator-section' },
            { label: language === 'mr' ? '५ गुप्त सिक्रेट्स (QR/सुरक्षा)' : '5 Growth Secrets', hash: '#secrets-section' },
            { label: language === 'mr' ? '१२ पायऱ्यांची पद्धत' : '12-Step Work Process', hash: '#process-12' },
            { label: language === 'mr' ? '2D फ्लोअर प्लॅन्स' : '2D Floor Plans', hash: '#floorplans-section' },
            { label: language === 'mr' ? 'सर्व्हिसेस व पॅकेजेस' : 'Services & Packages', hash: '#packages-section' },
            { label: language === 'mr' ? 'बांधकाम प्रगती' : 'Progress Timeline', hash: '#timeline-section' },
            { label: language === 'mr' ? 'नकाशे व कागदपत्रे' : 'Document Vault', hash: '#documents-section' },
            { label: language === 'mr' ? 'करारपत्र व FAQ' : 'Legal & FAQs', hash: '#legal-faq-section' },
            { label: language === 'mr' ? 'कोटेशन फॉर्म' : 'Quote Inquiry', hash: '#lead-form-section' }
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

      {/* Main Page Content */}
      <main id="main-content" className="flex-1 space-y-16 md:space-y-24 py-8 md:py-12">
        {/* Toggleable Admin View */}
        {isAdminView ? (
          <section className="container">
            <div className="p-4 mb-6 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between">
              <span className="text-xs text-orange-300 font-mono">
                🔒 श्रीगोंदा सिव्हिल कन्सल्टन्सी - ॲडमिन डॅशबोर्ड व CRM (Leads, Projects & Quotations)
              </span>
              <button
                onClick={() => setIsAdminView(false)}
                className="btn-gold text-xs py-1 px-3"
              >
                Back to Public View
              </button>
            </div>
            <AdminDashboardView />
          </section>
        ) : null}

        {/* Hero Section */}
        <section id="model-hero" className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="badge-gold text-xs">{SHREEGONDA_CONFIG.brandName[language]}</span>
                  <span className="badge-cyan text-xs">Shrigonda & Ahmednagar</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  {language === 'mr'
                    ? 'तुमचे स्वप्नातील घर — 2D, 3D आणि अचूक अंदाजपत्रकासह.'
                    : 'Plan. Design. Build. Your Dream Home in 2D & 3D.'}
                </h1>
                <p className="text-slate-400 mt-3 text-sm md:text-base leading-relaxed">
                  {language === 'mr'
                    ? 'वास्तूशास्त्र, म्युनिसिपल नियम आणि अत्याधुनिक 3D व्हिज्युअलायझेशनसह संपूर्ण घर डिझाईन आणि साईट सुपरव्हिजन सेवा.'
                    : 'Turnkey architectural planning, structural engineering, photorealistic 3D visualization, and online BOQ estimation.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href="#calculator-section" className="btn-gold text-xs py-2.5 px-4 font-bold">
                  <Calculator className="w-4 h-4" />
                  {language === 'mr' ? 'बांधकाम खर्च काढा' : 'Calculate Estimate'}
                </a>
                <a href="#lead-form-section" className="btn-primary text-xs py-2.5 px-4">
                  {language === 'mr' ? 'मोफत सल्ला मिळवा' : 'Get Free Consultation'}
                </a>
                <button onClick={openWhatsApp} className="btn-secondary text-xs py-2.5 px-4 text-emerald-400">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">मुख्य अभियंता</div>
                  <div className="text-sm font-bold text-white mt-0.5 truncate">
                    {SHREEGONDA_CONFIG.principalEngineer.split('(')[0]}
                  </div>
                  <div className="text-[10px] text-orange-400 font-mono mt-1">B.Tech Civil • Consultant</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-400">कार्यालय पत्ता</div>
                  <div className="text-sm font-bold text-slate-200 mt-0.5 truncate">
                    श्रीगोंदा शहर, जि. अहिल्यानगर
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">Pin 413701</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ThreeModelViewer />
            </div>
          </div>
        </section>

        {/* Live Estimation & BOQ Calculator */}
        <section className="container">
          <OnlineEstimationCalculator language={language} />
        </section>

        {/* 5 Hidden Secrets: QR Banner, Privacy PIN, Offline Pack, Revision Policy, Watermarking */}
        <section id="secrets-section" className="container">
          <GrowthSecretsModule
            currentUrl="https://bim-space-digital.vercel.app"
            projectName="Patil Residence - Plot 42, ShreeGonda"
          />
        </section>

        {/* 12-Step Work Process (श्रीगोंदा कार्यपद्धती) */}
        <section id="process-12" className="container">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-900/40">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="badge-cyan text-xs mb-2">
                {language === 'mr' ? 'काम करण्याची खात्रीशीर पायरी' : 'Standard Engineering Workflow'}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {language === 'mr' ? 'प्रकल्पाची १२ टप्प्यांची कार्यपद्धती' : '12-Step Professional Work Process'}
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                {language === 'mr'
                  ? 'प्लॅनपासून ते चावी हातात पडेपर्यंतची पारदर्शक आणि शास्त्रोक्त पद्धत.'
                  : 'From initial site survey to final as-built drawings and keys handover.'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {SHREEGONDA_PROCESS_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-orange-500/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="font-mono text-orange-400 font-extrabold text-lg block mb-1 group-hover:scale-105 transition-transform">
                      Step {step.step}
                    </span>
                    <h4 className="font-bold text-white text-xs mb-1">
                      {language === 'mr' ? step.mr : step.en}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Certified Step
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2D Floor Plan Viewer */}
        <section id="floorplans-section" className="container">
          <FloorPlanViewer />
        </section>

        {/* 3D Walkthrough Gallery */}
        <section id="gallery-section" className="container">
          <MediaWalkthroughGallery />
        </section>

        {/* Services & Turnkey Packages */}
        <section id="packages-section" className="container">
          <ServicesAndPackagesView />
        </section>

        {/* BOQ Material Breakdown */}
        <section id="boq-section" className="container">
          <MaterialBoqAccordion />
        </section>

        {/* Live Site Progress Tracker */}
        <section id="timeline-section" className="container">
          <ProgressTimeline />
        </section>

        {/* Municipal Sanction & Document Hub */}
        <section id="documents-section" className="container">
          <DocumentHub />
        </section>

        {/* Legal Contract Drafting, FAQs & Knowledge Hub */}
        <section id="legal-faq-section" className="container">
          <LegalFaqKnowledgeHub language={language} />
        </section>

        {/* Lead Inquiry Form */}
        <section className="container">
          <ComprehensiveLeadForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-16 pt-12 pb-8">
        <div className="container space-y-12">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-orange-500/30 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="badge-gold text-xs">
                  {language === 'mr' ? 'अधिकृत संपर्क केंद्र' : 'Official Consultancy Office'}
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                  {SHREEGONDA_CONFIG.brandName[language]}
                </h3>
                <p className="text-sm text-slate-300">
                  {SHREEGONDA_CONFIG.principalEngineer} • {SHREEGONDA_CONFIG.tagline[language]}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
                  <a href={`tel:${SHREEGONDA_CONFIG.phone}`} className="flex items-center gap-1.5 text-slate-200 hover:text-orange-400">
                    <Phone className="w-3.5 h-3.5 text-orange-400" /> {SHREEGONDA_CONFIG.phone}
                  </a>
                  <a href={`mailto:${SHREEGONDA_CONFIG.email}`} className="flex items-center gap-1.5 text-slate-200 hover:text-orange-400">
                    <Mail className="w-3.5 h-3.5 text-orange-400" /> {SHREEGONDA_CONFIG.email}
                  </a>
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" /> {SHREEGONDA_CONFIG.location}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2">
                  {language === 'mr' ? 'थेट इंजिनिअरशी संपर्क साधा' : 'Contact Lead Engineer'}
                </h4>
                {contactMessageSent ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    आपला संदेश मिळाला आहे. आम्ही लवकरच संपर्क करू!
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="तुमचे नाव (Full Name)"
                      className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="मोबाईल नंबर (WhatsApp Number)"
                      className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-400"
                    />
                    <button type="submit" className="btn-gold text-xs py-2.5 w-full justify-center">
                      <Send className="w-3.5 h-3.5" /> {language === 'mr' ? 'संदेश पाठवा' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Practice Standards & Technical Services */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-b border-slate-800/80 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Technical Qualification</span>
              <span className="text-white font-bold font-mono">B.Tech Civil Engineering</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Professional Consultant</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Service Coverage</span>
              <span className="text-white font-bold font-mono">Shrigonda & Ahmednagar</span>
              <span className="text-[10px] text-cyan-400 block mt-0.5">Site Visits & Supervision</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Engineering Code</span>
              <span className="text-white font-bold font-mono">IS 456 & NBC 2016</span>
              <span className="text-[10px] text-orange-400 block mt-0.5">Standard Planning Practice</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 font-mono block uppercase">Digital Workflow</span>
              <span className="text-white font-bold font-mono">3D BIM & Digital Twin</span>
              <span className="text-[10px] text-purple-400 block mt-0.5">1-Year Client Portal Access</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-500">
            <div>
              © 2026 <strong>{SHREEGONDA_CONFIG.brandName[language]}</strong>. सर्व हक्क राखीव.
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <a href="#legal-faq-section" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#legal-faq-section" className="hover:text-orange-400 transition-colors">Terms & Conditions</a>
              <span>•</span>
              <a href="#legal-faq-section" className="hover:text-orange-400 transition-colors">Engineering Disclaimer</a>
              <span>•</span>
              <a href="#calculator-section" className="hover:text-orange-400 transition-colors">Contingency Policy</a>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{SHREEGONDA_CONFIG.domain} • Verified Municipal CAD Standards</span>
            </div>
          </div>
        </div>
      </footer>

      <ClientLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentClient={activeClient}
        onClientSwitch={(client) => setActiveClient(client)}
      />

      <WhatsAppSupportButton
        clientName={activeClient.clientName}
        projectName={activeClient.projectName}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-slate-900/90 text-orange-400 border border-orange-500/40 shadow-xl hover:bg-orange-500 hover:text-slate-950 transition-all duration-300 group hover:scale-110 focus:ring-2 focus:ring-orange-400"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}

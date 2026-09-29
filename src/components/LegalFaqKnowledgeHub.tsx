import React, { useState } from 'react';
import {
  FileText,
  Scale,
  HelpCircle,
  ShieldAlert,
  Download,
  Copy,
  CheckCircle2,
  ChevronDown,
  Award,
  Sparkles,
  CalendarCheck
} from 'lucide-react';
import { Language } from '../data/shreegondaData';

interface LegalFaqProps {
  language: Language;
}

export const LegalFaqKnowledgeHub: React.FC<LegalFaqProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'agreement' | 'faq' | 'disclaimer' | 'rates'>('agreement');
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const agreementText = `|| श्री गणेशाय नमः ||
सिव्हिल कन्सल्टन्सी व आर्किटेक्चरल डिझाईन सेवा करारनामा

पक्षकार १ (इंजिनिअर/फर्म):
श्रीगोंदा सिव्हिल कन्सल्टन्सी / BuildVision Studio, स्टेशन रोड, श्रीगोंदा
मुख्य अभियंता: Er. Dnyaneshwar Adagale (B.Tech Civil, Consultant)

पक्षकार २ (क्लायंट/मालक):
नाव: _____________________________________________
पत्ता व मोबा. क्र: ___________________________________
जागा / प्लॉट क्र: ________, गाव/शहर: श्रीगोंदा, जि. अहिल्यानगर
अंदाजे बांधकाम क्षेत्र: ________ चौ. फूट (G+1 निवासी इमारत)

अटी व शर्ती (Scope of Work & Professional Terms):
१. कामाची व्याप्ती: 
   - आर्किटेक्चरल 2D नकाशे (म्युनिसिपल नियमांनुसार)
   - 3D फोटोरेअलिस्टिक एक्सटीरियर एलिव्हेशन व वॉकथ्रू
   - स्ट्रक्चरल डिझाईन (ETABS / IS 456 भूकंपाचा प्रतिकार)
   - १ वर्षाचे वैयक्तिक डिजिटल वेब पोर्टल ॲक्सेस

२. मोफत बदल (Revision Limit):
   - प्राथमिक २D/३D डिझाईनमध्ये जास्तीत जास्त २ (दोन) वेळा मोफत बदल केले जातील.
   - त्यानंतरच्या प्रत्येक बदलासाठी ₹१,५००/- अतिरिक्त शुल्क आकारले जाईल.

३. पेमेंटचे टप्पे (Milestone Payments):
   - टोकन / काम सुरू करताना: २५%
   - २D फायनल प्लॅन व म्युनिसिपल सबमिशन: ३५%
   - स्ट्रक्चरल ड्रॉईंग्स व 3D व्ह्यू फायनल: २५%
   - साईट सुरू होण्यापूर्वी / फायनल फाईल्स देताना: १५%

४. साईट सुरक्षितता नियम (Site Safety First):
   - प्रत्यक्ष बांधकामावेळी कामगारांनी सेफ्टी हेल्मेट, शूज, व हायराईज कामावर सेफ्टी बेल्ट वापरणे अनिवार्य राहील.

५. स्थानिक परवानग्या व सुविधा (Panchayat & Temporary Utilities):
   - तात्पुरते बांधकाम वीज कनेक्शन (MSEB) व पाण्याची सोय क्लायंटच्या सहकार्याने पूर्वनियोजित राहील.

६. आकस्मिक खर्च निधी (Contingency Buffer 5-7%):
   - सिमेंट/स्टीलच्या अचानक दरवाढीपासून संरक्षणासाठी ५ ते ७% राखीव निधी इस्टिमेशनमध्ये गृहीत धरला आहे.

७. माती परीक्षण (Soil Testing):
   - सुरक्षित फाउंडेशनसाठी SBC माती चाचणी आवश्यक राहील; त्यानुसारच फूटिंग अंतिम राहील.

८. डिजिटल पोर्टल व्हॅलिडिटी:
   - हे पोर्टल ३६५ दिवस (१ वर्ष) कार्यरत राहील. रिन्यूअलसाठी वार्षिक मेंटेनन्स लागू असेल.

पक्षकार १ (इंजिनिअर स्वाक्षरी)               पक्षकार २ (क्लायंट स्वाक्षरी)`;

  const handleCopyAgreement = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(agreementText);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    }
  };

  const faqs = [
    {
      q: language === 'mr' ? '२D आणि ३D प्लॅन बनवण्यासाठी किती वेळ लागतो?' : 'How long does 2D planning and 3D elevation take?',
      a: language === 'mr'
        ? 'प्राथमिक २D प्लॅन ३ ते ५ दिवसांत तयार होतो. क्लायंटच्या मंजुरीनंतर ३D मॉडेल व स्ट्रक्चरल डिझाईन पुढील ४ ते ६ दिवसांत पूर्ण होते.'
        : 'Initial 2D municipal floor plans take 3-5 days. Following client approval, the 3D elevation and structural analysis take another 4-6 business days.'
    },
    {
      q: language === 'mr' ? 'क्लायंट पोर्टलची लिंक किती दिवस चालू राहील?' : 'How long does the personal client website remain active?',
      a: language === 'mr'
        ? 'प्रत्येक क्लायंटचे वैयक्तिक पोर्टल १ वर्ष (३६५ दिवस) पूर्णपणे मोफत आणि सुरक्षित राहील. बांधकाम पूर्ण झाल्यानंतर क्लायंट इच्छेनुसार रिन्यू करू शकतो.'
        : 'Every private client project portal remains 100% active and cloud-hosted for 365 days (1 year), accessible by site engineers, contractors, and electricians.'
    },
    {
      q: language === 'mr' ? 'प्लॅनमध्ये नंतर बदल करायचे असल्यास अतिरिक्त शुल्क लागेल का?' : 'What is the revision policy for changes in design?',
      a: language === 'mr'
        ? 'प्रोजेक्टमध्ये २ मोफत रिव्हिजन्स (बदल) समाविष्ट आहेत. त्यानंतरच्या प्रत्येक बदलासाठी कामाच्या शिस्तीनुसार ₹१,५००/- नाममात्र शुल्क आकारले जाते.'
        : '2 comprehensive free revisions are included. Any subsequent layout changes after sign-off incur a standard engineering fee of ₹1,500 per iteration.'
    },
    {
      q: language === 'mr' ? 'श्रीगोंदा आणि अहिल्यानगर परिसरासाठी वास्तूशास्त्र पाळले जाते का?' : 'Are plans aligned with Vastu Shastra principles?',
      a: language === 'mr'
        ? 'होय, ईशान्य (देवघर/पाणी), आग्नेय (स्वयंपाकघर), आणि नैऋत्य (मास्टर बेडरूम) या वैज्ञानिक व वास्तू नियमांचे १००% तंतोतंत पालन केले जाते.'
        : 'Yes, all residential plans strictly balance Ishan (water/mandir), Agni (kitchen), and Nairutya (master bedroom) with natural cross-ventilation.'
    },
    {
      q: language === 'mr' ? 'इस्टिमेशन आणि BOQ मधील खर्चाची अचूकता किती असते?' : 'How accurate is the online BOQ cost calculator?',
      a: language === 'mr'
        ? 'आमचे कॅल्क्युलेटर PWD / DSR २०२६ च्या चालू स्थानिक बाजारभावावर (सिमेंट, स्टील, वाळू, विटा, लेबर) आधारित असल्याने ९५%+ अचूकता मिळते.'
        : 'Our BOQ estimator uses active DSR 2026 Maharashtra rates for cement, steel, sand, and labor, yielding over 95% budget fidelity.'
    }
  ];

  return (
    <div id="legal-faq-section" className="w-full">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-orange-500/30 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-950 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="badge-gold text-xs mb-2">Legal, FAQ & Knowledge Hub</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {language === 'mr' ? 'कायदेशीर करारनामा, विचारले जाणारे प्रश्न व अटी' : 'Client Legal Agreement, FAQs & Engineering Standards'}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              {language === 'mr'
                ? 'कामात १००% पारदर्शकता, लीगल स्टॅम्प पेपर ड्राफ्ट, वारंवार विचारले जाणारे प्रश्न आणि व्यावसायिक हमी.'
                : '100% transparent contractual frameworks, stamp-paper client agreement draft, FAQs, and engineering code compliance.'}
            </p>
          </div>

          {/* Navigation Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            {[
              { id: 'agreement', label: language === 'mr' ? 'करारपत्र (Draft)' : 'Contract Draft', icon: FileText },
              { id: 'faq', label: language === 'mr' ? 'प्रश्नोत्तरे (FAQ)' : 'Client FAQs', icon: HelpCircle },
              { id: 'disclaimer', label: language === 'mr' ? 'कायदेशीर सूचना' : 'Disclaimer', icon: ShieldAlert }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-orange-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Legal Agreement Draft */}
        {activeTab === 'agreement' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                {language === 'mr' ? '१०० रुपयांच्या स्टॅम्प पेपरवर किंवा लेटरहेडवर वापरण्यासाठी तयार' : 'Ready for ₹100 Stamp Paper or Consultancy Letterhead'}
              </span>
              <button
                onClick={handleCopyAgreement}
                className="btn-gold text-xs py-1.5 px-3 flex items-center gap-1 font-bold"
              >
                {copiedDraft ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-950" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedDraft ? (language === 'mr' ? 'कॉपी झाले!' : 'Copied!') : (language === 'mr' ? 'ड्राफ्ट कॉपी करा' : 'Copy Draft')}
              </button>
            </div>

            <pre className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto selection:bg-orange-500 selection:text-slate-950">
              {agreementText}
            </pre>
          </div>
        )}

        {/* Tab 2: Frequently Asked Questions */}
        {activeTab === 'faq' && (
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full text-left p-4.5 flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                  >
                    <span className="text-sm font-bold text-white flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center text-xs font-mono">
                        Q{idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-orange-400' : ''}`} />
                  </button>
                  {isExpanded && (
                    <div className="p-4.5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-900 mt-2">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Official Engineering Disclaimer */}
        {activeTab === 'disclaimer' && (
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3.5 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <ShieldAlert className="w-4.5 h-4.5" />
              {language === 'mr' ? 'व्यावसायिक व कायदेशीर अस्वीकरण (Engineering Disclaimer)' : 'Professional Engineering & Statutory Disclaimer'}
            </div>
            <p>
              १. <strong>3D Visualization & Architectural Renders:</strong> संकेतस्थळावर दर्शविलेले ३D रेंडर्स व वॉकथ्रू हे संकल्पना व सौंदर्यात्मक पूर्वदर्शनासाठी (Aesthetic Pre-visualization) आहेत. प्रत्यक्ष जागेवरील साईट कंडीशन, म्युनिसिपल मर्यादा किंवा स्ट्रक्चरल इंजिनिअरच्या अंतिम मंजुरीनुसार बांधकाम अंतिम राहील.
            </p>
            <p>
              २. <strong>Structural Safety (IS 456 & NBC 2016):</strong> कॉलम साईज, फूटिंग डेप्थ आणि लोखंडाचे प्रमाण हे अधिकृत स्ट्रक्चरल इंजिनिअरच्या स्वाक्षरीसह मिळणाऱ्या 'गुड फॉर कन्स्ट्रक्शन' (GFC) ड्रॉईंगनुसारच अंमलात आणावे.
            </p>
            <p>
              ३. <strong>म्युनिसिपल मंजुरी (Statutory Approvals):</strong> नगरपरिषद / ग्रामपंचायत नियमांनुसार बांधकाम परवाना (Sanction Plan) आणि जागेचे प्रत्यक्ष दस्तऐवज पडताळूनच बांधकाम सुरू करावे.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

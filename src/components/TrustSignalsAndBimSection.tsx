import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Award, Building, Layers, Eye, Users } from 'lucide-react';
import { Language } from '../data/shreegondaData';

interface TrustSignalsProps {
  language: Language;
}

export const TrustSignalsAndBimSection: React.FC<TrustSignalsProps> = ({ language }) => {
  const testimonials = [
    {
      name: language === 'mr' ? 'श्री. रमेश पाटील' : 'Mr. Ramesh Patil',
      role: language === 'mr' ? 'G+2 निवासी बंगलो मालक' : 'G+2 Residential Villa Owner',
      location: language === 'mr' ? 'स्टेशन रोड, श्रीगोंदा' : 'Station Road, Shrigonda',
      rating: 5,
      review:
        language === 'mr'
          ? 'इंजिनिअर ज्ञानेश्वर यांनी घराचे काम सुरू होण्यापूर्वीच 3D Digital Twin दाखवले. वास्तू आणि सूर्यप्रकाशाचे नियोजन अप्रतिम झाले. बांधकाम खर्चाचा अचूक अंदाज मिळाल्यामुळे बजेट ओव्हररन झाले नाही!'
          : 'Er. Dnyaneshwar provided a full 3D Digital Twin before ground excavation. The daylight and Vastu harmony were top-notch, and the BOQ estimate kept us exactly within our budget!'
    },
    {
      name: language === 'mr' ? 'डॉ. सचिन वाघमारे' : 'Dr. Sachin Waghmare',
      role: language === 'mr' ? 'कमर्शियल क्लिनिक + निवास' : 'Commercial Clinic + Residence',
      location: language === 'mr' ? 'अहिल्यानगर रोड, श्रीगोंदा' : 'Ahmednagar Road, Shrigonda',
      rating: 5,
      review:
        language === 'mr'
          ? 'ETABS स्ट्रक्चरल डिझाईन आणि 2D नकाशे म्युनिसिपल नियमांनुसार तातडीने मंजूर झाले. संपूर्ण १ वर्ष आम्हाला आमच्या घराची वैयक्तिक वेब लिंक मिळाली, ज्यामुळे कामावर लक्ष ठेवणे सोपे गेले.'
          : 'STAAD/ETABS structural drawings passed municipal sanctions effortlessly. Having our personal live web portal link made tracking civil progress incredibly convenient.'
    },
    {
      name: language === 'mr' ? 'श्री. अमोल जगताप' : 'Mr. Amol Jagtap',
      role: language === 'mr' ? 'फार्महाऊस व्हिला प्रकल्प' : 'Farmhouse Villa Project',
      location: language === 'mr' ? 'काष्टी, जि. अहिल्यानगर' : 'Kashti, Ahmednagar District',
      rating: 5,
      review:
        language === 'mr'
          ? 'प्लॉटचा स्लोप आणि ड्रेनेजचा अभ्यास करून इंजिनिअर साहेबांनी केलेला कंटूर सर्व्हे अत्यंत अचूक होता. कोणत्याही चुकीच्या दाव्यांशिवाय दर्जेदार इंजिनिअरिंग सल्ला येथे मिळतो.'
          : 'Contour site survey and natural drainage planning saved us lakhs in plinth filling. Genuine engineering professionalism with transparent DSR rates.'
    }
  ];

  const bimMaturityLevels = [
    {
      level: 'LOD 100',
      title: language === 'mr' ? 'संकल्पना व 3D व्हॉल्यूम' : 'Conceptual Massing',
      desc: language === 'mr' ? 'प्लॉट साईझ, एफएसआय आणि इमारतीचा प्राथमिक आकार व ओरिएंटेशन.' : 'Plot boundaries, FSI consumption, and orientation massing.'
    },
    {
      level: 'LOD 200',
      title: language === 'mr' ? 'आर्किटेक्चरल सिस्टिम' : 'Schematic Architectural',
      desc: language === 'mr' ? 'भिंतींची जाडी, खिडक्या-दारे, खोल्यांचे क्षेत्रफळ व 2D नकाशे.' : 'Wall assemblies, openings, spatial layouts, and room dimensions.'
    },
    {
      level: 'LOD 300',
      title: language === 'mr' ? 'स्ट्रक्चरल व अचूक मापे' : 'Precise Structural Engineering',
      desc: language === 'mr' ? 'कॉलम, बीम, RCC स्तंभांचे स्टील रिइन्फोर्समेंट व ETABS मॉडेल.' : 'RCC columns, beams, rebar schedules, and structural geometry.'
    },
    {
      level: 'LOD 350 / 400',
      title: language === 'mr' ? 'MEP व क्लॅश डिटेक्शन' : 'MEP Coordination & Fabrication',
      desc: language === 'mr' ? 'प्लम्बिंग, ड्रेनेज पाईप्स आणि वायरिंगचे बीमसोबत क्लॅश डिटेक्शन.' : 'Plumbing shafts, electrical runs, and clash avoidance.'
    }
  ];

  const achievements = [
    { number: '60+', label: language === 'mr' ? 'यशस्वी प्रकल्प' : 'Projects Designed' },
    { number: '100%', label: language === 'mr' ? 'IS 456 & NBC नियम' : 'NBC 2016 Compliant' },
    { number: '07+', label: language === 'mr' ? 'वर्षे प्रत्यक्ष अनुभव' : 'Years Field Experience' },
    { number: '4 तासांत', label: language === 'mr' ? 'प्रतिसाद हमी' : 'Response Guarantee' }
  ];

  return (
    <div className="w-full space-y-12 my-12">
      {/* 1. Statistics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center hover:border-orange-500/40 transition-colors"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-orange-400 font-mono">
              {item.number}
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1 uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Client Testimonials (Social Proof) */}
      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="badge-gold text-xs">
            {language === 'mr' ? 'विश्वासार्हता व ग्राहक अभिप्राय' : 'Verified Client Testimonials'}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {language === 'mr' ? 'स्थानिक ग्राहकांचा आमच्या कामावर विश्वास' : 'Trusted by Homeowners in Shrigonda & Ahmednagar'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'mr'
              ? 'श्रीगोंदा आणि अहिल्यानगर परिसरातील प्रत्यक्षात पूर्ण झालेल्या कामांचे प्रामाणिक अनुभव.'
              : 'Real homeowner experiences from completed residential and commercial projects.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col justify-between hover:border-orange-500/40 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-[11px] text-orange-400 font-mono">{t.role}</div>
                  <div className="text-[10px] text-slate-500">{t.location}</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. BIM Standards & LOD Technical Breakdown */}
      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-cyan-500/30 bg-slate-900/60 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="badge-cyan text-xs mb-2">BIM Framework & Technical Delivery</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              {language === 'mr' ? 'BIM LOD (Level of Development) मानके' : 'BIM Maturity & LOD Framework'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {language === 'mr'
                ? 'जागतिक दर्जाचे BIM मानके वापरून बांधकाम त्रुटी आणि अतिरिक्त खर्च शून्य केला जातो.'
                : 'ISO 19650 aligned digital workflow minimizing site re-work and material wastage.'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-cyan-400">
            <Layers className="w-4 h-4" /> ISO 19650 Ready
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {bimMaturityLevels.map((b, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/50">
                  {b.level}
                </span>
                <h4 className="text-sm font-bold text-white mt-3 mb-1">{b.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-900 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Standard Scope
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

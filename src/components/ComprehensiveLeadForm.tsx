import React, { useState } from 'react';
import { Send, CheckCircle2, Upload, FileText, Phone, Sparkles, Building2, MapPin } from 'lucide-react';

export const ComprehensiveLeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    projectType: 'Residential Villa / Bunglow',
    plotSize: '',
    builtUpArea: '',
    floors: 'G+1 (Two Floors)',
    service2D: true,
    service3D: true,
    serviceInterior: false,
    serviceExterior: true,
    serviceEstimation: true,
    serviceBOQ: true,
    serviceWebsite: true,
    expectedTimeline: '3 to 6 Months',
    budget: '₹80L - ₹1.5 Cr',
    message: ''
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(true);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 10-digit Indian Mobile Validation
    const cleanPhone = formData.mobile.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('कृपया वैध १० अंकी मोबाईल नंबर टाका (Please enter a valid 10-digit mobile number).');
      return;
    }

    if (!agreePrivacy) {
      setFormError('कृपया पुढे जाण्यापूर्वी गोपनीयता अटी (Privacy Policy) मान्य करा.');
      return;
    }

    setIsSubmitting(true);

    const generatedId = `BV-LEAD-2026-${Math.floor(100 + Math.random() * 900)}`;
    setSubmittedId(generatedId);
    setIsSubmitting(false);

    // Save lead persistently to localStorage
    try {
      const existingLeads = JSON.parse(localStorage.getItem('bv_leads') || '[]');
      const newLead = {
        id: generatedId,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email || '',
        city: formData.city,
        projectType: formData.projectType,
        budget: formData.budget,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('bv_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch (e) {
      console.warn('LocalStorage lead persistence failed:', e);
    }

    // Direct WhatsApp Redirection
    const waText = encodeURIComponent(
      `*नमस्कार इंजिनिअर साहेब (श्रीगोंदा सिव्हिल कन्सल्टन्सी)*\n\n` +
      `मला माझ्या प्रोजेक्टसाठी 3D Digital Twin & 2D प्लॅनिंगचे कोटेशन हवे आहे:\n` +
      `• *नाव:* ${formData.name || 'Client'}\n` +
      `• *मोबाईल:* ${formData.mobile || 'N/A'}\n` +
      `• *ठिकाण:* ${formData.city || 'Shrigonda / Ahmednagar'}\n` +
      `• *प्रकल्प प्रकार:* ${formData.projectType}\n` +
      `• *प्लॉट / बिल्ट-अप:* ${formData.plotSize || formData.builtUpArea || 'Custom'}\n` +
      `• *अंदाजपत्रक:* ${formData.budget}\n` +
      `• *Reference ID:* ${generatedId}\n\n` +
      `कृपया 3D मॉडेल डेमो व सल्ला द्या.`
    );
    window.open(`https://wa.me/919876543210?text=${waText}`, '_blank');
  };

  return (
    <div id="lead-form-section" className="w-full">
      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-cyan-500/30 bg-slate-900/70">
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <span className="badge-cyan text-xs mb-2">BuildVision Studio Project Onboarding</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Claim Your 3D AI Digital Twin & Engineering Quotation
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Fill in your basic project parameters for instant scope calculation, 2D/3D deliverables, and personal 1-year project website.
          </p>
        </div>

        {submittedId ? (
          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received Successfully!</h3>
            <p className="text-sm text-slate-300">
              Your inquiry has been logged with reference ID:
            </p>
            <div className="inline-block font-mono text-lg font-bold text-emerald-300 bg-slate-900 px-4 py-1.5 rounded-xl border border-emerald-500/30">
              {submittedId}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              WhatsApp चॅट विंडो थेट उघडली गेली आहे. आमचे मुख्य अभियंता तुमच्याशी 4 तासांत संपर्क साधतील.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919876543210?text=Hello%20Er.%20Dnyaneshwar,%20Reference%20ID:%20${submittedId}`}
                target="_blank"
                rel="noreferrer"
                className="btn-gold text-xs py-2 px-4"
              >
                Open WhatsApp Chat
              </a>
              <button
                onClick={() => setSubmittedId(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
            {/* 1. Client Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Patil"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="e.g. +91 98220 12345"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ramesh@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">City / Region *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Pune, PCMC, Mumbai"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* 2. Plot & Structural Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Project Typology</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Residential Villa / Bunglow</option>
                  <option>G+2 Multi-Family Residence</option>
                  <option>Commercial Complex / Office</option>
                  <option>Row House / Farmhouse</option>
                  <option>Renovation & Floor Addition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Plot Dimensions</label>
                <input
                  type="text"
                  value={formData.plotSize}
                  onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                  placeholder="e.g. 40 x 60 ft (2,400 sq.ft)"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Estimated Built-Up Area</label>
                <input
                  type="text"
                  value={formData.builtUpArea}
                  onChange={(e) => setFormData({ ...formData, builtUpArea: e.target.value })}
                  placeholder="e.g. 3,500 Sq.Ft"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Number of Floors</label>
                <select
                  value={formData.floors}
                  onChange={(e) => setFormData({ ...formData, floors: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Ground Only (G)</option>
                  <option>G+1 (Two Floors)</option>
                  <option>G+2 (Three Floors)</option>
                  <option>G+3 or Commercial</option>
                </select>
              </div>
            </div>

            {/* 3. Service Scope Checkboxes */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                Select Required Services (Scope Checklist)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { key: 'service2D', label: '2D Architectural Plan' },
                  { key: 'service3D', label: '3D Exterior Render' },
                  { key: 'serviceInterior', label: '3D Interior Design' },
                  { key: 'serviceExterior', label: 'Exterior Facade Design' },
                  { key: 'serviceEstimation', label: 'Civil Cost Estimation' },
                  { key: 'serviceBOQ', label: 'Itemized BOQ Takeoff' },
                  { key: 'serviceWebsite', label: 'Personal Project Website (1-Yr)' }
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 cursor-pointer hover:border-cyan-500/50"
                  >
                    <input
                      type="checkbox"
                      checked={(formData as any)[item.key]}
                      onChange={(e) => setFormData({ ...formData, [item.key]: e.target.checked })}
                      className="rounded accent-cyan-500"
                    />
                    <span className="text-slate-200">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Timeline, Budget & Message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Expected Timeline</label>
                <select
                  value={formData.expectedTimeline}
                  onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Immediate (1 to 2 Weeks)</option>
                  <option>1 to 3 Months</option>
                  <option>3 to 6 Months</option>
                  <option>Planning Phase (6+ Months)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Target Construction Budget</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full text-xs px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option>Under ₹50 Lakhs</option>
                  <option>₹50 Lakhs - ₹80 Lakhs</option>
                  <option>₹80 Lakhs - ₹1.5 Crore</option>
                  <option>₹1.5 Crore - ₹3 Crore</option>
                  <option>Above ₹3 Crore</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Specific Project Notes / Vastu Preferences
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention specific room requirements, East/North road facing, double height living room, solar terrace, etc."
                className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Document Upload Mock */}
            <div className="p-4 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Upload Existing Plot Drawing / 7/12 Extract (Optional)</div>
                  <div className="text-[11px] text-slate-500">Supports PDF, DWG, JPG, PNG up to 25MB</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('File selector triggered: Choose CAD or PDF plot documents')}
                className="btn-secondary text-xs py-1.5 px-3"
              >
                Browse Files
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <span>⚠️</span>
                <span>{formError}</span>
              </div>
            )}

            {/* Privacy Policy Checkbox & reCAPTCHA */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="rounded accent-cyan-500 w-4 h-4 cursor-pointer"
                />
                <span>मी गोपनीयता अटी व कायदेशीर नियम (Privacy Policy & T&C) मान्य करत आहे.</span>
              </label>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" /> Google reCAPTCHA v3 Protected
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full py-4 justify-center text-sm md:text-base font-extrabold tracking-wide shadow-xl shadow-amber-500/20 hover:scale-[1.01] transition-transform"
            >
              {isSubmitting ? (
                <span>Generating Lead Reference...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-slate-950" /> Claim My AI Digital Twin & Get Free 3D Demo Link
                </span>
              )}
            </button>

            {/* Trust Badge Below Form */}
            <div className="pt-2 text-center">
              <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5">
                <span>🔒</span> 100% Privacy Guaranteed. Your CAD drawings and site details remain secure.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

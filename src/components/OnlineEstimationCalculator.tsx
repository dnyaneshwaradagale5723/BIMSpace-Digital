import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, RotateCcw, Building, FileSpreadsheet } from 'lucide-react';

interface EstimationProps {
  language: 'mr' | 'en' | 'hi';
}

export const OnlineEstimationCalculator: React.FC<EstimationProps> = ({ language }) => {
  const [builtUpArea, setBuiltUpArea] = useState<number>(1500);
  const [constructionQuality, setConstructionQuality] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [floorsCount, setFloorsCount] = useState<number>(2);

  // Rate per sq.ft benchmark
  const rates = {
    standard: 1850,
    premium: 2350,
    luxury: 3100
  };

  const totalCost = builtUpArea * rates[constructionQuality] * floorsCount;

  // Granular breakdown percentages
  const cementCost = Math.round(totalCost * 0.16);
  const steelCost = Math.round(totalCost * 0.18);
  const sandAggregateCost = Math.round(totalCost * 0.12);
  const masonryCost = Math.round(totalCost * 0.10);
  const finishingTilesCost = Math.round(totalCost * 0.16);
  const plumbingElectricalCost = Math.round(totalCost * 0.12);
  const laborContractCost = Math.round(totalCost * 0.16);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="calculator-section" className="w-full">
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-orange-500/30 bg-slate-900/80">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-orange-500/20">
              <Calculator className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="badge-gold text-xs">
                {language === 'mr' ? 'लाईव्ह बांधकाम खर्च कॅल्क्युलेटर' : 'Live Construction Cost Calculator'}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                {language === 'mr' ? 'घर बांधकामाचा ऑनलाइन अंदाज (BOQ)' : 'Home Construction Cost & BOQ Estimator'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-orange-400">
            <span>DSR Maharashtra 2026 Indexed</span>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-2xl bg-slate-950/60 border border-slate-800 mb-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              {language === 'mr' ? 'प्लॉटवरील बांधकाम क्षेत्र (Sq.Ft)' : 'Built-Up Area per Floor (Sq.Ft)'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="500"
                max="25000"
                step="50"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="w-full text-base font-bold font-mono px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-orange-400 focus:outline-none focus:border-orange-500"
              />
              <span className="text-xs text-slate-400 font-mono">Sq.Ft</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              {language === 'mr' ? 'मटेरियल क्वॉलिटी ग्रेड' : 'Construction Quality Grade'}
            </label>
            <select
              value={constructionQuality}
              onChange={(e) => setConstructionQuality(e.target.value as any)}
              className="w-full text-sm font-semibold px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
            >
              <option value="standard">Standard (₹1,850/sq.ft)</option>
              <option value="premium">Premium Quality (₹2,350/sq.ft)</option>
              <option value="luxury">Luxury Ultra (₹3,100/sq.ft)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              {language === 'mr' ? 'मजल्यांची संख्या' : 'Total Number of Floors'}
            </label>
            <select
              value={floorsCount}
              onChange={(e) => setFloorsCount(Number(e.target.value))}
              className="w-full text-sm font-semibold px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-orange-500"
            >
              <option value={1}>Ground Floor Only (G)</option>
              <option value={2}>Ground + First Floor (G+1)</option>
              <option value={3}>Ground + Two Floors (G+2)</option>
              <option value={4}>Ground + Three Floors (G+3)</option>
            </select>
          </div>
        </div>

        {/* Estimated Output Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-orange-950/40 via-slate-950 to-slate-950 border border-orange-500/40 text-center space-y-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              {language === 'mr' ? 'अंदाजे एकूण प्रकल्प खर्च' : 'Total Projected Estimate'}
            </span>
            <div className="text-3xl md:text-4xl font-extrabold text-orange-400 font-mono">
              {formatINR(totalCost)}
            </div>
            <p className="text-xs text-slate-400">
              {builtUpArea * floorsCount} Sq.Ft total builtup • {floorsCount} Floors • {constructionQuality.toUpperCase()} Specs
            </p>
            <button
              onClick={() => alert(`Detailed BOQ Estimation Sheet exported for ${builtUpArea * floorsCount} sq.ft.`)}
              className="btn-gold w-full text-xs py-2.5 mt-3 justify-center"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              {language === 'mr' ? 'सविस्तर BOQ रिपोर्ट डाउनलोड करा' : 'Export Excel BOQ'}
            </button>
          </div>

          {/* Granular Material Split */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block font-mono">सिमेंट (16%)</span>
              <span className="text-white font-bold font-mono text-sm">{formatINR(cementCost)}</span>
              <span className="text-[10px] text-slate-500 block">Ultratech 53 Grade</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block font-mono">स्टील / लोखंड (18%)</span>
              <span className="text-white font-bold font-mono text-sm">{formatINR(steelCost)}</span>
              <span className="text-[10px] text-slate-500 block">Tata Tiscon Fe550D</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block font-mono">वाळू व खडी (12%)</span>
              <span className="text-white font-bold font-mono text-sm">{formatINR(sandAggregateCost)}</span>
              <span className="text-[10px] text-slate-500 block">Washed VSI Sand & Metal</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block font-mono">विटा / AAC ब्लॉक्स (10%)</span>
              <span className="text-white font-bold font-mono text-sm">{formatINR(masonryCost)}</span>
              <span className="text-[10px] text-slate-500 block">Siporex Grade 1 Blocks</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block font-mono">टाईल्स व फिनिशिंग (16%)</span>
              <span className="text-white font-bold font-mono text-sm">{formatINR(finishingTilesCost)}</span>
              <span className="text-[10px] text-slate-500 block">Vitrified + Apex Paint</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-slate-400 block font-mono">मजुरी / लेबर खर्च (16%)</span>
              <span className="text-white font-bold font-mono text-sm">{formatINR(laborContractCost)}</span>
              <span className="text-[10px] text-slate-500 block">Civil Contractor Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, FileSpreadsheet, ShieldCheck, DollarSign } from 'lucide-react';
import * as XLSX from 'xlsx';
import { BOQ_CATEGORIES } from '../data/projectData';

export const MaterialBoqAccordion: React.FC = () => {
  const [openCategories, setOpenCategories] = useState<string[]>([BOQ_CATEGORIES[0].category]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const totalProjectBudget = BOQ_CATEGORIES.reduce((acc, cat) => acc + cat.subtotal, 0);

  const handleExportExcel = () => {
    const rows: any[] = [];
    rows.push(['श्रीगोंदा सिव्हिल कन्सल्टन्सी / SHREEGONDA CIVIL CONSULTANCY']);
    rows.push(['BILL OF QUANTITIES (BOQ) & MATERIAL ESTIMATION REPORT']);
    rows.push(['Project: Patil Luxury Villa (Baner Hills, Pune) • 3,850 Sq.Ft']);
    rows.push(['Date: 29 September 2026 • Verified Standard: IS 456 & NBC 2016']);
    rows.push([]);
    rows.push(['Sr. No.', 'Category', 'Item Description', 'Quality Standard & Grade', 'Quantity', 'Unit', 'Rate (INR)', 'Amount (INR)']);

    let sr = 1;
    BOQ_CATEGORIES.forEach((cat) => {
      cat.items.forEach((item) => {
        rows.push([
          sr++,
          cat.category,
          item.itemName,
          item.specGrade,
          item.quantity,
          item.unit,
          item.rate,
          item.amount
        ]);
      });
      rows.push(['', '', '', `SUBTOTAL - ${cat.category.toUpperCase()}`, '', '', '', cat.subtotal]);
    });

    rows.push([]);
    rows.push(['', '', '', 'GRAND TOTAL PROJECT ESTIMATE', '', '', '', totalProjectBudget]);

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'BOQ_Estimate');
    XLSX.writeFile(workbook, 'ShreeGonda_Civil_BOQ_Estimation_2026.xlsx');
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="badge-gold text-xs mb-2">Quantity Survey & Cost Engineering</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Material Specifications & BOQ Breakdown
          </h2>
          <p className="text-sm text-slate-400">
            Granular structural grade allocations, certified supplier codes, and audited budget estimates.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/90 border border-amber-500/30 p-3 rounded-2xl">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Projected Turnkey Cost</div>
            <div className="text-xl md:text-2xl font-bold text-amber-400 font-mono">
              {formatCurrency(totalProjectBudget)}
            </div>
          </div>
          <button
            onClick={handleExportExcel}
            className="btn-gold text-xs py-2 px-3"
            title="Download Excel BOQ"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export BOQ (.XLSX)
          </button>
        </div>
      </div>

      {/* Categories Accordions */}
      <div className="space-y-4">
        {BOQ_CATEGORIES.map((cat) => {
          const isOpen = openCategories.includes(cat.category);
          const percentOfTotal = Math.round((cat.subtotal / totalProjectBudget) * 100);

          return (
            <div
              key={cat.category}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-cyan-500/40 bg-slate-900/70 shadow-lg shadow-cyan-500/5'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Category Bar */}
              <button
                onClick={() => toggleCategory(cat.category)}
                className="w-full p-4 md:p-5 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                      {cat.category}
                      <span className="badge-cyan text-[11px] py-0.5">{percentOfTotal}% of Budget</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {cat.items.length} Line items specified & verified
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-400">Subtotal</div>
                    <div className="text-sm md:text-base font-bold text-white font-mono">
                      {formatCurrency(cat.subtotal)}
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-800/80 text-slate-300">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Items Table Drawer */}
              {isOpen && (
                <div className="border-t border-slate-800/80 px-3 md:px-5 py-4 bg-slate-950/60 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase font-mono">
                        <th className="py-2.5 px-3">Item Description</th>
                        <th className="py-2.5 px-3">Quality Standard & Grade</th>
                        <th className="py-2.5 px-3 text-right">Quantity</th>
                        <th className="py-2.5 px-3 text-right">Rate</th>
                        <th className="py-2.5 px-3 text-right">Estimated Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {cat.items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3 px-3">
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              {item.itemName}
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <span className="text-xs text-slate-300 font-mono bg-slate-800/60 px-2 py-0.5 rounded">
                              {item.specGrade}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-slate-300">
                            {item.quantity.toLocaleString()} {item.unit}
                          </td>
                          <td className="py-3 px-3 text-right font-mono text-slate-400">
                            ₹{item.rate.toLocaleString()}
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-cyan-300">
                            ₹{item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      All test batch cube reports and brand warranty certificates are preserved in Document Vault.
                    </span>
                    <span className="font-bold text-white font-mono">
                      Category Total: {formatCurrency(cat.subtotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

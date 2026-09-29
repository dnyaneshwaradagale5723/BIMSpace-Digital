import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, ExternalLink, Lock, CheckCircle2, Clock } from 'lucide-react';
import { DOCUMENTS_LIST } from '../data/projectData';

export const DocumentHub: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (docTitle: string, docId: string) => {
    setDownloadingId(docId);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Encrypted Sanction Document Downloaded: "${docTitle}". Verified with SHA-256 Hash.`);
    }, 800);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="badge-cyan text-xs mb-2">Immutable Document Vault</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Sanction Drawings & Engineering Repository
          </h2>
          <p className="text-sm text-slate-400">
            One-click site access for PMC municipal approval copies, structural drawings, and geo-technical test certificates.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Municipal Digital Stamp Verified</span>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOCUMENTS_LIST.map((doc) => (
          <div
            key={doc.id}
            className="glass-panel p-4 md:p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-1">{doc.title}</h3>
                    <div className="text-xs text-slate-400">{doc.authority}</div>
                  </div>
                </div>
                <span className="badge-green text-[10px] py-0.5 px-2">{doc.status}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-3 mb-4">
                <span>Format: {doc.fileType}</span>
                <span>•</span>
                <span>Size: {doc.fileSize}</span>
                <span>•</span>
                <span>Approved: {doc.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => handleDownload(doc.title, doc.id)}
                disabled={downloadingId === doc.id}
                className="btn-primary text-xs py-2 px-3 flex-1 justify-center"
              >
                {downloadingId === doc.id ? (
                  <span className="flex items-center gap-1.5 text-slate-950 font-bold">
                    <Clock className="w-3.5 h-3.5 animate-spin" /> Verifying Hash...
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Direct Site Download
                  </span>
                )}
              </button>

              <button
                onClick={() => alert(`Viewing digital copy for ${doc.title}`)}
                className="btn-secondary text-xs py-2 px-3"
                title="Preview Online"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

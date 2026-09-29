import React, { useState } from 'react';
import { CheckCircle2, Clock, Calendar, ShieldAlert, UserCheck, HardHat, Camera, ArrowRight } from 'lucide-react';
import { PROGRESS_MILESTONES, Milestone } from '../data/projectData';

export const ProgressTimeline: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(PROGRESS_MILESTONES[3]);

  // Overall completion computation
  const totalWeight = PROGRESS_MILESTONES.length * 100;
  const currentTotal = PROGRESS_MILESTONES.reduce((acc, m) => acc + m.progressPercent, 0);
  const overallProgress = Math.round((currentTotal / totalWeight) * 100);

  return (
    <div className="w-full">
      {/* Timeline Header & Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="badge-cyan text-xs mb-2">Live Construction Milestone Audit</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Site Execution & Quality Progress
          </h2>
          <p className="text-sm text-slate-400">
            Real-time stage auditing, concrete curing dates, and structural sign-off verification.
          </p>
        </div>

        {/* Global Progress Dial */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-cyan-500/30 px-4 py-2.5 rounded-2xl">
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-cyan-400 flex items-center justify-center font-mono font-bold text-cyan-300 text-sm">
            {overallProgress}%
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Overall Civil Progress</div>
            <div className="text-sm font-bold text-white">Masonry & Services Phase</div>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden mb-8 border border-slate-800">
        <div
          className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 h-full transition-all duration-700 ease-out"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Horizontal / Grid Timeline Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {PROGRESS_MILESTONES.map((m, idx) => {
          const isSelected = selectedMilestone.id === m.id;
          const isDone = m.status === 'completed';
          const isCurrent = m.status === 'in_progress';

          return (
            <button
              key={m.id}
              onClick={() => setSelectedMilestone(m)}
              className={`p-3.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'border-cyan-400 bg-slate-800/90 shadow-lg shadow-cyan-500/20 scale-[1.03]'
                  : isDone
                  ? 'border-emerald-500/40 bg-slate-900/50 hover:border-emerald-500/80'
                  : isCurrent
                  ? 'border-amber-500/50 bg-amber-500/5 hover:border-amber-500'
                  : 'border-slate-800 bg-slate-950/40 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400">{m.phase}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isCurrent && <Clock className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />}
                {!isDone && !isCurrent && <span className="w-2 h-2 rounded-full bg-slate-700" />}
              </div>

              <div className="text-xs font-bold text-white truncate mb-1">{m.title}</div>

              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className={isDone ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-slate-500'}>
                  {m.progressPercent}% Done
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Milestone Inspection Card */}
      <div className="glass-panel p-5 md:p-6 border border-cyan-500/30 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-950/90">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-cyan text-xs">{selectedMilestone.phase}</span>
                <span
                  className={
                    selectedMilestone.status === 'completed'
                      ? 'badge-green text-xs'
                      : selectedMilestone.status === 'in_progress'
                      ? 'badge-gold text-xs'
                      : 'badge-cyan text-xs text-slate-400 border-slate-700'
                  }
                >
                  {selectedMilestone.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{selectedMilestone.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{selectedMilestone.completionDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{selectedMilestone.inspectedBy}</span>
            </div>
          </div>
        </div>

        {/* Remarks & Technical Audit */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs uppercase font-mono text-cyan-400 mb-2 flex items-center gap-1.5">
              <span>Site Audit Observation & Lab Verification</span>
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed mb-3">
              "{selectedMilestone.remarks}"
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">✓ IS 456:2000 Code Compliance</span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">✓ Slump Test 120mm Passed</span>
              <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md">✓ Cube Compressive 31.8 N/mm²</span>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs text-slate-400 mb-1">Live Site Media Record</div>
              <div className="text-xs text-slate-300">12 High-Res site photos & drone footage logged in archive.</div>
            </div>
            <button
              onClick={() => alert('Accessing live site camera archive for phase...')}
              className="btn-secondary text-xs mt-3 w-full"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              View Site Drone Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

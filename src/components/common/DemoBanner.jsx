import React, { useState } from 'react';
import { Sparkles, Info, X, ShieldAlert, CheckCircle2, Cpu } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const DemoBanner = () => {
  const { hasCustomUpload, resetToDemo, backendStatus, aiEngineName } = useResume();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isLive = backendStatus === 'connected';

  if (dismissed) {
    return (
      <button 
        onClick={() => setDismissed(false)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/90 hover:bg-navy-750 border border-brand-purple/40 text-xs text-brand-cyan shadow-lg shadow-purple-900/30 backdrop-blur-md transition-all"
        title="Show Engine Information"
      >
        <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
        <span className="font-semibold">{isLive ? 'AI ENGINE LIVE' : 'DEMO MODE ACTIVE'}</span>
      </button>
    );
  }

  return (
    <>
      <aside aria-label="Engine Status Notice" className="bg-gradient-to-r from-[#7357FF]/20 via-[#00D9FF]/15 to-[#7357FF]/20 border-b border-brand-purple/30 backdrop-blur-md px-4 py-2 text-xs relative z-40 transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-200">
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold tracking-wider text-[10px] border border-emerald-500/40 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                FASTAPI BACKEND CONNECTED
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-brand-purple/30 text-brand-cyan font-bold tracking-wider text-[10px] border border-brand-purple/40 shadow-sm shadow-brand-purple/20">
                <Sparkles className="w-3 h-3 text-brand-cyan animate-pulse" />
                DEMO DATA
              </span>
            )}

            <span className="hidden sm:inline text-slate-300">
              {isLive
                ? `Real PDF/DOCX text extraction & ATS scoring active (${aiEngineName || 'AI Engine'}).`
                : 'Backend is offline; previewing with realistic candidate fixtures.'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {hasCustomUpload && (
              <button
                onClick={resetToDemo}
                className="text-[11px] text-brand-cyan hover:underline font-medium flex items-center gap-1"
              >
                Reset Demo
              </button>
            )}
            <button
              onClick={() => setShowInfoModal(true)}
              className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px] underline transition-colors"
            >
              <Info className="w-3 h-3" />
              Engine Details
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-white/10 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Engine Modal Information */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-navy-900 border border-brand-purple/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-cyan">
                  <Cpu className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">ResumeIQ AI Engine Status</h3>
                  <p className="text-xs text-slate-400">FastAPI + Python Resume Processing</p>
                </div>
              </div>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 rounded-xl bg-navy-850 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Backend Server Status:</span>
                  <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                    isLive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {isLive ? '● ONLINE (Port 8000)' : '○ OFFLINE'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Active AI Engine:</span>
                  <span className="font-mono text-brand-cyan">
                    {aiEngineName || 'Deterministic ATS Engine'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Document Parsers:</span>
                  <span className="text-slate-300 font-mono">PDF (pypdf) & Word (python-docx)</span>
                </div>
              </div>

              <p className="text-slate-300">
                To enable live <strong>Google Gemini AI</strong> model integration:
                Add your free Gemini API key to <code className="text-brand-purple font-mono bg-navy-950 px-1 py-0.5 rounded">backend/.env</code>:
              </p>
              <div className="p-2.5 rounded-lg bg-navy-950 font-mono text-[11px] text-emerald-300 border border-white/10">
                GEMINI_API_KEY=AIzaSy...
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-medium text-xs shadow-md transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

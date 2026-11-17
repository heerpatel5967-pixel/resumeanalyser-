import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Check, 
  Copy, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export const ResumeImproverPage = () => {
  const { improvements, toggleImprovement, dynamicScore, currentResume } = useResume();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Impact & Quantifiable Metrics', 'Action Verbs & Brevity', 'Tech Stack & Keyword Density', 'Executive Summary Polish'];

  const filteredImprovements = selectedCategory === 'All'
    ? improvements
    : improvements.filter(imp => imp.category === selectedCategory);

  const appliedCount = improvements.filter(imp => imp.applied).length;

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resume <span className="text-gradient-purple-cyan">Improver & Bullet Polish</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Turn passive task lists into compelling, high-converting bullet points with measurable impact metrics.
          </p>
        </div>

        {/* Dynamic score summary badge */}
        <div className="flex items-center gap-3 bg-navy-850 p-2.5 px-4 rounded-2xl border border-brand-purple/30">
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              Simulated ATS Score
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-white">
                {dynamicScore}
              </span>
              <span className="text-xs text-brand-cyan font-semibold">
                ({appliedCount} of {improvements.length} applied)
              </span>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <Award className="w-6 h-6 text-brand-cyan" />
        </div>
      </div>

      {/* Interactive Progress Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-purple/20 via-navy-800 to-brand-cyan/20 border border-brand-purple/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
            <h3 className="text-sm font-bold text-white">Interactive Improvement Simulator</h3>
          </div>
          <p className="text-xs text-slate-300">
            Click <strong>"Mark as Applied"</strong> on any recommendation below. Watch your simulated ATS compatibility score rise in real time!
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-navy-900/80 border border-white/10 text-emerald-400">
          <span>Target Score: 95+</span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3.5 py-2 rounded-xl border whitespace-nowrap font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-brand-purple text-white border-brand-purple shadow-md shadow-brand-purple/20'
                : 'bg-navy-850 text-slate-400 border-white/10 hover:text-white hover:bg-navy-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Before and After Improvement Cards */}
      <div className="space-y-6">
        {filteredImprovements.map((imp) => {
          const isApplied = imp.applied;
          return (
            <div
              key={imp.id}
              className={`glass-card p-6 rounded-2xl border transition-all duration-300 ${
                isApplied 
                  ? 'border-emerald-500/40 bg-navy-900/90 ring-1 ring-emerald-500/20' 
                  : 'hover:border-brand-purple/40'
              }`}
            >
              {/* Card Top Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple border border-brand-purple/30 font-bold">
                      {imp.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      {imp.section}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {imp.issue}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-lg border border-brand-cyan/20">
                    {imp.impactScore}
                  </span>

                  <button
                    onClick={() => toggleImprovement(imp.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isApplied
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied (+3 pts)</span>
                      </>
                    ) : (
                      <>
                        <span>Mark as Applied</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Side-by-side Before and After Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
                
                {/* BEFORE Card */}
                <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Before (Weak / Passive)
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Current Text</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed font-sans line-through opacity-85">
                    "{imp.beforeText}"
                  </p>
                </div>

                {/* AFTER Card */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 relative group/after">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      After (AI-Enhanced & Metric-Backed)
                    </span>
                    <button
                      onClick={() => handleCopy(imp.id, imp.afterText)}
                      className="text-[11px] text-brand-cyan hover:text-white flex items-center gap-1 bg-navy-900/60 px-2 py-0.5 rounded border border-white/10"
                    >
                      {copiedId === imp.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-emerald-200 leading-relaxed font-sans font-medium">
                    "{imp.afterText}"
                  </p>
                </div>

              </div>

              {/* Why it works / ATS Insight */}
              <div className="p-3 rounded-xl bg-navy-850/80 border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Why this improves your score: </strong>
                  <span className="text-slate-400">{imp.explanation}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

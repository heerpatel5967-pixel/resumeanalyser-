import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  ExternalLink, 
  Eye, 
  Code, 
  RefreshCw, 
  ArrowRight,
  ShieldAlert,
  Search,
  Filter,
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { ScoreGauge } from '../components/common/ScoreGauge';
import { useResume } from '../context/ResumeContext';

export const ResumeAnalyzerPage = () => {
  const { 
    currentResume, 
    dynamicScore, 
    handleFileUpload, 
    runAiAnalysis, 
    isAnalyzing, 
    analysisProgress, 
    analysisStage,
    hasCustomUpload
  } = useResume();

  const [dragActive, setDragActive] = useState(false);
  const [viewMode, setViewMode] = useState('formatted'); // 'formatted' | 'raw'
  const [copied, setCopied] = useState(false);
  const [targetRoleInput, setTargetRoleInput] = useState(currentResume.targetRole);
  const [filterKeyword, setFilterKeyword] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const copyExtractedText = () => {
    navigator.clipboard.writeText(currentResume.extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resume <span className="text-gradient-purple-cyan">Analyzer & Parser</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              DEMO ENGINE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate deep ATS parsing for PDF & DOCX formats. Inspect extracted text blocks and detect missing keywords.
          </p>
        </div>

        {/* Demo AI Engine Disclaimer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-navy-850 border border-brand-purple/30 text-xs text-slate-300">
          <ShieldAlert className="w-4 h-4 text-brand-purple shrink-0" />
          <span>Demo Mode: Mock parsing & algorithms</span>
        </div>
      </div>

      {/* Upload Interface & Target Role Config */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upload Zone (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-brand-cyan" />
                Upload PDF or DOCX Resume
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Max file size: 10 MB
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Select or drop your resume. Our parser parses text blocks, contact headers, bullet structures, and tech taxonomy.
            </p>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-brand-cyan bg-brand-cyan/10 scale-[1.01]' 
                  : 'border-white/15 bg-navy-850/50 hover:border-brand-purple/50 hover:bg-navy-850'
              }`}
            >
              <input
                type="file"
                id="analyzer-file-input"
                className="hidden"
                accept=".pdf,.docx,.doc"
                onChange={handleFileInput}
              />
              <label htmlFor="analyzer-file-input" className="cursor-pointer block">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-navy-800 border border-brand-purple/30 flex items-center justify-center text-brand-cyan mb-3 shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  Drag and drop your resume file here
                </div>
                <div className="text-xs text-slate-400 mb-4">
                  or <span className="text-brand-cyan underline font-medium">browse files</span> from your computer
                </div>
                <div className="inline-flex items-center gap-3 px-3 py-1 rounded-lg bg-navy-900/80 border border-white/10 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" /> PDF Document
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-brand-cyan" /> Microsoft Word (.docx)
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Uploaded File Info Card */}
          <div className="mt-5 p-4 rounded-xl bg-navy-850 border border-brand-purple/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/20 flex items-center justify-center text-brand-cyan shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white truncate">
                    {currentResume.fileName}
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold shrink-0">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Size: {currentResume.fileSize} • Uploaded: {currentResume.uploadedAt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label 
                htmlFor="analyzer-file-input" 
                className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 text-xs font-semibold border border-white/10 cursor-pointer transition-colors"
              >
                Replace
              </label>
            </div>
          </div>
        </div>

        {/* Target Benchmark & Action Card (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white">Target Role Calibration</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-bold">
                DEMO BENCHMARK
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Select or type the role you want the simulated ATS scanner to benchmark your resume keywords against.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={targetRoleInput}
                  onChange={(e) => setTargetRoleInput(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              {/* Preset Role Tags */}
              <div>
                <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                  Popular Benchmark Presets (Demo):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Senior Frontend Engineer",
                    "Full Stack Engineer",
                    "AI Application Engineer",
                    "React Specialist"
                  ].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setTargetRoleInput(role)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                        targetRoleInput === role
                          ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                          : 'bg-navy-850 text-slate-300 border-white/10 hover:border-brand-purple/40'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-navy-850/80 border border-white/5 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-brand-cyan flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  ATS Matching Mode:
                </div>
                <p className="text-[11px] text-slate-400">
                  Simulating Greenhouse ATS algorithm with TF-IDF keyword extraction and 2026 tech skill ontology.
                </p>
              </div>
            </div>
          </div>

          {/* Analyze Resume Action Button */}
          <div className="pt-6 border-t border-white/10">
            <button
              onClick={() => runAiAnalysis(targetRoleInput)}
              disabled={isAnalyzing}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-purple via-brand-purple-dark to-brand-cyan hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-brand-purple/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Resume ({analysisProgress}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                  <span>Analyze Resume Now</span>
                </>
              )}
            </button>

            {/* Analysis Progress Bar */}
            {isAnalyzing && (
              <div className="mt-3 space-y-1.5 animate-fade-in">
                <div className="w-full bg-navy-850 rounded-full h-2 overflow-hidden border border-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <div className="text-[11px] text-brand-cyan font-mono truncate text-center">
                  {analysisStage}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Extracted Text Preview Card (Required) */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 bg-navy-900/60">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-purple" />
                Extracted Text Preview
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-bold">
                DEMO DATA
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Exact plain-text stream as seen by an automated Applicant Tracking System parser
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg bg-navy-800 p-0.5 border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('formatted')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'formatted' ? 'bg-brand-purple text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Formatted View
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'raw' ? 'bg-brand-purple text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Raw Plain Text
              </button>
            </div>

            <button
              onClick={copyExtractedText}
              className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
              title="Copy extracted text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Text viewer area */}
        <div className="p-5 sm:p-6 bg-navy-950/80 font-mono text-xs text-slate-300 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap select-text border-t border-white/5">
          {viewMode === 'formatted' ? (
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-[11px] text-brand-cyan mb-4 font-sans">
                <strong>ATS Structure Analysis:</strong> Standard contact header parsed • 2 Work experience entries detected • 4 Education points verified • Chronology order: Valid.
              </div>
              {currentResume.extractedText}
            </div>
          ) : (
            currentResume.extractedText
          )}
        </div>
      </div>

      {/* Deep ATS Analysis Results Breakdown */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">ATS Analysis Findings & Keyword Audit</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-bold">
                DEMO RESULTS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Evaluated for: {targetRoleInput || currentResume.targetRole}
            </p>
          </div>

          <Link
            to="/improver"
            className="px-4 py-2 rounded-xl bg-brand-purple/20 hover:bg-brand-purple/30 text-brand-cyan text-xs font-bold border border-brand-purple/40 flex items-center gap-1.5 transition-all"
          >
            <span>Fix with Resume Improver</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Two-column analysis cards: Keywords & Strengths/Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Keywords Detected vs Missing (6 cols) */}
          <div className="lg:col-span-6 glass-card p-6 rounded-2xl space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Detected Core Keywords ({currentResume.detectedKeywords.length})
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">Passed</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 mb-3">
                Crucial terms found in your resume matching current job listings:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentResume.detectedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 text-xs font-mono font-medium"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Recommended Missing Keywords ({currentResume.missingKeywords.length})
                </h4>
                <span className="text-[10px] text-amber-400 font-mono font-bold">High Value</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 mb-3">
                Include these industry-standard terms to boost your ATS match score:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {currentResume.missingKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-mono font-medium"
                  >
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Findings: Strengths & Weaknesses (6 cols) */}
          <div className="lg:col-span-6 glass-card p-6 rounded-2xl space-y-5">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-brand-cyan" />
                ATS Parser Strengths
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentResume.keyFindings.strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-brand-purple" />
                Critical Improvement Areas
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentResume.keyFindings.improvements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-purple font-bold">!</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                to="/improver"
                className="w-full py-2.5 px-3 rounded-xl bg-navy-800 hover:bg-navy-750 text-brand-cyan border border-brand-purple/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Bullet Point Rewrites</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

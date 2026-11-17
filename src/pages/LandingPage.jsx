import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Target, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Brain, 
  Check, 
  ChevronRight,
  UploadCloud,
  Award,
  Terminal
} from 'lucide-react';
import { ScoreGauge } from '../components/common/ScoreGauge';
import { useResume } from '../context/ResumeContext';

export const LandingPage = () => {
  const { currentResume, dynamicScore } = useResume();

  const features = [
    {
      icon: Target,
      title: "Deep ATS Scoring Algorithm",
      description: "Scan your resume against top ATS systems (Greenhouse, Lever, Workday) with instant compatibility diagnostics.",
      tag: "ATS Engine",
      link: "/analyzer"
    },
    {
      icon: Sparkles,
      title: "Real-time Content Improver",
      description: "Replace weak responsibilities with metric-backed accomplishments using tailored side-by-side Before/After diffs.",
      tag: "Bullet Polish",
      link: "/improver"
    },
    {
      icon: Compass,
      title: "Predictive Career Advisor",
      description: "Identify high-paying role matches, calculate market demand trends, and uncover high-priority technical skill gaps.",
      tag: "Trajectory",
      link: "/advisor"
    },
    {
      icon: Brain,
      title: "AI Interview Simulator",
      description: "Generate role-specific technical, behavioral, and project-based questions structured around the proven STAR method.",
      tag: "Mock Prep",
      link: "/interview-prep"
    }
  ];

  const highlights = [
    { metric: "84%", label: "Average ATS pass rate with optimized bullets" },
    { metric: "3.4x", label: "Increase in top-tier recruiter callbacks" },
    { metric: "150K+", label: "Target tech role benchmarks analyzed" },
    { metric: "< 3s", label: "Instant deep parsing and diagnostic feedback" },
  ];

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-radial from-brand-purple/20 via-brand-cyan/10 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/90 border border-brand-purple/40 text-xs font-semibold text-brand-cyan shadow-lg shadow-purple-900/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" />
            <span>Next-Gen AI Resume Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            <span className="text-slate-400 font-mono text-[10px]">v2.4 Prototype</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Your Career Starts With a{' '}
            <span className="text-gradient-purple-cyan">Stronger Resume.</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ResumeIQ diagnoses ATS parser bottlenecks, enhances impact metrics with AI-backed phrasing, and bridges skill gaps for your dream tech role.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-cyan hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-brand-purple/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>Get Started – Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/analyzer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-navy-800/80 hover:bg-navy-750 text-slate-200 hover:text-white text-sm font-semibold border border-white/10 flex items-center justify-center gap-2 transition-all backdrop-blur-md"
            >
              <FileText className="w-4 h-4 text-brand-cyan" />
              <span>Analyze Resume (Demo Mode)</span>
            </Link>
          </div>

          {/* Micro trust cues */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-cyan" /> No signup required for demo
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand-purple" /> Compatible with PDF & DOCX
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> 100% Client-side sandbox
            </span>
          </div>

        </div>

        {/* Interactive Floating Preview Card */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-brand-purple/40 via-brand-cyan/30 to-brand-purple/40 shadow-2xl shadow-purple-950/50">
            <div className="bg-navy-900/90 rounded-[22px] p-6 sm:p-8 backdrop-blur-xl border border-white/10">
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center text-brand-cyan">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">Live Candidate Preview</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30 font-bold">
                        DEMO FIXTURE
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Sample: {currentResume.fileName} • Target: {currentResume.targetRole}
                    </p>
                  </div>
                </div>

                <Link
                  to="/analyzer"
                  className="px-4 py-2 rounded-xl bg-navy-800 hover:bg-navy-750 text-xs font-semibold text-brand-cyan border border-brand-purple/30 flex items-center gap-1.5 transition-colors"
                >
                  <span>Open in Analyzer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Grid content inside preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
                
                {/* Radial Gauge */}
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-navy-850/60 border border-white/5">
                  <ScoreGauge score={dynamicScore} size={150} subtitle="ATS Match Score" />
                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Top 8% percentile among Senior Frontend Applicants
                  </p>
                </div>

                {/* Score breakdown metrics */}
                <div className="space-y-3 md:col-span-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Key ATS Parser Dimensions</span>
                    <span className="text-[10px] text-slate-500 font-normal">Real-time mock breakdown</span>
                  </h4>

                  {currentResume.scoreBreakdown.map((item) => (
                    <div key={item.category} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-medium">{item.category}</span>
                        <span className="font-bold text-white">{item.score} / {item.max}</span>
                      </div>
                      <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full transition-all duration-700"
                          style={{
                            width: `${item.score}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Clean chronological layout
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      13/18 Core keywords present
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="border-y border-white/10 bg-navy-950/70 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {highlights.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-brand-purple tracking-tight">
                {item.metric}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-brand-cyan tracking-widest uppercase font-mono">
            ENGINEERED FOR MODERN HIRING SYSTEMS
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need To Pass The ATS & Impress The Team
          </h3>
          <p className="text-slate-400 text-sm">
            Four powerful intelligence modules calibrated for technical resumes, product managers, and modern engineering leads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => (
            <Link
              key={index}
              to={feat.link}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-cyan/20 border border-brand-purple/30 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                    <feat.icon className="w-6 h-6 text-brand-cyan" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-400 border border-white/5 font-bold">
                    {feat.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-semibold text-brand-purple group-hover:text-brand-cyan transition-colors">
                <span>Explore Module</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full mb-12">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-brand-purple/30 via-navy-800 to-brand-cyan/20 border border-brand-purple/40 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider mb-2 inline-block">
            DEMO READY &bull; NO SETUP REQUIRED
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white max-w-xl mx-auto">
            Ready To Accelerate Your Next Career Milestone?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto mt-3">
            Open the interactive dashboard, test the file parser with sample or custom resumes, and inspect live before-and-after improvements.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-3.5 rounded-xl bg-white text-navy-900 hover:bg-slate-100 font-bold text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              Launch Dashboard Now
            </Link>
            <Link
              to="/analyzer"
              className="px-6 py-3.5 rounded-xl bg-navy-850 hover:bg-navy-750 text-white text-sm font-semibold border border-white/20 transition-all"
            >
              Try Resume Analyzer
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

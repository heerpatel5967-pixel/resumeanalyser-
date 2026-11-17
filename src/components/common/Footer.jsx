import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin, Heart, Shield, Cpu, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-navy-950 border-t border-white/10 text-slate-400 text-sm mt-auto relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-brand-purple/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-cyan p-[1.5px]">
                <div className="w-full h-full bg-navy-900 rounded-[6px] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-brand-cyan" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Resume<span className="text-brand-purple">IQ</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering job seekers with AI-driven resume scoring, real-time ATS optimization, skill-gap analysis, and interview simulations.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2 py-0.5 rounded text-[10px] bg-brand-purple/20 text-brand-cyan border border-brand-purple/30 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Engine v2.4 (Frontend Prototype)
              </span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/analyzer" className="hover:text-brand-cyan transition-colors">Resume Analyzer</Link>
              </li>
              <li>
                <Link to="/advisor" className="hover:text-brand-cyan transition-colors">Career Advisor</Link>
              </li>
              <li>
                <Link to="/improver" className="hover:text-brand-cyan transition-colors">Resume Improver</Link>
              </li>
              <li>
                <Link to="/interview-prep" className="hover:text-brand-cyan transition-colors">Interview Preparation</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-brand-cyan transition-colors">ATS Scoring Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Resources & Insights */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">ATS Intelligence</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>Greenhouse & Lever Parsing Guide</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>Top 100 Action Verbs for Engineers</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>STAR Method Interview Framework</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span>2026 Tech Salary Benchmark Index</span>
              </li>
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Frontend Architecture</h4>
            <div className="flex flex-wrap gap-1.5">
              {['React 18', 'Vite', 'Tailwind CSS', 'Recharts', 'Lucide Icons', 'React Router v6'].map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-md bg-navy-850 border border-white/10 text-[11px] text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-brand-cyan" />
              Client-side mock simulation — ready for API integration.
            </p>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500">
            © {new Date().getFullYear()} ResumeIQ – AI Resume Analyzer & Career Advisor. All sample profiles clearly marked as DEMO DATA.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Built with precision for ambitious careers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

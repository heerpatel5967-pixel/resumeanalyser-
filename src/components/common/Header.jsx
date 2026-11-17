import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  Sparkles, 
  Search, 
  Bell, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const Header = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentResume, dynamicScore, resetToDemo, hasCustomUpload } = useResume();
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageDetails = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return { title: 'Candidate Intelligence Hub', subtitle: 'Real-time resume metrics & performance indicators' };
      case '/analyzer':
        return { title: 'ATS Resume Parser & Scanner', subtitle: 'Upload and audit structure, syntax & keyword density' };
      case '/advisor':
        return { title: 'AI Career Path & Skills Advisory', subtitle: 'Target roles, industry benchmarks, and closing skill gaps' };
      case '/improver':
        return { title: 'Resume Content & Bullet Improver', subtitle: 'Side-by-side Before/After diffs with ATS metric boosters' };
      case '/interview-prep':
        return { title: 'AI Interview Coach & Question Bank', subtitle: 'Tailored technical, behavioral, and STAR framework responses' };
      default:
        return { title: 'ResumeIQ Platform', subtitle: 'AI Resume Analytics & Career Acceleration' };
    }
  };

  const { title, subtitle } = getPageDetails(location.pathname);

  return (
    <header className="sticky top-0 z-30 h-20 bg-navy-900/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between transition-all">
      {/* Left Title & Mobile Menu Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800 lg:hidden border border-white/10"
          aria-label="Toggle Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reset Demo button if customized */}
        {hasCustomUpload && (
          <button
            onClick={resetToDemo}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-xs text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Reset to sample profile Alexander Chen"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-cyan" />
            <span>Reset Demo</span>
          </button>
        )}

        {/* Upload Resume Quick Button */}
        <button
          onClick={() => navigate('/analyzer')}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-xs font-semibold shadow-md shadow-brand-purple/20 hover:brightness-110 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Upload Resume</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-navy-800 hover:bg-navy-750 border border-white/10 text-slate-300 hover:text-white transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-navy-900 border border-brand-purple/30 shadow-2xl p-4 text-xs z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                  Notifications (Demo)
                </span>
                <span className="text-[10px] text-brand-cyan">3 New</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-navy-800/80 border border-white/5 flex gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-200">ATS Score Increased to {dynamicScore}%</p>
                    <p className="text-[10px] text-slate-400">Alexander Chen's resume scored 14 points higher than average.</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-navy-800/80 border border-white/5 flex gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-200">New Skill Gap Detected</p>
                    <p className="text-[10px] text-slate-400">Kubernetes & RAG workflows recommended for Senior AI roles.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Pill / Demo Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan p-[1.5px] shadow-sm">
            <div className="w-full h-full bg-navy-850 rounded-[10px] flex items-center justify-center text-xs font-bold text-white">
              {currentResume.applicantName.substring(0, 2).toUpperCase()}
            </div>
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-white truncate max-w-[120px]">
              {currentResume.applicantName}
            </span>
            <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
              {currentResume.targetRole.split('/')[0]}
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};

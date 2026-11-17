import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileSearch, 
  Compass, 
  Wand2, 
  MessageSquareQuote, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  UploadCloud,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

export const Sidebar = ({ isOpen, setIsOpen }) => {
  const { currentResume, dynamicScore } = useResume();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, badge: null },
    { name: 'Resume Analyzer', path: '/analyzer', icon: FileSearch, badge: 'Core' },
    { name: 'Career Advisor', path: '/advisor', icon: Compass, badge: 'AI' },
    { name: 'Resume Improver', path: '/improver', icon: Wand2, badge: 'Diffs' },
    { name: 'Interview Prep', path: '/interview-prep', icon: MessageSquareQuote, badge: 'STAR' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-navy-900 border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Logo */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan p-[1.5px] transition-transform group-hover:scale-105 shadow-md shadow-brand-purple/20">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-brand-cyan" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Resume<span className="text-gradient-purple-cyan">IQ</span>
              </span>
              <span className="text-[10px] text-brand-cyan font-mono tracking-wider uppercase">
                DEMO CONSOLE
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Platform Modules
          </div>

          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-purple/20 to-brand-cyan/10 text-white border border-brand-purple/40 shadow-sm shadow-brand-purple/20'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-brand-cyan' : 'text-slate-400 group-hover:text-brand-purple'
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                        isActive 
                          ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30' 
                          : 'bg-navy-800 text-slate-400 border border-white/5'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-brand-cyan translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                    }`} />
                  </div>
                </>
              )}
            </NavLink>
          ))}

          {/* Quick upload button inside sidebar */}
          <div className="pt-4">
            <Link
              to="/analyzer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-navy-800 hover:bg-navy-750 border border-brand-purple/30 text-xs font-medium text-brand-cyan hover:text-white transition-all shadow-sm group"
            >
              <UploadCloud className="w-4 h-4 text-brand-purple group-hover:scale-110 transition-transform" />
              <span>Upload PDF / DOCX</span>
            </Link>
          </div>
        </div>

        {/* Active Candidate Widget (Demo Card) */}
        <div className="p-4 border-t border-white/10 bg-navy-950/60">
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-navy-800 to-navy-850 border border-white/10 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-purple" />
                Demo Profile
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                {dynamicScore}% ATS
              </span>
            </div>

            <div className="text-xs font-bold text-white truncate">
              {currentResume.applicantName}
            </div>
            <div className="text-[11px] text-slate-400 truncate mb-3">
              {currentResume.targetRole}
            </div>

            <div className="w-full bg-navy-900 rounded-full h-1.5 overflow-hidden mb-2">
              <div 
                className="bg-gradient-to-r from-brand-purple to-brand-cyan h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${dynamicScore}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <Link to="/improver" className="text-brand-purple hover:text-brand-cyan flex items-center gap-0.5">
                Improve score <ArrowUpRight className="w-3 h-3" />
              </Link>
              <span className="text-slate-500">v1.3</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};

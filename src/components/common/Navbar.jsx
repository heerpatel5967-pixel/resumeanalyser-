import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight, FileText, Compass, CheckCircle, HelpCircle, LayoutDashboard } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Resume Analyzer', path: '/analyzer', icon: FileText },
    { name: 'Career Advisor', path: '/advisor', icon: Compass },
    { name: 'Resume Improver', path: '/improver', icon: CheckCircle },
    { name: 'Interview Prep', path: '/interview-prep', icon: HelpCircle },
  ];

  return (
    <nav className="sticky top-0 z-30 w-full bg-navy-900/85 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-cyan p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-brand-purple/20">
              <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-cyan" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  Resume<span className="text-gradient-purple-cyan">IQ</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
                  AI
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Analyzer & Career Advisor
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-brand-purple/20 text-brand-cyan border border-brand-purple/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800/80'
                  }`
                }
              >
                <item.icon className="w-4 h-4 opacity-80" />
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/analyzer"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-navy-800 hover:bg-navy-750 border border-white/10 transition-all"
            >
              Upload Resume
            </Link>
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-purple to-brand-purple-dark hover:brightness-110 shadow-lg shadow-brand-purple/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-navy-800 transition-colors border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900/95 border-b border-white/10 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl animate-fade-in">
          <div className="space-y-1">
            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-brand-purple/20 text-brand-cyan' : 'text-slate-300 hover:bg-navy-800'
                }`
              }
            >
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              Home / Overview
            </NavLink>
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium ${
                    isActive ? 'bg-brand-purple/20 text-brand-cyan' : 'text-slate-300 hover:bg-navy-800'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <Link
              to="/analyzer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-navy-800 text-sm font-medium text-white border border-white/10"
            >
              <FileText className="w-4 h-4 text-brand-cyan" />
              Upload Resume (Demo)
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-sm font-bold text-white shadow-md shadow-brand-purple/30"
            >
              Open Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

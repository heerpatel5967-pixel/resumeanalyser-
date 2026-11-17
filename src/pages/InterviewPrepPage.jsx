import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lightbulb, 
  Search, 
  Filter, 
  BrainCircuit, 
  Clock, 
  Award,
  PlayCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export const InterviewPrepPage = () => {
  const { interviewQuestions, currentResume } = useResume();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState(interviewQuestions[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceMode, setPracticeMode] = useState(false);

  const categories = ['All', 'Technical', 'Behavioral / HR', 'Project-Based'];

  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchesCat = selectedCategory === 'All' || q.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]);
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.overview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Interview <span className="text-gradient-purple-cyan">Preparation & STAR Coach</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Role-tailored interview simulations structured around the Situation-Task-Action-Result (STAR) methodology.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPracticeMode(!practiceMode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              practiceMode 
                ? 'bg-brand-cyan text-navy-900 border-brand-cyan shadow-lg shadow-cyan-900/30' 
                : 'bg-navy-850 hover:bg-navy-750 text-brand-cyan border-brand-purple/30'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>{practiceMode ? 'Practice Mode Active' : 'Start Mock Practice'}</span>
          </button>
        </div>
      </div>

      {/* Target Role & Coaching Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-purple/20 via-navy-800 to-brand-cyan/15 border border-brand-purple/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-cyan font-mono text-xs font-bold">
            <BrainCircuit className="w-4 h-4 text-brand-purple" />
            <span>INTERVIEW TAILORING ENGINE (DEMO)</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Curated for: {currentResume.targetRole}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            Questions synthesized from your React, Node.js, and cloud experience. Learn to answer with metrics, leadership, and structured technical precision.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-navy-900/80 p-3.5 rounded-xl border border-white/10 shrink-0">
          <div className="text-center px-2">
            <span className="text-xl font-extrabold text-white block">4</span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Curated Qs</span>
          </div>
          <div className="h-7 w-px bg-white/10" />
          <div className="text-center px-2">
            <span className="text-xl font-extrabold text-emerald-400 block">100%</span>
            <span className="text-[10px] text-slate-400 uppercase font-mono">STAR Model</span>
          </div>
        </div>
      </div>

      {/* Search & Category Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
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

        {/* Search Input */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center rounded-2xl glass-card border border-white/10 text-slate-400 text-sm">
            No interview questions match your current search criteria.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <div
                key={q.id}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'border-brand-purple/50 bg-navy-900/90' : 'hover:border-brand-purple/30'
                }`}
              >
                {/* Accordion Question Header */}
                <button
                  onClick={() => toggleExpand(q.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="space-y-2 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple border border-brand-purple/30 font-bold">
                        {q.category}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-400 border border-white/5">
                        {q.difficulty}
                      </span>
                      <span className="text-[10px] text-brand-cyan font-mono">
                        Target: {q.role}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                      {q.question}
                    </h4>

                    <p className="text-xs text-slate-400">
                      {q.overview}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-navy-850 border border-white/10 text-slate-300 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-cyan" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Model Answer & STAR Framework */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-5 animate-fade-in">
                    
                    {/* Practice mode hint */}
                    {practiceMode && (
                      <div className="p-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 text-xs text-brand-cyan flex items-center justify-between">
                        <span>
                          <strong>Mock Simulation:</strong> Take 60 seconds to speak your answer aloud, then expand below to compare with the model STAR response.
                        </span>
                      </div>
                    )}

                    {/* STAR Framework Grid */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="text-xs font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                          Recommended Model Answer (STAR Method)
                        </h5>
                        <span className="text-[10px] font-mono text-slate-500">
                          Demo Response
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {/* Situation */}
                        <div className="p-3.5 rounded-xl bg-navy-850/80 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono font-bold text-brand-purple uppercase">
                            [S] Situation
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {q.starAnswer.situation}
                          </p>
                        </div>

                        {/* Task */}
                        <div className="p-3.5 rounded-xl bg-navy-850/80 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase">
                            [T] Task
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {q.starAnswer.task}
                          </p>
                        </div>

                        {/* Action */}
                        <div className="p-3.5 rounded-xl bg-navy-850/80 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                            [A] Action
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {q.starAnswer.action}
                          </p>
                        </div>

                        {/* Result */}
                        <div className="p-3.5 rounded-xl bg-navy-850/80 border border-white/5 space-y-1">
                          <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">
                            [R] Result & Metric Impact
                          </span>
                          <p className="text-slate-300 leading-relaxed">
                            {q.starAnswer.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Key Evaluation Tips */}
                    <div className="p-4 rounded-xl bg-brand-purple/10 border border-brand-purple/20 space-y-2">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-brand-cyan" />
                        What Senior Hiring Managers Look For:
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
                        {q.keyTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-brand-cyan font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

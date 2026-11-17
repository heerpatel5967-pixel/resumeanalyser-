import React, { useState } from 'react';
import { 
  Compass, 
  TrendingUp, 
  Sparkles, 
  Award, 
  BookOpen, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ChevronRight,
  ExternalLink,
  Target,
  Briefcase,
  Zap,
  GraduationCap
} from 'lucide-react';
import { useResume } from '../context/ResumeContext';

export const CareerAdvisorPage = () => {
  const { careerRoles, skillGaps, currentResume } = useResume();
  const [selectedRole, setSelectedRole] = useState(careerRoles[0]);
  const [filterDepartment, setFilterDepartment] = useState('All');

  const filteredRoles = filterDepartment === 'All' 
    ? careerRoles 
    : careerRoles.filter(r => r.department === filterDepartment);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Career <span className="text-gradient-purple-cyan">Advisor & Trajectory</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personalized role recommendations, salary benchmarks, and tailored skill gap roadmaps based on your resume.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Current Profile:</span>
          <span className="px-3 py-1 rounded-xl bg-navy-850 border border-brand-purple/30 text-xs font-bold text-brand-cyan">
            {currentResume.applicantName}
          </span>
        </div>
      </div>

      {/* Recommended Career Roles Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-brand-purple" />
              Recommended Career Roles (Demo)
            </h3>
            <p className="text-xs text-slate-400">
              Ranked by semantic match against your experience and technical capabilities
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['All', 'Product Engineering', 'AI & Innovation Labs', 'Core Platform', 'Engineering Leadership'].map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDepartment(dept)}
                className={`text-xs px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all ${
                  filterDepartment === dept
                    ? 'bg-brand-purple text-white border-brand-purple shadow-sm'
                    : 'bg-navy-850 text-slate-400 border-white/10 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredRoles.map((role) => {
            const isSelected = selectedRole.id === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`glass-card p-5 rounded-2xl cursor-pointer flex flex-col justify-between transition-all duration-300 ${
                  isSelected 
                    ? 'border-brand-purple ring-1 ring-brand-purple shadow-lg shadow-purple-900/30 -translate-y-1' 
                    : 'hover:border-brand-purple/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/25 font-bold">
                      {role.department}
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      role.matchScore >= 90
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : role.matchScore >= 80
                        ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                        : 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20'
                    }`}>
                      {role.matchScore}% Match
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    {role.title}
                  </h4>
                  <div className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    {role.salaryRange}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-brand-cyan font-mono font-medium">
                    {role.marketTrend}
                  </span>
                  <span className={`font-semibold ${isSelected ? 'text-brand-purple' : 'text-slate-400'}`}>
                    {isSelected ? 'Viewing Plan' : 'Inspect Role →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Role Deep-Dive Card */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
                ACTIVE BENCHMARK FOCUS
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-bold">
                DEMO DATA
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              {selectedRole.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {selectedRole.description}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-navy-850 p-4 rounded-2xl border border-white/5 shrink-0">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Estimated Compensation
              </span>
              <span className="text-lg font-extrabold text-emerald-400">
                {selectedRole.salaryRange}
              </span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Market Momentum
              </span>
              <span className="text-xs font-bold text-brand-cyan">
                {selectedRole.marketTrend}
              </span>
            </div>
          </div>
        </div>

        {/* Skills Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          
          {/* Skills Owned */}
          <div className="p-4 rounded-xl bg-navy-850/60 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Verified Competencies ({selectedRole.skillsMatched.length})
              </h4>
              <span className="text-[10px] font-mono text-emerald-300">Ready</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedRole.skillsMatched.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 text-xs font-medium"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="p-4 rounded-xl bg-navy-850/60 border border-brand-purple/30 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-brand-purple" />
                Skills Needed to Reach 98% Match ({selectedRole.missingSkills.length})
              </h4>
              <span className="text-[10px] font-mono text-brand-purple font-bold">Action Item</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedRole.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-brand-purple/20 text-brand-cyan border border-brand-purple/40 text-xs font-medium"
                >
                  + {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Skill-Gap Cards & Learning Pathways */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-cyan" />
                Priority Skill-Gap Diagnostic Cards
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold">
                DEMO CURRICULUM
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Curated roadmap with estimated learning time and salary impact
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGaps.map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-400 border border-white/5 font-bold">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      item.priority === 'High' 
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.priority} Priority
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {item.skill}
                  </h4>
                </div>

                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {item.impact}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current Confidence: {item.currentLevel}%</span>
                  <span className="text-brand-cyan font-bold">Target: {item.targetScore}%</span>
                </div>
                <div className="w-full bg-navy-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan transition-all duration-700"
                    style={{ width: `${item.currentLevel}%` }}
                  />
                </div>
              </div>

              {/* Recommended Course & Meta */}
              <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <GraduationCap className="w-4 h-4 text-brand-purple shrink-0" />
                  <span className="font-medium truncate max-w-[260px]">{item.recommendedCourse}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>{item.estimatedTimeToLearn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

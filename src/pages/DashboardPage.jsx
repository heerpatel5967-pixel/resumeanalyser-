import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  UploadCloud, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Compass, 
  Wand2, 
  MessageSquareQuote, 
  Clock, 
  ChevronRight,
  ShieldAlert,
  BarChart3,
  Award,
  Layers,
  FileCheck
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { ScoreGauge } from '../components/common/ScoreGauge';
import { StatCard } from '../components/common/StatCard';
import { useResume } from '../context/ResumeContext';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { 
    currentResume, 
    dynamicScore, 
    recentAnalyses, 
    handleFileUpload,
    runAiAnalysis,
    isAnalyzing,
    analysisProgress,
    analysisStage
  } = useResume();

  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const success = handleFileUpload(file);
      if (success) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const success = handleFileUpload(file);
      if (success) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-gradient-purple-cyan">{currentResume.applicantName}</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-purple/20 text-brand-purple border border-brand-purple/30">
              DEMO DATA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Targeting: <strong className="text-slate-200">{currentResume.targetRole}</strong> • Last synchronized {currentResume.uploadedAt}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              navigate('/analyzer');
              runAiAnalysis();
            }}
            disabled={isAnalyzing}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-brand-purple/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAnalyzing ? `Analyzing (${analysisProgress}%)` : 'Run AI Analysis Scan'}</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall ATS Score"
          value={`${dynamicScore}/100`}
          change="+14 pts"
          changeType="positive"
          icon={Award}
          badge="DEMO"
          description="Ranks higher than 84% of candidate submissions"
          accentColor="purple"
        />
        <StatCard
          title="Keywords Extracted"
          value={`${currentResume.detectedKeywords.length} Found`}
          change="7 Missing"
          changeType="negative"
          icon={FileCheck}
          badge="DEMO"
          description="High match for React & TypeScript requirements"
          accentColor="cyan"
        />
        <StatCard
          title="Target Role Match"
          value="92%"
          change="Strong"
          changeType="positive"
          icon={Compass}
          badge="DEMO"
          description="Optimal fit: Senior Frontend Engineer"
          accentColor="emerald"
        />
        <StatCard
          title="Interview Readiness"
          value="78%"
          change="+8% vs avg"
          changeType="positive"
          icon={MessageSquareQuote}
          badge="DEMO"
          description="4 STAR questions ready to practice"
          accentColor="purple"
        />
      </div>

      {/* Main Grid: Upload Card & ATS Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Resume Upload Card (5 columns) */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white">Upload Resume</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/25 font-bold">
                PDF & DOCX
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Drag & drop your updated resume file or choose from your computer. The demo parser extracts headings, tools, and experience.
            </p>

            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-brand-cyan bg-brand-cyan/10 scale-[1.01]' 
                  : 'border-white/15 bg-navy-850/60 hover:border-brand-purple/50 hover:bg-navy-850'
              }`}
            >
              <input
                type="file"
                id="dashboard-file-upload"
                className="hidden"
                accept=".pdf,.docx,.doc"
                onChange={handleFileInput}
              />
              <label htmlFor="dashboard-file-upload" className="cursor-pointer block">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-navy-800 border border-white/10 flex items-center justify-center text-brand-purple mb-3">
                  <UploadCloud className="w-6 h-6 text-brand-cyan" />
                </div>
                <div className="text-xs font-semibold text-white mb-1">
                  Click to browse or drop file here
                </div>
                <div className="text-[11px] text-slate-400">
                  Supported: PDF, DOCX (Max 10 MB)
                </div>
              </label>
            </div>

            {/* Upload feedback */}
            {uploadSuccess && (
              <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>File uploaded! Parser loaded in demo memory.</span>
              </div>
            )}

            {/* Active file tag */}
            <div className="mt-4 p-3 rounded-xl bg-navy-850 border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-4 h-4 text-brand-purple shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">
                    {currentResume.fileName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {currentResume.fileSize} • Uploaded {currentResume.uploadedAt}
                  </div>
                </div>
              </div>
              <Link
                to="/analyzer"
                className="text-[11px] font-semibold text-brand-cyan hover:underline shrink-0 pl-2"
              >
                Inspect
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-brand-purple" />
              Demo parser simulator
            </span>
            <Link to="/analyzer" className="text-brand-cyan hover:underline font-medium">
              View text preview &rarr;
            </Link>
          </div>
        </div>

        {/* ATS Score Overview Card (7 columns) */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">ATS Score Intelligence</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple border border-brand-purple/30 font-bold">
                    DEMO DATA
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Multi-vector analysis comparing against 50,000+ senior engineering resumes
                </p>
              </div>

              <Link
                to="/improver"
                className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
              >
                Optimize bullets &rarr;
              </Link>
            </div>

            {/* Radial gauge + breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-4">
              <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-navy-850/50 border border-white/5">
                <ScoreGauge score={dynamicScore} size={150} subtitle="Live ATS Score" />
              </div>

              <div className="sm:col-span-7 space-y-3">
                {currentResume.scoreBreakdown.map((item) => (
                  <div key={item.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400">{item.status}</span>
                        <span className="font-bold text-white">{item.score} / {item.max}</span>
                      </div>
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
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-850/80 border border-brand-purple/20 flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-brand-cyan shrink-0" />
              <span>
                Want to reach <strong>95+ ATS score</strong>? Apply the 4 recommended bullet improvements.
              </span>
            </div>
            <Link
              to="/improver"
              className="px-3 py-1.5 rounded-lg bg-brand-purple/30 hover:bg-brand-purple/50 text-brand-cyan font-bold text-xs shrink-0 transition-colors"
            >
              Fix Now
            </Link>
          </div>
        </div>

      </div>

      {/* Visual Analytics Row: Radar Chart & Score Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Competency Breakdown (6 columns) */}
        <div className="lg:col-span-6 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Competency Radar</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-bold">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Evaluation across 6 core technical resume dimensions
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={currentResume.radarData}>
                <PolarGrid stroke="#223055" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#223055" tick={false} />
                <Radar 
                  name="Alexander Chen" 
                  dataKey="A" 
                  stroke="#00D9FF" 
                  fill="#7357FF" 
                  fillOpacity={0.45} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1020', borderColor: '#7357FF', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#00D9FF' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ATS Score Improvement Trend Over Iterations (6 columns) */}
        <div className="lg:col-span-6 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Score Progression History</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold">
                  DEMO DATA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                ATS score gains from revision v1.0 through target goal
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
              +20 pts gain
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentResume.trendData}>
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7357FF" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2C52" opacity={0.5} />
                <XAxis dataKey="version" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <YAxis domain={[50, 100]} stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1020', borderColor: '#00D9FF', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#00D9FF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#00D9FF" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#trendGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Quick Access to All Features */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Quick Feature Launchpad</h3>
          <span className="text-xs text-slate-400">Direct modules & tools</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Resume Analyzer",
              desc: "Deep PDF/DOCX inspection, text extractor & formatting auditor.",
              path: "/analyzer",
              icon: FileText,
              color: "text-brand-cyan",
              badge: "Analyzer"
            },
            {
              title: "Career Advisor",
              desc: "Explore top salary-matching roles and personalized skill-gap roadmaps.",
              path: "/advisor",
              icon: Compass,
              color: "text-brand-purple",
              badge: "Advisor"
            },
            {
              title: "Resume Improver",
              desc: "Transform passive tasks into quantifiable high-impact bullet points.",
              path: "/improver",
              icon: Wand2,
              color: "text-emerald-400",
              badge: "Improver"
            },
            {
              title: "Interview Prep",
              desc: "Role-specific behavioral & technical questions structured with STAR.",
              path: "/interview-prep",
              icon: MessageSquareQuote,
              color: "text-brand-cyan",
              badge: "Coach"
            }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="glass-card p-5 rounded-2xl group hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-850 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-800 text-slate-400">
                    {item.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-brand-purple group-hover:text-brand-cyan">
                <span>Open Tool</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Recent Resume Analyses</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-bold">
                DEMO HISTORY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              History of parsed documents and comparative scores
            </p>
          </div>

          <Link
            to="/analyzer"
            className="text-xs font-semibold text-brand-cyan hover:underline flex items-center gap-1"
          >
            Run new analysis &rarr;
          </Link>
        </div>

        {/* Table of recent analyses */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">File / Document</th>
                <th className="pb-3 px-3">Target Role</th>
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">ATS Score</th>
                <th className="pb-3 px-3">Keywords Match</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {recentAnalyses.map((item) => (
                <tr key={item.id} className="hover:bg-navy-800/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-cyan shrink-0" />
                      <span className="font-semibold text-white truncate max-w-[200px]">
                        {item.fileName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-300">
                    {item.targetRole}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {item.date}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[11px] ${
                      item.score >= 80 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : item.score >= 70
                        ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.score} / 100
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono">
                    {item.keywordsMatched}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to="/analyzer"
                      className="px-2.5 py-1 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 hover:text-white border border-white/10 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3 text-brand-purple" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

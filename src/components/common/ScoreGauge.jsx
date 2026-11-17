import React from 'react';

export const ScoreGauge = ({ 
  score = 84, 
  size = 180, 
  strokeWidth = 12, 
  showRating = true,
  subtitle = "ATS Compatibility" 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 80) return { stroke: 'url(#gaugeGradSuccess)', text: 'text-emerald-400', label: 'Strong ATS Match' };
    if (val >= 60) return { stroke: 'url(#gaugeGradPurple)', text: 'text-brand-cyan', label: 'Moderate Match' };
    return { stroke: 'url(#gaugeGradAlert)', text: 'text-amber-400', label: 'Action Required' };
  };

  const status = getScoreColor(score);

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="gaugeGradSuccess" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7357FF" />
            <stop offset="50%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="gaugeGradPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7357FF" />
            <stop offset="100%" stopColor="#00D9FF" />
          </linearGradient>
          <linearGradient id="gaugeGradAlert" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress Value with Gradient */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={status.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {score}
          <span className="text-base sm:text-lg text-slate-400 font-normal">/100</span>
        </span>
        <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
          {subtitle}
        </span>
      </div>

      {showRating && (
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-800 border border-brand-purple/30 text-xs font-semibold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-brand-cyan">{status.label}</span>
          <span className="text-[10px] text-slate-400 font-mono">(Demo)</span>
        </div>
      )}
    </div>
  );
};

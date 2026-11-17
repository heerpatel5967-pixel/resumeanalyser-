import React from 'react';

export const StatCard = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  badge = 'DEMO',
  description,
  accentColor = 'purple'
}) => {
  const getAccentStyles = () => {
    if (accentColor === 'cyan') {
      return {
        border: 'hover:border-brand-cyan/40',
        glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(0,217,255,0.25)]',
        iconBg: 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30',
        badge: 'text-brand-cyan bg-brand-cyan/10 border-brand-cyan/30',
      };
    }
    if (accentColor === 'emerald') {
      return {
        border: 'hover:border-emerald-500/40',
        glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.25)]',
        iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
        badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      };
    }
    return {
      border: 'hover:border-brand-purple/40',
      glow: 'group-hover:shadow-[0_0_25px_-5px_rgba(115,87,255,0.25)]',
      iconBg: 'bg-brand-purple/15 text-brand-purple border-brand-purple/30',
      badge: 'text-brand-purple bg-brand-purple/10 border-brand-purple/30',
    };
  };

  const styles = getAccentStyles();

  return (
    <div className={`group glass-card p-5 rounded-2xl relative overflow-hidden transition-all duration-300 ${styles.border} ${styles.glow}`}>
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none transform translate-x-8 -translate-y-8" />

      <div className="flex items-start justify-between mb-3 relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${styles.iconBg} shadow-sm`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {badge && (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${styles.badge}`}>
            {badge}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {value}
          </span>
          {change && (
            <span className={`text-xs font-bold ${
              changeType === 'positive' ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[11px] text-slate-400 mt-2 leading-tight">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Shield, Check, CreditCard } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'dark', className = '' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[10px] px-2 py-0.5',
    lg: 'text-xs px-2.5 py-0.5'
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Shield + Card Icon Badge */}
      <div className="relative flex items-center justify-center">
        <div className={`rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 p-2 shadow-md shadow-blue-500/20 text-white flex items-center justify-center transition-transform hover:scale-105 ${iconSizes[size]}`}>
          <CreditCard className="w-full h-full stroke-[2.2]" />
        </div>
        <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-0.5 text-white ring-2 ring-white shadow-sm">
          <Check className="w-2.5 h-2.5 stroke-[3]" />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight ${textSizes[size]} ${isLight ? 'text-white' : 'text-slate-900'}`}>
            CARD
          </span>
          <span className={`font-extrabold tracking-tight ${textSizes[size]} text-blue-600`}>
            CHECK
          </span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className={`font-semibold tracking-wider uppercase text-[10px] text-slate-500 ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
            VERIFY & ACTIVATE
          </span>
          <span className={`rounded font-bold uppercase tracking-wider bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 ${badgeSizes[size]}`}>
            OFFICIAL
          </span>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Lock, RefreshCw, Server, CheckCircle2 } from 'lucide-react';

interface VerificationLoadingProps {
  providerName: string;
  maskedCode: string;
  lang?: 'en' | 'fr';
}

export const VerificationLoading: React.FC<VerificationLoadingProps> = ({ providerName, maskedCode, lang = 'fr' }) => {
  const [step, setStep] = useState(0);

  const stepsFr = [
    { label: 'Initialisation de la session sécurisée SSL 256-bit...', icon: Lock },
    { label: `Vérification du format et chiffrement du code ${providerName}...`, icon: ShieldCheck },
    { label: 'Interrogation du registre d\'émission officiel...', icon: Server },
    { label: 'Analyse du statut, du solde et génération de l\'attestation...', icon: RefreshCw }
  ];

  const stepsEn = [
    { label: 'Initializing 256-bit SSL secure session...', icon: Lock },
    { label: `Checking format & encrypting code for ${providerName}...`, icon: ShieldCheck },
    { label: 'Querying official card issuer registry...', icon: Server },
    { label: 'Analyzing validity, certified balance & certificate...', icon: RefreshCw }
  ];

  const steps = lang === 'en' ? stepsEn : stepsFr;

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 350);
    const timer2 = setTimeout(() => setStep(2), 750);
    const timer3 = setTimeout(() => setStep(3), 1150);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-8 text-center animate-in fade-in duration-300">
      {/* Animated Radar/Shield Pulse */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full bg-blue-500/15 animate-ping opacity-75" />
        <div className="absolute inset-2 rounded-full bg-blue-500/20 animate-pulse" />
        
        {/* Central badge */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
          <RefreshCw className="w-8 h-8 animate-spin" />
        </div>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
        {lang === 'en' ? 'Verification & Activation in progress...' : 'Vérification en cours...'}
      </h3>

      <p className="text-sm text-slate-500 mb-6">
        {lang === 'en' ? (
          <>
            Secure processing for <span className="font-semibold text-slate-700">{providerName}</span> (Code <span className="font-mono-code font-bold text-slate-800">{maskedCode}</span>)
          </>
        ) : (
          <>
            Traitement sécurisé pour <span className="font-semibold text-slate-700">{providerName}</span> (Code <span className="font-mono-code font-bold text-slate-800">{maskedCode}</span>)
          </>
        )}
      </p>

      {/* Progress Steps List */}
      <div className="space-y-3 text-left max-w-sm mx-auto mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          const Icon = s.icon;

          return (
            <div
              key={s.label}
              className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                isDone
                  ? 'text-emerald-700 font-semibold'
                  : isCurrent
                  ? 'text-blue-700 font-bold'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {isDone ? (
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              ) : isCurrent ? (
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 animate-spin" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                </div>
              )}
              <span className="truncate">{s.label}</span>
            </div>
          );
        })}
      </div>

      {/* Security note */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
        <Lock className="w-3.5 h-3.5 text-slate-400" />
        <span>Transaction chiffrée de bout en bout • Non conservée</span>
      </div>
    </div>
  );
};

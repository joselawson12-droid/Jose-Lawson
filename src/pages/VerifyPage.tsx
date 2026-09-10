import React, { useState } from 'react';
import { TicketProvider } from '../types';
import { VerificationForm } from '../components/VerificationForm';
import { PaymentMethodsSection } from '../components/PaymentMethodsSection';
import { ShieldCheck, Lock, AlertCircle, HelpCircle, ArrowLeft, Globe, CreditCard, ChevronRight } from 'lucide-react';

interface VerifyPageProps {
  providers: TicketProvider[];
  initialCode?: string;
  initialProviderId?: string;
  onNavigate: (path: string) => void;
}

export const VerifyPage: React.FC<VerifyPageProps> = ({
  providers,
  initialCode = '',
  initialProviderId = 'transcash',
  onNavigate
}) => {
  const [lang, setLang] = useState<'en' | 'fr'>('fr');
  const isEn = lang === 'en';

  const currentProvider = providers.find((p) => p.id === initialProviderId) || providers[0];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      {/* Navigation Bar: Return to Tickets & Language Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Direct return to tickets list without needing to go to home */}
          <button
            type="button"
            onClick={() => onNavigate('/tickets')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition cursor-pointer active:scale-98"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600" />
            <span>{isEn ? '← Change / Select Another Ticket' : '← Retour au choix des tickets'}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <span>{isEn ? 'Home' : 'Accueil'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language Toggle Pill */}
          <div className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                isEn
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                !isEn
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FR
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isEn ? '256-bit SSL Certified Audit' : 'Audit Certifié SSL 256-bit'}</span>
          </div>
        </div>
      </div>

      {/* Selected Ticket Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-xs ${currentProvider?.badgeColor || 'bg-blue-600'}`}>
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xs font-bold uppercase tracking-wider text-slate-400">
                {isEn ? 'Selected Ticket for Activation' : 'Ticket sélectionné pour activation'}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentProvider?.name || 'Recharge Prépayée'}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/tickets')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition cursor-pointer self-start sm:self-auto"
          >
            <span>{isEn ? 'Change ticket' : 'Changer de ticket'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isEn
            ? `Enter the confidential code of your ${currentProvider?.name} receipt below to verify validity, certified balance and proceed to activation.`
            : `Saisissez ci-dessous le code confidentiel de votre reçu ${currentProvider?.name} pour en vérifier la validité, le solde certifié et procéder à l'activation.`}
        </p>
      </div>

      {/* Verification Form */}
      <VerificationForm
        providers={providers}
        initialCode={initialCode}
        initialProviderId={initialProviderId}
        lang={lang}
      />

      {/* Safety Notice & Precautions */}
      <div className="max-w-xl mx-auto rounded-2xl bg-amber-50/70 border border-amber-200 p-4 sm:p-5 text-xs text-amber-900 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{isEn ? 'Important Security Guidelines:' : 'Consignes de sécurité importantes :'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1.5 text-amber-800/90 pl-1 leading-relaxed">
          {isEn ? (
            <>
              <li>Never share your complete voucher code or PIN with unknown people online.</li>
              <li>Never pay deposits for rentals or vehicle purchases using prepaid recharge cards.</li>
              <li>Checks on CARD CHECK do not redeem your voucher unless you explicitly choose activation.</li>
            </>
          ) : (
            <>
              <li>Ne partagez jamais le code complet avec une personne inconnue sur internet.</li>
              <li>Ne payez jamais d'acompte de location ou d'achat de véhicule d'occasion par ticket de recharge.</li>
              <li>Les vérifications sur CARD CHECK n'activent pas le ticket à moins que vous ne le choisissiez explicitement après contrôle.</li>
            </>
          )}
        </ul>
      </div>

      {/* Payment Methods Accordion Section */}
      <div className="pt-4">
        <PaymentMethodsSection />
      </div>
    </div>
  );
};

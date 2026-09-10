import React from 'react';
import { useTranslation } from '../i18n';
import {
  ShieldCheck,
  Search,
  Lock,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  Server,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (path: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {t('howItWorksPage.badge', 'Guide Complet')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t('howItWorksPage.title', 'Comment fonctionne la vérification sur CARD CHECK ?')}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {t('howItWorksPage.subtitle', "Comprendre le cycle de vie d'un coupon de recharge, le fonctionnement des registres émetteurs et la protection contre les fraudes.")}
        </p>
      </div>

      {/* Visual Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center">
            01
          </div>
          <h3 className="font-bold text-base text-slate-900">{t('howItWorksPage.step1Title', 'Achat du ticket')}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('howItWorksPage.step1Desc', "Le client achète une recharge chez un buraliste agréé ou en ligne. Le ticket possède un code unique à 10, 12 ou 16 chiffres.")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center">
            02
          </div>
          <h3 className="font-bold text-base text-slate-900">{t('howItWorksPage.step2Title', 'Chiffrement & Contrôle')}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('howItWorksPage.step2Desc', "CARD CHECK valide la somme de contrôle (checksum) et interroge l'API du registre sans compromettre le code secret.")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center">
            03
          </div>
          <h3 className="font-bold text-base text-slate-900">{t('howItWorksPage.step3Title', 'Attestation Immédiate')}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('howItWorksPage.step3Desc', "Le statut exact est retourné : Valide avec le solde nominal restant, Déjà utilisé, Expiré ou Invalide avec horodatage.")}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 font-bold flex items-center justify-center">
            04
          </div>
          <h3 className="font-bold text-base text-slate-900">{t('howItWorksPage.step4Title', 'Reçu & Consignation')}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {t('howItWorksPage.step4Desc', "Vous téléchargez l'attestation PDF officielle avec empreinte cryptographique SHA-256 pour sécuriser vos échanges.")}
          </p>
        </div>
      </div>

      {/* Guide Anti-Arnaque */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl border border-amber-200/80 p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shadow-xs">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-amber-950">
              {t('howItWorksPage.scamGuideTitle', 'Guide officiel de prévention contre les arnaques')}
            </h2>
            <p className="text-xs sm:text-sm text-amber-800">
              {t('howItWorksPage.scamGuideSubtitle', 'Soyez vigilant : les tickets de recharge ne sont pas un moyen de paiement entre particuliers inconnus.')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-amber-900">
          <div className="p-4 rounded-xl bg-white/80 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-rose-800 flex items-center gap-1.5">
              <span>{t('howItWorksPage.scamNeverDoTitle', '✕ Ne faites jamais :')}</span>
            </h4>
            <p className="text-slate-600">
              {t('howItWorksPage.scamNeverDoDesc', 'Ne transmettez jamais une photo du ticket avec le code visible ou une partie du code par SMS / WhatsApp pour "prouver que vous avez acheté le ticket".')}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-rose-800 flex items-center gap-1.5">
              <span>{t('howItWorksPage.scamNeverBelieveTitle', '✕ Ne croyez jamais :')}</span>
            </h4>
            <p className="text-slate-600">
              {t('howItWorksPage.scamNeverBelieveDesc', 'Aucun organisme officiel (Police, Impôts, Notaires, Transporteurs) ne demande de règlement par coupon Transcash, PCS ou Neosurf.')}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span>{t('howItWorksPage.scamGoodReflexTitle', '✓ Bon réflexe :')}</span>
            </h4>
            <p className="text-slate-600">
              {t('howItWorksPage.scamGoodReflexDesc', "Vérifiez vous-même l'authenticité de votre reçu sur CARD CHECK avant de créditer votre carte bancaire personnelle.")}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/80 border border-amber-200/60 space-y-1.5">
            <h4 className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span>{t('howItWorksPage.scamInDoubtTitle', '✓ En cas de doute :')}</span>
            </h4>
            <p className="text-slate-600">
              {t('howItWorksPage.scamInDoubtDesc', "Conservez précieusement le ticket de caisse du magasin avec la date et l'heure d'émission pour toute demande de contestation.")}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => onNavigate('/verify')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>{t('howItWorksPage.btnVerifyNow', 'Vérifier un ticket maintenant')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

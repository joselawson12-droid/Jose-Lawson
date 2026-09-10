import React from 'react';
import { Layers, Eye, ShieldCheck, FileCheck2, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n';

interface HowItWorksSectionProps {
  onStartClick?: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onStartClick }) => {
  const { t } = useTranslation();

  const steps = [
    {
      stepNumber: '1',
      title: t('howItWorks.step1Title', 'Sélectionnez votre recharge'),
      description: t('howItWorks.step1Desc', 'Choisissez l’émetteur de votre coupon parmi notre liste exhaustive (Transcash, PCS, Neosurf, Paysafecard, CASHlib, etc.).'),
      icon: Layers,
      color: 'from-blue-600 to-indigo-600',
      badge: t('howItWorks.step1Badge', 'Étape 1')
    },
    {
      stepNumber: '2',
      title: t('howItWorks.step2Title', 'Saisissez le code sécurisé'),
      description: t('howItWorks.step2Desc', 'Entrez le numéro du ticket. Le champ est masqué par défaut avec une icône œil 👁️ pour afficher ou cacher les chiffres en toute discrétion.'),
      icon: Eye,
      color: 'from-indigo-600 to-purple-600',
      badge: t('howItWorks.step2Badge', 'Étape 2')
    },
    {
      stepNumber: '3',
      title: t('howItWorks.step3Title', 'Lancez l’analyse chiffrée'),
      description: t('howItWorks.step3Desc', 'Notre moteur sécurisé interroge les protocoles d’authentification sous chiffrement SSL 256 bits sans transfert de propriété.'),
      icon: ShieldCheck,
      color: 'from-purple-600 to-blue-600',
      badge: t('howItWorks.step3Badge', 'Étape 3')
    },
    {
      stepNumber: '4',
      title: t('howItWorks.step4Title', 'Consultez votre certificat'),
      description: t('howItWorks.step4Desc', 'Recevez instantanément le résultat certifié : solde disponible, statut de validité et certificat horodaté officiel téléchargeable.'),
      icon: FileCheck2,
      color: 'from-emerald-600 to-teal-600',
      badge: t('howItWorks.step4Badge', 'Étape 4')
    }
  ];

  return (
    <section id="mes-premiers-pas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>{t('howItWorks.badge', 'Mes Premiers Pas')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {t('howItWorks.title', 'Mes premiers pas : comment ça marche ?')}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t('howItWorks.subtitle', 'Quatre étapes simples et transparentes pour certifier vos tickets prépayés sans aucun risque.')}
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Step badge + number */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} text-white font-black text-lg flex items-center justify-center shadow-sm`}>
                    {item.stepNumber}
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-1.5 group-hover:text-blue-600 transition-colors">
                    <Icon className="w-4 h-4 text-blue-600 shrink-0" />
                    <h3>{item.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{t('howItWorks.estimatedTime', 'Temps estimé : < 30 sec')}</span>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden lg:block" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Banner */}
      {onStartClick && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onStartClick}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer active:scale-98"
          >
            <span>{t('howItWorks.btnLaunchCheck', 'Lancer une vérification maintenant')}</span>
            <ArrowRight className="w-4 h-4 text-blue-100" />
          </button>
        </div>
      )}
    </section>
  );
};

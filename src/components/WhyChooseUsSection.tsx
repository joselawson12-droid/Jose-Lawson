import React from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Award,
  Headphones,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../i18n';

export const WhyChooseUsSection: React.FC = () => {
  const { t } = useTranslation();

  const trustPillars = [
    {
      title: t('whyUs.pillar1Title', 'Simplicité'),
      highlight: t('whyUs.pillar1Highlight', '3 clics sans inscription obligatoire'),
      description: t('whyUs.pillar1Desc', 'Aucun formulaire fastidieux. Choisissez votre émetteur, entrez votre code et lancez le contrôle immédiatement.'),
      icon: Sparkles,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: t('whyUs.pillar2Title', 'Rapidité'),
      highlight: t('whyUs.pillar2Highlight', 'Résultat délivré en < 1,5s'),
      description: t('whyUs.pillar2Desc', 'Les serveurs exécutent les requêtes en continu avec une latence quasi nulle pour un diagnostic en direct.'),
      icon: Zap,
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      title: t('whyUs.pillar3Title', 'Sécurité'),
      highlight: t('whyUs.pillar3Highlight', 'Chiffrement SSL TLS 1.3 & SHA-256'),
      description: t('whyUs.pillar3Desc', 'Protocoles bancaires conformes PCI-DSS garantissant la confidentialité absolue de vos codes et transactions.'),
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: t('whyUs.pillar4Title', 'Fiabilité'),
      highlight: t('whyUs.pillar4Highlight', 'Précision à 100% sur les formats'),
      description: t('whyUs.pillar4Desc', 'Analyse algorithmique stricte des checksums et correspondances officielles avec les registres d’émission.'),
      icon: Award,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      title: t('whyUs.pillar5Title', 'Assistance'),
      highlight: t('whyUs.pillar5Highlight', 'Support humain réactif 7j/7'),
      description: t('whyUs.pillar5Desc', 'Une équipe technique d’experts disponible pour vous assister et répondre à toutes vos questions par ticket et email.'),
      icon: Headphones,
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    },
    {
      title: t('whyUs.pillar6Title', 'Disponibilité'),
      highlight: t('whyUs.pillar6Highlight', 'Plateforme active 24h/24'),
      description: t('whyUs.pillar6Desc', 'Infrastructure cloud haute disponibilité avec un taux de disponibilité supérieur à 99,98% toute l’année.'),
      icon: Clock,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    }
  ];

  return (
    <section id="pourquoi-nous-choisir" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('whyUs.badge', 'Nos Engagements')}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {t('whyUs.title', 'Pourquoi choisir CARD CHECK ?')}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t('whyUs.subtitle', "Six critères d'excellence qui font de notre service la solution privilégiée pour sécuriser chaque euro investi dans vos recharges.")}
        </p>
      </div>

      {/* 6 Trust Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trustPillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="bg-white hover:border-blue-300 border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition duration-200 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${pillar.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {pillar.title}
                </h3>
                <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-semibold mt-1 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{pillar.highlight}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

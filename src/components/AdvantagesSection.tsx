import React from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  FileCheck2,
  Smartphone,
  Layers,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '../i18n';

export const AdvantagesSection: React.FC = () => {
  const { t } = useTranslation();

  const advantages = [
    {
      icon: Zap,
      iconColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      title: t('advantages.adv1Title', 'Contrôle Instantané en Temps Réel'),
      description: t('advantages.adv1Desc', 'Obtenez le statut précis de votre recharge et son montant en moins de 1,5 seconde grâce à nos connecteurs directs.')
    },
    {
      icon: Lock,
      iconColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      title: t('advantages.adv2Title', 'Confidentialité & Masquage Actif'),
      description: t('advantages.adv2Desc', 'Champ de saisie masqué par défaut façon mot de passe. Aucun code secret n’est partagé ni stocké en clair.')
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      title: t('advantages.adv3Title', 'Protection Anti-Fraude & Sécurisation'),
      description: t('advantages.adv3Desc', 'Détecte les coupons contrefaits, expirés ou déjà débités pour prévenir toute perte financière irréversible.')
    },
    {
      icon: FileCheck2,
      iconColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      title: t('advantages.adv4Title', 'Certificat de Conformité Horodaté'),
      description: t('advantages.adv4Desc', 'Délivrance d’un reçu numérique avec numéro de sceau unique et horodatage certifié, recevable comme preuve d’échange.')
    },
    {
      icon: Layers,
      iconColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      title: t('advantages.adv5Title', 'Compatibilité Multi-Opérateurs'),
      description: t('advantages.adv5Desc', 'Prise en charge intégrale des marques majeures : Transcash, PCS Mastercard, Neosurf, Paysafecard, Toneo, Steam, Amazon...')
    },
    {
      icon: Smartphone,
      iconColor: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      title: t('advantages.adv6Title', 'Expérience 100% Mobile & Ergonomique'),
      description: t('advantages.adv6Desc', 'Interface ultra-fluide pensée pour une utilisation rapide depuis votre téléphone au moment même de l’achat en boutique.')
    }
  ];

  return (
    <section id="avantages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('advantages.badge', 'Atouts Clés')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {t('advantages.title', 'Pourquoi nos utilisateurs nous font confiance')}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t('advantages.subtitle', "Une suite d'outils pensés pour éliminer les risques de fraude et garantir la validité de chaque transaction prépayée.")}
        </p>
      </div>

      {/* Grid of Advantages Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advantages.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>{t('advantages.guaranteedAdvantage', 'Avantage garanti')}</span>
                <span className="text-blue-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {t('common.learnMore', 'En savoir plus')} →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

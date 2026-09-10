import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import {
  ShieldCheck,
  Check,
  Zap,
  Building2,
  Lock,
  ArrowRight,
  CreditCard,
  Headphones,
  FileCheck,
  Sparkles
} from 'lucide-react';

interface PricingPageProps {
  onNavigate: (path: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'free',
      name: t('pricing.planFreeName', 'Standard Particulier'),
      badge: t('pricing.planFreeBadge', 'Accès Libre'),
      badgeColor: 'bg-slate-100 text-slate-700',
      description: t('pricing.planFreeDesc', 'Pour la vérification ponctuelle de coupons et tickets prépayés.'),
      price: billingCycle === 'monthly' ? '0 €' : '0 €',
      period: t('pricing.planFreePeriod', 'gratuit à vie'),
      highlighted: false,
      features: [
        t('pricing.planFreeF1', "Jusqu'à 10 vérifications de tickets par mois"),
        t('pricing.planFreeF2', "Contrôle d'authenticité instantané (PCS, Transcash, Neosurf...)"),
        t('pricing.planFreeF3', 'Détection des codes déjà utilisés ou périmés'),
        t('pricing.planFreeF4', 'Certificat de conformité numérique de base'),
        t('pricing.planFreeF5', 'Accès au support standard par email')
      ],
      buttonLabel: t('pricing.planFreeBtn', 'Commencer gratuitement'),
      buttonAction: () => onNavigate('/verify')
    },
    {
      id: 'plus',
      name: t('pricing.planPlusName', 'Sécurité Premium'),
      badge: t('pricing.planPlusBadge', 'Le plus populaire'),
      badgeColor: 'bg-blue-600 text-white',
      description: t('pricing.planPlusDesc', 'Protection maximale pour acheteurs et vendeurs réguliers.'),
      price: billingCycle === 'monthly' ? '9,90 €' : '7,90 €',
      period: t('pricing.planPlusPeriod', 'par mois'),
      highlighted: true,
      features: [
        t('pricing.planPlusF1', 'Vérifications illimitées de tickets et coupons'),
        t('pricing.planPlusF2', 'Verrouillage anti-fraude et mise sous séquestre sécurisée'),
        t('pricing.planPlusF3', "Preuve d'authenticité cryptographique horodatée (Sceau SSL)"),
        t('pricing.planPlusF4', 'Accès complet à la passerelle de paiement multicarte'),
        t('pricing.planPlusF5', 'Support prioritaire 7j/7 avec réponse garantie en 2h'),
        t('pricing.planPlusF6', 'Historique complet des transactions dans votre Espace Client')
      ],
      buttonLabel: t('pricing.planPlusBtn', 'Activer le forfait Premium'),
      buttonAction: () => onNavigate('/payment')
    },
    {
      id: 'enterprise',
      name: t('pricing.planEntName', 'Business & API'),
      badge: t('pricing.planEntBadge', 'Entreprises'),
      badgeColor: 'bg-emerald-100 text-emerald-800',
      description: t('pricing.planEntDesc', 'Pour commerçants, places de marché et plateformes marchandes.'),
      price: billingCycle === 'monthly' ? '49 €' : '39 €',
      period: t('pricing.planEntPeriod', 'par mois'),
      highlighted: false,
      features: [
        t('pricing.planEntF1', 'Accès API REST & Webhooks temps réel haute disponibilité'),
        t('pricing.planEntF2', 'Intégration passerelle marchande (Stripe, PayPal, Adyen)'),
        t('pricing.planEntF3', 'Taux de disponibilité SLA garanti 99,95 %'),
        t('pricing.planEntF4', 'Gestion multi-comptes et rôles collaborateurs'),
        t('pricing.planEntF5', "Rapports d'audit PCI-DSS et export comptable automatisé"),
        t('pricing.planEntF6', 'Gestionnaire de compte dédié et assistance téléphonique directe')
      ],
      buttonLabel: t('pricing.planEntBtn', 'Contacter notre équipe'),
      buttonAction: () => onNavigate('/contact')
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>{t('pricing.badge', 'Tarification Transparente & Sans Engagement')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('pricing.title', 'Des formules adaptées à tous vos besoins de sécurité')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('pricing.subtitle', "Vérifiez l'authenticité de vos coupons en quelques secondes ou sécurisez vos paiements en ligne avec notre technologie certifiée.")}
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1 bg-slate-200/80 rounded-xl mt-4">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('pricing.monthlyBilling', 'Facturation mensuelle')}
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{t('pricing.annualBilling', 'Facturation annuelle')}</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                {t('pricing.discountBadge', '-20 %')}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl flex flex-col justify-between transition duration-200 ${
                plan.highlighted
                  ? 'bg-white border-2 border-blue-600 shadow-xl relative'
                  : 'bg-white border border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-xs text-slate-500">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 pt-2">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 sm:p-8 pt-0 mt-auto">
                <button
                  type="button"
                  onClick={plan.buttonAction}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{plan.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto md:mx-0">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t('pricing.gridPciTitle', 'Norme PCI-DSS & SSL')}</h4>
              <p className="text-xs text-slate-500">{t('pricing.gridPciDesc', 'Chiffrement bancaire 256 bits et protection intégrale des transactions.')}</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto md:mx-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t('pricing.gridCertTitle', 'Certificat Vérifiable')}</h4>
              <p className="text-xs text-slate-500">{t('pricing.gridCertDesc', 'Chaque contrôle génère un scellé cryptographique infalsifiable.')}</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto md:mx-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t('pricing.gridPayTitle', 'Moyens de paiement variés')}</h4>
              <p className="text-xs text-slate-500">{t('pricing.gridPayDesc', 'Visa, Mastercard, CB, Apple Pay, Google Pay et coupons prépayés.')}</p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto md:mx-0">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">{t('pricing.gridSupportTitle', 'Support Dédié')}</h4>
              <p className="text-xs text-slate-500">{t('pricing.gridSupportDesc', 'Équipe réactive joignable via support@cardcheck-platform.com.')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

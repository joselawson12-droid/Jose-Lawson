import React from 'react';
import { Store, MapPin, ShoppingBag, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../i18n';

export const WhereToBuySection: React.FC = () => {
  const { t } = useTranslation();

  const authorizedChannels = [
    {
      icon: Store,
      title: t('whereToBuy.channel1Title', 'Bureaux de tabac & Buralistes'),
      description: t('whereToBuy.channel1Desc', 'Le réseau physique le plus étendu. Demandez votre recharge directement au comptoir et conservez impérativement votre ticket de caisse imprimé.'),
      badge: t('whereToBuy.channel1Badge', 'Réseau Physique Officiel')
    },
    {
      icon: MapPin,
      title: t('whereToBuy.channel2Title', 'Kiosques, Presse & Relais'),
      description: t('whereToBuy.channel2Desc', 'Disponibles dans les gares, centres commerciaux et stations-service partenaires (Total, Relay, commerces de quartier agréés).'),
      badge: t('whereToBuy.channel2Badge', 'Points de Vente Partenaires')
    },
    {
      icon: ShoppingBag,
      title: t('whereToBuy.channel3Title', 'Grandes Surfaces & Supermarchés'),
      description: t('whereToBuy.channel3Desc', 'Présents au rayon cartes cadeaux de vos hypermarchés (Carrefour, Auchan, Leclerc). Activation physique validée en caisse.'),
      badge: t('whereToBuy.channel3Badge', 'Distribution Généraliste')
    },
    {
      icon: CheckCircle2,
      title: t('whereToBuy.channel4Title', 'Distributeurs Agréés en Ligne'),
      description: t('whereToBuy.channel4Desc', 'Achetez exclusivement sur les sites officiels des marques (Transcash, PCS, Neosurf, Dundle, Becharge) avec paiement 3D-Secure.'),
      badge: t('whereToBuy.channel4Badge', 'Vente Web Certifiée')
    }
  ];

  return (
    <section id="ou-acheter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Store className="w-3.5 h-3.5" />
          <span>{t('whereToBuy.badge', 'Réseau de Distribution')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {t('whereToBuy.title', 'Où acheter vos tickets de recharge en toute sécurité ?')}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t('whereToBuy.subtitle', 'Pour éviter les contrefaçons et les codes déjà utilisés, privilégiez toujours les canaux officiels homologués par les émetteurs.')}
        </p>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {authorizedChannels.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/80">
                  <Icon className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                  {item.badge}
                </span>

                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{t('whereToBuy.certifiedVoucher', 'Ticket certifié conforme')}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning Box */}
      <div className="mt-8 p-6 sm:p-7 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
        <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800 shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
          <h4 className="font-bold text-amber-900 text-sm sm:text-base">
            {t('whereToBuy.warningTitle', 'Mise en garde stricte contre les sites de revente non accrédités')}
          </h4>
          <p className="text-amber-800">
            {t('whereToBuy.warningDesc', "N'achetez jamais de codes de recharge auprès de particuliers sur les réseaux sociaux (Telegram, WhatsApp, Facebook) ou sur des plateformes d'annonces gratuites avec de fortes remises anormales (-30%, -50%). 99% de ces offres dissimulent des tickets volés ou déjà invalidés par les banques.")}
          </p>
        </div>
      </div>
    </section>
  );
};

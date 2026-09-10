import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { ChevronDown, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = [
    { id: 'all', label: t('faqPage.catAll', 'Toutes les questions') },
    { id: 'verification', label: t('faqPage.catVerification', 'Vérification & Solde') },
    { id: 'securite', label: t('faqPage.catSecurite', 'Sécurité & Confidentialité') },
    { id: 'fournisseurs', label: t('faqPage.catFournisseurs', 'Marques & Coupons') },
    { id: 'litiges', label: t('faqPage.catLitiges', 'Problèmes & Litiges') }
  ];

  const faqs = [
    {
      category: 'verification',
      q: t('faqPage.q1', 'Est-ce que la vérification consomme ou active le coupon ?'),
      a: t('faqPage.a1', 'Non. Une simple vérification interroge uniquement le statut du coupon dans la base émettrice. Votre solde reste 100% intact tant que vous ne cliquez pas sur "Activer" ou ne l\'utilisez pas sur le service officiel de la marque.')
    },
    {
      category: 'verification',
      q: t('faqPage.q2', 'Combien de temps prend la vérification ?'),
      a: t('faqPage.a2', 'L\'opération est quasi-instantanée : entre 0,8 et 1,8 seconde selon le temps de réponse de la passerelle de l\'émetteur.')
    },
    {
      category: 'securite',
      q: t('faqPage.q3', 'Qui peut voir le code que j\'ai saisi ?'),
      a: t('faqPage.a3', 'Personne. La communication s\'effectue via tunnel chiffré SSL 256-bit. De plus, nos journaux administratifs appliquent un masquage strict (ex: TR-••••-8491) pour garantir votre anonymat et la non-divulgation des données sensibles.')
    },
    {
      category: 'securite',
      q: t('faqPage.q4', 'Un vendeur ou un acheteur me demande de lui envoyer le code, que faire ?'),
      a: t('faqPage.a4', 'Ne le faites sous aucun prétexte. Une personne qui possède le code et les chiffres peut débiter le coupon en quelques secondes sans que vous ne puissiez l\'annuler. Envoyez uniquement l\'attestation de contrôle sans le code.')
    },
    {
      category: 'fournisseurs',
      q: t('faqPage.q5', 'Mon ticket Transcash a 12 chiffres, est-ce normal ?'),
      a: t('faqPage.a5', 'Oui, les recharges Transcash Mastercard comportent généralement 12 chiffres imprimés en gras sur le ticket de caisse délivré en bureau de tabac ou magasin de presse.')
    },
    {
      category: 'fournisseurs',
      q: t('faqPage.q6', 'Quelle est la différence entre PCS Mastercard et Neosurf ?'),
      a: t('faqPage.a6', 'PCS Mastercard est conçu principalement pour recharger une carte de paiement prépayée Mastercard. Neosurf est un coupon de paiement en ligne direct utilisable sur des centaines de sites marchands et de jeux en ligne partenaires.')
    },
    {
      category: 'litiges',
      q: t('faqPage.q7', 'Pourquoi mon ticket indique « Déjà utilisé » alors que je viens de l\'acheter ?'),
      a: t('faqPage.a7', 'Ce cas rare peut survenir en cas d\'erreur de manipulation en caisse ou si le ticket a été compromis avant la remise. Conservez votre ticket de caisse original et contactez le support du point de vente muni de votre attestation CARD CHECK.')
    },
    {
      category: 'litiges',
      q: t('faqPage.q8', 'Le résultat indique « Vérification impossible », pourquoi ?'),
      a: t('faqPage.a8', 'Certains serveurs d\'émetteurs effectuent des opérations de maintenance nocturnes ou connaissent de brèves saturations. Réessayez simplement après 2 ou 3 minutes.')
    }
  ];

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === selectedCategory);

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {t('faqPage.badge', "Centre d'aide")}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t('faqPage.title', 'Foire Aux Questions')}
        </h1>
        <p className="text-sm sm:text-base text-slate-500">
          {t('faqPage.subtitle', 'Trouvez des réponses claires sur la vérification de vos tickets, la sécurité de vos fonds et les bonnes pratiques.')}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div
              key={faq.q}
              className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-800 text-sm sm:text-base hover:bg-slate-50 transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Need more help */}
      <div className="rounded-3xl bg-slate-100 border border-slate-200 p-6 sm:p-8 text-center space-y-3">
        <h3 className="font-bold text-slate-900 text-lg">{t('faqPage.needHelpTitle', 'Vous ne trouvez pas la réponse à votre question ?')}</h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {t('faqPage.needHelpSubtitle', "Notre service d'assistance est joignable pour répondre à toute demande spécifique concernant votre coupon.")}
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/contact')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition cursor-pointer"
        >
          <span>{t('faqPage.btnContactSupport', 'Contacter le support client')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { TicketProvider } from '../types';
import { useTranslation } from '../i18n';
import { PresentationSection } from '../components/PresentationSection';
import { AdvantagesSection } from '../components/AdvantagesSection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { WhereToBuySection } from '../components/WhereToBuySection';
import { PaymentMethodsSection } from '../components/PaymentMethodsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { HERO_BACKGROUND_IMAGE } from '../config/hero';
import {
  ShieldCheck,
  Zap,
  Lock,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ArrowRight,
  CreditCard,
  Send,
  Sparkles,
  PhoneCall,
  Mail,
  Search,
  RotateCcw
} from 'lucide-react';

/**
 * ==============================================================================
 * IMAGE D'ARRIÈRE-PLAN DU HERO (SECTION ACCUEIL)
 * ==============================================================================
 * Vous pouvez également modifier la constante dans `src/config/hero.ts`.
 */
export { HERO_BACKGROUND_IMAGE };

interface HomePageProps {
  providers?: TicketProvider[];
  initialCode?: string;
  initialProviderId?: string;
  onNavigate: (path: string) => void;
  onOpenActivationModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenActivationModal
}) => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleActivateClick = () => {
    if (onOpenActivationModal) {
      onOpenActivationModal();
    } else {
      onNavigate('/tickets');
    }
  };

  const scrollToPresentation = () => {
    const el = document.getElementById('presentation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: t('faq.q1', 'Comment fonctionne le service CARD CHECK ?'),
      a: t('faq.a1', 'CARD CHECK se connecte de manière sécurisée aux interfaces techniques et registres des émetteurs partenaires. En saisissant le code confidentiel de votre ticket, le système interroge le statut du coupon (solde disponible, validité, date de création, activation) sans transférer de fonds ni débiter la valeur.')
    },
    {
      q: t('faq.q2', 'Comment utiliser la plateforme pour vérifier ou activer un coupon ?'),
      a: t('faq.a2', 'Rien de plus simple : 1. Cliquez sur « Activate My Card ». 2. Choisissez la marque de votre ticket dans la liste (Transcash, PCS, CASHlib, Neosurf...). 3. Saisissez votre code dans le champ sécurisé (masqué par défaut avec œil 👁️). 4. Cliquez sur « Vérifier l’authenticité » pour obtenir le diagnostic et le certificat officiel.')
    },
    {
      q: t('faq.q3', 'Mes informations personnelles et mes codes sont-ils protégés ?'),
      a: t('faq.a3', 'Absolument. CARD CHECK applique un chiffrement SSL/TLS 1.3 de bout en bout avec hachage cryptographique SHA-256. Aucun code brut, code PIN ou mot de passe n\'est jamais stocké en clair sur nos serveurs. L’historique d’audit ne conserve qu’une empreinte masquée conforme aux normes bancaires PCI-DSS.')
    },
    {
      q: t('faq.q4', 'Combien de temps prend le traitement d’une demande ?'),
      a: t('faq.a4', 'Le traitement est instantané et s’effectue en temps réel, généralement en moins de 1,5 seconde. Dès la soumission, nos connecteurs cryptés interrogent la base de données de l’émetteur et génèrent votre attestation de conformité sans délai d’attente.')
    },
    {
      q: t('faq.q5', 'Comment contacter le support en cas de doute ou de difficulté ?'),
      a: t('faq.a5', 'Notre équipe d’assistance technique est joignable 7j/7 via le formulaire de contact en bas de page ou par email direct à support@cardcheck-platform.com. Nous traitons chaque demande sous 24h avec un suivi personnalisé.')
    },
    {
      q: t('faq.q6', 'Que faire si le résultat indique « Ticket déjà utilisé » ?'),
      a: t('faq.a6', 'Si vous venez d\'acheter ce ticket en point de vente ou bureau de tabac et qu\'il apparaît déjà consommé, retournez immédiatement chez le commerçant muni de votre ticket de caisse imprimé et horodaté pour faire valoir vos droits auprès de l\'émetteur.')
    },
    {
      q: t('faq.q7', 'Comment me protéger contre les arnaques aux tickets de recharge ?'),
      a: t('faq.a7', 'Règle absolue : n\'achetez jamais de tickets pour effectuer un paiement demandé par un inconnu sur internet (LeBonCoin, Facebook, fausses annonces de location, loteries). Ne partagez JAMAIS votre code secret par photo, SMS ou téléphone.')
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSubmitted(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. SECTION ACCUEIL / HERO                                                 */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-black text-white scroll-mt-20"
      >
        {/* Background Image: Plein écran, femme souriante tenant une carte, occupant tout l'arrière-plan */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={HERO_BACKGROUND_IMAGE}
            alt="Femme souriante présentant une carte de recharge prépayée"
            className="w-full h-full object-cover object-center sm:object-[center_25%] scale-100"
            referrerPolicy="no-referrer"
          />

          {/* Overlay léger et élégant : préserve la clarté et la visibilité intégrale de la femme et de sa carte */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/45" />

          {/* Halo subtil moderne pour magnifier la profondeur visuelle */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Contenu du Hero centré au premier plan, lisibilité parfaite sans masquer la femme */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-7">
          {/* Badge officiel */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 border border-white/20 text-slate-200 text-xs font-bold tracking-wide shadow-xl backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('hero.badge', 'Plateforme Officielle de Vérification & Activation')}</span>
          </div>

          {/* Titre principal avec accent or/jaune chaleureux */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto drop-shadow-lg">
            {t('hero.title', 'Vérifiez la validité et activez vos')}{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {t('hero.titleHighlight', 'tickets de recharge')}
            </span>
          </h1>

          {/* Sous-titre avec fond glassmorphism léger pour une lisibilité optimale */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg lg:text-xl text-slate-100 leading-relaxed font-medium drop-shadow-md bg-black/40 backdrop-blur-sm py-2.5 px-5 rounded-2xl border border-white/10">
              {t('hero.subtitle', "Contrôlez instantanément le statut, le solde certifié et l'authenticité de vos coupons en toute sécurité grâce à notre protocole bancaire chiffré.")}
            </p>
          </div>

          {/* Boutons d'action du Hero */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Bouton principal : Activate My Card */}
            <button
              id="hero-btn-activate-card"
              type="button"
              onClick={handleActivateClick}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base shadow-xl shadow-blue-950/40 hover:shadow-blue-600/30 border border-blue-500 hover:border-blue-400 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 active:scale-98 min-h-[54px] group"
            >
              <CreditCard className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform" />
              <span className="tracking-wide">{t('hero.activateBtn', 'Activate My Card')}</span>
              <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Bouton secondaire : Remboursement (Fond blanc, texte bleu, bordure discrète) */}
            <button
              id="hero-btn-refund"
              type="button"
              onClick={() => onNavigate('/remboursement')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-blue-600 hover:text-blue-700 font-bold text-sm border border-blue-200 hover:border-blue-300 shadow-md transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 active:scale-98 min-h-[54px]"
            >
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>{t('nav.refund', 'Remboursement')}</span>
            </button>
          </div>

          {/* Reassurance Metrics avec badge translucide élégant */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-100 bg-black/50 backdrop-blur-md py-3 px-6 rounded-2xl border border-white/10 max-w-3xl mx-auto shadow-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('hero.statSpeed', 'Contrôle en temps réel (< 1,5s)')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{t('hero.statSecurity', 'Chiffrement SSL 256-bit')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-300 shrink-0" />
                <span>{t('hero.statMobile', 'Optimisé 100% Smartphone')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION PRÉSENTATION (Fond clair #FFFFFF)                              */}
      {/* ========================================================================= */}
      <div className="w-full bg-white border-b border-slate-100/90">
        <PresentationSection onStartClick={handleActivateClick} />
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION AVANTAGES (Nuance très légère)                                 */}
      {/* ========================================================================= */}
      <div className="w-full bg-slate-50/70 border-b border-slate-200/60">
        <AdvantagesSection />
      </div>

      {/* ========================================================================= */}
      {/* 4. SECTION POURQUOI NOUS CHOISIR (Fond clair #FFFFFF)                     */}
      {/* ========================================================================= */}
      <div className="w-full bg-white border-b border-slate-100/90">
        <WhyChooseUsSection />
      </div>

      {/* ========================================================================= */}
      {/* 5. SECTION MES PREMIERS PAS (Nuance très légère)                          */}
      {/* ========================================================================= */}
      <div className="w-full bg-slate-50/70 border-b border-slate-200/60">
        <HowItWorksSection onStartClick={handleActivateClick} />
      </div>

      {/* ========================================================================= */}
      {/* 6. SECTION AVIS INTERNAUTES (Fond clair #FFFFFF)                          */}
      {/* ========================================================================= */}
      <div id="avis-internautes" className="w-full bg-white border-b border-slate-100/90 scroll-mt-20">
        <TestimonialsSection onNavigate={onNavigate} />
      </div>

      {/* ========================================================================= */}
      {/* SECTION COMPLÉMENTAIRE : OÙ ACHETER VOS TICKETS (Nuance très légère)      */}
      {/* ========================================================================= */}
      <div className="w-full bg-slate-50/70 border-b border-slate-200/60">
        <WhereToBuySection />
      </div>

      {/* ========================================================================= */}
      {/* SECTION COMPLÉMENTAIRE : MOYENS DE PAIEMENT (Fond clair #FFFFFF)          */}
      {/* ========================================================================= */}
      <div id="payment-methods" className="w-full bg-white border-b border-slate-100/90 py-12 sm:py-16 scroll-mt-20">
        <PaymentMethodsSection />
      </div>

      {/* ========================================================================= */}
      {/* SECTION FAQ (Nuance très légère)                                          */}
      {/* ========================================================================= */}
      <div className="w-full bg-slate-50/70 border-b border-slate-200/60 py-12 sm:py-16">
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="text-center mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t('faq.badge', 'Foire Aux Questions')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('faq.title', 'Tout ce que vous devez savoir')}
            </h2>
            <p className="text-sm text-slate-500">
              {t('faq.subtitle', 'Des réponses claires à vos questions sur le fonctionnement et la sécurité de vos tickets.')}
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer"
                  >
                    <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* SECTION ASSISTANCE & CONTACT (Fond clair #FFFFFF avec carte blanche)      */}
      {/* ========================================================================= */}
      <div className="w-full bg-white py-12 sm:py-16">
        <section id="contact" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="rounded-2xl bg-white text-slate-900 p-6 sm:p-10 shadow-sm border border-slate-200/90">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>{t('contact.badge', 'Assistance Dédiée 7j/7')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {t('contact.title', "Besoin d'aide pour votre ticket ?")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t('contact.subtitle', "Nos conseillers techniques répondent à toutes vos questions relatives aux codes, à l'authenticité de vos coupons et à l'utilisation du service.")}
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700 font-semibold">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>support@cardcheck-platform.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-600" />
                    <span>{t('contact.boxPhoneTitle', "Ligne d'assistance non surtaxée 7j/7")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80">
                {contactSubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900">{t('contact.sentSuccessTitle', 'Message envoyé !')}</h4>
                    <p className="text-xs text-slate-600">
                      {t('contact.sentSuccessDesc', 'Merci. Un conseiller technique vous répondra dans un délai de 24h maximum.')}
                    </p>
                    <button
                      type="button"
                      onClick={() => setContactSubmitted(false)}
                      className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      {t('contact.btnSendAnother', 'Envoyer un autre message')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        {t('contact.fieldName', 'Votre Nom')}
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex: Jean Dupont"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        {t('contact.fieldEmail', 'Votre Email')}
                      </label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="jean.dupont@email.com"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        {t('contact.fieldMessage', 'Message ou référence')}
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder={t('contact.fieldMessagePlaceholder', 'Précisez votre demande...')}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('contact.btnSend', 'Envoyer ma demande')}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

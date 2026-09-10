import React, { useState } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Lock, AlertTriangle, CheckCircle2, FileText, HelpCircle, Mail, Globe, Sparkles, X, RotateCcw } from 'lucide-react';
import { useTranslation } from '../i18n';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenActivationModal?: () => void;
}

type LegalModalType = 'privacy' | 'terms' | 'legal' | null;

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenActivationModal }) => {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<LegalModalType>(null);

  const handleSectionClick = (sectionId: string) => {
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Security Advisory Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-slate-400">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="leading-relaxed">
            <strong className="text-slate-200">{t('footer.securityAdvisoryTitle', 'Avertissement de sécurité officiel :')} </strong>
            {t('footer.securityAdvisoryText', "Ne communiquez jamais le code secret de votre ticket de recharge par téléphone, email ou messagerie à un tiers. Les tickets de recharge sont assimilables à des espèces et ne doivent servir qu'à des paiements directs ou recharges personnelles.")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t('footer.missionText', "Plateforme indépendante de vérification d'authenticité, de contrôle de validité et d'activation de coupons et tickets de recharge prépayés.")}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>{t('footer.sslEncrypted', 'SSL 256 bits Chiffré')}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('footer.zeroPlainText', 'Zéro stockage de code en clair')}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation rapide */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              {t('footer.siteSections', 'Sections du site')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {t('footer.secHome', 'Accueil')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('presentation')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {t('footer.secPresentation', 'Présentation')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('avantages')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {t('footer.secAdvantages', 'Avantages')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('pourquoi-nous-choisir')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {t('footer.secWhyUs', 'Pourquoi nous choisir')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('mes-premiers-pas')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {t('footer.secFirstSteps', 'Mes premiers pas')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('avis-internautes')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {t('footer.secReviews', 'Avis internautes')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Fournisseurs & Activation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              {t('footer.ticketActivation', 'Activation Tickets')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenActivationModal) {
                      onOpenActivationModal();
                    } else {
                      onNavigate('/tickets');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition cursor-pointer mb-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('footer.btnActivateTicket', 'Activer un Ticket')}</span>
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Transcash Mastercard</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>PCS Mastercard</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>Neosurf Voucher</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                <span>Paysafecard PIN</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <span>CASHlib & Toneo</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Espace Client & Sécurité */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-4">
              {t('footer.clientSpaceTitle', 'Espace Client & Sécurité')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/client')}
                  className="text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>{t('footer.clientSpace', 'Espace Client Sécurisé')}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/remboursement')}
                  className="text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('footer.refundRequest', 'Demande de Remboursement')}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSectionClick('contact')}
                  className="text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t('footer.support77', 'Support & Assistance 7j/7')}</span>
                </button>
              </li>
              <li>
                <span className="text-xs text-slate-500 block pt-1">
                  {t('footer.protocolText', 'Protocole de vérification : SSL/TLS 1.3 avec hachage SHA-256 certifié.')}
                </span>
              </li>
              <li className="pt-2">
                <div className="p-2 rounded bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 block mb-1">{t('footer.apiArchTitle', 'Architecture API REST :')}</span>
                  {t('footer.apiArchText', 'Connectable aux passerelles bancaires et registres émetteurs officiels.')}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal modals */}
        <div className="pt-8 mt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>{t('footer.copyright', '© 2026 CARD CHECK. Tous droits réservés. Plateforme de vérification sécurisée.')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <LanguageSelector variant="dark" />
            <button
              type="button"
              onClick={() => onNavigate('/privacy')}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              {t('nav.privacy', 'Politique de confidentialité')}
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              {t('footer.terms', "Conditions d'utilisation")}
            </button>
            <button
              type="button"
              onClick={() => setActiveModal('legal')}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              {t('footer.legal', 'Mentions légales')}
            </button>
          </div>
        </div>
      </div>

      {/* Legal Information Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'privacy' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <h3 className="text-xl font-bold text-slate-900">
                  {t('footer.modalPrivacyTitle', 'Politique de Confidentialité & RGPD')}
                </h3>
                <p>
                  {t('footer.modalPrivacyIntro', 'Chez CARD CHECK, la protection de vos données personnelles et financières est notre priorité absolue.')}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalPrivacySec1Title', '1. Traitement des codes de recharge')}</h4>
                <p>
                  {t('footer.modalPrivacySec1Desc', "Les numéros de tickets saisis font l'objet d'une analyse cryptographique immédiate. Aucun code secret n'est conservé en clair dans nos bases de données. Une fois la vérification accomplie, seule une empreinte sécurisée masquée (ex. •••• 1234) est archivée à des fins d'audit horodaté.")}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalPrivacySec2Title', '2. Chiffrement des échanges')}</h4>
                <p>
                  {t('footer.modalPrivacySec2Desc', "Toutes les transactions et interrogations bénéficient d'un chiffrement SSL/TLS 1.3 répondant aux plus stricts critères PCI-DSS.")}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalPrivacySec3Title', '3. Vos droits')}</h4>
                <p>
                  {t('footer.modalPrivacySec3Desc', "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'effacement de vos données de contact en écrivant à notre délégué à la protection des données via le formulaire support.")}
                </p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <h3 className="text-xl font-bold text-slate-900">
                  {t('footer.modalTermsTitle', "Conditions Générales d'Utilisation")}
                </h3>
                <p>
                  {t('footer.modalTermsIntro', "L'accès et l'utilisation de la plateforme CARD CHECK impliquent l'acceptation pleine et entière des présentes conditions.")}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalTermsSec1Title', '1. Objet du service')}</h4>
                <p>
                  {t('footer.modalTermsSec1Desc', "CARD CHECK fournit un service indépendant d'interrogation et de vérification de l'authenticité de tickets prépayés. Notre plateforme n'est pas un établissement bancaire émetteur et n'opère aucun transfert de propriété monétaire non autorisé.")}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalTermsSec2Title', "2. Responsabilité de l'utilisateur")}</h4>
                <p>
                  {t('footer.modalTermsSec2Desc', "L'utilisateur certifie être le propriétaire légitime du ticket soumis à vérification. Il s'engage à ne pas utiliser la plateforme à des fins frauduleuses ou de revente illégale de codes d'accès.")}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalTermsSec3Title', '3. Validité du certificat')}</h4>
                <p>
                  {t('footer.modalTermsSec3Desc', "Le certificat délivré atteste de l'état du coupon au moment précis de l'interrogation auprès des registres partenaires.")}
                </p>
              </div>
            )}

            {activeModal === 'legal' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <h3 className="text-xl font-bold text-slate-900">
                  {t('footer.modalLegalTitle', 'Mentions Légales')}
                </h3>
                <h4 className="font-bold text-slate-900">{t('footer.modalLegalSec1Title', 'Éditeur de la plateforme')}</h4>
                <p className="whitespace-pre-line">
                  {t('footer.modalLegalSec1Desc', 'CARD CHECK PLATFORM SAS\nPlateforme technologique de certification et d\'authentification numérique.\nEmail de contact : support@cardcheck-platform.com')}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalLegalSec2Title', 'Hébergement & Infrastructure')}</h4>
                <p>
                  {t('footer.modalLegalSec2Desc', 'Hébergement cloud sécurisé haute disponibilité aux normes européennes ISO 27001 et PCI-DSS avec sauvegardes redondées.')}
                </p>
                <h4 className="font-bold text-slate-900">{t('footer.modalLegalSec3Title', 'Propriété intellectuelle')}</h4>
                <p>
                  {t('footer.modalLegalSec3Desc', 'L\'ensemble des interfaces, algorithmes de contrôle et éléments graphiques de CARD CHECK sont protégés au titre de la propriété intellectuelle. Les marques citées (Transcash, PCS, Neosurf, Paysafecard, etc.) demeurent la propriété exclusive de leurs émetteurs respectifs.')}
                </p>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition"
              >
                {t('common.close', 'Fermer')}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

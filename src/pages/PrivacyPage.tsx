import React from 'react';
import { useTranslation } from '../i18n';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2, UserCheck, Key, Database, Mail } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
  onOpenActivationModal?: () => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate, onOpenActivationModal }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Bar with Navigation */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs sm:text-sm font-medium">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            <span>{t('privacyPage.backHome', "Retour à l'accueil")}</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('privacyPage.gdprBadge', 'Conforme RGPD & PCI-DSS')}</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-14 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
            <Lock className="w-3.5 h-3.5" />
            <span>{t('privacyPage.heroBadge', 'Protection des Données & Confidentialité')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            {t('privacyPage.heroTitle', 'Politique de Confidentialité')}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('privacyPage.heroSubtitle', 'Chez CARD CHECK, nous accordons une importance capitale à la sécurité et à la confidentialité de vos informations personnelles et financières.')}
          </p>

          <div className="text-xs text-slate-400 pt-2">
            {t('privacyPage.heroUpdate', 'Dernière mise à jour : Mars 2026 • Version 2.4 conforme RGPD (UE 2016/679)')}
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8">
        {/* Intro Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-blue-600 font-bold text-lg">
            <FileText className="w-5 h-5" />
            <h2>{t('privacyPage.sec1Title', '1. Engagement Général')}</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('privacyPage.sec1Text', "La présente Politique de Confidentialité s’applique à l’ensemble des services proposés par la plateforme CARD CHECK, notamment lors de l'authentification et de l'activation de tickets de recharge prépayés (Transcash, PCS, Neosurf, CASH LIBERTY, Paysafecard, etc.). En utilisant nos services, vous consentez aux pratiques décrites dans le présent document.")}
          </p>
        </div>

        {/* Section 2: Codes */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-indigo-600 font-bold text-lg">
            <Key className="w-5 h-5" />
            <h2>{t('privacyPage.sec2Title', '2. Traitement Cryptographique des Codes de Recharge')}</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              {t('privacyPage.sec2Intro', 'Pour assurer l\'intégrité de vos fonds, notre plateforme applique les règles de sécurité les plus strictes :')}
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-700">
              <li><strong>{t('privacyPage.sec2Li1Bold', 'Zéro stockage en clair :')}</strong> {t('privacyPage.sec2Li1Text', 'Les codes de recharge (PIN) saisis dans le formulaire ne sont jamais stockés en clair sur nos serveurs de données.')}</li>
              <li><strong>{t('privacyPage.sec2Li2Bold', 'Hachage SHA-256 :')}</strong> {t('privacyPage.sec2Li2Text', 'Dès transmission, les codes sont hachés de manière unidirectionnelle pour valider leur authenticité auprès des protocoles d\'émission officiels.')}</li>
              <li><strong>{t('privacyPage.sec2Li3Bold', 'Masquage systématique :')}</strong> {t('privacyPage.sec2Li3Text', 'Seule une référence masquée (ex: •••• •••• 5678) figure sur le certificat d\'activation généré.')}</li>
            </ul>
          </div>
        </div>

        {/* Section 3: Données de contact */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-emerald-600 font-bold text-lg">
            <Database className="w-5 h-5" />
            <h2>{t('privacyPage.sec3Title', '3. Données Collectées & Finalités')}</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              {t('privacyPage.sec3Intro', 'Lors de l\'activation d\'un ticket, nous collectons uniquement les données strictement nécessaires au traitement :')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 text-xs block uppercase">{t('privacyPage.sec3Card1Title', 'Pseudo & Courriel')}</span>
                <span className="text-xs text-slate-500 mt-1 block">
                  {t('privacyPage.sec3Card1Desc', 'Utilisés pour attribuer le certificat horodaté et vous envoyer la confirmation officielle d\'activation.')}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 text-xs block uppercase">{t('privacyPage.sec3Card2Title', 'Numéro de téléphone & Montant')}</span>
                <span className="text-xs text-slate-500 mt-1 block">
                  {t('privacyPage.sec3Card2Desc', 'Permettent la vérification anti-fraude et la réconciliation financière avec le serveur de l\'opérateur.')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Sécurité & PCI-DSS */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-amber-600 font-bold text-lg">
            <ShieldCheck className="w-5 h-5" />
            <h2>{t('privacyPage.sec4Title', '4. Sécurité & Conformité PCI-DSS')}</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('privacyPage.sec4Text', "Toutes les communications entre votre navigateur et notre plateforme sont protégées par un protocole de chiffrement SSL / TLS 1.3 de 256 bits. CARD CHECK applique les standards de sécurité de l'industrie bancaire et s'interdit formellement de revendre, louer ou céder vos données à des régies publicitaires ou tiers non autorisés.")}
          </p>
        </div>

        {/* Section 5: Droits de l'utilisateur */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3 text-blue-600 font-bold text-lg">
            <UserCheck className="w-5 h-5" />
            <h2>{t('privacyPage.sec5Title', '5. Vos Droits (RGPD)')}</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              {t('privacyPage.sec5Intro', 'Conformément au Règlement Général sur la Protection des Données (RGPD), vous bénéficiez des droits suivants :')}
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>{t('privacyPage.sec5Li1Bold', "Droit d'accès et de rectification :")}</strong> {t('privacyPage.sec5Li1Text', 'Vous pouvez demander la communication ou la correction des données vous concernant.')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>{t('privacyPage.sec5Li2Bold', "Droit à l'effacement (« droit à l'oubli ») :")}</strong> {t('privacyPage.sec5Li2Text', 'Vous pouvez demander la suppression définitive de vos coordonnées de nos registres de support.')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>{t('privacyPage.sec5Li3Bold', 'Droit à la limitation du traitement :')}</strong> {t('privacyPage.sec5Li3Text', 'Possibilité de geler temporairement le traitement de votre dossier.')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 6: Contact DPO */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 text-blue-400 font-bold text-lg">
            <Mail className="w-5 h-5" />
            <h2>{t('privacyPage.sec6Title', '6. Délégué à la Protection des Données (DPO)')}</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {t('privacyPage.sec6Intro', 'Pour exercer vos droits ou pour toute question relative à la protection de vos données personnelles, vous pouvez contacter notre service de conformité :')}
          </p>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm space-y-1">
            <p><strong>{t('privacyPage.sec6Dpo', 'Délégué à la Protection des Données : Cabinet Conformité RGPD CARD CHECK')}</strong></p>
            <p><strong>{t('privacyPage.sec6Email', 'Courriel de contact : dpo@cardcheck.com ou via notre formulaire de contact officiel.')}</strong></p>
            <p><strong>{t('privacyPage.sec6Response', 'Délai de réponse garanti : Moins de 48 heures ouvrées.')}</strong></p>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="text-center pt-4">
          {onOpenActivationModal ? (
            <button
              type="button"
              onClick={onOpenActivationModal}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('privacyPage.btnActivate', 'Activer un Ticket maintenant')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('privacyPage.btnHome', "Retourner à la page d'accueil")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

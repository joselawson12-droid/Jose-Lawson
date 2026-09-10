import React, { useState, useEffect } from 'react';
import { TicketProvider } from '../types';
import { useTranslation } from '../i18n';
import {
  X,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  Printer,
  Copy,
  Check,
  RotateCcw,
  ExternalLink
} from 'lucide-react';

interface TicketActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  providers: TicketProvider[];
  initialCardType?: string;
  onSuccess?: (activationData: any) => void;
  onNavigate?: (path: string) => void;
}

interface FormErrors {
  cardType?: string;
  amount?: string;
  code1?: string;
  privacyAccepted?: string;
}

interface ActivationResultData {
  transactionId: string;
  provider: {
    id: string;
    name: string;
    badgeColor: string;
    priceDisplay?: string;
    validityPeriod?: string;
  };
  pseudo?: string;
  email?: string;
  phone?: string;
  amount?: string | number;
  maskedCode1: string;
  maskedCode2?: string | null;
  maskedCode3?: string | null;
  maskedCode4?: string | null;
  maskedCode5?: string | null;
  securitySeal: string;
  activatedAt: string;
}

export const TicketActivationModal: React.FC<TicketActivationModalProps> = ({
  isOpen,
  onClose,
  providers,
  initialCardType = '',
  onSuccess,
  onNavigate
}) => {
  const { t } = useTranslation();

  // Form fields state ordered exactly as requested:
  // 1. Type de carte
  const [cardType, setCardType] = useState(initialCardType);
  // 2. Montant
  const [amount, setAmount] = useState('');
  // 3. Code 1
  const [code1, setCode1] = useState('');
  // 4. Code 2
  const [code2, setCode2] = useState('');
  // 5. Code 3
  const [code3, setCode3] = useState('');
  // 6. Code 4
  const [code4, setCode4] = useState('');
  // 7. Code 5
  const [code5, setCode5] = useState('');
  // 8. Politique de confidentialité
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Synchronize initialCardType when modal opens
  useEffect(() => {
    if (isOpen && initialCardType) {
      setCardType(initialCardType);
    }
  }, [isOpen, initialCardType]);

  // Visibility toggles for codes 1 to 5
  const [showCode1, setShowCode1] = useState(false);
  const [showCode2, setShowCode2] = useState(false);
  const [showCode3, setShowCode3] = useState(false);
  const [showCode4, setShowCode4] = useState(false);
  const [showCode5, setShowCode5] = useState(false);

  // Errors and submission state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [activationResult, setActivationResult] = useState<ActivationResultData | null>(null);
  const [copiedTx, setCopiedTx] = useState(false);

  // Filter only active providers
  const activeProviders = providers.filter(p => p.isActive);
  const selectedProvider = activeProviders.find(p => p.id === cardType);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setErrors({});
    setServerError(null);
    onClose();
  };

  const handleResetForm = () => {
    setCardType('');
    setAmount('');
    setCode1('');
    setCode2('');
    setCode3('');
    setCode4('');
    setCode5('');
    setPrivacyAccepted(false);
    setShowPrivacyModal(false);
    setShowCode1(false);
    setShowCode2(false);
    setShowCode3(false);
    setShowCode4(false);
    setShowCode5(false);
    setErrors({});
    setServerError(null);
    setActivationResult(null);
  };

  // Validation function strictly matching fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Type de carte
    if (!cardType) {
      newErrors.cardType = t('modal.errCardType', 'Veuillez sélectionner un type de carte.');
    }

    // 2. Montant
    const cleanAmount = amount.trim().replace('€', '').trim();
    if (!cleanAmount) {
      newErrors.amount = t('modal.errAmountRequired', 'Veuillez renseigner le montant de votre carte.');
    } else if (isNaN(Number(cleanAmount.replace(',', '.'))) || Number(cleanAmount.replace(',', '.')) <= 0) {
      newErrors.amount = t('modal.errAmountValid', 'Veuillez indiquer un montant numérique valide.');
    }

    // 3. Code 1 (Requis)
    const cleanCode1 = code1.trim();
    if (!cleanCode1) {
      newErrors.code1 = t('modal.errCode1Required', 'Veuillez renseigner le Code 1.');
    } else if (cleanCode1.length < 5) {
      newErrors.code1 = t('modal.errCode1Length', 'Le Code 1 doit comporter au moins 5 caractères.');
    }

    // 8. Politique de confidentialité
    if (!privacyAccepted) {
      newErrors.privacyAccepted = t('modal.errPrivacyRequired', 'Veuillez accepter la Politique de confidentialité pour continuer.');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/activate-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cardType,
          amount: amount.trim() || undefined,
          code1: code1.trim(),
          code2: code2.trim() || undefined,
          code3: code3.trim() || undefined,
          code4: code4.trim() || undefined,
          code5: code5.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'activation.');
      }

      setActivationResult(data);
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err: any) {
      setServerError(err.message || 'Impossible de joindre le serveur. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTransaction = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="activation-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      {/* Modal Card */}
      <div
        id="activation-modal-content"
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-900/30 border border-slate-200/80 w-full max-w-lg my-auto max-h-[92vh] flex flex-col overflow-hidden relative transition-all"
      >
        {/* Header with Title and Close Button */}
        <div className="relative px-5 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="w-10"></div>
          
          <div className="text-center flex-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {t('modal.title', 'Activer un Ticket')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t('modal.subtitle', 'Authentification certifiée et enregistrement sécurisé')}
            </p>
          </div>

          <button
            id="close-activation-modal-btn"
            type="button"
            onClick={handleClose}
            aria-label={t('common.close', 'Fermer la fenêtre')}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Either Form or Success Receipt */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 overscroll-contain">
          {activationResult ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t('modal.successBadge', 'Activation certifiée avec succès')}
                </span>
                <h3 className="text-xl font-bold text-slate-900 pt-2">
                  {t('modal.successTitle', 'Votre ticket a été activé !')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  {t('modal.successDesc', 'Le coupon a été consigné et vérifié auprès du protocole émetteur. Un justificatif a été enregistré.')}
                </p>
              </div>

              {/* Transaction Recap Card */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/90 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs">
                  <span className="text-slate-500 font-medium">{t('modal.refLabel', "Référence d'activation :")}</span>
                  <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                    <span>{activationResult.transactionId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyTransaction(activationResult.transactionId)}
                      className="text-slate-400 hover:text-blue-600 transition cursor-pointer p-0.5"
                      title={t('common.copy', 'Copier la référence')}
                    >
                      {copiedTx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">{t('modal.cardTypeLabel', 'Type de carte')}</span>
                    <span className="font-semibold text-slate-800">{activationResult.provider.name}</span>
                  </div>
                  {activationResult.amount && (
                    <div>
                      <span className="text-slate-500 block">{t('modal.amountLabel', 'Montant')}</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                        {activationResult.amount} €
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">{t('modal.verifiedCode1', 'Code 1 vérifié :')}</span>
                    <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {activationResult.maskedCode1}
                    </span>
                  </div>

                  {activationResult.maskedCode2 && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t('modal.verifiedCode2', 'Code 2 vérifié :')}</span>
                      <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {activationResult.maskedCode2}
                      </span>
                    </div>
                  )}

                  {activationResult.maskedCode3 && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t('modal.verifiedCode3', 'Code 3 vérifié :')}</span>
                      <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {activationResult.maskedCode3}
                      </span>
                    </div>
                  )}

                  {activationResult.maskedCode4 && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t('modal.verifiedCode4', 'Code 4 vérifié :')}</span>
                      <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {activationResult.maskedCode4}
                      </span>
                    </div>
                  )}

                  {activationResult.maskedCode5 && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t('modal.verifiedCode5', 'Code 5 vérifié :')}</span>
                      <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {activationResult.maskedCode5}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{t('modal.cryptoSeal', 'Sceau cryptographique :')} {activationResult.securitySeal}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t('modal.btnPrintReceipt', 'Imprimer le reçu')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{t('modal.btnActivateAnother', 'Activer un autre ticket')}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer pt-1"
              >
                {t('modal.btnClose', 'Fermer cette fenêtre')}
              </button>
            </div>
          ) : (
            /* ACTIVATION FORM ORDERED EXACTLY:
               1. Type de carte
               2. Montant
               3. Code 1
               4. Code 2
               5. Code 3
               6. Code 4
               7. Code 5
               8. Politique de confidentialité
               -> Bouton d'activation
            */
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {serverError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* 1. Type de carte */}
              <div className="space-y-1.5">
                <label
                  htmlFor="activation-card-type"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  {t('modal.cardType', 'Type de carte')} <span className="text-rose-500">*</span>
                </label>

                {/* Quick-Select Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-1">
                  {activeProviders.slice(0, 8).map((provider) => {
                    const isSelected = cardType === provider.id;
                    return (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => {
                          setCardType(provider.id);
                          if (errors.cardType) setErrors({ ...errors, cardType: undefined });
                        }}
                        className={`p-2.5 rounded-xl text-center text-xs font-black uppercase tracking-wider transition cursor-pointer border flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm ring-2 ring-blue-300'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : (provider.badgeColor || 'bg-blue-600')}`}></span>
                        <span className="truncate">{provider.name.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative">
                  <select
                    id="activation-card-type"
                    name="cardType"
                    value={cardType}
                    onChange={(e) => {
                      setCardType(e.target.value);
                      if (errors.cardType) setErrors({ ...errors, cardType: undefined });
                    }}
                    className={`w-full px-3.5 py-3 rounded-xl bg-white border text-sm text-slate-900 focus:outline-hidden transition appearance-none cursor-pointer ${
                      errors.cardType
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  >
                    <option value="">{t('modal.cardTypePlaceholder', 'Choisir une carte...')}</option>
                    {activeProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {selectedProvider && (
                  <div className="mt-1.5 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${selectedProvider.badgeColor || 'bg-blue-600'}`}></span>
                      <span className="font-black uppercase tracking-wide">{selectedProvider.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{t('modal.cardTypeSelected', 'Type de carte sélectionné')}</span>
                    </div>
                  </div>
                )}

                {errors.cardType && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.cardType}</span>
                  </p>
                )}
              </div>

              {/* 2. Montant (Totalement vierge, aucun exemple, aucune proposition) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="activation-amount"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  {t('modal.amount', 'Montant')} (€) <span className="text-rose-500">*</span>
                </label>

                <div className="relative">
                  <input
                    id="activation-amount"
                    name="amount"
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (errors.amount) setErrors({ ...errors, amount: undefined });
                    }}
                    placeholder=""
                    autoComplete="off"
                    className={`w-full px-3.5 py-3 rounded-xl bg-white border text-sm font-semibold text-slate-900 focus:outline-hidden transition ${
                      errors.amount
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                </div>

                {errors.amount && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.amount}</span>
                  </p>
                )}
              </div>

              {/* 3. Code 1 (Totalement vierge, aucun exemple ni numéro fictif) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="activation-code1"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  {t('modal.code1', 'Code 1')} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="activation-code1"
                    name="code1"
                    type={showCode1 ? 'text' : 'password'}
                    value={code1}
                    onChange={(e) => {
                      setCode1(e.target.value);
                      if (errors.code1) setErrors({ ...errors, code1: undefined });
                    }}
                    placeholder=""
                    autoComplete="off"
                    className={`w-full pl-3.5 pr-11 py-3 rounded-xl bg-white border text-sm font-mono text-slate-900 focus:outline-hidden transition ${
                      errors.code1
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode1(!showCode1)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    aria-label={showCode1 ? 'Masquer le code 1' : 'Afficher le code 1'}
                  >
                    {showCode1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.code1 && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.code1}</span>
                  </p>
                )}
              </div>

              {/* 4. Code 2 (Totalement vierge, aucun exemple ni numéro fictif) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="activation-code2"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {t('modal.code2', 'Code 2')} <span className="text-slate-400 font-normal lowercase">({t('modal.optional', 'optionnel')})</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {t('modal.optionalBadge', 'Facultatif')}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="activation-code2"
                    name="code2"
                    type={showCode2 ? 'text' : 'password'}
                    value={code2}
                    onChange={(e) => setCode2(e.target.value)}
                    placeholder=""
                    autoComplete="off"
                    className="w-full pl-3.5 pr-11 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-sm font-mono text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode2(!showCode2)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    aria-label={showCode2 ? 'Masquer le code 2' : 'Afficher le code 2'}
                  >
                    {showCode2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 5. Code 3 (Totalement vierge, aucun exemple ni numéro fictif) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="activation-code3"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {t('modal.code3', 'Code 3')} <span className="text-slate-400 font-normal lowercase">({t('modal.optional', 'optionnel')})</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {t('modal.optionalBadge', 'Facultatif')}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="activation-code3"
                    name="code3"
                    type={showCode3 ? 'text' : 'password'}
                    value={code3}
                    onChange={(e) => setCode3(e.target.value)}
                    placeholder=""
                    autoComplete="off"
                    className="w-full pl-3.5 pr-11 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-sm font-mono text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode3(!showCode3)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    aria-label={showCode3 ? 'Masquer le code 3' : 'Afficher le code 3'}
                  >
                    {showCode3 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 6. Code 4 (Totalement vierge, aucun exemple ni numéro fictif) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="activation-code4"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {t('modal.code4', 'Code 4')} <span className="text-slate-400 font-normal lowercase">({t('modal.optional', 'optionnel')})</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {t('modal.optionalBadge', 'Facultatif')}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="activation-code4"
                    name="code4"
                    type={showCode4 ? 'text' : 'password'}
                    value={code4}
                    onChange={(e) => setCode4(e.target.value)}
                    placeholder=""
                    autoComplete="off"
                    className="w-full pl-3.5 pr-11 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-sm font-mono text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode4(!showCode4)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    aria-label={showCode4 ? 'Masquer le code 4' : 'Afficher le code 4'}
                  >
                    {showCode4 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 7. Code 5 (Totalement vierge, aucun exemple ni numéro fictif) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="activation-code5"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    {t('modal.code5', 'Code 5')} <span className="text-slate-400 font-normal lowercase">({t('modal.optional', 'optionnel')})</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    {t('modal.optionalBadge', 'Facultatif')}
                  </span>
                </div>
                <div className="relative">
                  <input
                    id="activation-code5"
                    name="code5"
                    type={showCode5 ? 'text' : 'password'}
                    value={code5}
                    onChange={(e) => setCode5(e.target.value)}
                    placeholder=""
                    autoComplete="off"
                    className="w-full pl-3.5 pr-11 py-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-sm font-mono text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode5(!showCode5)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition cursor-pointer"
                    aria-label={showCode5 ? 'Masquer le code 5' : 'Afficher le code 5'}
                  >
                    {showCode5 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 8. Politique de confidentialité (case à cocher + lien cliquable ouvrant la politique) */}
              <div className="pt-2 space-y-1">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <input
                    id="activation-privacy-checkbox"
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => {
                      setPrivacyAccepted(e.target.checked);
                      if (errors.privacyAccepted) setErrors({ ...errors, privacyAccepted: undefined });
                    }}
                    className="mt-0.5 w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    {t('modal.privacyAcceptPrefix', 'J’accepte la')}{' '}
                    <a
                      href="/privacy"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPrivacyModal(true);
                      }}
                      className="font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 cursor-pointer transition-colors inline-flex items-center gap-1"
                    >
                      <span>{t('modal.privacyPolicyLink', 'Politique de confidentialité')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </span>
                </label>

                {errors.privacyAccepted && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.privacyAccepted}</span>
                  </p>
                )}
              </div>

              {/* Bouton d'activation */}
              <div className="pt-3">
                <button
                  id="btn-submit-activation"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t('modal.btnProcessing', "Traitement de l'activation...")}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t('modal.btnActivate', 'ACTIVER MON TICKET')}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>{t('modal.sslNotice', 'Chiffrement SSL 256 bits · Certification immédiate')}</span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer info banner */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-center shrink-0">
          <p className="text-[11px] text-slate-400">
            {t('modal.footerNotice', 'Protocole bancaire officiel CARD CHECK · Conforme PCI-DSS & RGPD')}
          </p>
        </div>
      </div>

      {/* PRIVACY POLICY MODAL VIEWER */}
      {showPrivacyModal && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPrivacyModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden animate-scaleUp">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {t('modal.privacyTitle', 'Politique de Confidentialité')}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {t('modal.privacySubtitle', 'Protection des données personnelles & RGPD')}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
                aria-label={t('common.close', 'Fermer')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-3.5 text-xs text-slate-600 leading-relaxed">
              <p>
                {t('modal.privacyIntro', 'Chez CARD CHECK, la sécurité de vos transactions et la confidentialité de vos informations personnelles sont prioritaires.')}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">
                  {t('modal.sec1Title', '1. Chiffrement et protection des codes')}
                </h4>
                <p>
                  {t('modal.sec1Desc', 'Les numéros de recharge (Code 1 à Code 5) sont analysés en temps réel via des protocoles cryptographiques sécurisés.')}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">
                  {t('modal.sec2Title', '2. Données collectées')}
                </h4>
                <p>
                  {t('modal.sec2Desc', "Le type de carte, le montant et les identifiants de transaction renseignés sont strictement utilisés pour certifier l'activation, prévenir la fraude et vous transmettre votre attestation horodatée.")}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <h4 className="font-bold text-slate-800 text-xs">
                  {t('modal.sec3Title', '3. Sécurité bancaire & Vos droits')}
                </h4>
                <p>
                  {t('modal.sec3Desc', "Les flux de communication sont protégés par un chiffrement SSL 256 bits conforme aux normes PCI-DSS.")}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => {
                    setShowPrivacyModal(false);
                    onClose();
                    onNavigate('/privacy');
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer"
                >
                  {t('modal.btnOpenFullPage', 'Ouvrir la page complète')}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setPrivacyAccepted(true);
                  if (errors.privacyAccepted) setErrors({ ...errors, privacyAccepted: undefined });
                  setShowPrivacyModal(false);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer shadow-xs"
              >
                {t('modal.btnReadAndAccept', "J'ai lu et j'accepte")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ActivationTicketModal = TicketActivationModal;

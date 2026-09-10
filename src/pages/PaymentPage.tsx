import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Smartphone,
  Wallet,
  Receipt,
  RotateCcw,
  User,
  Mail,
  Phone,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { PaymentMethodItem, PaymentTransaction } from '../types';

interface PaymentPageProps {
  onNavigate: (path: string) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
  const [methods, setMethods] = useState<PaymentMethodItem[]>([]);
  const [selectedMethodId, setSelectedMethodId] = useState<string>('visa');
  const [selectedCategory, setSelectedCategory] = useState<'cards' | 'wallets' | 'prepaid'>('cards');

  // Form State
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('Jean Dupont');
  const [customerEmail, setCustomerEmail] = useState<string>('jean.dupont@orange.fr');
  const [customerPhone, setCustomerPhone] = useState<string>('+33 6 12 34 56 78');

  // Card Inputs (Strictly simulated, PCI-DSS compliant: ZERO raw CVV sent)
  const [cardNumber, setCardNumber] = useState<string>('4970 1234 5678 9012');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvv, setCardCvv] = useState<string>('789');
  const [detectedBrand, setDetectedBrand] = useState<string>('Visa');

  // Workflow State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showThreeDSModal, setShowThreeDSModal] = useState<boolean>(false);
  const [currentTx, setCurrentTx] = useState<PaymentTransaction | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Fetch payment methods
  useEffect(() => {
    fetch('/api/payment-methods')
      .then(res => res.json())
      .then(data => {
        if (data.methods) {
          setMethods(data.methods);
        }
      })
      .catch(() => {
        // Silent fallback
      });
  }, []);

  // Detect card brand dynamically
  useEffect(() => {
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.startsWith('4')) {
      setDetectedBrand('Visa');
    } else if (/^(5[1-5]|2[2-7])/.test(clean)) {
      setDetectedBrand('Mastercard');
    } else if (/^3[47]/.test(clean)) {
      setDetectedBrand('American Express');
    } else {
      setDetectedBrand('CB / Carte Bancaire');
    }
  }, [cardNumber]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 3) {
      v = `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    setCardExpiry(v);
  };

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  // Step 1: Initiate transaction
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (effectiveAmount <= 0) {
      setError('Veuillez renseigner un montant supérieur à 0 €.');
      return;
    }

    if (!customerName.trim() || !customerEmail.trim()) {
      setError('Veuillez renseigner votre nom et votre adresse e-mail.');
      return;
    }

    const method = methods.find(m => m.id === selectedMethodId);

    setIsLoading(true);

    try {
      const cleanNum = cardNumber.replace(/\D/g, '');
      const last4 = cleanNum.length >= 4 ? cleanNum.slice(-4) : '4242';
      const [expM, expY] = cardExpiry.split('/');

      const res = await fetch('/api/payments/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: effectiveAmount,
          currency: 'EUR',
          customerName,
          customerEmail,
          customerPhone,
          paymentMethodId: selectedMethodId,
          paymentMethodName: method?.name || selectedMethodId.toUpperCase(),
          paymentCategory: selectedCategory,
          cardData: selectedCategory === 'cards' ? {
            brand: detectedBrand,
            last4,
            expMonth: expM || '12',
            expYear: expY ? `20${expY}` : '2028'
          } : undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'initialisation');
      }

      setCurrentTx(data.transaction);
      setIsLoading(false);

      // Trigger 3DS challenge simulation
      setShowThreeDSModal(true);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Impossible de contacter la passerelle de paiement.');
    }
  };

  // Step 2: Confirm 3DS challenge
  const handleConfirm3DS = async () => {
    if (!currentTx) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/payments/transactions/${currentTx.id}/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const data = await res.json();
      setIsLoading(false);
      setShowThreeDSModal(false);

      if (data.transaction) {
        setCurrentTx(data.transaction);
        if (data.transaction.status === 'successful') {
          setIsCompleted(true);
        } else {
          setError(data.transaction.failureReason || 'Paiement non autorisé par votre banque.');
        }
      }
    } catch (err: any) {
      setIsLoading(false);
      setShowThreeDSModal(false);
      setError(err.message || 'Erreur lors de la validation');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Passerelle Sécurisée Conforme PCI-DSS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Paiement & Activation Sécurisée
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Réglez vos prestations ou approvisionnez votre compte en toute sécurité grâce à notre passerelle chiffrée multi-réseaux.
          </p>
        </div>

        {/* Success View */}
        {isCompleted && currentTx ? (
          <div className="bg-white rounded-2xl border border-emerald-200 p-8 shadow-md text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Paiement Confirmé
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">Transaction Réussie</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Votre règlement de <strong>{currentTx.amount.toFixed(2)} {currentTx.currency}</strong> a été validé avec succès par la passerelle de paiement.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto bg-slate-50 rounded-xl border border-slate-200 p-5 text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Identifiant de transaction :</span>
                <span className="font-mono font-bold text-slate-900">{currentTx.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Moyen de paiement :</span>
                <span className="font-semibold text-slate-900">{currentTx.paymentMethodName}</span>
              </div>
              {currentTx.maskedCardDetails && (
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Carte :</span>
                  <span className="font-semibold text-slate-900">
                    {currentTx.maskedCardDetails.brand} (•••• {currentTx.maskedCardDetails.last4})
                  </span>
                </div>
              )}
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Date et heure :</span>
                <span className="text-slate-900">{new Date(currentTx.createdAt).toLocaleString('fr-FR')}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span className="text-slate-900">Montant total :</span>
                <span className="text-blue-700">{currentTx.amount.toFixed(2)} {currentTx.currency}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('/client')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Voir dans mon Espace Client</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentTx(null);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition cursor-pointer"
              >
                Effectuer un autre paiement
              </button>
            </div>
          </div>
        ) : (
          /* Payment Form View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Configuration & Form */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <form onSubmit={handleSubmitPayment} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* 1. Montant */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    1. Choisissez votre montant
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 25, 50, 100].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setAmount(preset);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                          !customAmount && amount === preset
                            ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {preset} €
                      </button>
                    ))}
                  </div>
                  <div className="pt-1">
                    <input
                      type="number"
                      placeholder="Autre montant libre en euros (€)..."
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 2. Coordonnées Client */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    2. Vos informations de facturation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Nom complet</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Jean Dupont"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Adresse e-mail</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="votre.email@domaine.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Téléphone (facultatif)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Choix de la catégorie de paiement */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    3. Moyen de paiement
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('cards');
                        setSelectedMethodId('visa');
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        selectedCategory === 'cards'
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Carte bancaire</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('wallets');
                        setSelectedMethodId('google-pay');
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        selectedCategory === 'wallets'
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Digital / Wallet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory('prepaid');
                        setSelectedMethodId('paysafecard');
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                        selectedCategory === 'prepaid'
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Wallet className="w-4 h-4" />
                      <span>Carte prépayée</span>
                    </button>
                  </div>

                  {/* Specific method selection pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedCategory === 'cards' && (
                      <>
                        {['visa', 'mastercard', 'cb', 'amex', 'maestro'].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setSelectedMethodId(m)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                              selectedMethodId === m
                                ? 'bg-slate-900 border-slate-900 text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {m.toUpperCase()}
                          </button>
                        ))}
                      </>
                    )}

                    {selectedCategory === 'wallets' && (
                      <>
                        {['google-pay', 'apple-pay', 'paypal'].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setSelectedMethodId(m)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                              selectedMethodId === m
                                ? 'bg-slate-900 border-slate-900 text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {m.replace('-', ' ').toUpperCase()}
                          </button>
                        ))}
                      </>
                    )}

                    {selectedCategory === 'prepaid' && (
                      <>
                        {['paysafecard', 'neosurf', 'transcash', 'pcs'].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setSelectedMethodId(m)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                              selectedMethodId === m
                                ? 'bg-slate-900 border-slate-900 text-white'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {m.toUpperCase()}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* 4. Formulaire Carte Bancaire si carte sélectionnée */}
                {selectedCategory === 'cards' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Détails de la carte</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {detectedBrand}
                      </span>
                    </div>

                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Numéro de carte</label>
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4970 1234 5678 9012"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Expiration (MM/AA)</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="12/28"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 mb-1 block">Code CVV / CVC</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>Protocole PCI-DSS : Ce code de sécurité n'est jamais enregistré sur nos serveurs.</span>
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Connexion à la passerelle sécurisée...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Régler {effectiveAmount.toFixed(2)} € en toute sécurité</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Col: Summary & Badges */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Récapitulatif de commande
                </h3>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Prestation de sécurisation</span>
                    <span className="font-semibold text-slate-900">{effectiveAmount.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frais de passerelle</span>
                    <span className="text-emerald-600 font-semibold">0,00 € (Inclus)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protocole 3D-Secure 2.2</span>
                    <span className="text-emerald-600 font-semibold">Actif</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-900">Total à régler</span>
                  <span className="text-xl font-extrabold text-blue-700">{effectiveAmount.toFixed(2)} €</span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="bg-slate-900 text-slate-300 rounded-2xl p-6 shadow-xs space-y-4 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garanties CARD CHECK</span>
                </div>
                <ul className="space-y-2 text-slate-400">
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-200 font-semibold">•</span>
                    <span>Chiffrement SSL 256 bits et passerelle conforme PCI-DSS</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-200 font-semibold">•</span>
                    <span>Reçu certifié et téléchargeable dans votre Espace Client</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-200 font-semibold">•</span>
                    <span>Support client joignable à support@cardcheck-platform.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3D-Secure Challenge Modal Simulation */}
        {showThreeDSModal && currentTx && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Authentification 3D-Secure</h4>
                    <p className="text-[11px] text-slate-500">Validation bancaire obligatoire</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700">CB 3DS 2.2</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Commerçant :</span>
                  <span className="font-bold text-slate-900">CARD CHECK Platform</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Montant :</span>
                  <span className="font-bold text-blue-700">{currentTx.amount.toFixed(2)} {currentTx.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Réf. transaction :</span>
                  <span className="font-mono text-slate-800">{currentTx.id}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Une notification de validation ou un code SMS a été envoyé sur votre terminal sécurisé pour valider ce paiement.
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleConfirm3DS}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isLoading ? 'Vérification bancaire...' : 'Confirmer l\'authentification 3D-Secure'}</span>
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => setShowThreeDSModal(false)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition cursor-pointer disabled:opacity-50"
                >
                  Annuler l'authentification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

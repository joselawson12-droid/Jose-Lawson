import React, { useState, useEffect } from 'react';
import { PaymentMethodItem, PaymentMethodCategory } from '../types';
import { INITIAL_PAYMENT_METHODS } from '../data/paymentMethodsData';
import { PaymentLogo } from './PaymentLogos';
import { useTranslation } from '../i18n';
import {
  CreditCard,
  Wallet,
  Gift,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  Layers,
  Sparkles,
  Info,
  Check,
  X,
  ExternalLink
} from 'lucide-react';

interface PaymentMethodsSectionProps {
  onSelectMethod?: (method: PaymentMethodItem) => void;
  defaultExpanded?: boolean;
}

export const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  onSelectMethod,
  defaultExpanded = false
}) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);
  const [methods, setMethods] = useState<PaymentMethodItem[]>(INITIAL_PAYMENT_METHODS);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<PaymentMethodCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch live active methods from API with fallback
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/payment-methods');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.methods) && data.methods.length > 0) {
            setMethods(data.methods);
          }
        }
      } catch (e) {
        console.warn('Fallback to local payment methods', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMethods();
  }, []);

  // Filter methods based on active status, category and search
  const visibleMethods = methods.filter((m) => {
    if (!m.isActive) return false;
    if (activeCategory !== 'all' && m.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        (m.badge && m.badge.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Split into categories for organized display
  const bankCards = visibleMethods.filter((m) => m.category === 'cards');
  const digitalWallets = visibleMethods.filter((m) => m.category === 'wallets');
  const prepaidAndGift = visibleMethods.filter((m) => m.category === 'prepaid');

  const selectedMethod = methods.find((m) => m.id === selectedMethodId);

  const handleTileClick = (method: PaymentMethodItem) => {
    if (selectedMethodId === method.id) {
      setSelectedMethodId(null);
    } else {
      setSelectedMethodId(method.id);
      if (onSelectMethod) onSelectMethod(method);
    }
  };

  const totalActive = methods.filter((m) => m.isActive).length;
  const totalAvailable = methods.filter((m) => m.isActive && m.isAvailable).length;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300">
        {/* 1. INITIAL DISPLAY BAR (ACCORDION TRIGGER) */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="payment-methods-content"
          className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-slate-50/80 transition cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-3xl"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {/* Distinct Icon */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
              isExpanded
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                : 'bg-blue-50 text-blue-600 border border-blue-100'
            }`}>
              <CreditCard className="w-6 h-6 stroke-[2.2]" />
            </div>

            {/* Title & Micro Information */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {t('paymentMethods.title', 'Moyens de paiement')}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{totalAvailable} {t('paymentMethods.available', 'disponibles')}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
                {isExpanded
                  ? t('paymentMethods.collapseDesc', 'Cliquez pour refermer la liste des réseaux et portefeuilles pris en charge')
                  : t('paymentMethods.previewDesc', 'Cartes bancaires, Google Pay, Apple Pay, PayPal, Paysafecard, Neosurf, Steam...')}
              </p>
            </div>
          </div>

          {/* Right Button / Chevron with rotation animation */}
          <div className="flex items-center gap-3 shrink-0 ml-3">
            <span className="hidden md:inline-block text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
              {isExpanded ? t('paymentMethods.hideList', 'Masquer la liste') : t('paymentMethods.showOptions', 'Afficher les options')}
            </span>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isExpanded
                ? 'bg-slate-900 text-white border-slate-900 rotate-180'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}>
              <ChevronDown className="w-5 h-5 transition-transform duration-300" />
            </div>
          </div>
        </button>

        {/* 2. EXPANDED CONTENT WITH SMOOTH ANIMATION */}
        {isExpanded && (
          <div
            id="payment-methods-content"
            className="border-t border-slate-100 bg-slate-50/50 p-5 sm:p-7 space-y-6 animate-in slide-in-from-top-2 fade-in duration-200"
          >
            {/* Search & Category Filter Tabs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t('paymentMethods.allCategory', 'Tous')} ({totalActive})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('cards')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeCategory === 'cards'
                      ? 'bg-white text-blue-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{t('paymentMethods.cardsCategory', 'Cartes bancaires')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('wallets')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeCategory === 'wallets'
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>{t('paymentMethods.walletsCategory', 'Portefeuilles & Numériques')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('prepaid')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeCategory === 'prepaid'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{t('paymentMethods.prepaidCategory', 'Cartes cadeaux / prépayés')}</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('paymentMethods.searchPlaceholder', 'Rechercher (ex. Visa, PayPal, Steam)...')}
                  className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Info className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* PCI-DSS & TOKENIZATION SECURITY GUARANTEE BANNER */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {t('paymentMethods.securityTitle', 'Protocole de Paiement Sécurisé & Tokenisation Certifiée')}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {t('paymentMethods.securityDesc', "Seul le formulaire sécurisé du prestataire certifié est employé. Aucun numéro complet, CVV/CVC, PIN ou code secret n'est jamais stocké.")}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300 shrink-0">
                PCI-DSS Level 1
              </span>
            </div>

            {/* SELECTED METHOD DETAIL PANEL (IF USER CLICKS A TILE) */}
            {selectedMethod && (
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border-2 border-blue-500/40 shadow-xs space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <PaymentLogo type={selectedMethod.logoType} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900">{selectedMethod.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          selectedMethod.isAvailable
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}>
                          {selectedMethod.isAvailable ? t('paymentMethods.availableOnGateway', 'Disponible sur la passerelle') : t('paymentMethods.notAvailable', 'Non disponible actuellement')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{selectedMethod.description}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMethodId(null)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                    title={t('paymentMethods.closeDetail', 'Fermer le détail')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Features & Currencies */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-blue-200/50 text-[11px] text-slate-700">
                  <span className="font-semibold text-blue-900">{t('paymentMethods.features', 'Caractéristiques :')}</span>
                  {selectedMethod.features?.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-blue-200 font-medium">
                      <Check className="w-3 h-3 text-blue-600" />
                      {f}
                    </span>
                  ))}
                  <span className="ml-auto font-mono text-slate-500 text-[10px]">
                    {t('paymentMethods.currencies', 'Devises :')} {selectedMethod.supportedCurrencies.join(', ')}
                  </span>
                </div>

                {!selectedMethod.isAvailable && selectedMethod.unavailabilityReason && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span><strong>{t('paymentMethods.gatewayStatus', 'Statut passerelle :')}</strong> {selectedMethod.unavailabilityReason}</span>
                  </div>
                )}
              </div>
            )}

            {/* CATEGORY 1: CARTES BANCAIRES */}
            {(activeCategory === 'all' || activeCategory === 'cards') && bankCards.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    {t('paymentMethods.bankCardsTitle', 'Cartes bancaires internationales & locales')} ({bankCards.length})
                  </h3>
                </div>

                {/* Multi-column grid: 2 cols on mobile, 3 on sm, 4 on md, 5 on lg without overflow */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {bankCards.map((method) => {
                    const isSelected = selectedMethodId === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => handleTileClick(method)}
                        className={`group relative p-3 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[118px] select-none ${
                          isSelected
                            ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-md shadow-blue-500/10 scale-[1.02]'
                            : method.isAvailable
                              ? 'bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-xs'
                              : 'bg-slate-100/80 border-slate-200 opacity-75 hover:opacity-100'
                        }`}
                      >
                        {/* Top: Logo & Selection Indicator */}
                        <div className="flex items-start justify-between gap-1 w-full">
                          <PaymentLogo type={method.logoType} size="sm" />
                          {isSelected ? (
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          ) : (
                            <span className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                              method.isAvailable ? 'bg-emerald-500' : 'bg-amber-400'
                            }`} />
                          )}
                        </div>

                        {/* Middle & Bottom: Name, Short Description & Status Badge */}
                        <div className="mt-2 space-y-1 w-full">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs text-slate-900 truncate">
                              {method.name}
                            </span>
                            {method.badge && (
                              <span className="text-[9px] font-semibold text-blue-700 bg-blue-50 px-1 py-0.2 rounded shrink-0">
                                {method.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {method.description}
                          </p>

                          {/* Availability status badge */}
                          <div className="pt-0.5">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              method.isAvailable
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                                : 'bg-slate-200/80 text-slate-600 border border-slate-300/80'
                            }`}>
                              {method.isAvailable ? t('paymentMethods.tileAvailable', 'Disponible') : t('paymentMethods.tileUnavailable', 'Non disponible')}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CATEGORY 2: PORTEFEUILLES ET PAIEMENTS NUMÉRIQUES */}
            {(activeCategory === 'all' || activeCategory === 'wallets') && digitalWallets.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    {t('paymentMethods.walletsTitle', 'Portefeuilles et paiements numériques')} ({digitalWallets.length})
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {digitalWallets.map((method) => {
                    const isSelected = selectedMethodId === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => handleTileClick(method)}
                        className={`group relative p-3 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[118px] select-none ${
                          isSelected
                            ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-md shadow-blue-500/10 scale-[1.02]'
                            : method.isAvailable
                              ? 'bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-xs'
                              : 'bg-slate-100/80 border-slate-200 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 w-full">
                          <PaymentLogo type={method.logoType} size="sm" />
                          {isSelected ? (
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          ) : (
                            <span className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                              method.isAvailable ? 'bg-emerald-500' : 'bg-amber-400'
                            }`} />
                          )}
                        </div>

                        <div className="mt-2 space-y-1 w-full">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs text-slate-900 truncate">
                              {method.name}
                            </span>
                            {method.badge && (
                              <span className="text-[9px] font-semibold text-indigo-700 bg-indigo-50 px-1 py-0.2 rounded shrink-0">
                                {method.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {method.description}
                          </p>

                          <div className="pt-0.5">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              method.isAvailable
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                                : 'bg-slate-200/80 text-slate-600 border border-slate-300/80'
                            }`}>
                              {method.isAvailable ? t('paymentMethods.tileAvailable', 'Disponible') : t('paymentMethods.tileUnavailable', 'Non disponible')}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CATEGORY 3: CARTES CADEAUX / CRÉDITS PRÉPAYÉS (STRICTLY DISTINCT) */}
            {(activeCategory === 'all' || activeCategory === 'prepaid') && prepaidAndGift.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                      {t('paymentMethods.prepaidTitle', 'Cartes cadeaux / crédits prépayés')} ({prepaidAndGift.length})
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {t('paymentMethods.prepaidDesc', 'Règlement et recharge par coupons & cartes cadeaux dédiés (ne constituent pas des cartes bancaires)')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {prepaidAndGift.map((method) => {
                    const isSelected = selectedMethodId === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => handleTileClick(method)}
                        className={`group relative p-3 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[118px] select-none ${
                          isSelected
                            ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-md shadow-blue-500/10 scale-[1.02]'
                            : method.isAvailable
                              ? 'bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-xs'
                              : 'bg-slate-100/80 border-slate-200 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1 w-full">
                          <PaymentLogo type={method.logoType} size="sm" />
                          {isSelected ? (
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                          ) : (
                            <span className={`w-2 h-2 rounded-full shrink-0 mt-1 ${
                              method.isAvailable ? 'bg-emerald-500' : 'bg-amber-400'
                            }`} />
                          )}
                        </div>

                        <div className="mt-2 space-y-1 w-full">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs text-slate-900 truncate">
                              {method.name}
                            </span>
                            {method.badge && (
                              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded shrink-0">
                                {method.badge}
                              </span>
                            )}
                          </div>

                          <p className="text-[10px] text-slate-500 line-clamp-1">
                            {method.description}
                          </p>

                          <div className="pt-0.5">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              method.isAvailable
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/70'
                                : 'bg-slate-200/80 text-slate-600 border border-slate-300/80'
                            }`}>
                              {method.isAvailable ? t('paymentMethods.tileAvailable', 'Disponible') : t('paymentMethods.tileUnavailable', 'Non disponible')}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ZERO RESULTS FALLBACK */}
            {visibleMethods.length === 0 && (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">{t('paymentMethods.noResults', 'Aucun moyen de paiement trouvé')}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {t('paymentMethods.noResultsDesc', 'Modifiez vos critères de recherche ou réinitialisez les filtres.')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  {t('paymentMethods.resetSearch', 'Réinitialiser la recherche')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

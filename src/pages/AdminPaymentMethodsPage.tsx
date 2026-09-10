import React, { useState, useEffect } from 'react';
import { PaymentMethodItem, PaymentMethodCategory } from '../types';
import { PaymentLogo } from '../components/PaymentLogos';
import {
  CreditCard,
  Wallet,
  Gift,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  RefreshCw,
  Save,
  Check,
  Filter,
  Layers,
  ArrowLeft,
  ShieldCheck,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface AdminPaymentMethodsPageProps {
  onNavigate?: (path: string) => void;
}

export const AdminPaymentMethodsPage: React.FC<AdminPaymentMethodsPageProps> = ({ onNavigate }) => {
  const [methods, setMethods] = useState<PaymentMethodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<PaymentMethodCategory | 'all'>('all');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingReasonId, setEditingReasonId] = useState<string | null>(null);
  const [reasonDraft, setReasonDraft] = useState('');

  const fetchMethods = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/payment-methods');
      if (res.ok) {
        const data = await res.json();
        setMethods(data.methods || []);
      }
    } catch (e) {
      console.error(e);
      setStatusMessage({ type: 'error', text: 'Impossible de charger la liste des moyens de paiement.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const handleToggleActive = async (method: PaymentMethodItem) => {
    setUpdatingId(method.id);
    const newActive = !method.isActive;

    try {
      const res = await fetch(`/api/admin/payment-methods/${method.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newActive })
      });

      if (res.ok) {
        setMethods(prev => prev.map(m => m.id === method.id ? { ...m, isActive: newActive } : m));
        setStatusMessage({
          type: 'success',
          text: `Moyen de paiement ${method.name} ${newActive ? 'activé (visible clients)' : 'désactivé (masqué)'}.`
        });
      } else {
        throw new Error('Erreur lors de la mise à jour');
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'Erreur lors de la mise à jour du statut.' });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleToggleAvailability = async (method: PaymentMethodItem) => {
    setUpdatingId(method.id);
    const newAvailable = !method.isAvailable;

    try {
      const res = await fetch(`/api/admin/payment-methods/${method.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isAvailable: newAvailable,
          unavailabilityReason: newAvailable ? '' : (method.unavailabilityReason || 'Désactivé sur la passerelle marchand')
        })
      });

      if (res.ok) {
        setMethods(prev => prev.map(m => m.id === method.id ? {
          ...m,
          isAvailable: newAvailable,
          unavailabilityReason: newAvailable ? '' : (m.unavailabilityReason || 'Désactivé sur la passerelle marchand')
        } : m));
        setStatusMessage({
          type: 'success',
          text: `Disponibilité passerelle de ${method.name} définie sur : ${newAvailable ? 'DISPONIBLE' : 'NON DISPONIBLE'}.`
        });
      } else {
        throw new Error('Erreur');
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'Erreur lors du changement de disponibilité passerelle.' });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleSaveReason = async (methodId: string) => {
    try {
      const res = await fetch(`/api/admin/payment-methods/${methodId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unavailabilityReason: reasonDraft })
      });

      if (res.ok) {
        setMethods(prev => prev.map(m => m.id === methodId ? { ...m, unavailabilityReason: reasonDraft } : m));
        setEditingReasonId(null);
        setStatusMessage({ type: 'success', text: 'Motif d\'indisponibilité enregistré.' });
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'Erreur lors de l\'enregistrement du motif.' });
    } finally {
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleBulkAction = async (category: string, isActive: boolean) => {
    try {
      const res = await fetch('/api/admin/payment-methods/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, isActive })
      });

      if (res.ok) {
        await fetchMethods();
        setStatusMessage({
          type: 'success',
          text: `Action groupée réussie : tous les moyens (${category}) ont été ${isActive ? 'activés' : 'désactivés'}.`
        });
      }
    } catch (e) {
      setStatusMessage({ type: 'error', text: 'Erreur lors de l\'action groupée.' });
    } finally {
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const filteredMethods = methods.filter(m => {
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalActive = methods.filter(m => m.isActive).length;
  const totalAvailable = methods.filter(m => m.isActive && m.isAvailable).length;
  const totalUnavailable = methods.filter(m => m.isActive && !m.isAvailable).length;
  const totalHidden = methods.filter(m => !m.isActive).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              type="button"
              onClick={() => onNavigate ? onNavigate('/admin') : (window.location.href = '/admin')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Tableau de bord</span>
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">Configuration Passerelle</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-7 h-7 text-blue-600" />
            <span>Gestion des Moyens de Paiement</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Activez ou masquez les réseaux et configurez la disponibilité dynamique en conformité PCI-DSS.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (onNavigate) {
                onNavigate('/');
                setTimeout(() => {
                  document.getElementById('payment-methods')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                window.location.href = '/#payment-methods';
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Aperçu client</span>
            <ExternalLink className="w-3 h-3 ml-0.5 text-slate-400" />
          </button>
          <button
            type="button"
            onClick={fetchMethods}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Status Alert */}
      {statusMessage && (
        <div className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-150 ${
          statusMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Moyens configurés</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{methods.length}</p>
          <span className="text-[10px] text-slate-400">Cartes, Wallets & Prépayés</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Disponibles en direct</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">{totalAvailable}</p>
          <span className="text-[10px] text-emerald-600 font-medium">Actifs & Validés passerelle</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Non disponibles</span>
          <p className="text-2xl font-black text-amber-700 mt-1">{totalUnavailable}</p>
          <span className="text-[10px] text-amber-600 font-medium">Visibles mais signalés indisponibles</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Masqués aux clients</span>
          <p className="text-2xl font-black text-slate-500 mt-1">{totalHidden}</p>
          <span className="text-[10px] text-slate-400">Désactivés par l'administrateur</span>
        </div>
      </div>

      {/* Control Bar: Filters, Search & Bulk Actions */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                categoryFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tous ({methods.length})
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('cards')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                categoryFilter === 'cards' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Cartes bancaires</span>
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('wallets')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                categoryFilter === 'wallets' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Portefeuilles numériques</span>
            </button>
            <button
              type="button"
              onClick={() => setCategoryFilter('prepaid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                categoryFilter === 'prepaid' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Cartes cadeaux / Prépayés</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filtrer par nom (Visa, Steam, Apple)..."
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
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

        {/* Quick Category Bulk Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <span className="font-bold text-slate-700">Actions rapides sur la sélection :</span>
          <button
            type="button"
            onClick={() => handleBulkAction(categoryFilter, true)}
            className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition cursor-pointer"
          >
            Tout activer ({categoryFilter === 'all' ? 'Tous' : categoryFilter})
          </button>
          <button
            type="button"
            onClick={() => handleBulkAction(categoryFilter, false)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition cursor-pointer"
          >
            Tout masquer ({categoryFilter === 'all' ? 'Tous' : categoryFilter})
          </button>
        </div>
      </div>

      {/* Main Table / Grid of Payment Methods */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Liste des Moyens de Paiement ({filteredMethods.length})
          </h2>
          <span className="text-[11px] text-slate-500">
            Changements enregistrés et synchronisés instantanément
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredMethods.map((method) => {
            const isUpdating = updatingId === method.id;
            const isEditingReason = editingReasonId === method.id;

            return (
              <div
                key={method.id}
                className={`p-4 sm:p-5 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  !method.isActive ? 'bg-slate-50/70 opacity-70' : 'hover:bg-slate-50/40'
                }`}
              >
                {/* Left: Logo, Name, Badge, Category & Description */}
                <div className="flex items-start gap-4 min-w-0 max-w-xl">
                  <div className="shrink-0 pt-0.5">
                    <PaymentLogo type={method.logoType} size="md" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{method.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        method.category === 'cards'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : method.category === 'wallets'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {method.category === 'cards' ? 'Carte bancaire' : method.category === 'wallets' ? 'Portefeuille numérique' : 'Carte cadeau / Crédit prépayé'}
                      </span>
                      {method.badge && (
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {method.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {method.description}
                    </p>

                    {/* Unavailability status reason info */}
                    {!method.isAvailable && (
                      <div className="mt-2 text-xs text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-start gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          {isEditingReason ? (
                            <div className="flex items-center gap-2 mt-1">
                              <input
                                type="text"
                                value={reasonDraft}
                                onChange={e => setReasonDraft(e.target.value)}
                                placeholder="Motif d'indisponibilité (ex. En cours d'agrément)..."
                                className="w-full text-xs px-2 py-1 bg-white border border-amber-300 rounded-lg focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveReason(method.id)}
                                className="px-2 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                              >
                                OK
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingReasonId(null)}
                                className="text-xs text-amber-700 hover:text-amber-900 cursor-pointer"
                              >
                                Annuler
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <span><strong>Motif d'indisponibilité :</strong> {method.unavailabilityReason || 'Non spécifié'}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReasonId(method.id);
                                  setReasonDraft(method.unavailabilityReason || '');
                                }}
                                className="text-[10px] text-amber-900 underline font-semibold cursor-pointer shrink-0"
                              >
                                Modifier motif
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Controls (Visibility Switch + Dynamic Availability Toggle) */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* 1. Dynamic Gateway Availability Toggle */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      État passerelle
                    </span>
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleToggleAvailability(method)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        method.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                      }`}
                      title="Changer l'état disponible / non disponible"
                    >
                      {method.isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Disponible</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                          <span>Non disponible</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* 2. Client Visibility Toggle (Active/Inactive) */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Affichage clients
                    </span>
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleToggleActive(method)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs ${
                        method.isActive
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {method.isActive ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                          <span>Masqué</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

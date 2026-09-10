import React, { useState } from 'react';
import { TicketProvider } from '../types';
import {
  ArrowLeft,
  Plus,
  Check,
  X,
  CreditCard,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Save,
  Key,
  Globe
} from 'lucide-react';

interface AdminProvidersPageProps {
  providers: TicketProvider[];
  onUpdateProvider: (providerId: string, isActive: boolean) => void;
  onNavigate: (path: string) => void;
}

export const AdminProvidersPage: React.FC<AdminProvidersPageProps> = ({
  providers,
  onUpdateProvider,
  onNavigate
}) => {
  const [gatewayEndpoint, setGatewayEndpoint] = useState('https://api.cardcheck-gateway.internal/v1');
  const [apiKey, setApiKey] = useState('••••••••••••••••••••••••••••••••');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveGateway = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/admin')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Gestion des Émetteurs & Passerelles
            </h1>
            <p className="text-xs text-slate-500">
              Activez ou configurez les marques de coupons prises en charge par CARD CHECK
            </p>
          </div>
        </div>
      </div>

      {/* Gateway API Configuration Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-base">
              Passerelle Officielle de Vérification (API Gateway)
            </h2>
            <p className="text-xs text-slate-500">
              Connectez vos contrats directs avec les émetteurs ou agrégateurs de flux prépayés
            </p>
          </div>
        </div>

        {isSaved && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Paramètres de la passerelle enregistrés avec succès.</span>
          </div>
        )}

        <form onSubmit={handleSaveGateway} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Endpoint Passerelle</label>
            <input
              type="url"
              value={gatewayEndpoint}
              onChange={(e) => setGatewayEndpoint(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-slate-800 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Clé Secrète API Partenaire (X-API-KEY)</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-slate-800 focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer la configuration passerelle</span>
            </button>
          </div>
        </form>
      </div>

      {/* Providers List Grid */}
      <div className="space-y-4">
        <h2 className="font-bold text-slate-900 text-base">
          Émetteurs Référencés ({providers.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((p) => {
            return (
              <div
                key={p.id}
                className={`p-5 rounded-2xl border transition-all ${
                  p.isActive
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200/60 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full ${p.badgeColor} shrink-0`} />
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{p.name}</h3>
                      <span className="text-[11px] text-slate-400 capitalize">{p.category.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onUpdateProvider(p.id, !p.isActive)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition cursor-pointer ${
                      p.isActive
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {p.isActive ? 'Actif' : 'Désactivé'}
                  </button>
                </div>

                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {p.description}
                </p>

                <div className="space-y-2 text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Format de code</span>
                    <span className="font-bold text-slate-700">{p.codeFormat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Valeurs nominales</span>
                    <span className="font-semibold text-slate-700">
                      {p.supportedAmounts.join(', ')} {p.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Exemple reçu</span>
                    <code className="font-mono text-slate-600">{p.placeholder}</code>
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

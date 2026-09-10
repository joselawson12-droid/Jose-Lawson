import React, { useEffect, useState } from 'react';
import { VerificationLogItem, TicketProvider } from '../types';
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  WifiOff,
  LifeBuoy
} from 'lucide-react';

interface AdminVerificationsPageProps {
  providers: TicketProvider[];
  onNavigate: (path: string) => void;
}

export const AdminVerificationsPage: React.FC<AdminVerificationsPageProps> = ({
  providers,
  onNavigate
}) => {
  const [logs, setLogs] = useState<VerificationLogItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [providerFilter, setProviderFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchVerifications = async () => {
    setIsLoading(true);
    try {
      const url = new URL('/api/admin/verifications', window.location.origin);
      if (statusFilter !== 'all') url.searchParams.set('status', statusFilter);
      if (providerFilter !== 'all') url.searchParams.set('providerId', providerFilter);
      url.searchParams.set('limit', '100');

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setLogs(data.verifications || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, [statusFilter, providerFilter]);

  const filteredLogs = logs.filter(item => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.transactionId.toLowerCase().includes(term) ||
      item.maskedCode.toLowerCase().includes(term) ||
      item.providerName.toLowerCase().includes(term)
    );
  });

  const handleExportCsv = () => {
    const headers = ['Transaction ID', 'Fournisseur', 'Code Masque', 'Statut', 'Montant', 'Devise', 'IP Anonymisee', 'Date'];
    const rows = filteredLogs.map(l => [
      l.transactionId,
      l.providerName,
      l.maskedCode,
      l.status,
      l.amount || '',
      l.currency || 'EUR',
      l.ip,
      l.verifiedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cardcheck_verifications_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
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
              Historique des Vérifications
            </h1>
            <p className="text-xs text-slate-500">
              Registre d'audit avec protection des données confidentielles (codes masqués)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/admin/support')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer shadow-xs"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Support & Paiements</span>
          </button>

          <button
            type="button"
            onClick={fetchVerifications}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            title="Rafraîchir"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par n° de transaction, code masqué..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-blue-600 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-blue-600 focus:outline-none font-medium"
          >
            <option value="all">Tous les statuts</option>
            <option value="valid">Valide</option>
            <option value="invalid">Invalide</option>
            <option value="already_used">Déjà utilisé</option>
            <option value="expired">Expiré</option>
            <option value="impossible">Impossible</option>
          </select>

          {/* Provider Filter */}
          <select
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
            className="w-full md:w-auto px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:border-blue-600 focus:outline-none font-medium"
          >
            <option value="all">Tous les fournisseurs</option>
            {providers.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Transaction</th>
                <th className="py-3 px-4">Fournisseur</th>
                <th className="py-3 px-4">Code Masqué (Sécurité)</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4">Montant</th>
                <th className="py-3 px-4">IP Anonymisée</th>
                <th className="py-3 px-4">Date & Heure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Aucune vérification ne correspond à vos critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const statusDetails = {
                    valid: { label: 'Valide', cls: 'bg-emerald-100 text-emerald-800' },
                    invalid: { label: 'Invalide', cls: 'bg-rose-100 text-rose-800' },
                    already_used: { label: 'Déjà utilisé', cls: 'bg-amber-100 text-amber-800' },
                    expired: { label: 'Expiré', cls: 'bg-purple-100 text-purple-800' },
                    impossible: { label: 'Impossible', cls: 'bg-slate-200 text-slate-700' }
                  }[log.status];

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-mono font-bold text-blue-700">{log.transactionId}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{log.providerName}</td>
                      <td className="py-3 px-4 font-mono text-slate-700 font-bold">{log.maskedCode}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusDetails.cls}`}>
                          {statusDetails.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {log.amount ? `${log.amount.toFixed(2)} ${log.currency || '€'}` : '-'}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{log.ip}</td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(log.verifiedAt).toLocaleString('fr-FR')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
          <span>Affichage de {filteredLogs.length} entrée(s)</span>
          <span>Codes sensibles hachés et protégés contre les fuites</span>
        </div>
      </div>
    </div>
  );
};

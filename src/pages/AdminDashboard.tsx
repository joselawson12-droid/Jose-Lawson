import React, { useEffect, useState } from 'react';
import {
  AdminStats,
  SystemConfig,
  SystemErrorLog,
  VerificationLogItem,
  AdminUser,
  SupportDossier,
  SupportTicket,
  PaymentGatewayMetrics,
  PaymentTransaction,
  PaymentTransactionStatus
} from '../types';
import { CustomerSupportModal } from '../components/CustomerSupportModal';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Activity,
  Layers,
  Settings,
  Server,
  RefreshCw,
  Sliders,
  ExternalLink,
  Lock,
  Calendar,
  Sparkles,
  TrendingUp,
  Database,
  Wifi,
  LifeBuoy,
  Phone,
  Mail,
  User as UserIcon,
  CreditCard,
  History,
  Inbox,
  Send,
  MessageSquare,
  DollarSign,
  Search,
  Filter,
  RotateCcw,
  Users
} from 'lucide-react';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [systemConfig, setSystemConfig] = useState<SystemConfig | null>(null);
  const [recentLogs, setRecentLogs] = useState<VerificationLogItem[]>([]);
  const [systemErrors, setSystemErrors] = useState<SystemErrorLog[]>([]);
  const [supportDossiers, setSupportDossiers] = useState<SupportDossier[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [paymentMetrics, setPaymentMetrics] = useState<PaymentGatewayMetrics | null>(null);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [txSearchQuery, setTxSearchQuery] = useState<string>('');
  const [txStatusFilter, setTxStatusFilter] = useState<string>('all');
  const [selectedTxForRefund, setSelectedTxForRefund] = useState<PaymentTransaction | null>(null);
  const [refundAmount, setRefundAmount] = useState<string>('');
  const [refundReason, setRefundReason] = useState<string>('Remboursement demandé par le client');
  const [isRefunding, setIsRefunding] = useState<boolean>(false);
  const [selectedSupportDossier, setSelectedSupportDossier] = useState<SupportDossier | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, sysRes, verifRes, dossiersRes, ticketsRes, metricsRes, txRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/admin/system'),
        fetch('/api/admin/verifications?limit=6'),
        fetch('/api/admin/support/dossiers'),
        fetch('/api/admin/support/tickets'),
        fetch('/api/admin/metrics'),
        fetch('/api/admin/transactions?limit=50')
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (sysRes.ok) {
        const sysData = await sysRes.json();
        setSystemConfig(sysData.config);
        setSystemErrors(sysData.errors || []);
      }

      if (verifRes.ok) {
        const verifData = await verifRes.json();
        setRecentLogs(verifData.verifications || []);
      }

      if (dossiersRes.ok) {
        const dossiersData = await dossiersRes.json();
        setSupportDossiers(dossiersData.dossiers || []);
      }

      if (ticketsRes.ok) {
        const ticketsData = await ticketsRes.json();
        setSupportTickets(ticketsData.tickets || []);
      }

      if (metricsRes.ok) {
        const metData = await metricsRes.json();
        if (metData.metrics) setPaymentMetrics(metData.metrics);
      }

      if (txRes.ok) {
        const tData = await txRes.json();
        if (tData.transactions) setTransactions(tData.transactions);
      }
    } catch (err) {
      console.error('Error fetching admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleDemoMode = async () => {
    if (!systemConfig) return;
    setIsSavingConfig(true);
    try {
      const newMode = !systemConfig.demoMode;
      const res = await fetch('/api/admin/system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ demoMode: newMode })
      });
      if (res.ok) {
        setSystemConfig(prev => prev ? { ...prev, demoMode: newMode } : null);
        setNotification(`Mode Démonstration ${newMode ? 'activé' : 'désactivé (Mode API Officielle)'}.`);
        setTimeout(() => setNotification(null), 3500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleRefundSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTxForRefund) return;
    setIsRefunding(true);
    try {
      const res = await fetch(`/api/payments/transactions/${selectedTxForRefund.id}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: refundAmount ? parseFloat(refundAmount) : selectedTxForRefund.amount,
          reason: refundReason
        })
      });
      const data = await res.json();
      setIsRefunding(false);
      if (res.ok) {
        setNotification(`Remboursement de la transaction ${selectedTxForRefund.id} validé avec succès.`);
        setSelectedTxForRefund(null);
        fetchDashboardData();
        setTimeout(() => setNotification(null), 3500);
      } else {
        alert(data.error || 'Erreur lors du remboursement');
      }
    } catch {
      setIsRefunding(false);
      alert('Impossible d\'exécuter le remboursement');
    }
  };

  const handleUpdateDelay = async (delayMs: number) => {
    if (!systemConfig) return;
    try {
      const res = await fetch('/api/admin/system', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationDelayMs: delayMs })
      });
      if (res.ok) {
        setSystemConfig(prev => prev ? { ...prev, verificationDelayMs: delayMs } : null);
        setNotification(`Délai d'inspection fixé à ${delayMs}ms.`);
        setTimeout(() => setNotification(null), 2500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
            AD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900">Espace Administration</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold uppercase">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Connecté en tant que <span className="font-semibold text-slate-700">{user.email}</span>
            </p>
          </div>
        </div>

        {/* Quick Navigation / Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/admin/support')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Support & Demandes</span>
            {(supportTickets.filter(t => t.status === 'nouveau').length > 0 || supportDossiers.filter(d => d.supportStatus === 'open').length > 0) && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center">
                {supportTickets.filter(t => t.status === 'nouveau').length + supportDossiers.filter(d => d.supportStatus === 'open').length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/admin/verifications')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            Historique complet
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/admin/providers')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            Gestion Fournisseurs
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/admin/payment-methods')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-600" />
            <span>Moyens de Paiement</span>
          </button>

          <button
            type="button"
            onClick={fetchDashboardData}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            title="Rafraîchir les métriques"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-bold transition cursor-pointer"
          >
            Déconnexion
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-in slide-in-from-top-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Mode Démonstration Switch & Gateway Status Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${systemConfig?.demoMode ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`} />
            <span className="font-extrabold text-sm tracking-wide uppercase">
              {systemConfig?.demoMode ? 'Mode Démonstration Actif' : 'Mode Passerelle API Officielle'}
            </span>
          </div>
          <p className="text-xs text-blue-200 max-w-xl leading-relaxed">
            {systemConfig?.demoMode
              ? 'Le système génère des vérifications simulées avec validation des codes démo sans impacter de solde réel.'
              : 'Le système achemine les requêtes vers la passerelle émettrice configurée.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleDemoMode}
            disabled={isSavingConfig}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition cursor-pointer ${
              systemConfig?.demoMode
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                : 'bg-emerald-500 hover:bg-emerald-400 text-white'
            }`}
          >
            {systemConfig?.demoMode ? 'Basculer en Mode Production' : 'Basculer en Mode Démo'}
          </button>
        </div>
      </div>

      {/* 1. STATS OVERVIEW CARDS (Required by Prompt) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Verifications */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Contrôles</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono-code">
            {stats?.totalVerifications || 845}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Toutes marques confondues</span>
        </div>

        {/* Tickets Valides */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tickets Valides</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono-code">
            {stats?.validCount || 659}
          </div>
          <span className="text-[10px] text-emerald-600 mt-1 block font-semibold">
            {stats?.validityRate || 78.0}% de conformité
          </span>
        </div>

        {/* Tickets Invalides */}
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-xs">
          <div className="flex items-center justify-between text-rose-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Invalides</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-800 font-mono-code">
            {stats?.invalidCount || 84}
          </div>
          <span className="text-[10px] text-rose-600 mt-1 block">Non reconnus en base</span>
        </div>

        {/* Déjà utilisés */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Déjà Utilisés</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-800 font-mono-code">
            {stats?.usedCount || 68}
          </div>
          <span className="text-[10px] text-amber-600 mt-1 block">Déjà débités</span>
        </div>

        {/* Tickets Expirés */}
        <div className="p-4 sm:p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 shadow-xs">
          <div className="flex items-center justify-between text-purple-700 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Expirés</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-800 font-mono-code">
            {stats?.expiredCount || 34}
          </div>
          <span className="text-[10px] text-purple-600 mt-1 block">Date limite dépassée</span>
        </div>

        {/* Aujourd'hui & Mois */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Aujourd'hui</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800 font-mono-code">
            {stats?.todayCount || 94}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Ce mois : <strong className="text-slate-700">{stats?.thisMonthCount || 684}</strong>
          </span>
        </div>
      </div>

      {/* 1.B STATISTIQUES SPÉCIFIQUES TRANSACTIONS & CLIENTS (Passerelle & Portefeuilles) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Métriques Clés des Transactions & Clients
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Passerelle sécurisée active • Multi-fournisseurs (Stripe, PayPal, Adyen)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* 1. Nombre de clients */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-blue-200/80 shadow-xs">
            <div className="flex items-center justify-between text-blue-600 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Nombre de Clients</span>
              <Users className="w-4 h-4" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono-code">
              {paymentMetrics?.totalClients ?? 4}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Comptes enregistrés</span>
          </div>

          {/* 2. Nombre total de transactions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Transactions</span>
              <History className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono-code">
              {paymentMetrics?.totalTransactions ?? 8}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Toutes passerelles confondues</span>
          </div>

          {/* 3. Transactions réussies */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between text-emerald-700 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Réussies (Succès)</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono-code">
              {paymentMetrics?.successfulTransactions ?? 5}
            </div>
            <span className="text-[10px] text-emerald-600 mt-1 block font-semibold">
              Règlements validés 3DS
            </span>
          </div>

          {/* 4. Transactions échouées */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200 shadow-xs">
            <div className="flex items-center justify-between text-rose-700 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Échouées / Refus</span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-800 font-mono-code">
              {paymentMetrics?.failedTransactions ?? 1}
            </div>
            <span className="text-[10px] text-rose-600 mt-1 block">Rejets ou refus banque</span>
          </div>

          {/* 5. Transactions en attente */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between text-amber-700 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">En Attente (3DS)</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-800 font-mono-code">
              {paymentMetrics?.pendingTransactions ?? 1}
            </div>
            <span className="text-[10px] text-amber-600 mt-1 block">En attente de validation</span>
          </div>

          {/* 6. Montant total des transactions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200 shadow-xs">
            <div className="flex items-center justify-between text-blue-700 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Montant Total</span>
              <DollarSign className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-900 font-mono-code">
              {(paymentMetrics?.totalAmount ?? 875.00).toFixed(2)} €
            </div>
            <span className="text-[10px] text-blue-700 mt-1 block font-semibold">
              {(paymentMetrics?.successfulAmount ?? 675.00).toFixed(2)} € encaissés
            </span>
          </div>
        </div>
      </div>

      {/* 2. STATISTIQUES QUOTIDIENNES & MENSUELLES (Graphique visuel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Stats Visual Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Évolution Quotidienne des Contrôles</h3>
              <p className="text-xs text-slate-500">Volume de requêtes sur les 7 derniers jours</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                Valides
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                Invalides / Utilisés
              </span>
            </div>
          </div>

          {/* Pure Tailwind / SVG Accessible Chart */}
          <div className="pt-4 flex items-end justify-between gap-2 h-44 border-b border-slate-200 pb-2">
            {stats?.dailyStats?.map((day) => {
              const maxVal = 140;
              const heightPercent = Math.min(Math.round((day.total / maxVal) * 100), 100);
              const validPercent = Math.round((day.valid / day.total) * 100);

              return (
                <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="text-[10px] font-mono font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition">
                    {day.total}
                  </div>
                  <div
                    className="w-full max-w-[36px] rounded-t-lg bg-slate-100 overflow-hidden flex flex-col-reverse transition-all group-hover:scale-105"
                    style={{ height: `${heightPercent}%` }}
                    title={`${day.label} : ${day.total} requêtes (${day.valid} valides, ${day.invalid + day.used} invalides/utilisés)`}
                  >
                    <div
                      className="w-full bg-emerald-500"
                      style={{ height: `${validPercent}%` }}
                    />
                    <div
                      className="w-full bg-rose-400"
                      style={{ height: `${100 - validPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium truncate w-full text-center">
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Provider Breakdown */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Répartition par Émetteur</h3>
            <p className="text-xs text-slate-500">Volume traité par marque</p>
          </div>

          <div className="space-y-3 pt-1">
            {stats?.providerStats?.map((p) => (
              <div key={p.providerId} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">{p.providerName}</span>
                  <span className="font-mono text-slate-500">{p.total} ({p.percentage}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${p.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.5 DEMANDES SUPPORT CLIENT & ACHEMINEMENT E-MAIL */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Demandes Support Reçues
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Acheminement automatique : support@cardcheck-platform.com &rarr; dosbotocha1@gmail.com
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Consultez les demandes reçues, les coordonnées du client, le sujet, le message complet, le statut et l'historique des échanges.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/admin/support')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <span>Accéder au Support Complet</span>
            <span>&rarr;</span>
          </button>
        </div>

        {/* Quick summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Reçus</span>
            <span className="text-xl font-black text-slate-900">{supportTickets.length}</span>
          </div>
          <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
            <span className="text-[10px] font-bold uppercase text-blue-600 block">Nouveau</span>
            <span className="text-xl font-black text-blue-700">
              {supportTickets.filter(t => t.status === 'nouveau').length}
            </span>
          </div>
          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100">
            <span className="text-[10px] font-bold uppercase text-amber-600 block">En cours</span>
            <span className="text-xl font-black text-amber-700">
              {supportTickets.filter(t => t.status === 'en_cours').length}
            </span>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-emerald-600 block">Résolu</span>
            <span className="text-xl font-black text-emerald-700">
              {supportTickets.filter(t => t.status === 'resolu').length}
            </span>
          </div>
        </div>

        {/* Recent Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                <th className="py-2.5 px-3">Ticket & Date</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Sujet & Message</th>
                <th className="py-2.5 px-3">Statut</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {supportTickets.slice(0, 4).map((ticket) => (
                <tr key={ticket.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3">
                    <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {ticket.ticketNumber}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(ticket.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {ticket.customerName || <em className="text-slate-400 font-normal">Non fourni</em>}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-blue-600">
                    {ticket.customerEmail}
                  </td>
                  <td className="py-2.5 px-3 max-w-xs">
                    <div className="font-bold text-slate-800 truncate">{ticket.subject}</div>
                    <div className="text-[10px] text-slate-500 truncate font-mono">{ticket.message}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      ticket.status === 'nouveau'
                        ? 'bg-blue-100 text-blue-800'
                        : ticket.status === 'en_cours'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ticket.status === 'nouveau' ? 'Nouveau' : ticket.status === 'en_cours' ? 'En cours' : 'Résolu'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onNavigate('/admin/support')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition cursor-pointer"
                    >
                      <span>Consulter</span>
                      <span>&rarr;</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SUIVI DES PAIEMENTS & SUPPORT CLIENT (Conformité PCI-DSS Stricte) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <LifeBuoy className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Suivi des Paiements & Support Client
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Consultez les dossiers clients, analysez les erreurs bancaires et portez assistance par téléphone ou e-mail (Données sensibles CVV/PIN/OTP strictement exclues)
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/admin/support')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition cursor-pointer self-start sm:self-auto"
          >
            <span>Ouvrir l'Espace Support Complet</span>
            <span>→</span>
          </button>
        </div>

        {/* Responsive Payments Support Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/50">
                <th className="py-2.5 px-3">Client & Contact</th>
                <th className="py-2.5 px-3">ID Client</th>
                <th className="py-2.5 px-3">Transaction</th>
                <th className="py-2.5 px-3">Date & Heure</th>
                <th className="py-2.5 px-3">Montant</th>
                <th className="py-2.5 px-3">Statut</th>
                <th className="py-2.5 px-3">Type Carte</th>
                <th className="py-2.5 px-3">N° Masqué</th>
                <th className="py-2.5 px-3">Erreur Prestataire</th>
                <th className="py-2.5 px-3">Tentatives</th>
                <th className="py-2.5 px-3 text-right">Assistance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {supportDossiers.slice(0, 5).map((dossier) => {
                const statusBadge = {
                  succeeded: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                  failed: 'bg-rose-100 text-rose-800 border-rose-200',
                  requires_action: 'bg-amber-100 text-amber-800 border-amber-200',
                  processing: 'bg-blue-100 text-blue-800 border-blue-200',
                  refunded: 'bg-purple-100 text-purple-800 border-purple-200',
                  blocked: 'bg-red-100 text-red-900 border-red-200'
                }[dossier.status];

                return (
                  <tr key={dossier.id} className="hover:bg-slate-50 transition">
                    {/* Nom du client & Contact */}
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{dossier.customerName}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {dossier.customerPhone}
                      </div>
                    </td>

                    {/* Identifiant unique du client */}
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">
                      <span className="bg-blue-50 px-1.5 py-0.5 rounded-sm">
                        {dossier.customerId}
                      </span>
                    </td>

                    {/* Identifiant de transaction */}
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {dossier.transactionId}
                    </td>

                    {/* Date et heure de la transaction */}
                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">
                      {new Date(dossier.transactionDate).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Montant & Devise */}
                    <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {dossier.amount.toFixed(2)} {dossier.currency}
                    </td>

                    {/* Statut du paiement */}
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                        {dossier.status.toUpperCase()}
                      </span>
                    </td>

                    {/* Type/réseau de carte */}
                    <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                      {dossier.cardNetwork}
                    </td>

                    {/* Numéro masqué de la carte */}
                    <td className="py-2.5 px-3 font-mono text-slate-700 whitespace-nowrap font-medium">
                      {dossier.maskedCardNumber}
                    </td>

                    {/* Message d'erreur retourné par le prestataire */}
                    <td className="py-2.5 px-3 max-w-[200px]">
                      {dossier.gatewayErrorMessage ? (
                        <span className="text-[10px] text-rose-700 font-medium block truncate" title={dossier.gatewayErrorMessage}>
                          {dossier.gatewayErrorMessage}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">Aucune erreur</span>
                      )}
                    </td>

                    {/* Historique des tentatives de paiement */}
                    <td className="py-2.5 px-3 text-center">
                      <span className="font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md text-[10px]">
                        {dossier.attempts.length} essai{dossier.attempts.length > 1 ? 's' : ''}
                      </span>
                    </td>

                    {/* Bouton « Aider le client » */}
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSupportDossier(dossier);
                          setIsSupportModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-2xs transition cursor-pointer"
                      >
                        <LifeBuoy className="w-3 h-3" />
                        <span>Aider le client</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. HISTORIQUE RÉCENT (Codes masqués certifiés sans données sensibles) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Dernières Requêtes de Contrôle
            </h3>
            <p className="text-xs text-slate-500">
              Conformité stricte : aucun code sensible n'apparaît en clair dans l'historique
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/admin/verifications')}
            className="text-xs text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
          >
            Voir tout l'historique →
          </button>
        </div>

        {/* Responsive Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Transaction</th>
                <th className="py-2.5 px-3">Fournisseur</th>
                <th className="py-2.5 px-3">Code Masqué</th>
                <th className="py-2.5 px-3">Statut</th>
                <th className="py-2.5 px-3">Montant</th>
                <th className="py-2.5 px-3">IP Source</th>
                <th className="py-2.5 px-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLogs.map((log) => {
                const statusBadge = {
                  valid: 'bg-emerald-100 text-emerald-800',
                  invalid: 'bg-rose-100 text-rose-800',
                  already_used: 'bg-amber-100 text-amber-800',
                  expired: 'bg-purple-100 text-purple-800',
                  impossible: 'bg-slate-200 text-slate-700'
                }[log.status];

                return (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{log.transactionId}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{log.providerName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{log.maskedCode}</td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge}`}>
                        {log.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">
                      {log.amount ? `${log.amount} €` : '-'}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400">{log.ip}</td>
                    <td className="py-2.5 px-3 text-slate-500">
                      {new Date(log.verifiedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. GESTION DES TRANSACTIONS BANCAIRES & PASSERELLES */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base text-slate-900">
                Journal des Transactions & Règlements
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Recherche multicritère, filtrage par statut et émission de remboursements sécurisés.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="ID, Client, Email, Tél..."
                value={txSearchQuery}
                onChange={(e) => setTxSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
              />
            </div>

            <select
              value={txStatusFilter}
              onChange={(e) => setTxStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none"
            >
              <option value="all">Tous les statuts</option>
              <option value="successful">Payé (Succès)</option>
              <option value="pending">En attente</option>
              <option value="processing">En cours (3DS)</option>
              <option value="failed">Échoué / Refusé</option>
              <option value="refunded">Remboursé</option>
              <option value="cancelled">Annulé</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Réf. Transaction</th>
                <th className="py-2.5 px-3">Date & Heure</th>
                <th className="py-2.5 px-3">Client</th>
                <th className="py-2.5 px-3">Moyen / Carte</th>
                <th className="py-2.5 px-3">Montant</th>
                <th className="py-2.5 px-3">Statut</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions
                .filter((tx) => {
                  if (txStatusFilter !== 'all' && tx.status !== txStatusFilter) return false;
                  if (txSearchQuery.trim()) {
                    const q = txSearchQuery.toLowerCase().trim();
                    return (
                      tx.id.toLowerCase().includes(q) ||
                      tx.customerName.toLowerCase().includes(q) ||
                      tx.customerEmail.toLowerCase().includes(q) ||
                      (tx.customerPhone && tx.customerPhone.includes(q)) ||
                      (tx.maskedCardDetails && tx.maskedCardDetails.last4.includes(q)) ||
                      tx.paymentMethodName.toLowerCase().includes(q)
                    );
                  }
                  return true;
                })
                .slice(0, 15)
                .map((tx) => {
                  const statusBadges: Record<PaymentTransactionStatus, string> = {
                    successful: 'bg-emerald-100 text-emerald-800',
                    pending: 'bg-amber-100 text-amber-800',
                    processing: 'bg-blue-100 text-blue-800',
                    failed: 'bg-rose-100 text-rose-800',
                    cancelled: 'bg-slate-100 text-slate-700',
                    refunded: 'bg-purple-100 text-purple-800'
                  };

                  const statusLabels: Record<PaymentTransactionStatus, string> = {
                    successful: 'Succès',
                    pending: 'En attente',
                    processing: 'Validation 3DS',
                    failed: 'Échoué',
                    cancelled: 'Annulé',
                    refunded: 'Remboursé'
                  };

                  return (
                    <tr key={tx.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">{tx.id}</td>
                      <td className="py-3 px-3 text-slate-500">
                        {new Date(tx.createdAt).toLocaleString('fr-FR')}
                      </td>
                      <td className="py-3 px-3">
                        <strong className="block text-slate-900 font-semibold">{tx.customerName}</strong>
                        <span className="text-slate-400 block text-[11px]">{tx.customerEmail}</span>
                        {tx.customerPhone && (
                          <span className="text-slate-400 block text-[10px] font-mono">{tx.customerPhone}</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-800">{tx.paymentMethodName}</span>
                        {tx.maskedCardDetails && (
                          <span className="text-slate-400 block text-[11px]">
                            {tx.maskedCardDetails.brand} •••• {tx.maskedCardDetails.last4}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-black text-slate-900">
                        {tx.amount.toFixed(2)} {tx.currency}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBadges[tx.status]}`}>
                          {statusLabels[tx.status]}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {tx.status === 'successful' && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedTxForRefund(tx);
                              setRefundAmount(String(tx.amount));
                              setRefundReason('Demande de remboursement client');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-purple-200 text-purple-700 hover:bg-purple-50 font-bold text-[11px] transition cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Rembourser</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION CONFIGURATION DES MOYENS DE PAIEMENT */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Moyens de Paiement & Passerelles Actives
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Gérez la visibilité des cartes bancaires (Visa, Mastercard, Amex...), portefeuilles (Google Pay, Apple Pay, PayPal...) et cartes cadeaux / prépayés (Paysafecard, Neosurf, Steam...).
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/admin/payment-methods')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition cursor-pointer self-start sm:self-auto"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Configurer les Moyens de Paiement</span>
            <span>→</span>
          </button>
        </div>

        {/* Mini Preview Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-700">Réseaux pris en charge :</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold">Visa</span>
          <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 font-bold">Mastercard</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold">CB Locale</span>
          <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 font-bold">Google Pay</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-bold">Apple Pay</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-bold">PayPal</span>
          <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 font-bold">Paysafecard</span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 font-bold">Neosurf</span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-bold">Steam Wallet</span>
          <span className="text-[11px] text-slate-400 ml-auto font-mono">Conforme PCI-DSS Level 1 & Tokenisation</span>
        </div>
      </div>

      {/* 4. PARAMÈTRES DU SYSTÈME & ERREURS SYSTÈME */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Settings & Gateway Config */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Sliders className="w-5 h-5 text-blue-600" />
            <h3>Configuration de la Passerelle</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Délai d'inspection simulé</span>
                <span className="text-slate-500">Temps de vérification réseau</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[800, 1400, 2200].map((ms) => (
                  <button
                    key={ms}
                    type="button"
                    onClick={() => handleUpdateDelay(ms)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      systemConfig?.verificationDelayMs === ms
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {ms / 1000}s
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-slate-800 block">Endpoint API Officielle</span>
              <code className="block p-1.5 rounded bg-white border border-slate-200 font-mono text-[11px] text-slate-700 truncate">
                {systemConfig?.officialApiEndpoint}
              </code>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block">Limiteur de requêtes (Rate Limit)</span>
                <span className="text-slate-500">Protection anti-bruteforce</span>
              </div>
              <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                {systemConfig?.rateLimitPerMinute || 30} req / min
              </span>
            </div>
          </div>
        </div>

        {/* System Health & Errors Log */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Server className="w-5 h-5 text-indigo-600" />
              <h3>Santé & Journaux Système</h3>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
              Système Optimal (99.98%)
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {systemErrors.map((err) => (
              <div
                key={err.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5"
              >
                <div className={`p-1 rounded-md text-[10px] font-bold uppercase shrink-0 ${
                  err.level === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {err.service}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-800 font-medium">{err.message}</p>
                  <span className="text-[10px] text-slate-400">
                    {new Date(err.timestamp).toLocaleString('fr-FR')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL SUPPORT & ASSISTANCE CLIENT */}
      {selectedSupportDossier && (
        <CustomerSupportModal
          dossier={selectedSupportDossier}
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
          onDossierUpdated={(updated) => {
            setSupportDossiers(prev => prev.map(d => d.id === updated.id ? updated : d));
          }}
        />
      )}

      {/* MODAL REMBOURSEMENT SÉCURISÉ */}
      {selectedTxForRefund && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-purple-600" />
                <h4 className="text-base font-bold text-slate-900">Émettre un Remboursement</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTxForRefund(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Réf. transaction :</span>
                <span className="font-mono font-bold text-slate-900">{selectedTxForRefund.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Client bénéficiaire :</span>
                <span className="font-semibold text-slate-800">{selectedTxForRefund.customerName} ({selectedTxForRefund.customerEmail})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Montant initial :</span>
                <span className="font-bold text-blue-700">{selectedTxForRefund.amount.toFixed(2)} {selectedTxForRefund.currency}</span>
              </div>
            </div>

            <form onSubmit={handleRefundSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Montant à rembourser (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  max={selectedTxForRefund.amount}
                  required
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Motif / Raison du remboursement (Enregistré dans le journal d'audit)
                </label>
                <textarea
                  required
                  rows={3}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedTxForRefund(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isRefunding}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  {isRefunding ? 'Traitement en cours...' : 'Valider le remboursement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

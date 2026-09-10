import React, { useState, useEffect } from 'react';
import {
  SupportDossier,
  AuditLogItem,
  PaymentStatus,
  CardNetwork,
  SupportDossierStatus,
  SupportTicket,
  SupportTicketStatus,
  SupportEmailDispatch
} from '../types';
import { CustomerSupportModal } from '../components/CustomerSupportModal';
import { SupportTicketDetailModal } from '../components/SupportTicketDetailModal';
import {
  LifeBuoy,
  Search,
  Filter,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  CreditCard,
  User,
  History,
  AlertCircle,
  FileCheck2,
  ArrowLeft,
  Send,
  MessageSquare,
  Inbox,
  Check,
  Copy,
  Hash
} from 'lucide-react';

interface AdminSupportPageProps {
  onNavigate: (path: string) => void;
}

export const AdminSupportPage: React.FC<AdminSupportPageProps> = ({ onNavigate }) => {
  // Tabs
  const [currentTab, setCurrentTab] = useState<'tickets' | 'dossiers' | 'email_logs'>('tickets');

  // Support Tickets State
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ticketCounts, setTicketCounts] = useState({ total: 0, nouveau: 0, en_cours: 0, resolu: 0 });
  const [ticketFilter, setTicketFilter] = useState<string>('all');
  const [ticketSearch, setTicketSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Email Test & Dispatches State
  const [emailDispatches, setEmailDispatches] = useState<SupportEmailDispatch[]>([]);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<{
    success: boolean;
    details: string;
    from: string;
    to: string;
    testNumber?: string;
  } | null>(null);

  // Existing Payment Dossiers State
  const [dossiers, setDossiers] = useState<SupportDossier[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDossier, setSelectedDossier] = useState<SupportDossier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Payment Dossiers Search and Filters
  const [dossierSearchQuery, setDossierSearchQuery] = useState('');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState<string>('all');
  const [filterNetwork, setFilterNetwork] = useState<string>('all');
  const [filterSupportStatus, setFilterSupportStatus] = useState<string>('all');

  const fetchTickets = async () => {
    try {
      const params = new URLSearchParams();
      if (ticketFilter !== 'all') params.set('status', ticketFilter);
      if (ticketSearch.trim()) params.set('search', ticketSearch.trim());

      const res = await fetch(`/api/admin/support/tickets?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
        if (data.counts) {
          setTicketCounts(data.counts);
        }
      }
    } catch (e) {
      console.error('Fetch tickets error', e);
    }
  };

  const fetchEmailDispatches = async () => {
    try {
      const res = await fetch('/api/admin/support/email-dispatches');
      if (res.ok) {
        const data = await res.json();
        setEmailDispatches(data.dispatches || []);
      }
    } catch (e) {
      console.error('Fetch dispatches error', e);
    }
  };

  const fetchDossiers = async () => {
    try {
      const params = new URLSearchParams();
      if (dossierSearchQuery.trim()) params.set('search', dossierSearchQuery.trim());
      if (filterPaymentStatus !== 'all') params.set('status', filterPaymentStatus);
      if (filterNetwork !== 'all') params.set('network', filterNetwork);
      if (filterSupportStatus !== 'all') params.set('supportStatus', filterSupportStatus);

      const res = await fetch(`/api/admin/support/dossiers?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setDossiers(data.dossiers || []);
      }
    } catch (e) {
      console.error('Fetch dossiers error', e);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/admin/support/audit-logs');
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data.auditLogs || []);
      }
    } catch (e) {
      console.error('Fetch audit logs error', e);
    }
  };

  const refreshAll = async () => {
    setIsLoading(true);
    await Promise.all([fetchTickets(), fetchEmailDispatches(), fetchDossiers(), fetchAuditLogs()]);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshAll();
  }, [ticketFilter]);

  useEffect(() => {
    fetchDossiers();
  }, [filterPaymentStatus, filterNetwork, filterSupportStatus]);

  const handleSearchTickets = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTickets();
  };

  const handleTestEmailPipeline = async () => {
    setIsTestingEmail(true);
    setTestEmailResult(null);
    try {
      const res = await fetch('/api/admin/support/test-email', {
        method: 'POST'
      });
      const data = await res.json();
      setTestEmailResult(data);
      fetchEmailDispatches();
      fetchTickets();
    } catch (e: any) {
      setTestEmailResult({
        success: false,
        details: e?.message || 'Erreur lors du test',
        from: 'support@cardcheck-platform.com',
        to: 'dosbotocha1@gmail.com'
      });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleStatusChange = async (ticketId: string, newStatus: SupportTicketStatus) => {
    try {
      const res = await fetch(`/api/admin/support/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(prev => prev.map(t => t.id === ticketId ? data.ticket : t));
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket(data.ticket);
        }
        fetchTickets();
      }
    } catch (e) {
      console.error('Update status error', e);
    }
  };

  const handleReplyTicket = async (ticketId: string, replyMessage: string) => {
    try {
      const res = await fetch(`/api/admin/support/tickets/${ticketId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyMessage, adminName: 'Support Technique CARD CHECK' })
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(prev => prev.map(t => t.id === ticketId ? data.ticket : t));
        if (selectedTicket && selectedTicket.id === ticketId) {
          setSelectedTicket(data.ticket);
        }
        fetchTickets();
      }
    } catch (e) {
      console.error('Reply ticket error', e);
    }
  };

  const handleOpenTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsTicketModalOpen(true);
  };

  const handleOpenHelpModal = (dossier: SupportDossier) => {
    setSelectedDossier(dossier);
    setIsModalOpen(true);
  };

  const handleDossierUpdated = (updated: SupportDossier) => {
    setDossiers(prev => prev.map(d => d.id === updated.id ? updated : d));
    fetchAuditLogs();
  };

  const ticketStatusPill = (status: SupportTicketStatus) => {
    switch (status) {
      case 'nouveau':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Nouveau
          </span>
        );
      case 'en_cours':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            En cours
          </span>
        );
      case 'resolu':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Résolu
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER & BREADCRUMB */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('/admin')}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-bold mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au tableau de bord principal</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Support Client & Acheminement
              </h1>
              <p className="text-xs text-slate-500">
                Acheminement automatique des messages : <strong>support@cardcheck-platform.com</strong> &rarr; <strong>dosbotocha1@gmail.com</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTestEmailPipeline}
            disabled={isTestingEmail}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-xs font-bold text-blue-700 border border-blue-200 transition cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isTestingEmail ? 'Test en cours...' : 'Tester envoi d\'e-mail'}</span>
          </button>

          <button
            type="button"
            onClick={refreshAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* TEST EMAIL RESULT BANNER */}
      {testEmailResult && (
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in ${
          testEmailResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
        }`}>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold text-xs uppercase tracking-wider block">
                {testEmailResult.success ? 'Test de transmission réussi' : 'Erreur lors du test'}
              </span>
              <p className="text-xs">
                Expéditeur : <strong>{testEmailResult.from}</strong> &bull; Destinataire : <strong>{testEmailResult.to}</strong>
              </p>
              <p className="text-[11px] text-emerald-700 font-mono mt-0.5">
                {testEmailResult.details}
              </p>
            </div>
          </div>
          <button
            onClick={() => setTestEmailResult(null)}
            className="text-xs font-bold underline cursor-pointer"
          >
            Fermer
          </button>
        </div>
      )}

      {/* MANDATORY SECURITY INFO CARD */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white shadow-md border border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Sécurité & Acheminement des Demandes au Support</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Lorsqu'un utilisateur envoie une demande au support, le message est automatiquement transmis à <strong>dosbotocha1@gmail.com</strong> depuis l'adresse <strong>support@cardcheck-platform.com</strong>.
          L'e-mail reçu par l'administrateur contient : nom du client, e-mail, téléphone, sujet, message complet (avec données saisies telles que numéro de carte saisi), identifiant client, identifiant de transaction, date/heure et statut de la transaction.
        </p>
      </div>

      {/* STATS SUMMARY (TICKETS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold">Total Demandes</span>
            <Inbox className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{ticketCounts.total}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Toutes les demandes reçues</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold">Nouveau</span>
            <AlertCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-600">{ticketCounts.nouveau}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">En attente de première réponse</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold">En cours</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">{ticketCounts.en_cours}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Échanges actifs avec le client</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-bold">Résolu</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{ticketCounts.resolu}</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Demandes clôturées</p>
        </div>
      </div>

      {/* VIEW TABS */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-2">
        <button
          type="button"
          onClick={() => setCurrentTab('tickets')}
          className={`py-3 px-5 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            currentTab === 'tickets'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Demandes Support Reçues ({ticketCounts.total})</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('email_logs')}
          className={`py-3 px-5 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            currentTab === 'email_logs'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Journal d'Acheminement E-mails ({emailDispatches.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentTab('dossiers')}
          className={`py-3 px-5 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            currentTab === 'dossiers'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Suivi des Dossiers Bancaires ({dossiers.length})</span>
        </button>
      </div>

      {/* TAB 1: SUPPORT TICKETS (PRIMARY USER REQUEST) */}
      {currentTab === 'tickets' && (
        <div className="space-y-4">
          {/* SEARCH & FILTERS BAR */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <form onSubmit={handleSearchTickets} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  placeholder="Rechercher par nom, email, téléphone, n° de ticket, ID transaction, sujet ou texte du message..."
                  className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
              >
                Rechercher
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Filtrer par statut :
              </span>

              {(['all', 'nouveau', 'en_cours', 'resolu'] as const).map((st) => {
                const label = {
                  all: `Tous (${ticketCounts.total})`,
                  nouveau: `Nouveau (${ticketCounts.nouveau})`,
                  en_cours: `En cours (${ticketCounts.en_cours})`,
                  resolu: `Résolu (${ticketCounts.resolu})`
                }[st];

                const active = ticketFilter === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setTicketFilter(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                      active
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}

              {ticketSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setTicketSearch('');
                    fetchTickets();
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold ml-auto cursor-pointer"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          </div>

          {/* TICKETS TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/70">
                    <th className="py-3.5 px-4">Ticket & Date</th>
                    <th className="py-3.5 px-4">Client & Contact</th>
                    <th className="py-3.5 px-4">ID Client</th>
                    <th className="py-3.5 px-4">Sujet & Message complet</th>
                    <th className="py-3.5 px-4">Contexte Transaction</th>
                    <th className="py-3.5 px-4">Statut</th>
                    <th className="py-3.5 px-4">Acheminement E-mail</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        Aucune demande de support ne correspond à vos critères.
                      </td>
                    </tr>
                  ) : (
                    tickets.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/80 transition">
                        {/* 1. Ticket # & Date */}
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                            {t.ticketNumber}
                          </span>
                          <div className="text-[11px] text-slate-400 mt-1">
                            {new Date(t.createdAt).toLocaleString('fr-FR', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </td>

                        {/* 2. Client & Contact */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">
                            {t.customerName || <em className="text-slate-400 font-normal">Non fourni</em>}
                          </div>
                          <div className="text-[11px] text-blue-600 font-mono">
                            {t.customerEmail}
                          </div>
                          {t.customerPhone && (
                            <div className="text-[11px] text-slate-500">
                              {t.customerPhone}
                            </div>
                          )}
                        </td>

                        {/* 3. Identifiant Client */}
                        <td className="py-3.5 px-4">
                          {t.customerId ? (
                            <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                              {t.customerId}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">N/A</span>
                          )}
                        </td>

                        {/* 4. Sujet & Message complet */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-bold text-slate-900 truncate">
                            {t.subject}
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 font-mono bg-slate-50 p-1.5 rounded border border-slate-100" title={t.message}>
                            {t.message}
                          </p>
                        </td>

                        {/* 5. Contexte Transaction */}
                        <td className="py-3.5 px-4">
                          {t.transactionId ? (
                            <div className="space-y-0.5">
                              <span className="font-mono text-[11px] font-bold text-slate-800">
                                {t.transactionId}
                              </span>
                              {t.transactionStatus && (
                                <div className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded inline-block">
                                  {t.transactionStatus}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">Non applicable</span>
                          )}
                        </td>

                        {/* 6. Statut de la demande */}
                        <td className="py-3.5 px-4">
                          {ticketStatusPill(t.status)}
                        </td>

                        {/* 7. Transmission E-mail */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              <Check className="w-3 h-3 text-emerald-600" />
                              dosbotocha1@gmail.com
                            </span>
                            <div className="text-[10px] text-slate-400">
                              depuis support@cardcheck-platform.com
                            </div>
                          </div>
                        </td>

                        {/* 8. Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleOpenTicket(t)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Gérer & Répondre</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMAIL DISPATCHES AUDIT LOG */}
      {currentTab === 'email_logs' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden space-y-4 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Journal des E-mails Acheminés
              </h3>
              <p className="text-xs text-slate-500">
                Chaque soumission de formulaire génère un e-mail officiel de <strong>support@cardcheck-platform.com</strong> vers <strong>dosbotocha1@gmail.com</strong>
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              {emailDispatches.length} e-mails enregistrés
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/70">
                  <th className="py-3 px-3">Date & Heure</th>
                  <th className="py-3 px-3">Réf Ticket</th>
                  <th className="py-3 px-3">Expéditeur (Support)</th>
                  <th className="py-3 px-3">Destinataire (Admin)</th>
                  <th className="py-3 px-3">Objet</th>
                  <th className="py-3 px-3">Statut Livraison</th>
                  <th className="py-3 px-3">Aperçu du Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {emailDispatches.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Aucun e-mail n'a encore été acheminé.
                    </td>
                  </tr>
                ) : (
                  emailDispatches.map((disp) => (
                    <tr key={disp.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-3 font-mono text-slate-500">
                        {new Date(disp.sentAt).toLocaleString('fr-FR')}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-blue-700">
                        {disp.ticketNumber}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-700 font-semibold">
                        {disp.from}
                      </td>
                      <td className="py-3 px-3 font-mono text-emerald-700 font-bold">
                        {disp.to}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-800">
                        {disp.subject}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <Check className="w-3 h-3" />
                          {disp.deliveryStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-mono text-[11px] max-w-xs truncate">
                        {disp.messagePreview}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT DOSSIERS (EXISTING) */}
      {currentTab === 'dossiers' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={dossierSearchQuery}
                onChange={(e) => setDossierSearchQuery(e.target.value)}
                placeholder="Rechercher par Nom, Téléphone, E-mail, ID Client, ID Transaction..."
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider bg-slate-50/70">
                    <th className="py-3.5 px-4">Client & Contact</th>
                    <th className="py-3.5 px-4">ID Client</th>
                    <th className="py-3.5 px-4">Transaction & Date</th>
                    <th className="py-3.5 px-4">Montant</th>
                    <th className="py-3.5 px-4">Statut Paiement</th>
                    <th className="py-3.5 px-4">Réseau & Carte (Masquée)</th>
                    <th className="py-3.5 px-4">Erreur Prestataire</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dossiers.map((dossier) => (
                    <tr key={dossier.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{dossier.customerName}</div>
                        <div className="text-[11px] text-slate-500">{dossier.customerPhone} &bull; {dossier.customerEmail}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                        {dossier.customerId}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-slate-800">{dossier.transactionId}</div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(dossier.transactionDate).toLocaleString('fr-FR')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {dossier.amount.toFixed(2)} {dossier.currency}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 uppercase">
                          {dossier.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{dossier.cardNetwork}</div>
                        <div className="font-mono text-slate-600 text-[11px]">{dossier.maskedCardNumber}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs text-[11px] text-slate-600">
                        {dossier.gatewayErrorMessage || <span className="text-slate-400 italic">Aucune</span>}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenHelpModal(dossier)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                        >
                          <LifeBuoy className="w-3.5 h-3.5" />
                          <span>Dossier</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL: SUPPORT TICKET DETAIL & REPLY */}
      {selectedTicket && (
        <SupportTicketDetailModal
          ticket={selectedTicket}
          isOpen={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          onStatusChange={handleStatusChange}
          onReply={handleReplyTicket}
        />
      )}

      {/* POPUP MODAL: PAYMENT DOSSIER */}
      {selectedDossier && (
        <CustomerSupportModal
          dossier={selectedDossier}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDossierUpdated={handleDossierUpdated}
        />
      )}
    </div>
  );
};

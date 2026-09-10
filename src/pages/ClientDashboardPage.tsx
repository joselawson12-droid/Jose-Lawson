import React, { useState, useEffect } from 'react';
import {
  User,
  CreditCard,
  History,
  LifeBuoy,
  PlusCircle,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  Lock,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  FileText,
  Send,
  LogOut,
  Mail,
  Phone,
  Search,
  Filter,
  Receipt
} from 'lucide-react';
import {
  PaymentTransaction,
  ClientUser,
  SupportTicket,
  PaymentTransactionStatus
} from '../types';

interface ClientDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const ClientDashboardPage: React.FC<ClientDashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'profile' | 'support' | 'new_ticket'>('transactions');
  const [client, setClient] = useState<ClientUser | null>(null);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filter state for transactions
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTx, setSelectedTx] = useState<PaymentTransaction | null>(null);

  // New ticket state
  const [newTicketSubject, setNewTicketSubject] = useState<string>('');
  const [newTicketMessage, setNewTicketMessage] = useState<string>('');
  const [newTicketTxId, setNewTicketTxId] = useState<string>('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState<boolean>(false);
  const [ticketSuccessMessage, setTicketSuccessMessage] = useState<string | null>(null);

  // Authentication State for unauthenticated visitors
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [registerName, setRegisterName] = useState<string>('');
  const [registerPhone, setRegisterPhone] = useState<string>('');
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Load client profile
  const fetchClientData = async () => {
    setIsLoading(true);
    try {
      // 1. Get profile
      const profRes = await fetch('/api/client/profile');
      const profData = await profRes.json();
      if (profData.client) {
        setClient(profData.client);

        // 2. Get transactions
        const txRes = await fetch('/api/client/transactions');
        const txData = await txRes.json();
        if (txData.transactions) setTransactions(txData.transactions);

        // 3. Get tickets
        const supRes = await fetch('/api/client/support/tickets');
        const supData = await supRes.json();
        if (supData.tickets) setTickets(supData.tickets);
      }
    } catch {
      // Silent error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur de connexion');
      setClient(data.client);
      fetchClientData();
    } catch (err: any) {
      setAuthError(err.message || 'Erreur lors de la connexion');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerName,
          email: loginEmail,
          phone: registerPhone
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur d\'inscription');
      setClient(data.client);
      fetchClientData();
    } catch (err: any) {
      setAuthError(err.message || 'Erreur lors de la création du compte');
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    setIsSubmittingTicket(true);
    setTicketSuccessMessage(null);

    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: client?.name,
          customerEmail: client?.email,
          customerPhone: client?.phone,
          customerId: client?.id,
          subject: newTicketSubject,
          message: newTicketMessage,
          transactionId: newTicketTxId || undefined
        })
      });

      const data = await res.json();
      setIsSubmittingTicket(false);

      if (res.ok) {
        setTicketSuccessMessage(data.message || 'Votre demande a bien été envoyée à notre équipe support. Nous vous répondrons dans les meilleurs délais.');
        setNewTicketSubject('');
        setNewTicketMessage('');
        setNewTicketTxId('');
        fetchClientData();
      } else {
        alert(data.error || 'Erreur lors de la soumission de la demande.');
      }
    } catch (err: any) {
      setIsSubmittingTicket(false);
      alert('Impossible d\'envoyer le message au support.');
    }
  };

  // Status badge helper
  const renderStatusBadge = (status: PaymentTransactionStatus) => {
    switch (status) {
      case 'successful':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Payé avec succès</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            <span>En attente</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
            <Clock className="w-3.5 h-3.5" />
            <span>En cours de validation</span>
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">
            <XCircle className="w-3.5 h-3.5" />
            <span>Refusé</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Annulé</span>
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Remboursé</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter((t) => {
    if (statusFilter !== 'all' && t.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        t.id.toLowerCase().includes(q) ||
        t.paymentMethodName.toLowerCase().includes(q) ||
        (t.maskedCardDetails && t.maskedCardDetails.last4.includes(q))
      );
    }
    return true;
  });

  // If unauthenticated, show easy login/register box
  if (!client && !isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Espace Client Sécurisé</h2>
            <p className="text-xs text-slate-500">
              Consultez vos reçus de paiement, l'état de vos transactions et vos demandes de support.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              {authError}
            </div>
          )}

          <div className="flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => setIsRegisterMode(false)}
              className={`flex-1 py-2 text-xs font-bold transition border-b-2 cursor-pointer ${
                !isRegisterMode ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setIsRegisterMode(true)}
              className={`flex-1 py-2 text-xs font-bold transition border-b-2 cursor-pointer ${
                isRegisterMode ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
              }`}
            >
              Nouveau compte
            </button>
          </div>

          <form onSubmit={isRegisterMode ? handleRegister : handleLogin} className="space-y-4">
            {isRegisterMode && (
              <>
                <div>
                  <label className="text-xs text-slate-600 mb-1 block font-semibold">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Jean Dupont"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 mb-1 block font-semibold">Téléphone</label>
                  <input
                    type="tel"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs text-slate-600 mb-1 block font-semibold">Adresse e-mail</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="client@exemple.fr"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition cursor-pointer"
            >
              {isRegisterMode ? 'Créer mon compte client' : 'Accéder à mon espace'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {client?.name ? client.name.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">{client?.name}</h1>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                  Compte Vérifié
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Identifiant client : <strong className="font-mono text-slate-800">{client?.id}</strong> • {client?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/payment')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Nouveau paiement</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setClient(null);
                onNavigate('/login');
              }}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
              title="Déconnexion"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-px">
          {[
            { id: 'transactions', label: 'Mes Transactions', icon: History, count: transactions.length },
            { id: 'support', label: 'Demandes Support', icon: LifeBuoy, count: tickets.length },
            { id: 'new_ticket', label: 'Nouvelle Demande', icon: PlusCircle },
            { id: 'profile', label: 'Mon Profil', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Historique des transactions</h3>
                <p className="text-xs text-slate-500">Règlements, vérifications et recharges enregistrés sur votre compte.</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Rechercher réf, carte..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white text-slate-700 focus:outline-none"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="successful">Payé (Succès)</option>
                  <option value="pending">En attente</option>
                  <option value="failed">Refusé</option>
                  <option value="refunded">Remboursé</option>
                  <option value="cancelled">Annulé</option>
                </select>
              </div>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <CreditCard className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">Aucune transaction trouvée</p>
                <p className="text-xs text-slate-400">Vos paiements futurs apparaîtront automatiquement ici.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-100 text-slate-500 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Référence</th>
                      <th className="py-3 px-4">Date & Heure</th>
                      <th className="py-3 px-4">Moyen utilisé</th>
                      <th className="py-3 px-4">Montant</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{tx.id}</td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {new Date(tx.createdAt).toLocaleString('fr-FR')}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          <span className="font-semibold">{tx.paymentMethodName}</span>
                          {tx.maskedCardDetails && (
                            <span className="text-slate-400 block text-[11px]">
                              {tx.maskedCardDetails.brand} •••• {tx.maskedCardDetails.last4}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-slate-900">
                          {tx.amount.toFixed(2)} {tx.currency}
                        </td>
                        <td className="py-3.5 px-4">{renderStatusBadge(tx.status)}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedTx(tx)}
                            className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs hover:bg-white transition cursor-pointer"
                          >
                            Détails & Reçu
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SUPPORT TICKETS */}
        {activeTab === 'support' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Vos demandes adressées au support</h3>
                <p className="text-xs text-slate-500">Suivez l'état de traitement de vos tickets et les réponses de nos conseillers.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('new_ticket')}
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Ouvrir un nouveau ticket</span>
              </button>
            </div>

            {tickets.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <LifeBuoy className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">Aucune demande de support en cours</p>
                <p className="text-xs text-slate-400">Vous n'avez soumis aucun ticket pour le moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((t) => (
                  <div key={t.id} className="p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-blue-700">{t.ticketNumber}</span>
                        <h4 className="font-bold text-sm text-slate-900">{t.subject}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          t.status === 'resolu'
                            ? 'bg-emerald-100 text-emerald-800'
                            : t.status === 'en_cours'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {t.status === 'resolu' ? 'Résolu' : t.status === 'en_cours' ? 'En cours' : 'Nouveau'}
                        </span>
                        <span className="text-slate-400">{new Date(t.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {t.message}
                    </p>

                    {/* Messages history */}
                    {t.messages && t.messages.length > 1 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          Historique des échanges :
                        </span>
                        {t.messages.slice(1).map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-3 rounded-lg text-xs ${
                              msg.sender === 'admin'
                                ? 'bg-blue-50/80 border border-blue-100 text-blue-900'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            <div className="flex justify-between font-bold text-[11px] pb-1">
                              <span>{msg.senderName}</span>
                              <span className="text-slate-400 font-normal">{new Date(msg.timestamp).toLocaleString('fr-FR')}</span>
                            </div>
                            <p>{msg.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: NEW SUPPORT TICKET */}
        {activeTab === 'new_ticket' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
            <div>
              <h3 className="text-base font-bold text-slate-900">Formuler une demande au support</h3>
              <p className="text-xs text-slate-500">
                Votre message sera transmis automatiquement à notre équipe support (support@cardcheck-platform.com).
              </p>
            </div>

            {ticketSuccessMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block font-bold">Demande transmise avec succès</strong>
                  <p>{ticketSuccessMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Sujet de votre demande</label>
                <input
                  type="text"
                  required
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  placeholder="Ex : Question sur ma transaction ou assistance code coupon"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Associer une transaction (facultatif)
                </label>
                <select
                  value={newTicketTxId}
                  onChange={(e) => setNewTicketTxId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white text-slate-700 focus:outline-none"
                >
                  <option value="">Aucune transaction spécifique</option>
                  {transactions.map((tx) => (
                    <option key={tx.id} value={tx.id}>
                      {tx.id} — {tx.amount.toFixed(2)} {tx.currency} ({tx.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">Votre message complet</label>
                <textarea
                  required
                  rows={5}
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  placeholder="Décrivez votre question ou problème en détail. Rappel : ne communiquez jamais de code PIN ou CVV."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 flex items-start gap-2 text-[11px]">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Sécurité PCI-DSS : Ne transmettez jamais votre numéro complet de carte, votre code CVV ou code PIN secret.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmittingTicket}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmittingTicket ? (
                  <span>Transmission au support en cours...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Envoyer ma demande au support</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6 max-w-2xl mx-auto">
            <div>
              <h3 className="text-base font-bold text-slate-900">Informations de votre compte</h3>
              <p className="text-xs text-slate-500">Coordonnées associées à vos transactions et attestations de conformité.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500">Identifiant Client Unique</span>
                <span className="font-mono font-bold text-slate-900">{client?.id}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500">Nom et prénom</span>
                <span className="font-bold text-slate-900">{client?.name}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500">Adresse e-mail enregistrée</span>
                <span className="font-semibold text-slate-900">{client?.email}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500">Numéro de téléphone</span>
                <span className="font-semibold text-slate-900">{client?.phone || 'Non renseigné'}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="text-slate-500">Niveau de protection</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Chiffrement 256 bits</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Detail Receipt Modal */}
        {selectedTx && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base font-bold text-slate-900">Reçu Officiel de Transaction</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Identifiant de transaction :</span>
                  <span className="font-mono font-bold text-slate-900">{selectedTx.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Statut actuel :</span>
                  <span>{renderStatusBadge(selectedTx.status)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Montant réglé :</span>
                  <span className="font-extrabold text-blue-700 text-sm">
                    {selectedTx.amount.toFixed(2)} {selectedTx.currency}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Moyen de paiement :</span>
                  <span className="font-semibold text-slate-900">{selectedTx.paymentMethodName}</span>
                </div>
                {selectedTx.maskedCardDetails && (
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Détails de carte :</span>
                    <span className="font-semibold text-slate-900">
                      {selectedTx.maskedCardDetails.brand} (•••• {selectedTx.maskedCardDetails.last4})
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Date et heure :</span>
                  <span className="text-slate-700">{new Date(selectedTx.createdAt).toLocaleString('fr-FR')}</span>
                </div>

                {selectedTx.failureReason && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200">
                    <strong className="block">Raison du refus :</strong>
                    <span>{selectedTx.failureReason}</span>
                  </div>
                )}

                {/* Timeline */}
                {selectedTx.history && selectedTx.history.length > 0 && (
                  <div className="pt-2">
                    <span className="font-bold text-slate-700 block mb-2">Chronologie de traitement :</span>
                    <div className="space-y-1.5 pl-3 border-l-2 border-slate-200 text-[11px]">
                      {selectedTx.history.map((h, i) => (
                        <div key={i} className="space-y-0.5">
                          <span className="text-slate-400 font-mono">{new Date(h.timestamp).toLocaleTimeString('fr-FR')}</span>
                          <p className="text-slate-700 font-medium">{h.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setNewTicketTxId(selectedTx.id);
                    setNewTicketSubject(`Assistance sur la transaction ${selectedTx.id}`);
                    setSelectedTx(null);
                    setActiveTab('new_ticket');
                  }}
                  className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <LifeBuoy className="w-3.5 h-3.5" />
                  <span>Signaler un problème sur cette transaction</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTx(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

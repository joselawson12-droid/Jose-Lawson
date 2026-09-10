import React, { useState } from 'react';
import {
  SupportDossier,
  AuditLogItem,
  SupportDossierStatus
} from '../types';
import {
  X,
  Phone,
  Mail,
  User,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Lock,
  MessageSquare,
  FileText,
  ExternalLink,
  History,
  Send,
  RefreshCw,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface CustomerSupportModalProps {
  dossier: SupportDossier;
  isOpen: boolean;
  onClose: () => void;
  onDossierUpdated?: (updated: SupportDossier) => void;
}

export const CustomerSupportModal: React.FC<CustomerSupportModalProps> = ({
  dossier,
  isOpen,
  onClose,
  onDossierUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'attempts' | 'notes' | 'audit'>('details');
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [currentDossier, setCurrentDossier] = useState<SupportDossier>(dossier);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleContactAction = async (method: 'phone' | 'email') => {
    try {
      const res = await fetch(`/api/admin/support/dossiers/${currentDossier.id}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method,
          note: method === 'phone'
            ? `Prise de contact téléphonique avec le client au ${currentDossier.customerPhone}`
            : `Ouverture de session de support par e-mail vers ${currentDossier.customerEmail}`
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.dossier) {
          setCurrentDossier(data.dossier);
          onDossierUpdated?.(data.dossier);
        }
        setActionFeedback(
          method === 'phone'
            ? `Action enregistrée dans le journal d'audit : Appel vers ${currentDossier.customerPhone}`
            : `Action enregistrée dans le journal d'audit : E-mail vers ${currentDossier.customerEmail}`
        );
        setTimeout(() => setActionFeedback(null), 4000);
      }
    } catch (e) {
      console.error('Contact log failed', e);
    }
  };

  const handleStatusChange = async (newStatus: SupportDossierStatus) => {
    setIsProcessingAction(true);
    try {
      const res = await fetch(`/api/admin/support/dossiers/${currentDossier.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supportStatus: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.dossier) {
          setCurrentDossier(data.dossier);
          onDossierUpdated?.(data.dossier);
        }
        setActionFeedback(`Statut du dossier mis à jour : ${newStatus}`);
        setTimeout(() => setActionFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleQuickAction = async (actionType: 'resend_3ds_link' | 'unlock_dossier' | 'mark_resolved') => {
    setIsProcessingAction(true);
    try {
      const res = await fetch(`/api/admin/support/dossiers/${currentDossier.id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionType })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.dossier) {
          setCurrentDossier(data.dossier);
          onDossierUpdated?.(data.dossier);
        }
        setActionFeedback(data.message || 'Action administrative enregistrée.');
        setTimeout(() => setActionFeedback(null), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmittingNote(true);
    try {
      const res = await fetch(`/api/admin/support/dossiers/${currentDossier.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          note: newNote.trim(),
          actionTaken: 'Note manuelle de l\'administrateur'
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.notes) {
          const updated = { ...currentDossier, supportNotes: data.notes };
          setCurrentDossier(updated);
          onDossierUpdated?.(updated);
        }
        setNewNote('');
        setActionFeedback('Note de suivi enregistrée avec succès.');
        setTimeout(() => setActionFeedback(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const statusBadge = {
    succeeded: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    failed: 'bg-rose-100 text-rose-800 border-rose-300',
    requires_action: 'bg-amber-100 text-amber-800 border-amber-300',
    processing: 'bg-blue-100 text-blue-800 border-blue-300',
    refunded: 'bg-purple-100 text-purple-800 border-purple-300',
    blocked: 'bg-red-100 text-red-900 border-red-300'
  }[currentDossier.status];

  const supportStatusBadge = {
    open: 'bg-rose-50 text-rose-700 border-rose-200',
    in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    closed: 'bg-slate-100 text-slate-700 border-slate-200'
  }[currentDossier.supportStatus];

  return (
    <div
      id="support-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="support-modal-container"
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/30 text-blue-300 border border-blue-400/30">
                {currentDossier.id}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${statusBadge}`}>
                Paiement : {currentDossier.status.toUpperCase()}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${supportStatusBadge}`}>
                Support : {currentDossier.supportStatus.toUpperCase()}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Dossier Client : {currentDossier.customerName}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Identifiant Client unique : <span className="font-mono text-blue-300 font-bold">{currentDossier.customerId}</span> • Transaction : <span className="font-mono text-slate-200">{currentDossier.transactionId}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROMINENT DIRECT ACTION BAR: CALL & EMAIL CLIENT */}
        <div className="bg-blue-50/80 border-b border-blue-100 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Actions directes d'assistance client (horodatées et journalisées dans l'audit) :</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`tel:${currentDossier.customerPhone}`}
              onClick={() => handleContactAction('phone')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Appeler {currentDossier.customerPhone}</span>
            </a>

            <a
              href={`mailto:${currentDossier.customerEmail}?subject=Assistance%20concernant%20votre%20transaction%20${currentDossier.transactionId}&body=Bonjour%20${encodeURIComponent(currentDossier.customerName)},%0D%0A%0D%0ANous%20faisons%20suite%20%C3%A0%20votre%20transaction%20${currentDossier.transactionId}%20pour%20vous%20aider...`}
              onClick={() => handleContactAction('email')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Écrire à {currentDossier.customerEmail}</span>
            </a>

            {currentDossier.supportStatus !== 'resolved' ? (
              <button
                type="button"
                onClick={() => handleQuickAction('mark_resolved')}
                disabled={isProcessingAction}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Résoudre</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleStatusChange('in_progress')}
                disabled={isProcessingAction}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Rouvrir le ticket</span>
              </button>
            )}
          </div>
        </div>

        {/* FEEDBACK BANNER */}
        {actionFeedback && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 font-medium flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              {actionFeedback}
            </span>
          </div>
        )}

        {/* NAVIGATION TABS */}
        <div className="border-b border-slate-200 px-6 bg-slate-50/50 flex items-center gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'details'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Fiche Client & Paiement</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('attempts')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'attempts'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Historique des Tentatives ({currentDossier.attempts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'notes'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Notes Internes ({currentDossier.supportNotes.length})</span>
          </button>
        </div>

        {/* SCROLLABLE MODAL BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* MANDATORY PCI-DSS SECURITY COMPLIANCE BADGE */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-amber-900">
                    Conformité Stricte PCI-DSS & Protection des Données Confidentielles
                  </p>
                  <p className="text-amber-800 leading-relaxed">
                    Le numéro complet de la carte, le code CVV/CVC, le PIN secret et les codes OTP ne sont <strong>JAMAIS</strong> stockés ni consultables. L'administrateur dispose de toutes les métadonnées pour résoudre l'incident du porteur en toute sécurité sans compromettre ses identifiants bancaires.
                  </p>
                </div>
              </div>

              {/* SECTION 1: CLIENT IDENTITY */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Coordonnées & Identification du Client</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Nom du client</span>
                    <span className="text-slate-900 font-bold text-sm block mt-0.5">{currentDossier.customerName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Identifiant unique client</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        {currentDossier.customerId}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(currentDossier.customerId, 'custId')}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Copier"
                      >
                        {copiedField === 'custId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Numéro de téléphone</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <a href={`tel:${currentDossier.customerPhone}`} className="font-semibold text-blue-600 hover:underline">
                        {currentDossier.customerPhone}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(currentDossier.customerPhone, 'phone')}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Copier"
                      >
                        {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Adresse e-mail</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <a href={`mailto:${currentDossier.customerEmail}`} className="font-semibold text-blue-600 hover:underline truncate max-w-[170px]">
                        {currentDossier.customerEmail}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(currentDossier.customerEmail, 'email')}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Copier"
                      >
                        {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: TRANSACTION & FINANCIAL DATA */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Détails de la Transaction & Données de Carte Sécurisées</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Identifiant de transaction</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
                        {currentDossier.transactionId}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(currentDossier.transactionId, 'txId')}
                        className="text-slate-400 hover:text-slate-700 p-1"
                        title="Copier"
                      >
                        {copiedField === 'txId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Date et heure certifiée</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">
                      {new Date(currentDossier.transactionDate).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Montant & Devise</span>
                    <span className="font-bold text-base text-slate-900 block mt-0.5">
                      {currentDossier.amount.toFixed(2)} {currentDossier.currency}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Type/Réseau de carte</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 font-bold text-slate-800 mt-0.5">
                      {currentDossier.cardNetwork}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Numéro masqué de la carte</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-0.5 rounded-md tracking-wider">
                        {currentDossier.maskedCardNumber}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200">
                        PCI Masqué
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-semibold">Passerelle de paiement</span>
                    <span className="font-semibold text-slate-700 block mt-0.5">
                      {currentDossier.providerGateway}
                    </span>
                  </div>
                </div>

                {/* GATEWAY ERROR MESSAGE HIGHLIGHT */}
                <div className="mt-4 p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Message d'erreur retourné par le prestataire de paiement :</span>
                  </div>
                  <p className="text-xs font-mono text-rose-800 bg-white/80 p-2.5 rounded-lg border border-rose-100">
                    {currentDossier.gatewayErrorMessage || 'Aucun message d\'erreur critique enregistré.'}
                  </p>
                  {currentDossier.gatewayErrorCode && (
                    <p className="text-[11px] text-rose-700">
                      Code d'erreur officiel : <span className="font-mono font-bold">{currentDossier.gatewayErrorCode}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* ADMINISTRATIVE ACTIONS BAR */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <span>Passerelle d'assistance : </span>
                  <span className="font-semibold text-slate-900">Résolution guidée sans divulgation de code bancaire</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAction('resend_3ds_link')}
                    disabled={isProcessingAction}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer transition"
                  >
                    Régénérer lien 3DS
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAction('unlock_dossier')}
                    disabled={isProcessingAction}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 cursor-pointer transition"
                  >
                    Débloquer dossier
                  </button>

                  <select
                    value={currentDossier.supportStatus}
                    onChange={(e) => handleStatusChange(e.target.value as SupportDossierStatus)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 cursor-pointer"
                  >
                    <option value="open">Statut : Ouvert</option>
                    <option value="in_progress">Statut : En cours</option>
                    <option value="resolved">Statut : Résolu</option>
                    <option value="closed">Statut : Clôturé</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attempts' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-600" />
                  <span>Chronologie détaillée des tentatives de paiement ({currentDossier.attempts.length})</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  Horodatage certifié
                </span>
              </div>

              <div className="space-y-3">
                {currentDossier.attempts.map((att, idx) => {
                  const attBadge = {
                    succeeded: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    failed: 'bg-rose-100 text-rose-800 border-rose-200',
                    requires_action: 'bg-amber-100 text-amber-800 border-amber-200',
                    processing: 'bg-blue-100 text-blue-800 border-blue-200',
                    refunded: 'bg-purple-100 text-purple-800 border-purple-200',
                    blocked: 'bg-red-100 text-red-900 border-red-200'
                  }[att.status];

                  return (
                    <div
                      key={att.id || idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center">
                            #{att.attemptNumber}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${attBadge}`}>
                            {att.status.toUpperCase()}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {new Date(att.timestamp).toLocaleTimeString('fr-FR', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </span>
                        </div>

                        <div className="text-xs font-mono text-slate-400">
                          IP Source : {att.ipAddress}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                        <div>
                          <span className="text-slate-400 block">Réponse passerelle :</span>
                          <span className="font-mono font-bold text-slate-800">{att.gatewayResponseCode}</span>
                          <p className="text-slate-600 mt-0.5">{att.gatewayMessage}</p>
                        </div>

                        <div>
                          <span className="text-slate-400 block">Statut 3D-Secure :</span>
                          <span className="font-semibold text-slate-800">
                            {att.threeDSecureStatus ? `3DS: ${att.threeDSecureStatus}` : 'Non requis'}
                          </span>
                          {att.failureReason && (
                            <p className="text-rose-600 font-medium mt-0.5">
                              Motif : {att.failureReason}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              {/* ADD NEW NOTE FORM */}
              <form onSubmit={handleAddNote} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Ajouter une note de suivi interne au dossier :
                </label>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Ex : Client contacté par téléphone à 11h20. M. Bernard a été guidé pour débloquer son plafond bancaire..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingNote || !newNote.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingNote ? 'Enregistrement...' : 'Enregistrer la note'}</span>
                  </button>
                </div>
              </form>

              {/* NOTES LIST */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Historique des interventions ({currentDossier.supportNotes.length})
                </h4>

                {currentDossier.supportNotes.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Aucune note enregistrée sur ce dossier.</p>
                ) : (
                  currentDossier.supportNotes.map((n) => (
                    <div key={n.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <span className="font-bold text-slate-800">{n.adminName}</span>
                        <span>{new Date(n.timestamp).toLocaleString('fr-FR')}</span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">{n.note}</p>
                      {n.actionTaken && (
                        <span className="inline-block text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          Action : {n.actionTaken}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex items-center justify-between text-xs">
          <div className="text-slate-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-400" />
            <span>Accès administrateur sécurisé et audité</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer"
          >
            Fermer le dossier
          </button>
        </div>
      </div>
    </div>
  );
};

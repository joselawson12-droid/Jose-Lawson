import React, { useState } from 'react';
import {
  SupportTicket,
  SupportTicketStatus,
  SupportTicketMessage
} from '../types';
import {
  X,
  User,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  CreditCard,
  Hash,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
  Reply
} from 'lucide-react';

interface SupportTicketDetailModalProps {
  ticket: SupportTicket;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (ticketId: string, newStatus: SupportTicketStatus) => Promise<void>;
  onReply: (ticketId: string, replyMessage: string) => Promise<void>;
}

export const SupportTicketDetailModal: React.FC<SupportTicketDetailModalProps> = ({
  ticket,
  isOpen,
  onClose,
  onStatusChange,
  onReply
}) => {
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsReplying(true);
    try {
      await onReply(ticket.id, replyText.trim());
      setReplyText('');
      setFeedback('Réponse transmise avec succès au client et ajoutée à l\'historique.');
      setTimeout(() => setFeedback(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReplying(false);
    }
  };

  const statusBadge = (status: SupportTicketStatus) => {
    switch (status) {
      case 'nouveau':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Nouveau
          </span>
        );
      case 'en_cours':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            En cours
          </span>
        );
      case 'resolu':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Résolu
          </span>
        );
      default:
        return null;
    }
  };

  const formattedDate = new Date(ticket.createdAt).toLocaleString('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-lg border border-blue-800/50">
                {ticket.ticketNumber}
              </span>
              {statusBadge(ticket.status)}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {ticket.subject}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Reçu le {formattedDate}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedback && (
          <div className="bg-emerald-500 text-white text-xs font-bold px-6 py-2.5 text-center transition">
            {feedback}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Status Quick Switcher */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Statut de traitement de la demande
              </span>
              <p className="text-xs text-slate-600">
                Mettre à jour l'état de prise en charge :
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStatusChange(ticket.id, 'nouveau')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  ticket.status === 'nouveau'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Nouveau
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(ticket.id, 'en_cours')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  ticket.status === 'en_cours'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                En cours
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(ticket.id, 'resolu')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  ticket.status === 'resolu'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Résolu
              </button>
            </div>
          </div>

          {/* Automatic Email Forwarding Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-900 block">
                  Transmission automatique par e-mail
                </span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Message acheminé de <strong className="font-mono text-emerald-950">support@cardcheck-platform.com</strong> vers <strong className="font-mono text-emerald-950">dosbotocha1@gmail.com</strong>
                </p>
                {ticket.emailDispatch?.details && (
                  <p className="text-[11px] text-emerald-700 font-medium">
                    {ticket.emailDispatch.details}
                  </p>
                )}
              </div>
            </div>

            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-emerald-200/80 text-emerald-900 px-2.5 py-1 rounded-full">
              Livré avec succès
            </span>
          </div>

          {/* Client & Context Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1: Coordonnées du client */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                Coordonnées du client
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Nom du client
                  </span>
                  <span className="font-bold text-slate-900">
                    {ticket.customerName || <em className="text-slate-400 font-normal">Non fourni</em>}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Adresse e-mail
                  </span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`mailto:${ticket.customerEmail}`}
                      className="font-bold text-blue-600 hover:underline"
                    >
                      {ticket.customerEmail}
                    </a>
                    <button
                      onClick={() => handleCopy(ticket.customerEmail, 'email')}
                      className="text-slate-400 hover:text-slate-600 p-0.5"
                      title="Copier"
                    >
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    Téléphone
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">
                      {ticket.customerPhone || <em className="text-slate-400 font-normal">Non fourni</em>}
                    </span>
                    {ticket.customerPhone && (
                      <button
                        onClick={() => handleCopy(ticket.customerPhone!, 'phone')}
                        className="text-slate-400 hover:text-slate-600 p-0.5"
                        title="Copier"
                      >
                        {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-400" />
                    Identifiant client
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {ticket.customerId || <em className="text-slate-400 font-normal">Non disponible</em>}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: Contexte Transaction / Paiement */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                Contexte Paiement & Transaction
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                    ID Transaction
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {ticket.transactionId ? (
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                        {ticket.transactionId}
                      </span>
                    ) : (
                      <em className="text-slate-400 font-normal">Non renseigné</em>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Statut de la transaction</span>
                  <div>
                    {ticket.transactionStatus ? (
                      <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                        {ticket.transactionStatus}
                      </span>
                    ) : (
                      <span className="text-slate-400">Non applicable</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Date & Heure</span>
                  <span className="font-medium text-slate-700">
                    {new Date(ticket.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-500 font-medium">Nombre de messages</span>
                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {ticket.messages.length} échange{ticket.messages.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Message complet du client (First message) */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                Message complet du client (tel que saisi)
              </span>
              <button
                type="button"
                onClick={() => handleCopy(ticket.message, 'message')}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedField === 'message' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copier</span>
              </button>
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm font-mono text-slate-900 whitespace-pre-wrap leading-relaxed">
              {ticket.message}
            </div>
          </div>

          {/* Historique des échanges */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Historique des échanges ({ticket.messages.length})
            </h4>

            <div className="space-y-3">
              {ticket.messages.map((msg, index) => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id || index}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                      isAdmin
                        ? 'bg-blue-50/70 border-blue-200 ml-4 sm:ml-8'
                        : 'bg-white border-slate-200 mr-4 sm:mr-8 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                            isAdmin
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 text-slate-800'
                          }`}
                        >
                          {isAdmin ? 'Support CARD CHECK' : (msg.senderName || 'Client')}
                        </span>
                        {msg.senderEmail && (
                          <span className="text-slate-400 text-xs">
                            &lt;{msg.senderEmail}&gt;
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {new Date(msg.timestamp).toLocaleString('fr-FR', {
                          dateStyle: 'short',
                          timeStyle: 'short'
                        })}
                      </span>
                    </div>

                    <div className="whitespace-pre-wrap text-slate-800 font-sans">
                      {msg.content}
                    </div>

                    {msg.emailSent && (
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Transmis par notification e-mail</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formulaire de réponse / Ajout d'échange */}
          <form onSubmit={handleSendReply} className="space-y-3 pt-2 border-t border-slate-200">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Reply className="w-4 h-4 text-blue-600" />
              Répondre au client / Ajouter une note au dossier
            </label>

            <textarea
              required
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Rédigez votre réponse ou instruction d'assistance. Le statut passera automatiquement 'En cours'..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-blue-600 focus:outline-none resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Une copie de cette réponse sera enregistrée dans l'historique et notifiée.
              </span>

              <button
                type="submit"
                disabled={isReplying || !replyText.trim()}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isReplying ? 'Envoi...' : 'Envoyer la réponse'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Dernière mise à jour : {new Date(ticket.updatedAt).toLocaleTimeString('fr-FR')}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

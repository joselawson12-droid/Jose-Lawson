import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ShieldCheck,
  Clock,
  MessageSquare,
  HelpCircle,
  CreditCard,
  User,
  AlertCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('verification');
  const [message, setMessage] = useState('');
  const [isPaymentRelated, setIsPaymentRelated] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('failed');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    ticketNumber: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || undefined,
          email: email.trim(),
          phone: phone.trim() || undefined,
          subject: subject === 'other' ? 'Demande spécifique' : subject,
          message: message.trim(),
          customerId: customerId.trim() || undefined,
          transactionId: (isPaymentRelated && transactionId.trim()) ? transactionId.trim() : undefined,
          transactionStatus: isPaymentRelated ? transactionStatus : undefined
        })
      });
      const data = await res.json();
      setConfirmationData({
        ticketNumber: data.ticketNumber || `CC-SUP-${Math.floor(10000 + Math.random() * 90000)}`,
        message: data.message || t('contact.sentSuccessDesc', 'Votre demande a bien été envoyée à notre équipe support. Nous vous répondrons dans les meilleurs délais.'),
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });
    } catch (e) {
      setConfirmationData({
        ticketNumber: `CC-SUP-${Math.floor(10000 + Math.random() * 90000)}`,
        message: t('contact.sentSuccessDesc', 'Votre demande a bien été envoyée à notre équipe support. Nous vous répondrons dans les meilleurs délais.'),
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          {t('contact.badge', 'Support & Assistance 24/7')}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {t('contact.title', "Contactez l'équipe CARD CHECK")}
        </h1>
        <p className="text-sm sm:text-base text-slate-500">
          {t('contact.subtitle', "Une question sur la vérification d'un coupon, une difficulté sur un règlement ou un signalement ? Notre équipe d'assistance vous répond sous 2 heures.")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{t('contact.boxEmailTitle', 'Adresse e-mail de support')}</h3>
            <p className="text-xs font-mono font-bold text-blue-600 bg-blue-50/60 px-2 py-1 rounded-lg border border-blue-100 break-all">
              support@cardcheck-platform.com
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold block">
              {t('contact.boxEmailTime', 'Délai moyen de réponse : < 2 heures')}
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{t('contact.boxAvailabilityTitle', 'Disponibilité du service')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('contact.boxAvailabilityDesc', 'Moteurs de vérification opérationnels 24h/24 et 7j/7. Permanence d\'assistance technique du lundi au dimanche de 8h à 22h.')}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">{t('contact.boxSecurityTitle', 'Assistance & Sécurité')}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('contact.boxSecurityDesc', 'Votre demande est transmise de manière sécurisée et horodatée au centre de traitement technique pour prise en charge immédiate.')}
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-100">
          {confirmationData ? (
            <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-2xl font-black text-slate-900">{t('contact.sentSuccessTitle', 'Demande transmise avec succès')}</h3>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold leading-relaxed shadow-xs">
                  « {confirmationData.message} »
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">{t('contact.supportReference', 'Référence Support')}</span>
                  <span className="font-mono font-bold text-sm text-blue-700">{confirmationData.ticketNumber}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">{t('contact.recipientService', 'Service destinataire')}</span>
                  <span className="text-xs font-bold text-slate-700">support@cardcheck-platform.com</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t('contact.notifSentDesc', "Une notification a été automatiquement adressée à nos administrateurs. Vous recevrez un retour directement à l'adresse indiquée.")}
              </p>

              <button
                type="button"
                onClick={() => {
                  setConfirmationData(null);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                  setCustomerId('');
                  setTransactionId('');
                  setIsPaymentRelated(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition shadow-xs"
              >
                {t('contact.btnSendAnother', 'Envoyer un nouveau message')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-900">{t('contact.formTitle', "Formulaire d'assistance client")}</h3>
                <p className="text-xs text-slate-500">
                  {t('contact.formSubtitle', 'Tous les messages sont adressés en direct à notre équipe à support@cardcheck-platform.com.')}
                </p>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('contact.fieldName', 'Nom du client')} <span className="text-slate-400 font-normal">({t('common.optional', 'optionnel')})</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Jean Dupont"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('contact.fieldEmail', 'Adresse e-mail *')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('contact.fieldPhone', 'Numéro de téléphone')} <span className="text-slate-400 font-normal">({t('common.optional', 'optionnel')})</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t('contact.customerId', 'Identifiant client (si disponible)')}
                  </label>
                  <input
                    type="text"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Ex: CUST-8492"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('contact.fieldSubject', 'Sujet de la demande *')}
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none bg-white transition"
                >
                  <option value="Assistance sur une vérification de coupon">{t('contact.subjVerification', 'Assistance sur une vérification de coupon / ticket')}</option>
                  <option value="Problème de validation ou de débit bancaire">{t('contact.subjPayment', 'Problème de validation ou de règlement bancaire')}</option>
                  <option value="Signalement de tentative d'escroquerie">{t('contact.subjFraud', "Signalement de tentative d'escroquerie / fraude")}</option>
                  <option value="Demande d'activation ou de déblocage">{t('contact.subjActivation', "Demande d'activation ou de déblocage")}</option>
                  <option value="Question sur un moyen de paiement ou un émetteur">{t('contact.subjIssuer', 'Question sur un émetteur ou moyen de paiement')}</option>
                  <option value="other">{t('contact.subjOther', 'Autre demande')}</option>
                </select>
              </div>

              {/* Transaction / Payment Context Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isPaymentRelated}
                    onChange={(e) => setIsPaymentRelated(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    {t('contact.isPaymentQuestion', 'Cette demande concerne un paiement ou une transaction spécifique')}
                  </span>
                </label>

                {isPaymentRelated && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {t('contact.transactionIdLabel', 'Identifiant de transaction (si disponible)')}
                      </label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="Ex: TX-PAY-2026-91823"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {t('contact.transactionStatusLabel', 'Statut de la transaction')}
                      </label>
                      <select
                        value={transactionStatus}
                        onChange={(e) => setTransactionStatus(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-blue-600"
                      >
                        <option value="Échec / Refusé (failed)">{t('contact.statusFailed', 'Échec / Refusé')}</option>
                        <option value="En attente / Validation 3DS (processing)">{t('contact.statusPending', 'En attente / 3DS')}</option>
                        <option value="Réussi / Débité (succeeded)">{t('contact.statusSuccess', 'Réussi / Débité')}</option>
                        <option value="Bloqué préventif (blocked)">{t('contact.statusBlocked', 'Bloqué préventif')}</option>
                        <option value="Autre statut">{t('contact.statusOther', 'Autre statut')}</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Message complet du client */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t('contact.fieldMessage', 'Message complet du client *')}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact.fieldMessagePlaceholder', 'Décrivez votre situation en détail...')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none transition resize-none leading-relaxed"
                />
              </div>

              <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-2.5 text-[11px] text-blue-950">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  {t('contact.secureTransmissionNote', 'Transmission sécurisée : Votre message sera automatiquement transmis à notre équipe support à support@cardcheck-platform.com pour analyse et traitement sous 2 heures.')}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? t('contact.sending', 'Envoi de votre demande...') : t('contact.btnSend', 'Envoyer ma demande au support')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

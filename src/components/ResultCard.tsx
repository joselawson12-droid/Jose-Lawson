import React, { useState } from 'react';
import { VerificationResult } from '../types';
import { CertificateModal } from './CertificateModal';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  WifiOff,
  RotateCcw,
  FileCheck,
  ShieldCheck,
  CreditCard,
  Calendar,
  Lock,
  ExternalLink,
  Zap,
  Info,
  Check
} from 'lucide-react';

interface ResultCardProps {
  result: VerificationResult;
  onReset: () => void;
  onActivateSuccess?: () => void;
  lang?: 'en' | 'fr';
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset, onActivateSuccess, lang = 'fr' }) => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [activated, setActivated] = useState(result.isActivated || false);

  const isEn = lang === 'en';

  const formattedDate = new Date(result.verifiedAt).toLocaleString(isEn ? 'en-US' : 'fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const handleActivate = async () => {
    setIsActivating(true);
    try {
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: result.transactionId,
          maskedCode: result.maskedCode
        })
      });
      if (res.ok) {
        setActivated(true);
        if (onActivateSuccess) onActivateSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsActivating(false);
    }
  };

  // Status visual themes & icons
  const statusConfigFr = {
    valid: {
      title: 'Ticket Valide & Actif',
      subtitle: 'Ce coupon est authentifié, intègre et disponible pour vos opérations.',
      icon: CheckCircle2,
      containerBorder: 'border-emerald-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-emerald-500',
      badgeText: 'text-white',
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      ringColor: 'ring-emerald-500/20'
    },
    invalid: {
      title: 'Ticket Invalide',
      subtitle: 'Le code saisi ne correspond à aucun coupon enregistré dans le registre officiel.',
      icon: XCircle,
      containerBorder: 'border-rose-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-rose-500',
      badgeText: 'text-white',
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50',
      ringColor: 'ring-rose-500/20'
    },
    already_used: {
      title: 'Ticket Déjà Utilisé',
      subtitle: 'Ce ticket a déjà été consommé, débité ou encaissé au préalable.',
      icon: AlertTriangle,
      containerBorder: 'border-amber-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-amber-500',
      badgeText: 'text-white',
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      ringColor: 'ring-amber-500/20'
    },
    expired: {
      title: 'Ticket Expiré',
      subtitle: 'La période d\'utilisation autorisée pour ce coupon est échue.',
      icon: Clock,
      containerBorder: 'border-purple-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-purple-500',
      badgeText: 'text-white',
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
      ringColor: 'ring-purple-500/20'
    },
    impossible: {
      title: 'Vérification Impossible',
      subtitle: 'La passerelle de contrôle du fournisseur ne répond pas actuellement.',
      icon: WifiOff,
      containerBorder: 'border-slate-300',
      containerBg: 'bg-white',
      badgeBg: 'bg-slate-600',
      badgeText: 'text-white',
      iconColor: 'text-slate-500',
      iconBg: 'bg-slate-100',
      ringColor: 'ring-slate-400/20'
    }
  };

  const statusConfigEn = {
    valid: {
      title: 'Card / Voucher Valid & Active',
      subtitle: 'This voucher is authenticated, verified genuine, and ready for card activation.',
      icon: CheckCircle2,
      containerBorder: 'border-emerald-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-emerald-500',
      badgeText: 'text-white',
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50',
      ringColor: 'ring-emerald-500/20'
    },
    invalid: {
      title: 'Invalid Voucher Code',
      subtitle: 'The code entered does not match any registered voucher in the official issuer database.',
      icon: XCircle,
      containerBorder: 'border-rose-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-rose-500',
      badgeText: 'text-white',
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50',
      ringColor: 'ring-rose-500/20'
    },
    already_used: {
      title: 'Voucher Already Redeemed',
      subtitle: 'This voucher has already been spent, debited, or previously activated.',
      icon: AlertTriangle,
      containerBorder: 'border-amber-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-amber-500',
      badgeText: 'text-white',
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-50',
      ringColor: 'ring-amber-500/20'
    },
    expired: {
      title: 'Voucher Expired',
      subtitle: 'The validity period for this voucher has passed and it can no longer be redeemed.',
      icon: Clock,
      containerBorder: 'border-purple-200',
      containerBg: 'bg-white',
      badgeBg: 'bg-purple-500',
      badgeText: 'text-white',
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-50',
      ringColor: 'ring-purple-500/20'
    },
    impossible: {
      title: 'Verification Unavailable',
      subtitle: 'The card provider verification gateway is currently not responding.',
      icon: WifiOff,
      containerBorder: 'border-slate-300',
      containerBg: 'bg-white',
      badgeBg: 'bg-slate-600',
      badgeText: 'text-white',
      iconColor: 'text-slate-500',
      iconBg: 'bg-slate-100',
      ringColor: 'ring-slate-400/20'
    }
  };

  const statusConfig = isEn ? statusConfigEn : statusConfigFr;

  const currentTheme = statusConfig[result.status];
  const StatusIcon = currentTheme.icon;

  return (
    <div className="w-full max-w-xl mx-auto animate-in fade-in-50 zoom-in-95 duration-300">
      <div className={`rounded-3xl shadow-xl shadow-slate-200/70 border ${currentTheme.containerBorder} ${currentTheme.containerBg} overflow-hidden`}>
        
        {/* Top Status Header */}
        <div className="p-6 sm:p-8 text-center border-b border-slate-100 relative">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-3 border border-emerald-200 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isEn ? 'Official Verification Certificate' : 'Certificat Officiel de Contrôle'}</span>
          </div>

          {/* Large Status Icon */}
          <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <div className={`w-20 h-20 rounded-2xl ${currentTheme.iconBg} ring-8 ${currentTheme.ringColor} flex items-center justify-center transition-transform hover:scale-105`}>
              <StatusIcon className={`w-12 h-12 ${currentTheme.iconColor} stroke-[2.2]`} />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {currentTheme.title}
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            {currentTheme.subtitle}
          </p>

          {/* Amount Badge if valid or available */}
          {result.amount !== undefined && (
            <div className="mt-5 inline-flex flex-col items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/10">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                {isEn ? 'Available Certified Balance' : 'Solde vérifié disponible'}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono-code tracking-tight">
                {result.amount.toFixed(2)} {result.currency || 'EUR'}
              </span>
            </div>
          )}
        </div>

        {/* Essential Data Grid */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            {isEn ? 'Certified Query Record' : 'Données certifiées de la requête'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Fournisseur */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100/70 text-blue-700">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">{isEn ? 'Card / Issuer' : 'Fournisseur'}</span>
                <span className="font-bold text-slate-800 text-sm">{result.provider.name}</span>
              </div>
            </div>

            {/* Statut */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100/70 text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">{isEn ? 'Verification Status' : 'Statut du contrôle'}</span>
                <span className={`font-bold text-sm ${result.status === 'valid' ? 'text-emerald-700' : 'text-slate-800'}`}>
                  {isEn && result.status === 'valid' ? 'Valid & Certified' : result.statusLabel}
                </span>
              </div>
            </div>

            {/* Code masqué */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-200 text-slate-700">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">{isEn ? 'Voucher Code (Masked)' : 'Code saisi (Masqué)'}</span>
                <span className="font-mono-code font-bold text-slate-900 text-sm tracking-wide">
                  {result.maskedCode}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-100/70 text-indigo-700">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">{isEn ? 'Official Timestamp' : 'Horodatage officiel'}</span>
                <span className="font-semibold text-slate-800">{formattedDate}</span>
              </div>
            </div>
          </div>

          {/* Transaction ID & Cryptographic Seal */}
          <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div>
              <span className="text-slate-500 block text-[11px]">{isEn ? 'Transaction Identifier' : 'Identifiant de transaction'}</span>
              <span className="font-mono-code font-bold text-blue-800">{result.transactionId}</span>
            </div>
            <div className="sm:text-right">
              <span className="text-slate-500 block text-[11px]">{isEn ? 'Cryptographic Seal' : 'Sceau de sécurité'}</span>
              <span className="font-mono-code text-[10px] text-slate-600 truncate block max-w-[180px]">
                {result.securitySeal}
              </span>
            </div>
          </div>

          {/* Contextual Advice or Error details */}
          {(result.reason || result.advice) && (
            <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700 space-y-1">
              {result.reason && (
                <p className="font-semibold text-slate-800">
                  <span className="text-slate-500">{isEn ? 'Finding: ' : 'Constat : '}</span> {result.reason}
                </p>
              )}
              {result.advice && (
                <p className="text-slate-600 flex items-start gap-1.5 pt-1">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{result.advice}</span>
                </p>
              )}
            </div>
          )}

          {/* Activation Success Note if activated */}
          {activated && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{isEn ? 'This card has been activated and registered in the secure ledger.' : 'Ce ticket a été activé et consigné dans le registre sécurisé.'}</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-2.5">
            {/* Nouvelle vérification (Requested explicitly) */}
            <button
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition cursor-pointer active:scale-98"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isEn ? 'Verify Another Voucher' : 'Effectuer une nouvelle vérification'}</span>
            </button>

            {/* Télécharger / Voir attestation */}
            <button
              type="button"
              onClick={() => setShowCertificate(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition cursor-pointer"
              title={isEn ? 'Get printable verification certificate' : "Obtenir l'attestation imprimable"}
            >
              <FileCheck className="w-4 h-4 text-blue-600" />
              <span>{isEn ? 'Certificate' : 'Attestation'}</span>
            </button>

            {/* Activer / Consigner (If valid and not yet activated) */}
            {result.status === 'valid' && !activated && (
              <button
                type="button"
                onClick={handleActivate}
                disabled={isActivating}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition cursor-pointer disabled:opacity-50"
                title={isEn ? 'Activate or redeem voucher' : 'Consigner ou activer le ticket'}
              >
                <Zap className="w-4 h-4" />
                <span>{isActivating ? (isEn ? 'Activating...' : 'Activation...') : (isEn ? 'Activate MyCard Now' : 'Activer')}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal result={result} onClose={() => setShowCertificate(false)} />
      )}
    </div>
  );
};

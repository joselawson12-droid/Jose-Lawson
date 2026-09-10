import React from 'react';
import { VerificationResult } from '../types';
import { Logo } from './Logo';
import { X, CheckCircle2, ShieldCheck, Printer, Download, Lock, Calendar, FileText, Hash } from 'lucide-react';

interface CertificateModalProps {
  result: VerificationResult;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ result, onClose }) => {
  const formattedDate = new Date(result.verifiedAt).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Attestation Officielle de Contrôle</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body (Printable) */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800" id="certificate-print-area">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <Logo size="sm" />
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Identifiant Unique</span>
              <span className="font-mono-code font-bold text-xs text-blue-700">{result.transactionId}</span>
            </div>
          </div>

          <div className="text-center py-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CERTIFICAT DE VÉRIFICATION CONFORME</span>
            </div>
            <h4 className="text-xl font-extrabold text-slate-900">
              Ticket {result.provider.name}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Délivré par le serveur CARD CHECK après interrogation des registres émetteurs.
            </p>
          </div>

          {/* Details Table */}
          <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs bg-slate-50/50">
            <div className="flex justify-between p-3">
              <span className="text-slate-500">Fournisseur officiel</span>
              <span className="font-semibold text-slate-800">{result.provider.name}</span>
            </div>
            <div className="flex justify-between p-3">
              <span className="text-slate-500">Statut du ticket</span>
              <span className="font-bold text-emerald-600 uppercase tracking-wide">{result.statusLabel}</span>
            </div>
            {result.amount !== undefined && (
              <div className="flex justify-between p-3 bg-emerald-50/50">
                <span className="font-medium text-emerald-900">Montant / Solde nominal</span>
                <span className="font-extrabold text-sm text-emerald-700">{result.amount.toFixed(2)} {result.currency || '€'}</span>
              </div>
            )}
            <div className="flex justify-between p-3">
              <span className="text-slate-500">Code ticket (Masqué sécurité)</span>
              <span className="font-mono-code font-bold text-slate-800">{result.maskedCode}</span>
            </div>
            <div className="flex justify-between p-3">
              <span className="text-slate-500">Horodatage de contrôle</span>
              <span className="font-medium text-slate-700">{formattedDate}</span>
            </div>
            <div className="flex justify-between p-3">
              <span className="text-slate-500">Sceau cryptographique</span>
              <span className="font-mono-code text-[11px] text-slate-500 truncate max-w-[200px]">{result.securitySeal}</span>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
            <strong>Mention légale :</strong> Cette attestation certifie l'état du coupon au moment précis du contrôle. Conservez ce reçu pour tout litige ou réclamation auprès du point de vente agréé.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            Fermer
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer l'attestation</span>
          </button>
        </div>
      </div>
    </div>
  );
};

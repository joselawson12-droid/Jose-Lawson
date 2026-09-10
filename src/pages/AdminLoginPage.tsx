import React, { useState } from 'react';
import { Lock, Mail, KeyRound, AlertCircle, Shield, CheckCircle2 } from 'lucide-react';
import { AdminUser } from '../types';
import { Logo } from '../components/Logo';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onNavigate: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Forgot Password modal
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setError(data.error || 'Identifiants administrateur incorrects');
        return;
      }

      onLoginSuccess({
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        token: data.token
      });

      onNavigate('/admin');
    } catch {
      setIsLoading(false);
      setError('Impossible de joindre le serveur d\'authentification. Veuillez vérifier votre connexion.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
    } catch {
      // Keep quiet for security
    } finally {
      setResetLoading(false);
      setResetSubmitted(true);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-200 text-[11px] font-bold tracking-wide uppercase border border-slate-700">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>Accès Réservé — Administration</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Portail Administrateur
        </h1>
        <p className="text-xs text-slate-500">
          Veuillez vous authentifier pour accéder à la console de gestion et aux passerelles.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">Identifiant e-mail</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@cardcheck-platform.com"
                className="w-full px-4 py-2.5 pl-10 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700">Mot de passe</label>
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  setResetSubmitted(false);
                  setResetEmail(email);
                }}
                className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Mot de passe oublié ?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 pl-10 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none font-mono"
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>{isLoading ? 'Authentification...' : 'Se connecter au tableau de bord'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            ← Retour au site public
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Récupération administrateur</h3>
                <p className="text-xs text-slate-500">Un lien sécurisé sera envoyé à l'administrateur.</p>
              </div>
            </div>

            {resetSubmitted ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Demande transmise avec succès</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Si cette adresse correspond à un compte administrateur actif, les instructions y ont été transmises.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Votre adresse e-mail d'administrateur</label>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@cardcheck-platform.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition cursor-pointer disabled:opacity-50"
                  >
                    {resetLoading ? 'Envoi...' : 'Envoyer'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

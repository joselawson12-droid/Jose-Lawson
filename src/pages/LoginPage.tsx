import React, { useState } from 'react';
import { Mail, AlertCircle, User, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/Logo';
import { useTranslation } from '../i18n';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [clientEmail, setClientEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [isClientRegister, setIsClientRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const endpoint = isClientRegister ? '/api/client/register' : '/api/client/login';
      const body = isClientRegister
        ? { email: clientEmail, name: clientName || clientEmail.split('@')[0] }
        : { email: clientEmail };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) {
        setError(data.error || t('login.errorGeneric', "Erreur lors de la connexion à l'espace client"));
        return;
      }

      if (data.client) {
        localStorage.setItem('cardcheck_client_user', JSON.stringify(data.client));
      }
      onNavigate('/client');
    } catch {
      setIsLoading(false);
      setError(t('login.errorNetwork', 'Erreur de communication avec le portail client.'));
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wide uppercase border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          <span>{t('login.secureBadge', 'Espace Client Sécurisé')}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          {isClientRegister ? t('login.createAccountTitle', 'Créer votre compte client') : t('login.loginTitle', 'Connexion Espace Client')}
        </h1>
        <p className="text-xs text-slate-500">
          {t('login.subtitle', "Consultez l'historique de vos contrôles, vos reçus de paiement et vos tickets de support.")}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-100">
        <form onSubmit={handleClientSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isClientRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">{t('login.fullNameLabel', 'Votre nom complet')}</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Jean Dupont"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">{t('login.emailLabel', 'Adresse e-mail')}</label>
            <div className="relative">
              <input
                type="email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@exemple.fr"
                className="w-full px-4 py-2.5 pl-10 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs pt-1">
            <button
              type="button"
              onClick={() => setIsClientRegister(!isClientRegister)}
              className="text-blue-600 hover:underline font-semibold cursor-pointer"
            >
              {isClientRegister ? t('login.alreadyHaveAccount', 'Déjà un compte ? Se connecter') : t('login.newClientCreate', 'Nouveau client ? Créer un compte')}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
          >
            <User className="w-4 h-4" />
            <span>
              {isLoading
                ? t('login.loadingBtn', 'Accès en cours...')
                : isClientRegister
                ? t('login.createAccountBtn', 'Créer mon compte client')
                : t('login.loginBtn', 'Accéder à mon Espace Client')}
            </span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="text-xs text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            ← {t('login.backToPublic', 'Retour au site public')}
          </button>
        </div>
      </div>
    </div>
  );
};

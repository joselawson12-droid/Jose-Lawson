import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Menu, X, Shield, Lock, ExternalLink, HelpCircle, PhoneCall, LayoutDashboard, User } from 'lucide-react';
import { useTranslation } from '../i18n';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isAdminLoggedIn?: boolean;
  onOpenActivationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  isAdminLoggedIn = false,
  onOpenActivationModal
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHeroView = currentPath === '/' && !isScrolled;

  const navItems = [
    { label: t('nav.home', 'Accueil'), path: '/' },
    { label: t('nav.activateMyCard', 'Activer ma carte'), path: '/tickets' },
    { label: t('nav.activateTicket', 'Activer un Ticket'), path: '#activate', isActivation: true },
    { label: t('nav.presentation', 'Présentation'), path: '/#presentation' },
    { label: t('nav.advantages', 'Avantages'), path: '/#avantages' },
    { label: t('nav.whyUs', 'Pourquoi nous choisir'), path: '/#pourquoi-nous-choisir' },
    { label: t('nav.firstSteps', 'Mes premiers pas'), path: '/#mes-premiers-pas' },
    { label: t('nav.testimonials', 'Avis internautes'), path: '/#avis-internautes' },
  ];

  const handleNavClick = (path: string) => {
    if (path === '#activate') {
      handleStartClick();
      return;
    }
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '');
      if (currentPath === '/') {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      }
    } else if (path === '/') {
      if (currentPath === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        onNavigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleStartClick = () => {
    if (onOpenActivationModal) {
      onOpenActivationModal();
    } else {
      onNavigate('/tickets');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isHeroView
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 shadow-sm text-white'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('/')}
              className="text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
            >
              <Logo size="md" variant={isHeroView ? 'light' : 'dark'} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    isHeroView
                      ? isActive
                        ? 'text-white bg-white/20 font-bold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-blue-700 bg-blue-50/80 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Selector in Navbar */}
            <LanguageSelector variant={isHeroView ? 'hero' : 'light'} />

            {/* If admin is already authenticated in this session, show admin badge */}
            {isAdminLoggedIn ? (
              <button
                type="button"
                onClick={() => handleNavClick('/admin')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isHeroView
                    ? 'border border-emerald-400/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                    : 'border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('nav.adminConsole', 'Console Admin')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNavClick('/client')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isHeroView
                    ? 'border border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <User className={`w-3.5 h-3.5 ${isHeroView ? 'text-slate-300' : 'text-slate-500'}`} />
                <span>{t('nav.clientSpace', 'Espace Client')}</span>
              </button>
            )}

            {/* Primary Action Button - Activer un Ticket */}
            <button
              id="menu-btn-activate-ticket"
              type="button"
              onClick={handleStartClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm shadow-blue-950/20 border border-blue-500 hover:border-blue-400 transition-all hover:shadow-md cursor-pointer active:scale-98"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5] text-blue-100" />
              <span>{t('nav.activateTicket', 'Activer un Ticket')}</span>
            </button>
          </div>

          {/* Mobile Hamburger Button & Language Selector */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageSelector variant={isHeroView ? 'hero' : 'light'} compact />

            <button
              type="button"
              onClick={handleStartClick}
              className="px-2.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 border border-blue-500 text-white text-2xs font-extrabold shadow-xs flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-100" />
              <span>{t('modal.btnActivate', 'Activer')}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-lg focus:outline-none transition ${
                isHeroView
                  ? 'text-white hover:bg-white/10'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Optimized for Android and Smartphones) */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1">
            <div className="pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('nav.language', 'Langue')}</span>
              <LanguageSelector variant="light" />
            </div>

            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                id="mobile-drawer-btn-activate-ticket"
                type="button"
                onClick={handleStartClick}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm tracking-wide shadow-sm active:scale-98"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>{t('nav.activateTicket', 'Activer un Ticket')}</span>
              </button>

              {isAdminLoggedIn ? (
                <button
                  type="button"
                  onClick={() => handleNavClick('/admin')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm font-semibold hover:bg-emerald-100"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                  <span>{t('nav.adminConsole', 'Console Admin')}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleNavClick('/client')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  <span>{t('nav.clientSpace', 'Espace Client')}</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

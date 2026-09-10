import React, { useState, useEffect } from 'react';
import { TicketProvider, AdminUser } from './types';
import { DEFAULT_PROVIDERS } from './data/providersData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { TicketsSelectionPage } from './pages/TicketsSelectionPage';
import { VerifyPage } from './pages/VerifyPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { PricingPage } from './pages/PricingPage';
import { RefundPage } from './pages/RefundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { PaymentPage } from './pages/PaymentPage';
import { ClientDashboardPage } from './pages/ClientDashboardPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminVerificationsPage } from './pages/AdminVerificationsPage';
import { AdminProvidersPage } from './pages/AdminProvidersPage';
import { AdminSupportPage } from './pages/AdminSupportPage';
import { AdminPaymentMethodsPage } from './pages/AdminPaymentMethodsPage';
import { ActivationTicketModal } from './components/ActivationTicketModal';
import { FloatingChatButton } from './components/FloatingChatButton';
import { LanguageProvider } from './i18n';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [providers, setProviders] = useState<TicketProvider[]>(DEFAULT_PROVIDERS);
  const [selectedCode] = useState<string>('');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('transcash');
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);

  // Admin user state persisted in localStorage
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('cardcheck_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Fetch live providers from backend
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch('/api/providers');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProviders(data);
          } else if (data && Array.isArray(data.providers) && data.providers.length > 0) {
            setProviders(data.providers);
          }
        }
      } catch (e) {
        console.warn('Fallback to local default providers', e);
      }
    };
    fetchProviders();
  }, []);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    try {
      localStorage.setItem('cardcheck_admin_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    navigate('/admin');
  };

  const handleLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('cardcheck_admin_user');
    } catch (e) {
      console.error(e);
    }
    navigate('/');
  };

  const handleUpdateProvider = async (providerId: string, isActive: boolean) => {
    // Optimistic UI update
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, isActive } : p))
    );

    try {
      await fetch(`/api/admin/providers/${providerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });
    } catch (err) {
      console.error('Failed to update provider', err);
    }
  };

  // Protected Admin Routes Guard: typing /admin displays the dedicated Admin Login portal
  const renderAdminRoute = (component: React.ReactNode) => {
    if (!adminUser) {
      return (
        <AdminLoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigate={navigate}
        />
      );
    }
    return component;
  };

  // Main Router View Switcher
  const renderView = () => {
    switch (currentPath) {
      case '/':
        return (
          <HomePage
            providers={providers.filter((p) => p.isActive)}
            initialCode={selectedCode}
            initialProviderId={selectedProviderId}
            onNavigate={navigate}
            onOpenActivationModal={() => setIsActivationModalOpen(true)}
          />
        );

      case '/tickets':
        return (
          <TicketsSelectionPage
            onSelectTicket={(providerId) => {
              setSelectedProviderId(providerId);
              setIsActivationModalOpen(true);
            }}
            onNavigate={navigate}
          />
        );

      case '/verify':
        return (
          <VerifyPage
            providers={providers.filter((p) => p.isActive)}
            initialCode={selectedCode}
            initialProviderId={selectedProviderId}
            onNavigate={navigate}
          />
        );

      case '/pricing':
        return <PricingPage onNavigate={navigate} />;

      case '/refund':
      case '/remboursement':
        return (
          <RefundPage
            onNavigate={navigate}
            onOpenActivationModal={() => setIsActivationModalOpen(true)}
          />
        );

      case '/privacy':
      case '/politique-de-confidentialite':
        return (
          <PrivacyPage
            onNavigate={navigate}
            onOpenActivationModal={() => setIsActivationModalOpen(true)}
          />
        );

      case '/payment':
        return <PaymentPage onNavigate={navigate} />;

      case '/client':
        return <ClientDashboardPage onNavigate={navigate} />;

      case '/how-it-works':
        return <HowItWorksPage onNavigate={navigate} />;

      case '/faq':
        return <FaqPage onNavigate={navigate} />;

      case '/contact':
        return <ContactPage />;

      case '/login':
        return (
          <LoginPage
            onNavigate={navigate}
          />
        );

      case '/admin':
        return renderAdminRoute(
          <AdminDashboard
            user={adminUser!}
            onLogout={handleLogout}
            onNavigate={navigate}
          />
        );

      case '/admin/verifications':
        return renderAdminRoute(
          <AdminVerificationsPage
            providers={providers}
            onNavigate={navigate}
          />
        );

      case '/admin/providers':
        return renderAdminRoute(
          <AdminProvidersPage
            providers={providers}
            onUpdateProvider={handleUpdateProvider}
            onNavigate={navigate}
          />
        );

      case '/admin/support':
      case '/admin/payments':
        return renderAdminRoute(
          <AdminSupportPage
            onNavigate={navigate}
          />
        );

      case '/admin/payment-methods':
        return renderAdminRoute(
          <AdminPaymentMethodsPage
            onNavigate={navigate}
          />
        );

      default:
        return (
          <HomePage
            providers={providers.filter((p) => p.isActive)}
            initialCode={selectedCode}
            initialProviderId={selectedProviderId}
            onNavigate={navigate}
            onOpenActivationModal={() => setIsActivationModalOpen(true)}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
        {/* 1. Main Navigation Header */}
        <Header
          currentPath={currentPath}
          onNavigate={navigate}
          isAdminLoggedIn={!!adminUser}
          onOpenActivationModal={() => setIsActivationModalOpen(true)}
        />

        {/* 2. Dynamic Page View */}
        <main className="flex-1 w-full">
          {renderView()}
        </main>

        {/* 3. Complete Footer */}
        <Footer
          onNavigate={navigate}
          onOpenActivationModal={() => setIsActivationModalOpen(true)}
        />

        {/* 4. Single Unified Ticket Activation Modal (used by Hero, Menu, and Ticket Selection) */}
        <ActivationTicketModal
          isOpen={isActivationModalOpen}
          onClose={() => {
            setIsActivationModalOpen(false);
            setSelectedProviderId('');
          }}
          providers={providers}
          initialCardType={selectedProviderId}
          onNavigate={navigate}
        />

        {/* 5. Floating Assistance Chat Widget */}
        <FloatingChatButton
          onOpenActivationModal={() => setIsActivationModalOpen(true)}
        />
      </div>
    </LanguageProvider>
  );
}

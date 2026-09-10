import React, { useState } from 'react';
import { TicketCatalogItem } from '../types';
import { getActiveTickets } from '../data/ticketsCatalog';
import { useTranslation } from '../i18n';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Tag,
  ArrowLeft,
  ArrowRight,
  Search,
  Sparkles,
  Lock,
  Zap,
  Filter
} from 'lucide-react';

interface TicketsSelectionPageProps {
  onSelectTicket: (providerId: string) => void;
  onNavigate: (path: string) => void;
}

export const TicketsSelectionPage: React.FC<TicketsSelectionPageProps> = ({
  onSelectTicket,
  onNavigate
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeTickets = getActiveTickets();

  const filteredTickets = activeTickets.filter((ticket) => {
    const matchesSearch =
      ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || ticket.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: t('ticketsPage.allTickets', 'Tous les tickets') },
    { id: 'payment_card', label: t('ticketsPage.catPaymentCard', 'Cartes bancaires') },
    { id: 'voucher', label: t('ticketsPage.catVoucher', 'Coupons & Vouchers') },
    { id: 'gift_card', label: t('ticketsPage.catGiftCard', 'Cartes Cadeaux') },
    { id: 'gaming', label: t('ticketsPage.catGaming', 'Jeux & Multimédia') }
  ];

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Top Bar with Return to Home & Security Status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition cursor-pointer active:scale-98"
        >
          <ArrowLeft className="w-4 h-4 text-slate-500" />
          <span>{t('ticketsPage.backHome', "Retour à l'accueil")}</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t('ticketsPage.officialBadge', 'Plateforme Officielle Sécurisée SSL 256-bit')}</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <CreditCard className="w-3.5 h-3.5" />
          <span>{t('ticketsPage.categoryBadge', 'Activate My Card')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          {t('ticketsPage.title', 'Sélectionnez votre type de carte')}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t('ticketsPage.subtitle', 'Sélectionnez le type de ticket ou de coupon que vous souhaitez activer.')}
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('ticketsPage.searchPlaceholder', 'Rechercher un type de ticket (ex: TRANSCASH, PCS, NEOSURF...)')}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tickets Cards Grid */}
      {filteredTickets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto p-8 space-y-3">
          <Filter className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">{t('ticketsPage.noTicketsFound', 'Aucun ticket trouvé')}</h3>
          <p className="text-sm text-slate-500">
            {t('ticketsPage.noTicketsMatch', 'Aucun ticket ne correspond à vos critères de recherche.')}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            {t('ticketsPage.resetFilters', 'Réinitialiser les filtres')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-blue-300"
            >
              {/* Card Header & Badges */}
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs font-black text-base shrink-0 ${
                        ticket.badgeColor || 'bg-blue-600'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors uppercase">
                        {ticket.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{t('ticketsPage.certifiedTicket', 'Ticket officiel certifié')}</span>
                      </div>
                    </div>
                  </div>

                  {ticket.popular && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-2xs font-extrabold uppercase tracking-wide shrink-0">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{t('ticketsPage.popular', 'Populaire')}</span>
                    </span>
                  )}
                </div>

                {/* Description (sans aucun montant ni validité) */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[2.75rem]">
                  {ticket.description}
                </p>

                {/* Advantages list */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <span className="text-2xs font-bold uppercase tracking-wider text-slate-400">
                    {t('ticketsPage.guarantees', 'Garanties & conformité :')}
                  </span>
                  <ul className="space-y-1.5">
                    {ticket.advantages.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer with Action Button */}
              <div className="p-6 sm:p-7 pt-0">
                <button
                  id={`btn-select-ticket-${ticket.providerId}`}
                  type="button"
                  onClick={() => onSelectTicket(ticket.providerId)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98 min-h-[48px]"
                >
                  <span>{t('ticketsPage.btnActivateNow', 'Activer')} {ticket.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Reassurance Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>{t('ticketsPage.maxSecurity', 'Sécurité & Confidentialité Maximale')}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black">
            {t('ticketsPage.missingBrandTitle', "Votre marque de ticket n'apparaît pas dans la liste ?")}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {t('ticketsPage.missingBrandDesc', 'Notre système est compatible avec tous les formats de tickets prépayés certifiés en Europe. Vous pouvez également saisir directement votre code dans le portail d\'activation universel.')}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectTicket('transcash')}
          className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-sm transition whitespace-nowrap cursor-pointer shrink-0 active:scale-98"
        >
          {t('ticketsPage.universalActivation', 'Activation universelle')}
        </button>
      </div>
    </div>
  );
};

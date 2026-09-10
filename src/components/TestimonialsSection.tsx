import React, { useState } from 'react';
import { Star, CheckCircle2, ShieldCheck, MessageSquareQuote, ChevronRight } from 'lucide-react';
import { TESTIMONIALS_DATA, TESTIMONIALS_METRICS, Testimonial } from '../data/testimonialsData';
import { useTranslation } from '../i18n';

interface TestimonialsSectionProps {
  onNavigate?: (path: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredTestimonials = TESTIMONIALS_DATA.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.ticketType?.toLowerCase().includes(filterCategory.toLowerCase());
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>{t('testimonials.badge', 'Avis & Retours Clients')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {t('testimonials.title', 'Ce que nos utilisateurs disent')}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t('testimonials.subtitle', "Découvrez les avis de particuliers, buralistes partenaires et e-commerçants qui vérifient l'authenticité de leurs tickets en toute sérénité.")}
        </p>

        {/* Global Rating Banner */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="font-extrabold text-slate-900">{TESTIMONIALS_METRICS.averageRating}</span>
            <span className="text-slate-400">({TESTIMONIALS_METRICS.totalReviews} avis)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{TESTIMONIALS_METRICS.satisfactionRate} {t('testimonials.satisfactionRate', 'de satisfaction')}</span>
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-normal">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{t('testimonials.representativeSamples', 'Exemples de témoignages représentatifs')}</span>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((testimonial: Testimonial) => {
          const hasImage = testimonial.avatarUrl && !imgErrors[testimonial.id];

          return (
            <div
              key={testimonial.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative"
            >
              <div className="space-y-4">
                {/* Header: User Info & Rating */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* User Avatar with Fallback */}
                    <div className="relative shrink-0">
                      {hasImage ? (
                        <img
                          src={testimonial.avatarUrl}
                          alt={testimonial.name}
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(testimonial.id)}
                          className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-2xs"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-2xs">
                          {testimonial.initials}
                        </div>
                      )}
                      <div
                        className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white text-blue-600 shadow-xs"
                        title="Profil vérifié"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 fill-blue-50" />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-blue-700 transition-colors">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {t(`testimonials.items.${testimonial.id}.role`, testimonial.role)}
                      </p>
                    </div>
                  </div>

                  {/* Dev / Sample Tag */}
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {t('testimonials.exampleBadge', 'Exemple')}
                  </span>
                </div>

                {/* Star Rating & Ticket Type Tag */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 stroke-amber-400"
                      />
                    ))}
                  </div>

                  {testimonial.ticketType && (
                    <span className="text-[11px] font-bold text-blue-800 bg-blue-50/80 px-2.5 py-0.5 rounded-full border border-blue-100/80 truncate">
                      {testimonial.ticketType}
                    </span>
                  )}
                </div>

                {/* Comment Body */}
                <div className="space-y-1.5 pt-1">
                  <h4 className="text-sm font-bold text-slate-800 leading-snug">
                    « {t(`testimonials.items.${testimonial.id}.title`, testimonial.title)} »
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {t(`testimonials.items.${testimonial.id}.comment`, testimonial.comment)}
                  </p>
                </div>
              </div>

              {/* Card Footer: Verified Badge & Date */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('testimonials.verifiedBuyer', 'Avis vérifié')}</span>
                </div>
                <span>{t(`testimonials.items.${testimonial.id}.date`, testimonial.date)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box at Bottom of Testimonials */}
      <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold">
            {t('testimonials.ctaTitle', 'Vous avez un ticket à contrôler ?')}
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
            {t('testimonials.ctaSubtitle', "Effectuez dès maintenant un contrôle d'authenticité et de solde sécurisé en moins de 2 secondes.")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onNavigate) {
              onNavigate('/verify');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-slate-900 font-bold text-xs sm:text-sm shadow-md transition cursor-pointer flex items-center gap-2 whitespace-nowrap active:scale-98"
        >
          <span>{t('testimonials.ctaBtn', 'Vérifier mon ticket maintenant')}</span>
          <ChevronRight className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    </section>
  );
};

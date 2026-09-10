import React from 'react';
import { ShieldCheck, Users, AlertOctagon, Sparkles, CheckCircle2, ArrowRight, Shield, Lock, FileCheck } from 'lucide-react';
import { useTranslation } from '../i18n';

interface PresentationSectionProps {
  onStartClick: () => void;
}

export const PresentationSection: React.FC<PresentationSectionProps> = ({ onStartClick }) => {
  const { t } = useTranslation();

  return (
    <section id="presentation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-20">
      {/* Section Tag & Main Title */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t('presentation.badge', 'Présentation du Service')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {t('presentation.title', "La solution de référence pour l'authentification de vos recharges")}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          {t('presentation.subtitle', "CARD CHECK est une infrastructure numérique indépendante conçue pour certifier, contrôler la validité et sécuriser l'utilisation de vos tickets prépayés en temps réel.")}
        </p>
      </div>

      {/* Grid: 4 Core Pillars of the Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Pillar 1: Ce qu'est le service */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/80">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {t('presentation.whatIsTitle', "Qu'est-ce que CARD CHECK ?")}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('presentation.whatIsDesc', "Il s'agit d'un portail neutre et sécurisé qui interroge les protocoles d'émission des principaux fournisseurs de cartes prépayées (Transcash, PCS, Neosurf, Paysafecard, Toneo, etc.). Il permet de vérifier si un coupon est authentique, s'il a déjà été débité ou s'il est prêt pour une transaction, sans exposer vos fonds.")}
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t('presentation.encryptedCheck', 'Interrogation chiffrée sans transfert de propriété')}</span>
          </div>
        </div>

        {/* Pillar 2: À qui s'adresse le service */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/80">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {t('presentation.whoIsItForTitle', "À qui s'adresse notre plateforme ?")}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('presentation.whoIsItForDesc', "Aux particuliers souhaitant s'assurer de l'intégrité d'une recharge avant un achat en ligne, aux bénéficiaires de bons cadeaux, ainsi qu'aux commerçants et buralistes partenaires désireux d'offrir à leurs clients un outil d'accompagnement clair et fiable.")}
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-indigo-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t('presentation.accessibleAll', 'Accessible librement à tous, sur smartphone ou ordinateur')}</span>
          </div>
        </div>

        {/* Pillar 3: Le problème résolu */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100/80">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {t('presentation.problemSolvedTitle', 'Le problème que nous résolvons')}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('presentation.problemSolvedDesc', "La prolifération des faux coupons, des codes falsifiés ou déjà consommés vendus lors d'échanges d'occasion. Trop d'utilisateurs découvrent que leur recharge est invalide au moment de l'utiliser. Notre système supprime toute incertitude avant que l'argent ne soit perdu.")}
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-rose-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t('presentation.fraudProtection', 'Protection active contre la fraude et les codes obsolètes')}</span>
          </div>
        </div>

        {/* Pillar 4: Pourquoi il est indispensable */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/80">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {t('presentation.indispensableTitle', 'Pourquoi est-il indispensable ?')}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('presentation.indispensableDesc', "Vous obtenez un certificat de contrôle horodaté officiel avec un identifiant de transaction inviolable. Ce certificat prouve la validité du ticket au moment du contrôle et sert de justificatif formel en cas de litige avec un vendeur ou un acheteur.")}
            </p>
          </div>
          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{t('presentation.digitalAttestation', "Attestation d'authenticité numérique immédiate")}</span>
          </div>
        </div>
      </div>

      {/* Interactive reassurance card */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>{t('presentation.bannerBadge', 'Garantie de non-divulgation')}</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold">
            {t('presentation.bannerTitle', "Votre code n'est jamais stocké en clair sur nos serveurs")}
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            {t('presentation.bannerDesc', 'Toutes les communications transitent via un canal chiffré SSL TLS 1.3 avec hachage SHA-256 conformément aux directives européennes PCI-DSS.')}
          </p>
        </div>

        <button
          type="button"
          onClick={onStartClick}
          className="px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-blue-600 font-bold text-xs sm:text-sm shadow-md border border-blue-200 transition cursor-pointer flex items-center gap-2 shrink-0 active:scale-98"
        >
          <span>{t('presentation.bannerBtn', 'Faire un test maintenant')}</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    </section>
  );
};

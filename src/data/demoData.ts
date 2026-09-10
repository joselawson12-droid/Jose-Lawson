import { TicketProvider, DemoCodeInfo, DailyStat, ProviderStat } from '../types';

export const DEFAULT_PROVIDERS: TicketProvider[] = [
  {
    id: 'transcash',
    name: 'Transcash',
    category: 'payment_card',
    codeFormat: '12 chiffres',
    codeLength: [12],
    codePattern: '^[0-9]{12}$',
    placeholder: '1234 5678 9012',
    badgeColor: 'bg-emerald-600',
    currency: 'EUR',
    supportedAmounts: [20, 50, 100, 150, 250, 500],
    isActive: true,
    description: 'Recharge pour carte prépayée Transcash Mastercard.',
    helpTip: 'Le code de recharge se compose de 12 chiffres imprimés sur votre ticket de caisse.'
  },
  {
    id: 'pcs',
    name: 'PCS Mastercard',
    category: 'payment_card',
    codeFormat: '10 à 12 caractères',
    codeLength: [10, 12],
    placeholder: 'ABCD 1234 EF',
    badgeColor: 'bg-blue-600',
    currency: 'EUR',
    supportedAmounts: [20, 50, 100, 150, 200, 250],
    isActive: true,
    description: 'Recharge coupon pour cartes PCS Black, Chrome, Infinity et Metal.',
    helpTip: 'Coupon disponible en bureau de tabac ou en ligne avec code PIN de 10 à 12 caractères.'
  },
  {
    id: 'cashlib',
    name: 'CASHlib',
    category: 'voucher',
    codeFormat: '16 chiffres',
    codeLength: [16],
    codePattern: '^[0-9]{16}$',
    placeholder: '1234 5678 9012 3456',
    badgeColor: 'bg-teal-600',
    currency: 'EUR',
    supportedAmounts: [10, 20, 50, 100, 250],
    isActive: true,
    description: 'Voucher et coupon de paiement en ligne sécurisé CASHlib à 16 chiffres.',
    helpTip: 'Le code PIN CASHlib à 16 chiffres figure au centre de votre ticket de caisse buraliste ou coupon électronique.'
  },
  {
    id: 'neosurf',
    name: 'Neosurf',
    category: 'voucher',
    codeFormat: '10 caractères alphanumériques',
    codeLength: [10],
    placeholder: 'NEO1 2345 67',
    badgeColor: 'bg-amber-500',
    currency: 'EUR',
    supportedAmounts: [10, 15, 30, 50, 100],
    isActive: true,
    description: 'Ticket de paiement sécurisé pour achats en ligne et recharges.',
    helpTip: 'Code PIN à 10 caractères majuscules/chiffres figurant sous la zone à gratter.'
  },
  {
    id: 'paysafecard',
    name: 'Paysafecard',
    category: 'voucher',
    codeFormat: '16 chiffres',
    codeLength: [16],
    placeholder: '0123 4567 8901 2345',
    badgeColor: 'bg-sky-600',
    currency: 'EUR',
    supportedAmounts: [10, 25, 50, 100],
    isActive: true,
    description: 'Moyen de paiement prépayé en ligne basé sur un code PIN 16 chiffres.',
    helpTip: 'Code PIN personnel à 16 chiffres situé au centre du reçu Paysafecard.'
  },
  {
    id: 'toneo',
    name: 'Toneo First',
    category: 'payment_card',
    codeFormat: '12 chiffres',
    codeLength: [12],
    placeholder: '9876 5432 1098',
    badgeColor: 'bg-purple-600',
    currency: 'EUR',
    supportedAmounts: [10, 20, 50, 100, 200],
    isActive: true,
    description: 'Ticket de recharge pour carte bancaire Toneo First Mastercard.',
    helpTip: 'Code à 12 chiffres situé sous l\'intitulé « Code de recharge ».'
  },
  {
    id: 'flexepin',
    name: 'Flexepin',
    category: 'voucher',
    codeFormat: '16 chiffres',
    codeLength: [16],
    codePattern: '^[0-9]{16}$',
    placeholder: '5678 9012 3456 7890',
    badgeColor: 'bg-indigo-600',
    currency: 'EUR',
    supportedAmounts: [20, 50, 100, 150, 250, 500],
    isActive: true,
    description: 'Coupon de paiement en espèces prépayé Flexepin Cash Top-Up Voucher.',
    helpTip: 'Code PIN unique à 16 chiffres imprimé sur le reçu Flexepin remis par votre commerçant.'
  },
  {
    id: 'vanilla',
    name: 'Vanilla Prepaid',
    category: 'payment_card',
    codeFormat: '16 chiffres',
    codeLength: [16],
    placeholder: '4000 1234 5678 9010',
    badgeColor: 'bg-amber-600',
    currency: 'EUR',
    supportedAmounts: [25, 50, 100, 150, 200],
    isActive: true,
    description: 'Carte prépayée et e-voucher Vanilla Mastercard.',
    helpTip: 'Code de coupon à 16 chiffres imprimé sur le ticket ou reçu d\'activation.'
  },
  {
    id: 'steam',
    name: 'Steam Wallet',
    category: 'gift_card',
    codeFormat: '15 caractères (3x5)',
    codeLength: [15],
    placeholder: 'ABC12-DEF34-GHI56',
    badgeColor: 'bg-slate-800',
    currency: 'EUR',
    supportedAmounts: [10, 20, 50, 100],
    isActive: true,
    description: 'Ticket de recharge portefeuille Steam pour crédits et jeux PC Valve.',
    helpTip: 'Code d\'activation à 15 caractères alphanumériques (format 3x5) au verso de la carte ou sur ticket.'
  },
  {
    id: 'googleplay',
    name: 'Google Play',
    category: 'gift_card',
    codeFormat: '16 caractères',
    codeLength: [16],
    placeholder: 'ABCD-1234-EFGH-5678',
    badgeColor: 'bg-teal-700',
    currency: 'EUR',
    supportedAmounts: [15, 25, 50, 100],
    isActive: true,
    description: 'Carte cadeau et ticket de recharge Google Play Store pour applications et jeux Android.',
    helpTip: 'Code d\'activation à 16 caractères sous la zone à gratter ou sur reçu de caisse.'
  },
  {
    id: 'applegift',
    name: 'Apple Gift Card',
    category: 'gift_card',
    codeFormat: '16 caractères',
    codeLength: [16],
    placeholder: 'X123-4567-8901-ABCD',
    badgeColor: 'bg-neutral-800',
    currency: 'EUR',
    supportedAmounts: [15, 25, 50, 100, 150],
    isActive: true,
    description: 'Ticket et carte cadeau universelle Apple pour l\'App Store, abonnements et produits.',
    helpTip: 'Code à 16 caractères commençant généralement par un X, inscrit au verso ou sur le reçu.'
  },
  {
    id: 'playstation',
    name: 'PlayStation Network (PSN)',
    category: 'gift_card',
    codeFormat: '12 caractères (3x4)',
    codeLength: [12],
    placeholder: 'ABCD-1234-EFGH',
    badgeColor: 'bg-blue-700',
    currency: 'EUR',
    supportedAmounts: [10, 20, 50, 75, 100],
    isActive: true,
    description: 'Ticket et bon d\'achat PlayStation Network pour créditer un compte PS5 / PS4.',
    helpTip: 'Code de bon d\'achat à 12 caractères (3 blocs de 4) imprimé sur votre reçu de caisse.'
  },
  {
    id: 'xbox',
    name: 'Xbox & Microsoft',
    category: 'gift_card',
    codeFormat: '25 caractères (5x5)',
    codeLength: [25],
    placeholder: 'ABCDE-12345-FGHIJ-67890-KLMNO',
    badgeColor: 'bg-green-700',
    currency: 'EUR',
    supportedAmounts: [10, 25, 50, 75, 100],
    isActive: true,
    description: 'Ticket de recharge Microsoft et pass de jeu Xbox pour contenus numériques et Game Pass.',
    helpTip: 'Code de 25 caractères alphanumériques divisé en 5 blocs de 5 caractères.'
  },
  {
    id: 'razer',
    name: 'Razer Gold',
    category: 'gift_card',
    codeFormat: '14 à 16 caractères',
    codeLength: [14, 16],
    placeholder: 'RG-1234-5678-9012',
    badgeColor: 'bg-yellow-600',
    currency: 'EUR',
    supportedAmounts: [10, 20, 50, 100],
    isActive: true,
    description: 'Crédits virtuels et tickets de recharge Razer Gold pour jeux vidéo et micro-paiements.',
    helpTip: 'Code PIN à 14 ou 16 caractères imprimé sur le ticket remis par votre commerçant.'
  },
  {
    id: 'amazon',
    name: 'Amazon Gift Card',
    category: 'gift_card',
    codeFormat: '14 à 15 caractères alphanumériques',
    codeLength: [14, 15],
    placeholder: 'AS28-89JK4L-90PW',
    badgeColor: 'bg-orange-500',
    currency: 'EUR',
    supportedAmounts: [15, 25, 50, 100, 150],
    isActive: true,
    description: 'Chèque-cadeau et carte de recharge Amazon.',
    helpTip: 'Code d\'activation au verso de la carte ou sur le ticket de caisse.'
  }
];

export const DEMO_CODES: DemoCodeInfo[] = [
  {
    code: 'DEMO-VALID-50',
    providerId: 'transcash',
    expectedStatus: 'valid',
    amount: 50,
    label: 'Valide Transcash (50 €)',
    description: 'Ticket Transcash actif et non encore consommé'
  },
  {
    code: 'DEMO-VALID-100',
    providerId: 'pcs',
    expectedStatus: 'valid',
    amount: 100,
    label: 'Valide PCS (100 €)',
    description: 'Coupon PCS Mastercard 100 € vérifié avec succès'
  },
  {
    code: 'DEMO-VALID-250',
    providerId: 'cashlib',
    expectedStatus: 'valid',
    amount: 250,
    label: 'Valide CASHlib (250 €)',
    description: 'Ticket CASHlib 250 € vérifié et certifié avec solde intact'
  },
  {
    code: 'DEMO-VALID-50',
    providerId: 'neosurf',
    expectedStatus: 'valid',
    amount: 50,
    label: 'Valide Neosurf (50 €)',
    description: 'Coupon Neosurf 50 € vérifié'
  },
  {
    code: 'DEMO-VALID-100',
    providerId: 'flexepin',
    expectedStatus: 'valid',
    amount: 100,
    label: 'Valide Flexepin (100 €)',
    description: 'Voucher Flexepin 100 € actif et conforme'
  },
  {
    code: 'DEMO-VALID-50',
    providerId: 'steam',
    expectedStatus: 'valid',
    amount: 50,
    label: 'Valide Steam (50 €)',
    description: 'Code Steam Wallet 50 € vérifié'
  },
  {
    code: 'DEMO-USED',
    providerId: 'paysafecard',
    expectedStatus: 'already_used',
    amount: 50,
    label: 'Déjà utilisé',
    description: 'Ticket déjà activé et débité'
  },
  {
    code: 'DEMO-EXPIRED',
    providerId: 'toneo',
    expectedStatus: 'expired',
    amount: 20,
    label: 'Expiré',
    description: 'Ticket dont la date limite de validité est dépassée'
  },
  {
    code: 'DEMO-INVALID',
    providerId: 'transcash',
    expectedStatus: 'invalid',
    label: 'Invalide',
    description: 'Code inexistant ou corrompu dans le registre'
  },
  {
    code: 'DEMO-ERROR',
    providerId: 'transcash',
    expectedStatus: 'impossible',
    label: 'Impossible',
    description: 'Passerelle fournisseur momentanément indisponible'
  }
];

export const INITIAL_DAILY_STATS: DailyStat[] = [
  { date: '2026-08-29', label: '29 Août', valid: 48, invalid: 6, used: 8, expired: 2, total: 64 },
  { date: '2026-08-30', label: '30 Août', valid: 52, invalid: 9, used: 11, expired: 3, total: 75 },
  { date: '2026-08-31', label: '31 Août', valid: 61, invalid: 8, used: 14, expired: 4, total: 87 },
  { date: '2026-09-01', label: '01 Sept', valid: 74, invalid: 12, used: 16, expired: 5, total: 107 },
  { date: '2026-09-02', label: '02 Sept', valid: 83, invalid: 11, used: 18, expired: 3, total: 115 },
  { date: '2026-09-03', label: '03 Sept', valid: 92, invalid: 14, used: 21, expired: 6, total: 133 },
  { date: '2026-09-04', label: 'Aujourd\'hui', valid: 68, invalid: 9, used: 12, expired: 3, total: 92 }
];

export const INITIAL_PROVIDER_STATS: ProviderStat[] = [
  { providerId: 'transcash', providerName: 'Transcash', total: 245, valid: 198, percentage: 80.8 },
  { providerId: 'pcs', providerName: 'PCS Mastercard', total: 189, valid: 151, percentage: 79.8 },
  { providerId: 'cashlib', providerName: 'CASHlib', total: 164, valid: 138, percentage: 84.1 },
  { providerId: 'neosurf', providerName: 'Neosurf', total: 132, valid: 108, percentage: 81.8 },
  { providerId: 'paysafecard', providerName: 'Paysafecard', total: 114, valid: 89, percentage: 78.0 },
  { providerId: 'flexepin', providerName: 'Flexepin', total: 88, valid: 72, percentage: 81.8 },
  { providerId: 'toneo', providerName: 'Toneo First', total: 72, valid: 55, percentage: 76.3 },
  { providerId: 'steam', providerName: 'Steam Wallet', total: 68, valid: 57, percentage: 83.8 },
  { providerId: 'amazon', providerName: 'Amazon', total: 58, valid: 49, percentage: 84.4 },
  { providerId: 'googleplay', providerName: 'Google Play', total: 54, valid: 46, percentage: 85.1 },
  { providerId: 'applegift', providerName: 'Apple Gift Card', total: 51, valid: 44, percentage: 86.2 },
  { providerId: 'playstation', providerName: 'PlayStation Network', total: 49, valid: 41, percentage: 83.6 },
  { providerId: 'xbox', providerName: 'Xbox & Microsoft', total: 45, valid: 38, percentage: 84.4 },
  { providerId: 'vanilla', providerName: 'Vanilla Prepaid', total: 38, valid: 31, percentage: 81.5 },
  { providerId: 'razer', providerName: 'Razer Gold', total: 32, valid: 27, percentage: 84.3 }
];

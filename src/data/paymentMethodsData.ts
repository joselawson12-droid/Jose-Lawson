import { PaymentMethodItem } from '../types';

export const INITIAL_PAYMENT_METHODS: PaymentMethodItem[] = [
  // ==========================================
  // 1. CARTES BANCAIRES
  // ==========================================
  {
    id: 'visa',
    name: 'Visa',
    category: 'cards',
    description: 'Cartes de débit et crédit internationales certifiées Verified by Visa.',
    logoType: 'visa',
    badge: '3D-Secure 2.2',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CHF', 'CAD'],
    features: ['Tokenisation sécurisée', 'Débit immédiat ou différé', 'Plafond vérifié']
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    category: 'cards',
    description: 'Cartes mondiales avec protection Mastercard Identity Check intégrée.',
    logoType: 'mastercard',
    badge: 'Identity Check',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CHF', 'CAD'],
    features: ['Biométrie bancaire', 'Chiffrement de bout en bout', 'Zéro responsabilité']
  },
  {
    id: 'cb',
    name: 'CB / Cartes Bancaires',
    category: 'cards',
    description: 'Réseau interbancaire national français historique et sécurisé.',
    logoType: 'cb',
    badge: 'Réseau Français',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR'],
    features: ['Réseau national CB', 'Agrément Banque de France', 'Contrôle instantané']
  },
  {
    id: 'amex',
    name: 'American Express',
    category: 'cards',
    description: 'Cartes haut de gamme et d\'affaires avec service Safekey actif.',
    logoType: 'amex',
    badge: 'Safekey 2.0',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Protection des achats', 'Safekey OTP', 'Transactions internationales']
  },
  {
    id: 'discover',
    name: 'Discover',
    category: 'cards',
    description: 'Réseau international de cartes de crédit et de fidélité.',
    logoType: 'discover',
    badge: 'ProtectBuy',
    isActive: true,
    isAvailable: false,
    unavailabilityReason: 'Non activé sur le contrat monétique passerelle actuel',
    supportedCurrencies: ['USD'],
    features: ['Réseau Discover Global Network']
  },
  {
    id: 'unionpay',
    name: 'UnionPay',
    category: 'cards',
    description: 'Premier réseau de cartes bancaires en Asie et à l\'international.',
    logoType: 'unionpay',
    badge: 'UPOP Secure',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'CNY', 'USD'],
    features: ['Réseau asiatique', 'Multi-devises', 'Authentification par SMS/App']
  },
  {
    id: 'jcb',
    name: 'JCB',
    category: 'cards',
    description: 'Réseau majeur de paiement japonais avec J/Secure.',
    logoType: 'jcb',
    badge: 'J/Secure',
    isActive: true,
    isAvailable: false,
    unavailabilityReason: 'Agrément en cours de traitement auprès du prestataire',
    supportedCurrencies: ['JPY', 'EUR', 'USD'],
    features: ['J/Secure 2.0', 'Acceptation globale']
  },
  {
    id: 'diners',
    name: 'Diners Club',
    category: 'cards',
    description: 'Cartes de voyage et de dépenses internationales.',
    logoType: 'diners',
    badge: 'International',
    isActive: true,
    isAvailable: false,
    unavailabilityReason: 'Nécessite une extension de contrat transfrontalier',
    supportedCurrencies: ['EUR', 'USD'],
    features: ['Diners Club International Network']
  },
  {
    id: 'maestro',
    name: 'Maestro',
    category: 'cards',
    description: 'Cartes de débit européennes avec autorisation systématique.',
    logoType: 'maestro',
    badge: 'Débit direct',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'GBP'],
    features: ['Autorisation en direct', 'Débit immédiat', 'Validation code sécurisé']
  },
  {
    id: 'rupay',
    name: 'RuPay',
    category: 'cards',
    description: 'Réseau de cartes bancaires et de paiement numérique d\'Inde.',
    logoType: 'rupay',
    badge: 'NPCI Inde',
    isActive: true,
    isAvailable: false,
    unavailabilityReason: 'Uniquement disponible pour les comptes bancaires émis en Inde (INR)',
    supportedCurrencies: ['INR'],
    features: ['Réseau NPCI', 'Validation OTP RuPay PaySecure']
  },

  // ==========================================
  // 2. PORTEFEUILLES ET PAIEMENTS NUMÉRIQUES
  // ==========================================
  {
    id: 'google-pay',
    name: 'Google Pay',
    category: 'wallets',
    description: 'Paiement sans contact et en 1-clic ultra-sécurisé par Google.',
    logoType: 'google-pay',
    badge: '1-Clic Sécurisé',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CHF'],
    features: ['Tokenisation cryptée', 'Biométrie Android/Chrome', 'Aucun numéro partagé']
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    category: 'wallets',
    description: 'Règlement instantané avec Touch ID ou Face ID sur iPhone et Mac.',
    logoType: 'apple-pay',
    badge: 'Face ID / Touch ID',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CHF'],
    features: ['Secure Element dédié', 'Confirmation biométrique', 'Confidentialité totale']
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'wallets',
    description: 'Paiement par compte PayPal avec Protection des Achats intégrée.',
    logoType: 'paypal',
    badge: 'Protection Achats',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CHF', 'CAD'],
    features: ['Compte ou carte liée', 'Paiement en 4X sans frais', 'Remboursement garanti']
  },
  {
    id: 'samsung-pay',
    name: 'Samsung Pay',
    category: 'wallets',
    description: 'Portefeuille numérique pour téléphones et montres connectées Samsung.',
    logoType: 'samsung-pay',
    badge: 'Samsung Knox',
    isActive: true,
    isAvailable: false,
    unavailabilityReason: 'Module SDK passerelle en cours d\'intégration technique',
    supportedCurrencies: ['EUR', 'USD'],
    features: ['Chiffrement Knox matériel', 'Biométrie d\'empreinte']
  },
  {
    id: 'skrill',
    name: 'Skrill',
    category: 'wallets',
    description: 'Portefeuille électronique international pour transferts rapides.',
    logoType: 'skrill',
    badge: 'E-Wallet',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Solde Skrill', 'Cartes Skrill Prepaid', 'Recharge instantanée']
  },
  {
    id: 'neteller',
    name: 'Neteller',
    category: 'wallets',
    description: 'Compte de monnaie électronique pour paiements digitaux sécurisés.',
    logoType: 'neteller',
    badge: 'E-Money',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Portefeuille numérique', 'Programme VIP', 'Double authentification 2FA']
  },

  // ==========================================
  // 3. CARTES CADEAUX / CRÉDITS PRÉPAYÉS & TICKETS
  // ==========================================
  {
    id: 'cashlib',
    name: 'CASHlib',
    category: 'prepaid',
    description: 'Voucher et coupon prépayé à code PIN 16 chiffres utilisable en ligne.',
    logoType: 'cashlib',
    badge: 'Code PIN 16 chiffres',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'GBP'],
    features: ['Sans carte bancaire', 'Coupures de 10€ à 250€', 'Achat en tabac & en ligne']
  },
  {
    id: 'transcash-ticket',
    name: 'Transcash Recharge',
    category: 'prepaid',
    description: 'Recharges et tickets de paiement pour cartes Transcash Mastercard.',
    logoType: 'transcash',
    badge: 'Recharge 12 chiffres',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR'],
    features: ['Code de recharge officiel', 'Réseau buralistes français', 'Solde immédiat']
  },
  {
    id: 'pcs-ticket',
    name: 'PCS Mastercard Ticket',
    category: 'prepaid',
    description: 'Coupons de recharge pour cartes PCS Black, Chrome et Infinity.',
    logoType: 'pcs',
    badge: 'Coupon 10-12 caractères',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR'],
    features: ['Recharge buraliste', 'Activation immédiate', 'Valable sur gamme PCS']
  },
  {
    id: 'paysafecard',
    name: 'Paysafecard',
    category: 'prepaid',
    description: 'Ticket prépayé à code PIN 16 chiffres disponible en bureau de tabac.',
    logoType: 'paysafecard',
    badge: 'Code PIN 16 chiffres',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'CHF', 'GBP'],
    features: ['Aucun compte bancaire requis', 'Montants fixes (10€ à 100€)', 'Anonymat préservé']
  },
  {
    id: 'neosurf',
    name: 'Neosurf',
    category: 'prepaid',
    description: 'Coupon de paiement en ligne sécurisé à 10 caractères alphanumériques.',
    logoType: 'neosurf',
    badge: 'Ticket 10 caractères',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CAD'],
    features: ['Paiement direct par code', 'Contrôle de solde en temps réel', 'Sans inscription']
  },
  {
    id: 'flexepin',
    name: 'Flexepin',
    category: 'prepaid',
    description: 'Coupon de paiement en espèces prépayé Flexepin Cash Top-Up Voucher.',
    logoType: 'flexepin',
    badge: 'PIN 16 chiffres',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'GBP', 'CAD', 'AUD'],
    features: ['Espèces vers digital', 'Coupures 20€ à 500€', 'Partenaires internationaux']
  },
  {
    id: 'steam',
    name: 'Steam Wallet / Carte Cadeau',
    category: 'prepaid',
    description: 'Code de recharge pour compte Valve Steam et plateforme de jeux vidéo.',
    logoType: 'steam',
    badge: 'Crédit Gaming',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Codes 15 chiffres alphanumériques', 'Solde de portefeuille', 'Usage non bancaire']
  },
  {
    id: 'apple-gift-card',
    name: 'Apple Gift Card',
    category: 'prepaid',
    description: 'Carte cadeau pour l\'App Store, services Apple et produits de la marque.',
    logoType: 'apple-gift-card',
    badge: 'Code 16 caractères',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CAD'],
    features: ['Crédit de compte Apple ID', 'Services et abonnements', 'Usage prépayé']
  },
  {
    id: 'google-play',
    name: 'Google Play',
    category: 'prepaid',
    description: 'Cartes de crédit prépayées pour le store officiel Android et apps.',
    logoType: 'google-play',
    badge: 'Code Play Store',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Solde Google Play', 'Applications et jeux', 'Usage prépayé']
  },
  {
    id: 'playstation',
    name: 'PlayStation Network (PSN)',
    category: 'prepaid',
    description: 'Carte de recharge et bon d\'achat pour compte PlayStation Store PS5/PS4.',
    logoType: 'playstation',
    badge: 'Code 12 caractères',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Portefeuille PlayStation', 'Jeux et abonnements PS Plus', 'Sans carte bancaire']
  },
  {
    id: 'xbox',
    name: 'Xbox & Microsoft',
    category: 'prepaid',
    description: 'Carte de recharge Xbox Live et Microsoft Store pour jeux et Game Pass.',
    logoType: 'xbox',
    badge: 'Code 25 caractères',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Pass jeux Xbox Game Pass', 'Contenus Microsoft Store', 'Activation instantanée']
  },
  {
    id: 'toneo-first',
    name: 'Toneo First',
    category: 'prepaid',
    description: 'Recharges et tickets pour cartes Mastercard prépayées Toneo.',
    logoType: 'toneo',
    badge: 'Recharge Tabac',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR'],
    features: ['Recharge de carte', 'Vérification instantanée du coupon', 'Réseau buralistes']
  },
  {
    id: 'vanilla',
    name: 'Vanilla Prepaid',
    category: 'prepaid',
    description: 'Carte de paiement prépayée et e-voucher Vanilla Mastercard.',
    logoType: 'vanilla',
    badge: 'Carte 16 chiffres',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'CAD'],
    features: ['Montants fixes 25€ à 200€', 'Acceptation globale', 'Paiement sans compte']
  },
  {
    id: 'razer-gold',
    name: 'Razer Gold',
    category: 'prepaid',
    description: 'Crédits virtuels et tickets PIN de recharge gaming Razer Gold.',
    logoType: 'razer-gold',
    badge: 'PIN Gaming',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD'],
    features: ['Jeux PC et mobiles', 'Récompenses Razer Silver', 'Code sécurisé']
  },
  {
    id: 'amazon',
    name: 'Amazon Chèque-Cadeau',
    category: 'prepaid',
    description: 'Cartes et chèques-cadeaux de recharge pour le compte Amazon.',
    logoType: 'amazon',
    badge: 'Code 14-15 car.',
    isActive: true,
    isAvailable: true,
    supportedCurrencies: ['EUR', 'USD', 'GBP'],
    features: ['Solde Amazon sans expiration', 'Valable sur millions d\'articles', 'Crédit direct']
  }
];

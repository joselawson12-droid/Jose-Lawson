import { TicketCatalogItem } from '../types';

/**
 * ==============================================================================
 * CATALOGUE OFFICIEL DES TICKETS DE RECHARGE DISPONIBLES À L'ACTIVATION
 * ==============================================================================
 * 
 * Vous pouvez facilement AJOUTER, MODIFIER ou SUPPRIMER des tickets dans cette liste.
 * 
 * Chaque ticket comprend :
 * - id : identifiant unique du ticket
 * - name : nom officiel du ticket
 * - price : tranches ou montants indicatifs
 * - currency : devise (ex: EUR)
 * - duration : validité du coupon (ex: 24 mois, 12 mois, Permanent)
 * - description : description détaillée
 * - advantages : liste des avantages inclus
 * - isActive : true pour afficher le ticket, false pour le masquer
 * - providerId : identifiant technique pour relier au protocole de vérification
 * - displayOrder : ordre d'affichage (1, 2, 3...)
 * - popular : true pour afficher un badge « Populaire »
 * - badgeColor : couleur d'accentuation
 */
export const TICKETS_CATALOG: TicketCatalogItem[] = [
  {
    id: 'ticket-transcash',
    name: 'TRANSCASH',
    price: '20 € à 500 €',
    currency: 'EUR',
    duration: '24 mois',
    description: 'Recharge officielle pour cartes de paiement prépayées Transcash. Activation et enregistrement instantanés.',
    advantages: [
      'Validation et enregistrement instantanés',
      'Protocole certifié SSL 256 bits',
      'Zéro frais d’activation cachés',
      'Garantie d’authenticité 100%'
    ],
    isActive: true,
    providerId: 'transcash',
    displayOrder: 1,
    popular: true,
    category: 'payment_card',
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 'ticket-pcs',
    name: 'PCS',
    price: '20 € à 250 €',
    currency: 'EUR',
    duration: '12 mois',
    description: 'Recharge coupon pour cartes PCS Black, Chrome, Infinity et Metal. Enregistrement sécurisé avec code PIN.',
    advantages: [
      'Activation immédiate 24h/24',
      'Réseau officiel PCS',
      'Sécurité par code PIN certifié',
      'Audit de conformité en direct'
    ],
    isActive: true,
    providerId: 'pcs',
    displayOrder: 2,
    popular: true,
    category: 'payment_card',
    badgeColor: 'bg-blue-600'
  },
  {
    id: 'ticket-cashlib',
    name: 'CASH LIBERTY',
    price: '10 € à 250 €',
    currency: 'EUR',
    duration: '12 mois',
    description: 'Coupon et voucher de paiement sécurisé CASH LIBERTY pour régler vos transactions en ligne en toute confidentialité.',
    advantages: [
      'Paiement confidentiel et sécurisé',
      'Code PIN chiffré officiel',
      'Valable sur l’ensemble des partenaires',
      'Authentification certifiée'
    ],
    isActive: true,
    providerId: 'cashlib',
    displayOrder: 3,
    popular: true,
    category: 'voucher',
    badgeColor: 'bg-teal-600'
  },
  {
    id: 'ticket-neosurf',
    name: 'NEOSURF',
    price: '10 € à 100 €',
    currency: 'EUR',
    duration: '12 mois',
    description: 'Ticket prépayé simple et accessible pour vos règlements en ligne, jeux et services digitaux sans engagement.',
    advantages: [
      'Paiement confidentiel en ligne',
      'Code sécurisé officiel certifié',
      'Aucune transmission de coordonnées bancaires',
      'Audit et enregistrement immédiats'
    ],
    isActive: true,
    providerId: 'neosurf',
    displayOrder: 4,
    popular: true,
    category: 'voucher',
    badgeColor: 'bg-amber-500'
  },
  {
    id: 'ticket-paysafecard',
    name: 'PAYSAFECARD',
    price: '10 € à 100 €',
    currency: 'EUR',
    duration: '12 mois',
    description: 'Standard européen du prépaiement sécurisé en ligne pour les plateformes de divertissement et commerces partenaires.',
    advantages: [
      'Standard de sécurité international',
      'Code PIN officiel certifié',
      'Vérification de validité instantanée',
      'Large réseau de partenaires officiels'
    ],
    isActive: true,
    providerId: 'paysafecard',
    displayOrder: 5,
    popular: true,
    category: 'voucher',
    badgeColor: 'bg-sky-600'
  },
  {
    id: 'ticket-toneo',
    name: 'TONEO',
    price: '10 € à 200 €',
    currency: 'EUR',
    duration: '12 mois',
    description: 'Recharge express pour carte Toneo First. Idéal pour gérer vos paiements et votre budget au quotidien.',
    advantages: [
      'Recharge rapide certifiée',
      'Gestion budgétaire sécurisée',
      'Certificat d’activation officiel',
      'Compatible paiements sans contact'
    ],
    isActive: true,
    providerId: 'toneo',
    displayOrder: 6,
    popular: false,
    category: 'payment_card',
    badgeColor: 'bg-purple-600'
  },
  {
    id: 'ticket-flexepin',
    name: 'FLEXEPIN',
    price: '20 € à 500 €',
    currency: 'EUR',
    duration: '12 mois',
    description: 'Bon d’achat numérique (cash voucher) pour effectuer des transactions en ligne de manière rapide et ultra sécurisée.',
    advantages: [
      'Alternative de paiement hautement sécurisée',
      'Code PIN officiel certifié',
      'Reçu d’enregistrement certifié immédiat',
      'Disponible en buraliste ou format digital'
    ],
    isActive: true,
    providerId: 'flexepin',
    displayOrder: 7,
    popular: false,
    category: 'voucher',
    badgeColor: 'bg-indigo-600'
  },
  {
    id: 'ticket-steam',
    name: 'STEAM',
    price: '10 € à 100 €',
    currency: 'EUR',
    duration: 'Permanent',
    description: 'Carte et code de porte-monnaie Steam pour jeux vidéo, contenus téléchargeables et logiciels.',
    advantages: [
      'Activation directe sur compte Steam',
      'Accès instantané à la plateforme',
      'Sécurisation officielle certifiée',
      'Idéal pour créditer son compte de jeu'
    ],
    isActive: true,
    providerId: 'steam',
    displayOrder: 8,
    popular: false,
    category: 'gaming',
    badgeColor: 'bg-slate-700'
  },
  {
    id: 'ticket-amazon',
    name: 'AMAZON',
    price: '15 € à 100 €',
    currency: 'EUR',
    duration: '10 ans',
    description: 'Chèque-cadeau et recharge Amazon pour commander des millions de produits livrés à domicile.',
    advantages: [
      'Applicable sur l’ensemble du catalogue',
      'Crédit ajouté en 1 clic sur votre compte',
      'Sécurisation certifiée par chiffrement',
      'Cumulable avec remises et promotions'
    ],
    isActive: true,
    providerId: 'amazon',
    displayOrder: 9,
    popular: false,
    category: 'gift_card',
    badgeColor: 'bg-orange-500'
  },
  {
    id: 'ticket-googleplay',
    name: 'GOOGLE PLAY',
    price: '15 € à 100 €',
    currency: 'EUR',
    duration: 'Permanent',
    description: 'Recharge pour le Google Play Store. Idéal pour acheter applications Android, jeux, livres numériques et abonnements.',
    advantages: [
      'Prise en charge intégrale Google Play Store',
      'Aucune carte bancaire requise sur le compte',
      'Sécurisation certifiée SSL',
      'Enregistrement immédiat'
    ],
    isActive: true,
    providerId: 'googleplay',
    displayOrder: 10,
    popular: false,
    category: 'gaming',
    badgeColor: 'bg-emerald-500'
  }
];

/**
 * Récupère uniquement les tickets actifs, ordonnés selon le champ `displayOrder`.
 */
export function getActiveTickets(): TicketCatalogItem[] {
  return TICKETS_CATALOG
    .filter((ticket) => ticket.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

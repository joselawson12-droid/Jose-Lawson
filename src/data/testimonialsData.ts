/**
 * ============================================================================
 * FICHIER DE CONFIGURATION DES TÉMOIGNAGES CLIENTS (FACILEMENT MODIFIABLE)
 * ============================================================================
 * 
 * Vous pouvez facilement modifier, ajouter ou retirer des avis ici.
 * Chaque témoignage contient :
 *  - id : identifiant unique
 *  - name : Prénom et Nom du client
 *  - role : Fonction, statut ou localisation (ex: "Particulier", "Buraliste", "Commerçant")
 *  - avatarUrl : URL d'une photo réelle ou d'un avatar (laisser vide pour les initiales automatiques)
 *  - initials : Deux lettres affichées si la photo n'est pas disponible
 *  - rating : Note sur 5 (ex: 5)
 *  - title : Titre du témoignage
 *  - comment : Texte de l'avis client
 *  - date : Date d'avis
 *  - verified : true pour afficher le badge "Achat / Contrôle vérifié"
 *  - ticketType : Marque du coupon vérifié
 * ============================================================================
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  initials: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  ticketType?: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Alexandre Mercier',
    role: 'Particulier — Acheteur régulier en ligne',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    initials: 'AM',
    rating: 5,
    title: 'Rapide, précis et évite les arnaques',
    comment: 'Vérification instantanée en moins de 2 secondes avant de valider une transaction entre particuliers. Cela m’a permis de confirmer immédiatement le solde réel de ma recharge Transcash sans mauvaise surprise.',
    date: 'Il y a 3 jours',
    verified: true,
    ticketType: 'Transcash Mastercard'
  },
  {
    id: 'testi-2',
    name: 'Sarah Benali',
    role: 'Buraliste partenaire — Lyon',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
    initials: 'SB',
    rating: 5,
    title: 'Recommandé à tous nos clients en point de vente',
    comment: 'En tant que buraliste, beaucoup de clients nous demandent comment vérifier si leur coupon a bien été activé en caisse. CARD CHECK est la solution la plus claire, moderne et sécurisée que nous recommandons.',
    date: 'Il y a 1 semaine',
    verified: true,
    ticketType: 'PCS Mastercard'
  },
  {
    id: 'testi-3',
    name: 'Thomas Lemoine',
    role: 'Gérant e-commerce — Bordeaux',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    initials: 'TL',
    rating: 5,
    title: 'Le certificat d’authenticité fait toute la différence',
    comment: 'L’interface est d’une fluidité remarquable sur smartphone. Le masquage automatique du code et la délivrance d’un certificat horodaté officiel apportent un vrai niveau de confiance.',
    date: 'Il y a 2 semaines',
    verified: true,
    ticketType: 'Neosurf Voucher'
  },
  {
    id: 'testi-4',
    name: 'Claire Dubois',
    role: 'Utilisatrice certifiée — Paris 11e',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&h=160&q=80',
    initials: 'CD',
    rating: 5,
    title: 'Contrôle sans prise de tête et rassurant',
    comment: 'J’avais reçu un ticket Paysafecard en cadeau et je voulais m’assurer qu’il était intact avant utilisation. En 3 clics, j’ai obtenu la confirmation du montant et de la validité.',
    date: 'Il y a 3 semaines',
    verified: true,
    ticketType: 'Paysafecard'
  },
  {
    id: 'testi-5',
    name: 'Maxime Moreau',
    role: 'Freelance & Consultant tech — Marseille',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
    initials: 'MM',
    rating: 5,
    title: 'Respect de la confidentialité et sécurité SSL',
    comment: 'Ce que j’apprécie particulièrement, c’est le respect strict de la confidentialité : aucun code sensible n’est stocké en clair, l’empreinte est hachée et la connexion est chiffrée de bout en bout.',
    date: 'Il y a 1 mois',
    verified: true,
    ticketType: 'CASHlib'
  },
  {
    id: 'testi-6',
    name: 'Élodie Roussel',
    role: 'Acheteuse gaming & loisirs numériques',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    initials: 'ER',
    rating: 5,
    title: 'Indispensable pour les cartes cadeaux et recharges',
    comment: 'Simple, direct et réactif. L’œil pour masquer/démasquer le code pendant la saisie est une excellente amélioration pour ne pas se tromper tout en gardant son code secret à l’abri des regards.',
    date: 'Il y a 1 mois',
    verified: true,
    ticketType: 'Amazon & Steam'
  }
];

export const TESTIMONIALS_METRICS = {
  averageRating: '4.9/5',
  totalReviews: '1 280+',
  satisfactionRate: '99.4%',
  recommendationRate: '98%'
};

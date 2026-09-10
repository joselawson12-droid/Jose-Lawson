import { SupportDossier, AuditLogItem } from '../types';

export const INITIAL_SUPPORT_DOSSIERS: SupportDossier[] = [
  {
    id: 'DOS-2026-8491',
    customerId: 'CUST-74891',
    customerName: 'Sophie Martin',
    customerPhone: '+33 6 12 34 56 78',
    customerEmail: 'sophie.martin@example.fr',
    transactionId: 'TX-PAY-2026-91823',
    transactionDate: new Date(Date.now() - 1000 * 60 * 42).toISOString(), // 42 mins ago
    amount: 50.00,
    currency: 'EUR',
    status: 'failed',
    cardNetwork: 'Mastercard',
    maskedCardNumber: '5168 45•• •••• 8491',
    cardExpMonth: '09',
    cardExpYear: '2028',
    cardIssuerCountry: 'FR',
    providerGateway: 'Stripe Payments EU',
    gatewayErrorCode: '3DS_AUTHENTICATION_TIMEOUT',
    gatewayErrorMessage: 'Délai d\'authentification forte 3D-Secure dépassé par le porteur de carte (Code: 3DS_TIMEOUT_EXPIRED)',
    attempts: [
      {
        id: 'att-101',
        attemptNumber: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        status: 'failed',
        amount: 50.00,
        currency: 'EUR',
        gatewayResponseCode: '3DS_CHALLENGE_TIMEOUT',
        gatewayMessage: 'Session de validation bancaire expirée après 180s',
        threeDSecureStatus: 'challenge_required',
        ipAddress: '176.142.88.***',
        failureReason: 'L\'application bancaire n\'a pas validé la notification push à temps'
      },
      {
        id: 'att-102',
        attemptNumber: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
        status: 'failed',
        amount: 50.00,
        currency: 'EUR',
        gatewayResponseCode: '3DS_AUTHENTICATION_TIMEOUT',
        gatewayMessage: 'Abandon ou dépassement de délai sur l\'écran de confirmation',
        threeDSecureStatus: 'failed',
        ipAddress: '176.142.88.***',
        failureReason: 'Échec de la validation du défi 3DS par la banque émettrice'
      }
    ],
    supportStatus: 'open',
    supportNotes: [
      {
        id: 'note-1',
        adminName: 'Système Automatique',
        adminEmail: 'security-bot@cardcheck.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
        note: 'Dossier créé automatiquement suite à 2 échecs consécutifs d\'authentification 3D-Secure.',
        actionTaken: 'Flagging automatique pour suivi support'
      }
    ]
  },
  {
    id: 'DOS-2026-8492',
    customerId: 'CUST-63204',
    customerName: 'Jean-Pierre Bernard',
    customerPhone: '+33 6 98 76 54 32',
    customerEmail: 'jp.bernard@pro-btp.fr',
    transactionId: 'TX-PAY-2026-91824',
    transactionDate: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    amount: 100.00,
    currency: 'EUR',
    status: 'failed',
    cardNetwork: 'Visa',
    maskedCardNumber: '4970 10•• •••• 2104',
    cardExpMonth: '11',
    cardExpYear: '2027',
    cardIssuerCountry: 'FR',
    providerGateway: 'Adyen Banking Gateway',
    gatewayErrorCode: 'SPENDING_LIMIT_EXCEEDED',
    gatewayErrorMessage: 'Refus de la banque émettrice : Plafond mensuel de paiement atteint (Code: DO_NOT_HONOR_LIMIT)',
    attempts: [
      {
        id: 'att-201',
        attemptNumber: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
        status: 'failed',
        amount: 100.00,
        currency: 'EUR',
        gatewayResponseCode: '51_INSUFFICIENT_FUNDS_OR_LIMIT',
        gatewayMessage: 'Dépassement du plafond de dépenses autorisé sur la carte',
        threeDSecureStatus: 'authenticated',
        ipAddress: '82.64.120.***',
        failureReason: 'Solde ou plafond insuffisant auprès de la banque (Code ISO 51)'
      }
    ],
    supportStatus: 'in_progress',
    lastContactedAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    lastContactedMethod: 'phone',
    supportNotes: [
      {
        id: 'note-2',
        adminName: 'Administrateur CARD CHECK',
        adminEmail: 'admin@cardcheck.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
        note: 'Client joint par téléphone. M. Bernard va augmenter temporairement son plafond sur son application bancaire puis réitérer le règlement.',
        actionTaken: 'Appel téléphonique de conseil et assistance'
      }
    ]
  },
  {
    id: 'DOS-2026-8493',
    customerId: 'CUST-88190',
    customerName: 'Lucas Delorme',
    customerPhone: '+33 7 49 11 22 33',
    customerEmail: 'lucas.delorme@gmail.com',
    transactionId: 'TX-PAY-2026-91825',
    transactionDate: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    amount: 150.00,
    currency: 'EUR',
    status: 'succeeded',
    cardNetwork: 'CB / Carte Bancaire',
    maskedCardNumber: '4974 00•• •••• 7891',
    cardExpMonth: '06',
    cardExpYear: '2029',
    cardIssuerCountry: 'FR',
    providerGateway: 'Worldline Direct EU',
    gatewayErrorCode: undefined,
    gatewayErrorMessage: 'Transaction approuvée avec succès (Code: AUTH_SUCCESS_200)',
    attempts: [
      {
        id: 'att-301',
        attemptNumber: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 185).toISOString(),
        status: 'failed',
        amount: 150.00,
        currency: 'EUR',
        gatewayResponseCode: '3DS_INCORRECT_CODE',
        gatewayMessage: 'Saisie de code OTP SMS erronée lors du 1er essai',
        threeDSecureStatus: 'failed',
        ipAddress: '90.85.23.***',
        failureReason: 'Code de sécurité SMS non concordant'
      },
      {
        id: 'att-302',
        attemptNumber: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        status: 'succeeded',
        amount: 150.00,
        currency: 'EUR',
        gatewayResponseCode: '00_TRANSACTION_APPROVED',
        gatewayMessage: 'Authentification 3DS validée et débit autorisé',
        threeDSecureStatus: 'authenticated',
        ipAddress: '90.85.23.***'
      }
    ],
    supportStatus: 'resolved',
    lastContactedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    lastContactedMethod: 'email',
    supportNotes: [
      {
        id: 'note-3',
        adminName: 'Administrateur CARD CHECK',
        adminEmail: 'admin@cardcheck.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        note: 'Email de confirmation automatique et attestation de vérification transmis au client.',
        actionTaken: 'Envoi d\'attestation par e-mail'
      }
    ]
  },
  {
    id: 'DOS-2026-8494',
    customerId: 'CUST-91523',
    customerName: 'Amina Khelifi',
    customerPhone: '+33 6 52 88 94 01',
    customerEmail: 'amina.khelifi@outlook.com',
    transactionId: 'TX-PAY-2026-91826',
    transactionDate: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    amount: 250.00,
    currency: 'EUR',
    status: 'blocked',
    cardNetwork: 'Visa',
    maskedCardNumber: '4532 90•• •••• 9012',
    cardExpMonth: '03',
    cardExpYear: '2027',
    cardIssuerCountry: 'FR',
    providerGateway: 'Stripe Radar Anti-Fraud',
    gatewayErrorCode: 'FRAUD_SUSPECTED_DO_NOT_HONOR',
    gatewayErrorMessage: 'Blocage de sécurité bancaire : Rejet préventif par le système de scoring (Code: DO_NOT_HONOR)',
    attempts: [
      {
        id: 'att-401',
        attemptNumber: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 250).toISOString(),
        status: 'blocked',
        amount: 250.00,
        currency: 'EUR',
        gatewayResponseCode: 'RADAR_RISK_BLOCK',
        gatewayMessage: 'Niveau de risque évalué élevé suite à changement récent de terminal',
        threeDSecureStatus: 'challenge_required',
        ipAddress: '194.206.11.***',
        failureReason: 'Règle de filtrage IP et géolocalisation déclenchée'
      },
      {
        id: 'att-402',
        attemptNumber: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 245).toISOString(),
        status: 'blocked',
        amount: 250.00,
        currency: 'EUR',
        gatewayResponseCode: '05_DO_NOT_HONOR',
        gatewayMessage: 'Refus catégorique émetteur',
        threeDSecureStatus: 'failed',
        ipAddress: '194.206.11.***',
        failureReason: 'La banque demande au client de la contacter directement'
      }
    ],
    supportStatus: 'open',
    supportNotes: [
      {
        id: 'note-4',
        adminName: 'Système Anti-Fraude',
        adminEmail: 'security@cardcheck.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 238).toISOString(),
        note: 'Dossier placé sous revue manuelle. Alerte bancaire émetteur 05.',
        actionTaken: 'Gel de la tentative pour protection client'
      }
    ]
  },
  {
    id: 'DOS-2026-8495',
    customerId: 'CUST-54019',
    customerName: 'Thomas Garcia',
    customerPhone: '+33 6 30 19 82 74',
    customerEmail: 't.garcia@wanadoo.fr',
    transactionId: 'TX-PAY-2026-91827',
    transactionDate: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    amount: 30.00,
    currency: 'EUR',
    status: 'requires_action',
    cardNetwork: 'American Express',
    maskedCardNumber: '3782 82•• •••• 3410',
    cardExpMonth: '12',
    cardExpYear: '2026',
    cardIssuerCountry: 'FR',
    providerGateway: 'Amex SafeKey Engine',
    gatewayErrorCode: 'CHALLENGE_PENDING',
    gatewayErrorMessage: 'Défi SafeKey en attente de validation par le porteur (Code: AMEX_SAFEKEY_PENDING)',
    attempts: [
      {
        id: 'att-501',
        attemptNumber: 1,
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        status: 'requires_action',
        amount: 30.00,
        currency: 'EUR',
        gatewayResponseCode: 'SAFEKEY_CHALLENGE_ISSUED',
        gatewayMessage: 'Lien de confirmation transmis sur l\'application Amex du titulaire',
        threeDSecureStatus: 'challenge_required',
        ipAddress: '88.167.49.***'
      }
    ],
    supportStatus: 'in_progress',
    supportNotes: [
      {
        id: 'note-5',
        adminName: 'Administrateur CARD CHECK',
        adminEmail: 'admin@cardcheck.com',
        timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
        note: 'Notification envoyée au client pour l\'inviter à ouvrir son application Amex.',
        actionTaken: 'Envoi d\'un SMS de relance de défi SafeKey'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    adminEmail: 'admin@cardcheck.com',
    adminName: 'Administrateur CARD CHECK',
    action: 'contact_client',
    dossierId: 'DOS-2026-8492',
    transactionId: 'TX-PAY-2026-91824',
    details: 'Prise de contact téléphonique avec Jean-Pierre Bernard (+33 6 98 76 54 32) suite à refus bancaire.',
    ipAddress: '192.168.1.***'
  },
  {
    id: 'aud-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    adminEmail: 'admin@cardcheck.com',
    adminName: 'Administrateur CARD CHECK',
    action: 'contact_client',
    dossierId: 'DOS-2026-8493',
    transactionId: 'TX-PAY-2026-91825',
    details: 'Envoi d\'un e-mail d\'assistance et de confirmation à Lucas Delorme (lucas.delorme@gmail.com).',
    ipAddress: '192.168.1.***'
  },
  {
    id: 'aud-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    adminEmail: 'admin@cardcheck.com',
    adminName: 'Administrateur CARD CHECK',
    action: 'view_dossier',
    dossierId: 'DOS-2026-8493',
    transactionId: 'TX-PAY-2026-91825',
    details: 'Consultation complète du dossier de paiement sécurisé (données sensibles exclues).',
    ipAddress: '192.168.1.***'
  },
  {
    id: 'aud-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    adminEmail: 'admin@cardcheck.com',
    adminName: 'Administrateur CARD CHECK',
    action: 'update_status',
    dossierId: 'DOS-2026-8495',
    transactionId: 'TX-PAY-2026-91827',
    details: 'Passage du statut du dossier à "En cours de traitement".',
    ipAddress: '192.168.1.***'
  }
];

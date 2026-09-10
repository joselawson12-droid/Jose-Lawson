import { PaymentTransaction, ClientUser } from '../types';

export const INITIAL_CLIENT_USERS: ClientUser[] = [
  {
    id: 'CUST-84920',
    name: 'Jean-Marc Dupont',
    email: 'jean.dupont@orange.fr',
    phone: '+33 6 12 34 56 78',
    token: 'client_token_jm_dupont_84920',
    createdAt: '2026-08-10T14:20:00.000Z'
  },
  {
    id: 'CUST-72109',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@gmail.com',
    phone: '+33 7 98 76 54 32',
    token: 'client_token_s_laurent_72109',
    createdAt: '2026-08-18T09:45:00.000Z'
  },
  {
    id: 'CUST-39044',
    name: 'Alexandre Moreau',
    email: 'alex.moreau@outlook.com',
    phone: '+33 6 45 67 89 01',
    token: 'client_token_a_moreau_39044',
    createdAt: '2026-08-25T16:10:00.000Z'
  },
  {
    id: 'CUST-10492',
    name: 'Camille Bernard',
    email: 'camille.bernard@free.fr',
    phone: '+33 6 55 44 33 22',
    token: 'client_token_c_bernard_10492',
    createdAt: '2026-09-01T11:30:00.000Z'
  }
];

export const INITIAL_PAYMENT_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'TX-PAY-2026-98102',
    customerId: 'CUST-84920',
    customerName: 'Jean-Marc Dupont',
    customerEmail: 'jean.dupont@orange.fr',
    customerPhone: '+33 6 12 34 56 78',
    amount: 50.00,
    currency: 'EUR',
    status: 'successful',
    paymentMethodId: 'visa',
    paymentMethodName: 'Visa',
    paymentCategory: 'cards',
    maskedCardDetails: {
      brand: 'Visa',
      last4: '4821',
      expMonth: '08',
      expYear: '2028'
    },
    provider: 'simulated',
    providerReference: 'sim_ref_98102_ok',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    confirmedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    history: [
      {
        status: 'pending',
        timestamp: new Date(Date.now() - 3600000 * 2.05).toISOString(),
        note: 'Paiement initié par le client'
      },
      {
        status: 'processing',
        timestamp: new Date(Date.now() - 3600000 * 2.02).toISOString(),
        note: 'Validation 3D-Secure réussie'
      },
      {
        status: 'successful',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        note: 'Fonds capturés avec succès'
      }
    ]
  },
  {
    id: 'TX-PAY-2026-98103',
    customerId: 'CUST-72109',
    customerName: 'Sophie Laurent',
    customerEmail: 'sophie.laurent@gmail.com',
    customerPhone: '+33 7 98 76 54 32',
    amount: 100.00,
    currency: 'EUR',
    status: 'successful',
    paymentMethodId: 'mastercard',
    paymentMethodName: 'Mastercard',
    paymentCategory: 'cards',
    maskedCardDetails: {
      brand: 'Mastercard',
      last4: '5512',
      expMonth: '11',
      expYear: '2027'
    },
    provider: 'simulated',
    providerReference: 'sim_ref_98103_ok',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    confirmedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    history: [
      {
        status: 'pending',
        timestamp: new Date(Date.now() - 3600000 * 5.05).toISOString(),
        note: 'Paiement initié par le client'
      },
      {
        status: 'successful',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        note: 'Autorisation accordée par la banque'
      }
    ]
  },
  {
    id: 'TX-PAY-2026-98104',
    customerId: 'CUST-39044',
    customerName: 'Alexandre Moreau',
    customerEmail: 'alex.moreau@outlook.com',
    customerPhone: '+33 6 45 67 89 01',
    amount: 25.00,
    currency: 'EUR',
    status: 'failed',
    paymentMethodId: 'cb',
    paymentMethodName: 'CB / Cartes Bancaires',
    paymentCategory: 'cards',
    maskedCardDetails: {
      brand: 'CB',
      last4: '1942',
      expMonth: '05',
      expYear: '2026'
    },
    provider: 'simulated',
    providerReference: 'sim_ref_98104_fail',
    failureReason: 'Refus bancaire : Solde insuffisant sur le compte émetteur (Code 51)',
    createdAt: new Date(Date.now() - 3600000 * 9).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 9).toISOString(),
    history: [
      {
        status: 'pending',
        timestamp: new Date(Date.now() - 3600000 * 9.05).toISOString(),
        note: 'Tentative de débit initiée'
      },
      {
        status: 'failed',
        timestamp: new Date(Date.now() - 3600000 * 9).toISOString(),
        note: 'Refus de la banque du porteur (Provision insuffisante)'
      }
    ]
  },
  {
    id: 'TX-PAY-2026-98105',
    customerId: 'CUST-84920',
    customerName: 'Jean-Marc Dupont',
    customerEmail: 'jean.dupont@orange.fr',
    customerPhone: '+33 6 12 34 56 78',
    amount: 15.00,
    currency: 'EUR',
    status: 'refunded',
    paymentMethodId: 'google-pay',
    paymentMethodName: 'Google Pay',
    paymentCategory: 'wallets',
    provider: 'simulated',
    providerReference: 'sim_ref_98105_ref',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    confirmedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    refundDetails: {
      refundedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      amount: 15.00,
      reason: 'Remboursement suite à demande ticket en double'
    },
    history: [
      {
        status: 'pending',
        timestamp: new Date(Date.now() - 86400000 * 2.05).toISOString(),
        note: 'Paiement Google Pay soumis'
      },
      {
        status: 'successful',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        note: 'Paiement validé'
      },
      {
        status: 'refunded',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        note: 'Remboursement intégral effectué par le support'
      }
    ]
  },
  {
    id: 'TX-PAY-2026-98106',
    customerId: 'CUST-10492',
    customerName: 'Camille Bernard',
    customerEmail: 'camille.bernard@free.fr',
    customerPhone: '+33 6 55 44 33 22',
    amount: 150.00,
    currency: 'EUR',
    status: 'pending',
    paymentMethodId: 'paysafecard',
    paymentMethodName: 'Paysafecard',
    paymentCategory: 'prepaid',
    provider: 'simulated',
    providerReference: 'sim_ref_98106_pend',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    history: [
      {
        status: 'pending',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        note: 'En attente de saisie du code PIN Paysafecard par le client'
      }
    ]
  },
  {
    id: 'TX-PAY-2026-98107',
    customerId: 'CUST-72109',
    customerName: 'Sophie Laurent',
    customerEmail: 'sophie.laurent@gmail.com',
    customerPhone: '+33 7 98 76 54 32',
    amount: 40.00,
    currency: 'EUR',
    status: 'cancelled',
    paymentMethodId: 'apple-pay',
    paymentMethodName: 'Apple Pay',
    paymentCategory: 'wallets',
    failureReason: 'Session annulée par l\'utilisateur avant confirmation Touch ID',
    provider: 'simulated',
    providerReference: 'sim_ref_98107_canc',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7100000).toISOString(),
    history: [
      {
        status: 'pending',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        note: 'Ouverture de la fenêtre Apple Pay'
      },
      {
        status: 'cancelled',
        timestamp: new Date(Date.now() - 7100000).toISOString(),
        note: 'Annulé par le client'
      }
    ]
  }
];

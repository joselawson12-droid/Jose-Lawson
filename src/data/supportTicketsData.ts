import { SupportTicket } from '../types';

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'TK-2026-92814',
    ticketNumber: 'CC-SUP-92814',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 min ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    status: 'nouveau',
    customerName: 'Marc Dubois',
    customerEmail: 'm.dubois@orange.fr',
    customerPhone: '+33 6 44 21 89 05',
    customerId: 'CUST-88312',
    subject: 'Difficulté de validation ticket Transcash 100 €',
    message: 'Bonjour, j\'ai acheté un ticket de recharge Transcash de 100 € chez mon buraliste ce matin. Lorsque j\'essaie de l\'activer, le statut indique délai dépassé. Voici les références indiquées sur mon ticket : Numéro de transaction 8819203, code buraliste 75011.',
    transactionId: 'TX-PAY-2026-91820',
    transactionStatus: 'failed',
    emailDispatch: {
      from: 'support@cardcheck-platform.com',
      to: 'dosbotocha1@gmail.com',
      sentAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      deliveryStatus: 'delivered',
      subject: '[Support CARD CHECK] Difficulté de validation ticket Transcash 100 € - Réf: CC-SUP-92814',
      details: 'Transmis avec succès via support@cardcheck-platform.com vers dosbotocha1@gmail.com'
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'client',
        senderName: 'Marc Dubois',
        senderEmail: 'm.dubois@orange.fr',
        content: 'Bonjour, j\'ai acheté un ticket de recharge Transcash de 100 € chez mon buraliste ce matin. Lorsque j\'essaie de l\'activer, le statut indique délai dépassé. Voici les références indiquées sur mon ticket : Numéro de transaction 8819203, code buraliste 75011.',
        timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        emailSent: true
      }
    ]
  },
  {
    id: 'TK-2026-92815',
    ticketNumber: 'CC-SUP-92815',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2h ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: 'en_cours',
    customerName: 'Claire Fontaine',
    customerEmail: 'claire.fontaine@outlook.fr',
    customerPhone: '+33 7 81 90 34 12',
    customerId: 'CUST-52904',
    subject: 'Confirmation de paiement en attente 3D-Secure',
    message: 'Bonjour le support, j\'ai tenté un règlement par carte bancaire pour l\'acquisition d\'un e-voucher CASHlib de 50 €. Ma banque a envoyé une notification push mais votre page a tourné en boucle.',
    transactionId: 'TX-PAY-2026-91821',
    transactionStatus: 'processing',
    emailDispatch: {
      from: 'support@cardcheck-platform.com',
      to: 'dosbotocha1@gmail.com',
      sentAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      deliveryStatus: 'delivered',
      subject: '[Support CARD CHECK] Confirmation de paiement en attente 3D-Secure - Réf: CC-SUP-92815',
      details: 'Transmis avec succès vers dosbotocha1@gmail.com'
    },
    messages: [
      {
        id: 'msg-201',
        sender: 'client',
        senderName: 'Claire Fontaine',
        senderEmail: 'claire.fontaine@outlook.fr',
        content: 'Bonjour le support, j\'ai tenté un règlement par carte bancaire pour l\'acquisition d\'un e-voucher CASHlib de 50 €. Ma banque a envoyé une notification push mais votre page a tourné en boucle.',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        emailSent: true
      },
      {
        id: 'msg-202',
        sender: 'admin',
        senderName: 'Équipe Support CARD CHECK',
        senderEmail: 'support@cardcheck-platform.com',
        content: 'Bonjour Mme Fontaine, nous avons bien reçu votre demande et vérifié le journal de paiement. Votre transaction a bien été initiée et nous relançons la passerelle d\'authentification. Nous revenons vers vous d\'ici 15 minutes.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        emailSent: true
      }
    ]
  },
  {
    id: 'TK-2026-92816',
    ticketNumber: 'CC-SUP-92816',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6h ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: 'resolu',
    customerName: 'Alexandre Renard',
    customerEmail: 'alex.renard@gmail.com',
    customerPhone: '+33 6 12 98 45 67',
    customerId: 'CUST-39182',
    subject: 'Signalement de suspect démarcheur sur Neosurf',
    message: 'Bonjour, une personne sur un site de petites annonces m\'a demandé d\'acheter un coupon Neosurf de 250 € et de lui envoyer la photo du code. Grâce à votre outil de prévention des arnaques, j\'ai évité le piège. Merci pour votre service.',
    transactionId: 'TX-PAY-2026-91819',
    transactionStatus: 'succeeded',
    emailDispatch: {
      from: 'support@cardcheck-platform.com',
      to: 'dosbotocha1@gmail.com',
      sentAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      deliveryStatus: 'delivered',
      subject: '[Support CARD CHECK] Signalement de suspect démarcheur sur Neosurf - Réf: CC-SUP-92816',
      details: 'Transmis avec succès vers dosbotocha1@gmail.com'
    },
    messages: [
      {
        id: 'msg-301',
        sender: 'client',
        senderName: 'Alexandre Renard',
        senderEmail: 'alex.renard@gmail.com',
        content: 'Bonjour, une personne sur un site de petites annonces m\'a demandé d\'acheter un coupon Neosurf de 250 € et de lui envoyer la photo du code. Grâce à votre outil de prévention des arnaques, j\'ai évité le piège. Merci pour votre service.',
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        emailSent: true
      },
      {
        id: 'msg-302',
        sender: 'admin',
        senderName: 'Équipe Support CARD CHECK',
        senderEmail: 'support@cardcheck-platform.com',
        content: 'Bonjour M. Renard, nous vous félicitons pour votre vigilance. Le profil du fraudeur a été répertorié dans notre base de signalements préventifs. Ticket classé comme résolu.',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
        emailSent: true
      }
    ]
  }
];

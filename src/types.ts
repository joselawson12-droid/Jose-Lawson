export type TicketCategory = 'payment_card' | 'voucher' | 'gift_card' | 'gaming';

export type VerificationStatus =
  | 'valid'
  | 'invalid'
  | 'already_used'
  | 'expired'
  | 'impossible';

export interface TicketProvider {
  id: string;
  name: string;
  category: TicketCategory;
  codeFormat: string;
  codeLength: number[];
  codePattern?: string;
  placeholder: string;
  badgeColor: string;
  textColor?: string;
  currency: string;
  supportedAmounts: number[];
  isActive: boolean;
  description: string;
  helpTip: string;
  priceDisplay?: string;
  validityPeriod?: string;
}

export interface VerificationResult {
  id: string;
  transactionId: string;
  status: VerificationStatus;
  statusLabel: string;
  provider: {
    id: string;
    name: string;
    badgeColor: string;
    category: TicketCategory;
  };
  amount?: number;
  currency?: string;
  maskedCode: string;
  verifiedAt: string;
  securitySeal: string;
  expiryDate?: string;
  usedAt?: string;
  reason?: string;
  advice?: string;
  isActivated?: boolean;
  activationDate?: string;
  isDemo?: boolean;
}

export interface VerificationLogItem {
  id: string;
  transactionId: string;
  providerId: string;
  providerName: string;
  maskedCode: string;
  status: VerificationStatus;
  amount?: number;
  currency?: string;
  ip: string;
  verifiedAt: string;
  responseTimeMs: number;
}

export interface DailyStat {
  date: string;
  label: string;
  valid: number;
  invalid: number;
  used: number;
  expired: number;
  total: number;
}

export interface ProviderStat {
  providerId: string;
  providerName: string;
  total: number;
  valid: number;
  percentage: number;
}

export interface AdminStats {
  totalVerifications: number;
  validCount: number;
  invalidCount: number;
  usedCount: number;
  expiredCount: number;
  impossibleCount: number;
  todayCount: number;
  thisMonthCount: number;
  validityRate: number;
  dailyStats: DailyStat[];
  providerStats: ProviderStat[];
}

export interface SystemConfig {
  demoMode: boolean;
  maintenanceMode: boolean;
  verificationDelayMs: number;
  rateLimitPerMinute: number;
  officialApiEndpoint: string;
  officialApiKeyConfigured: boolean;
  activeProviderCount: number;
  systemHealth: 'optimal' | 'degraded' | 'maintenance';
  lastSync: string;
}

export interface SystemErrorLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  service: string;
  message: string;
  resolved: boolean;
}

export interface DemoCodeInfo {
  code: string;
  providerId: string;
  expectedStatus: VerificationStatus;
  amount?: number;
  label: string;
  description: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'auditor';
  token: string;
}

// ==========================================
// PAYMENT SUPPORT & PCI-DSS COMPLIANCE TYPES
// ==========================================
export type PaymentStatus =
  | 'succeeded'
  | 'failed'
  | 'requires_action'
  | 'processing'
  | 'refunded'
  | 'blocked';

export type CardNetwork =
  | 'Visa'
  | 'Mastercard'
  | 'American Express'
  | 'CB / Carte Bancaire'
  | 'Maestro'
  | 'Autre';

export type SupportDossierStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface PaymentAttempt {
  id: string;
  attemptNumber: number;
  timestamp: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  gatewayResponseCode: string;
  gatewayMessage: string;
  threeDSecureStatus?: 'authenticated' | 'challenge_required' | 'failed' | 'not_enrolled';
  ipAddress: string;
  failureReason?: string;
}

export interface SupportDossierNote {
  id: string;
  adminName: string;
  adminEmail: string;
  timestamp: string;
  note: string;
  actionTaken?: string;
}

export interface SupportDossier {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  transactionId: string;
  transactionDate: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  cardNetwork: CardNetwork;
  maskedCardNumber: string; // Strictly masked (e.g. •••• •••• •••• 7891 or 4970 10•• •••• 7891)
  cardExpMonth?: string;
  cardExpYear?: string;
  cardIssuerCountry?: string;
  providerGateway: string;
  gatewayErrorCode?: string;
  gatewayErrorMessage?: string;
  attempts: PaymentAttempt[];
  supportStatus: SupportDossierStatus;
  supportNotes: SupportDossierNote[];
  lastContactedAt?: string;
  lastContactedMethod?: 'phone' | 'email';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  adminEmail: string;
  adminName: string;
  action: 'view_dossier' | 'contact_client' | 'update_status' | 'add_note' | 'retry_payment' | 'refund_payment';
  dossierId: string;
  transactionId: string;
  details: string;
  ipAddress?: string;
}

export type PaymentMethodCategory = 'cards' | 'wallets' | 'prepaid';

export interface PaymentMethodItem {
  id: string;
  name: string;
  category: PaymentMethodCategory;
  description: string;
  logoType: string;
  badge?: string;
  isActive: boolean; // Admin toggle: whether visible to clients
  isAvailable: boolean; // Dynamic gateway availability: Disponible vs Non disponible
  unavailabilityReason?: string;
  supportedCurrencies: string[];
  features?: string[];
}

// ==========================================
// CLIENT SUPPORT TICKETS & EMAIL FORWARDING
// ==========================================
export type SupportTicketStatus = 'nouveau' | 'en_cours' | 'resolu';

export interface SupportTicketMessage {
  id: string;
  sender: 'client' | 'admin';
  senderName: string;
  senderEmail: string;
  content: string;
  timestamp: string;
  emailSent?: boolean;
}

export interface SupportEmailDispatch {
  id: string;
  ticketId: string;
  ticketNumber: string;
  from: string; // support@cardcheck-platform.com
  to: string;   // dosbotocha1@gmail.com
  replyTo?: string;
  subject: string;
  sentAt: string;
  deliveryStatus: 'delivered' | 'sent' | 'pending' | 'failed';
  transportMethod: 'smtp' | 'direct' | 'relay';
  messagePreview: string;
  rawHeaders?: Record<string, string>;
  error?: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  createdAt: string;
  updatedAt: string;
  status: SupportTicketStatus;

  // Client info
  customerName?: string;
  customerEmail: string;
  customerPhone?: string;
  customerId?: string;

  // Request details
  subject: string;
  message: string;

  // Optional transaction & payment context
  transactionId?: string;
  transactionStatus?: string; // 'succeeded' | 'failed' | 'processing' | 'refunded' | 'blocked' | 'aucun'

  // Email transmission audit
  emailDispatch: {
    from: string; // 'support@cardcheck-platform.com'
    to: string;   // 'dosbotocha1@gmail.com'
    sentAt: string;
    deliveryStatus: 'delivered' | 'sent' | 'pending' | 'failed';
    subject: string;
    details?: string;
  };

  // Conversation history
  messages: SupportTicketMessage[];
}

// ==========================================
// PAYMENT GATEWAY & MODULAR TRANSACTIONS TYPES
// ==========================================
export type PaymentTransactionStatus =
  | 'pending'
  | 'processing'
  | 'successful'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface PaymentTransactionHistoryItem {
  status: PaymentTransactionStatus;
  timestamp: string;
  note: string;
}

export interface PaymentTransaction {
  id: string; // TX-PAY-2026-XXXXX
  customerId: string; // CUST-XXXXX
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  currency: string; // EUR, USD, etc.
  status: PaymentTransactionStatus;
  paymentMethodId: string;
  paymentMethodName: string;
  paymentCategory: 'cards' | 'wallets' | 'prepaid' | 'other';
  maskedCardDetails?: {
    brand: string;
    last4: string;
    expMonth?: string;
    expYear?: string;
  };
  provider: string; // 'simulated' | 'stripe' | 'paypal' | 'adyen'
  providerReference?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  failureReason?: string;
  refundDetails?: {
    refundedAt: string;
    amount: number;
    reason?: string;
  };
  history: PaymentTransactionHistoryItem[];
}

export interface ClientUser {
  id: string; // CUST-XXXXX
  name: string;
  email: string;
  phone?: string;
  token: string;
  createdAt: string;
}

export interface PaymentGatewayMetrics {
  totalClients: number;
  totalTransactions: number;
  successfulTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  processingTransactions: number;
  cancelledTransactions: number;
  refundedTransactions: number;
  totalAmount: number;
  successfulAmount: number;
  currency: string;
}

export interface TicketCatalogItem {
  id: string;
  name: string;
  price: string;
  currency: string;
  duration: string;
  description: string;
  advantages: string[];
  isActive: boolean;
  icon?: string;
  providerId: string;
  displayOrder: number;
  category?: 'payment_card' | 'voucher' | 'gift_card' | 'gaming';
  popular?: boolean;
  badgeColor?: string;
}

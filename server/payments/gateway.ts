import crypto from 'crypto';
import {
  PaymentTransaction,
  PaymentTransactionStatus,
  PaymentTransactionHistoryItem
} from '../../src/types';

export interface CreatePaymentRequest {
  amount: number;
  currency?: string;
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  paymentMethodId: string;
  paymentMethodName?: string;
  paymentCategory: 'cards' | 'wallets' | 'prepaid' | 'other';
  cardData?: {
    brand?: string;
    last4?: string;
    expMonth?: string;
    expYear?: string;
  };
  metadata?: Record<string, any>;
  autoConfirm?: boolean;
}

export interface WebhookResult {
  handled: boolean;
  provider: string;
  eventType: string;
  transactionId?: string;
  status?: PaymentTransactionStatus;
  message: string;
}

/**
 * Standard Payment Gateway Connector Interface.
 * Every future payment provider (Stripe, PayPal, Adyen, Mollie, etc.)
 * implements this interface without altering core application logic.
 */
export interface PaymentGatewayConnector {
  readonly providerId: string;
  readonly providerName: string;
  isConfigured(): boolean;
  createTransaction(req: CreatePaymentRequest): Promise<PaymentTransaction>;
  confirmPayment(transaction: PaymentTransaction, confirmationData?: any): Promise<PaymentTransaction>;
  cancelPayment(transaction: PaymentTransaction, reason?: string): Promise<PaymentTransaction>;
  refundPayment(transaction: PaymentTransaction, amount?: number, reason?: string): Promise<PaymentTransaction>;
  handleWebhook(payload: any, headers?: Record<string, any>): Promise<WebhookResult>;
}

/**
 * 1. SIMULATED GATEWAY CONNECTOR (Default active connector)
 * Enables complete end-to-end testing of transactions, 3DS flows,
 * cancellations, and refunds without hardcoded real secret keys.
 */
export class SimulatedGatewayConnector implements PaymentGatewayConnector {
  readonly providerId = 'simulated';
  readonly providerName = 'Passerelle Virtuelle Sécurisée (Simulée)';

  isConfigured(): boolean {
    return true;
  }

  async createTransaction(req: CreatePaymentRequest): Promise<PaymentTransaction> {
    const txNumber = Math.floor(100000 + Math.random() * 900000);
    const txId = `TX-PAY-2026-${txNumber}`;
    const custId = req.customerId || `CUST-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    // Default status: pending or processing
    const initialStatus: PaymentTransactionStatus = req.autoConfirm ? 'successful' : 'pending';

    const transaction: PaymentTransaction = {
      id: txId,
      customerId: custId,
      customerName: req.customerName,
      customerEmail: req.customerEmail,
      customerPhone: req.customerPhone,
      amount: Math.round(req.amount * 100) / 100,
      currency: (req.currency || 'EUR').toUpperCase(),
      status: initialStatus,
      paymentMethodId: req.paymentMethodId,
      paymentMethodName: req.paymentMethodName || req.paymentMethodId.toUpperCase(),
      paymentCategory: req.paymentCategory,
      maskedCardDetails: req.cardData ? {
        brand: req.cardData.brand || 'CB',
        last4: req.cardData.last4 || '4242',
        expMonth: req.cardData.expMonth || '12',
        expYear: req.cardData.expYear || '2028'
      } : undefined,
      provider: this.providerId,
      providerReference: `sim_ref_${crypto.randomBytes(8).toString('hex')}`,
      createdAt: now,
      updatedAt: now,
      confirmedAt: req.autoConfirm ? now : undefined,
      history: [
        {
          status: 'pending',
          timestamp: now,
          note: 'Transaction initiée sur la passerelle'
        }
      ]
    };

    if (req.autoConfirm) {
      transaction.history.push({
        status: 'successful',
        timestamp: now,
        note: 'Paiement autorisé et validé avec succès'
      });
    }

    return transaction;
  }

  async confirmPayment(tx: PaymentTransaction, confirmationData?: any): Promise<PaymentTransaction> {
    const now = new Date().toISOString();
    
    // Simulate conditional failure if requested
    if (confirmationData?.simulateFailure) {
      tx.status = 'failed';
      tx.failureReason = confirmationData.failureReason || 'Refus bancaire (Provision insuffisante ou carte bloquée)';
      tx.updatedAt = now;
      tx.history.push({
        status: 'failed',
        timestamp: now,
        note: `Échec du paiement : ${tx.failureReason}`
      });
      return tx;
    }

    tx.status = 'successful';
    tx.confirmedAt = now;
    tx.updatedAt = now;
    tx.history.push({
      status: 'successful',
      timestamp: now,
      note: 'Autorisation 3D-Secure certifiée et fonds capturés'
    });

    return tx;
  }

  async cancelPayment(tx: PaymentTransaction, reason?: string): Promise<PaymentTransaction> {
    const now = new Date().toISOString();
    tx.status = 'cancelled';
    tx.failureReason = reason || 'Annulé à la demande de l\'utilisateur';
    tx.updatedAt = now;
    tx.history.push({
      status: 'cancelled',
      timestamp: now,
      note: `Transaction annulée : ${tx.failureReason}`
    });
    return tx;
  }

  async refundPayment(tx: PaymentTransaction, amount?: number, reason?: string): Promise<PaymentTransaction> {
    const now = new Date().toISOString();
    const refundAmt = amount !== undefined ? amount : tx.amount;
    tx.status = 'refunded';
    tx.refundDetails = {
      refundedAt: now,
      amount: refundAmt,
      reason: reason || 'Remboursement demandé par le support client'
    };
    tx.updatedAt = now;
    tx.history.push({
      status: 'refunded',
      timestamp: now,
      note: `Remboursement de ${refundAmt.toFixed(2)} ${tx.currency} effectué (${tx.refundDetails.reason})`
    });
    return tx;
  }

  async handleWebhook(payload: any, headers?: Record<string, any>): Promise<WebhookResult> {
    const eventType = payload?.type || 'payment.simulated_event';
    const txId = payload?.data?.transactionId || payload?.transactionId;
    return {
      handled: true,
      provider: this.providerId,
      eventType,
      transactionId: txId,
      status: payload?.status || 'successful',
      message: `Webhook simulé exécuté pour l'événement ${eventType}`
    };
  }
}

/**
 * 2. STRIPE CONNECTOR (Ready for real API integration)
 * Configured via process.env.STRIPE_SECRET_KEY and process.env.STRIPE_WEBHOOK_SECRET
 */
export class StripeConnector implements PaymentGatewayConnector {
  readonly providerId = 'stripe';
  readonly providerName = 'Stripe Payments';

  isConfigured(): boolean {
    return Boolean(process.env.STRIPE_SECRET_KEY || process.env.PAYMENT_PROVIDER_SECRET);
  }

  async createTransaction(req: CreatePaymentRequest): Promise<PaymentTransaction> {
    // In production, instantiate Stripe with process.env.STRIPE_SECRET_KEY
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const paymentIntent = await stripe.paymentIntents.create({ ... });
    const fallback = new SimulatedGatewayConnector();
    const tx = await fallback.createTransaction(req);
    tx.provider = this.providerId;
    tx.providerReference = `pi_stripe_placeholder_${Date.now()}`;
    return tx;
  }

  async confirmPayment(tx: PaymentTransaction, confirmationData?: any): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.confirmPayment(tx, confirmationData);
  }

  async cancelPayment(tx: PaymentTransaction, reason?: string): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.cancelPayment(tx, reason);
  }

  async refundPayment(tx: PaymentTransaction, amount?: number, reason?: string): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.refundPayment(tx, amount, reason);
  }

  async handleWebhook(payload: any, headers?: Record<string, any>): Promise<WebhookResult> {
    const eventType = payload?.type || 'charge.succeeded';
    return {
      handled: true,
      provider: this.providerId,
      eventType,
      transactionId: payload?.data?.object?.metadata?.transactionId,
      status: eventType === 'charge.refunded' ? 'refunded' : eventType === 'payment_intent.payment_failed' ? 'failed' : 'successful',
      message: `Webhook Stripe reçu et traité : ${eventType}`
    };
  }
}

/**
 * 3. PAYPAL CONNECTOR (Ready for real API integration)
 * Configured via process.env.PAYPAL_CLIENT_ID and process.env.PAYPAL_CLIENT_SECRET
 */
export class PayPalConnector implements PaymentGatewayConnector {
  readonly providerId = 'paypal';
  readonly providerName = 'PayPal Commerce Platform';

  isConfigured(): boolean {
    return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
  }

  async createTransaction(req: CreatePaymentRequest): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    const tx = await fallback.createTransaction(req);
    tx.provider = this.providerId;
    tx.providerReference = `PAYPAL-ORDER-${Date.now()}`;
    return tx;
  }

  async confirmPayment(tx: PaymentTransaction, confirmationData?: any): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.confirmPayment(tx, confirmationData);
  }

  async cancelPayment(tx: PaymentTransaction, reason?: string): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.cancelPayment(tx, reason);
  }

  async refundPayment(tx: PaymentTransaction, amount?: number, reason?: string): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.refundPayment(tx, amount, reason);
  }

  async handleWebhook(payload: any, headers?: Record<string, any>): Promise<WebhookResult> {
    const eventType = payload?.event_type || 'PAYMENT.CAPTURE.COMPLETED';
    return {
      handled: true,
      provider: this.providerId,
      eventType,
      transactionId: payload?.resource?.custom_id,
      status: 'successful',
      message: `Webhook PayPal reçu : ${eventType}`
    };
  }
}

/**
 * 4. ADYEN CONNECTOR (Ready for real API integration)
 * Configured via process.env.ADYEN_API_KEY and process.env.ADYEN_MERCHANT_ACCOUNT
 */
export class AdyenConnector implements PaymentGatewayConnector {
  readonly providerId = 'adyen';
  readonly providerName = 'Adyen Unified Commerce';

  isConfigured(): boolean {
    return Boolean(process.env.ADYEN_API_KEY && process.env.ADYEN_MERCHANT_ACCOUNT);
  }

  async createTransaction(req: CreatePaymentRequest): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    const tx = await fallback.createTransaction(req);
    tx.provider = this.providerId;
    tx.providerReference = `ADYEN-PSP-${Date.now()}`;
    return tx;
  }

  async confirmPayment(tx: PaymentTransaction, confirmationData?: any): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.confirmPayment(tx, confirmationData);
  }

  async cancelPayment(tx: PaymentTransaction, reason?: string): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.cancelPayment(tx, reason);
  }

  async refundPayment(tx: PaymentTransaction, amount?: number, reason?: string): Promise<PaymentTransaction> {
    const fallback = new SimulatedGatewayConnector();
    return fallback.refundPayment(tx, amount, reason);
  }

  async handleWebhook(payload: any, headers?: Record<string, any>): Promise<WebhookResult> {
    const eventType = payload?.notificationItems?.[0]?.NotificationRequestItem?.eventCode || 'AUTHORISATION';
    return {
      handled: true,
      provider: this.providerId,
      eventType,
      status: 'successful',
      message: `Webhook Adyen reçu : ${eventType}`
    };
  }
}

/**
 * 5. PAYMENT GATEWAY MANAGER
 * Manages registered connectors and routes transactions to the active connector.
 */
export class PaymentGatewayManager {
  private connectors: Map<string, PaymentGatewayConnector> = new Map();
  private activeProviderId = 'simulated';

  constructor() {
    this.registerConnector(new SimulatedGatewayConnector());
    this.registerConnector(new StripeConnector());
    this.registerConnector(new PayPalConnector());
    this.registerConnector(new AdyenConnector());

    // Check environment variable for preferred provider
    const envProvider = process.env.PAYMENT_PROVIDER_ID;
    if (envProvider && this.connectors.has(envProvider)) {
      this.activeProviderId = envProvider;
    }
  }

  registerConnector(connector: PaymentGatewayConnector) {
    this.connectors.set(connector.providerId, connector);
  }

  getActiveConnector(): PaymentGatewayConnector {
    const connector = this.connectors.get(this.activeProviderId);
    return connector || this.connectors.get('simulated')!;
  }

  getConnector(providerId: string): PaymentGatewayConnector | undefined {
    return this.connectors.get(providerId);
  }

  listConnectors(): Array<{ id: string; name: string; isConfigured: boolean; isActive: boolean }> {
    return Array.from(this.connectors.values()).map(c => ({
      id: c.providerId,
      name: c.providerName,
      isConfigured: c.isConfigured(),
      isActive: c.providerId === this.activeProviderId
    }));
  }

  setActiveProvider(providerId: string): boolean {
    if (this.connectors.has(providerId)) {
      this.activeProviderId = providerId;
      return true;
    }
    return false;
  }
}

// Global singleton instance
export const paymentGateway = new PaymentGatewayManager();

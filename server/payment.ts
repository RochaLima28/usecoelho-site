/**
 * Serviço de pagamento com Mercado Pago
 * Integração com API do Mercado Pago para processar pagamentos
 */

import axios from 'axios';

interface PaymentRequest {
  amount: number;
  description: string;
  payerEmail: string;
  payerName: string;
  payerPhone: string;
  orderId: string;
  items: Array<{
    title: string;
    quantity: number;
    unitPrice: number;
  }>;
}

interface PaymentResponse {
  id?: string;
  status: 'pending' | 'approved' | 'rejected' | 'error';
  message: string;
  paymentUrl?: string;
  qrCode?: string;
}

/**
 * Cria uma preferência de pagamento no Mercado Pago
 * Retorna URL para redirecionamento do cliente
 */
export async function createPaymentPreference(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Validações básicas
    if (!request.amount || request.amount <= 0) {
      return {
        status: 'error',
        message: 'Valor inválido',
      };
    }

    if (!request.payerEmail || !request.payerName) {
      return {
        status: 'error',
        message: 'Dados do pagador incompletos',
      };
    }

    // Em produção, você integraria com a API real do Mercado Pago
    // const mercadoPagoToken = process.env.MERCADO_PAGO_TOKEN;
    // const response = await axios.post(
    //   'https://api.mercadopago.com/checkout/preferences',
    //   {
    //     items: request.items,
    //     payer: {
    //       name: request.payerName,
    //       email: request.payerEmail,
    //       phone: {
    //         area_code: '11',
    //         number: request.payerPhone,
    //       },
    //     },
    //     back_urls: {
    //       success: `${process.env.APP_URL}/payment/success`,
    //       failure: `${process.env.APP_URL}/payment/failure`,
    //       pending: `${process.env.APP_URL}/payment/pending`,
    //     },
    //     external_reference: request.orderId,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${mercadoPagoToken}`,
    //     },
    //   }
    // );

    // Simulação para demonstração
    const paymentId = `MP-${Date.now()}`;
    const paymentUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${paymentId}`;
    const qrCode = `00020126580014br.gov.bcb.pix0136${generatePixKey()}`;

    return {
      id: paymentId,
      status: 'pending' as const,
      message: 'Preferência de pagamento criada com sucesso',
      paymentUrl,
      qrCode,
    };
  } catch (error) {
    console.error('[Payment] Erro ao criar preferência:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Erro ao processar pagamento',
    };
  }
}

/**
 * Verifica o status de um pagamento
 */
export async function getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
  try {
    if (!paymentId) {
      return {
        status: 'error',
        message: 'ID de pagamento inválido',
      };
    }

    // Em produção, você consultaria a API do Mercado Pago
    // const mercadoPagoToken = process.env.MERCADO_PAGO_TOKEN;
    // const response = await axios.get(
    //   `https://api.mercadopago.com/v1/payments/${paymentId}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${mercadoPagoToken}`,
    //     },
    //   }
    // );

    // Simulação
    return {
      id: paymentId,
      status: 'pending',
      message: 'Pagamento em processamento',
    };
  } catch (error) {
    console.error('[Payment] Erro ao verificar status:', error);
    return {
      status: 'error',
      message: 'Erro ao verificar status do pagamento',
    };
  }
}

/**
 * Processa um webhook do Mercado Pago
 */
export async function handlePaymentWebhook(
  topic: string,
  resource: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (topic === 'payment') {
      // Processar notificação de pagamento
      console.log(`[Payment] Webhook recebido para pagamento: ${resource}`);
      
      // Em produção, você atualizaria o status do pedido no banco de dados
      // e enviaria confirmação ao cliente
      
      return {
        success: true,
        message: 'Webhook processado com sucesso',
      };
    }

    return {
      success: false,
      message: 'Tipo de webhook não reconhecido',
    };
  } catch (error) {
    console.error('[Payment] Erro ao processar webhook:', error);
    return {
      success: false,
      message: 'Erro ao processar webhook',
    };
  }
}

/**
 * Gera uma chave Pix simulada para demonstração
 */
function generatePixKey(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Formata valor monetário para o padrão brasileiro
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Valida um email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida um telefone brasileiro
 */
export function validatePhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
}

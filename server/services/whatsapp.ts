/**
 * Serviço de notificação via WhatsApp usando Twilio
 * Envia mensagem ao admin quando um novo pedido é criado.
 */

import twilio from 'twilio';
import { ENV } from '../_core/env';

export interface OrderNotificationData {
  orderId: number;
  total: string | number;
  customerName: string;
  customerPhone?: string | null;
  items: Array<{
    name: string;
    quantity: number;
    price: string | number;
  }>;
}

/**
 * Monta a mensagem de WhatsApp para o admin.
 */
export function buildAdminOrderMessage(order: OrderNotificationData): string {
  const totalFormatted =
    typeof order.total === 'number'
      ? order.total.toFixed(2)
      : parseFloat(order.total).toFixed(2);

  const itemLines = order.items
    .map((item) => {
      const priceFormatted =
        typeof item.price === 'number'
          ? item.price.toFixed(2)
          : parseFloat(item.price).toFixed(2);
      return `  - ${item.name} x${item.quantity} (R$ ${priceFormatted} un.)`;
    })
    .join('\n');

  const contactLine = order.customerPhone
    ? `\nContato: ${order.customerPhone}`
    : '';

  return (
    `🛒 *Novo Pedido Recebido!*\n` +
    `\n` +
    `*Pedido #${order.orderId}*\n` +
    `Cliente: ${order.customerName}${contactLine}\n` +
    `\n` +
    `*Itens:*\n` +
    `${itemLines || '  (sem itens)'}\n` +
    `\n` +
    `*Total: R$ ${totalFormatted}*`
  );
}

/**
 * Envia notificação de novo pedido para o admin via WhatsApp (Twilio).
 * Falhas de envio são registradas, mas não propagadas — o checkout continua.
 */
export async function sendAdminNewOrderWhatsApp(
  order: OrderNotificationData
): Promise<void> {
  const { twilioAccountSid, twilioAuthToken, twilioWhatsappNumber, ownerWhatsappNumber } =
    ENV;

  if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsappNumber || !ownerWhatsappNumber) {
    console.warn(
      '[WhatsApp] Variáveis de ambiente Twilio não configuradas. Envio de notificação ignorado.',
      {
        hasSid: Boolean(twilioAccountSid),
        hasToken: Boolean(twilioAuthToken),
        hasWhatsappNumber: Boolean(twilioWhatsappNumber),
        hasOwnerNumber: Boolean(ownerWhatsappNumber),
      }
    );
    return;
  }

  const body = buildAdminOrderMessage(order);

  try {
    const client = twilio(twilioAccountSid, twilioAuthToken);
    const message = await client.messages.create({
      from: `whatsapp:${twilioWhatsappNumber}`,
      to: `whatsapp:${ownerWhatsappNumber}`,
      body,
    });
    console.log(`[WhatsApp] Notificação enviada ao admin. SID: ${message.sid}`);
  } catch (error) {
    console.error('[WhatsApp] Falha ao enviar notificação ao admin:', {
      orderId: order.orderId,
      error: error instanceof Error ? error.message : String(error),
    });
    // Não re-lança o erro — falha de notificação não deve bloquear o checkout.
  }
}

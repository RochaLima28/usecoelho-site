import nodemailer from 'nodemailer';
import { ENV } from './_core/env';

// Configurar transporter de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENV.mercadoPagoEmail,
    pass: process.env.GMAIL_APP_PASSWORD || '', // Você precisa gerar uma senha de app no Gmail
  },
});

export interface OrderEmailData {
  customerName: string;
  customerEmail: string;
  orderId: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  trackingNumber?: string;
}

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  const itemsList = data.items
    .map((item) => `<li>${item.name} x${item.quantity} - R$ ${item.price.toFixed(2)}</li>`)
    .join('');

  const htmlContent = `
    <h2>Pedido Confirmado!</h2>
    <p>Olá ${data.customerName},</p>
    <p>Seu pedido foi confirmado com sucesso!</p>
    
    <h3>Detalhes do Pedido:</h3>
    <p><strong>ID do Pedido:</strong> ${data.orderId}</p>
    
    <h3>Itens:</h3>
    <ul>${itemsList}</ul>
    
    <p><strong>Total:</strong> R$ ${data.total.toFixed(2)}</p>
    
    <p>Você receberá um email de confirmação de pagamento em breve.</p>
    <p>Obrigado por comprar na UseCoelhoBR!</p>
  `;

  try {
    await transporter.sendMail({
      from: ENV.mercadoPagoEmail,
      to: data.customerEmail,
      subject: `Pedido Confirmado - ${data.orderId}`,
      html: htmlContent,
    });
    console.log(`[Email] Confirmação de pedido enviada para ${data.customerEmail}`);
  } catch (error) {
    console.error('[Email] Erro ao enviar confirmação de pedido:', error);
  }
}

export async function sendPaymentConfirmationEmail(data: OrderEmailData) {
  const htmlContent = `
    <h2>Pagamento Confirmado!</h2>
    <p>Olá ${data.customerName},</p>
    <p>Seu pagamento foi processado com sucesso!</p>
    
    <h3>Detalhes do Pedido:</h3>
    <p><strong>ID do Pedido:</strong> ${data.orderId}</p>
    <p><strong>Total Pago:</strong> R$ ${data.total.toFixed(2)}</p>
    
    <p>Seu pedido será preparado e enviado em breve. Você receberá um email com o código de rastreamento.</p>
    <p>Obrigado por comprar na UseCoelhoBR!</p>
  `;

  try {
    await transporter.sendMail({
      from: ENV.mercadoPagoEmail,
      to: data.customerEmail,
      subject: `Pagamento Confirmado - ${data.orderId}`,
      html: htmlContent,
    });
    console.log(`[Email] Confirmação de pagamento enviada para ${data.customerEmail}`);
  } catch (error) {
    console.error('[Email] Erro ao enviar confirmação de pagamento:', error);
  }
}

export async function sendShippingNotificationEmail(
  customerEmail: string,
  customerName: string,
  orderId: string,
  trackingNumber: string,
  carrier: string
) {
  const htmlContent = `
    <h2>Seu Pedido Foi Enviado!</h2>
    <p>Olá ${customerName},</p>
    <p>Seu pedido foi despachado e está a caminho!</p>
    
    <h3>Detalhes do Rastreamento:</h3>
    <p><strong>ID do Pedido:</strong> ${orderId}</p>
    <p><strong>Código de Rastreamento:</strong> ${trackingNumber}</p>
    <p><strong>Transportadora:</strong> ${carrier}</p>
    
    <p>Você pode acompanhar seu pedido em tempo real acessando sua conta na UseCoelhoBR.</p>
    <p>Obrigado por comprar na UseCoelhoBR!</p>
  `;

  try {
    await transporter.sendMail({
      from: ENV.mercadoPagoEmail,
      to: customerEmail,
      subject: `Seu Pedido Foi Enviado - ${orderId}`,
      html: htmlContent,
    });
    console.log(`[Email] Notificação de envio enviada para ${customerEmail}`);
  } catch (error) {
    console.error('[Email] Erro ao enviar notificação de envio:', error);
  }
}

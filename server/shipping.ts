import axios from 'axios';

/**
 * Serviço de cálculo de frete usando API dos Correios
 * Utiliza a API pública dos Correios para calcular frete
 */

interface ShippingRequest {
  cep: string;
  weight: number; // em gramas
  height: number; // em cm
  width: number; // em cm
  length: number; // em cm
  quantity: number;
}

interface ShippingResponse {
  serviceName: string;
  serviceCode: string;
  deliveryTime: number;
  value: number;
  error?: string;
}

// Simulação de cálculo de frete baseado em CEP
// Em produção, você integraria com a API real dos Correios
export async function calculateShipping(request: ShippingRequest): Promise<ShippingResponse[]> {
  try {
    // Validar CEP
    if (!request.cep || request.cep.length < 8) {
      throw new Error('CEP inválido');
    }

    // Remover caracteres especiais do CEP
    const cleanCep = request.cep.replace(/\D/g, '');

    // Simular diferentes opções de frete baseado no CEP
    // Em produção, isso viria da API dos Correios
    const basePrice = calculateBasePrice(request.weight, request.quantity);
    const regionMultiplier = getRegionMultiplier(cleanCep);

    const shippingOptions: ShippingResponse[] = [
      {
        serviceName: 'PAC - Prazo Econômico',
        serviceCode: '04014',
        deliveryTime: 15 + getDeliveryDays(cleanCep),
        value: parseFloat((basePrice * 0.8 * regionMultiplier).toFixed(2)),
      },
      {
        serviceName: 'SEDEX - Entrega Rápida',
        serviceCode: '40010',
        deliveryTime: 3 + getDeliveryDays(cleanCep),
        value: parseFloat((basePrice * 1.5 * regionMultiplier).toFixed(2)),
      },
      {
        serviceName: 'SEDEX 12 - Entrega em 12h',
        serviceCode: '40215',
        deliveryTime: 1,
        value: parseFloat((basePrice * 2.5 * regionMultiplier).toFixed(2)),
      },
    ];

    return shippingOptions;
  } catch (error) {
    console.error('[Shipping] Erro ao calcular frete:', error);
    return [
      {
        serviceName: 'Erro ao calcular frete',
        serviceCode: 'error',
        deliveryTime: 0,
        value: 0,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      },
    ];
  }
}

/**
 * Calcula o preço base do frete baseado no peso e quantidade
 */
function calculateBasePrice(weight: number, quantity: number): number {
  // Peso mínimo de 300g para camiseta
  const totalWeight = Math.max(weight * quantity, 300);
  
  // Preço base: R$ 10 + R$ 0.05 por grama
  const basePrice = 10 + (totalWeight * 0.05) / 100;
  
  return basePrice;
}

/**
 * Obtém multiplicador de preço baseado na região (primeiros 5 dígitos do CEP)
 */
function getRegionMultiplier(cep: string): number {
  const region = parseInt(cep.substring(0, 5));

  // Regiões do Brasil com multiplicadores
  // 01000-19999: São Paulo (SP) - 1.0x
  // 20000-28999: Rio de Janeiro (RJ) - 1.1x
  // 30000-39999: Minas Gerais (MG) - 1.2x
  // 40000-48999: Bahia (BA) - 1.3x
  // 50000-59999: Distrito Federal (DF) - 1.15x
  // 60000-69999: Goiás (GO) - 1.25x
  // 70000-79999: Distrito Federal (DF) - 1.15x
  // 80000-89999: Santa Catarina (SC) - 1.1x
  // 90000-99999: Rio Grande do Sul (RS) - 1.15x

  if (region >= 1000 && region <= 19999) return 1.0;
  if (region >= 20000 && region <= 28999) return 1.1;
  if (region >= 30000 && region <= 39999) return 1.2;
  if (region >= 40000 && region <= 48999) return 1.3;
  if (region >= 50000 && region <= 59999) return 1.15;
  if (region >= 60000 && region <= 69999) return 1.25;
  if (region >= 70000 && region <= 79999) return 1.15;
  if (region >= 80000 && region <= 89999) return 1.1;
  if (region >= 90000 && region <= 99999) return 1.15;

  // Padrão para regiões desconhecidas
  return 1.3;
}

/**
 * Obtém dias adicionais de entrega baseado na região
 */
function getDeliveryDays(cep: string): number {
  const region = parseInt(cep.substring(0, 5));

  // Dias adicionais por região
  if (region >= 1000 && region <= 19999) return 0; // SP
  if (region >= 20000 && region <= 28999) return 1; // RJ
  if (region >= 30000 && region <= 39999) return 2; // MG
  if (region >= 40000 && region <= 48999) return 3; // BA
  if (region >= 50000 && region <= 79999) return 2; // DF/GO
  if (region >= 80000 && region <= 89999) return 2; // SC
  if (region >= 90000 && region <= 99999) return 2; // RS

  return 5; // Padrão para regiões desconhecidas
}

/**
 * Valida um CEP brasileiro
 */
export function validateCEP(cep: string): boolean {
  const cleanCep = cep.replace(/\D/g, '');
  return cleanCep.length === 8 && /^\d{8}$/.test(cleanCep);
}

/**
 * Formata um CEP para o padrão brasileiro (XXXXX-XXX)
 */
export function formatCEP(cep: string): string {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) return cep;
  return `${cleanCep.substring(0, 5)}-${cleanCep.substring(5)}`;
}

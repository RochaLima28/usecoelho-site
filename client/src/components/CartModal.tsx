import { useState } from 'react';
import { X, Trash2, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
}: CartModalProps) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [selectedShippingOption, setSelectedShippingOption] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });

  const shippingMutation = trpc.shipping.calculateShipping.useMutation();
  const paymentMutation = trpc.payment.createPaymentPreference.useMutation();

  // Calcular desconto progressivo (3% a partir de 7 unidades)
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const hasDiscount = totalQuantity >= 7;
  const discountPercent = hasDiscount ? 3 : 0;

  // Calcular subtotal
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount + shippingCost;

  const handleCalculateShipping = async () => {
    if (!customerData.zipcode) {
      alert('Por favor, preencha o CEP');
      return;
    }

    setLoadingShipping(true);
    try {
      console.log('Iniciando calculo de frete com CEP:', customerData.zipcode);
      const result = await shippingMutation.mutateAsync({
        cep: customerData.zipcode,
        weight: 200,
        height: 30,
        width: 20,
        length: 10,
        quantity: totalQuantity,
      });

      console.log('Resultado do frete:', result);
      if (result.success && result.options && result.options.length > 0) {
        setShippingOptions(result.options);
        setSelectedShippingOption(result.options[0]?.serviceCode || null);
        setShippingCost(result.options[0]?.value || 0);
        alert('Frete calculado com sucesso!');
      } else {
        alert('Erro ao calcular frete: ' + (result.error || 'Desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      alert('Erro ao calcular frete: ' + (error instanceof Error ? error.message : 'Desconhecido'));
    } finally {
      setLoadingShipping(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedShippingOption) {
      alert('Por favor, selecione uma opcao de frete');
      return;
    }

    try {
      console.log('Iniciando pagamento com dados:', { amount: total, email: customerData.email });
      const result = await paymentMutation.mutateAsync({
        amount: total,
        description: `Pedido UseCoelhoBR - ${items.length} item(ns)`,
        payerEmail: customerData.email,
        payerName: customerData.name,
        payerPhone: customerData.phone,
        orderId: `ORD-${Date.now()}`,
        items: items.map(item => ({
          title: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
        })),
      });

      console.log('Resultado do pagamento:', result);
      if (result.success && 'paymentUrl' in result && result.paymentUrl) {
        window.location.href = result.paymentUrl;
      } else if ('error' in result) {
        alert(result.error || 'Erro ao processar pagamento');
      } else {
        alert('Erro ao processar pagamento');
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento: ' + (error instanceof Error ? error.message : 'Desconhecido'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-8 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {!isCheckout ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Carrinho de Compras</h2>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg mb-4">Seu carrinho esta vazio</p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-2 text-gray-600 hover:text-gray-900"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 text-gray-900 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-900"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold text-gray-900 w-24 text-right">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>

                      <button
                        onClick={() => onRemoveItem?.(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Discount Info */}
                {hasDiscount && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                    <p className="text-green-700 font-semibold">
                      Desconto de 3% aplicado! ({totalQuantity} unidades)
                    </p>
                  </div>
                )}

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {hasDiscount && (
                    <div className="flex justify-between text-green-700 font-semibold">
                      <span>Desconto (3%):</span>
                      <span>-R$ {discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Frete:</span>
                    <span>R$ {shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                  <button
                    onClick={() => setIsCheckout(true)}
                    className="flex-1 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Ir para Checkout
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={customerData.name}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={customerData.email}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  value={customerData.phone}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereco
                </label>
                <input
                  type="text"
                  required
                  value={customerData.address}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, address: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
              </div>

              {/* City, State, Zipcode */}
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Cidade"
                  required
                  value={customerData.city}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, city: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
                <input
                  type="text"
                  placeholder="Estado"
                  required
                  value={customerData.state}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, state: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
                <input
                  type="text"
                  placeholder="CEP"
                  required
                  value={customerData.zipcode}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, zipcode: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                />
              </div>

              {/* Calculate Shipping */}
              <button
                type="button"
                onClick={handleCalculateShipping}
                disabled={loadingShipping}
                className="w-full px-4 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {loadingShipping ? (
                  <>
                    <Loader2 className="inline mr-2 animate-spin" />
                    Calculando Frete...
                  </>
                ) : (
                  'Calcular Frete'
                )}
              </button>

              {/* Shipping Options */}
              {shippingOptions.length > 0 && (
                <div className="border border-gray-300 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Opcoes de Frete:</h3>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <label key={option.serviceCode} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.serviceCode}
                          checked={selectedShippingOption === option.serviceCode}
                          onChange={() => {
                            setSelectedShippingOption(option.serviceCode);
                            setShippingCost(option.value);
                          }}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{option.serviceName}</p>
                          <p className="text-sm text-gray-600">{option.deliveryTime} dias uteis</p>
                        </div>
                        <p className="font-semibold text-gray-900">R$ {option.value.toFixed(2)}</p>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 my-6">
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                {hasDiscount && (
                  <div className="flex justify-between text-green-700 font-semibold mb-2">
                    <span>Desconto (3%):</span>
                    <span>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Frete:</span>
                  <span>R$ {shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsCheckout(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={paymentMutation.isPending}
                  className="flex-1 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {paymentMutation.isPending ? (
                    <>
                      <Loader2 className="inline mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    'Finalizar Pedido'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

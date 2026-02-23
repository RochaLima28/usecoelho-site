import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Package, Truck, MapPin, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import { useState } from "react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered";
  items: Array<{ name: string; quantity: number; price: number }>;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
}

// Dados simulados de pedidos
const mockOrders: Order[] = [
  {
    id: "PED-001",
    date: "2026-02-20",
    total: 77.70,
    status: "shipped",
    items: [
      { name: "Camiseta Casual Básica Preta", quantity: 3, price: 25.90 },
    ],
    trackingNumber: "AA123456789BR",
    carrier: "Correios",
    estimatedDelivery: "2026-02-25",
  },
  {
    id: "PED-002",
    date: "2026-02-18",
    total: 51.80,
    status: "delivered",
    items: [
      { name: "Camiseta Casual Básica Azul", quantity: 2, price: 25.90 },
    ],
    trackingNumber: "AA987654321BR",
    carrier: "Sedex",
    estimatedDelivery: "2026-02-22",
  },
];

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pendente" },
  paid: { bg: "bg-blue-100", text: "text-blue-800", label: "Pago" },
  shipped: { bg: "bg-purple-100", text: "text-purple-800", label: "Enviado" },
  delivered: { bg: "bg-green-100", text: "text-green-800", label: "Entregue" },
};

export default function CustomerDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartCount={0} onCartClick={() => {}} onLoginClick={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Você precisa fazer login para acessar sua conta</p>
            <Button onClick={() => setLocation("/")} className="bg-gray-900 text-white">
              Voltar para Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header cartCount={0} onCartClick={() => {}} onLoginClick={() => {}} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Voltar
          </Button>
          <h1 className="text-4xl font-bold text-gray-900">Minha Conta</h1>
          <p className="text-gray-600 mt-2">Bem-vindo, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações do Cliente */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informações Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Nome</p>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Membro desde</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Lista de Pedidos */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Pedidos</h2>

            {selectedOrder ? (
              <Card className="p-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedOrder(null)}
                  className="mb-4 flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  Voltar aos Pedidos
                </Button>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pedido {selectedOrder.id}</h3>
                    <p className="text-gray-600 mt-1">
                      {new Date(selectedOrder.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Status do Pedido</h4>
                    <div
                      className={`inline-block px-4 py-2 rounded-full ${
                        statusColors[selectedOrder.status].bg
                      } ${statusColors[selectedOrder.status].text}`}
                    >
                      {statusColors[selectedOrder.status].label}
                    </div>
                  </div>

                  {/* Itens */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Itens do Pedido</h4>
                    <div className="space-y-2">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-gray-900">Total</p>
                      <p className="text-lg font-bold text-gray-900">R$ {selectedOrder.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Rastreamento */}
                  {selectedOrder.status === "shipped" && selectedOrder.trackingNumber && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Truck size={20} />
                        Rastreamento
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-gray-600">Código de Rastreamento</p>
                          <p className="font-mono font-bold text-gray-900">
                            {selectedOrder.trackingNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Transportadora</p>
                          <p className="font-semibold text-gray-900">{selectedOrder.carrier}</p>
                        </div>
                        {selectedOrder.estimatedDelivery && (
                          <div>
                            <p className="text-sm text-gray-600">Entrega Estimada</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(selectedOrder.estimatedDelivery).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedOrder.status === "delivered" && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800 font-semibold flex items-center gap-2">
                        <Package size={20} />
                        Pedido Entregue
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {mockOrders.length > 0 ? (
                  mockOrders.map((order) => (
                    <Card
                      key={order.id}
                      className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString("pt-BR")}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.items.length} item{order.items.length > 1 ? "ns" : ""}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-gray-900">R$ {order.total.toFixed(2)}</p>
                          <div
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                              statusColors[order.status].bg
                            } ${statusColors[order.status].text}`}
                          >
                            {statusColors[order.status].label}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-8 text-center">
                    <Package size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">Você ainda não fez nenhum pedido</p>
                    <Button
                      onClick={() => setLocation("/")}
                      className="mt-4 bg-gray-900 text-white"
                    >
                      Explorar Produtos
                    </Button>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

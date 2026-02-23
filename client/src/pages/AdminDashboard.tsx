import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package, ShoppingCart, CreditCard, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Verificar se é admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você não tem permissão para acessar o painel de administração.</p>
        </div>
      </div>
    );
  }

  // Queries
  const dashboardStats = trpc.admin.getDashboardStats.useQuery();
  const allOrders = trpc.admin.getAllOrders.useQuery();
  const allPayments = trpc.admin.getAllPayments.useQuery();
  const allInventory = trpc.admin.getAllInventory.useQuery();
  const lowStockItems = trpc.admin.getLowStockItems.useQuery();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
          <p className="text-gray-600 mt-2">Bem-vindo, {user?.name}</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
            <TabsTrigger value="estoque">Estoque</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total de Pedidos</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats.data?.totalOrders || 0}
                    </p>
                  </div>
                  <ShoppingCart className="w-10 h-10 text-blue-500" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pedidos Pendentes</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats.data?.pendingOrders || 0}
                    </p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-yellow-500" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Receita Total</p>
                    <p className="text-3xl font-bold text-gray-900">
                      R$ {(dashboardStats.data?.totalRevenue || 0).toFixed(2)}
                    </p>
                  </div>
                  <CreditCard className="w-10 h-10 text-green-500" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Baixo Estoque</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardStats.data?.lowStockCount || 0}
                    </p>
                  </div>
                  <Package className="w-10 h-10 text-red-500" />
                </div>
              </Card>
            </div>

            {/* Chart */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Resumo de Vendas</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Pedidos', value: dashboardStats.data?.totalOrders || 0 },
                  { name: 'Pendentes', value: dashboardStats.data?.pendingOrders || 0 },
                  { name: 'Pagamentos Aprovados', value: dashboardStats.data?.approvedPayments || 0 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          {/* Pedidos Tab */}
          <TabsContent value="pedidos" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Todos os Pedidos</h3>
              {allOrders.isLoading ? (
                <p className="text-gray-600">Carregando pedidos...</p>
              ) : allOrders.data && allOrders.data.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Cliente</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Total</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.data.map((order: any) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">#{order.id}</td>
                          <td className="px-4 py-2">{order.customerName}</td>
                          <td className="px-4 py-2">{order.customerEmail}</td>
                          <td className="px-4 py-2 font-semibold">R$ {parseFloat(order.total).toFixed(2)}</td>
                          <td className="px-4 py-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">Nenhum pedido encontrado.</p>
              )}
            </Card>
          </TabsContent>

          {/* Pagamentos Tab */}
          <TabsContent value="pagamentos" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Histórico de Pagamentos</h3>
              {allPayments.isLoading ? (
                <p className="text-gray-600">Carregando pagamentos...</p>
              ) : allPayments.data && allPayments.data.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Pedido</th>
                        <th className="px-4 py-2 text-left">Valor</th>
                        <th className="px-4 py-2 text-left">Método</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPayments.data.map((payment: any) => (
                        <tr key={payment.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">#{payment.id}</td>
                          <td className="px-4 py-2">#{payment.orderId}</td>
                          <td className="px-4 py-2 font-semibold">R$ {parseFloat(payment.amount).toFixed(2)}</td>
                          <td className="px-4 py-2 capitalize">{payment.method.replace('_', ' ')}</td>
                          <td className="px-4 py-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              payment.status === 'approved' ? 'bg-green-100 text-green-800' :
                              payment.status === 'declined' ? 'bg-red-100 text-red-800' :
                              payment.status === 'refunded' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{new Date(payment.createdAt).toLocaleDateString('pt-BR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">Nenhum pagamento encontrado.</p>
              )}
            </Card>
          </TabsContent>

          {/* Estoque Tab */}
          <TabsContent value="estoque" className="space-y-6">
            {/* Alertas de Baixo Estoque */}
            {lowStockItems.data && lowStockItems.data.length > 0 && (
              <Card className="p-6 border-red-200 bg-red-50">
                <h3 className="text-lg font-semibold mb-4 text-red-900">Alertas de Baixo Estoque</h3>
                <div className="space-y-2">
                  {lowStockItems.data.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-white rounded border border-red-200">
                      <div>
                        <p className="font-semibold">Produto ID: {item.productId} - Tamanho: {item.size}</p>
                        <p className="text-sm text-gray-600">Quantidade: {item.quantity} (Mínimo: {item.minQuantity})</p>
                      </div>
                      <Button variant="outline" size="sm">Atualizar</Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Tabela de Estoque */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Controle de Estoque</h3>
              {allInventory.isLoading ? (
                <p className="text-gray-600">Carregando estoque...</p>
              ) : allInventory.data && allInventory.data.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Produto</th>
                        <th className="px-4 py-2 text-left">Tamanho</th>
                        <th className="px-4 py-2 text-left">Quantidade</th>
                        <th className="px-4 py-2 text-left">Mínimo</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allInventory.data.map((item: any) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">Produto #{item.productId}</td>
                          <td className="px-4 py-2 font-semibold">{item.size}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">{item.minQuantity}</td>
                          <td className="px-4 py-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.quantity >= item.minQuantity ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.quantity >= item.minQuantity ? 'OK' : 'Baixo'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">Nenhum item de estoque encontrado.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

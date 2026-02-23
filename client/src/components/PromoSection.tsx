import { TrendingUp } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-gray-900"></div>
              <span className="text-sm font-bold tracking-widest text-gray-700 uppercase">Atacado</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Preços Especiais para Compras em Quantidade
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Aproveite nossos preços exclusivos no atacado e revenda com margem de lucro. Quanto maior a quantidade, maior o desconto!
            </p>
            
            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                { icon: '✓', text: 'Desconto progressivo de 3% a partir de 7 peças' },
                { icon: '✓', text: 'Frete grátis para pedidos acima de R$ 500' },
                { icon: '✓', text: 'Prazo de pagamento flexível' },
                { icon: '✓', text: 'Suporte dedicado para revenda' },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-gray-900 font-bold text-lg">{benefit.icon}</span>
                  <span className="text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Solicitar Orçamento
            </button>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '500+', label: 'Clientes Satisfeitos' },
              { number: '10K+', label: 'Peças Vendidas' },
              { number: '3%', label: 'Desconto Mínimo' },
              { number: '24h', label: 'Resposta Rápida' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { TrendingUp } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-amber-900/20 to-amber-700/20 border-y border-border">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-700"></div>
              <span className="text-sm font-bold tracking-widest text-amber-500 uppercase">Atacado</span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Preços Especiais para Compras em Quantidade
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Aproveite nossos preços exclusivos no atacado e revenda com margem de lucro. Quanto maior a quantidade, maior o desconto!
            </p>
            
            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {[
                { icon: '✓', text: 'Descontos progressivos a partir de 10 peças' },
                { icon: '✓', text: 'Frete grátis para pedidos acima de R$ 500' },
                { icon: '✓', text: 'Prazo de pagamento flexível' },
                { icon: '✓', text: 'Suporte dedicado para revenda' },
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-amber-500 font-bold text-lg">{benefit.icon}</span>
                  <span className="text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>

            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold tracking-wider uppercase rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Solicitar Orçamento
            </button>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: '500+', label: 'Clientes Satisfeitos' },
              { number: '10K+', label: 'Peças Vendidas' },
              { number: '50%', label: 'Desconto Máximo' },
              { number: '24h', label: 'Resposta Rápida' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-card border border-border rounded-lg hover:border-amber-500/50 transition-all duration-300 text-center"
              >
                <div
                  className="text-3xl md:text-4xl font-bold text-amber-500 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

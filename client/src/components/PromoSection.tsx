export default function PromoSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Text */}
          <div>
            <div className="line-accent mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Compre no Atacado
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Comprando acima de 10 peças, você garante o melhor preço de atacado com desconto de até 20% em toda a coleção.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Preços Especiais</h4>
                  <p className="text-foreground/70">Desconto progressivo conforme a quantidade</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Frete Otimizado</h4>
                  <p className="text-foreground/70">Envios mais econômicos para grandes quantidades</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Suporte Dedicado</h4>
                  <p className="text-foreground/70">Atendimento personalizado para pedidos em volume</p>
                </div>
              </div>
            </div>

            <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">
              Solicitar Cotação
            </button>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <img
              src="https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-3_1771857934000_na1fn_YWJzdHJhY3QtcGF0dGVybg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80"
              alt="Padrão abstrato"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

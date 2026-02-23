export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-4_1771857941000_na1fn_Y29sbGVjdGlvbi1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80)',
        }}
      >
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      {/* Content */}
      <div className="container relative py-24 md:py-32">
        <div className="max-w-2xl">
          <div className="line-accent mb-6"></div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Moda Essencial para Você
          </h1>
          
          <p className="text-lg text-foreground/80 mb-8 max-w-xl leading-relaxed">
            Descubra nossa coleção de camisetas básicas, moletons confortáveis e peças versáteis que combinam qualidade, conforto e estilo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity duration-300">
              Explorar Coleção
            </button>
            <button className="px-8 py-3 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-foreground hover:text-background transition-colors duration-300">
              Ver Promoções
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

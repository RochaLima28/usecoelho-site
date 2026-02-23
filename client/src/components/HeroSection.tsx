export default function HeroSection() {
  return (
    <section className="relative w-full bg-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-8">
            <div className="w-1 h-16 bg-gray-900 mb-6"></div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Moda Essencial
            </h1>
            <h2 className="text-4xl md:text-5xl font-light text-gray-600 mb-8">
              para Você
            </h2>
          </div>
          
          <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed">
            Descubra nossa coleção premium de camisetas básicas, moletons confortáveis e peças versáteis que combinam qualidade, conforto e estilo.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-16">
            <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-lg">
              EXPLORAR COLEÇÃO
            </button>
            <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300">
              VER PROMOÇÕES
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm mb-3">Scroll para explorar</p>
            <svg className="w-6 h-6 text-gray-400 animate-bounce mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

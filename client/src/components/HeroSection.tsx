import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-3_1771859195000_na1fn_aGVyby1iYW5uZXItZmFzaGlvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center py-32">
        {/* Decorative Line */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
        </div>

        {/* Main Heading */}
        <h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Moda Essencial
          <br />
          <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
            para Você
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Descubra nossa coleção premium de camisetas básicas, moletons confortáveis e peças versáteis que combinam qualidade, conforto e estilo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold tracking-wider uppercase rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            Explorar Coleção
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 border-2 border-amber-400 text-amber-300 font-semibold tracking-wider uppercase rounded-lg hover:bg-amber-500/10 transition-all duration-300">
            Ver Promoções
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-300">Scroll para explorar</span>
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

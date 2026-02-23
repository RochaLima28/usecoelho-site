import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marina Silva',
      role: 'Proprietária de Loja',
      text: 'Excelente qualidade e preços competitivos. Meus clientes adoram as camisetas UseCoelho!',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'João Santos',
      role: 'Influenciador Digital',
      text: 'O conforto e o design são incríveis. Recomendo para todos os meus seguidores!',
      rating: 5,
      avatar: '👨‍💼'
    },
    {
      name: 'Ana Costa',
      role: 'Vendedora de Moda',
      text: 'Melhor fornecedor que já trabalhei. Entrega rápida e atendimento impecável.',
      rating: 5,
      avatar: '👩‍🎨'
    },
    {
      name: 'Pedro Oliveira',
      role: 'Empresário',
      text: 'Qualidade premium com preço justo. UseCoelho é minha primeira escolha!',
      rating: 5,
      avatar: '👨‍💼'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background border-t border-border">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-700"></div>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              O Que Dizem Sobre Nós
            </h2>
            <div className="w-12 h-1 bg-gradient-to-l from-amber-500 to-amber-700"></div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de clientes satisfeitos confiam na UseCoelho
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 bg-card border border-border rounded-lg hover:border-amber-500/50 transition-all duration-300 group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Junte-se a milhares de clientes satisfeitos</p>
          <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold tracking-wider uppercase rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-105">
            Fazer Primeiro Pedido
          </button>
        </div>
      </div>
    </section>
  );
}

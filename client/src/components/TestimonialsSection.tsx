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
    <section className="py-16 md:py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            O Que Dizem Sobre Nós
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Milhares de clientes satisfeitos confiam na UseCoelho
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gray-900 text-gray-900" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Junte-se a milhares de clientes satisfeitos
          </h3>
          <button className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300">
            Fazer Primeiro Pedido
          </button>
        </div>
      </div>
    </section>
  );
}

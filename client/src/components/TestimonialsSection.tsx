import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'João Aparecido',
    date: '21/08/2023',
    rating: 5,
    text: 'Camiseta de ótima qualidade, não encolhe. Puro algodão.'
  },
  {
    id: '2',
    name: 'Lino Junkes',
    date: '10/10/2023',
    rating: 5,
    text: 'Excelente produto. Ótimo acabamento. Ótima modelagem. Preço benefício bastante justo. Ótimo atendimento. Chegou antes do prazo.'
  },
  {
    id: '3',
    name: 'Victor Campos',
    date: '24/05/2024',
    rating: 5,
    text: 'Exatamente como nas fotos. Tenho 1,82m e 72 Kg, o tamanho M ficou perfeito.'
  },
  {
    id: '4',
    name: 'Joel de Moraes Guimarães',
    date: '19/04/2024',
    rating: 5,
    text: 'Tecido ótimo, produto muito bom, recomendo'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="line-accent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Confira os depoimentos de clientes satisfeitos com nossos produtos e serviço
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 md:p-8 bg-secondary rounded-lg border border-border hover:border-accent transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

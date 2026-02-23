import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-700 rounded flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M50 15 L65 35 L70 25 L75 35 L80 15 L85 40 Q85 50 75 55 Q65 60 50 60 Q35 60 25 55 Q15 50 15 40 L20 15 L30 25 L35 35 L50 15 Z M50 65 Q60 65 65 70 Q70 75 70 85 L30 85 Q30 75 35 70 Q40 65 50 65 Z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground" style={{fontFamily: "'Playfair Display', serif"}}>UseCoelho</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Moda essencial com qualidade, conforto e estilo. Camisetas, moletons e peças versáteis para todos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Mais Vendidos
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Masculino
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Coleção
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-amber-500 transition-colors">
                  Promoções
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:contato@usecoelho.com" className="flex items-center gap-2 text-muted-foreground hover:text-amber-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  contato@usecoelho.com
                </a>
              </li>
              <li>
                <a href="tel:+5511999999999" className="flex items-center gap-2 text-muted-foreground hover:text-amber-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Receba promoções exclusivas e lançamentos em seu email
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 UseCoelho. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-500 transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Termos de Serviço
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors">
              Trocas e Devoluções
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

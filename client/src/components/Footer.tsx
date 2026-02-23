import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334899587/hjqTfFXmaGgynfhc.png" 
                alt="UseCoelho" 
                className="h-8 w-8 invert"
              />
              <span className="text-xl font-bold font-display">UseCoelho</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Moda essencial com qualidade, conforto e estilo. Camisetas, moletons e peças versáteis para todos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  Mais Vendidos
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  Masculino
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  Feminino
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-background transition-colors">
                  Promoções
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Atendimento</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:contato@usecoelho.com" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                  <Mail className="w-4 h-4" />
                  contato@usecoelho.com
                </a>
              </li>
              <li>
                <a href="tel:+5511999999999" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                  <Phone className="w-4 h-4" />
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Novidades</h4>
            <p className="text-background/70 text-sm mb-4">
              Receba promoções exclusivas e lançamentos em seu email
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-3 py-2 bg-background/20 text-background placeholder-background/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="px-4 py-2 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 my-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
          <p>&copy; 2026 UseCoelho. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Termos de Serviço
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Trocas e Devoluções
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

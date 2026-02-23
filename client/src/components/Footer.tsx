export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
                <img 
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334899587/zaEDQJOQByxwOKps.png" 
                  alt="UseCoelhoBR" 
                  className="w-6 h-6"
                />
              </div>
              <span className="text-xl font-bold text-gray-900">UseCoelhoBR</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Moda essencial com qualidade, conforto e estilo. Camisetas, moletons e peças versáteis para todos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Mais Vendidos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Masculino
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Coleção
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Promoções
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contato@usecoelho.com" className="text-gray-600 hover:text-gray-900 transition-colors">
                  contato@usecoelho.com
                </a>
              </li>
              <li>
                <a href="tel:+5511999999999" className="text-gray-600 hover:text-gray-900 transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Newsletter</h4>
            <p className="text-gray-600 text-sm mb-4">
              Receba as novidades e promoções exclusivas.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
              />
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm">
                Enviar
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © 2026 UseCoelhoBR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

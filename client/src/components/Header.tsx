import { useState } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-center py-2 text-sm font-medium tracking-wide">
        Ganhe 5% OFF comprando no PIX • Frete grátis acima de R$ 150
      </div>

      {/* Main header */}
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 transform hover:scale-105">
            <svg
              viewBox="0 0 100 100"
              className="h-10 w-10 text-white"
              fill="currentColor"
            >
              <path d="M50 15 L65 35 L70 25 L75 35 L80 15 L85 40 Q85 50 75 55 Q65 60 50 60 Q35 60 25 55 Q15 50 15 40 L20 15 L30 25 L35 35 L50 15 Z M50 65 Q60 65 65 70 Q70 75 70 85 L30 85 Q30 75 35 70 Q40 65 50 65 Z" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-amber-500 tracking-widest uppercase">Use</span>
            <span className="text-3xl font-bold text-foreground" style={{fontFamily: "'Playfair Display', serif"}}>Coelho</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-amber-500 transition-colors duration-300 font-medium relative group">
            Mais Vendidos
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="text-foreground hover:text-amber-500 transition-colors duration-300 font-medium relative group">
            Masculino
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="text-foreground hover:text-amber-500 transition-colors duration-300 font-medium relative group">
            Coleção
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-700 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300 hover:text-amber-500">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300 relative hover:text-amber-500">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-xs rounded-full flex items-center justify-center font-bold">
              0
            </span>
          </button>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-secondary">
          <div className="container py-4 flex flex-col gap-4">
            <a href="#" className="text-foreground hover:text-amber-500 transition-colors font-medium">
              Mais Vendidos
            </a>
            <a href="#" className="text-foreground hover:text-amber-500 transition-colors font-medium">
              Masculino
            </a>
            <a href="#" className="text-foreground hover:text-amber-500 transition-colors font-medium">
              Coleção
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

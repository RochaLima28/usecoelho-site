import { useState } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top banner */}
      <div className="bg-accent text-accent-foreground text-center py-2 text-sm font-medium">
        Ganhe 5% OFF comprando no PIX • Frete grátis acima de R$ 150
      </div>

      {/* Main header */}
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-accent rounded-lg hover:opacity-90 transition-opacity">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334899587/hjqTfFXmaGgynfhc.png" 
              alt="UseCoelho" 
              className="h-12 w-12"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">Use</span>
            <span className="text-3xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>Coelho</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
            Mais Vendidos
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
            Masculino
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors duration-300 font-medium">
            Coleção
          </a>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors duration-300 relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
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
            <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
              Mais Vendidos
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
              Masculino
            </a>
            <a href="#" className="text-foreground hover:text-accent transition-colors font-medium">
              Coleção
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

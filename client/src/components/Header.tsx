import { useState } from 'react';
import { Menu, X, ShoppingCart, LogIn, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';

interface HeaderProps {
  cartCount?: number;
  onCartClick?: () => void;
  onLoginClick?: () => void;
}

export default function Header({ cartCount = 0, onCartClick, onLoginClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top banner */}
      <div className="bg-gray-900 text-white text-center py-2 text-sm font-medium">
        Ganhe 5% OFF comprando no PIX • Frete grátis acima de R$ 150
      </div>

      {/* Main header */}
      <nav className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-2 bg-gray-900 rounded-lg">
            <img 
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663334899587/zaEDQJOQByxwOKps.png" 
              alt="UseCoelhoBR" 
              className="h-8 w-8"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-gray-600 tracking-widest">USE</span>
            <span className="text-xl font-bold text-gray-900">CoelhoBR</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Mais Vendidos
          </Link>
          <Link href="/masculino" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Masculino
          </Link>
          <Link href="/colecao" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
            Coleção
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {user?.role === 'admin' && (
            <Link href="/admin" className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium">
              <Settings className="w-4 h-4" />
              Admin
            </Link>
          )}
          
          {user && (
            <Link href="/minha-conta" className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium">
              <LogIn className="w-4 h-4" />
              Minha Conta
            </Link>
          )}
          
          {!user && (
            <button 
              onClick={onLoginClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          )}
          
          <button 
            onClick={onCartClick}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative text-gray-700 hover:text-gray-900"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
              Mais Vendidos
            </Link>
            <Link href="/masculino" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
              Masculino
            </Link>
            <Link href="/colecao" className="text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
              Coleção
            </Link>
            {user?.role === 'admin' && (
              <Link href="/admin" className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium py-2">
                <Settings className="w-4 h-4" />
                Admin
              </Link>
            )}
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium py-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

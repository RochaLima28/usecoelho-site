import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  image: string;
  badge?: string;
  onAddToCart?: (id: string, quantity: number) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  wholesalePrice,
  image,
  badge,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(id, quantity);
    }
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/produto/${id}`}>
        <div className="relative overflow-hidden bg-gray-100 h-80 md:h-96 cursor-pointer">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs font-bold tracking-wider uppercase rounded-full">
                {badge}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 md:p-6">
        <Link href={`/produto/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-gray-700 cursor-pointer">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-bold text-gray-900">
              R$ {price.toFixed(2)}
            </span>
            {wholesalePrice && (
              <span className="text-sm text-gray-500 line-through">
                R$ {(price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          {wholesalePrice && (
            <p className="text-xs text-gray-600">
              Preço no Atacado: R$ {wholesalePrice.toFixed(2)}
            </p>
          )}
        </div>

        {/* Quantity and Add to Cart */}
        <div className="flex gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              −
            </button>
            <span className="px-4 py-2 text-gray-900 font-medium">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

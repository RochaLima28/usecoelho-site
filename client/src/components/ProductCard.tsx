import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  image: string;
  badge?: string;
}

export default function ProductCard({
  name,
  price,
  wholesalePrice,
  image,
  badge,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-card border border-border hover:border-amber-500/50 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted h-80 md:h-96">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-700 text-white text-xs font-bold tracking-wider uppercase rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>

        {/* Add to Cart Button */}
        <button
          className={`absolute bottom-4 left-4 right-4 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          Adicionar
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 md:p-6">
        <h3 className="text-sm md:text-base font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-amber-500 transition-colors duration-300">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 fill-amber-500 text-amber-500"
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(24)</span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-bold text-foreground">
              R$ {price.toFixed(2)}
            </span>
            {wholesalePrice && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {(price * 1.2).toFixed(2)}
              </span>
            )}
          </div>
          {wholesalePrice && (
            <p className="text-xs text-amber-500 font-semibold">
              Preço no Atacado: R$ {wholesalePrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

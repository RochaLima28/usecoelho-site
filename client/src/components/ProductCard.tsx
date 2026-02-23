import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  image: string;
  discount?: number;
  badge?: string;
}

export default function ProductCard({
  name,
  price,
  wholesalePrice,
  image,
  discount,
  badge
}: ProductCardProps) {
  return (
    <div className="group">
      {/* Image container */}
      <div className="relative overflow-hidden rounded-lg bg-secondary mb-4 aspect-square">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 badge-accent">
            {badge}
          </div>
        )}
        
        {/* Discount badge */}
        {discount && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}

        {/* Hover overlay with button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <button className="flex items-center gap-2 px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            <ShoppingBag className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>

      {/* Product info */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
          {name}
        </h3>
        
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            R$ {price.toFixed(2)}
          </span>
          {discount && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {(price / (1 - discount / 100)).toFixed(2)}
            </span>
          )}
        </div>

        {wholesalePrice && (
          <p className="text-xs text-muted-foreground mt-2">
            Preço no Atacado: R$ {wholesalePrice.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

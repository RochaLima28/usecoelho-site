import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  image: string;
  badge?: string;
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onAddToCart?: (productId: string, quantity: number) => void;
}

export default function ProductSection({ title, subtitle, products, onAddToCart }: ProductSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-12 bg-gray-900"></div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                {title}
              </h2>
              {subtitle && (
                <p className="text-gray-600 mt-2 text-lg">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

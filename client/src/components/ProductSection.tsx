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
}

export default function ProductSection({ title, subtitle, products }: ProductSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background border-t border-border">
      <div className="container">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-amber-700"></div>
            <h2
              className="text-4xl md:text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  wholesalePrice?: number;
  image: string;
  discount?: number;
  badge?: string;
}

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

export default function ProductSection({ title, subtitle, products }: ProductSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="mb-12">
          <div className="line-accent mb-4"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-foreground/70 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

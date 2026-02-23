import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import PromoSection from '@/components/PromoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
  const bestsellerProducts = [
    {
      id: '1',
      name: 'Camiseta Masculina Básica Lisa Preta',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
      badge: 'Mais Vendido'
    },
    {
      id: '2',
      name: 'Camiseta Masculina Básica Lisa Azul Marinho',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
      badge: 'Mais Vendido'
    },
    {
      id: '3',
      name: 'Jaqueta Corta Vento Masculina Com Zíper Preto',
      price: 54.70,
      wholesalePrice: 43.76,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '4',
      name: 'Camiseta Dryfit Masculina - Preto',
      price: 26.01,
      wholesalePrice: 20.81,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    }
  ];

  const moletonProducts = [
    {
      id: '5',
      name: 'Blusa De Moletom Masculino Canguru Vermelho',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-2_1771857944000_na1fn_aGVyby1tb2xldG9t.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '6',
      name: 'Blusa De Moletom Masculino Canguru Rosa',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-2_1771857944000_na1fn_aGVyby1tb2xldG9t.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '7',
      name: 'Blusa De Moletom Masculino Canguru Azul',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-2_1771857944000_na1fn_aGVyby1tb2xldG9t.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '8',
      name: 'Blusa De Moletom Masculino Canguru Preto',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-2_1771857944000_na1fn_aGVyby1tb2xldG9t.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    }
  ];

  const oversizedProducts = [
    {
      id: '9',
      name: 'Camiseta Masculina Oversized Preta',
      price: 33.21,
      wholesalePrice: 26.57,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '10',
      name: 'Camiseta Masculina Oversized Marrom',
      price: 33.21,
      wholesalePrice: 26.57,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '11',
      name: 'Camiseta Masculina Oversized Mostarda',
      price: 33.21,
      wholesalePrice: 26.57,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '12',
      name: 'Camiseta Masculina Oversized Branca',
      price: 33.21,
      wholesalePrice: 26.57,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/w3EfzujVhf9Ir1EYyWGT7Y-img-1_1771857939000_na1fn_aGVyby1jYW1pc2V0YQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductSection
          title="Mais Vendidos"
          subtitle="Descubra as peças mais procuradas pelos nossos clientes"
          products={bestsellerProducts}
        />
        <ProductSection
          title="Moletons Canguru"
          subtitle="Conforto e estilo em uma única peça"
          products={moletonProducts}
        />
        <ProductSection
          title="Coleção Oversized"
          subtitle="Corte amplo e moderno para um visual descontraído"
          products={oversizedProducts}
        />
        <PromoSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

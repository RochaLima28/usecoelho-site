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
      name: 'Camiseta Casual Básica Preta Premium',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-1_1771859191000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1wcmV0YS1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
      badge: 'Mais Vendido'
    },
    {
      id: '2',
      name: 'Camiseta Casual Básica Azul Marinho',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-2_1771859188000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1henVsLWhlcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
      badge: 'Mais Vendido'
    },
    {
      id: '3',
      name: 'Camiseta Premium Preta - Corte Moderno',
      price: 29.90,
      wholesalePrice: 23.92,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-1_1771859191000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1wcmV0YS1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '4',
      name: 'Camiseta Premium Azul - Corte Moderno',
      price: 29.90,
      wholesalePrice: 23.92,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-2_1771859188000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1henVsLWhlcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    }
  ];

  const collectionProducts = [
    {
      id: '5',
      name: 'Camiseta Oversized Preta Luxo',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-1_1771859191000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1wcmV0YS1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '6',
      name: 'Camiseta Oversized Azul Luxo',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-2_1771859188000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1henVsLWhlcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '7',
      name: 'Camiseta Oversized Preta Premium',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-1_1771859191000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1wcmV0YS1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '8',
      name: 'Camiseta Oversized Azul Premium',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/wqUEneKlAB1ykfGublsiU5-img-2_1771859188000_na1fn_Y2FtaXNldGEtcHJlbWl1bS1henVsLWhlcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
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
        <PromoSection />
        <ProductSection
          title="Coleção Premium"
          subtitle="Peças exclusivas com design sofisticado e qualidade superior"
          products={collectionProducts}
        />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

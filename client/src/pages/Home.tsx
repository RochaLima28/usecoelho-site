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
      name: 'Camiseta Casual Básica Preta',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-1_1771858903000_na1fn_Y2FtaXNldGEtcHJldGEtY2FiaWRlaXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
      badge: 'Mais Vendido'
    },
    {
      id: '2',
      name: 'Camiseta Casual Básica Azul Marinho',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-2_1771858900000_na1fn_Y2FtaXNldGEtYXp1bC1jYWJpZGVpcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80',
      badge: 'Mais Vendido'
    },
    {
      id: '3',
      name: 'Camiseta Casual Preta - Corte Moderno',
      price: 29.90,
      wholesalePrice: 23.92,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-3_1771858903000_na1fn_Y2FtaXNldGEtcHJldGEtY2FiaWRlaXJvLTI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '4',
      name: 'Camiseta Casual Azul - Corte Moderno',
      price: 29.90,
      wholesalePrice: 23.92,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-4_1771858902000_na1fn_Y2FtaXNldGEtYXp1bC1jYWJpZGVpcm8tMg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    }
  ];

  const moletonProducts = [
    {
      id: '5',
      name: 'Blusa De Moletom Masculino Canguru Vermelho',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-1_1771858903000_na1fn_Y2FtaXNldGEtcHJldGEtY2FiaWRlaXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '6',
      name: 'Blusa De Moletom Masculino Canguru Rosa',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-2_1771858900000_na1fn_Y2FtaXNldGEtYXp1bC1jYWJpZGVpcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '7',
      name: 'Blusa De Moletom Masculino Canguru Azul',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-3_1771858903000_na1fn_Y2FtaXNldGEtcHJldGEtY2FiaWRlaXJvLTI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '8',
      name: 'Blusa De Moletom Masculino Canguru Preto',
      price: 76.41,
      wholesalePrice: 61.13,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-4_1771858902000_na1fn_Y2FtaXNldGEtYXp1bC1jYWJpZGVpcm8tMg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    }
  ];

  const oversizedProducts = [
    {
      id: '9',
      name: 'Camiseta Casual Oversized Preta',
      price: 33.21,
      wholesalePrice: 26.57,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-1_1771858903000_na1fn_Y2FtaXNldGEtcHJldGEtY2FiaWRlaXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '10',
      name: 'Camiseta Casual Oversized Azul',
      price: 33.21,
      wholesalePrice: 26.57,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-2_1771858900000_na1fn_Y2FtaXNldGEtYXp1bC1jYWJpZGVpcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '11',
      name: 'Camiseta Casual Oversized Preta Premium',
      price: 37.90,
      wholesalePrice: 30.32,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-3_1771858903000_na1fn_Y2FtaXNldGEtcHJldGEtY2FiaWRlaXJvLTI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
    },
    {
      id: '12',
      name: 'Camiseta Casual Oversized Azul Premium',
      price: 37.90,
      wholesalePrice: 30.32,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/JE2HAJXqTIlL83cD7Ub7V1-img-4_1771858902000_na1fn_Y2FtaXNldGEtYXp1bC1jYWJpZGVpcm8tMg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80'
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
          title="Coleção Casual"
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

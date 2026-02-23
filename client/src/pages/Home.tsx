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
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/ZXHFLWjNqibgauv3m285It-img-1_1771859705000_na1fn_Y2FtaXNldGEtcHJldGEtMQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L1pYSEZMV2pOcWliZ2F1djNtMjg1SXQtaW1nLTFfMTc3MTg1OTcwNTAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRjSEpsZEdFdE1RLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=t15T2PH4K8h5HJjWfWm4EDn9D7fWLg1gHa1OnVe-TopO~nO52JPKmLCl-ud40z9JeZ7MaRJ24xo71XezSVhTtuAdwwR5w0OCvLaIdgH~71Ft2LSZ37i1D~-enl35RhK-SaMuvmoJT10A0lPPdvpEsUrf3wfJFlg70YeQwXz7n2I~5FS4PAOPwogQbXircO-HHaMnVFBwKuV9feCiRHbl-Y7B9S~1OP1n9SaPHSo4lRRDoD0LA879gewGTkiao5p7~huyMc632aF~PnWzQBW2axjooCxkN5DJAwBCY3NAL-HGJKmf4iCmZfhcdmR53v86mwzAr98TV5jehjjFlH5qMw__',
      badge: 'Mais Vendido'
    },
    {
      id: '2',
      name: 'Camiseta Casual Básica Azul Marinho',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/ZXHFLWjNqibgauv3m285It-img-2_1771859703000_na1fn_Y2FtaXNldGEtYXp1bC0x.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L1pYSEZMV2pOcWliZ2F1djNtMjg1SXQtaW1nLTJfMTc3MTg1OTcwMzAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRZWHAxYkMweC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=F4Rk7-0cBfCL98njjC-Z9-LHyBXlIGEpSI5ba6a~hTD~jJKKv81wJ8cbOPHpjv1oAkrwaCq8lHQbm7smH29CLbU~AEHnfe4I5qFXcOQ9EvS7ax2AvfDxct0apkoL3aMI2lFUpnaXm0NmWSrTTtW2fZqQwlUZf8D7MMU9oLD1l2OKm6HSFJTEchHJ2JbFza9kFPVy6h800fSdu1lmwnS7wNanf2gk-UsZXEg81fkxUJb1hM9Gt-WrsV0x2a79PxRmmqQYIBV4pvpq2Gr~m~eqZkr1Dk2BjFPibXjrMH4GkLXYW5iu~6c1uWg~zyDT-WWYZ9fDvEyRUx2AdLPVMJjQZw__',
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

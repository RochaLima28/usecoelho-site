import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import PromoSection from '@/components/PromoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import LoginModal from '@/components/LoginModal';
import CartModal from '@/components/CartModal';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const bestsellerProducts = [
    {
      id: '1',
      name: 'Camiseta Casual Básica Preta',
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
      name: 'Camiseta Casual Básica Branca',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/lIyKb3OVMItOd2rKz8Qk3z-img-1_1771860080000_na1fn_Y2FtaXNldGEtYnJhbmNhLTE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L2xJeUtiM09WTUl0T2Qyckt6OFFrM3otaW1nLTFfMTc3MTg2MDA4MDAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRZbkpoYm1OaExURS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UM9nmImq2Uh4D~ihuORYfaRho12-~7iMdAbJLdnK9ms5ioO073Lehre3Ff8OQxcD-nmXdab1y3vmKisZDcwKnIm4TOraQbaij9iqPcyNuPWOKbQfRgo3Al5-djXWgzaxDBevssqKOxII8suGMrdYF9kRyzBcx4zhIw61DWjuc3Wkrvq~Jh3oxqY7uDFu9r7qjWpaj-oWGJHY0u1lfLBGNQAqadrMDAe2vvKDUnSrOqMnSjQX5y0EYySU2EEYEe19eX3szKycxjPO~82CtkN5-gZTcqlwngIyggt~ovVq2TVNFyTcDi6Zn79H~DzNYmGU1RmD~7zXb-mg7PaGtJgX2w__'
    },
    {
      id: '4',
      name: 'Camiseta Casual Básica Branca - Ângulo 2',
      price: 25.90,
      wholesalePrice: 20.72,
      image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/lIyKb3OVMItOd2rKz8Qk3z-img-2_1771860074000_na1fn_Y2FtaXNldGEtYnJhbmNhLTI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L2xJeUtiM09WTUl0T2Qyckt6OFFrM3otaW1nLTJfMTc3MTg2MDA3NDAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRZbkpoYm1OaExUSS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v7N99sRkZScEeiboS9UjytQ8-s-riv891d35roOku5EYB7uZtmQhbyijc56ETlvns0l0WM0WjZ~vLGUJmKk8qbVdOvupMGP~lrTGLpLU8HjRCfIUNetktiuJlsVC4-hdKrePjj1QNmVUdiIkwMcvz-58aFGhXkjBxM3IPSV6hsf1tI-6zaetsYDut-K9BL0qZov3a-qJ7sRU5Tf3CKDkvMRLqXrnKzOx05PMbXmD62Y3a-r~OZd3XzDaklJZqDRpTJlbjyehS3W9uYMj8a4Lsn1HBibKjaRwbHCGdTNt9bn37RtZCS44F3vIzYl0xJ9ZC4uGPcBeSW5QOOrsNWnkPg__'
    }
  ];

  const handleAddToCart = (productId: string, quantity: number) => {
    const product = bestsellerProducts.find(p => p.id === productId);
    if (product) {
      const existingItem = cartItems.find(item => item.id === productId);
      if (existingItem) {
        setCartItems(
          cartItems.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCartItems([...cartItems, {
          id: productId,
          name: product.name,
          price: product.price,
          quantity
        }]);
      }
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    alert(`Bem-vindo! Você fez login como ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        cartCount={cartItems.length}
        onCartClick={() => setShowCart(!showCart)}
        onLoginClick={() => setShowLogin(!showLogin)}
      />
      
      <main className="flex-1">
        <HeroSection />
        <ProductSection
          title="Mais Vendidos"
          subtitle="Descubra as peças mais procuradas pelos nossos clientes"
          products={bestsellerProducts}
          onAddToCart={handleAddToCart}
        />
        <PromoSection />
        <TestimonialsSection />
      </main>
      
      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />

      <CartModal
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}

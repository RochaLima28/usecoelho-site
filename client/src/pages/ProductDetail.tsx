import { useState } from 'react';
import { useRoute } from 'wouter';
import { ShoppingCart, ArrowLeft, Check } from 'lucide-react';
import Header from '@/components/Header';
import CartModal from '@/components/CartModal';

interface Product {
  id: string;
  name: string;
  price: number;
  wholesalePrice: number;
  image: string;
  badge?: string;
  color: string;
  description: string;
  benefits: string[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const products: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Camiseta Casual Básica Preta',
    price: 25.90,
    wholesalePrice: 20.72,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/ZXHFLWjNqibgauv3m285It-img-1_1771859705000_na1fn_Y2FtaXNldGEtcHJldGEtMQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L1pYSEZMV2pOcWliZ2F1djNtMjg1SXQtaW1nLTFfMTc3MTg1OTcwNTAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRjSEpsZEdFdE1RLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=t15T2PH4K8h5HJjWfWm4EDn9D7fWLg1gHa1OnVe-TopO~nO52JPKmLCl-ud40z9JeZ7MaRJ24xo71XezSVhTtuAdwwR5w0OCvLaIdgH~71Ft2LSZ37i1D~-enl35RhK-SaMuvmoJT10A0lPPdvpEsUrf3wfJFlg70YeQwXz7n2I~5FS4PAOPwogQbXircO-HHaMnVFBwKuV9feCiRHbl-Y7B9S~1OP1n9SaPHSo4lRRDoD0LA879gewGTkiao5p7~huyMc632aF~PnWzQBW2axjooCxkN5DJAwBCY3NAL-HGJKmf4iCmZfhcdmR53v86mwzAr98TV5jehjjFlH5qMw__',
    color: 'Preto',
    description: 'Camiseta casual basica de alta qualidade, perfeita para o dia a dia.',
    benefits: ['Anti odor', 'Maciez extrema', 'Menor preco do mercado', 'Sem transparencia'],
  },
  '2': {
    id: '2',
    name: 'Camiseta Casual Básica Azul Marinho',
    price: 25.90,
    wholesalePrice: 20.72,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/ZXHFLWjNqibgauv3m285It-img-2_1771859703000_na1fn_Y2FtaXNldGEtYXp1bC0x.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L1pYSEZMV2pOcWliZ2F1djNtMjg1SXQtaW1nLTJfMTc3MTg1OTcwMzAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRZWHAxYkMweC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=F4Rk7-0cBfCL98njjC-Z9-LHyBXlIGEpSI5ba6a~hTD~jJKKv81wJ8cbOPHpjv1oAkrwaCq8lHQbm7smH29CLbU~AEHnfe4I5qFXcOQ9EvS7ax2AvfDxct0apkoL3aMI2lFUpnaXm0NmWSrTTtW2fZqQwlUZf8D7MMU9oLD1l2OKm6HSFJTEchHJ2JbFza9kFPVy6h800fSdu1lmwnS7wNanf2gk-UsZXEg81fkxUJb1hM9Gt-WrsV0x2a79PxRmmqQYIBV4pvpq2Gr~m~eqZkr1Dk2BjFPibXjrMH4GkLXYW5iu~6c1uWg~zyDT-WWYZ9fDvEyRUx2AdLPVMJjQZw__',
    color: 'Azul Marinho',
    description: 'Camiseta casual basica de alta qualidade, perfeita para o dia a dia.',
    benefits: ['Anti odor', 'Maciez extrema', 'Menor preco do mercado', 'Sem transparencia'],
  },
  '3': {
    id: '3',
    name: 'Camiseta Casual Básica Branca',
    price: 25.90,
    wholesalePrice: 20.72,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/lIyKb3OVMItOd2rKz8Qk3z-img-1_1771860080000_na1fn_Y2FtaXNldGEtYnJhbmNhLTE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L2xJeUtiM09WTUl0T2Qyckt6OFFrM3otaW1nLTFfMTc3MTg2MDA4MDAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRZbkpoYm1OaExURS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UM9nmImq2Uh4D~ihuORYfaRho12-~7iMdAbJLdnK9ms5ioO073Lehre3Ff8OQxcD-nmXdab1y3vmKisZDcwKnIm4TOraQbaij9iqPcyNuPWOKbQfRgo3Al5-djXWgzaxDBevssqKOxII8suGMrdYF9kRyzBcx4zhIw61DWjuc3Wkrvq~Jh3oxqY7uDFu9r7qjWpaj-oWGJHY0u1lfLBGNQAqadrMDAe2vvKDUnSrOqMnSjQX5y0EYySU2EEYEe19eX3szKycxjPO~82CtkN5-gZTcqlwngIyggt~ovVq2TVNFyTcDi6Zn79H~DzNYmGU1RmD~7zXb-mg7PaGtJgX2w__',
    color: 'Branca',
    description: 'Camiseta casual basica de alta qualidade, perfeita para o dia a dia.',
    benefits: ['Anti odor', 'Maciez extrema', 'Menor preco do mercado', 'Sem transparencia'],
  },
  '4': {
    id: '4',
    name: 'Camiseta Casual Básica Branca - Angulo 2',
    price: 25.90,
    wholesalePrice: 20.72,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/0r6jkvqawVn7w6BI00vhuD/sandbox/lIyKb3OVMItOd2rKz8Qk3z-img-2_1771860074000_na1fn_Y2FtaXNldGEtYnJhbmNhLTI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvMHI2amt2cWF3Vm43dzZCSTAwdmh1RC9zYW5kYm94L2xJeUtiM09WTUl0T2Qyckt6OFFrM3otaW1nLTJfMTc3MTg2MDA3NDAwMF9uYTFmbl9ZMkZ0YVhObGRHRXRZbkpoYm1OaExUSS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v7N99sRkZScEeiboS9UjytQ8-s-riv891d35roOku5EYB7uZtmQhbyijc56ETlvns0l0WM0WjZ~vLGUJmKk8qbVdOvupMGP~lrTGLpLU8HjRCfIUNetktiuJlsVC4-hdKrePjj1QNmVUdiIkwMcvz-58aFGhXkjBxM3IPSV6hsf1tI-6zaetsYDut-K9BL0qZov3a-qJ7sRU5Tf3CKDkvMRLqXrnKzOx05PMbXmD62Y3a-r~OZd3XzDaklJZqDRpTJlbjyehS3W9uYMj8a4Lsn1HBibKjaRwbHCGdTNt9bn37RtZCS44F3vIzYl0xJ9ZC4uGPcBeSW5QOOrsNWnkPg__',
    color: 'Branca',
    description: 'Camiseta casual basica de alta qualidade, perfeita para o dia a dia.',
    benefits: ['Anti odor', 'Maciez extrema', 'Menor preco do mercado', 'Sem transparencia'],
  },
};

const sizes = ['P', 'M', 'G', 'GG'];

export default function ProductDetail() {
  const [, params] = useRoute('/produto/:id');
  const productId = params?.id as string;
  const product = products[productId];

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <a href="/" className="text-blue-600 hover:text-blue-700">
            Voltar para a página inicial
          </a>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor, selecione um tamanho');
      return;
    }
    
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
      }]);
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(
        cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header com navegação e carrinho */}
      <Header 
        cartCount={cartItems.length}
        onCartClick={() => setShowCart(!showCart)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.color}</p>

            {/* Benefits Banner */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Benefícios</h2>
              <div className="grid grid-cols-2 gap-4">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="font-semibold">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-4xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</p>
              <p className="text-gray-600 text-sm mt-2">Preço no atacado: R$ {product.wholesalePrice.toFixed(2)}</p>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tamanho</h3>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantidade</h3>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900"
                >
                  −
                </button>
                <span className="px-6 py-3 text-gray-900 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center gap-2 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Adicionado ao carrinho!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </>
              )}
            </button>

            {/* Description */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
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

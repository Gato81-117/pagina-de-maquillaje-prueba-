import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ShippingModal } from './components/ShippingModal';
import { products, categories } from './data';
import { Product, CartItem } from './types';
import { Sparkles, Package, Truck, ShieldCheck } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <Navbar cartItemCount={cartItemCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <Hero />

      {/* Features Section */}
      <section className="py-12 bg-white border-y border-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="font-semibold text-stone-900">Calidad Premium</h3>
              <p className="text-sm text-stone-500 mt-2">Productos seleccionados de la más alta calidad.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-4">
                <Package size={24} />
              </div>
              <h3 className="font-semibold text-stone-900">Precios de Mayoreo</h3>
              <p className="text-sm text-stone-500 mt-2">Descuentos automáticos al comprar por volumen.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-semibold text-stone-900">Envíos Seguros</h3>
              <p className="text-sm text-stone-500 mt-2">Entregas a todo el país de forma rápida y segura.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-semibold text-stone-900">Compra Protegida</h3>
              <p className="text-sm text-stone-500 mt-2">Tu satisfacción está 100% garantizada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="productos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-stone-900 serif-font mb-4">Nuestra Colección</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Explora nuestra selección de productos. Recuerda que al alcanzar el mínimo de piezas por producto, 
            el precio de mayoreo se aplicará automáticamente en tu carrito.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-4 mb-10 pb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'bg-white text-stone-600 hover:bg-rose-50 border border-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </section>

      {/* Wholesale Info Section */}
      <section id="mayoreo" className="bg-rose-900 text-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold serif-font mb-6">¿Quieres emprender tu propio negocio?</h2>
              <p className="text-rose-200 text-lg mb-6">
                En Lumina Cosmetics apoyamos a las emprendedoras. Nuestro sistema de mayoreo es simple: 
                cada producto tiene un mínimo de piezas requerido para obtener el precio especial.
              </p>
              <ul className="space-y-4 text-rose-100">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-800 flex items-center justify-center text-sm font-bold">1</div>
                  Agrega los productos a tu carrito.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-800 flex items-center justify-center text-sm font-bold">2</div>
                  Alcanza el mínimo de piezas indicado en cada producto.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-rose-800 flex items-center justify-center text-sm font-bold">3</div>
                  ¡El descuento se aplica automáticamente!
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=1200" 
                alt="Cosméticos al por mayor" 
                className="rounded-2xl shadow-2xl shadow-rose-900/50"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-white border-t border-stone-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="serif-font text-2xl font-semibold tracking-wide text-rose-900 mb-4">LUMINA</h2>
              <p className="text-stone-500 max-w-sm">
                Realzando la belleza natural de cada mujer con productos de la más alta calidad a precios accesibles.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4 uppercase tracking-wider text-sm">Enlaces Rápidos</h3>
              <ul className="space-y-3 text-stone-500">
                <li><a href="#" className="hover:text-rose-600 transition-colors">Inicio</a></li>
                <li><a href="#productos" className="hover:text-rose-600 transition-colors">Tienda</a></li>
                <li><a href="#mayoreo" className="hover:text-rose-600 transition-colors">Mayoreo</a></li>
                <li>
                  <button 
                    onClick={() => setIsShippingModalOpen(true)} 
                    className="hover:text-rose-600 transition-colors"
                  >
                    Información de Envío
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4 uppercase tracking-wider text-sm">Contacto</h3>
              <ul className="space-y-3 text-stone-500">
                <li>hola@luminacosmetics.com</li>
                <li>+52 (55) 1234-5678</li>
                <li>Ciudad de México, México</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm">© 2024 Lumina Cosmetics. Todos los derechos reservados.</p>
            <div className="flex gap-4 text-stone-400">
              <a href="#" className="hover:text-rose-600 transition-colors">Instagram</a>
              <a href="#" className="hover:text-rose-600 transition-colors">Facebook</a>
              <a href="#" className="hover:text-rose-600 transition-colors">TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onOpenShipping={() => setIsShippingModalOpen(true)}
      />

      <ShippingModal 
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
      />
    </div>
  );
}

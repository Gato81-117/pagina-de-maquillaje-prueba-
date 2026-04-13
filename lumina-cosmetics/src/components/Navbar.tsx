import React from 'react';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
}

export function Navbar({ cartItemCount, onOpenCart }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#fdfbf7]/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-stone-600 hover:text-rose-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center sm:justify-start">
            <h1 className="serif-font text-2xl font-semibold tracking-wide text-rose-900">
              LUMINA
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:space-x-8">
            <a href="#" className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">Inicio</a>
            <a href="#productos" className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">Tienda</a>
            <a href="#mayoreo" className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">Mayoreo</a>
            <a href="#contacto" className="text-sm font-medium text-stone-600 hover:text-rose-600 transition-colors">Contacto</a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-stone-600 hover:text-rose-600 transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <button 
              onClick={onOpenCart}
              className="text-stone-600 hover:text-rose-600 transition-colors relative"
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-[#fdfbf7] border-b border-rose-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-md">Inicio</a>
            <a href="#productos" className="block px-3 py-2 text-base font-medium text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-md">Tienda</a>
            <a href="#mayoreo" className="block px-3 py-2 text-base font-medium text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-md">Mayoreo</a>
            <a href="#contacto" className="block px-3 py-2 text-base font-medium text-stone-600 hover:text-rose-600 hover:bg-rose-50 rounded-md">Contacto</a>
          </div>
        </div>
      )}
    </nav>
  );
}

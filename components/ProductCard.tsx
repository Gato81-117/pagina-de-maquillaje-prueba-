import React from 'react';
import { Product } from '../types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100">
      {product.isNew && (
        <div className="absolute top-6 left-6 z-10 bg-rose-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full">
          Nuevo
        </div>
      )}
      
      <div className="relative w-full aspect-square bg-stone-50 rounded-xl overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Add to cart overlay button */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-white/90 backdrop-blur-sm text-stone-900 font-medium py-3 rounded-xl shadow-sm hover:bg-rose-600 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            <span>Agregar al carrito</span>
          </button>
        </div>
      </div>

      <div>
        <p className="text-xs text-rose-500 font-medium mb-1 uppercase tracking-wider">{product.category}</p>
        <h3 className="text-sm font-semibold text-stone-900 mb-1 line-clamp-1">{product.name}</h3>
        
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-lg font-bold text-stone-900">${product.price.toFixed(2)}</p>
            <p className="text-[10px] text-stone-500">Menudeo</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-rose-600">${product.wholesalePrice.toFixed(2)}</p>
            <p className="text-[10px] text-stone-500">Mayoreo (min. {product.wholesaleMin} pz)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onOpenShipping: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove, onOpenShipping }: CartDrawerProps) {
  const calculateItemTotal = (item: CartItem) => {
    const price = item.quantity >= item.product.wholesaleMin 
      ? item.product.wholesalePrice 
      : item.product.price;
    return price * item.quantity;
  };

  const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#fdfbf7] shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b border-rose-100">
          <h2 className="text-xl font-semibold text-stone-900 serif-font flex items-center gap-2">
            <ShoppingBag size={24} className="text-rose-600" />
            Tu Carrito
          </h2>
          <button 
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-4">
              <ShoppingBag size={48} className="text-rose-200" />
              <p>Tu carrito está vacío</p>
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-rose-50 text-rose-600 rounded-full font-medium hover:bg-rose-100 transition-colors"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => {
                const isWholesale = item.quantity >= item.product.wholesaleMin;
                const currentPrice = isWholesale ? item.product.wholesalePrice : item.product.price;
                
                return (
                  <div key={item.product.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-20 h-20 object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-semibold text-stone-900 line-clamp-2 pr-4">{item.product.name}</h3>
                          <button 
                            onClick={() => onRemove(item.product.id)}
                            className="text-stone-400 hover:text-rose-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 mt-1">
                          {isWholesale 
                            ? <span className="text-rose-600 font-medium">Precio Mayoreo aplicado</span>
                            : <span>Faltan {item.product.wholesaleMin - item.quantity} pz para mayoreo</span>
                          }
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-stone-200 rounded-full overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2 py-1 bg-stone-50 hover:bg-stone-100 text-stone-600"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2 py-1 bg-stone-50 hover:bg-stone-100 text-stone-600"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-stone-900">${(currentPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-rose-100 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600">Subtotal</span>
              <span className="text-2xl font-bold text-stone-900">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-rose-600 text-white rounded-full font-medium text-lg hover:bg-rose-700 transition-colors shadow-md shadow-rose-200 mb-4">
              Proceder al pago
            </button>
            <div className="text-center text-sm text-stone-500">
              ¿Dudas sobre el envío?{' '}
              <button 
                onClick={() => {
                  onClose();
                  onOpenShipping();
                }} 
                className="text-rose-600 font-medium hover:underline"
              >
                Ver información
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import React from 'react';
import { X, Truck, Clock, ShieldCheck } from 'lucide-react';

interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShippingModal({ isOpen, onClose }: ShippingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-[#fdfbf7] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-rose-100 bg-white">
          <h2 className="text-2xl font-semibold text-stone-900 serif-font flex items-center gap-2">
            <Truck className="text-rose-600" />
            Información de Envío
          </h2>
          <button 
            onClick={onClose} 
            className="text-stone-400 hover:text-rose-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-8">
          {/* Shipping Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Costos y Tiempos de Entrega</h3>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm hover:border-rose-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-rose-600">
                  <Truck size={20} />
                  <h4 className="font-semibold text-stone-900">Envío Estándar</h4>
                </div>
                <p className="text-stone-600 text-sm mb-3">3 a 5 días hábiles</p>
                <p className="text-2xl font-bold text-stone-900">$99.00 <span className="text-sm font-normal text-stone-500">MXN</span></p>
                <div className="mt-3 inline-block bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  ¡Gratis en compras mayores a $999!
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-stone-100 shadow-sm hover:border-rose-200 transition-colors">
                <div className="flex items-center gap-2 mb-2 text-rose-600">
                  <Clock size={20} />
                  <h4 className="font-semibold text-stone-900">Envío Exprés</h4>
                </div>
                <p className="text-stone-600 text-sm mb-3">1 a 2 días hábiles</p>
                <p className="text-2xl font-bold text-stone-900">$149.00 <span className="text-sm font-normal text-stone-500">MXN</span></p>
              </div>
            </div>

            <div className="bg-rose-50 p-5 rounded-xl border border-rose-100 mt-4">
              <h4 className="font-semibold text-rose-900 mb-2">Pedidos de Mayoreo</h4>
              <p className="text-sm text-rose-800 leading-relaxed">
                Para pedidos de mayoreo que excedan los 5kg, el costo de envío se calculará automáticamente en la pantalla de pago basándose en el peso volumétrico de tu paquete. El tiempo estimado de entrega para envíos por volumen es de <strong>3 a 7 días hábiles</strong>.
              </p>
            </div>
          </div>

          {/* Guarantee */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-stone-900">Garantía de Entrega</h3>
            <div className="flex items-start gap-3 text-sm text-stone-600 bg-white p-4 rounded-xl border border-stone-100">
              <ShieldCheck className="text-rose-500 shrink-0 mt-0.5" size={20} />
              <p className="leading-relaxed">
                Todos nuestros envíos van asegurados. Si tu paquete llega dañado o se extravía durante el trayecto, te reponemos los productos sin costo adicional. Tu inversión está 100% protegida.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-rose-100 bg-white">
          <button 
            onClick={onClose} 
            className="w-full py-3 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-colors shadow-md shadow-rose-200"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

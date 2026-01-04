import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';
import { useCart } from '../../context/CartContext';
import { X } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { region } = useRegion();
  const { addToCart, updateCartItem, cartItems } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  
  const cartItem = cartItems.find(item => item.id === product.id);
  const isInCart = !!cartItem;
  const currentCartQuantity = cartItem?.quantity || 0;

  const price = region ? product.prices[region] : null;

  const handleAddToCart = () => {
    if (!region) {
      setShowRegionModal(true);
      return;
    }
    addToCart(product, quantity);
    setQuantity(1);
  };

  const handleModify = (newQty) => {
    updateCartItem(product.id, newQty);
    setShowModifyModal(false);
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      {/* IMAGEN */}
      <div className="relative overflow-hidden bg-gray-50 h-44">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition-transform duration-300" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=BARTORI';
          }}
        />
        
        {isInCart && (
          <div className="absolute top-2 right-2 bg-[#322B80] text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            En carrito
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="p-4">
        <h3 className="font-bold text-sm mb-2 text-gray-800 line-clamp-2 min-h-[2.5rem] group-hover:text-[#322B80] transition-colors">
          {product.name}
        </h3>

        {/* PRECIO */}
        <div className="mb-3">
          {region ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#322B80]">S/ {price.toFixed(2)}</span>
              <span className="text-xs text-gray-500">por caja</span>
            </div>
          ) : (
            <p className="text-gray-400 text-xs italic">Selecciona región para ver precio</p>
          )}
        </div>

        {/* CONTROLES */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-600">Cantidad:</span>
          
          <div className="flex items-center gap-2">
            <button 
              disabled={isInCart}
              onClick={() => quantity > 1 && setQuantity(quantity - 1)} 
              className="w-7 h-7 rounded-lg border-2 border-gray-200 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all text-sm"
            >
              -
            </button>
            
            <input 
              type="number" 
              value={isInCart ? currentCartQuantity : quantity}
              readOnly={isInCart}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 1;
                if (val > 0) setQuantity(val);
              }}
              className="w-12 text-center border-2 border-gray-200 rounded-lg py-1 font-bold text-sm focus:border-[#322B80] outline-none disabled:bg-gray-50"
              disabled={isInCart}
            />

            <button 
              disabled={isInCart}
              onClick={() => setQuantity(quantity + 1)} 
              className="w-7 h-7 rounded-lg border-2 border-gray-200 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* BOTÓN */}
        {isInCart ? (
          <button 
            onClick={() => setShowModifyModal(true)}
            className="w-full bg-white border-2 border-[#322B80] text-[#322B80] hover:bg-[#322B80] hover:text-white py-2.5 rounded-lg font-bold text-sm transition-all"
          >
            Modificar Cantidad
          </button>
        ) : (
          <button 
            onClick={handleAddToCart}
            className="w-full bg-[#C12423] hover:bg-[#322B80] text-white py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg"
          >
            Agregar al Carrito
          </button>
        )}
      </div>

      {/* MODAL REGIÓN */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="bg-[#C12423] p-6 text-white rounded-t-2xl">
              <p className="font-bold text-xl">¡Atención!</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Primero debes seleccionar tu región la parte superior de la página para ver los precios y agregar productos.
              </p>
              <button 
                onClick={() => setShowRegionModal(false)} 
                className="w-full bg-[#C12423] hover:bg-[#322B80] text-white px-6 py-3 rounded-xl transition-all font-bold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL MODIFICAR */}
      {showModifyModal && (
        <ModifyQuantityModal 
          product={product} 
          currentQty={currentCartQuantity} 
          price={price}
          onClose={() => setShowModifyModal(false)} 
          onConfirm={handleModify}
        />
      )}
    </div>
  );
};

const ModifyQuantityModal = ({ product, currentQty, price, onClose, onConfirm }) => {
  const [newQty, setNewQty] = useState(currentQty);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        
        <div className="border-b border-gray-100 p-6 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-2xl text-[#322B80]">Modificar Pedido</h3>
            <p className="text-gray-500 text-sm mt-1">Ajusta la cantidad</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <img 
              src={product.image} 
              className="w-20 h-20 object-cover rounded-xl"
              alt={product.name}
            />
            <div className="flex-1">
              <p className="font-bold text-gray-800 mb-2 text-sm leading-tight">{product.name}</p>
              <p className="text-[#322B80] font-bold text-xl">S/ {price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Actual: {currentQty}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center mb-8 gap-4">
            <button 
              onClick={() => newQty > 0 && setNewQty(newQty - 1)} 
              className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white font-bold text-xl transition-all"
            >
              -
            </button>
            
            <input
              type="number"
              value={newQty}
              onChange={(e) => {
                const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                if (!isNaN(val) && val >= 0) setNewQty(val);
              }}
              onFocus={(e) => e.target.select()}
              className="w-24 text-center text-4xl font-bold text-[#322B80] border-2 border-gray-200 rounded-xl py-3 focus:border-[#322B80] outline-none"
            />
            
            <button 
              onClick={() => setNewQty(newQty + 1)} 
              className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white font-bold text-xl transition-all"
            >
              +
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-500 mb-6">
            {newQty === 0 ? 'El producto será eliminado' : `Total: ${newQty} ${newQty === 1 ? 'caja' : 'cajas'}`}
          </p>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="flex-1 text-gray-600 px-6 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition font-bold"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onConfirm(newQty)} 
              className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                newQty === 0 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-[#C12423] hover:bg-[#322B80] text-white'
              }`}
            >
              {newQty === 0 ? "Eliminar" : "Actualizar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';
import { useCart } from '../../context/CartContext';

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
    <div className="border border-gray-200 rounded-xl p-5 bg-white relative hover:shadow-xl hover:border-[#D8992F] transition-all group">
      
      {/* IMAGEN */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=BARTORI';
          }}
        />
        {isInCart && (
          <div className="absolute top-3 right-3 bg-[#C12423] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
            En carrito
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem]">
        {product.name}
      </h3>

      {/* PRECIO */}
      <div className="h-8 my-2">
        {region ? (
          <p className="text-[#C8102E] font-bold text-2xl">S/ {price.toFixed(2)}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">Selecciona región para ver precio</p>
        )}
      </div>

      {/* CONTROLES DE CANTIDAD */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button 
          disabled={isInCart}
          onClick={() => quantity > 1 && setQuantity(quantity - 1)} 
          className="w-10 h-10 bg-gray-200 rounded-full hover:bg-[#E91E8C] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg transition"
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
          className="w-20 text-center border-2 border-gray-300 rounded-lg py-2 font-bold text-lg focus:border-[#C8102E] outline-none disabled:bg-gray-100"
          disabled={isInCart}
        />

        <button 
          disabled={isInCart}
          onClick={() => setQuantity(quantity + 1)} 
          className="w-10 h-10 bg-gray-200 rounded-full hover:bg-[#E91E8C] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg transition"
        >
          +
        </button>
      </div>

      {/* BOTÓN PRINCIPAL */}
      {isInCart ? (
        <button 
          onClick={() => setShowModifyModal(true)}
          className="w-full bg-[#F7B731] text-white py-3 rounded-lg font-bold hover:bg-[#C8102E] transition shadow-md"
        >
          Modificar Cantidad
        </button>
      ) : (
        <button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-[#C8102E] to-[#E91E8C] text-white py-3 rounded-lg font-bold hover:shadow-xl transition transform hover:-translate-y-1"
        >
          Agregar al Carrito
        </button>
      )}

      {/* MODAL: ALERTA DE REGIÓN */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm animate-bounce-once">
            <p className="text-[#C8102E] font-bold text-xl mb-3">¡Espera! 🛑</p>
            <p className="text-gray-700 mb-6">
              Primero debes escoger la región en donde te encuentras para ver los precios.
            </p>
            <button 
              onClick={() => setShowRegionModal(false)} 
              className="w-full bg-[#2E3192] text-white px-6 py-3 rounded-lg hover:bg-[#C8102E] transition font-semibold"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* MODAL: MODIFICAR CANTIDAD */}
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl">
        <h3 className="font-bold text-2xl mb-6 text-[#2E3192]">Modificar Pedido</h3>
        
        <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <img 
            src={product.image} 
            className="w-20 h-20 object-cover rounded-lg shadow"
            alt={product.name}
          />
          <div className="flex-1">
            <p className="font-semibold text-gray-800 mb-1">{product.name}</p>
            <p className="text-[#C8102E] font-bold text-lg">S/ {price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Cantidad actual: {currentQty}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center mb-8 gap-6">
          <button 
            onClick={() => newQty > 0 && setNewQty(newQty - 1)} 
            className="w-12 h-12 bg-gray-200 rounded-full hover:bg-[#E91E8C] hover:text-white font-bold text-xl transition"
          >
            -
          </button>
          <span className="text-3xl font-bold text-[#C8102E] min-w-[3rem] text-center">
            {newQty}
          </span>
          <button 
            onClick={() => setNewQty(newQty + 1)} 
            className="w-12 h-12 bg-gray-200 rounded-full hover:bg-[#E91E8C] hover:text-white font-bold text-xl transition"
          >
            +
          </button>
        </div>
        
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            Cancelar
          </button>
          <button 
            onClick={() => onConfirm(newQty)} 
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              newQty === 0 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-[#C8102E] hover:bg-[#E91E8C] text-white'
            }`}
          >
            {newQty === 0 ? "Eliminar" : "Actualizar"}
          </button>
        </div>
      </div>
    </div>
  );
};
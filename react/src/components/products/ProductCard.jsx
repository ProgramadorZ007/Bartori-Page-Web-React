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
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#D8992F]">
      
      {/* IMAGEN */}
      <div className="relative overflow-hidden bg-gray-50 h-48">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=BARTORI';
          }}
        />
        
        {/* Badge en carrito */}
        {isInCart && (
          <div className="absolute top-3 right-3 bg-[#322B80] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
            En carrito
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="p-4">
        {/* Nombre del producto */}
        <h3 className="font-semibold text-base mb-2 text-gray-800 line-clamp-2 min-h-[2.8rem] group-hover:text-[#C12423] transition-colors">
          {product.name}
        </h3>

        {/* PRECIO */}
        <div className="mb-3">
          {region ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#C12423]">S/ {price.toFixed(2)}</span>
              <span className="text-xs text-gray-500">por caja</span>
            </div>
          ) : (
            <p className="text-gray-400 text-sm italic">Selecciona región para ver precio</p>
          )}
        </div>

        {/* CONTROLES DE CANTIDAD */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-gray-600">Cantidad:</span>
          
          <div className="flex items-center gap-2">
            <button 
              disabled={isInCart}
              onClick={() => quantity > 1 && setQuantity(quantity - 1)} 
              className="w-8 h-8 rounded-md border border-gray-300 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-all"
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
              className="w-14 text-center border border-gray-300 rounded-md py-1.5 font-semibold text-sm focus:border-[#322B80] outline-none disabled:bg-gray-50 disabled:text-gray-600"
              disabled={isInCart}
            />

            <button 
              disabled={isInCart}
              onClick={() => setQuantity(quantity + 1)} 
              className="w-8 h-8 rounded-md border border-gray-300 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-semibold transition-all"
            >
              +
            </button>
          </div>
        </div>

        {/* BOTÓN PRINCIPAL */}
        {isInCart ? (
          <button 
            onClick={() => setShowModifyModal(true)}
            className="w-full bg-white border border-[#322B80] text-[#322B80] hover:bg-[#322B80] hover:text-white py-2.5 rounded-md font-semibold text-sm transition-all duration-300"
          >
            Modificar Cantidad
          </button>
        ) : (
          <button 
            onClick={handleAddToCart}
            className="w-full bg-[#C12423] hover:bg-[#322B80] text-white py-2.5 rounded-md font-semibold text-sm transition-all duration-300"
          >
            Agregar al Carrito
          </button>
        )}
      </div>

      {/* MODAL: ALERTA DE REGIÓN */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full">
            <div className="bg-[#C12423] p-5 text-white rounded-t-xl">
              <p className="font-bold text-xl">¡Atención!</p>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Primero debes seleccionar tu región en el header para ver los precios correctos y poder agregar productos al carrito.
              </p>
              <button 
                onClick={() => setShowRegionModal(false)} 
                className="w-full bg-[#322B80] hover:bg-[#C12423] text-white px-6 py-3 rounded-md transition-all font-semibold"
              >
                Entendido
              </button>
            </div>
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

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value) || 0;
    if (val >= 0) setNewQty(val);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
        
        {/* Header */}
        <div className="border-b border-gray-200 p-5">
          <h3 className="font-bold text-xl text-[#322B80]">Modificar Pedido</h3>
          <p className="text-gray-500 text-sm mt-1">Ajusta la cantidad de tu producto</p>
        </div>

        <div className="p-6">
          {/* Producto info */}
          <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <img 
              src={product.image} 
              className="w-20 h-20 object-cover rounded-lg"
              alt={product.name}
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 mb-2 text-sm leading-tight">{product.name}</p>
              <p className="text-[#C12423] font-bold text-lg">S/ {price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-1">Cantidad actual: {currentQty}</p>
            </div>
          </div>
          
          {/* Controles de cantidad */}
          <div className="flex items-center justify-center mb-8 gap-4">
            <button 
              onClick={() => newQty > 0 && setNewQty(newQty - 1)} 
              className="w-10 h-10 rounded-md border-2 border-gray-300 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white font-bold text-xl transition-all"
            >
              -
            </button>
            
            <input
              type="number"
              value={newQty}
              onChange={handleInputChange}
              className="w-20 text-center text-3xl font-bold text-[#C12423] border-2 border-gray-300 rounded-md py-2 focus:border-[#322B80] outline-none"
            />
            
            <button 
              onClick={() => setNewQty(newQty + 1)} 
              className="w-10 h-10 rounded-md border-2 border-gray-300 hover:border-[#322B80] hover:bg-[#322B80] hover:text-white font-bold text-xl transition-all"
            >
              +
            </button>
          </div>
          
          <p className="text-center text-sm text-gray-500 mb-6">
            {newQty === 0 ? 'El producto será eliminado del carrito' : `Total: ${newQty} ${newQty === 1 ? 'caja' : 'cajas'}`}
          </p>
          
          {/* Botones de acción */}
          <div className="flex gap-3">
            <button 
              onClick={onClose} 
              className="flex-1 text-gray-600 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition font-semibold"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onConfirm(newQty)} 
              className={`flex-1 px-6 py-3 rounded-md font-semibold transition-all ${
                newQty === 0 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-[#322B80] hover:bg-[#C12423] text-white'
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
import { useState } from 'react';
import { useRegion } from '../../context/RegionContext';
// Importa aquí tu CartContext cuando lo crees (useCart)

export const ProductCard = ({ product }) => {
  const { region } = useRegion();
  // const { addToCart, updateCartItem, cartItems } = useCart(); // Descomentar luego
  
  // ESTADOS LOCALES
  const [quantity, setQuantity] = useState(1);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  
  // Simulación: ¿Está el producto en el carrito? (Esto vendrá del CartContext luego)
  const isInCart = false; 
  const currentCartQuantity = 0; // Esto vendría del contexto

  // LÓGICA DE PRECIO
  const price = region ? product.prices[region] : null;

  // MANEJADORES
  const handleAddToCart = () => {
    if (!region) {
      setShowRegionModal(true);
      return;
    }
    console.log(`Agregando ${quantity} del producto ${product.id}`);
    // Aquí llamarías a addToCart(product, quantity)
  };

  const handleModify = (newQty) => {
    if (newQty === 0) {
      // Eliminar del carrito
      console.log("Eliminando producto");
    } else {
      // Actualizar cantidad
      console.log("Actualizando cantidad a", newQty);
    }
    setShowModifyModal(false);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md w-64 bg-white relative">
      
      {/* 1. IMAGEN Y NOMBRE */}
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
      <h3 className="font-bold text-lg">{product.name}</h3>

      {/* 2. PRECIO (Visible solo con región) */}
      <div className="h-8 my-2">
        {region ? (
          <p className="text-green-600 font-bold">S/ {price.toFixed(2)}</p>
        ) : (
          <p className="text-gray-400 text-sm italic">Selecciona región para ver precio</p>
        )}
      </div>

      {/* 3. CONTROLES DE CANTIDAD (Deshabilitado si ya está en carrito) */}
      <div className="flex items-center justify-between mb-4">
        <button 
            disabled={isInCart}
            onClick={() => quantity > 1 && setQuantity(quantity - 1)} 
            className="px-2 bg-gray-200 rounded disabled:opacity-50"
        >-</button>
        
        <input 
          type="number" 
          value={isInCart ? currentCartQuantity : quantity} // Si está en carrito, muestra la cantidad guardada
          readOnly={isInCart} // Si está en carrito, no se edita directo
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-12 text-center border mx-2 disabled:bg-gray-100"
        />

        <button 
            disabled={isInCart}
            onClick={() => setQuantity(quantity + 1)} 
            className="px-2 bg-gray-200 rounded disabled:opacity-50"
        >+</button>
      </div>

      {/* 4. BOTÓN PRINCIPAL */}
      {isInCart ? (
        <button 
          onClick={() => setShowModifyModal(true)}
          className="w-full bg-orange-500 text-white py-2 rounded font-bold hover:bg-orange-600 transition"
        >
          Modificar Cantidad
        </button>
      ) : (
        <button 
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition shadow-lg transform hover:-translate-y-1"
        >
          Agregar al Carrito
        </button>
      )}

      {/* --- MODAL 1: ALERTA DE REGIÓN --- */}
      {showRegionModal && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg p-4 text-center z-10">
          <div className="bg-white p-4 rounded shadow-xl">
            <p className="text-red-500 font-bold mb-2">¡Espera!</p>
            <p className="text-sm mb-4">Primero debes escoger la región en donde te encuentras.</p>
            <button onClick={() => setShowRegionModal(false)} className="bg-gray-800 text-white px-4 py-1 rounded">Entendido</button>
          </div>
        </div>
      )}

      {/* --- MODAL 2: MODIFICAR CANTIDAD --- */}
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

// Subcomponente rápido para el Modal de Modificar
const ModifyQuantityModal = ({ product, currentQty, price, onClose, onConfirm }) => {
  const [newQty, setNewQty] = useState(currentQty);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h3 className="font-bold text-lg mb-4">Modificar Pedido</h3>
        <div className="flex gap-4 mb-4">
            <img src={product.image} className="w-16 h-16 object-cover rounded"/>
            <div>
                <p>{product.name}</p>
                <p className="text-green-600 font-bold">S/ {price}</p>
                <p className="text-sm text-gray-500">Cantidad actual: {currentQty}</p>
            </div>
        </div>
        
        <div className="flex items-center justify-center mb-6">
            <button onClick={() => newQty > 0 && setNewQty(newQty - 1)} className="px-3 py-1 bg-gray-200 rounded">-</button>
            <span className="mx-4 text-xl font-bold">{newQty}</span>
            <button onClick={() => setNewQty(newQty + 1)} className="px-3 py-1 bg-gray-200 rounded">+</button>
        </div>
        
        <div className="flex justify-end gap-2">
            <button onClick={onClose} className="text-gray-500 px-4 py-2">Cancelar</button>
            <button onClick={() => onConfirm(newQty)} className="bg-blue-600 text-white px-4 py-2 rounded">
                {newQty === 0 ? "Eliminar" : "Actualizar"}
            </button>
        </div>
      </div>
    </div>
  );
};
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, Send, MapPin, AlertCircle, X, AlertTriangle, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRegion } from '../context/RegionContext';

export const Cart = () => {
  const { cartItems, updateCartItem, clearCart } = useCart();
  const { region } = useRegion();
  const [showRegionWarning, setShowRegionWarning] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // ============= LÓGICA DE DESCUENTO EN BASES =============
  // Calcular total de unidades de bases
  const totalBasesUnits = cartItems
    .filter(item => item.category === 'bases')
    .reduce((sum, item) => sum + item.quantity, 0);

  // Verificar si aplica descuento (≥15 bases)
  const applyBasesDiscount = totalBasesUnits >= 15;

  // Función para obtener el precio con descuento si aplica
  const getPriceWithDiscount = (item) => {
    if (!region) return 0;
    const basePrice = item.prices[region];
    if (item.category === 'bases' && applyBasesDiscount) {
      return basePrice - 1;
    }
    return basePrice;
  };

  // Calcular total con descuento aplicado
  const calculateTotal = () => {
    if (!region) return 0;
    return cartItems.reduce((total, item) => {
      const price = getPriceWithDiscount(item);
      return total + (price * item.quantity);
    }, 0);
  };

  const total = calculateTotal();
  // ============= FIN LÓGICA DE DESCUENTO =============

  const handleSendClick = () => {
    if (!region) {
      setShowRegionWarning(true);
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmAndSend = () => {
    let message = `*🛒 NUEVO PEDIDO - BARTORI*\n\n`;
    message += `📍 *Región:* ${region}\n\n`;
    
    if (applyBasesDiscount) {
      message += `🎉 *DESCUENTO APLICADO:* -S/ 1.00 en cada base (${totalBasesUnits} bases)\n`;
      message += `💰 *Ahorro total:* S/ ${totalBasesUnits.toFixed(2)}\n\n`;
    }
    
    message += `*PRODUCTOS:*\n`;
    message += `${'─'.repeat(30)}\n`;

    cartItems.forEach((item, index) => {
      const originalPrice = item.prices[region];
      const price = getPriceWithDiscount(item);
      const subtotal = price * item.quantity;
      const hasDiscount = item.category === 'bases' && applyBasesDiscount;
      
      message += `\n${index + 1}. *${item.name}*\n`;
      message += `   • Cantidad: ${item.quantity} ${item.quantity === 1 ? 'caja' : 'cajas'}\n`;
      
      if (hasDiscount) {
        message += `   • Precio unitario: ~S/ ${originalPrice.toFixed(2)}~ → S/ ${price.toFixed(2)} (-S/ 1.00)\n`;
      } else {
        message += `   • Precio unitario: S/ ${price.toFixed(2)}\n`;
      }
      
      message += `   • Subtotal: S/ ${subtotal.toFixed(2)}\n`;
    });

    message += `\n${'─'.repeat(30)}\n`;
    message += `\n💰 *TOTAL: S/ ${total.toFixed(2)}*\n`;
    message += `\n_Esperamos su confirmación para proceder con el pedido._`;

    const phoneNumber = '51954153608';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    setShowConfirmModal(false);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteItemModal(true);
  };

  const confirmDeleteItem = () => {
    if (itemToDelete) {
      updateCartItem(itemToDelete.id, 0);
      setShowDeleteItemModal(false);
      setItemToDelete(null);
    }
  };

  const handleClearCartClick = () => {
    setShowClearCartModal(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearCartModal(false);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <div className="w-32 h-32 bg-[#322B80] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <ShoppingCart className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-[#322B80]">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            ¡Agrega algunos productos deliciosos para empezar!
          </p>
          <Link
            to="/products"
            className="inline-block bg-[#322B80] hover:bg-[#C12423] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-[#322B80]">
            Mi Carrito
          </h1>
          <p className="text-gray-600 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        {/* Alerta de región */}
        {!region && (
          <div className="bg-amber-50 border-l-4 border-[#D8992F] p-4 mb-6 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-[#D8992F] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#322B80] mb-1">
                  Selecciona tu región
                </p>
                <p className="text-gray-700 text-sm">
                  Necesitas seleccionar tu región en el header para ver los precios correctos
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alerta de descuento en bases - Cerca de conseguirlo */}
        {totalBasesUnits > 0 && totalBasesUnits < 15 && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-xl">
            <div className="flex items-start gap-3">
              <Package className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-800 mb-1">
                  ¡Estás cerca de un descuento! 🎉
                </p>
                <p className="text-green-700 text-sm">
                  Tienes {totalBasesUnits} {totalBasesUnits === 1 ? 'base' : 'bases'} en tu carrito. 
                  Agrega {15 - totalBasesUnits} {(15 - totalBasesUnits) === 1 ? 'base' : 'bases'} más para obtener <strong>S/ 1.00 de descuento</strong> en cada base.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Alerta de descuento aplicado */}
        {applyBasesDiscount && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-xl">
            <div className="flex items-start gap-3">
              <Package className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-800 mb-1">
                  ¡Descuento aplicado! ✓
                </p>
                <p className="text-green-700 text-sm">
                  Has agregado {totalBasesUnits} bases. Cada base tiene <strong>S/ 1.00 de descuento</strong>.
                  Ahorro total: <strong>S/ {totalBasesUnits.toFixed(2)}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const originalPrice = region ? item.prices[region] : 0;
              const price = getPriceWithDiscount(item);
              const subtotal = price * item.quantity;
              const hasDiscount = item.category === 'bases' && applyBasesDiscount;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-xl text-gray-900">
                        {item.name}
                      </h3>
                      
                      {region ? (
                        <div>
                          {hasDiscount ? (
                            <div className="flex items-center gap-3">
                              <div className="flex items-baseline gap-2">
                                <span className="text-gray-400 line-through text-lg">S/ {originalPrice.toFixed(2)}</span>
                                <span className="text-[#322B80] font-bold text-2xl">S/ {price.toFixed(2)}</span>
                              </div>
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-bold">
                                -S/ 1.00
                              </span>
                            </div>
                          ) : (
                            <p className="text-[#322B80] font-bold text-2xl">
                              S/ {price.toFixed(2)} <span className="text-sm text-gray-500 font-normal">por caja</span>
                            </p>
                          )}
                          {hasDiscount && (
                            <p className="text-green-600 text-xs font-semibold mt-1">
                              ✓ Descuento aplicado por compra de {totalBasesUnits} bases
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic text-sm">
                          Selecciona región para ver precio
                        </p>
                      )}

                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-semibold text-sm">Cantidad:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-10 h-10 bg-gray-100 rounded-xl hover:bg-[#322B80] hover:text-white transition flex items-center justify-center font-bold"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="text-2xl font-bold min-w-[3rem] text-center text-[#322B80]">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-10 h-10 bg-gray-100 rounded-xl hover:bg-[#322B80] hover:text-white transition flex items-center justify-center font-bold"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        {region && (
                          <div className="text-xl">
                            <span className="text-gray-600 font-semibold">Subtotal: </span>
                            <span className="font-bold text-[#322B80]">
                              S/ {subtotal.toFixed(2)}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleClearCartClick}
              className="w-full py-4 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all border-2 border-red-200 hover:border-red-300"
            >
              Vaciar Carrito
            </button>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-[#322B80]">
                Resumen del Pedido
              </h2>

              {region ? (
                <>
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>Productos ({cartItems.length})</span>
                      <span className="font-bold">S/ {total.toFixed(2)}</span>
                    </div>
                    
                    {applyBasesDiscount && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Package className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-green-800 font-bold text-xs mb-1">
                              ✓ Descuento aplicado
                            </p>
                            <p className="text-green-700 text-xs">
                              {totalBasesUnits} bases con -S/ 1.00 c/u
                            </p>
                            <p className="text-green-800 font-bold text-xs mt-1">
                              Ahorro: S/ {totalBasesUnits.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>Región:</span>
                      </div>
                      <span className="font-bold text-[#322B80]">{region}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-3xl font-bold mb-6">
                    <span className="text-gray-700">Total</span>
                    <span className="text-[#322B80]">S/ {total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={handleSendClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar por WhatsApp
                  </button>

                  <p className="text-gray-500 text-xs text-center mt-4">
                    Serás redirigido a WhatsApp para confirmar tu pedido
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Selecciona tu región para ver el total
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de advertencia - sin región */}
      {showRegionWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#322B80]">
                Región no seleccionada
              </h3>
              <p className="text-gray-600 mb-6">
                Debes seleccionar tu región en el header antes de enviar el pedido
              </p>
              <button
                onClick={() => setShowRegionWarning(false)}
                className="w-full bg-[#322B80] hover:bg-[#C12423] text-white py-3 rounded-xl font-bold transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación - con región */}
      {showConfirmModal && region && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] flex flex-col">
            {/* Header fijo */}
            <div className="border-b border-gray-100 p-6 flex justify-between items-center flex-shrink-0">
              <div>
                <h3 className="font-bold text-2xl text-[#322B80]">Confirmar Pedido</h3>
                <p className="text-gray-500 text-sm mt-1">Verifica los datos antes de enviar</p>
              </div>
              <button 
                onClick={() => setShowConfirmModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Contenido scrolleable */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="bg-amber-50 border-l-4 border-[#D8992F] p-4 mb-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-[#D8992F] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-[#322B80] mb-1">
                      Tu región seleccionada es:
                    </p>
                    <p className="text-2xl font-bold text-[#322B80]">
                      {region}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-700 mb-3">Resumen del pedido:</h4>
                
                {applyBasesDiscount && (
                  <div className="bg-green-100 border-l-4 border-green-500 p-3 mb-3 rounded">
                    <p className="text-green-800 text-sm font-bold mb-1">
                      ✓ Descuento en bases aplicado
                    </p>
                    <p className="text-green-700 text-xs">
                      {totalBasesUnits} bases × S/ 1.00 = -S/ {totalBasesUnits.toFixed(2)}
                    </p>
                  </div>
                )}
                
                <div className="space-y-2 text-sm max-h-60 overflow-y-auto">
                  {cartItems.map((item, index) => {
                    const hasDiscount = item.category === 'bases' && applyBasesDiscount;
                    return (
                      <div key={item.id} className="flex justify-between text-gray-600">
                        <span className="flex-1">
                          {index + 1}. {item.name.substring(0, 30)}...
                          {hasDiscount && <span className="text-green-600 ml-1">(-S/ 1)</span>}
                        </span>
                        <span className="font-semibold">{item.quantity}x</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t mt-3 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-700">Total:</span>
                  <span className="text-2xl font-bold text-[#322B80]">S/ {total.toFixed(2)}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm text-center">
                ¿La región es correcta? Si necesitas cambiarla, cancela y selecciónala en el header.
              </p>
            </div>

            {/* Footer fijo con botones */}
            <div className="border-t border-gray-100 p-6 flex-shrink-0">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
                >
                  Cambiar Región
                </button>
                <button
                  onClick={confirmAndSend}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Confirmar y Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación - Eliminar producto */}
      {showDeleteItemModal && itemToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#322B80]">Eliminar Producto</h3>
                  <p className="text-gray-500 text-sm">Esta acción no se puede deshacer</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img 
                  src={itemToDelete.image} 
                  className="w-20 h-20 object-cover rounded-xl"
                  alt={itemToDelete.name}
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-800 mb-2 text-sm leading-tight">
                    {itemToDelete.name}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Cantidad: {itemToDelete.quantity} {itemToDelete.quantity === 1 ? 'caja' : 'cajas'}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-6 text-center">
                ¿Estás seguro que deseas eliminar este producto del carrito?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteItemModal(false);
                    setItemToDelete(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteItem}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación - Vaciar carrito */}
      {showClearCartModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#322B80]">Vaciar Carrito</h3>
                  <p className="text-gray-500 text-sm">Esta acción eliminará todos los productos</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
                <p className="text-red-800 font-semibold mb-2">
                  Se eliminarán {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
                </p>
                <p className="text-red-700 text-sm">
                  Perderás todos los productos que agregaste al carrito.
                </p>
              </div>

              <p className="text-gray-600 text-sm mb-6 text-center">
                ¿Estás seguro que deseas vaciar completamente tu carrito?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearCartModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmClearCart}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Vaciar Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
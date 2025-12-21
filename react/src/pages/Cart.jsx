import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, Send, MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRegion } from '../context/RegionContext';

export const Cart = () => {
  const { cartItems, updateCartItem, clearCart, getCartTotal } = useCart();
  const { region } = useRegion();
  const [showRegionWarning, setShowRegionWarning] = useState(false);

  // Calcular total
  const total = getCartTotal(region);

  // Función para enviar pedido por WhatsApp
  const sendToWhatsApp = () => {
    if (!region) {
      setShowRegionWarning(true);
      return;
    }

    // Construir mensaje
    let message = `*🛒 NUEVO PEDIDO - BARQUIRROLL*\n\n`;
    message += `📍 *Región:* ${region}\n\n`;
    message += `*PRODUCTOS:*\n`;
    message += `${'─'.repeat(30)}\n`;

    cartItems.forEach((item, index) => {
      const price = item.prices[region];
      const subtotal = price * item.quantity;
      message += `\n${index + 1}. *${item.name}*\n`;
      message += `   • Cantidad: ${item.quantity} ${item.quantity === 1 ? 'caja' : 'cajas'}\n`;
      message += `   • Precio unitario: S/ ${price.toFixed(2)}\n`;
      message += `   • Subtotal: S/ ${subtotal.toFixed(2)}\n`;
    });

    message += `\n${'─'.repeat(30)}\n`;
    message += `\n💰 *TOTAL: S/ ${total.toFixed(2)}*\n`;
    message += `\n_Esperamos su confirmación para proceder con el pedido._`;

    // Codificar mensaje y abrir WhatsApp
    const phoneNumber = '51999888777'; // Reemplaza con tu número
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  // Actualizar cantidad
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            ¡Agrega algunos productos deliciosos para empezar!
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🛒 Mi Carrito
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        {/* Alerta de región */}
        {!region && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-800 mb-1">
                  Selecciona tu región
                </p>
                <p className="text-yellow-700 text-sm">
                  Necesitas seleccionar tu región en el header para ver los precios correctos
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const price = region ? item.prices[region] : 0;
              const subtotal = price * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* Imagen */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Información */}
                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-xl text-gray-900">
                        {item.name}
                      </h3>
                      
                      {region ? (
                        <p className="text-green-600 font-bold text-lg">
                          S/ {price.toFixed(2)} por caja
                        </p>
                      ) : (
                        <p className="text-gray-400 italic text-sm">
                          Selecciona región para ver precio
                        </p>
                      )}

                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600 font-medium">Cantidad:</span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="text-xl font-bold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal y eliminar */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        {region && (
                          <div className="text-lg">
                            <span className="text-gray-600">Subtotal: </span>
                            <span className="font-bold text-gray-900">
                              S/ {subtotal.toFixed(2)}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => updateCartItem(item.id, 0)}
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

            {/* Botón limpiar carrito */}
            <button
              onClick={clearCart}
              className="w-full py-3 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition"
            >
              Vaciar Carrito
            </button>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Resumen del Pedido
              </h2>

              {region ? (
                <>
                  <div className="space-y-3 mb-6 pb-6 border-b">
                    <div className="flex justify-between text-gray-600">
                      <span>Productos ({cartItems.length})</span>
                      <span>S/ {total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>Región:</span>
                      </div>
                      <span className="font-semibold">{region}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-2xl font-bold mb-6">
                    <span>Total</span>
                    <span className="text-green-600">S/ {total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={sendToWhatsApp}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Pedido por WhatsApp
                  </button>

                  <p className="text-gray-500 text-xs text-center mt-4">
                    Serás redirigido a WhatsApp para confirmar tu pedido
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Selecciona tu región para ver el total
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de advertencia de región */}
      {showRegionWarning && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Región no seleccionada
              </h3>
              <p className="text-gray-600 mb-6">
                Debes seleccionar tu región en el header antes de enviar el pedido
              </p>
              <button
                onClick={() => setShowRegionWarning(false)}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
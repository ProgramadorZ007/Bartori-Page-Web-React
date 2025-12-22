import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, Send, MapPin, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRegion } from '../context/RegionContext';

export const Cart = () => {
  const { cartItems, updateCartItem, clearCart, getCartTotal } = useCart();
  const { region } = useRegion();
  const [showRegionWarning, setShowRegionWarning] = useState(false);

  const total = getCartTotal(region);

  const sendToWhatsApp = () => {
    if (!region) {
      setShowRegionWarning(true);
      return;
    }

    let message = `*🛒 NUEVO PEDIDO - BARTORI*\n\n`;
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

    const phoneNumber = '51999888777';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <div className="w-32 h-32 bg-gradient-to-br from-[#322B80] to-[#C12423] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <ShoppingCart className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Tu carrito está vacío</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            ¡Agrega algunos productos deliciosos para empezar!
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-[#322B80] to-[#C12423] text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
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
          <h1 className="text-5xl font-bold mb-2">
            <span className="text-gradient">Mi Carrito</span>
          </h1>
          <p className="text-gray-600 text-lg">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        {/* Alerta de región */}
        {!region && (
          <div className="bg-gradient-to-r from-[#D8992F]/10 to-[#C12423]/10 border-l-4 border-[#D8992F] p-4 mb-6 rounded-xl">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const price = region ? item.prices[region] : 0;
              const subtotal = price * item.quantity;

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
                        <p className="text-gradient font-bold text-2xl">
                          S/ {price.toFixed(2)} <span className="text-sm text-gray-500 font-normal">por caja</span>
                        </p>
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
                            <span className="font-bold text-gradient">
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

            <button
              onClick={clearCart}
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
                    <span className="text-gradient">S/ {total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={sendToWhatsApp}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
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

      {/* Modal de advertencia */}
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
                className="w-full bg-gradient-to-r from-[#322B80] to-[#C12423] text-white py-3 rounded-xl font-bold hover:shadow-xl transition"
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
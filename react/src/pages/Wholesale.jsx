import { useState } from 'react';
import { Package, TrendingDown, Truck, Clock, Send } from 'lucide-react';

export const Wholesale = () => {
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    phone: '',
    email: '',
    city: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construir mensaje para WhatsApp
    const whatsappMessage = `
*COTIZACIÓN MAYORISTA*

👤 Nombre: ${formData.name}
🏢 Negocio: ${formData.business}
📱 Teléfono: ${formData.phone}
📧 Email: ${formData.email}
📍 Ciudad: ${formData.city}

💬 Mensaje:
${formData.message}
    `.trim();

    // Número de WhatsApp (reemplaza con tu número real)
    const phoneNumber = '51999888777'; // Formato: código de país + número
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Precios Mayoristas</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Descuentos especiales para compras al por mayor. ¡Haz crecer tu negocio con nosotros!
          </p>
        </div>
      </div>

      {/* BENEFICIOS */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Beneficios de Comprar al Mayor
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Mejores Precios</h3>
            <p className="text-gray-600">
              Descuentos progresivos según volumen de compra
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Envío Gratuito</h3>
            <p className="text-gray-600">
              En compras mayores a 10 cajas
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Stock Garantizado</h3>
            <p className="text-gray-600">
              Prioridad en disponibilidad de productos
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Entrega Puntual</h3>
            <p className="text-gray-600">
              Sistema de logística confiable
            </p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Solicita tu Cotización
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Completa el formulario y nos pondremos en contacto contigo vía WhatsApp
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none transition"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nombre del Negocio *
                  </label>
                  <input
                    type="text"
                    name="business"
                    required
                    value={formData.business}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none transition"
                    placeholder="Heladería XYZ"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none transition"
                    placeholder="999 888 777"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none transition"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Ciudad *
                </label>
                <select
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none transition"
                >
                  <option value="">Selecciona tu ciudad</option>
                  <option value="Chiclayo">Chiclayo</option>
                  <option value="Piura">Piura</option>
                  <option value="Lambayeque">Lambayeque</option>
                  <option value="Trujillo">Trujillo</option>
                  <option value="Lima">Lima</option>
                  <option value="Otra">Otra ciudad</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Cuéntanos sobre tu pedido *
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none transition resize-none"
                  placeholder="¿Qué productos te interesan? ¿Cuántas cajas necesitas mensualmente?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Solicitud por WhatsApp
              </button>
            </form>

            <p className="text-gray-500 text-sm text-center mt-6">
              Al enviar este formulario, serás redirigido a WhatsApp para finalizar tu solicitud
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
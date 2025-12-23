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

    const phoneNumber = '51954153608';
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#322B80] via-[#2d2670] to-[#1a1648] text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
            <span className="text-[#D8992F] font-bold uppercase tracking-wider text-sm">
              Precios especiales
            </span>
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Compras Mayoristas</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Descuentos especiales para compras al por mayor. ¡Haz crecer tu negocio con nosotros!
          </p>
        </div>
      </div>

      {/* BENEFICIOS */}
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-gradient">Beneficios Exclusivos</span>
        </h2>
        <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
          Ventajas diseñadas para impulsar el crecimiento de tu negocio
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-[#D8992F] to-[#C12423] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <TrendingDown className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#322B80]">Mejores Precios</h3>
            <p className="text-gray-600">
              Descuentos progresivos según volumen de compra
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-[#322B80] to-[#C12423] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#322B80]">Envío Gratuito</h3>
            <p className="text-gray-600">
              En compras mayores a 10 cajas
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-[#322B80] to-[#2d2670] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#322B80]">Stock Garantizado</h3>
            <p className="text-gray-600">
              Prioridad en disponibilidad de productos
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Clock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#322B80]">Entrega Puntual</h3>
            <p className="text-gray-600">
              Sistema de logística confiable
            </p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-10 md:p-12 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="text-gradient">Solicita tu Cotización</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Completa el formulario y nos pondremos en contacto vía WhatsApp
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#322B80] outline-none transition"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Nombre del Negocio *
                  </label>
                  <input
                    type="text"
                    name="business"
                    required
                    value={formData.business}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#322B80] outline-none transition"
                    placeholder="Heladería XYZ"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#322B80] outline-none transition"
                    placeholder="999 888 777"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#322B80] outline-none transition"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Ciudad *
                </label>
                <select
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#322B80] outline-none transition"
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
                <label className="block text-gray-700 font-bold mb-2 text-sm">
                  Cuéntanos sobre tu pedido *
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-[#322B80] outline-none transition resize-none"
                  placeholder="¿Qué productos te interesan? ¿Cuántas cajas necesitas mensualmente?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
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
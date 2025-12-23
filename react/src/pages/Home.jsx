import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Phone, Package } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Excelencia en cada barquillo',
      subtitle: 'Más de 20 años acompañando a los mejores heladeros del Perú',
      cta: 'Ver productos',
      image: '/img/carrusel1.png'
    },
    {
      title: 'Calidad que se siente',
      subtitle: 'Procesos certificados y estándares internacionales',
      cta: 'Nuestra calidad',
      image: '/img/carrusel2.png'
    },
    {
      title: 'Logística eficiente y entregas seguras',
      subtitle: 'Distribución en toda la zona norte del Perú',
      cta: 'Cotizar ahora',
      image: '/img/carrusel3.png'
    }
  ];

  const featuredProducts = productsData.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[600px] overflow-hidden bg-[#322B80]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#322B80]/90 via-[#322B80]/60 to-transparent" />

            <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
              <div className="max-w-2xl">
                <div className="inline-block mb-4">
                  <span className="px-4 py-2 bg-[#D8992F] bg-opacity-20 backdrop-blur-sm text-[#D8992F] rounded-full text-sm font-semibold border border-[#D8992F] border-opacity-30">
                    Bartori Perú (Zona Norte)
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white opacity-90 mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 bg-[#D8992F] hover:bg-[#C12423] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentSlide ? 'w-12 bg-white' : 'w-6 bg-white bg-opacity-40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= PRODUCTOS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-[#322B80]"></div>
              <span className="text-[#D8992F] font-bold uppercase tracking-wider text-sm">
                Lo mejor de Bartori
              </span>
              <div className="w-8 h-0.5 bg-[#322B80]"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#322B80]">
              Productos Destacados
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Barquillos y conos diseñados para realzar cada experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#322B80] hover:bg-[#C12423] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Ver catálogo completo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MAYORISTA ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="relative overflow-hidden bg-[#322B80] rounded-3xl shadow-2xl">
            
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            <div className="relative grid md:grid-cols-2 gap-12 p-12 md:p-16 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white border-opacity-20">
                  <Package className="w-4 h-4 text-[#D8992F]" />
                  <span className="text-[#D8992F] font-semibold text-sm">
                    Precios especiales
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  ¿Tienes un negocio mayorista?
                </h2>
                
                <p className="text-white opacity-80 text-lg mb-8 leading-relaxed">
                  Accede a condiciones preferenciales, descuentos por volumen y atención personalizada para hacer crecer tu negocio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/wholesale"
                    className="inline-flex items-center justify-center gap-2 bg-[#D8992F] hover:bg-[#C12423] text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    Solicitar cotización
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  <a
                    className="inline-flex items-center justify-center gap-2 bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 border-2 border-white border-opacity-30 text-white px-8 py-4 rounded-xl font-bold transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    <span>(+51) 954 153 608</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '20+', label: 'Años de experiencia' },
                  { number: '1000+', label: 'Clientes satisfechos' },
                  { number: '24/7', label: 'Atención disponible' },
                  { number: '100%', label: 'Calidad garantizada' }
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 text-center hover:bg-opacity-20 transition-all"
                  >
                    <div className="text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white opacity-70 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
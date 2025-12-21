import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Award,
  Clock,
  Shield,
  Phone,
  Package
} from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Excelencia en cada barquillo',
      subtitle: 'Más de 25 años acompañando a los mejores heladeros del Perú',
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
      title: 'Distribución a nivel nacional',
      subtitle: 'Logística eficiente y entregas seguras',
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

  const nextSlide = () =>
    setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[600px] overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          >
            {/* Imagen */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Overlay elegante */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#322B80]/85 via-[#322B80]/50 to-transparent" />

            {/* Contenido */}
            <div className="relative h-full max-w-7xl mx-auto px-8 md:px-16 flex items-center">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 bg-[#C12423] hover:bg-[#D8992F] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controles */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1 rounded-full transition-all ${
                i === currentSlide
                  ? 'w-12 bg-white'
                  : 'w-8 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= PRODUCTOS ================= */}
      <section className="pt-20 pb-20 pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          {/* Título de sección */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-[#C12423] rounded-full"></div>
              <span className="text-[#D8992F] font-semibold uppercase tracking-wider text-sm">
                Lo mejor de Bartori
              </span>
            </div>
            <h2 className="text-4xl font-bold text-[#322B80] mb-3">
              Productos Destacados
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Barquillos y conos diseñados para realzar cada experiencia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#322B80] hover:bg-[#C12423] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Ver catálogo completo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MAYORISTA ================= */}
      <section className=" pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          {/* Divisor decorativo sutil */}
          <div className="flex items-center gap-4 mb-16">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-2 h-2 rounded-full bg-[#D8992F]"></div>
              <div className="w-2 h-2 rounded-full bg-[#C12423]"></div>
              <div className="w-2 h-2 rounded-full bg-[#322B80]"></div>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#111827] rounded-2xl">
            {/* Patrón decorativo sutil */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            <div className="relative grid md:grid-cols-2 gap-12 p-12 md:p-16 items-center">
              {/* Contenido */}
              <div className="text-white">
                <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <span className="text-[#D8992F] font-semibold text-sm flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Precios especiales
                  </span>
                </div>
                
                <h2 className="text-4xl font-bold mb-4">
                  ¿Tienes un negocio de helados?
                </h2>
                
                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                  Accede a condiciones preferenciales, descuentos por volumen y atención personalizada para hacer crecer tu negocio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/wholesale"
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#322B80] hover:bg-[#D8992F] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Solicitar cotización
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  
                  <a
                    href="tel:+51013249090"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+51 01 324 9090</span>
                  </a>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '25+', label: 'Años de experiencia' },
                  { number: '1000+', label: 'Clientes satisfechos' },
                  { number: '24/7', label: 'Disponibilidad' },
                  { number: '100%', label: 'Calidad garantizada' }
                ].map((stat, i) => (
                  <div 
                    key={i} 
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center"
                  >
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/80 text-sm">
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
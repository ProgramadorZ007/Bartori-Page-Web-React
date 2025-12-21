import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Award, Clock, Shield, Phone } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Excelencia en cada barquillo',
      subtitle: 'Más de 25 años siendo líderes en la industria peruana',
      cta: 'Conocer más',
      image: '/img-productos/barquilla.jpg'
    },
    {
      title: 'Calidad garantizada',
      subtitle: 'Productos certificados con los más altos estándares',
      cta: 'Ver productos',
      image: '/img-productos/chocolate.jpg'
    },
    {
      title: 'Servicio a nivel nacional',
      subtitle: 'Entregas rápidas y seguras en todo el Perú',
      cta: 'Cotizar ahora',
      image: '/img-productos/barquilla.jpg'
    }
  ];

  const featuredProducts = productsData.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="bg-white">
      {/* ========== HERO SLIDER ========== */}
      <section className="relative h-[600px] overflow-hidden bg-gray-900">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Imagen de fondo */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Overlay oscuro */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            
            {/* Contenido */}
            <div className="relative h-full container mx-auto px-6 flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-[#C12423] hover:bg-[#D8992F] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {slide.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controles del slider */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 transition-all"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-12' 
                  : 'bg-white/50 w-8 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ========== CARACTERÍSTICAS ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#C12423]/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-[#C12423]" />
              </div>
              <h3 className="text-xl font-bold text-[#322B80] mb-2">Calidad Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Productos elaborados con estándares internacionales de calidad
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#D8992F]/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-[#D8992F]" />
              </div>
              <h3 className="text-xl font-bold text-[#322B80] mb-2">Entregas Puntuales</h3>
              <p className="text-gray-600 leading-relaxed">
                Sistema logístico eficiente para todo el territorio peruano
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#322B80]/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#322B80]" />
              </div>
              <h3 className="text-xl font-bold text-[#322B80] mb-2">25+ Años de Experiencia</h3>
              <p className="text-gray-600 leading-relaxed">
                Respaldados por décadas de trayectoria en el mercado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRODUCTOS DESTACADOS ========== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#322B80] mb-4">
              Nuestros Productos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra línea de barquillos y conos de la más alta calidad
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#322B80] hover:bg-[#C12423] text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Ver todos los productos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECCIÓN MAYORISTA ========== */}
      <section className="py-20 bg-gradient-to-br from-[#322B80] to-[#C12423] text-white relative overflow-hidden">
        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              ¿Tienes un negocio de helados?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Obtén precios especiales y condiciones exclusivas para compras mayoristas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/wholesale"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#C12423] hover:bg-[#D8992F] hover:text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg"
              >
                Solicitar cotización
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+51013249090"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all border-2 border-white/30"
              >
                <Phone className="w-5 h-5" />
                (+51) 01 324 90 90
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONFIANZA ========== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-8">
            Confían en nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            <div className="text-3xl font-bold text-gray-600">Cliente 1</div>
            <div className="text-3xl font-bold text-gray-600">Cliente 2</div>
            <div className="text-3xl font-bold text-gray-600">Cliente 3</div>
            <div className="text-3xl font-bold text-gray-600">Cliente 4</div>
          </div>
        </div>
      </section>
    </div>
  );
};
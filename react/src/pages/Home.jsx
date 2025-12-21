import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Truck, Award, Package } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/img-productos/barquilla.jpg',
      title: 'LOS BARQUILLOS MÁS CROCANTES',
      subtitle: 'Conos y barquillos para helados, postres y decoraciones',
      cta: 'Ver Productos',
      gradient: 'from-[#C8102E]/90 to-[#E91E8C]/90'
    },
    {
      image: '/img-productos/chocolate.jpg',
      title: 'VARIEDAD EN SABORES',
      subtitle: 'Clásicos y marmoleados que encantan',
      cta: 'Explorar Catálogo',
      gradient: 'from-[#2E3192]/90 to-[#E91E8C]/90'
    },
    {
      image: '/img-productos/barquilla.jpg',
      title: 'ENVÍOS A TODO EL PERÚ',
      subtitle: 'Logística confiable y entregas puntuales',
      cta: 'Cotizar Ahora',
      gradient: 'from-[#F7B731]/90 to-[#C8102E]/90'
    }
  ];

  // Productos destacados
  const featuredProducts = productsData.slice(0, 4);

  // Auto-avanzar carrusel
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
      {/* ========== CARRUSEL HERO ========== */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
            
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl space-y-6">
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight animate-fade-in drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-3xl font-light animate-fade-in-delay drop-shadow-lg">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-white text-[#C8102E] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition transform hover:scale-110 shadow-2xl animate-fade-in-delay"
                >
                  {slide.cta} →
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controles */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full p-4 transition group"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md rounded-full p-4 transition group"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-12' 
                  : 'bg-white/50 w-2 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ========== BENEFICIOS ========== */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2E3192] mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600">
              Más de 25 años siendo la mejor opción
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C8102E] to-[#E91E8C] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Calidad Premium</h3>
              <p className="text-gray-600 leading-relaxed">
                Productos elaborados con los mejores ingredientes, garantizando frescura y sabor inigualable
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2E3192] to-[#E91E8C] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">25+ Años</h3>
              <p className="text-gray-600 leading-relaxed">
                De experiencia endulzando momentos especiales en todo el Perú
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#F7B731] to-[#C8102E] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Envíos Rápidos</h3>
              <p className="text-gray-600 leading-relaxed">
                Logística confiable a todo el país con entregas puntuales
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== PRODUCTOS DESTACADOS ========== */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-[#C8102E] via-[#E91E8C] to-[#2E3192] bg-clip-text text-transparent">
              Productos Destacados
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Los favoritos de nuestros clientes
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8102E] to-[#E91E8C] text-white px-10 py-5 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            <ShoppingBag className="w-6 h-6" />
            Ver Todos los Productos
          </Link>
        </div>
      </div>

      {/* ========== LLAMADO A LA ACCIÓN ========== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C8102E] via-[#E91E8C] to-[#2E3192]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            ¿Tienes un negocio de helados?
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto drop-shadow-md">
            Obtén precios especiales para compras al por mayor
          </p>
          <Link
            to="/wholesale"
            className="inline-flex items-center gap-3 bg-white text-[#C8102E] px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition transform hover:scale-110 shadow-2xl"
          >
            <Package className="w-7 h-7" />
            Solicitar Cotización Mayorista
          </Link>
        </div>
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/img-productos/barquilla.jpg',
      title: 'Los Mejores Barquillos del Perú',
      subtitle: 'Calidad premium para tu negocio',
      cta: 'Ver Productos'
    },
    {
      image: '/img-productos/chocolate.jpg',
      title: 'Variedad en Sabores',
      subtitle: 'Clásicos y marmoleados',
      cta: 'Explorar'
    },
    {
      image: '/img-productos/barquilla.jpg',
      title: 'Envíos a Todo el Perú',
      subtitle: 'Logística confiable y rápida',
      cta: 'Cotizar Ahora'
    }
  ];

  // Productos destacados (los primeros 4)
  const featuredProducts = productsData.slice(0, 4);

  // Auto-avanzar carrusel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      {/* CARRUSEL HERO */}
      <div className="relative w-full h-[500px] overflow-hidden bg-gray-900">
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
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-3xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Controles del carrusel */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 backdrop-blur-sm transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-3 backdrop-blur-sm transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* SECCIÓN DE BENEFICIOS */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Calidad Premium</h3>
              <p className="text-gray-600">Productos elaborados con los mejores ingredientes</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">25+ Años</h3>
              <p className="text-gray-600">De experiencia en el mercado peruano</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Envíos Rápidos</h3>
              <p className="text-gray-600">Logística confiable a todo el país</p>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTOS DESTACADOS */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Productos Destacados
          </h2>
          <p className="text-gray-600 text-lg">
            Los favoritos de nuestros clientes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>

      {/* LLAMADO A LA ACCIÓN */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">¿Vendes helados?</h2>
          <p className="text-xl mb-8">
            Obtén precios especiales para compras al por mayor
          </p>
          <Link
            to="/wholesale"
            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
          >
            Solicitar Cotización Mayorista
          </Link>
        </div>
      </div>
    </div>
  );
};
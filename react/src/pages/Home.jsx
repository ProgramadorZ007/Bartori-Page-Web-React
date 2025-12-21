import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Award,
  Clock,
  Shield,
  Phone
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
      <section className="relative h-[650px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Imagen */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Overlay elegante */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#322B80]/90 via-[#322B80]/60 to-transparent" />

            {/* Contenido */}
            <div className="relative h-full container mx-auto px-10 flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-10">
                  {slide.subtitle}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 bg-[#C12423] hover:bg-[#D8992F] text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg"
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
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-3"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full p-3"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[3px] rounded-full transition-all ${
                i === currentSlide
                  ? 'w-14 bg-white'
                  : 'w-8 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= BENEFICIOS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Award />,
                title: 'Calidad Premium',
                text: 'Estándares internacionales en cada producto',
                color: '#C12423'
              },
              {
                icon: <Clock />,
                title: 'Entregas Puntuales',
                text: 'Logística eficiente a nivel nacional',
                color: '#D8992F'
              },
              {
                icon: <Shield />,
                title: '25+ Años de Experiencia',
                text: 'Trayectoria sólida en el mercado peruano',
                color: '#322B80'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <span style={{ color: item.color }}>
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#322B80] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTOS ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-10">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold text-[#322B80] mb-4">
              Nuestros Productos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Barquillos y conos diseñados para realzar cada helado
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-[#322B80] hover:bg-[#C12423] text-white px-10 py-4 rounded-lg font-bold transition-all"
            >
              Ver todos los productos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MAYORISTA ================= */}
      <section className="py-24 bg-gradient-to-br from-[#322B80] to-[#C12423] text-white">
        <div className="container mx-auto px-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              ¿Tienes un negocio de helados?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Accede a precios especiales y condiciones exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/wholesale"
                className="bg-white text-[#C12423] hover:bg-[#D8992F] hover:text-white px-10 py-4 rounded-lg font-bold transition-all"
              >
                Solicitar cotización
              </Link>
              <a
                href="tel:+51013249090"
                className="flex items-center justify-center gap-3 border-2 border-white/40 px-10 py-4 rounded-lg font-semibold hover:bg-white/10"
              >
                <Phone className="w-5 h-5" />
                (+51) 01 324 90 90
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

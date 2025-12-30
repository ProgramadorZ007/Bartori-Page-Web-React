import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#322B80] via-[#2d2670] to-[#1a1648] text-white py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <div className="w-6 sm:w-8 h-0.5 bg-[#D8992F]"></div>
            <span className="text-[#D8992F] font-bold uppercase tracking-wider text-xs sm:text-sm">
              Conoce nuestra historia
            </span>
            <div className="w-6 sm:w-8 h-0.5 bg-[#D8992F]"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">Sobre Nosotros</h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
            Más de 20 años endulzando momentos con los mejores barquillos del Perú
          </p>
        </div>
      </div>

      {/* HISTORIA */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">
            <span className="text-gradient">Nuestra Historia</span>
          </h2>
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 mb-8 sm:mb-10 md:mb-12">
            <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
              Somos los mejores distribuidores de BARTORI en la Zona Norte del Perú. Lo que comenzó como un pequeño negocio familiar en Lambayeque, se ha convertido en una de las empresas más reconocidas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
              A lo largo de estos años, BARTORI ha mantenido su compromiso con la calidad, 
              utilizando siempre los mejores ingredientes y procesos de producción que garantizan 
              la frescura y el sabor inigualable de nuestros productos.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              Hoy, orgullosamente servimos a cientos de negocios en toda la zona norte del Perú, desde pequeñas heladerías hasta grandes cadenas de distribución, manteniendo siempre el mismo 
              compromiso con la excelencia que nos caracterizó desde el primer día.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            <div className="bg-gradient-to-br from-[#322B80] to-[#2d2670] p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Nuestra Misión</h2>
              <p className="leading-relaxed text-white/90 text-sm sm:text-base">
                Proporcionar productos de la más alta calidad que agreguen valor a los negocios 
                de nuestros clientes, manteniendo siempre estándares de excelencia en producción, 
                innovación y servicio al cliente.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#D8992F] to-[#C12423] p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Nuestra Visión</h2>
              <p className="leading-relaxed text-white/90 text-sm sm:text-base">
                Ser la empresa líder en la distribución de barquillos y conos para 
                helado en la Zona Norte del Perú, siendo reconocidos por nuestra calidad, innovación y compromiso con nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VALORES */}
      <div className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4">
            <span className="text-gradient">Nuestros Valores</span>
          </h2>
          <p className="text-center text-gray-600 text-sm sm:text-base md:text-lg mb-10 sm:mb-12 md:mb-16 max-w-2xl mx-auto px-4">
            Los pilares que guían cada una de nuestras decisiones y acciones
          </p>
          
          <div className="grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#322B80] to-[#C12423] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#322B80]">Calidad</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Compromiso inquebrantable con la excelencia en cada producto
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#D8992F] to-[#C12423] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#322B80]">Clientes</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Priorizamos la satisfacción y éxito de nuestros socios comerciales
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#322B80] to-[#2d2670] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#322B80]">Innovación</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Mejora continua en procesos y desarrollo de productos
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#C12423] to-[#D8992F] rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#322B80]">Pasión</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Amor por lo que hacemos en cada detalle del proceso
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EQUIPO */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Nuestro Equipo</span>
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
              Contamos con un equipo de profesionales apasionados y comprometidos. Nuestro equipo de logística garantiza entregas puntuales en toda la Zona Norte del Perú. Cada miembro del equipo trabaja con dedicación para mantener los más altos estándares de calidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-gradient-to-br from-[#322B80] via-[#2d2670] to-[#1a1648] text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
            <span className="text-[#D8992F] font-bold uppercase tracking-wider text-sm">
              Conoce nuestra historia
            </span>
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Más de 20 años endulzando momentos con los mejores barquillos del Perú
          </p>
        </div>
      </div>

      {/* HISTORIA */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">
            <span className="text-gradient">Nuestra Historia</span>
          </h2>
          
          <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-lg border border-gray-100 mb-12">
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              Somos los mejores distribuidores de BARTORI en la Zona Norte del Perú. Lo que comenzó como un pequeño negocio familiar en Lambayeque, se ha convertido en una de las empresas más reconocidas.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              A lo largo de estos años, BARTORI ha mantenido su compromiso con la calidad, 
              utilizando siempre los mejores ingredientes y procesos de producción que garantizan 
              la frescura y el sabor inigualable de nuestros productos.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Hoy, orgullosamente servimos a cientos de negocios en toda la zona norte del Perú, desde pequeñas heladerías hasta grandes cadenas de distribución, manteniendo siempre el mismo 
              compromiso con la excelencia que nos caracterizó desde el primer día.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#322B80] to-[#2d2670] p-8 rounded-3xl text-white">
              <h2 className="text-3xl font-bold mb-4">Nuestra Misión</h2>
              <p className="leading-relaxed text-white/90">
                Proporcionar productos de la más alta calidad que agreguen valor a los negocios 
                de nuestros clientes, manteniendo siempre estándares de excelencia en producción, 
                innovación y servicio al cliente.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#D8992F] to-[#C12423] p-8 rounded-3xl text-white">
              <h2 className="text-3xl font-bold mb-4">Nuestra Visión</h2>
              <p className="leading-relaxed text-white/90">
                Ser la empresa líder en la distribución de barquillos y conos para 
                helado en la Zona Norte del Perú, siendo reconocidos por nuestra calidad, innovación y compromiso con nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VALORES */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Nuestros Valores</span>
          </h2>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Los pilares que guían cada una de nuestras decisiones y acciones
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#322B80] to-[#C12423] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#322B80]">Calidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Compromiso inquebrantable con la excelencia en cada producto
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#D8992F] to-[#C12423] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#322B80]">Clientes</h3>
              <p className="text-gray-600 leading-relaxed">
                Priorizamos la satisfacción y éxito de nuestros socios comerciales
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#322B80] to-[#2d2670] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#322B80]">Innovación</h3>
              <p className="text-gray-600 leading-relaxed">
                Mejora continua en procesos y desarrollo de productos
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C12423] to-[#D8992F] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#322B80]">Pasión</h3>
              <p className="text-gray-600 leading-relaxed">
                Amor por lo que hacemos en cada detalle del proceso
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EQUIPO */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Nuestro Equipo</span>
          </h2>
          <div className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-lg border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg">
              Contamos con un equipo de profesionales apasionados y comprometidos. Nuestro equipo de logística garantiza entregas puntuales en toda la Zona Norte del Perú. Cada miembro del equipo trabaja con dedicación para mantener los más altos estándares de calidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
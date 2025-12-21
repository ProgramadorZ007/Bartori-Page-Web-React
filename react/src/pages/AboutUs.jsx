import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export const AboutUs = () => {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Sobre Nosotros</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Más de 25 años endulzando momentos con los mejores barquillos del Perú
          </p>
        </div>
      </div>

      {/* HISTORIA */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Historia</h2>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                {/* Aquí puedes escribir tu historia */}
                Fundada en 1995, Barquirroll nació con el sueño de ofrecer los mejores barquillos 
                y conos para helado en todo el Perú. Lo que comenzó como un pequeño taller familiar 
                en Chiclayo, se ha convertido en una de las empresas más reconocidas en la industria.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                A lo largo de estos años, hemos mantenido nuestro compromiso con la calidad, 
                utilizando siempre los mejores ingredientes y procesos de producción que garantizan 
                la frescura y el sabor inigualable de nuestros productos.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Hoy, orgullosamente servimos a cientos de negocios en todo el país, desde pequeñas 
                heladerías hasta grandes cadenas de distribución, manteniendo siempre el mismo 
                compromiso con la excelencia que nos caracterizó desde el primer día.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Misión</h2>
            <div className="bg-blue-50 p-8 rounded-2xl mb-8">
              <p className="text-gray-700 leading-relaxed">
                {/* Escribe tu misión aquí */}
                Proporcionar productos de la más alta calidad que agreguen valor a los negocios 
                de nuestros clientes, manteniendo siempre estándares de excelencia en producción, 
                innovación y servicio al cliente.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Visión</h2>
            <div className="bg-purple-50 p-8 rounded-2xl mb-8">
              <p className="text-gray-700 leading-relaxed">
                {/* Escribe tu visión aquí */}
                Ser la empresa líder en la producción y distribución de barquillos y conos para 
                helado en el Perú, expandiendo nuestra presencia a nivel latinoamericano, siendo 
                reconocidos por nuestra calidad, innovación y compromiso con nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VALORES */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestros Valores
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Calidad</h3>
              <p className="text-gray-600">
                Compromiso inquebrantable con la excelencia en cada producto
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Clientes</h3>
              <p className="text-gray-600">
                Priorizamos la satisfacción y éxito de nuestros socios comerciales
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Innovación</h3>
              <p className="text-gray-600">
                Mejora continua en procesos y desarrollo de productos
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Pasión</h3>
              <p className="text-gray-600">
                Amor por lo que hacemos en cada detalle del proceso
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EQUIPO */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Nuestro Equipo</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl">
            <p className="text-gray-700 leading-relaxed text-lg">
              {/* Escribe sobre tu equipo aquí */}
              Contamos con un equipo de profesionales apasionados y comprometidos, desde nuestros 
              maestros panaderos con décadas de experiencia, hasta nuestro equipo de logística 
              que garantiza entregas puntuales en todo el país. Cada miembro de Barquirroll 
              trabaja con dedicación para mantener los más altos estándares de calidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
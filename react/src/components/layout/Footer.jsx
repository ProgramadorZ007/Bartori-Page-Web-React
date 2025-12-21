import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUMNA 1: LOGO Y DESCRIPCIÓN */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">BR</span>
              </div>
              <span className="text-xl font-bold">Barquirroll</span>
            </div>
            <p className="text-gray-400 text-sm">
              Los mejores barquillos y conos para helado de Perú. Calidad garantizada desde 1995.
            </p>
          </div>

          {/* COLUMNA 2: ENLACES RÁPIDOS */}
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="text-gray-400 hover:text-white transition">
                  Cotizar Mayorista
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+51 999 888 777</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>ventas@barquirroll.pe</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Av. Principal 123, Chiclayo, Lambayeque</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: REDES SOCIALES */}
          <div>
            <h3 className="font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* SEPARADOR */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Barquirroll. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
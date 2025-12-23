import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#2F2C7E] text-white mt-auto">
      <div className="w-full flex justify-center py-16">
        <div className="w-full max-w-7xl px-6 md:px-10 lg:px-16">

          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* COLUMNA 1: LOGO + TEXTO */}
            <div>
              <img
                src="/img/logo_bartori2.svg"
                alt="BARTORI PERÚ"
                className="h-14 mb-6"
              />
              <p className="text-sm leading-relaxed text-white/80 max-w-md">
                Especialistas en la distribución de barquillos y bases para
                helado BARTORI en la zona norte del Perú.
              </p>
            </div>

            {/* COLUMNA 2: NAVEGACIÓN */}
            <div>
              <h3 className="text-white font-semibold text-base mb-6 uppercase tracking-wide">
                Navegación
              </h3>

              <div className="grid grid-cols-2 gap-y-4 text-sm text-white/80">
                <Link to="/" className="hover:text-[#D8992F] transition-colors">
                  Página principal
                </Link>
                <Link to="/about" className="hover:text-[#D8992F] transition-colors">
                  Sobre nosotros
                </Link>
                <Link to="/products" className="hover:text-[#D8992F] transition-colors">
                  Nuestros productos
                </Link>
                <Link to="/wholesale" className="hover:text-[#D8992F] transition-colors">
                  Mayorista
                </Link>
              </div>
            </div>

            {/* COLUMNA 3: CONTACTO */}
            <div>
              <h3 className="text-white font-semibold text-base mb-6 uppercase tracking-wide">
                Contacto
              </h3>

              <ul className="space-y-5 text-sm text-white/80">

                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D8992F]" />
                  <span className="text-[#D8992F] font-semibold">
                    Llámanos al: (+51) 954 153 608
                  </span>
                </li>

              </ul>

              {/* REDES */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:border-[#D8992F] hover:text-[#D8992F] transition-all"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center hover:border-[#D8992F] hover:text-[#D8992F] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* SEPARADOR */}
          <div className="border-t border-white/20 mt-14 pt-6 text-center">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} Bartori Perú. Todos los derechos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

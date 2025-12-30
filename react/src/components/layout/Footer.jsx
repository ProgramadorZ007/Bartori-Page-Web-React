import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone } from 'lucide-react';
import { SOCIAL_LINKS, BUSINESS_PHONE } from '../../config/constants';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2F2C7E] text-white mt-auto">
      <div className="w-full flex justify-center py-12 sm:py-16">
        <div className="w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">

          {/* GRID PRINCIPAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">

            {/* COLUMNA 1: LOGO + TEXTO */}
            <div className="text-center sm:text-left">
              <img
                src="/img/logo_bartori2.svg"
                alt="BARTORI PERÚ"
                className="h-12 sm:h-14 mb-4 sm:mb-6 mx-auto sm:mx-0"
                loading="lazy"
              />
              <p className="text-sm leading-relaxed text-white/80 max-w-md mx-auto sm:mx-0">
                Especialistas en la distribución de barquillos y bases para
                helado BARTORI en la zona norte del Perú.
              </p>
            </div>

            {/* COLUMNA 2: NAVEGACIÓN */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-base mb-4 sm:mb-6 uppercase tracking-wide">
                Navegación
              </h3>

              <nav 
                className="grid grid-cols-2 gap-y-3 sm:gap-y-4 text-sm text-white/80"
                aria-label="Enlaces del footer"
              >
                <Link 
                  to="/" 
                  className="hover:text-[#D8992F] transition-colors"
                  aria-label="Ir a página principal"
                >
                  Página principal
                </Link>
                <Link 
                  to="/about" 
                  className="hover:text-[#D8992F] transition-colors"
                  aria-label="Conocer sobre nosotros"
                >
                  Sobre nosotros
                </Link>
                <Link 
                  to="/products" 
                  className="hover:text-[#D8992F] transition-colors"
                  aria-label="Ver productos"
                >
                  Nuestros productos
                </Link>
                <Link 
                  to="/wholesale" 
                  className="hover:text-[#D8992F] transition-colors"
                  aria-label="Cotizar como mayorista"
                >
                  Mayorista
                </Link>
              </nav>
            </div>

            {/* COLUMNA 3: CONTACTO */}
            <div className="text-center sm:text-left">
              <h3 className="text-white font-semibold text-base mb-4 sm:mb-6 uppercase tracking-wide">
                Contacto
              </h3>

              <ul className="space-y-4 sm:space-y-5 text-sm text-white/80">

                <li className="flex items-center gap-3 justify-center sm:justify-start">
                  <Phone className="w-4 h-4 text-[#D8992F] flex-shrink-0" />
                  <a 
                    href={`tel:${BUSINESS_PHONE.replace(/\s/g, '')}`}
                    className="text-[#D8992F] font-semibold hover:text-[#E5A940] transition-colors"
                    aria-label={`Llamar al ${BUSINESS_PHONE}`}
                  >
                    Llámanos al: {BUSINESS_PHONE}
                  </a>
                </li>

              </ul>

              {/* REDES */}
              <div 
                className="flex gap-4 mt-6 justify-center sm:justify-start"
                role="list"
                aria-label="Redes sociales"
              >
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 flex items-center justify-center hover:border-[#D8992F] hover:text-[#D8992F] transition-all"
                  aria-label="Visitar Facebook de Bartori Perú"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 flex items-center justify-center hover:border-[#D8992F] hover:text-[#D8992F] transition-all"
                  aria-label="Visitar Instagram de Bartori Perú"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* SEPARADOR */}
          <div className="border-t border-white/20 mt-10 sm:mt-14 pt-6 text-center">
            <p className="text-xs sm:text-sm text-white/60">
              © {currentYear} Bartori Perú. Todos los derechos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};
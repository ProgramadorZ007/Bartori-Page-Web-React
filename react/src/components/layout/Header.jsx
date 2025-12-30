import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, MapPin, Menu, X, Package } from 'lucide-react';
import { useRegion } from '../../context/RegionContext';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const { region, setRegion } = useRegion();
  const { getTotalItems } = useCart();
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const regions = ['Piura', 'Lambayeque'];

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (showRegionModal || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRegionModal, mobileMenuOpen]);

  const handleRegionSelect = (selectedRegion) => {
    setRegion(selectedRegion);
    setShowRegionModal(false);
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-10 py-3 sm:py-4 lg:py-5">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center flex-shrink-0 min-w-0">
              <Link to="/" aria-label="Ir a página principal de Bartori Perú">
                <img
                  src="/img/logo_bartori_original.svg"
                  alt="BARTORI PERÚ"
                  className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
                  loading="eager"
                />
              </Link>
            </div>

            {/* NAV DESKTOP */}
            <nav className="hidden lg:flex justify-center gap-4 xl:gap-10" aria-label="Navegación principal">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/about', label: 'Nosotros' },
                { to: '/products', label: 'Productos' }
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-gray-700 font-medium text-sm lg:text-base hover:text-[#C12423] relative group transition-colors ${
                    isActivePath(link.to) ? 'text-[#C12423]' : ''
                  }`}
                  aria-current={isActivePath(link.to) ? 'page' : undefined}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#C12423] transition-all ${
                    isActivePath(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* CONTROLES */}
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 justify-end">

              {/* MAYORISTA - Solo Desktop grande */}
              <Link
                to="/wholesale"
                className="hidden xl:flex items-center gap-2 px-3 py-2 border-2 border-[#D8992F] text-[#322B80] rounded-lg font-semibold text-sm hover:bg-[#D8992F] hover:text-white transition-all"
                aria-label="Ir a sección mayorista"
              >
                <Package className="w-4 h-4" />
                <span>Mayorista</span>
              </Link>

              {/* REGIÓN - Oculto en móvil pequeño */}
              <button
                onClick={() => setShowRegionModal(true)}
                className="hidden sm:flex items-center gap-1.5 md:gap-2 px-2 md:px-3 lg:px-4 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#C12423] transition-all"
                aria-label={region ? `Región: ${region}` : 'Seleccionar región'}
              >
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#C12423] flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium text-gray-700 truncate max-w-[60px] md:max-w-[80px] lg:max-w-[120px]">
                  {region || 'Región'}
                </span>
              </button>

              {/* CARRITO */}
              <Link
                to="/cart"
                className="relative flex items-center gap-1 sm:gap-1.5 md:gap-2 bg-[#C12423] hover:bg-[#322B80] text-white px-2 sm:px-3 md:px-4 lg:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all"
                aria-label={`Carrito: ${getTotalItems()} productos`}
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden md:inline">Carrito</span>

                {getTotalItems() > 0 && (
                  <span 
                    className="absolute -bottom-1 -left-1 bg-[#D8992F] text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center border-2 border-white shadow-lg"
                    aria-label={`${getTotalItems()} productos`}
                  >
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* MENU BUTTON */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4 md:w-5 md:h-5" /> : <Menu className="w-4 h-4 md:w-5 md:h-5" />}
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL */}
          {mobileMenuOpen && (
            <nav 
              className="lg:hidden mt-3 pt-3 border-t flex flex-col gap-2"
              aria-label="Navegación móvil"
            >
              {/* Región en móvil */}
              <button
                onClick={() => {
                  setShowRegionModal(true);
                  setMobileMenuOpen(false);
                }}
                className="sm:hidden flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 border border-gray-200"
              >
                <MapPin className="w-4 h-4 text-[#C12423]" />
                <span>{region || 'Seleccionar región'}</span>
              </button>

              {[
                { to: '/', label: 'Inicio' },
                { to: '/about', label: 'Nosotros' },
                { to: '/products', label: 'Productos' },
                { to: '/wholesale', label: 'Mayorista', icon: Package }
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-50 ${
                    isActivePath(link.to) ? 'bg-gray-100 text-[#C12423]' : 'text-gray-700'
                  }`}
                  aria-current={isActivePath(link.to) ? 'page' : undefined}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* MODAL REGIÓN */}
      {showRegionModal && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="region-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowRegionModal(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 md:p-8 shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 
                id="region-modal-title" 
                className="text-lg sm:text-xl md:text-2xl font-bold text-[#322B80]"
              >
                Selecciona tu región
              </h2>
              <button 
                onClick={() => setShowRegionModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6">
              Selecciona tu región para ver los precios correctos
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => handleRegionSelect(r)}
                  className={`p-3 sm:p-4 md:p-5 rounded-xl border-2 font-semibold text-sm sm:text-base transition-all ${
                    region === r
                      ? 'bg-[#C12423] text-white border-[#C12423] shadow-lg'
                      : 'border-gray-300 hover:border-[#C12423] hover:bg-gray-50'
                  }`}
                  aria-pressed={region === r}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
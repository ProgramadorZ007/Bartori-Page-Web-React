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

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Prevenir scroll cuando el modal está abierto
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4 lg:py-5">
          <div className="flex items-center justify-between lg:grid lg:grid-cols-3">

            {/* LOGO */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" aria-label="Ir a página principal de Bartori Perú">
                <img
                  src="/img/logo_bartori_original.svg"
                  alt="BARTORI PERÚ - Distribuidores de barquillos"
                  className="h-10 sm:h-12 lg:h-14 w-auto"
                  loading="eager"
                />
              </Link>
            </div>

            {/* NAV DESKTOP */}
            <nav className="hidden lg:flex justify-center gap-6 xl:gap-10" aria-label="Navegación principal">
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
            <div className="flex items-center gap-2 sm:gap-3 justify-end">

              {/* MAYORISTA - Solo Desktop grande */}
              <Link
                to="/wholesale"
                className="hidden xl:flex items-center gap-2 px-4 py-2.5 border-2 border-[#D8992F] text-[#322B80] rounded-lg font-semibold text-sm hover:bg-[#D8992F] hover:text-white transition-all"
                aria-label="Ir a sección mayorista"
              >
                <Package className="w-4 h-4" />
                <span>Mayorista</span>
              </Link>

              {/* REGIÓN */}
              <button
                onClick={() => setShowRegionModal(true)}
                className="hidden sm:flex items-center gap-2 px-3 lg:px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#C12423] transition-all"
                aria-label={region ? `Región seleccionada: ${region}. Click para cambiar` : 'Seleccionar región'}
              >
                <MapPin className="w-4 h-4 text-[#C12423] flex-shrink-0" />
                <span className="text-xs lg:text-sm font-medium text-gray-700 truncate max-w-[80px] lg:max-w-[120px]">
                  {region || 'Región'}
                </span>
              </button>

              {/* CARRITO */}
              <Link
                to="/cart"
                className="relative flex items-center gap-1.5 sm:gap-2 bg-[#C12423] hover:bg-[#322B80] text-white px-3 sm:px-4 lg:px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all"
                aria-label={`Ir al carrito. ${getTotalItems()} productos`}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Carrito</span>

                {/* BADGE */}
                {getTotalItems() > 0 && (
                  <span 
                    className="absolute -bottom-1 -left-1 bg-[#D8992F] text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-white shadow-lg"
                    aria-label={`${getTotalItems()} productos en el carrito`}
                  >
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL */}
          {mobileMenuOpen && (
            <nav 
              className="lg:hidden mt-4 pt-4 border-t flex flex-col gap-2"
              aria-label="Navegación móvil"
            >
              {/* Región en móvil */}
              <button
                onClick={() => {
                  setShowRegionModal(true);
                  setMobileMenuOpen(false);
                }}
                className="sm:hidden flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 border border-gray-200"
              >
                <MapPin className="w-5 h-5 text-[#C12423]" />
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium hover:bg-gray-50 ${
                    isActivePath(link.to) ? 'bg-gray-100 text-[#C12423]' : 'text-gray-700'
                  }`}
                  aria-current={isActivePath(link.to) ? 'page' : undefined}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
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
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="region-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowRegionModal(false);
          }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-6">
              <h2 
                id="region-modal-title" 
                className="text-xl sm:text-2xl font-bold text-[#322B80]"
              >
                Selecciona tu región
              </h2>
              <button 
                onClick={() => setShowRegionModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Selecciona tu región para ver los precios correctos de los productos
            </p>

            <div className="grid grid-cols-2 gap-4">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => handleRegionSelect(r)}
                  className={`p-4 sm:p-5 rounded-xl border-2 font-semibold transition-all ${
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
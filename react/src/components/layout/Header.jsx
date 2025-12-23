import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Menu, X, Package } from 'lucide-react';
import { useRegion } from '../../context/RegionContext';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const { region, setRegion } = useRegion();
  const { getTotalItems } = useCart();
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const regions = ['Piura', 'Lambayeque'];

  const handleRegionSelect = (selectedRegion) => {
    setRegion(selectedRegion);
    setShowRegionModal(false);
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="container mx-auto px-10 py-5">
          <div className="flex items-center justify-between lg:grid lg:grid-cols-3">

            {/* LOGO */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  src="/img/logo_bartori_original.svg"
                  alt="BARTORI PERÚ"
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            {/* NAV */}
            <nav className="hidden lg:flex justify-center gap-10">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/about', label: 'Nosotros' },
                { to: '/products', label: 'Productos' }
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-700 font-medium text-base hover:text-[#C12423] relative group transition-colors"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C12423] transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* CONTROLES */}
            <div className="flex items-center gap-3 justify-end">

              {/* MAYORISTA */}
              <Link
                to="/wholesale"
                className="hidden xl:flex items-center gap-2 px-5 py-3 border-2 border-[#D8992F] text-[#322B80] rounded-lg font-semibold text-sm hover:bg-[#D8992F] hover:text-white transition-all"
              >
                <Package className="w-5 h-5" />
                Mayorista
              </Link>

              {/* REGIÓN */}
              <button
                onClick={() => setShowRegionModal(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#C12423] transition-all"
              >
                <MapPin className="w-5 h-5 text-[#C12423]" />
                <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">
                  {region || 'Región'}
                </span>
              </button>

              {/* CARRITO */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 bg-[#C12423] hover:bg-[#322B80] text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden md:inline">Carrito</span>

                {/* BADGE DE CANTIDAD - CÍRCULO INFERIOR IZQUIERDO */}
                {getTotalItems() > 0 && (
                  <span className="absolute -bottom-1 -left-1 bg-[#D8992F] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* MOBILE */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-11 h-11 flex items-center justify-center border border-gray-200 rounded-lg"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-6 pt-6 border-t flex flex-col gap-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/about', label: 'Nosotros' },
                { to: '/products', label: 'Productos' }
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/wholesale"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 bg-[#C12423] text-white py-4 rounded-lg font-bold text-center"
              >
                Cotizar Mayorista
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* MODAL REGIÓN */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#322B80]">Selecciona tu región</h2>
              <button onClick={() => setShowRegionModal(false)}>
                <X />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => handleRegionSelect(r)}
                  className={`p-5 rounded-xl border-2 font-semibold transition-all ${
                    region === r
                      ? 'bg-[#C12423] text-white border-[#C12423]'
                      : 'border-gray-300 hover:border-[#C12423] hover:bg-gray-50'
                  }`}
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
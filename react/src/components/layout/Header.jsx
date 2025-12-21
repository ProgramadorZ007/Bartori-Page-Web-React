import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Menu, X } from 'lucide-react';
import { useRegion } from '../../context/RegionContext';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const { region, setRegion } = useRegion();
  const { getTotalItems } = useCart();
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const regions = ['Chiclayo', 'Piura', 'Lambayeque', 'Trujillo'];

  const handleRegionSelect = (selectedRegion) => {
    setRegion(selectedRegion);
    setShowRegionModal(false);
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <div className="relative">
                <span className="text-4xl font-bold text-[#C8102E]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                  BARTORI
                </span>
                <div className="absolute -left-2 top-0 w-1 h-full bg-[#F7B731] transform -skew-x-12"></div>
              </div>
            </Link>

            {/* NAVEGACIÓN DESKTOP */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-700 hover:text-[#C8102E] font-semibold transition">
                Inicio
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-[#C8102E] font-semibold transition">
                Sobre Nosotros
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-[#C8102E] font-semibold transition">
                Productos
              </Link>
              <Link 
                to="/wholesale" 
                className="bg-gradient-to-r from-[#C8102E] to-[#E91E8C] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Cotizar Mayorista
              </Link>
            </nav>

            {/* CONTROLES DERECHA */}
            <div className="flex items-center gap-4">
              
              {/* SELECTOR DE REGIÓN */}
              <button
                onClick={() => setShowRegionModal(true)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-[#C8102E] transition"
              >
                <MapPin className="w-5 h-5 text-[#C8102E]" />
                <span className="hidden sm:inline text-sm font-medium">
                  {region || 'Seleccionar región'}
                </span>
              </button>

              {/* CARRITO */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#C8102E] transition" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C8102E] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* MENÚ MÓVIL */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* MENÚ MÓVIL DESPLEGABLE */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-3 pb-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#C8102E] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-[#C8102E] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nosotros
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-[#C8102E] font-semibold py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
              <Link 
                to="/wholesale" 
                className="bg-gradient-to-r from-[#C8102E] to-[#E91E8C] text-white px-5 py-2 rounded-full font-semibold text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cotizar Mayorista
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* MODAL DE SELECCIÓN DE REGIÓN */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2E3192]">Selecciona tu región</h2>
              <button 
                onClick={() => setShowRegionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Los precios varían según tu ubicación por temas de logística
            </p>

            <div className="grid grid-cols-2 gap-3">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRegionSelect(r)}
                  className={`p-4 rounded-xl border-2 font-semibold transition transform hover:scale-105 ${
                    region === r
                      ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#C8102E]'
                  }`}
                >
                  <MapPin className="w-5 h-5 mx-auto mb-2" />
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
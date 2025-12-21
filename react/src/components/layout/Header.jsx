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

  const regions = ['Piura', 'Lambayeque']; // Agregué uno largo para probar

  const handleRegionSelect = (selectedRegion) => {
    setRegion(selectedRegion);
    setShowRegionModal(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="container mx-auto px-10 py-6">
          
          {/* CAMBIO CLAVE: Usamos GRID en desktop (lg:grid) con 3 columnas (grid-cols-3).
            Esto fuerza a que el centro sea el centro matemático real.
            En móvil usamos Flex para mantener el comportamiento estándar.
          */}
          <div className="flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-4">
            
            {/* ========== 1. IZQUIERDA (LOGO) ========== */}
            {/* justify-self-start alinea el logo al inicio de su columna izquierda */}
            <div className="flex items-center lg:justify-self-start">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src="/img/logo_bartori_original.svg" 
                  alt="BARTORI" 
                  className="h-16 w-auto hover:opacity-90 transition-opacity"
                />
              </Link>
            </div>

            {/* ========== 2. CENTRO (NAVEGACIÓN) ========== */}
            {/* justify-self-center alinea el menú al centro exacto de la columna central */}
            {/* Ya no usamos absolute, por lo que los links son 100% clickeables */}
            <nav className="hidden lg:flex items-center gap-8 lg:justify-self-center">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#C12423] font-semibold text-base transition-colors relative group whitespace-nowrap"
              >
                Página Principal
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C12423] transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-[#C12423] font-semibold text-base transition-colors relative group whitespace-nowrap"
              >
                Sobre Nosotros
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C12423] transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-[#C12423] font-semibold text-base transition-colors relative group whitespace-nowrap"
              >
                Nuestros Productos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C12423] transition-all group-hover:w-full"></span>
              </Link>
            </nav>

            {/* ========== 3. DERECHA (CONTROLES) ========== */}
            {/* justify-self-end alinea todo al final de la columna derecha */}
            <div className="flex items-center gap-4 lg:justify-self-end">
              
              {/* BOTÓN MAYORISTA */}
              {/* En pantallas medianas (xl) se muestra, en menores se oculta para dar espacio */}
              <Link 
                to="/wholesale" 
                className="hidden xl:flex items-center gap-2 bg-[#D8992F] hover:bg-[#C12423] text-white px-5 py-3 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap"
              >
                <Package className="w-5 h-5" />
                Mayorista
              </Link>

              {/* SELECTOR DE REGIÓN */}
              <button
                onClick={() => setShowRegionModal(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-3 bg-gray-50 hover:bg-[#C12423] border-2 border-gray-200 hover:border-[#C12423] rounded-lg transition-all group max-w-[200px]"
              >
                <MapPin className="w-5 h-5 text-[#C12423] group-hover:text-white transition-colors flex-shrink-0" />
                
                {/* SOLUCIÓN AL TEXTO LARGO: truncate y max-w */}
                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors truncate max-w-[100px] xl:max-w-[140px]">
                  {region || 'Región'}
                </span>
              </button>

              {/* CARRITO */}
              <Link 
                to="/cart" 
                className="relative flex items-center gap-3 bg-[#C12423] hover:bg-[#322B80] text-white px-5 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="hidden md:inline font-bold text-sm whitespace-nowrap">
                   {getTotalItems() > 0 ? `(${getTotalItems()})` : 'Carrito'}
                </span>
                {getTotalItems() > 0 && (
                  <span className="md:hidden absolute -top-2 -right-2 bg-[#D8992F] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              {/* MENÚ MÓVIL (ICONO) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden flex items-center justify-center w-12 h-12 border-2 border-gray-200 hover:border-[#C12423] hover:bg-gray-50 rounded-lg transition-all"
              >
                {mobileMenuOpen ? 
                  <X className="w-6 h-6 text-gray-700" /> : 
                  <Menu className="w-6 h-6 text-gray-700" />
                }
              </button>
            </div>
          </div>

          {/* ========== MENÚ MÓVIL DESPLEGABLE ========== */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3 pb-4 animate-in slide-in-from-top-2">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-[#C12423] font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-[#C12423] font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-[#C12423] font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Productos
              </Link>
               {/* Opción de Región para Móvil */}
               <button 
                onClick={() => { setShowRegionModal(true); setMobileMenuOpen(false); }}
                className="text-left text-gray-700 hover:text-[#C12423] font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition-all sm:hidden flex items-center gap-2"
              >
                <MapPin className="w-4 h-4"/>
                Cambiar Región ({region || 'Seleccionar'})
              </button>
              <Link 
                to="/wholesale" 
                className="flex items-center justify-center gap-2 bg-[#D8992F] hover:bg-[#C12423] text-white px-6 py-4 rounded-lg font-bold text-center transition-all shadow-md mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="w-5 h-5" />
                Cotizar Mayorista
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* ========== MODAL DE REGIÓN ========== */}
      {showRegionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[#322B80]">Selecciona tu región</h2>
              <button 
                onClick={() => setShowRegionModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-gray-600 text-lg mb-8">
              Los precios varían según tu ubicación
            </p>

            <div className="grid grid-cols-2 gap-4">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => handleRegionSelect(r)}
                  className={`p-6 rounded-xl border-2 font-bold text-lg transition-all ${
                    region === r
                      ? 'bg-[#C12423] text-white border-[#C12423] shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#C12423] hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <MapPin className={`w-7 h-7 mx-auto mb-3 ${
                    region === r ? 'text-white' : 'text-[#C12423]'
                  }`} />
                  {r}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Puedes cambiar tu región en cualquier momento
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
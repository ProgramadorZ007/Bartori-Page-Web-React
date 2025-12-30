import { useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Products = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filteredProducts = activeCategory === 'todos' 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  const counts = {
    todos: productsData.length,
    barquillos: productsData.filter(p => p.category === 'barquillos').length,
    bases: productsData.filter(p => p.category === 'bases').length
  };

  const categories = [
    { id: 'todos', label: 'Todos', count: counts.todos },
    { id: 'barquillos', label: 'Barquillos', count: counts.barquillos },
    { id: 'bases', label: 'Bases de Helado', count: counts.bases }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-[#322B80] text-white py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <div className="w-6 sm:w-8 h-0.5 bg-[#D8992F]"></div>
            <span className="text-[#D8992F] font-bold uppercase tracking-wider text-xs sm:text-sm">
              Catálogo completo
            </span>
            <div className="w-6 sm:w-8 h-0.5 bg-[#D8992F]"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
            Nuestros Productos
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4">
            Barquillos y bases de la más alta calidad para tu negocio
          </p>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 mt-2 sm:mt-4">
        <div className="flex gap-4 sm:gap-6 md:gap-8">
          
          {/* SIDEBAR FILTROS - Solo desktop */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl shadow-md p-5 xl:p-6 border border-gray-100">
              <h2 className="text-lg xl:text-xl font-bold text-[#322B80] mb-4">
                Categorías
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-3 xl:px-4 py-2.5 xl:py-3 rounded-lg font-semibold text-sm transition-all ${
                      activeCategory === category.id
                        ? 'bg-[#322B80] text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.label}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        activeCategory === category.id
                          ? 'bg-white/20'
                          : 'bg-gray-200'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <div className="flex-1 min-w-0">
            
            {/* FILTROS MÓVILES */}
            <div className="lg:hidden w-full mb-4 sm:mb-6">
              <div className="bg-white rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 border border-gray-100">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all whitespace-nowrap ${
                        activeCategory === category.id
                          ? 'bg-[#322B80] text-white'
                          : 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      {category.label}
                      <span className={`ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                        activeCategory === category.id
                          ? 'bg-white/20'
                          : 'bg-gray-200'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* HEADER DE PRODUCTOS */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#322B80]">
                {categories.find(c => c.id === activeCategory)?.label}
                <span className="text-gray-400 ml-2 sm:ml-3 font-normal text-base sm:text-lg">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'})
                </span>
              </h2>
            </div>

            {/* GRID DE PRODUCTOS */}
            <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16 sm:py-20">
                <p className="text-gray-500 text-lg sm:text-xl">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
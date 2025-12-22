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
      <div className="bg-[#322B80] text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
            <span className="text-[#D8992F] font-bold uppercase tracking-wider text-sm">
              Catálogo completo
            </span>
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Nuestros Productos
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Barquillos y bases de la más alta calidad para tu negocio
          </p>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="container mx-auto px-6 py-8 mt-4">
        <div className="flex gap-8">
          
          {/* SIDEBAR FILTROS */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-[#322B80] mb-4">
                Categorías
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
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

          {/* FILTROS MÓVILES */}
          <div className="lg:hidden w-full mb-6">
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      activeCategory === category.id
                        ? 'bg-[#322B80] text-white'
                        : 'bg-gray-50 text-gray-700'
                    }`}
                  >
                    {category.label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
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

          {/* PRODUCTOS */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#322B80]">
                {categories.find(c => c.id === activeCategory)?.label}
                <span className="text-gray-400 ml-3 font-normal text-lg">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'})
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
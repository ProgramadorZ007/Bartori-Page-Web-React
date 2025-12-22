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
      <div className="bg-gradient-to-br from-[#322B80] via-[#2d2670] to-[#1a1648] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
            <span className="text-[#D8992F] font-bold uppercase tracking-wider text-sm">
              Catálogo completo
            </span>
            <div className="w-8 h-0.5 bg-[#D8992F]"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Nuestros Productos
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Barquillos y bases de la más alta calidad para tu negocio
          </p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="sticky top-16 z-30 bg-white shadow-md border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#322B80] to-[#C12423] text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#322B80]'
                }`}
              >
                {category.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#322B80]">
            {categories.find(c => c.id === activeCategory)?.label}
            <span className="text-gray-400 ml-3 font-normal">({filteredProducts.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
  );
};
import { useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Products = () => {
  const [activeCategory, setActiveCategory] = useState('todos');

  // Filtrar productos según categoría
  const filteredProducts = activeCategory === 'todos' 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  // Contar productos por categoría
  const counts = {
    todos: productsData.length,
    barquillos: productsData.filter(p => p.category === 'barquillos').length,
    bases: productsData.filter(p => p.category === 'bases').length
  };

  const categories = [
    { id: 'todos', label: 'Todos los Productos', count: counts.todos },
    { id: 'barquillos', label: 'Barquillos', count: counts.barquillos },
    { id: 'bases', label: 'Bases de Helado', count: counts.bases }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== HERO SECTION ========== */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
            Nuestros Productos
          </h1>
          <p className="text-2xl drop-shadow-md">
            Barquillos y bases de la más alta calidad para tu negocio
          </p>
        </div>
      </div>

      {/* ========== FILTROS DE CATEGORÍA ========== */}
      <div className="sticky top-20 z-30 bg-white shadow-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
                <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
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

      {/* ========== PRODUCTOS ========== */}
      <div className="container mx-auto px-4 py-12">
        {/* Título de categoría actual */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {categories.find(c => c.id === activeCategory)?.label}
            <span className="text-gray-400 ml-3">({filteredProducts.length})</span>
          </h2>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensaje cuando no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-300 mb-4">
              <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 text-xl">No hay productos en esta categoría</p>
          </div>
        )}
      </div>

      {/* ========== LLAMADO A LA ACCIÓN ========== */}
      {filteredProducts.length > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 mt-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl font-bold mb-4">
              ¿Necesitas grandes cantidades?
            </h3>
            <p className="text-xl mb-8">
              Obtén precios especiales para compras mayoristas
            </p>
            <a
              href="/wholesale"
              className="inline-block bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-xl"
            >
              Cotizar Precios Mayoristas →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
import { ProductCard } from '../components/products/ProductCard';
import productsData from '../data/products.json';

export const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Nuestros Productos</h1>
          <p className="text-xl">
            Barquillos y conos de la más alta calidad para tu negocio
          </p>
        </div>
      </div>

      {/* PRODUCTOS */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {productsData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No hay productos disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};
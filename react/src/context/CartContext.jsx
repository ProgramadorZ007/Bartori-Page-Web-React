import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si ya existe, actualizar cantidad
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Si no existe, agregar nuevo
      return [...prev, { ...product, quantity }];
    });
  };

  // Actualizar cantidad de un producto
  const updateCartItem = (productId, newQuantity) => {
    if (newQuantity === 0) {
      // Eliminar del carrito
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } else {
      // Actualizar cantidad
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Obtener cantidad total de productos
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Obtener total del carrito (requiere región)
  const getCartTotal = (region) => {
    if (!region) return 0;
    return cartItems.reduce((total, item) => {
      const price = item.prices[region] || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateCartItem,
      clearCart,
      getTotalItems,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};
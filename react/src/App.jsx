import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegionProvider } from './context/RegionContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { AboutUs } from './pages/AboutUs';
import { Wholesale } from './pages/Wholesale';
import { Cart } from './pages/Cart';

function App() {
  return (
    <Router>
      <RegionProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/wholesale" element={<Wholesale />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Layout>
        </CartProvider>
      </RegionProvider>
    </Router>
  );
}

export default App;
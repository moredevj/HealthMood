import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './global.css';
import Layout from './modules/layouts/Layout';
import HomePage from './modules/home/pages/HomePage';
import AboutPage from './modules/about/pages/AboutPage';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import ProductsPage from './modules/products/pages/ProductsPage';
import Product from './modules/products/pages/Product';
import CartPage from './modules/cart/pages/CartPage';
import BlogPage from './modules/blog/pages/BlogPage';
import PostDetailPage from './modules/blog/pages/PostDetailPage';
import { CartProvider } from './modules/cart/components/CartProvider.jsx';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<PostDetailPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;


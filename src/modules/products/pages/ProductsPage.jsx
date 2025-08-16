import ProductList from '../components/ProductList';
import './ProductsPage.css';

export default function ProductsPage() {
  return (
    <div className="products-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-icon-container">
          <i className="fas fa-shopping-bag hero-icon"></i>
        </div>
        <h1 className="display-4 hero-title">Nuestros Productos</h1>
        <p className="hero-description">
          Descubre nuestra colección cuidadosamente seleccionada de productos premium con la mejor calidad y precio.
        </p>
      </div>
      
      <ProductList />
    </div>
  );
}
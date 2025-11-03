import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Layout/Header';
import MobileMenu from '../components/Layout/MobileMenu';
import Footer from '../components/Layout/Footer';
import ProductGrid from '../components/Shop/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import './Category.css';

const Category = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { category } = useParams();
  const { getProductsByCategory, loading } = useProducts();
  
  const categoryProducts = getProductsByCategory(category);

  const categoryNames = {
    electronics: 'Electronics',
    fashion: 'Fashion',
    home: 'Home & Living',
    beauty: 'Beauty',
    health: 'Health & Wellness',
    groceries: 'Groceries'
  };

  const displayName = categoryNames[category] || category;

  return (
    <div className="category-page">
      <Header onMenuToggle={() => setMobileMenuOpen(true)} />
      
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <section className="category-header">
        <h1 className="category-title">{displayName}</h1>
        <p className="category-description">
          Discover our amazing collection of {displayName.toLowerCase()} products
        </p>
      </section>

      <section className="category-products">
        <ProductGrid 
          products={categoryProducts} 
          loading={loading}
        />
      </section>

      <Footer />
    </div>
  );
};

export default Category;
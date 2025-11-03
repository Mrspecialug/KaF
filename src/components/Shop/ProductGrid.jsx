import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="product-grid loading">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="product-card skeleton">
            <div className="skeleton-image"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-button"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid empty">
        <p className="empty-section">No products available in this category.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
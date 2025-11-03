import React from 'react';
import ProductGrid from './ProductGrid';
import { useProducts } from '../../hooks/useProducts';
import './SearchResults.css';

const SearchResults = ({ query, onClose }) => {
  const { searchProducts } = useProducts();
  const results = searchProducts(query);

  return (
    <section className="search-results active">
      <div className="search-results-header">
        <h3 className="section-title">Search Results for "{query}"</h3>
        <button 
          className="close-search" 
          onClick={onClose}
          aria-label="Close search results"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <ProductGrid products={results} />
    </section>
  );
};

export default SearchResults;
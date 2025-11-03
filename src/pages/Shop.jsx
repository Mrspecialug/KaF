import React, { useState, useEffect } from 'react';
import Header from '../components/Layout/Header';
import MobileMenu from '../components/Layout/MobileMenu';
import Footer from '../components/Layout/Footer';
import ProductGrid from '../components/Shop/ProductGrid';
import SearchResults from '../components/Shop/SearchResults';
import { useProducts } from '../hooks/useProducts';
import './Shop.css';

const Shop = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { products, loading, getProductsByCategory } = useProducts();

  // Sample categories and deals (you can fetch these from your API)
  const categories = [
    { name: 'Electronics', image: 'https://picsum.photos/200?1', slug: 'electronics' },
    { name: 'Fashion', image: 'https://picsum.photos/200?2', slug: 'fashion' },
    { name: 'Home', image: 'https://picsum.photos/200?3', slug: 'home' },
    { name: 'Beauty', image: 'https://picsum.photos/200?4', slug: 'beauty' },
    { name: 'Health', image: 'https://picsum.photos/200?5', slug: 'health' },
    { name: 'Groceries', image: 'https://picsum.photos/200?6', slug: 'groceries' }
  ];

  const featuredProducts = products.slice(0, 4);
  const topDeals = products.slice(0, 3);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSearchResults(true);
  };

  const handleCloseSearch = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <div className="shop-page">
      <Header 
        onMenuToggle={() => setMobileMenuOpen(true)}
        onSearch={handleSearch}
      />
      
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {showSearchResults ? (
        <SearchResults 
          query={searchQuery}
          onClose={handleCloseSearch}
        />
      ) : (
        <>
          {/* Hero Slider */}
          <section className="hero">
            <div className="slides">
              <div className="slide active" style={{ backgroundImage: 'url(https://picsum.photos/1200/500?random=1)' }}>
                <h2>Big Deals Today</h2>
                <a href="#deals" className="btn">Shop Now</a>
              </div>
              <div className="slide" style={{ backgroundImage: 'url(https://picsum.photos/1200/500?random=2)' }}>
                <h2>Electronics Sale</h2>
                <a href="/category/electronics" className="btn">Explore</a>
              </div>
              <div className="slide" style={{ backgroundImage: 'url(https://picsum.photos/1200/500?random=3)' }}>
                <h2>Fashion Essentials</h2>
                <a href="/category/fashion" className="btn">See More</a>
              </div>
            </div>
            <button className="slide-btn prev" aria-label="Previous slide">❮</button>
            <button className="slide-btn next" aria-label="Next slide">❯</button>
          </section>

          {/* Categories Grid */}
          <section className="categories">
            <h3 className="section-title">Shop by Category</h3>
            <div className="cat-grid">
              {categories.map((category) => (
                <a key={category.slug} className="cat-card" href={`/category/${category.slug}`}>
                  <img src={category.image} alt={category.name} />
                  <span>{category.name}</span>
                </a>
              ))}
            </div>
          </section>

          {/* Deals Carousel */}
          <section className="deals" id="deals">
            <h3 className="section-title">Top Deals</h3>
            <div className="deal-track">
              {topDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Featured Products */}
          <section className="products">
            <h3 className="section-title">Featured Products</h3>
            <ProductGrid products={featuredProducts} />
          </section>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Shop;
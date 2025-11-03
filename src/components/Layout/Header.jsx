import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import './Header.css';

const Header = ({ onMenuToggle, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, profile } = useAuth();
  const { getCartCount } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="navbar">
      <div className="logo">
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          KaFra Shoppers
        </a>
      </div>
      
      <form className="search" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search products…" 
          aria-label="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          <i className="fas fa-search"></i>
        </button>
      </form>
      
      <div className="nav-icons">
        <a href={user ? "/profile" : "/login"} aria-label={user ? "Profile" : "Login"}>
          <i className="far fa-user"></i>
        </a>
        <a href="/cart" className="cart-icon" aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
          {getCartCount() > 0 && (
            <span className="cart-badge">{getCartCount()}</span>
          )}
        </a>
      </div>
      
      <button className="hamburger" aria-label="Toggle menu" onClick={onMenuToggle}>
        <i className="fas fa-bars"></i>
      </button>
    </header>
  );
};

export default Header;
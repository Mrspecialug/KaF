import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-menu-overlay active" onClick={onClose} />
      
      <nav className="mobile-menu open">
        <button className="mobile-menu-close" aria-label="Close menu" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="profile-section">
          <img 
            src={profile?.avatar_url || "https://picsum.photos/50?random=10"} 
            alt="User profile" 
            className="profile-img" 
          />
          <span className="profile-name">
            {profile?.full_name || (user ? 'User' : 'Guest')}
          </span>
        </div>
        
        <ul className="menu-list">
          <li>
            <a href="/profile" className="menu-item" onClick={onClose}>
              <i className="far fa-user"></i> My Profile
            </a>
          </li>
          <li>
            <a href="/profile#orders" className="menu-item" onClick={onClose}>
              <i className="fas fa-shopping-bag"></i> My Orders
            </a>
          </li>
          <li>
            <a href="/tracking" className="menu-item" onClick={onClose}>
              <i className="fas fa-shipping-fast"></i> Track Order
            </a>
          </li>
          
          <li className={`categories-menu ${categoriesOpen ? 'active' : ''}`}>
            <a 
              href="#" 
              className="menu-item categories-toggle"
              onClick={(e) => {
                e.preventDefault();
                setCategoriesOpen(!categoriesOpen);
              }}
            >
              <span><i className="fas fa-th-large"></i> Categories</span>
              <i className="fas fa-chevron-down"></i>
            </a>
            <ul className={`sub-menu ${categoriesOpen ? 'open' : ''}`}>
              <li>
                <a href="/category/electronics" className="sub-menu-item" onClick={onClose}>
                  <i className="fas fa-laptop"></i> Electronics
                </a>
              </li>
              <li>
                <a href="/category/fashion" className="sub-menu-item" onClick={onClose}>
                  <i className="fas fa-tshirt"></i> Fashion
                </a>
              </li>
              <li>
                <a href="/category/home" className="sub-menu-item" onClick={onClose}>
                  <i className="fas fa-home"></i> Home
                </a>
              </li>
              <li>
                <a href="/category/beauty" className="sub-menu-item" onClick={onClose}>
                  <i className="fas fa-spa"></i> Beauty
                </a>
              </li>
              <li>
                <a href="/category/health" className="sub-menu-item" onClick={onClose}>
                  <i className="fas fa-heartbeat"></i> Health
                </a>
              </li>
              <li>
                <a href="/category/groceries" className="sub-menu-item" onClick={onClose}>
                  <i className="fas fa-shopping-basket"></i> Groceries
                </a>
              </li>
            </ul>
          </li>
          
          {user ? (
            <li>
              <a 
                href="#logout" 
                className="menu-item" 
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" className="menu-item" onClick={onClose}>
                <i className="fas fa-sign-in-alt"></i> Login / Sign Up
              </a>
            </li>
          )}
          
          <li>
            <a href="/contact" className="menu-item" onClick={onClose}>
              <i className="fas fa-phone"></i> Contact Us
            </a>
          </li>
          <li>
            <a href="/help" className="menu-item" onClick={onClose}>
              <i className="fas fa-question-circle"></i> Help
            </a>
          </li>
          <li>
            <a href="/privacy" className="menu-item" onClick={onClose}>
              <i className="fas fa-shield-alt"></i> Security and Privacy
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;
import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import MobileMenu from '../components/Layout/MobileMenu';
import Footer from '../components/Layout/Footer';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import CheckoutForm from '../components/Cart/CheckoutForm';
import { useCart } from '../hooks/useCart';
import './Cart.css';

const Cart = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutActive, setCheckoutActive] = useState(false);
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setCheckoutActive(true);
  };

  const handleBackToCart = () => {
    setCheckoutActive(false);
  };

  const handleOrderComplete = () => {
    clearCart();
    setCheckoutActive(false);
    alert('Order placed successfully!');
  };

  return (
    <div className="cart-page">
      <Header 
        onMenuToggle={() => setMobileMenuOpen(true)}
      />
      
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <section className="cart">
        <h3 className="section-title">Your Cart</h3>
        
        {!checkoutActive ? (
          <>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <p>🛒 Your cart is empty.</p>
                  <a href="/shop" className="btn-continue">Return to Shop</a>
                </div>
              ) : (
                cart.map((item, index) => (
                  <CartItem
                    key={`${item.id}-${index}`}
                    item={item}
                    onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <CartSummary
                subtotal={getCartTotal()}
                deliveryFee={0} // Calculate based on your logic
                onCheckout={handleProceedToCheckout}
              />
            )}
          </>
        ) : (
          <CheckoutForm
            cart={cart}
            subtotal={getCartTotal()}
            deliveryFee={0} // Calculate based on your logic
            onBack={handleBackToCart}
            onComplete={handleOrderComplete}
          />
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
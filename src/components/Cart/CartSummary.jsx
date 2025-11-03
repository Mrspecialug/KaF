import React from 'react';
import './CartSummary.css';

const CartSummary = ({ subtotal, deliveryFee, onCheckout }) => {
  const transactionFee = Math.ceil(subtotal * 0.015); // 1.5% transaction fee
  const total = subtotal + deliveryFee + transactionFee;

  return (
    <div className="cart-summary">
      <div className="summary-details">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>UGX {subtotal.toLocaleString()}</span>
        </div>
        
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>UGX {deliveryFee.toLocaleString()}</span>
        </div>
        
        <div className="summary-row">
          <span>Transaction Fee (1.5%):</span>
          <span>UGX {transactionFee.toLocaleString()}</span>
        </div>
        
        <div className="summary-row total">
          <span><strong>Total:</strong></span>
          <span><strong>UGX {total.toLocaleString()}</strong></span>
        </div>
        
        {subtotal > 50000 && (
          <div className="free-delivery">
            <i className="fas fa-truck"></i> Free delivery on orders over UGX 50,000
          </div>
        )}
      </div>
      
      <button className="checkout-btn" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
import React from 'react';
import { useCart } from '../../hooks/useCart';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(newQuantity);
  };

  const handleRemove = () => {
    onRemove();
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.name}
        onError={(e) => {
          e.target.src = `https://picsum.photos/200/160?random=${item.id}`;
        }}
      />
      
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p className="price">UGX {item.price.toLocaleString()}</p>
        
        <div className="quantity-control">
          <button 
            className="quantity-decrease" 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input 
            type="number" 
            className="quantity-input" 
            value={item.quantity} 
            min="1"
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            aria-label="Quantity"
          />
          <button 
            className="quantity-increase" 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        
        <p className="item-total">Total: UGX {itemTotal.toLocaleString()}</p>
      </div>
      
      <button 
        className="remove-item" 
        onClick={handleRemove}
        aria-label="Remove item from cart"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
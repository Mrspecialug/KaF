import React, { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await addToCart(product, quantity);
      // Show success feedback
      setTimeout(() => setAdding(false), 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAdding(false);
    }
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <article className="product-card" data-category={product.category}>
      <img src={product.image} alt={product.name} />
      <h4 className="prod-name">{product.name}</h4>
      <p className="prod-price">UGX {product.price.toLocaleString()}</p>
      
      <div className="quantity-control">
        <button 
          className="quantity-decrease" 
          onClick={handleDecrease}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <input 
          type="number" 
          className="quantity-input" 
          value={quantity} 
          min="1"
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          aria-label="Quantity"
        />
        <button 
          className="quantity-increase" 
          onClick={handleIncrease}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      
      <button 
        className={`add-cart ${adding ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={adding}
      >
        {adding ? 'Added!' : 'Add to Cart'}
      </button>
    </article>
  );
};

export default ProductCard;
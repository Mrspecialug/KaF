import React, { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './CheckoutForm.css';

const CheckoutForm = ({ cart, subtotal, deliveryFee, onBack, onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mobile-money');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    notes: ''
  });

  const { createOrder } = useOrders();
  const { clearCart } = useCart();
  const { user, profile } = useAuth();

  // Pre-fill form with user data if available
  React.useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        name: profile.full_name || '',
        email: profile.email || ''
      }));
    }
  }, [profile]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const transactionFee = Math.ceil(subtotal * 0.015);
      const total = subtotal + deliveryFee + transactionFee;

      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        city: formData.city,
        district: formData.district,
        delivery_notes: formData.notes,
        payment_method: paymentMethod,
        items: cart,
        subtotal,
        delivery_fee: deliveryFee,
        transaction_fee: transactionFee,
        total_amount: total,
        status: 'pending'
      };

      await createOrder(orderData);
      await clearCart();
      onComplete();
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3 className="section-title">Checkout</h3>

      {/* Delivery Information */}
      <div className="form-section">
        <h4><i className="fas fa-truck"></i> Delivery Information</h4>
        
        <Input
          label="Full Name *"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Email Address *"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        
        <Input
          label="Phone Number *"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          placeholder="+256 XXX XXX XXX"
        />
        
        <Input
          label="Delivery Address *"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
          placeholder="Enter your complete address"
        />
        
        <div className="form-row">
          <Input
            label="City/Town *"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          
          <Input
            label="District *"
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <Input
          label="Delivery Notes (Optional)"
          type="textarea"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Any special delivery instructions..."
        />
      </div>

      {/* Payment Method */}
      <div className="form-section">
        <h4><i className="fas fa-credit-card"></i> Payment Method</h4>
        
        <div className="payment-methods">
          {['mobile-money', 'card', 'cash'].map(method => (
            <div key={method} className="payment-option">
              <input
                type="radio"
                id={method}
                name="payment-method"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label htmlFor={method}>
                <div className="payment-icon">
                  <i className={`fas fa-${
                    method === 'mobile-money' ? 'mobile-alt' :
                    method === 'card' ? 'credit-card' : 'money-bill-wave'
                  }`}></i>
                </div>
                <div className="payment-info">
                  <span className="payment-name">
                    {method === 'mobile-money' ? 'Mobile Money' :
                     method === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}
                  </span>
                  <span className="payment-desc">
                    {method === 'mobile-money' ? 'Pay with MTN or Airtel Money' :
                     method === 'card' ? 'Visa, Mastercard, or American Express' :
                     'Pay when you receive your order'}
                  </span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="form-section">
        <h4><i className="fas fa-receipt"></i> Order Summary</h4>
        <div className="order-summary">
          <div id="checkout-items">
            {cart.map(item => (
              <div key={item.id} className="checkout-item">
                <span>{item.name} × {item.quantity}</span>
                <span>UGX {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>UGX {subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>UGX {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Transaction Fee (1.5%):</span>
              <span>UGX {Math.ceil(subtotal * 0.015).toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span><strong>Total:</strong></span>
              <span><strong>UGX {(subtotal + deliveryFee + Math.ceil(subtotal * 0.015)).toLocaleString()}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-actions">
        <Button 
          type="submit" 
          loading={loading}
          className="submit-checkout"
        >
          Complete Order
        </Button>
        
        <button 
          type="button" 
          className="back-to-cart" 
          onClick={onBack}
          disabled={loading}
        >
          Back to Cart
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
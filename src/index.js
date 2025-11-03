import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import { ProductsProvider } from './hooks/useProducts';
import { CartProvider } from './hooks/useCart';
import { OrdersProvider } from './hooks/useOrders';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <OrdersProvider>
            <App />
          </OrdersProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Login from './components/Auth/Login';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { ProductsProvider } from './hooks/useProducts';
import { OrdersProvider } from './hooks/useOrders';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <OrdersProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Shop />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/category/:category" element={<Category />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </Router>
          </OrdersProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
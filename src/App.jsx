// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Wishlist from './pages/Wishlist/Wishlist';
import ProductDetails from './pages/ProductDetails/ProductDetails'; // import the new page

const App = () => {
  // You should have these handlers for cart/wishlist (or pass down from Redux)
  const handleAddToCart = (product) => {
    // implement cart adding logic here or via redux
    console.log('Add to cart:', product);
  };

  const handleAddToWishlist = (product) => {
    // implement wishlist adding logic here or via redux
    console.log('Add to wishlist:', product);
  };

  return (
    <>
      <Header /> {/* Header appears on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />} />
        <Route path="/product/:id" element={<ProductDetails onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
};

export default App;

// src/pages/Shop/Shop.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import { addToCart } from '../../redux/cartSlice'; // ✅ Import this
import ProductCard from '../../components/ProductCard/ProductCard';
import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // ✅ Dispatch the action
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Explore Our Latest Collection</h2>

      {status === 'loading' && <p className="status-message">Loading products...</p>}
      {status === 'failed' && <p className="status-message error">Error: {error}</p>}

      <div className="products-grid">
        {status === 'succeeded' &&
          items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart} 
            />
          ))}
      </div>
    </div>
  );
};

export default Shop;

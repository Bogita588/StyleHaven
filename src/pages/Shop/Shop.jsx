import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import { addToCart } from '../../redux/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/wishlistSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Shop.css';

const Shop = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const wishlist = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

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
              onAddToWishlist={() => handleToggleWishlist(product)}
              isWishlisted={isWishlisted(product.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Shop;

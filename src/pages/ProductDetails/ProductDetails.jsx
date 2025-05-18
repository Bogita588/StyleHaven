// src/pages/ProductDetails/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { addToWishlist } from '../../redux/wishlistSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetails.css';
import { Button, Typography, CircularProgress } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        setProduct(response.data);

        if (response.data?.category?.id) {
          const relatedResponse = await axios.get(
            `https://api.escuelajs.co/api/v1/products?categoryId=${response.data.category.id}&limit=6`
          );
          setRelatedProducts(
            relatedResponse.data.filter((p) => p.id !== response.data.id)
          );
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (!product) return <div className="error">Product not found.</div>;

  return (
    <div className="product-details-container">
      <Link to="/shop" className="back-link">&larr; Back to Shop</Link>

      <div className="product-details">
        <div className="image-section">
          <img
            src={product.images?.[0] || ''}
            alt={product.title}
            className="product-image"
          />
        </div>

        <div className="info-section">
          <Typography variant="h4" className="product-title">
            {product.title}
          </Typography>

          <Typography variant="h5" color="primary" className="product-price">
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" className="product-description">
            {product.description || 'No description available.'}
          </Typography>

          <div className="action-buttons">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              size="large"
            >
              Add to Cart
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<FavoriteBorderIcon />}
              onClick={handleAddToWishlist}
              size="large"
              sx={{ ml: 2 }}
            >
              Add to Wishlist
            </Button>
          </div>

          <div className="additional-info">
            <Typography variant="subtitle2">
              Category: {product.category?.name || 'N/A'}
            </Typography>
            <Typography variant="subtitle2">
              Rating: {product.rating?.rate || 'N/A'} / 5 ({product.rating?.count || 0} reviews)
            </Typography>
            <Typography variant="subtitle2">
              Stock: {product.stock ?? 'N/A'}
            </Typography>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <div className="related-products-list">
            {relatedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={() => dispatch(addToCart(prod))}
                onAddToWishlist={() => dispatch(addToWishlist(prod))}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// src/components/ProductCard/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './ProductCard.css';

export default function ProductCard({
  product,
  onAddToCart = () => {},      // fallback function for safety
  onAddToWishlist = () => {},   // fallback for wishlist
}) {
  const handleAddToCart = () => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    }
  };

  const handleAddToWishlist = () => {
    if (typeof onAddToWishlist === 'function') {
      onAddToWishlist(product);
    }
  };

  return (
    <Card className="product-card" elevation={3}>
      <Link
        to={`/product/${product.id}`}
        className="product-card__link"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.images?.[0] || ''}
          alt={product.title}
          className="product-card__image"
        />
        <CardContent className="product-card__content">
          <Tooltip title={product.title}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              className="product-card__title"
            >
              {product.title.length > 40
                ? product.title.slice(0, 37) + '...'
                : product.title}
            </Typography>
          </Tooltip>
        </CardContent>
      </Link>

      <Typography
        variant="h6"
        color="primary"
        className="product-card__price"
        sx={{ pl: 2 }}
      >
        ${product.price.toFixed(2)}
      </Typography>

      <CardActions className="product-card__actions">
        <Button
          size="small"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <IconButton
          color="secondary"
          aria-label="Add to wishlist"
          onClick={handleAddToWishlist}
        >
          <FavoriteBorderIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

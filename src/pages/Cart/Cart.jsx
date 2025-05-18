import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Grid, Divider, Box, Paper } from '@mui/material';
import CartItem from '../../components/CartItem/CartItem';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../redux/cartSlice';

import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrease = (item) => {
    dispatch(increaseQuantity({ id: item.id }));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity({ id: item.id }));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Box className="cart-page">
      <Typography variant="h4" className="cart-title">
        Your Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" className="cart-empty">
          Your cart is currently empty.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2} className="cart-items-grid">
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <CartItem
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              </Grid>
            ))}
          </Grid>

          <Paper elevation={3} className="cart-summary">
            <Typography variant="h6">Cart Summary</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">Total Items: {cartItems.length}</Typography>
            <Typography variant="body1">
              Total Price: <strong>${total.toFixed(2)}</strong>
            </Typography>

            <Box className="cart-actions">
              <Button variant="outlined" color="error" onClick={handleClearCart}>
                Clear Cart
              </Button>
              <Button variant="contained" color="primary">
                Proceed to Checkout
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Cart;

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
// Add more slices as needed

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    // user: userReducer, etc.
  },
  // Optional: Add middleware or devTools
});

export default store;

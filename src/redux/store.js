// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

import productReducer from './productSlice';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    admin: adminReducer,
  },
});

export default store;

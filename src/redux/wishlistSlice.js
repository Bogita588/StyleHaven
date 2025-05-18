// src/redux/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  try {
    const serialized = localStorage.getItem('wishlist');
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlistFromStorage(),
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.find((item) => item.id === product.id)) {
        state.items.push(product);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

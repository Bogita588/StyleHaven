// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/products');
  const data = await res.json();

  // Clean up invalid product data
  const validProducts = data.filter(
    (product) =>
      product.title &&
      product.price &&
      product.images &&
      product.images.length > 0 &&
      product.images[0].startsWith('http')
  );

  return validProducts;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // Add reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

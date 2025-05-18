// src/redux/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Basic scaffold for admin slice, extend as needed
const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    // Example: products managed by admin, loading states, errors etc
    managedProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add admin-specific reducers here (CRUD for products, etc)
  },
});

export default adminSlice.reducer;

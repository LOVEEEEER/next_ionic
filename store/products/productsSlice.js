import { createSlice } from '@reduxjs/toolkit';
import { createProduct, loadProductById, loadProductsList } from './productsActions';

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadProductsList.pending.type, state => {
      (state.isLoading = true), (state.error = null);
    });
    builder.addCase(loadProductsList.fulfilled.type, (state, action) => {
      state.entities = action.payload ? action.payload : [];
      state.isLoading = false;
    });
    builder.addCase(loadProductsList.rejected.type, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createProduct.pending.type, state => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(createProduct.fulfilled.type, (state, action) => {
      state.entities = [{ ...action.payload }, ...state.entities];
    });
    builder.addCase(createProduct.rejected.type, state => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { reducer: productsReducer } = productsSlice;

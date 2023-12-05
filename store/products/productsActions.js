import { createAsyncThunk } from '@reduxjs/toolkit';
import productsService from '../../services/products.service';

export const loadProductsList = createAsyncThunk('products/received', async (_, thunkAPI) => {
  try {
    const { content } = await productsService.fetchAll();
    return content;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const createProduct = createAsyncThunk(
  'products/created',
  async ({ id, product, clearForm }, thunkAPI) => {
    try {
      await productsService.createProduct(id, product);
      clearForm();
      return product;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

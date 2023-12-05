import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './products/productsSlice';

const rootReducer = combineReducers({
  products: productsReducer,
});

export default function initiateStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

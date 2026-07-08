import { configureStore } from '@reduxjs/toolkit';
import orchidReducer from './orchidSlice';
import categoryReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    orchids: orchidReducer,
    categories: categoryReducer,
  },
});
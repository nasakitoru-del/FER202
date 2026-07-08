import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../api/categoryApi';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  return await getAllCategories();
});

export const addCategory = createAsyncThunk('categories/addCategory', async (categoryData) => {
  return await createCategory(categoryData);
});

export const editCategory = createAsyncThunk('categories/editCategory', async ({ id, data }) => {
  return await updateCategory(id, data);
});

export const removeCategory = createAsyncThunk('categories/removeCategory', async (id) => {
  await deleteCategory(id);
  return id; 
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = Array.isArray(action.payload) ? action.payload : action.payload?.data ?? [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const index = state.data.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(c => c.id !== action.payload);
      });
  }
});

export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllOrchids, createOrchid, updateOrchid, deleteOrchid } from '../api/orchidApi';

export const fetchOrchids = createAsyncThunk('orchids/fetchOrchids', async () => {
  return await getAllOrchids();
});

export const addOrchid = createAsyncThunk('orchids/addOrchid', async (orchidData) => {
  return await createOrchid(orchidData);
});

export const editOrchid = createAsyncThunk('orchids/editOrchid', async ({ id, data }) => {
  return await updateOrchid(id, data);
});

export const removeOrchid = createAsyncThunk('orchids/removeOrchid', async (id) => {
  await deleteOrchid(id);
  return id; 
});

const orchidSlice = createSlice({
  name: 'orchids',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrchids.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = Array.isArray(action.payload) ? action.payload : action.payload?.data ?? [];
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addOrchid.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editOrchid.fulfilled, (state, action) => {
        const index = state.data.findIndex(o => o.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(removeOrchid.fulfilled, (state, action) => {
        state.data = state.data.filter(o => o.id !== action.payload);
      });
  }
});

export default orchidSlice.reducer;
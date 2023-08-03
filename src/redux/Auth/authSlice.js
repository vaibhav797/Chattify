import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userInfo: null
};


export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state,action) => {
      state.userInfo = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state) => state.auth.userInfo;


export default authSlice.reducer;
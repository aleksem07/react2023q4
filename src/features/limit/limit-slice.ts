import { createSlice } from '@reduxjs/toolkit';

const START_LIMIT = 10;

const initialState = {
  limit: START_LIMIT,
};

export const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
});

export const { setLimit } = limitSlice.actions;

export default limitSlice.reducer;

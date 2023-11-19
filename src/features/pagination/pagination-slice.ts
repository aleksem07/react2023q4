import { createSlice } from '@reduxjs/toolkit';

const START_PAGE = 1;

const initialState = {
  currentPage: START_PAGE,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = paginationSlice.actions;

export default paginationSlice.reducer;

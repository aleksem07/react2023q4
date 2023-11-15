import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: localStorage.getItem('search') || '',
  searchLS: localStorage.getItem('search') || '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setSearchLS: (state, action) => {
      if (state.searchValue !== state.searchLS) {
        localStorage.setItem('search', state.searchValue);
        state.searchLS = state.searchValue;
      } else {
        state.searchLS = action.payload;
      }
    },
  },
});

export const { setSearchValue, setSearchLS } = searchSlice.actions;

export default searchSlice.reducer;

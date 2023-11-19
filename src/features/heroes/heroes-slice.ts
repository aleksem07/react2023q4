import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  heroes: [],
  status: false,
  currentHero: null,
};

export const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setHeroes: (state, action) => {
      state.heroes = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCurrentHero: (state, action) => {
      state.currentHero = action.payload;
    },
  },
});

export const { setHeroes, setStatus, setCurrentHero } = heroesSlice.actions;

export default heroesSlice.reducer;

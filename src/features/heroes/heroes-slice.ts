import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getHeroesAll from '../../services/heroes/heroes';
// import axios from 'axios';

const initialState = {
  heroes: [],
  status: false,
};

type getHeroesAllProps = {
  searchValue: string;
  page: number;
};

export const getHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  async (
    { searchValue, page }: getHeroesAllProps,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const heroes = await getHeroesAll(searchValue, page);
      dispatch(setHeroes(heroes.results));
      return heroes;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHeroes.pending, (state) => {
        // state.status = false;
        console.log(state.heroes);
        console.log('pending');
      })
      .addCase(getHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        // state.status = true;
        console.log(state.heroes);
        console.log('fulfilled');
      });
  },
});

export const { setHeroes, setStatus } = heroesSlice.actions;

export default heroesSlice.reducer;

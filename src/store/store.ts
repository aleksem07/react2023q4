import { configureStore } from '@reduxjs/toolkit';
import searchSlice from '../features/search/search-slice';
import paginationSlice from '../features/pagination/pagination-slice';
import heroesSlice from '../features/heroes/heroes-slice';
import limitSlice from '../features/limit/limit-slice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    pagination: paginationSlice,
    heroes: heroesSlice,
    limit: limitSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

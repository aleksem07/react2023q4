import { configureStore } from '@reduxjs/toolkit';
import { uncontrolledFormSlice } from '../features/uncontrolled/uncontrolled-slice';
import { controlledFormSlice } from '../features/react-hook-form/react-hook-gorm-slice';

export const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormSlice.reducer,
    controlledForm: controlledFormSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
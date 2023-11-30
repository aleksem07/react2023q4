import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
};

export const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    }
  },
});

export const { setName } = controlledFormSlice.actions;

export default controlledFormSlice.reducer;
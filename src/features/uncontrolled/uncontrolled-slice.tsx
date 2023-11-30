import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: boolean;
  pic: string;
  country: string;
}

const initialState: initialStateType = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  acceptTC: false,
  pic: '',
  country: '',
};

export const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    }
  },
})

export const { setName } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
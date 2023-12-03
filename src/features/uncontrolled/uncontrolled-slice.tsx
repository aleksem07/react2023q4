import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    setFormUncontrolledData: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.gender = action.payload.gender;
      state.acceptTC = action.payload.acceptTC;
      state.pic = action.payload.pic;
      state.country = action.payload.country;
    },
  },
});

export const { setFormUncontrolledData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;

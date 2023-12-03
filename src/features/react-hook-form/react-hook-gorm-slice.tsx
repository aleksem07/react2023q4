import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTC: false,
  pic: '',
  country: '',
};

export const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setFormControlledData(state, action) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      state.gender = action.payload.gender;
      state.acceptTC = action.payload.acceptTC;
      state.pic = action.payload.pic[0].name;
      state.country = action.payload.country;
    },
  },
});

export const { setFormControlledData } = controlledFormSlice.actions;

export default controlledFormSlice.reducer;

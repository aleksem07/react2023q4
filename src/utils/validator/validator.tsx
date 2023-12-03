import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .matches(/^[A-Za-z]*$/, 'Name should be only letters')
    .matches(/^[A-Z][a-z]*$/, 'Only first letter should be uppercase')
    .required('Name is required'),
});

export const ageSchema = yup.object({
  age: yup
    .number()
    .min(18, 'Age must be at least 18')
    .max(99, 'Age must be less than 99')
    .required('Age is required'),
});

export const emailSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email'
    )
    .required('Email is required'),
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/,
      'Password must contain at least one special character'
    )
    .required('Password is required'),
});

export const confirmPasswordSchema = yup.object({
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export const acceptTCSchema = yup.object({
  acceptTC: yup
    .boolean()
    .oneOf([true], 'Please accept the terms and conditions'),
});

export const genderSchema = yup.object({
  gender: yup.string().oneOf(['male', 'female'], 'Please choose your gender'),
});

export const countrySchema = yup.object({
  country: yup.string().required('Please choose your country'),
});

export const picSchema = yup.object({
  pic: yup.string().required('Please upload your profile picture'),
});

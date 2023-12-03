import { AppRoute } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/uncontrolled-form.module.scss';
import { useDispatch } from 'react-redux';
import { setFormUncontrolledData } from '../../features/uncontrolled/uncontrolled-slice';
import { useState } from 'react';
import {
  userSchema,
  ageSchema,
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
  acceptTCSchema,
} from '../../utils/validator/validator';
import checkPasswordLength from '../../utils/password/password';
import * as yup from 'yup';


export default function UncontrolledForm() {
  checkPasswordLength();
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    acceptTC: false,
    pic: '',
    country: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTC: '',
    pic: '',
    country: '',
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    try {
      await userSchema.validate(formData);
    } catch (err) {
      isValid = false;
      if (err instanceof yup.ValidationError) {
        const yupError = err as yup.ValidationError;
        setErrors({
          name: yupError.path === 'name' ? yupError.errors[0] : '',
          age: yupError.path === 'age' ? yupError.errors[0] : '',
          email: yupError.path === 'email' ? yupError.errors[0] : '',
          password: yupError.path === 'password' ? yupError.errors[0] : '',
          confirmPassword:
            yupError.path === 'confirmPassword' ? yupError.errors[0] : '',
          acceptTC: yupError.path === 'acceptTC' ? yupError.errors[0] : '',
          pic: yupError.path === 'pic' ? yupError.errors[0] : '',
          country: yupError.path === 'country' ? yupError.errors[0] : '',
        });
      }
    }
    try {
      await ageSchema.validate(formData);
    } catch (err) {
      isValid = false;
      if (err instanceof yup.ValidationError) {
        const yupError = err as yup.ValidationError;
        setErrors((prevErrors) => ({
          ...prevErrors,
          age: yupError.path === 'age' ? yupError.errors[0] : prevErrors.age,
        }));
      }
    }

    try {
      await emailSchema.validate(formData);
    } catch (err) {
      isValid = false;
      if (err instanceof yup.ValidationError) {
        const yupError = err as yup.ValidationError;
        setErrors((prevErrors) => ({
          ...prevErrors,
          email:
            yupError.path === 'email' ? yupError.errors[0] : prevErrors.email,
        }));
      }
    }

    try {
      await passwordSchema.validate(formData);
    } catch (err) {
      isValid = false;
      if (err instanceof yup.ValidationError) {
        const yupError = err as yup.ValidationError;
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            yupError.path === 'password'
              ? yupError.errors[0]
              : prevErrors.password,
        }));
      }
    }

    try {
      await confirmPasswordSchema.validate(formData);
    } catch (err) {
      isValid = false;
      if (err instanceof yup.ValidationError) {
        const yupError = err as yup.ValidationError;
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword:
            yupError.path === 'confirmPassword'
              ? yupError.errors[0]
              : prevErrors.confirmPassword,
        }));
      }
    }

    try {
      await acceptTCSchema.validate(formData);
    } catch (err) {
      isValid = false;
      if (err instanceof yup.ValidationError) {
        const yupError = err as yup.ValidationError;
        setErrors((prevErrors) => ({
          ...prevErrors,
          acceptTC:
            yupError.path === 'acceptTC'
              ? yupError.errors[0]
              : prevErrors.acceptTC,
        }));
      }
    }

    if (isValid) {
      dispatch(setFormUncontrolledData(formData));
      redirect(AppRoute.Root);
    }
  };

  return (
    <>
      <form
        className={styles.form}
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Stepash"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span>{errors.name}</span>}
        </label>
        <label>
          Age:
          <input
            type="number"
            name="Age"
            placeholder="18"
            required
            value={formData.age > 0 ? formData.age : ''}
            onChange={(e) =>
              setFormData({ ...formData, age: Number(e.target.value) })
            }
          />
          {errors.age && <span>{errors.age}</span>}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="email@mail.com"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span>{errors.email}</span>}
        </label>
        <label>
          Password:
          <input
            type="password"
            id='password'
            name="password"
            placeholder="Password1!"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <span>{errors.password}</span>}
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="confirm-password"
            placeholder="Password1!"
            required
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          accept T&C
          <input
            type="checkbox"
            name="acceptTC"
            checked={formData.acceptTC}
            onChange={(e) =>
              setFormData({ ...formData, acceptTC: e.target.checked })
            }
          />
          {errors.acceptTC && <span>{errors.acceptTC}</span>}
        </label>
        <label>
          <input
            type="file"
            name="pic"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
          />
        </label>

        <label>
          Country:
          <input
            type="text"
            name="country"
            placeholder="En"
            required
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      <Link to={AppRoute.Root}>
        <p>Back to main</p>
      </Link>
    </>
  );
}

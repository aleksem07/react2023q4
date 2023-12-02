import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '../../styles/controlled-form.module.scss';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useDispatch } from 'react-redux';
import { setFormControlledData } from '../../features/react-hook-form/react-hook-gorm-slice';

type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: boolean;
  pic: string;
  country: string;
};

export default function ReactHookForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    dispatch(setFormControlledData(data));

  // console.log(watch('name'));

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input
            {...register('name', { required: 'Field name is required' })}
            placeholder="Izyum"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>

        <label>
          Age:
          <input
            type="number"
            {...register('age', {
              required: 'Field age is required',
              min: { value: 1, message: 'Minimum age should be 1' },
            })}
            placeholder="18"
          />
          {errors.age && <span>{errors.age.message}</span>}
        </label>

        <label>
          Email:
          <input
            type="email"
            {...register('email', { required: 'Field email is required' })}
            placeholder="email@mail.com"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>

        <label>
          Password:
          <input
            type="password"
            {...register('password', {
              required: 'Field password is required',
              minLength: {
                value: 6,
                message: 'Minimum length should be 6',
              },
            })}
            placeholder="Password1!"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>

        <label>
          Confirm:
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Field confirm password is required',
              minLength: {
                value: 6,
                message: 'Minimum length should be 6',
              },
            })}
            placeholder="Password1!"
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </label>

        <label>
          Gender:
          <select {...register('gender')}>
            <option defaultValue="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Accept T&C:
          <input
            type="checkbox"
            {...register('acceptTC', {
              required: 'Field accept T&C is required',
            })}
          />
          {errors.acceptTC && <span>{errors.acceptTC.message}</span>}
        </label>

        <label>
          Upload:
          <input
            type="file"
            {...register('pic', { required: 'Field upload is required' })}
          />
          {errors.pic && <span>{errors.pic.message}</span>}
        </label>

        <label>
          Country:
          <input
            {...register('country', { required: 'Field country is required' })}
            placeholder="Ru"
          />
          {errors.country && <span>{errors.country.message}</span>}
        </label>

        <button type="submit">Submit</button>
      </form>

      <Link to={AppRoute.Root}>
        <p>Back to main</p>
      </Link>
    </>
  );
}

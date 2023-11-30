import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '../../styles/controlled-form.module.scss';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('name'));

  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input {...register('name', { required: true })} placeholder="Izyum" />
        {errors.name && <span>Field name is required</span>}
      </label>

      <input type='number' {...register('age', { min: { value: 18, message: 'Minimum age should be 18'}, max: {
        value: 100,
        message: 'Maximum age should be 100',
      }})} />
      {errors.age && <span>{errors.age.message}</span>}
      <input
        {...register('email', { required: true })}
        placeholder="email@mail.com"
      />
      {errors.email && <span>Field email is required</span>}
      <input
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
      <input
        {...register('confirmPassword', {
          required: 'Field confirm password is required',
          minLength: {
            value: 6,
            message: 'Minimum length should be 6',
          },
        })}
        placeholder="Password1!"
      />
      {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
      <select {...register('gender')}>
        <option defaultValue="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <span>Field gender is required</span>}
      <input {...register('acceptTC', { required: true })} />
      {errors.acceptTC && <span>Field acceptTC is required</span>}
      <input {...register('pic', { required: true })} />
      {errors.pic && <span>Field pic is required</span>}
      <input {...register('country', { required: true })} placeholder="Ru" />
      {errors.country && <span>Field country is required</span>}

      <button type="submit">Submit</button>
    </form>

    <Link to={AppRoute.Root}>
      <p>Back to main</p>
    </Link>
    </>
  );
}

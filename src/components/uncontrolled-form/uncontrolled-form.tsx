import { AppRoute } from '../../const';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/uncontrolled-form.module.scss';
import { useDispatch } from 'react-redux';
import { setFormUncontrolledData } from '../../features/uncontrolled/uncontrolled-slice';
import { useState } from 'react';

export default function UncontrolledForm() {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFormUncontrolledData(formData));
    redirect(AppRoute.Root);
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
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password1!"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
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
            required
            checked={formData.acceptTC}
            onChange={(e) =>
              setFormData({ ...formData, acceptTC: e.target.checked })
            }
          />
        </label>
        <label>
          <input
            type="file"
            name="pic"
            accept="image/*"
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

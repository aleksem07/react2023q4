import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import styles from '../../styles/uncontrolled-form.module.scss';

export default function UncontrolledForm() {
  return (
    <>
      {/* action="https://httpbin.org/post" */}
      <form className={styles.form} method="get" encType="multipart/form-data">
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Age:
          <input type="number" name="Age" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirm-password" />
        </label>

        <label>
          Gender:
          <select name="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          accept T&C
          <input type="checkbox" name="acceptTC" />
        </label>
        <label>
          <input type="file" name="pic" accept="image/*" />
        </label>

        <label>
          Country:
          <input type="text" name="country" />
        </label>

        <button type="submit">Submit</button>
      </form>

      <Link to={AppRoute.Root}>
        <p>Back to main</p>
      </Link>
    </>
  );
}

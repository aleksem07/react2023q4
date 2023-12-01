import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import SubmittedUncontrolledForm from '../submitted-uncontrolled-form/submitted-uncontrolled-form';
import styles from '../../styles/main.module.scss';

export default function Main() {
  return (
    <>
      <h1>Main</h1>
      <h2>should have links to other 2 routes</h2>
      <div className={styles.container}>
        <div className={styles.uncontrolled}>
          <h3>
            Route for the form created using uncontrolled components approach
          </h3>
          <Link to={AppRoute.Uncontrolled}>
            <p>Uncontrolled</p>
          </Link>
          <SubmittedUncontrolledForm />
        </div>
        <div className={styles.controlled}>
          <h3>
            Route for the similar form, but created with the help of the React
            Hook Form
          </h3>
          <Link to={AppRoute.Controlled}>
            <p>Controlled</p>
          </Link>
        </div>
      </div>
    </>
  );
}

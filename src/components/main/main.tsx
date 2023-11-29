import { AppRoute } from '../../const';

export default function Main() {
  return (
    <>
      <h2>should have links to other 2 routes</h2>
      <h3>Route for the form created using uncontrolled components approach</h3>
      <a href={AppRoute.Uncontrolled}>
        <p>Uncontrolled</p>
      </a>
      <h3>
        Route for the similar form, but created with the help of the React Hook
        Form
      </h3>
      <a href={AppRoute.Controlled}>
        <p>Controlled</p>
      </a>
    </>
  );
}

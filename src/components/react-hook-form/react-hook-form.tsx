import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

export default function ReactHookForm() {
  return (
    <>
      <p>ReactHookForm</p>
      <Link to={AppRoute.Root}>
        <p>Back to main</p>
      </Link>
    </>
  );
}

import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 Page Not Found</h1>

      <Link to={AppRoute.Root}>Go to main page</Link>
    </div>
  );
}

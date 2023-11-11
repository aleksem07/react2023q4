import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="container m-5 text-center">
      <p className="h2 mb-4">404 Page not found</p>
      <Link className="btn btn-secondary" to="/">
        Back to main page
      </Link>
    </div>
  );
}

export default PageNotFound;

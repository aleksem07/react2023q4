import './pagination.scss';
import { PaginationProps } from './pagination.types';

function Pagination({ fetchData, page, onPageChange }: PaginationProps) {
  const maxPages = fetchData.count ? Math.ceil(fetchData.count / 10) : 1;

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <>
      <nav aria-label="...">
        <ul className="pagination justify-content-center gap-2">
          {fetchData.previous !== null && page > 1 ? (
            <>
              <li className="page-item bg-light">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="page-link text-dark"
                >
                  Prev
                </button>
              </li>
              <li className="page-item disabled">
                <button className="page-link text-dark">{page - 1}</button>
              </li>
            </>
          ) : (
            <li className="page-item disabled">
              <button className="page-link text-dark">Prev</button>
            </li>
          )}

          <li className="page-item active-link ">
            <button className="page-link current">{page}</button>
          </li>

          {fetchData.next !== null && page < maxPages ? (
            <>
              <li className="page-item disabled">
                <button className="page-link text-dark">{page + 1}</button>
              </li>
              <li className="page-item">
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="page-link text-dark"
                >
                  Next
                </button>
              </li>
            </>
          ) : (
            <li className="page-item disabled">
              <button className="page-link text-dark">Next</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Pagination;

import './pagination.scss';
import { PaginationProps } from './pagination.types';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../features/pagination/pagination-slice';
import { RootState } from '../../store/store';

function Pagination({ fetchData }: PaginationProps) {
  const maxPages = fetchData.count ? Math.ceil(fetchData.count / 10) : 1;
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  return (
    <>
      <nav data-testid="pagination">
        <ul className="pagination justify-content-center gap-2">
          {fetchData.previous !== null && currentPage > 1 ? (
            <>
              <li className="page-item bg-light">
                <button
                  onClick={() => dispatch(setPage(currentPage - 1))}
                  className="page-link text-dark"
                >
                  Prev
                </button>
              </li>
              <li className="page-item disabled">
                <button className="page-link text-dark">
                  {currentPage - 1}
                </button>
              </li>
            </>
          ) : (
            <li className="page-item disabled">
              <button className="page-link text-dark">Prev</button>
            </li>
          )}

          <li className="page-item active-link ">
            <button className="page-link current">{currentPage}</button>
          </li>

          {fetchData.next !== null && currentPage < maxPages ? (
            <>
              <li className="page-item disabled">
                <button className="page-link text-dark">
                  {currentPage + 1}
                </button>
              </li>
              <li className="page-item">
                <button
                  onClick={() => dispatch(setPage(currentPage + 1))}
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

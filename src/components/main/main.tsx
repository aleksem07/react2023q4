import './main.scss';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import { InputLimit } from '../input-limit/input-limit';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setPage } from '../../features/pagination/pagination-slice';
import { useDispatch } from 'react-redux';
import { setHeroes, getHeroes } from '../../features/heroes/heroes-slice';
import Heroes from '../heroes/heroes';

export default function Main() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const [data, setData] = useState({
    next: null,
    previous: null,
    results: [],
  });
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const searchLS = useSelector((state: RootState) => state.search.searchLS);
  const heroList = useSelector((state: RootState) => state.heroes.heroes);
  const limit = useSelector((state: RootState) => state.limit.limit);

  useEffect(() => {
    handlePageChange(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLS, currentPage, limit]);

  const handlePageChange = useCallback(
    async (page: number) => {
      dispatch(setPage(page));
      navigate(`/?page=${currentPage}`);

      try {
        const heroes = await dispatch(
          getHeroes({ searchValue, page })
        ).unwrap();
        setData(heroes);

        if (heroes) {
          dispatch(setHeroes(heroes.results.slice(0, limit)));
          navigate(`/?page=${page}`);
          dispatch(setPage(page));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    [searchValue, currentPage, limit, dispatch, navigate]
  );

  return (
    <div data-testid="main" className="main p-0 pb-0 container">
      <div className="main__container">
        <h1 className="h1 text-center my-3">Star Wars Heroes</h1>
        <div className="pagination d-flex justify-content-center gap-3">
          {heroList.length > 0 && (
            <Pagination
              fetchData={data}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <InputLimit />
        </div>
        <Heroes page={currentPage} />;
      </div>
      <Outlet />
    </div>
  );
}

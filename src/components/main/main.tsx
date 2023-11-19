import './main.scss';
import { useEffect, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import { InputLimit } from '../input-limit/input-limit';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setPage } from '../../features/pagination/pagination-slice';
import { useDispatch } from 'react-redux';
import { setHeroes } from '../../features/heroes/heroes-slice';
import Heroes from '../heroes/heroes';
import heroesApi from '../../api/api';
import { Loader } from '../loader/loader';

export default function Main() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const heroList = useSelector((state: RootState) => state.heroes.heroes);
  const limit = useSelector((state: RootState) => state.limit.limit);
  const { data, isLoading } = heroesApi.useGetHeroesQuery({
    searchValue,
    page: currentPage,
  });

  useEffect(() => {
    if (data) {
      dispatch(setHeroes(data.results.slice(0, limit)));
      navigate(`/?page=${currentPage}`);
      dispatch(setPage(currentPage));
    }
    handlePageChange(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage, limit, dispatch, navigate]);

  const handlePageChange = useCallback(
    async (page: number) => {
      dispatch(setPage(page));
      navigate(`/?page=${currentPage}`);

      if (data) {
        dispatch(setHeroes(data.results.slice(0, limit)));
      }

      dispatch(setPage(page));
    },
    [data, currentPage, limit, dispatch, navigate]
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
        {isLoading ? (
          <Loader />
        ) : (
          <Heroes searchValue={searchValue} page={currentPage} />
        )}
      </div>
      <Outlet />
    </div>
  );
}

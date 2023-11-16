import './main.scss';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';
import HeroItem from '../hero-item/hero-item';
import { AppRoute } from '../../const';
import InputLimit from '../input-limit/input-limit';
import { useHeroList } from '../../util/contextAPI/hero-list';
import { useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { setPage } from '../../features/pagination/pagination-slice';
import { useDispatch } from 'react-redux';
import {
  setHeroes,
  getHeroes,
  setStatus,
} from '../../features/heroes/heroes-slice';

const HERO_LIMIT = 10;

export default function Main() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const listItemsRef = useRef<HTMLUListElement>(null);
  const [isLoading, setLoading] = useState(false);
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const [limit, setLimit] = useState(HERO_LIMIT);
  const [data, setData] = useState({
    next: null,
    previous: null,
    results: [],
  });
  const { setPerson } = useHeroList();
  const searchValue = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const searchLS = useSelector((state: RootState) => state.search.searchLS);
  const heroList = useSelector((state: RootState) => state.heroes.heroes);
  // const status = useSelector((state: RootState) => state.heroes.status);

  useEffect(() => {
    handlePageChange(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchLS, currentPage, limit]);

  const handlePageChange = async (page: number) => {
    setLoading(true);
    console.log(heroList);
    setStatus(true);
    dispatch(setPage(page));
    navigate(`/?page=${currentPage}`);

    try {
      const heroes = await getHeroesAll(searchValue, page);
      setData(heroes);

      dispatch(getHeroes(searchValue))
        .unwrap()
        .then((heroes) => {
          if (heroes) {
            dispatch(setHeroes(heroes.results.slice(0, limit)));
            navigate(`/?page=${page}`);
            dispatch(setPage(page));
          }
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setStatus(false);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

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
          <InputLimit onLimitChange={handleLimitChange} />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ul
              ref={listItemsRef}
              className="container d-flex justify-content-center flex-wrap mb-3 gap-3"
            >
              {heroList.length > 0 ? (
                heroList.map((person, index) => (
                  <li
                    onClick={() => setPerson(person)}
                    key={person['name'] + index}
                    className="list-group w-25"
                  >
                    <Link
                      className="card-link"
                      to={`${AppRoute.Hero}/${person['name']}`}
                    >
                      <HeroItem key={person['name'] + index} person={person} />
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-left">Sorry... No results found</li>
              )}
            </ul>
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
}

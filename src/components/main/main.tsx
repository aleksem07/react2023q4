import './main.scss';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';
import HeroItem from '../hero-item/hero-item';
import { AppRoute } from '../../const';
import InputLimit from '../input-limit/input-limit';
import { HeroListContext } from '../../util/contextAPI/hero-list';
import { useSearch } from '../../util/contextAPI/header-search-value';

const PAGE_DEFAULT = 1;
const HERO_LIMIT = 10;

export default function Main() {
  const navigate = useNavigate();
  const listItemsRef = useRef<HTMLUListElement>(null);
  const { headerSearchValue } = useSearch();
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(HERO_LIMIT);
  const [data, setData] = useState({
    next: null,
    previous: null,
    results: [],
  });

  useEffect(() => {
    const fetchHeroes = async (page: number) => {
      setLoading(true);
      try {
        const heroes = await getHeroesAll(headerSearchValue, page);
        setData(heroes);

        if (heroes) {
          setHero(heroes.results.slice(0, limit));
          navigate(`/?page=${currentPage}`);
          setCurrentPage(page);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerSearchValue, limit]);

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    setCurrentPage(newPage);
    navigate(`/?page=${currentPage}`);

    try {
      const heroes = await getHeroesAll(headerSearchValue, newPage);
      setData(heroes);

      if (heroes) {
        setHero(heroes.results.slice(0, limit));
        navigate(`/?page=${newPage}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  useEffect(() => {
    const handleClickCloseModal = (event: MouseEvent) => {
      const target = event.target as HTMLElement as HTMLElement;

      if (
        listItemsRef.current &&
        !listItemsRef.current.contains(target.parentNode as Node)
      ) {
        navigate('/');
      }
    };

    document.addEventListener('click', handleClickCloseModal);

    return () => {
      document.removeEventListener('click', handleClickCloseModal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(data);
  return (
    <div className="main p-0 pb-0 container">
      <div className="main__container">
        <h1 className="h1 text-center my-3">Star Wars Heroes</h1>
        <div className="pagination d-flex justify-content-center gap-3">
          {hero.length > 0 && (
            <Pagination
              fetchData={data}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          )}
          <InputLimit onLimitChange={handleLimitChange} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ul
              ref={listItemsRef}
              className="container d-flex justify-content-center flex-wrap mb-3 gap-3"
            >
              {hero.length > 0 ? (
                hero.map((person, index) => (
                  <li key={person['name'] + index} className="list-group w-25">
                    <HeroListContext.Provider value={{ person }}>
                      <Link
                        className="card-link"
                        to={`${AppRoute.Hero}/${person['name']}`}
                      >
                        <HeroItem />
                      </Link>
                    </HeroListContext.Provider>
                  </li>
                ))
              ) : (
                <li className="text-left">Sorry... No results found</li>
              )}
            </ul>
          </>
        )}
      </div>
      <Outlet context={{ hero }} />
    </div>
  );
}

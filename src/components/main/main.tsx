import './main.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';
import HeroItem from '../hero-item/hero-item';
import { MainProps } from './main.types';
import { AppRoute } from '../../const';
import InputLimit from '../input-limit/input-limit';

const PAGE_DEFAULT = 1;
const HERO_LIMIT = 2;

export default function Main({ search }: MainProps) {
  const navigate = useNavigate();

  const [data, setData] = useState({
    next: null,
    previous: null,
    results: [],
  });
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(search);
  const [currentPage, setCurrentPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(HERO_LIMIT);

  useEffect(() => {
    setSearchValue(search || '');
  }, [search]);

  useEffect(() => {
    const fetchHeroes = async (page: number) => {
      setLoading(true);
      try {
        const heroes = await getHeroesAll(searchValue, page);
        setData(heroes);

        if (heroes) {
          setHero(heroes.results.slice(0, limit));
          navigate(`/?page=${PAGE_DEFAULT}`);
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
  }, [searchValue, limit]);

  const handlePageChange = async (newPage: number) => {
    setLoading(true);
    setCurrentPage(newPage);
    navigate(`/?page=${PAGE_DEFAULT}`);

    try {
      const heroes = await getHeroesAll(searchValue, newPage);
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

  return (
    <div className="main p-5 pb-0 container">
      <div className="main__container">
        <h1 className="h1 text-center mb-3">Star Wars Heroes</h1>
        <div className="pagination d-flex justify-content-center gap-3">
          {hero.length > 0 ? (
            <Pagination
              fetchData={data}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          ) : null}
          <InputLimit onLimitChange={handleLimitChange} />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <ul className="row flex flex-row flex-wrap mb-3">
              {hero.length > 0 ? (
                hero.map((person, index) => (
                  <li
                    key={person['name'] + index}
                    className="list-group col-3 w-25"
                  >
                    <Link
                      className="card-link"
                      to={`${AppRoute.Hero}/${person['name']}`}
                    >
                      <HeroItem person={person} />
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
      <Outlet context={{ hero }} />
    </div>
  );
}

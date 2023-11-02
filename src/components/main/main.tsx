import './main.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';
import HeroItem from '../hero-item/hero-item';
import { MainProps } from './main.types';
import { AppRoute } from '../../const';

const PAGE_DEFAULT = 1;

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
          setHero(heroes.results);
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
  }, [searchValue]);

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);

    try {
      const heroes = await getHeroesAll(searchValue, newPage);
      setData(heroes);

      if (heroes) {
        setHero(heroes.results);
        navigate(`/?page=${newPage}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main p-5 pb-0 container">
      <div className="main__container">
        <h1 className="h2 text-center mb-3">Star Wars Heroes</h1>
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
                    <Link to={`${AppRoute.Hero}/${person['name']}`}>
                      <HeroItem person={person} />
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-left">Sorry... No results found</li>
              )}
            </ul>
            {hero.length > 0 ? (
              <Pagination
                fetchData={data}
                page={currentPage}
                onPageChange={handlePageChange}
              />
            ) : null}
          </>
        )}
      </div>
      <Outlet context={{ hero }} />
    </div>
  );
}

import './main.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import Pagination from '../pagination/pagination';
import getHeroesAll from '../../services/heroes/heroes';
import { Loader } from '../loader/loader';
import HeroItem from '../hero-item/hero-item';
import { MainProps } from './main.types';
import { AppRoute } from '../../const';

export default function Main({ value }: MainProps) {
  const navigate = useNavigate();
  const [hero, setHero] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value || '');
  }, [value]);

  useEffect(() => {
    const fetchHeroes = async () => {
      setLoading(true);
      try {
        const heroes = await getHeroesAll(searchValue);
        if (heroes) {
          setHero(heroes);
          navigate('/?page=1');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroes();
  }, [searchValue]);

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
                    className="col-4 list-group w-25 align-items-center"
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
            {hero.length > 0 ? <Pagination /> : null}
          </>
        )}
      </div>
      <Outlet context={hero} />
    </div>
  );
}

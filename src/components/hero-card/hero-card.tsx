import './hero-card.scss';
import { Hero } from './hero-card.types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getHeroesAll from '../../services/heroes/heroes';
import { useHeroList } from '../../util/contextAPI/hero-list';
import { v4 } from 'uuid';

function HeroCard() {
  const { person } = useHeroList();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    setHero(null);
    const fetchHeroes = async () => {
      try {
        const heroes = await getHeroesAll(`${person.name}`);

        setHero(heroes.results[0] as Hero);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHeroes();
  }, [person]);

  return !hero ? (
    <div
      data-testid="hero-card--null"
      className="container hero-card mx-5 text-left p-2"
    >
      <p>{person.name} is loading...</p>
      <p>Please, wait... </p>
      <Link
        data-testid="close"
        className="btn btn-secondary bg-dark mt-5"
        to="/"
      >
        close
      </Link>
    </div>
  ) : (
    <>
      <div
        data-testid="hero-card"
        className="container hero-card mx-5 text-left"
      >
        <h2 className="h2 mt-3 p-2 border-bottom bg-dark rounded">Info</h2>
        <p>id: {v4()}</p>
        <p>name: {hero['name']}</p>
        <p>height: {hero['height']}</p>
        <p>mass: {hero['mass']}</p>
        <p style={{ color: hero['hair_color'] }}>
          hair color: {hero['hair_color']}
        </p>
        <p>skin color: {hero['skin_color']}</p>
        <p style={{ color: hero['eye_color'] }}>
          eye color: {hero['eye_color']}
        </p>
        <p>gender: {hero['gender']}</p>
        <Link className="btn btn-secondary bg-dark mt-5" to="/">
          close
        </Link>
      </div>
      ;
    </>
  );
}

export default HeroCard;

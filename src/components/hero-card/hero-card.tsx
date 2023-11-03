import './hero-card.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getHeroesAll from '../../services/heroes/heroes';

type Hero = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
};

function HeroCard() {
  const { id } = useParams();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    setHero(null);
    const fetchHeroes = async () => {
      try {
        const heroes = await getHeroesAll(`${id}`);

        // if (heroes.results && heroes.results.length > 0) {
        setHero(heroes.results[0] as Hero);
        // }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchHeroes();
  }, [id]);

  return hero === null ? (
    <div className="container hero-card mx-5 text-left p-2">
      <p>{id} is loading...</p>
      <p>Please, wait... </p>
    </div>
  ) : (
    <>
      <div className="container hero-card mx-5 text-left">
        <h2 className="h2 mt-3 p-2 border-bottom bg-dark rounded">Info</h2>
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

        <Link className="btn btn-secondary mt-5" to="/">
          close
        </Link>
      </div>
    </>
  );
}

export default HeroCard;

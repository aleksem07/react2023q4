import './hero-item.scss';
import { HeroListContext } from '../../util/contextAPI/hero-list';
import { useContext } from 'react';

export default function HeroItem() {
  const { person } = useContext(HeroListContext);
  const { name } = person;

  return (
    <>
      <img
        src="placeholder.webp"
        alt="placeholder"
        width={100}
        className="rounded mb-2 mx-auto d-block"
      />
      <div className="d-grid">
        <h3 className="h4 hero-item pt-2 pb-2 text-center text-bg-dark rounded-5">
          {name}
        </h3>
      </div>
    </>
  );
}

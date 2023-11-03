import './hero-item.scss';
import { HeroItemProps } from './hero-item.types';

export default function HeroItem({ person }: HeroItemProps) {
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

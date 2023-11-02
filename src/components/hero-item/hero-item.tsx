import { HeroItemProps } from './hero-item.types';

export default function HeroItem({ person }: HeroItemProps) {
  const { name, birth_year } = person;

  return (
    <>
      <img
        src="placeholder.webp"
        alt="placeholder"
        width={100}
        className="rounded mb-2"
      />
      <h3 className="h5">{name}</h3>
      <p>birth: {birth_year}</p>
    </>
  );
}

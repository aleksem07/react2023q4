type Heroes = {
  person: {
    name: string;
    height?: string;
    mass?: string;
    hair_color?: string;
    skin_color?: string;
    eye_color?: string;
    gender?: string;
  };
};

export default function HeroCard({ person }: Heroes) {
  return (
    <>
      <div className="hero__details">
        <h2>Hero info</h2>
        <p>Name: {person.name}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
        <p>Hair color: {person.hair_color}</p>
        <p>Skin color: {person.skin_color}</p>
        <p>Eye color: {person.eye_color}</p>
        <p>Gender: {person.gender}</p>
      </div>
    </>
  );
}

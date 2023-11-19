import { Loader } from '../loader/loader';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import HeroItem from '../hero-item/hero-item';
import { useHeroList } from '../../util/contextAPI/hero-list';
import heroesApi from '../../api/api';

type Person = {
  name: string;
};

function Heroes({ searchValue, page }: { searchValue: string; page: number }) {
  const { setPerson } = useHeroList();

  const { data, isLoading, isError } = heroesApi.useGetHeroesQuery({
    searchValue: searchValue,
    page: page,
  });

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <p>Error</p>;
  }
  return (
    <>
      <ul className="container d-flex justify-content-center flex-wrap mb-3 gap-3">
        {data.results.length > 0 ? (
          data.results.map((person: Person, index: number) => (
            <li
              onClick={() => setPerson(person)}
              key={person['name'] + index}
              className="list-group w-25"
            >
              <Link
                className="card-link"
                to={`${AppRoute.Hero}/${person['name']}`}
              >
                <HeroItem key={person['name'] + index} person={person} />
              </Link>
            </li>
          ))
        ) : (
          <li className="text-left">Sorry... No results found</li>
        )}
      </ul>
    </>
  );
}

export default Heroes;

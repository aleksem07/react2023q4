import { Person } from './main.types';
import Pagination from '../pagination/pagination';
import './main.scss';

const url = 'https://swapi.dev/api/people?search=la';

let people: Person[] = [];

const fetchPeople = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    people = await data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchPeople();

function Main() {
  return (
    <>
      <div className="main">
        <h1 className="h2">main</h1>
        <ul>
          {people.map((person, index) => (
            <li key={index}>{person.name}</li>
          ))}
        </ul>

        <Pagination />
      </div>
    </>
  );
}

export default Main;

type Person = {
  name: string;
};

const url = 'https://swapi.dev/api/people';
// const url = 'https://swapi.dev/api/people?search=la';
let people: Person[] = [];

async function getHeroesAll() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    people = await data.results;
    return people;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default getHeroesAll;

import axios from 'axios';

const PAGE_DEFAULT = 2;

async function getHeroesAll(searchValue: string, page = PAGE_DEFAULT) {
  try {
    const url = `https://swapi.dev/api/people${
      searchValue ? `/?search=${searchValue}` : `?page=${page}`
    }`;
    const response = await axios(url);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default getHeroesAll;

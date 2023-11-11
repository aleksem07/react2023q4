const PAGE_DEFAULT = 2;

async function getHeroesAll(searchValue: string, page = PAGE_DEFAULT) {
  try {
    const url = `https://swapi.dev/api/people${
      searchValue ? `/?search=${searchValue}` : `?page=${page}`
    }`;
    const response = await fetch(url);
    const data = await response.json();

    return await data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default getHeroesAll;

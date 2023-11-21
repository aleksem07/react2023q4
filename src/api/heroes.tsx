const PAGE_DEFAULT = 2;

export default async function getHeroesAll(searchValue: string, page = PAGE_DEFAULT) {
  try {
    const url = `https://swapi.dev/api/people${
      searchValue ? `/?search=${searchValue}` : `?page=${page}`
    }`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


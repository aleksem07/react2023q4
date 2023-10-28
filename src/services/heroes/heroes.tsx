async function getHeroesAll(searchValue: string) {
  try {
    const url = `https://swapi.dev/api/people${
      searchValue ? `/?search=${searchValue}` : ''
    }`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('i load');
    return await data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default getHeroesAll;

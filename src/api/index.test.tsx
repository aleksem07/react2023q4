import getHeroesAll from './heroes';

describe('getHeroesAll', () => {
  it('should fetch data from the API without search value', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    const data = await getHeroesAll('');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people?page=2'
    );
    expect(data).toEqual({});
  });

  it('should fetch data from the API with search value', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    const data = await getHeroesAll('LukeSkywalker');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/?search=LukeSkywalker'
    );
    expect(data).toEqual({});
  });

  it('should log an error when an error occurs during fetching data', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    console.error = jest.fn();

    await getHeroesAll('');

    expect(console.error).toHaveBeenCalledWith(
      'Error fetching data:',
      new Error('Network error')
    );
  });
});

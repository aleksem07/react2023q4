import axios from 'axios';
import getHeroesAll from './heroes';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';

jest.mock('axios');

describe('getHeroesAll', () => {
  it('should fetch data from the API', async () => {
    const mockData = { results: ['hero1', 'hero2'] };
    axios.get = jest.fn().mockResolvedValueOnce({ data: mockData });

    const result = await getHeroesAll('Vader');

    waitFor(() => {
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith(
        'https://swapi.dev/api/people/?search=Vader'
      );
    });
  });

  it('should fetch data from the default page if no search value is provided', async () => {
    const mockData = { results: ['hero1', 'hero2'] };
    axios.get = jest.fn().mockResolvedValueOnce({ data: mockData });

    const result = await getHeroesAll('');

    waitFor(() => {
      expect(result).toEqual(mockData);
      expect(axios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/');
    });
  });

  it('should handle errors when fetching data', async () => {
    const mockError = new Error('API Error');
    axios.get = jest.fn().mockResolvedValueOnce(mockError);

    console.error = jest.fn();

    await getHeroesAll('Vader');

    waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching data:',
        mockError
      );
    });
  });
});

import { render } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('should render the component correctly', () => {
    const heroes = [{ name: 'Hero 1' }, { name: 'Hero 2' }];
    const limit = '2';

    const { getByTestId, getByText } = render(
      <Home heroes={heroes} limit={limit} />
    );

    expect(getByTestId('main')).toBeInTheDocument();
    expect(getByText('Hero 1')).toBeInTheDocument();
    expect(getByText('Hero 2')).toBeInTheDocument();
  });
});

import { getServerSideProps } from './index';
import { GetServerSidePropsContext } from 'next';
import getHeroesAll from '@/api/heroes';
import { IncomingMessage, ServerResponse } from 'http';

jest.mock('../api/heroes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> } = {
  headers: {},
  cookies: {},
} as IncomingMessage & { cookies: Partial<{ [key: string]: string }> };

const res: ServerResponse<IncomingMessage> =
  {} as ServerResponse<IncomingMessage>;

describe('getServerSideProps function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch heroes without search query', async () => {
    const context: GetServerSidePropsContext = {
      query: {},
      req,
      res,
      resolvedUrl: '',
    };
    const expectedHeroes = [{ name: 'Hero1' }, { name: 'Hero2' }];
    const expectedResults = {
      results: expectedHeroes,
    };
    (getHeroesAll as jest.Mock).mockResolvedValueOnce(expectedResults);

    const { props } = await getServerSideProps(context);

    expect(getHeroesAll).toHaveBeenCalledTimes(3);
    expect(getHeroesAll).toHaveBeenCalledWith('', 1);
    expect(getHeroesAll).toHaveBeenCalledWith('', 2);
    expect(getHeroesAll).toHaveBeenCalledWith('', 3);
    expect(props.heroes).toEqual(expectedHeroes);
    expect(props.limit).toEqual(String(expectedHeroes.length));
  });

  it('should fetch heroes with search query', async () => {
    const searchQuery = 'someSearch';
    const context: GetServerSidePropsContext = {
      query: {
        search: searchQuery,
      },
      req,
      res,
      resolvedUrl: '',
    };
    const expectedHeroes = [{ name: 'SearchedHero' }];
    const expectedResults = {
      results: expectedHeroes,
    };
    (getHeroesAll as jest.Mock).mockResolvedValueOnce(expectedResults);

    const { props } = await getServerSideProps(context);

    expect(getHeroesAll).toHaveBeenCalledTimes(1);
    expect(getHeroesAll).toHaveBeenCalledWith(searchQuery);
    expect(props.heroes).toEqual(expectedHeroes);
    expect(props.limit).toEqual(String(expectedHeroes.length));
  });
});

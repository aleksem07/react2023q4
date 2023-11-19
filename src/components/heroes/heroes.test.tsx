import { render, screen, waitFor } from '@testing-library/react';
import Heroes from './heroes';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Heroes', () => {
  test('renders loader when isLoading is true', () => {
    render(
      <Provider store={store}>
        <Heroes searchValue="" page={1} limit={10} isLoading={true} />
      </Provider>
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders list of heroes when data is available', () => {
    const heroes = [{ name: 'Hero 1' }, { name: 'Hero 2' }, { name: 'Hero 3' }];

    render(
      <Provider store={store}>
        <Heroes
          searchValue=""
          page={1}
          limit={10}
          data={{ results: heroes }}
          isLoading={false}
          isError={false}
        />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByText(heroes[0].name)).toBeInTheDocument();
      expect(screen.getByText(heroes[0].name)).toBe('Hero 1');
      expect(screen.getByText(heroes[1].name)).toBeInTheDocument();
      expect(screen.getByText(heroes[1].name)).toBe('Hero 2');
      expect(screen.getByText(heroes[2].name)).toBeInTheDocument();
      expect(screen.getByText(heroes[2].name)).toBe('Hero 3');

      userEvent.click(screen.getByText('Hero 1'));

      expect(window.location.pathname).toBe('/hero/Hero 1');
    });
  });

  test('renders "Sorry... No results found" when data is empty', () => {
    render(
      <Provider store={store}>
        <Heroes
          searchValue=""
          page={1}
          limit={10}
          data={{ results: [] }}
          isLoading={false}
          isError={false}
        />
      </Provider>
    );

    waitFor(() => {
      expect(
        screen.getByText(/Sorry... No results found/i)
      ).toBeInTheDocument();
    });
  });
});

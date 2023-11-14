import Main from './main';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import HeroCard from '../hero-card/hero-card';
import { HeroListProvider } from '../../util/contextAPI/hero-list';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('../../services/heroes/heroes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Main', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    const mainElement = screen.getByTestId('main');

    expect(mainElement).toBeInTheDocument();
  });

  it('the component renders the specified number of cards', async () => {
    const { default: mockFetch } = require('../../services/heroes/heroes');
    mockFetch.mockResolvedValue({
      results: [
        {
          name: 'C-3PO',
          height: '167',
          mass: '75',
          hair_color: 'n/a',
          skin_color: 'gold',
          eye_color: 'yellow',
          gender: 'n/a',
        },
        {
          name: 'R2-D2',
          height: '96',
          mass: '32',
          hair_color: 'n/a',
          skin_color: 'white, blue',
          eye_color: 'red',
          gender: 'n/a',
        },
      ],
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeroListProvider>
            <Main />
          </HeroListProvider>
        </MemoryRouter>
      </Provider>
    );

    const mainElement = screen.getByTestId('main');
    expect(mainElement).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId('hero-item')).toHaveLength(2);
    });
  });
  it(' an appropriate message is displayed if no cards are present', async () => {
    const { default: mockFetch } = require('../../services/heroes/heroes');
    mockFetch.mockResolvedValue({
      results: [],
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const noResultsElement = screen.getByText(/Sorry... No results found/i);

      expect(noResultsElement).toBeInTheDocument();
    });
  });

  it('throw error', async () => {
    const { default: mockFetch } = require('../../services/heroes/heroes');
    mockFetch.mockRejectedValue(new Error('Error'));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const errorElement = screen.getByText(/Sorry... No results found/i);

      expect(errorElement).toBeInTheDocument();
    });
  });

  it('handleClickCloseModal navigates to "/" when clicking outside the listItemsRef', async () => {
    const { default: mockFetch } = require('../../services/heroes/heroes');
    mockFetch.mockResolvedValue({
      results: [
        {
          name: 'R2-D2',
          height: '96',
          mass: '32',
          hair_color: 'n/a',
          skin_color: 'white, blue',
          eye_color: 'red',
          gender: 'n/a',
        },
      ],
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
          <HeroCard />
        </MemoryRouter>
      </Provider>
    );

    const listItemsRef = screen.getByTestId('main');

    await waitFor(() => {
      const openCard = screen.getByTestId('hero-item');
      fireEvent.click(openCard);
      expect(screen.getByTestId('hero-card')).toBeInTheDocument();
    });

    fireEvent.click(listItemsRef);

    await waitFor(() => {
      expect(screen.getByTestId('hero-card')).toBeInTheDocument();
      expect(window.location.pathname).toBe('/');
    });
  });
});

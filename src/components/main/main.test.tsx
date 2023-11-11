import Main from './main';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/heroes/heroes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Main', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
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
      <MemoryRouter>
        <Main />
      </MemoryRouter>
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
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    await waitFor(() => {
      const noResultsElement = screen.getByText(/Sorry... No results found/i);

      expect(noResultsElement).toBeInTheDocument();
    });
  });
});

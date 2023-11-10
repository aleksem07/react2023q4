import HeroCard from './hero-card';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../services/heroes/heroes', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('HeroCard', () => {
  it('should render correctly hero component', () => {
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
      ],
    });

    render(
      <MemoryRouter>
        <HeroCard />
      </MemoryRouter>
    );

    const heroCardNullElement = screen.getByTestId('hero-card--null');
    expect(heroCardNullElement).toBeInTheDocument();

    waitFor(() => {
      expect(screen.getByTestId('hero-card--null')).not.toBeInTheDocument();
      const heroCardElement = screen.getByTestId('hero-card');
      expect(heroCardElement).toBeInTheDocument();

      expect(heroCardElement).toHaveTextContent('C-3PO');
      expect(heroCardElement).toHaveTextContent('167');
      expect(heroCardElement).toHaveTextContent('75');
      expect(heroCardElement).toHaveTextContent('n/a');
      expect(heroCardElement).toHaveTextContent('gold');
      expect(heroCardElement).toHaveTextContent('yellow');
    });
  });

  it('closes the component on close button click', async () => {
    const { default: mockFetch } = require('../../services/heroes/heroes');
    mockFetch.mockResolvedValue({
      results: [],
    });
    render(
      <MemoryRouter>
        <HeroCard />
      </MemoryRouter>
    );

    const closeButtonElement = screen.getByText('close');

    fireEvent.click(closeButtonElement);

    waitFor(() => {
      expect(screen.getByTestId('hero-card--null')).not.toBeInTheDocument();
    });
  });

  it('throw Error fetching data', () => {
    const mockedConsoleError = jest.spyOn(console, 'error');
    mockedConsoleError.mockImplementation(() => {});

    const { default: mockFetch } = require('../../services/heroes/heroes');
    mockFetch.mockRejectedValue(new Error('Mocked fetch error'));

    render(
      <MemoryRouter>
        <HeroCard />
      </MemoryRouter>
    );

    waitFor(() => {
      expect(mockedConsoleError).toHaveBeenCalledWith(
        'Error fetching data:',
        expect.any(Error)
      );
    });

    mockedConsoleError.mockRestore();
  });
});

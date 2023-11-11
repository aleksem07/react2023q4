import React from 'react';
import HeroItem from './hero-item';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockApiCall = jest.fn(() =>
  Promise.resolve({
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
  })
);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('HeroItem', () => {
  it('should render correctly hero component', () => {
    render(
      <MemoryRouter>
        <HeroItem person={{ name: 'C-3PO' }} />
      </MemoryRouter>
    );

    const image = screen.getByAltText('placeholder');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'placeholder.webp');

    const heroItem = screen.getByTestId('hero-item');
    expect(heroItem).toBeInTheDocument();
    expect(heroItem).toHaveTextContent('C-3PO');
  });

  it('clicking on a card opens a detailed card component', async () => {});

  it('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    const mockUseContext = jest.fn(() => ({
      person: { name: 'C-3PO' },
      openDetailedCard: jest.fn(async () => {
        await mockApiCall();
      }),
    }));

    jest.spyOn(React, 'useContext').mockImplementation(mockUseContext);

    render(<HeroItem person={{ name: 'C-3PO' }} />);

    const heroItem = screen.getByTestId('hero-item');
    expect(heroItem).toBeInTheDocument();
    expect(heroItem).toHaveTextContent('C-3PO');

    fireEvent.click(heroItem);

    waitFor(() => {
      expect(mockApiCall).toHaveBeenCalled();
    });
  });
});

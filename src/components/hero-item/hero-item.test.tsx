import HeroItem from './hero-item';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { HeroListContext } from '../../util/contextAPI/hero-list';

const mockContextValue = {
  person: {
    name: 'C-3PO',
  },
};

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <HeroListContext.Provider value={mockContextValue}>
      {component}
    </HeroListContext.Provider>
  );
};

describe('HeroItem', () => {
  it('should render correctly hero component', () => {
    const { getByAltText, getByTestId } = renderWithProvider(
      <MemoryRouter>
        <HeroItem />
      </MemoryRouter>
    );

    const image = getByAltText('placeholder');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'placeholder.webp');

    const heroItem = getByTestId('hero-item');
    expect(heroItem).toBeInTheDocument();
    expect(heroItem).toHaveTextContent('C-3PO');
  });
});

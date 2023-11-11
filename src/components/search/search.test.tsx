import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchHeroProvider } from '../../util/contextAPI/header-search-value';

describe('Search', () => {
  const mockSearchHero = 'C3-PO';
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render correctly', () => {
    render(<Search />);
    const searchElement = screen.getByLabelText(/Search/i);
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    expect(searchElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(<Search />);
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: mockSearchHero } });
    fireEvent.click(buttonElement);

    expect(localStorage.getItem('search')).toBe(mockSearchHero);

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(buttonElement);

    expect(localStorage.getItem('search')).toBe('');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('search', mockSearchHero);

    render(
      <SearchHeroProvider>
        <Search />
      </SearchHeroProvider>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const expectedValue = localStorage.getItem('search');

    expect(inputElement.value).toEqual(expectedValue);
  });
});

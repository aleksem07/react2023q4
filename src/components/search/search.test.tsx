import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { setSearchValue } from '../../features/search/searchSlice';

describe('Search', () => {
  const mockSearchHero = 'C3-PO';
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchElement = screen.getByLabelText(/Search/i);
    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button');

    expect(searchElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

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
    store.dispatch(setSearchValue(mockSearchHero));

    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;

    expect(inputElement.value).toBe(mockSearchHero);
  });
});

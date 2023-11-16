import Pagination from './pagination';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Pagination', () => {
  const mockFetchData = {
    next: 'next',
    previous: 'previous',
    results: [],
    count: 81,
  };
  const mockPage = 1;
  const mockNewPage = 2;
  const mockOnPageChange = jest.fn();

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Pagination
          fetchData={mockFetchData}
          page={mockPage}
          onPageChange={mockOnPageChange}
        />
      </Provider>
    );

    const paginationElement = screen.getByTestId('pagination');

    expect(paginationElement).toBeInTheDocument();
  });

  it('Make sure the component updates URL query parameter when page changes', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination
            fetchData={mockFetchData}
            page={mockPage}
            onPageChange={mockOnPageChange}
          />
        </MemoryRouter>
      </Provider>
    );

    const paginationElement = screen.getByTestId('pagination');
    expect(paginationElement).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    history.push(`?page=${mockNewPage}`);

    expect(mockOnPageChange).toHaveBeenCalledWith(mockNewPage);
    expect(history.location.search).toBe(`?page=${mockNewPage}`);
  });
});

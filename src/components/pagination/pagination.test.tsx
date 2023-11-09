import Pagination from './pagination';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

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
      <Pagination
        fetchData={mockFetchData}
        page={mockPage}
        onPageChange={mockOnPageChange}
      />
    );

    const paginationElement = screen.getByTestId('pagination');

    expect(paginationElement).toBeInTheDocument();
  });

  it('Make sure the component updates URL query parameter when page changes', () => {
    const history = createMemoryHistory();
    render(
      <MemoryRouter>
        <Pagination
          fetchData={mockFetchData}
          page={mockPage}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
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

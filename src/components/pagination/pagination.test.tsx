import Pagination from './pagination';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


describe('Pagination', () => {

  it('should render correctly', () => {
    render(<Pagination />);

    const paginationElement = screen.getByTestId('pagination');

    expect(paginationElement).toBeInTheDocument();
  });
});

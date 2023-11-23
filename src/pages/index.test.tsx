import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home heroes={[]} limit="3" />);

    const heading = screen.getByTestId('main');

    expect(heading).toBeInTheDocument();
  });
});

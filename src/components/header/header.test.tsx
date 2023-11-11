import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('renders Search component inside Header component', () => {
    const { getByText } = render(<Header />);
    const searchComponent = getByText('Search');
    expect(searchComponent).toBeInTheDocument();
  });
});

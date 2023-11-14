import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('Header', () => {
  it('renders Search component inside Header component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const searchComponent = getByText('Search');
    expect(searchComponent).toBeInTheDocument();
  });
});

import { InputLimit } from './input-limit';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('InputLimit', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <InputLimit />
      </Provider>
    );

    expect(screen.getByTestId('input-limit')).toBeInTheDocument();
  });
});

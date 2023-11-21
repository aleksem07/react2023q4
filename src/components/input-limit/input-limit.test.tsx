import { InputLimit } from './input-limit';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { setLimit } from '../../features/limit/limit-slice';
import { fireEvent } from '@testing-library/react';

describe('InputLimit', () => {
  it('should render correctly', () => {
    const mockDispatch = jest.fn();

    const mockStore = {
      ...store,
      dispatch: mockDispatch,
    };

    render(
      <Provider store={mockStore}>
        <InputLimit />
      </Provider>
    );

    const selectElement = screen.getByTestId('input-limit');

    expect(selectElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: '5' } });

    expect(mockDispatch).toHaveBeenCalledWith(setLimit(5));
  });
});

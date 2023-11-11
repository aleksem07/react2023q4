import InputLimit from './input-limit';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('InputLimit', () => {
  const onLimitChange = jest.fn();

  it('should render correctly', () => {
    render(<InputLimit onLimitChange={jest.fn()} />);
    expect(screen.getByTestId('input-limit')).toBeInTheDocument();
  });

  it('should change limit', () => {
    render(<InputLimit onLimitChange={onLimitChange} />);
    fireEvent.change(screen.getByTestId('input-limit'), {
      target: { value: '9' },
    });
    expect(onLimitChange).toHaveBeenCalledWith(9);
  });
});

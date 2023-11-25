import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { InputLimit } from './input-limit';
import '@testing-library/jest-dom';

describe('InputLimit', () => {
  it('should redirect to home page when value is not provided or less than or equal to 0', () => {
    render(<InputLimit limit="10" />);
    const selectElement = screen.getByTestId('input-limit');

    fireEvent.change(selectElement, { target: { value: '0' } });
    expect(window.location.href).toBe('http://localhost/');

    fireEvent.change(selectElement, { target: { value: '' } });
    expect(window.location.href).toBe('http://localhost/');
  });

  it('should update the URL when a different value is selected', () => {
    const originalLocation = window.location;
    window.location = { ...originalLocation, href: 'http://localhost/' };

    render(<InputLimit limit="10" />);
    const selectElement = screen.getByTestId('input-limit');

    fireEvent.change(selectElement, { target: { value: '25' } });
    expect(window.location.href).toBe('http://localhost/');

    window.location = originalLocation;
  });
});

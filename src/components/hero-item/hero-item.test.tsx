import { render, screen } from '@testing-library/react';
import HeroItem from './hero-item';
import '@testing-library/jest-dom';

describe('HeroItem', () => {
  test('renders the person name', () => {
    const person = { name: 'John Doe' };
    render(<HeroItem person={person} />);
    const nameElement = screen.getByTestId('hero-item');

    expect(nameElement).toBeInTheDocument();
    expect(nameElement.textContent).toBe('John Doe');
  });
});

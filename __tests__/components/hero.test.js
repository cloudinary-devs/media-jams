import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@components/Hero';

test('renders hero component', () => {
  render(<Hero />);
  const heroElementFirst = screen.getByText(/Putting Media to Work Is Hard/);
  expect(heroElementFirst).toBeInTheDocument();
});

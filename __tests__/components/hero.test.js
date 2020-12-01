import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@components/Hero';

test('renders hero component', () => {
  render(<Hero />);
  const heroElementFirst = screen.getAllByText(/Putting Media to Work/);
  const heroElementSecond = screen.getAllByText(/IS HARD/);
  expect(heroElementFirst[0]).toBeInTheDocument();
  expect(heroElementSecond[0]).toBeInTheDocument();
});

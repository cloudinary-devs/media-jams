import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@components/Hero';

test('renders hero component', () => {
  render(<Hero />);
  const heroElementFirst = screen.getAllByText(/TRYING TO LEARN EVERYTHING/);
  const heroElementSecond = screen.getAllByText(/ABOUT MEDIA IS HARD/);
  expect(heroElementFirst[0]).toBeInTheDocument();
  expect(heroElementSecond[0]).toBeInTheDocument();
});

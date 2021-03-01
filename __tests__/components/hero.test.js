import React from 'react';
import { render, screen } from '@utils/test-utils';
import Hero from '@components/Hero';

test('renders hero component', () => {
  render(<Hero />);
  const heroElementFirst = screen.getByText(/Putting Media to Work Is Hard/);
  expect(heroElementFirst).toBeInTheDocument();
});

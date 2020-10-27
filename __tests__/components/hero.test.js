import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@components/Hero';

test('renders hero component', () => {
  render(<Hero />);
  const heroElement = screen.getByText(
    /Learning Media is hard MediaJams will fix that 👍/,
  );
  expect(heroElement).toBeInTheDocument();
});

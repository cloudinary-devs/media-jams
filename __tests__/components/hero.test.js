import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@components/Hero';

test('renders hero component', () => {
  render(<Hero />);
  const heroElement = screen.getAllByText(
    /Learning Media is hard MediaJams will fix that 👍/,
  );
  expect(heroElement[0]).toBeInTheDocument();
});

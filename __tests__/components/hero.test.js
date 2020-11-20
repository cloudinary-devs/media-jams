import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '@components/Hero';

test('renders hero component', () => {
  render(<Hero />);
  const heroElement = screen.getAllByText(
    /TRYING TO LEARN EVERYTHING ABOUT MEDIA IS HARD/,
  );
  expect(heroElement[0]).toBeInTheDocument();
});

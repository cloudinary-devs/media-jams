import React from 'react';
import { render, screen, act } from '@utils/test-utils';
import Hero from '@components/Hero';

test('renders hero component', () => {
  act(() => {
    /* fire events that update state */
    render(<Hero />);
  });
  const heroElementFirst = screen.getByText(/Unlock Media/);
  expect(heroElementFirst).toBeInTheDocument();
});

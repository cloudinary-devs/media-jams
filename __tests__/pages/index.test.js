import React from 'react';
import { render, screen, act, waitFor } from 'test-utils';
import Index from '../../pages/index.js';

test('renders index w/o error', async () => {
  render(<Index />);
  const heroElement = await waitFor(() =>
    screen.getAllByText(/Putting Media to Work/),
  );
  expect(heroElement[0]).toBeInTheDocument();
});

test('renders subheader h1', async () => {
  render(<Index />);
  const subHeading = await waitFor(() => screen.getByText(/Why Media Matters/));
  expect(subHeading).toBeInTheDocument();
});

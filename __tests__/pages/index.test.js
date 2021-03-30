import React from 'react';
import { render, screen, act, waitFor, debug } from 'test-utils';
import Index from '../../pages/index.js';

test('renders index w/o error', async () => {
  render(<Index />);
  const heroElement = await waitFor(() => screen.getAllByText(/Unlock Media/));
  expect(heroElement[0]).toBeInTheDocument();
});

test('renders subheader h1', async () => {
  render(<Index />);
  const subHeading = await waitFor(() => screen.getByText(/in your apps/));
  expect(subHeading).toBeInTheDocument();
});

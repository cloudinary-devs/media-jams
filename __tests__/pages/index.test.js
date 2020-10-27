import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Index from '../../pages/index.js';

// we don't need sanity api to initialize.
jest.mock('@sanity/client');

test('renders index w/o error', async () => {
  render(<Index />);
  const heroElement = await waitFor(() =>
    screen.getByText(/Learning Media is hard MediaJams will fix that 👍/),
  );
  expect(heroElement).toBeInTheDocument();
});

test('renders subheader h2', async () => {
  render(<Index />);
  const subHeading = await waitFor(() =>
    screen.getByText(/Find the right content for you/),
  );
  expect(subHeading).toBeInTheDocument();
});

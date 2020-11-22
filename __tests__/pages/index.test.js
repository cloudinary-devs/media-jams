import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Index from '../../pages/index.js';

// we don't need sanity api to initialize.
jest.mock('@sanity/client');

test('renders index w/o error', async () => {
  render(<Index />);
  const heroElement = await waitFor(() =>
    screen.getAllByText(/TRYING TO LEARN EVERYTHING/),
  );
  expect(heroElement[0]).toBeInTheDocument();
});

test('renders subheader h1', async () => {
  render(<Index />);
  const subHeading = await waitFor(() => screen.getByText(/Why Media Matters/));
  expect(subHeading).toBeInTheDocument();
});

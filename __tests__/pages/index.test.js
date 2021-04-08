import React from 'react';
import { render, screen, act, waitFor } from 'test-utils';
import Index from '../../pages/index.js';

test('renders index w/o error', async () => {
  render(<Index />);
});

test('renders subheader h1', async () => {
  render(<Index />);
  const unlock = () => screen.getTextBy(/Unlock Media/);
  expect(unlock).toBeInTheDocument;
});

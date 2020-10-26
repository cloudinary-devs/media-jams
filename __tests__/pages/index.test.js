import React from 'react';
import { render } from '@testing-library/react';
import Index from '../../pages/index.js';

test('renders deploy link', () => {
  const { getByText } = render(<Index />);
  const linkElement = getByText(
    /Learning Media is hard MediaJams will fix that 👍/,
  );
  expect(linkElement).toBeInTheDocument();
});

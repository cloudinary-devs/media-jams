import React from 'react';
import { render, screen, act, waitFor, debug } from 'test-utils';
import userEvent from '@testing-library/user-event';
import Bookmarks from '../../pages/bookmarks';
import { useUser } from '@auth0/nextjs-auth0';

jest.mock('@auth0/nextjs-auth0', () => {
  return {
    useUser: () => ({ user: {}, loading: false }),
    withPageAuthRequired: jest.fn(),
    UserProvider: ({ children }) => <>{children}</>,
    initAuth0: () => ({ withPageAuthRequired: jest.fn() }),
  };
});

test('Bookmarks page renderes w/0 blowing up.', () => {
  render(<Bookmarks />);
  expect(true).toBeTruthy();
});

test('SearchBar takes input', () => {
  render(<Bookmarks />);
  const searchBar = screen.getByPlaceholderText(/Search by keyword or tag.../i);
  userEvent.type(searchBar, 'witty title here');
  expect(searchBar).toBeInTheDocument();
  expect(searchBar).toHaveDisplayValue(/witty title here/i);
});

test('Bookmarks gets user bookmarks', async () => {});

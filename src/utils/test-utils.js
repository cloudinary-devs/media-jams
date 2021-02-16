/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { MixPanelProvider } from '@lib/mixpanel';
import { UserProvider, useUser } from '@lib/user';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import theme from '../theme';

const queryClient = new QueryClient();
const AllTheProviders = ({ children }) => {
  const { user, loading } = useUser();
  return (
    <MixPanelProvider>
      <ChakraProvider resetCSS theme={theme}>
        <RouterContext.Provider value={{ ...mockRouter }}>
          <QueryClientProvider client={queryClient}>
            <UserProvider value={{ user, loading }}>{children}</UserProvider>
          </QueryClientProvider>
        </RouterContext.Provider>
      </ChakraProvider>
    </MixPanelProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

// mockout NextJS Router
const mockRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
};

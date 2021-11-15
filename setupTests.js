import '@testing-library/jest-dom/extend-expect';
import 'isomorphic-unfetch';
import { server } from './mocks/server';

// Establish API mocking before all tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      console.info(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  }),
);

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());

import http from 'http';
import fetch from 'isomorphic-unfetch';
import listen from '../../src/utils/test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from '../../pages/api/webhook';
import sanityMockPayload from '../../__mocks__/sanityWebhookMock';

let url;
let server;
// we don't need sanity api to initialize.
jest.genMockFromModule('@sanity/client');
jest.mock('@sanity/client');
import sanity from '@sanity/client';
const mockSanityClient = {
  fetch: jest.fn().mockImplementation(() =>
    Promise.resolve({
      author: {
        _id: 'e-5f8a2ac9edc64a00681eb8ab-self',
        name: 'Jesse Zitty. Tomchak',
      },
      state: 'changesRequested',
      title: 'Titles are hard?',
    }),
  ),
};
sanity.mockImplementation(() => mockSanityClient);
/**
 * Setup http server, nextjs resolver
 * Tests can make HTTP requests to url invoking handler
 */
beforeEach(async () => {
  let requestHandler = (req, res) => {
    return apiResolver(req, res, undefined, handler);
  };
  server = http.createServer(requestHandler);
  url = await listen(server);
});
afterEach(() => server.close());

describe('/api/webhook handler', () => {
  test('responds 405 GET', async () => {
    expect.assertions(1);
    let response = await fetch(url);
    expect(response.status).toBe(405);
  });

  test('responds 200 POST', async () => {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(sanityMockPayload),
    });
    let results = await response.json();
    expect(response.status).toBe(200);
    expect(results).toEqual({ status: 'success' });
    // expect(mockSanityClient.fetch).toBeCalled();
  });
});

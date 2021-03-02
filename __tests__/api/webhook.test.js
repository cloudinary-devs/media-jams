import http from 'http';
import fetch from 'isomorphic-unfetch';
import listen from './test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from '../../pages/api/webhook';

describe('/api/webhook handler', () => {
  test('responds 200 GET', async () => {
    expect.assertions(2);
    let requestHandler = (req, res) => {
      return apiResolver(req, res, undefined, handler);
    };
    let server = http.createServer(requestHandler);
    let url = await listen(server);
    let response = await fetch(url);
    let result = await response.json();
    expect(response.status).toBe(200);
    expect(result).toEqual({ name: 'John Doe' });
    return server.close();
  });
});

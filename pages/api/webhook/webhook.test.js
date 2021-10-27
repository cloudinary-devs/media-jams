import http from 'http';
import fetch from 'isomorphic-unfetch';
import listen from '@utils/test-listen';
import { apiResolver } from 'next/dist/server/api-utils';
import handler from './index';
import sanityMockPayload from '@utils/__mocks__/sanityWebhookMock';
import * as mockAuth0Management from '@lib/auth0Management';
import * as mockSendGrid from '@lib/sendGrid';

let url;
let server;

jest.mock('@sanity/client/lib/sanityClient', () => {
  // mockout sanityClient
  return jest.fn().mockImplementation(() => ({
    // mockout it's fetch method
    fetch: jest.fn().mockImplementation(() =>
      Promise.resolve({
        author: {
          _id: 'e-5f8a2ac9edc64a00681eb8ab-self',
          name: 'Jesse Test Tomchak',
        },
        state: 'changesRequested',
        title: 'Titles are hard to test?',
      }),
    ),
  }));
});

// Capture SendGrid Mail
jest.mock('@sendgrid/mail', () => {
  // mock api & send
  return {
    __esModule: true,
    default: {
      setApiKey: jest.fn(),
      send: jest.fn((x) => x),
    },
  };
});

mockAuth0Management.creatorEmail = jest.fn(() => 'testing@mediajams.dev');
mockAuth0Management.getModoratorEmails = jest.fn(() => [
  { email: 'mod@mj.dev' },
  { email: 'otherMod@mj.dev' },
]);
mockSendGrid.sendNotification = jest.fn(() => Promise.resolve());

/**
 * Setup http server, nextjs resolver
 * Tests can make HTTP requests to url invoking handler
 */
describe('/api/webhook handler', () => {
  beforeEach(async () => {
    let requestHandler = async (req, res) => {
      return apiResolver(req, res, undefined, handler);
    };
    server = http.createServer(requestHandler);
    url = await listen(server);
  });
  afterEach(() => {
    jest.clearAllMocks();
    server.close();
  });

  test('responds 405 GET', async () => {
    expect.assertions(1);
    let response = await fetch(url);
    expect(response.status).toBe(405);
  });

  test('responds 200 POST', async () => {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(sanityMockPayload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let results = await response.json();
    expect(response.status).toBe(200);
    expect(results).toEqual({ status: 'success' });
  });

  test('auth0Management should be called for creator and moderators', async () => {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(sanityMockPayload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let results = await response.json();
    expect(mockAuth0Management.creatorEmail).toBeCalledTimes(1);
    expect(mockAuth0Management.getModoratorEmails).toBeCalledTimes(1);
  });

  test('Notification via SendGrid with Only Creator emails', async () => {
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(sanityMockPayload),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let results = await response.json();
    expect(mockSendGrid.sendNotification).toBeCalledWith({
      authorEmail: 'testing@mediajams.dev',
      authorName: 'Jesse Test Tomchak',
      templateName: 'authorNotification',
      title: 'Titles are hard to test?',
      workflowState: 'Changes Requested',
    });
  });
});

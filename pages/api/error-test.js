import { initSentry, sentryHandler } from '@lib/sentry';
import * as Sentry from '@sentry/node';

initSentry();

function work() {
  throw new Error('API Test 3');
}

export default sentryHandler(async function handler(req, res) {
  work();

  res.statusCode = 200;
  res.json({ name: 'John Doe' });
});

import { initSentry } from '@lib/sentry';
import * as Sentry from '@sentry/node';

initSentry();

export default async function handler(req, res) {
  try {
    throw new Error('API Test ');
  } catch (error) {
    Sentry.captureException(error);
  }

  // Flushing before returning is necessary if deploying to Vercel, see
  // https://vercel.com/docs/platform/limits#streaming-responses
  await Sentry.flush(2000);
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
}

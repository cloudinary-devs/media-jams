import { initSentry } from '@lib/sentry';
//initialize Sentry
initSentry();

const doAsyncWork = () => Promise.reject(new Error('API Error Testing 1'));
doAsyncWork();

export default async function handler(req, res) {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
}

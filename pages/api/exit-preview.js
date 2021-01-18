import { initSentry, sentryHandler } from '@lib/sentry';
initSentry();

export default sentryHandler(async function exit(_, res) {
  // Exit the current user from "Preview Mode". This function accepts no args.
  res.clearPreviewData();

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: '/' });
  res.end();
});

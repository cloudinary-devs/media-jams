import NextErrorComponent from 'next/error';

/**
 * Based on this example
 * https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/_error.js
 *
 * */
const InternalError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

export default InternalError;

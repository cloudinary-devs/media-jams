import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

/**
 * Note: Error tracking is disabled in development mode using the NODE_ENV environment variable. To change this behavior, remove the enabled property from the Sentry.init() call inside your utils/sentry.js file.
 */

export const initSentry = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const integrations = [];
    if (
      process.env.NEXT_IS_SERVER === 'true' &&
      process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
    ) {
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR,
              'app:///',
            );
            frame.filename = frame.filename.replace('.next', '_next');
            return frame;
          },
        }),
      );
    }

    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      integrations,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
    });
  }
};

export const sentryHandler = (apiHandler) => {
  return async (req, res) => {
    try {
      return await apiHandler(req, res);
    } catch (error) {
      console.error(error);

      Sentry.captureException(error);

      await Sentry.flush(2000);

      return error;
    }
  };
};
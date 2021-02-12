import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import auth0 from '@lib/auth0';
import { useFetchUser } from '@lib/user';
import createLoginUrl from '@lib/login-url';

/**
 *
 * @param {Function} getServerSidePropsFunc
 */
export function withAuthServerSideProps(getServerSidePropsFunc) {
  return async (context) => {
    const session = await auth0.getSession(context.req);
    if (!session) {
      context.res.writeHead(302, {
        Location: createLoginUrl(context.req.url),
      });
      context.res.end();
      return { props: {} };
    }
    const { user } = session;
    if (getServerSidePropsFunc) {
      return {
        props: {
          user,
          data: await getServerSidePropsFunc(context, session.user),
        },
      };
    }
    return { props: { user, data: { props: { user } } } };
  };
}

export function withAuthRequired(Component, options = {}) {
  return function withAuthRequired(props) {
    const router = useRouter();
    const {
      returnTo = router.asPath,
      onRedirecting = () => <div>Redirecting you to the login...</div>,
    } = options;
    const { user, loading } = useFetchUser();

    useEffect(() => {
      if (user && !loading) return;

      (async () => {
        await router.push(createLoginUrl());
      })();
    }, [user, loading]);

    if (user) return <Component {...props} />;

    return onRedirecting();
  };
}

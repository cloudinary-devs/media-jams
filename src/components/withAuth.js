import React, { Component } from 'react';

import auth0 from '@lib/auth0';
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
        Location: '/api/auth/login',
      });
      context.res.end();
      return { props: {} };
    }
    // const { user } = session;
    console.log(session);
    const user = {};
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

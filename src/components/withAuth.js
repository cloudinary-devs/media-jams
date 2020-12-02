import React, { Component } from 'react';

import auth0 from '@lib/auth0';
import { fetchUser } from '@lib/user';
import createLoginUrl from '@lib/login-url';
import RedirectToLogin from './LoginRedirect';

export function withAuthServerSideProps(getServerSidePropsFunc) {
  return async (context) => {
    const session = await auth0.getSession(context.req);
    if (!session || !session.user) {
      context.res.writeHead(302, {
        Location: createLoginUrl(ctx.req.url),
      });
      context.res.end();
      return;
    }
    const { user } = session;
    if (getServerSidePropsFunc) {
      return {
        props: { user, data: await getServerSidePropsFunc(context, user) },
      };
    }
    return { props: { user, data: { props: { user } } } };
  };
}

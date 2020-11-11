// This import is only needed when checking authentication status directly from getServerSideProps
import auth0 from '@lib/auth0';
import Layout from '@components/Layout';
import Link from 'next/link';

function Profile({ user }) {
  return (
    <Layout>
      <h1>Profile</h1>

      <div>
        <h3>Profile (server rendered)</h3>
        <img src={user.picture} alt="user picture" />
        <p>nickname: {user.nickname}</p>
        <p>name: {user.name}</p>
      </div>
      <Link ml={4} href="/api/auth/logout">
        Logout
      </Link>
    </Layout>
  );
}

export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req);

  if (!session || !session.user) {
    res.writeHead(302, {
      Location: '/api/auth/login',
    });
    res.end();
    return;
  }

  return { props: { user: session.user } };
}

export default Profile;

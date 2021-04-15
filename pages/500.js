import Error from 'next/error';

export default function ServerError({ errorCode }) {
  return <Error statusCode={errorCode} />;
}

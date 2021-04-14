import Error from 'next/error';

export default function ServerError({ errorCode, title }) {
  if (errorCode && title) {
    return <Error statusCode={errorCode}>{title}</Error>;
  }

  return <Error statusCode={errorCode} />;
}

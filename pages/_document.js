import NextDocument, { Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { ColorModeScript } from '@chakra-ui/core';
import React from 'react';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato&family=Merriweather:wght@300&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript defaultMode="system" />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Document;

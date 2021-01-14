import React from 'react';
import Layout from '@components/Layout';
import Iframe from '@components/Iframe';

export default function Feedback() {
  return (
    <Layout>
      <Iframe
        class="airtable-embed"
        src="https://airtable.com/embed/shrT2aebulK2xeUJ2?backgroundColor=orange"
        frameborder="0"
        onmousewheel=""
        style={{
          flex: '1',
          height: 'calc(100vh - 5em)',
          background: 'transparent',
          border: '1px solid #ccc',
        }}
      ></Iframe>
    </Layout>
  );
}

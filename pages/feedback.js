import React from 'react';
import Layout from '@components/Layout';
import Iframe from '@components/Iframe';

export default function Feedback() {
  return (
    <>
      <Iframe
        src="https://forms.monday.com/forms/embed/aa087253cb65151f5febaf2ccada2e4f?r=use1"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      ></Iframe>
    </>
  );
}

Feedback.getLayout = (page) => <Layout>{page}</Layout>;

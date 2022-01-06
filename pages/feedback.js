import React from 'react';
import { Flex } from '@chakra-ui/react';
import Layout from '@components/Layout';
import Iframe from '@components/Iframe';

export default function Feedback() {
  return (
    <Flex w="100%" height="100%" direction="column" overflowY="auto">
      <Iframe
        src="https://forms.monday.com/forms/embed/aa087253cb65151f5febaf2ccada2e4f?r=use1"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      ></Iframe>
    </Flex>
  );
}

Feedback.getLayout = (page) => <Layout>{page}</Layout>;

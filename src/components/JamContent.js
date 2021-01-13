import React from 'react';
import {
  Text,
  Heading,
  VStack,
  Box,
  Image,
  chakra,
  flexbox,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

/**
 * Can override any general styles set for textStyle="jam-content"
 * in the `styled(Box)` -->
 * */

const Content = chakra('div', {
  baseStyle: {
    width: ['90%', null, '55%'],
    'h1, h2': {
      margin: '0px auto 20px',
      fontFamily: 'Bangers, cursive',
      fontWeight: 'bold',
      lineHeight: 'tall',
      letterSpacing: 'normal',
      fontSize: ['3xl'],
    },
    'h3, h4, h5': {
      margin: '0px auto 20px',
      fontFamily: 'Bangers, cursive',
      fontWeight: 'bold',
      lineHeight: 'tall',
      letterSpacing: 'normal',
      fontSize: ['xl'],
    },
    p: {
      margin: '10px auto',
    },
    'pre.prisma-code': {
      margin: '0px 0px 0px auto',
    },
    ul: {
      listStyle: 'none',
      padding: 0,
      margin: '10px auto',
    },
    img: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

export default function JamContent({ children }) {
  return (
    <section>
      <VStack align="center">
        <Content>{children}</Content>
      </VStack>
    </section>
  );
}

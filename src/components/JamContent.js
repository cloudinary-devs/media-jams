import React from 'react';
import { VStack, chakra } from '@chakra-ui/react';

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px) => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;
/**
 * Can override any general styles set for jam content"
 * in the `styled(Box)` -->
 * */

const Content = chakra('div', {
  baseStyle: {
    width: ['90%', null, null, '75%'],
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
    ol: {
      marginTop: em(20, 16),
      marginBottom: em(20, 16),
    },
    ul: {
      marginTop: em(20, 16),
      marginBottom: em(20, 16),
    },
    li: {
      marginTop: em(8, 16),
      marginBottom: em(8, 16),
    },
    'ol > li': {
      paddingLeft: em(28, 16),
    },
    'ol > li::before': {
      left: '0',
    },
    'ul > li': {
      paddingLeft: em(28, 16),
    },
    'ul > li::before': {
      width: em(6, 16),
      height: em(6, 16),
      top: `calc(${em(28 / 2, 16)} - ${em(3, 16)})`,
      left: em(4, 16),
    },
    '> ul > li p': {
      marginTop: em(12, 16),
      marginBottom: em(12, 16),
    },
    '> ul > li > *:first-child': {
      marginTop: em(20, 16),
    },
    '> ul > li > *:last-child': {
      marginBottom: em(20, 16),
    },
    '> ol > li > *:first-child': {
      marginTop: em(20, 16),
    },
    '> ol > li > *:last-child': {
      marginBottom: em(20, 16),
    },
    'ul ul, ul ol, ol ul, ol ol': {
      marginTop: em(12, 16),
      marginBottom: em(12, 16),
    },
    'ol[type="A"]': {
      '--list-counter-style': 'upper-alpha',
    },
    'ol[type="a"]': {
      '--list-counter-style': 'lower-alpha',
    },
    'ol[type="A" s]': {
      '--list-counter-style': 'upper-alpha',
    },
    'ol[type="a" s]': {
      '--list-counter-style': 'lower-alpha',
    },
    'ol[type="I"]': {
      '--list-counter-style': 'upper-roman',
    },
    'ol[type="i"]': {
      '--list-counter-style': 'lower-roman',
    },
    'ol[type="I" s]': {
      '--list-counter-style': 'upper-roman',
    },
    'ol[type="i" s]': {
      '--list-counter-style': 'lower-roman',
    },
    'ol[type="1"]': {
      '--list-counter-style': 'decimal',
    },
    'ol > li': {
      position: 'relative',
    },
    'ol > li::before': {
      content: 'counter(list-item, var(--list-counter-style, decimal)) "."',
      position: 'absolute',
      fontWeight: '400',
      color: 'gray.400',
    },
    'ul > li': {
      position: 'relative',
    },
    'ul > li::before': {
      content: '""',
      position: 'absolute',
      backgroundColor: 'gray.300',
      borderRadius: '50%',
    },
    blockquote: {
      fontWeight: '500',
      fontStyle: 'italic',
      color: 'gray.600',
      borderLeftWidth: '0.25rem',
      borderLeftColor: 'gray.200',
      quotes: '"\\201C""\\201D""\\2018""\\2019"',
    },
    'blockquote p:first-of-type::before': {
      content: 'open-quote',
    },
    'blockquote p:last-of-type::after': {
      content: 'close-quote',
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

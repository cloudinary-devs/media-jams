import { mode } from '@chakra-ui/core';

const styles = {
  global: (props) => ({
    'html, body': {
      'font-family': 'Roboto, sans-serif',
      fontSize: 'lg',
      color: props.colorMode === 'dark' ? 'white' : 'gray.600',
      lineHeight: 'base',
    },
    a: {
      color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
  }),
};

export default styles;

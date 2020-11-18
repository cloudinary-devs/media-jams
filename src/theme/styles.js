import { mode } from '@chakra-ui/core';

const styles = {
  global: (props) => ({
    'html, body': {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 'md',
      color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      lineHeight: 'base',
    },
    a: {
      color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
  }),
};

export default styles;

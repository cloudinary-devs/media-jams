import { mode } from '@chakra-ui/react';

const styles = {
  global: (props) => ({
    'html, body': {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 'md',
      color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      lineHeight: 'base',
    },
    a: {
      color: props.colorMode === 'dark' ? 'yellow.500' : 'yellow.200',
    },
  }),
};

export default styles;

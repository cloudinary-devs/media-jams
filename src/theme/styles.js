import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: {
      fontFamily: 'DM Sans, sans-serif',
      color: mode('text', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: '154%',
      fontSize: '18px',
    },
  }),
};

export default styles;

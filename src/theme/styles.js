import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    h1: {
      fontSize: { base: '32px', md: '52px' },
      fontWeight: 'bold',
      lineHeight: '120%',
      letterSpacing: '0.02em',
    },
    h2: {
      fontSize: { base: '28px', md: '38px' },
      fontWeight: 'bold',
      lineHeight: { base: '122%', md: '126%' },
      letterSpacing: '0.01em',
    },
    body: {
      fontFamily: 'DM Sans',
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: 'base',
    },
  }),
};

export default styles;

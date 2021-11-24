import { mode } from '@chakra-ui/theme-tools';

import { fontFamilyDefault } from '@utils/styles';

const styles = {
  global: (props) => ({
    body: {
      fontFamily: fontFamilyDefault,
      color: mode('text', 'whiteAlpha.900')(props),
      bg: mode('white', 'gray.800')(props),
      lineHeight: '154%',
      fontSize: '18px',
    },
  }),
};

export default styles;

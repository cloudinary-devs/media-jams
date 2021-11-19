import { extendTheme, mode } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Style apply mdx
import mdx from './mdx';

// Foundational style overrides
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';

// Component style overrides
import { Heading, Text, Drawer } from './components';

const overrides = {
  styles,
  fonts: {
    heading: 'DM Sans, sans-serif',
    body: 'DM Sans, sans-serif',
  },
  colors,
  textStyles,
  mdx,
  // Other foundational style overrides go here
  components: {
    // Other components go here
    Heading,
    Text,
    Drawer,
  },
};

export default extendTheme(overrides);

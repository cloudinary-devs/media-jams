import { extendTheme, mode } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

// Foundational style overrides
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';

// Component style overrides
import components from './components';

const overrides = {
  styles,
  colors,
  textStyles,
  // Other foundational style overrides go here
  components: {
    // Other components go here
    ...components,
  },
};

export default extendTheme(overrides);

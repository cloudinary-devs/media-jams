import { extendTheme, mode } from '@chakra-ui/core';

// Global style overrides
import styles from './styles';
import colors from './foundations/colors';
import textStyles from './foundations/textStyles';

// Foundational style overrides
// import borders from './foundations/borders';

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

const baseStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 'bold',
};

const sizes = {
  H500: {
    fontSize: { base: '32px', md: '52px' },
    lineHeight: '120%',
    letterSpacing: '0.02em',
    // fontFeatureSetting: { base: 'liga 0' },
  },
  H400: {
    fontSize: { base: '28px', md: '38px' },
    lineHeight: { base: '122%', md: '126%' },
    letterSpacing: '0.01em',
    // fontFeatureSetting: { base: 'liga 0' },
  },
  H300: {
    fontSize: { base: '26px', md: '28px' },
    lineHeight: { base: '122%', md: '128%' },
    letterSpacing: '0.01em',
    // fontFeatureSetting: { base: 'liga 0' },
  },
  H200: {
    fontSize: { base: '22px' },
    lineHeight: { base: '128%' },
    letterSpacing: '0.01em',
    // fontFeatureSetting: { base: 'liga 0' },
  },
  H100: {
    fontSize: { base: '17px', md: '18px' },
    lineHeight: { base: '140%', md: '136%' },
    letterSpacing: '0.01em',
    // fontFeatureSetting: { base: 'liga 0' },
  },
};

const defaultProps = {
  size: 'H300',
};

export default {
  baseStyle,
  sizes,
  defaultProps,
};

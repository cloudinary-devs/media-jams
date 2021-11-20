const baseStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontWeight: 'normal',
};

const sizes = {
  '4xl': {
    fontSize: ['6xl', null, '7xl'],
    lineHeight: 1,
  },
  '3xl': {
    fontSize: ['5xl', null, '6xl'],
    lineHeight: 1,
  },
  '2xl': {
    fontSize: ['4xl', null, '5xl'],
    lineHeight: [1.2, null, 1],
  },
  xl: {
    fontSize: ['3xl', null, '4xl'],
    lineHeight: [1.33, null, 1.2],
  },
  lg: {
    fontSize: ['2xl', null, '3xl'],
    lineHeight: [1.33, null, 1.2],
  },
  md: { fontSize: 'xl', lineHeight: 1.2 },
  sm: { fontSize: 'md', lineHeight: 1.2 },
  xs: { fontSize: 'sm', lineHeight: 1.2 },
};

const variants = {
  B500: {
    fontSize: '20px',
    lineHeight: '120%',
  },
  B400: {
    fontSize: '18px',
    lineHeight: '154%',
  },
  B300: {
    fontSize: '16px',
    lineHeight: '148%',
  },
  B200: {
    fontSize: '15px',
    lineHeight: '148%',
  },
  B100: {
    fontSize: '14px',
    lineHeight: '154%',
  },
};

const defaultProps = {
  size: 'xl',
  variants: 'B400',
};

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};

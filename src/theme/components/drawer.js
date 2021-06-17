const baseStyle = {};

const sizes = {};

const variants = {
  mobileOpen: {
    parts: ['dialog, dialogContainer', 'body'],
    dialog: {
      backgroundColor: 'blue',
      height: 'calc(100vh - 56px)',
    },
    dialogContainer: {},
    body: {
      top: '56px',
    },
  },
};

const defaultProps = {};

export default {
  baseStyle,
  variants,
  sizes,
  defaultProps,
};

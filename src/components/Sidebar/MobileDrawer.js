import {
  chakra,
  forwardRef,
  SystemStyleObject,
  useStyles,
  useTheme,
  HTMLChakraProps,
} from '@chakra-ui/system';
import { Slide, SlideOptions } from '@chakra-ui/transition';
import { cx, __DEV__ } from '@chakra-ui/utils';
import { createContext } from '@chakra-ui/react-utils';
import * as React from 'react';
import { Modal, ModalFocusScope, useModalContext } from '@chakra-ui/modal';

const [DrawerContextProvider, useDrawerContext] = createContext();

export function MobileDrawer(props) {
  const { isOpen, onClose, placement = 'right', children, ...rest } = props;

  const theme = useTheme();
  const drawerStyleConfig = theme.components?.Drawer;

  return (
    <DrawerContextProvider value={{ placement }}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        styleConfig={drawerStyleConfig}
        {...rest}
      >
        {children}
      </Modal>
    </DrawerContextProvider>
  );
}

const StyleSlide = chakra(Slide);

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
export const MobileDrawerContent = (props, ref) => {
  const { className, children, ...rest } = props;

  const { getDialogProps, getDialogContainerProps, isOpen } = useModalContext();

  const dialogProps = getDialogProps(rest, ref);
  const containerProps = getDialogContainerProps();

  const _className = cx('chakra-modal__content', className);

  const styles = useStyles();

  const dialogStyles = {
    display: 'flex',
    position: 'relative',
    width: '100%',
    outline: 0,
    ...styles.dialog,
  };

  const dialogContainerStyles = {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
    ...styles.dialogContainer,
  };

  const { placement } = useDrawerContext();

  return (
    <chakra.div
      {...containerProps}
      className="chakra-modal__content-container"
      __css={dialogContainerStyles}
    >
      <ModalFocusScope>
        <StyleSlide
          style={{ top: '50px' }}
          direction={placement}
          in={isOpen}
          className={_className}
          {...dialogProps}
          __css={dialogStyles}
        >
          {children}
        </StyleSlide>
      </ModalFocusScope>
    </chakra.div>
  );
};

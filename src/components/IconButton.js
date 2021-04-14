import { IconButton as Button } from '@chakra-ui/react';

export default function IconButton({ onClick, Icon, size, ...rest }) {
  return (
    <Button
      onClick={onClick}
      mb={4}
      mr={1}
      alignSelf="flex-end"
      size={size}
      outline="none"
      bg="none"
      h="0"
      w="0"
      _focus={{
        boxShadow: 'none',
      }}
      icon={<Icon />}
      _hover={{ bg: 'none' }}
      {...rest}
    />
  );
}

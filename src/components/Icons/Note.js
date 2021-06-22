import { Icon } from '@chakra-ui/react';

const Note = (props) => (
  <Icon color="primary.500" viewBox="0 0 24 24" h="24px" w="24px" {...props}>
    <path
      fill="currentColor"
      d="M5 0a5 5 0 00-5 5v14a5 5 0 005 5h7.344a5 5 0 003.534-1.464l6.658-6.658A5 5 0 0024 12.344V5a5 5 0 00-5-5H5zM2 5a3 3 0 013-3h14a3 3 0 013 3v7h-5a5 5 0 00-5 5v5H5a3 3 0 01-3-3V5zm12 16.5V17a3 3 0 013-3h4.5c-.11.166-.236.32-.38.464l-6.656 6.658a3.128 3.128 0 01-.464.38V21.5z"
    />
  </Icon>
);

export default Note;

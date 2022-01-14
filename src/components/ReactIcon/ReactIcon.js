import { Icon as ChakraIcon } from '@chakra-ui/react';
import * as Fa from 'react-icons/fa';
import * as Hi from 'react-icons/hi';

const icons = {
  fa: Fa,
  hi: Hi,
};

const ReactIcon = ({ name, provider, ...rest }) => {
  const Icon = icons[provider] && icons[provider][name];
  return Icon ? <ChakraIcon as={Icon} {...rest} /> : null;
};

export default ReactIcon;

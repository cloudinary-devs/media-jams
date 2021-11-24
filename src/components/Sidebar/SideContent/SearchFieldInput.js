import React from 'react';
import {
  Box,
  Text,
  Heading,
  Stack,
  Flex,
  Avatar,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  useColorModeValue,
  useToken,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import { Search as SearchIcon } from '@components/Icons';

import { fontFamilyDefault } from '@utils/styles';

export const SearchFieldInput = ({ searchValue, onChange, ...props }) => {
  return (
    <InputGroup
      size="md"
      bg="#FFFFFF"
      borderRadius="8px"
      border="1px solid #D3DDE6"
      {...props}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon opacity={0.82} />
      </InputLeftElement>
      <Input
        value={searchValue}
        onChange={onChange}
        placeholder="Search"
        bg="whiteAlpha.400"
        border={0}
        focusBorderColor="whiteAlpha.800"
        _placeholder={{
          fontFamily: fontFamilyDefault,
          fontSize: '16px',
          color: useToken('colors', 'grey.700'),
        }}
      />
    </InputGroup>
  );
};

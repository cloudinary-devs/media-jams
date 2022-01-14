import React from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  useToken,
} from '@chakra-ui/react';
import { Search } from '@components/Icons';

import { fontFamilyDefault } from '@utils/styles';

export default function SearchInput({ searchValue, setSearchValue }) {
  const placeHolderVariant = useBreakpointValue({
    base: 'Search',
    lg: 'Search by tag, title, keyword, author, etc...',
  });

  const onChange = React.useCallback((e) => setSearchValue(e.target.value));
  return (
    <InputGroup
      size="lg"
      bg="#FFFFFF"
      borderRadius="8px"
      mt="24px"
      border="1px solid #D3DDE6"
    >
      <InputLeftElement pt={2}>
        <Search />
      </InputLeftElement>
      <Input
        value={searchValue}
        onChange={onChange}
        h="56px"
        placeholder={placeHolderVariant}
        _placeholder={{
          fontFamily: fontFamilyDefault,
          fontSize: '16px',
          lineHeight: '152%',
          color: useToken('colors', 'grey.700'),
        }}
      />
    </InputGroup>
  );
}

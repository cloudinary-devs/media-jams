import { Input, useToken } from '@chakra-ui/react';

export default function SearchInput() {
  return (
    <Input
      bg="#FFFFFF"
      w="100%"
      h="56px"
      border="2px solid #88B1FC"
      borderRadius="8px"
      boxSizing="border-box"
      p="0px 16px"
      mt="24px"
      placeholder="Search by tag, title, keyword, author, etc..."
      _placeholder={{
        fontFamily: 'DM Sans',
        fontSize: '16px',
        lineHeight: '152%',
        color: useToken('colors', 'grey.700'),
      }}
    />
  );
}
